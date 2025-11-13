import Stripe from "stripe";
import pool from "../db.js";
import { enviarComprobantePago } from '../utils/emailService.js';

const stripe = new Stripe(process.env.STRIPE_SECRET);

export const crearPago = async (req, res, next) => {
  try {
    const { monto, descripcion } = req.body;
    const userId = req.user.id;

    // Validaciones
    if (!monto || !descripcion) {
      return res.status(400).json({ error: "Monto y descripción son requeridos" });
    }

    if (isNaN(monto) || monto <= 0) {
      return res.status(400).json({ error: "El monto debe ser un número positivo" });
    }

    if (monto > 100000) {
      return res.status(400).json({ error: "El monto máximo es $100,000" });
    }

    if (descripcion.length < 5 || descripcion.length > 500) {
      return res.status(400).json({ error: "La descripción debe tener entre 5 y 500 caracteres" });
    }

    // Registrar el pago en la base de datos (pendiente)
    const pagoResult = await pool.query(
      "INSERT INTO pagos (id_residente, monto, descripcion, estado) VALUES ($1, $2, $3, 'pendiente') RETURNING id",
      [userId, monto, descripcion]
    );

    const pagoId = pagoResult.rows[0].id;

    // Crear sesión de Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: descripcion,
              description: `Pago #${pagoId} - Condominio360`
            },
            unit_amount: Math.round(monto * 100) // Convertir a centavos
          },
          quantity: 1
        }
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/pagos/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/pagos/cancel`,
      metadata: {
        pago_id: pagoId,
        user_id: userId
      }
    });

    // Actualizar pago con stripe_session_id
    await pool.query(
      "UPDATE pagos SET stripe_session_id = $1 WHERE id = $2",
      [session.id, pagoId]
    );

    res.json({
      message: "Sesión de pago creada",
      url: session.url,
      pagoId: pagoId
    });
  } catch (err) {
    next(err);
  }
};

export const getPagos = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { estado } = req.query;

    let query = "SELECT * FROM pagos WHERE id_residente = $1";
    const params = [userId];

    if (estado) {
      query += " AND estado = $2";
      params.push(estado);
    }

    query += " ORDER BY fecha_pago DESC";

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

export const getPagoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const result = await pool.query(
      "SELECT * FROM pagos WHERE id = $1 AND id_residente = $2",
      [id, userId]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: "Pago no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

export const verificarPago = async (req, res, next) => {
  try {
    const { session_id } = req.query;

    if (!session_id) {
      return res.status(400).json({ error: "session_id es requerido" });
    }

    // Obtener información de la sesión de Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      // Actualizar estado del pago en la base de datos
      await pool.query(
        "UPDATE pagos SET estado = 'completado' WHERE stripe_session_id = $1",
        [session_id]
      );

      res.json({
        message: "Pago verificado exitosamente",
        estado: "completado"
      });
    } else {
      res.json({
        message: "Pago aún pendiente",
        estado: session.payment_status
      });
    }
  } catch (err) {
    next(err);
  }
};

/**
 * Registrar pago manual (transferencia, efectivo, cheque)
 * Solo para administradores
 * POST /api/pagos/manual
 */
export const registrarPagoManual = async (req, res, next) => {
  try {
    const {
      id_residente,
      monto,
      descripcion,
      metodo_pago, // 'transferencia', 'efectivo', 'cheque', 'tarjeta'
      referencia,
      comprobante_url,
      tipo_cuota,
      enviar_email
    } = req.body;

    // Validaciones
    if (!id_residente || !monto || !descripcion || !metodo_pago) {
      return res.status(400).json({
        error: "Faltan campos requeridos: id_residente, monto, descripcion, metodo_pago"
      });
    }

    if (isNaN(monto) || monto <= 0) {
      return res.status(400).json({ error: "El monto debe ser un número positivo" });
    }

    const metodosValidos = ['transferencia', 'efectivo', 'cheque', 'tarjeta'];
    if (!metodosValidos.includes(metodo_pago)) {
      return res.status(400).json({
        error: `Método de pago inválido. Opciones: ${metodosValidos.join(', ')}`
      });
    }

    // Obtener datos del residente para el email
    const residenteResult = await pool.query(
      `SELECT u.*, c.nombre as condominio_nombre
       FROM users u
       LEFT JOIN condominios c ON u.condominio_id = c.id
       WHERE u.id = $1`,
      [id_residente]
    );

    if (residenteResult.rows.length === 0) {
      return res.status(404).json({ error: "Residente no encontrado" });
    }

    const residente = residenteResult.rows[0];

    // Registrar el pago como completado
    const pagoResult = await pool.query(
      `INSERT INTO pagos
       (id_residente, monto, descripcion, estado, metodo_pago, referencia, comprobante_url, tipo_cuota)
       VALUES ($1, $2, $3, 'completado', $4, $5, $6, $7)
       RETURNING *`,
      [id_residente, monto, descripcion, metodo_pago, referencia, comprobante_url, tipo_cuota || 'mantenimiento']
    );

    const pago = pagoResult.rows[0];

    // Enviar comprobante por email si está habilitado
    if (enviar_email !== false && residente.email) {
      enviarComprobantePago({
        residenteEmail: residente.email,
        residenteNombre: residente.name,
        monto: monto,
        metodoPago: metodo_pago,
        referencia: referencia,
        fechaPago: pago.fecha_pago,
        comprobanteUrl: comprobante_url,
        condominio: residente.condominio_nombre || 'N/A'
      }).catch(err => console.error('Error enviando comprobante:', err));
    }

    res.status(201).json({
      message: 'Pago registrado exitosamente' + (residente.email ? ' y comprobante enviado por email' : ''),
      pago
    });
  } catch (err) {
    next(err);
  }
};
