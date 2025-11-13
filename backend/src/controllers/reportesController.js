// Controller para reportes financieros
import pool from '../db.js';

/**
 * Obtener balance de cuenta bancaria del condominio
 * GET /api/reportes/balance/:condominioId
 */
export const obtenerBalance = async (req, res) => {
  try {
    const { condominioId } = req.params;

    const result = await pool.query(
      `SELECT * FROM balance_cuenta_bancaria WHERE condominio_id = $1`,
      [condominioId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Condominio no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error obteniendo balance:', error);
    res.status(500).json({ error: 'Error al obtener balance' });
  }
};

/**
 * Obtener resumen de cobranza mensual
 * GET /api/reportes/cobranza/:condominioId
 */
export const obtenerResumenCobranza = async (req, res) => {
  try {
    const { condominioId } = req.params;

    const result = await pool.query(
      `SELECT * FROM resumen_cobranza_mensual
       WHERE condominio IN (SELECT nombre FROM condominios WHERE id = $1)
       ORDER BY estado_pago ASC, nombre ASC`,
      [condominioId]
    );

    // Calcular totales
    const totales = {
      total_residentes: result.rows.length,
      residentes_pagados: result.rows.filter(r => r.estado_pago === 'PAGADO').length,
      residentes_pendientes: result.rows.filter(r => r.estado_pago === 'PENDIENTE').length,
      total_cobrado: result.rows.reduce((sum, r) => sum + Number(r.pagado_mes_actual || 0), 0),
      total_pendiente: result.rows.reduce((sum, r) => sum + Number(r.saldo_pendiente || 0), 0)
    };

    res.json({
      totales,
      residentes: result.rows
    });
  } catch (error) {
    console.error('Error obteniendo resumen de cobranza:', error);
    res.status(500).json({ error: 'Error al obtener resumen de cobranza' });
  }
};

/**
 * Obtener reporte financiero detallado (por mes)
 * GET /api/reportes/financiero/:condominioId
 */
export const obtenerReporteFinanciero = async (req, res) => {
  try {
    const { condominioId } = req.params;
    const { year, month } = req.query; // Opcional: filtrar por año/mes

    let query = `
      SELECT * FROM reporte_financiero_detallado
      WHERE condominio_id = $1
    `;

    const params = [condominioId];

    if (year) {
      query += ` AND EXTRACT(YEAR FROM mes) = $${params.length + 1}`;
      params.push(year);
    }

    if (month) {
      query += ` AND EXTRACT(MONTH FROM mes) = $${params.length + 1}`;
      params.push(month);
    }

    query += ` ORDER BY mes DESC`;

    const result = await pool.query(query, params);

    res.json(result.rows);
  } catch (error) {
    console.error('Error obteniendo reporte financiero:', error);
    res.status(500).json({ error: 'Error al obtener reporte financiero' });
  }
};

/**
 * Obtener lista completa de residentes con sus datos
 * GET /api/reportes/residentes/:condominioId
 */
export const obtenerListaResidentes = async (req, res) => {
  try {
    const { condominioId } = req.params;

    const result = await pool.query(
      `SELECT * FROM residentes_completo WHERE condominio_id = $1`,
      [condominioId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error obteniendo lista de residentes:', error);
    res.status(500).json({ error: 'Error al obtener lista de residentes' });
  }
};

/**
 * Obtener estados de cuenta de un residente
 * GET /api/reportes/estado-cuenta/:residenteId
 */
export const obtenerEstadoCuenta = async (req, res) => {
  try {
    const { residenteId } = req.params;

    const result = await pool.query(
      `SELECT ec.*, u.name as residente_nombre, u.email, c.nombre as condominio_nombre
       FROM estados_cuenta ec
       JOIN users u ON ec.id_residente = u.id
       JOIN condominios c ON ec.id_condominio = c.id
       WHERE ec.id_residente = $1
       ORDER BY ec.mes DESC, ec.anio DESC`,
      [residenteId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error obteniendo estado de cuenta:', error);
    res.status(500).json({ error: 'Error al obtener estado de cuenta' });
  }
};

/**
 * Obtener historial de egresos
 * GET /api/reportes/egresos/:condominioId
 */
export const obtenerEgresos = async (req, res) => {
  try {
    const { condominioId } = req.params;
    const { year, month, categoria } = req.query;

    let query = `
      SELECT e.*, p.nombre as proveedor_nombre, u.name as registrado_por_nombre
      FROM egresos e
      LEFT JOIN proveedores p ON e.id_proveedor = p.id
      LEFT JOIN users u ON e.registrado_por = u.id
      WHERE e.id_condominio = $1
    `;

    const params = [condominioId];

    if (year) {
      query += ` AND e.anio = $${params.length + 1}`;
      params.push(year);
    }

    if (month) {
      query += ` AND e.mes = $${params.length + 1}`;
      params.push(month);
    }

    if (categoria) {
      query += ` AND e.categoria = $${params.length + 1}`;
      params.push(categoria);
    }

    query += ` ORDER BY e.fecha_egreso DESC`;

    const result = await pool.query(query, params);

    // Calcular total
    const total = result.rows.reduce((sum, e) => sum + Number(e.monto || 0), 0);

    res.json({
      total_egresos: total,
      cantidad: result.rows.length,
      egresos: result.rows
    });
  } catch (error) {
    console.error('Error obteniendo egresos:', error);
    res.status(500).json({ error: 'Error al obtener egresos' });
  }
};

/**
 * Obtener historial de ingresos adicionales
 * GET /api/reportes/ingresos/:condominioId
 */
export const obtenerIngresos = async (req, res) => {
  try {
    const { condominioId } = req.params;
    const { year, month, categoria } = req.query;

    let query = `
      SELECT i.*, u.name as registrado_por_nombre
      FROM ingresos i
      LEFT JOIN users u ON i.registrado_por = u.id
      WHERE i.id_condominio = $1
    `;

    const params = [condominioId];

    if (year) {
      query += ` AND i.anio = $${params.length + 1}`;
      params.push(year);
    }

    if (month) {
      query += ` AND i.mes = $${params.length + 1}`;
      params.push(month);
    }

    if (categoria) {
      query += ` AND i.categoria = $${params.length + 1}`;
      params.push(categoria);
    }

    query += ` ORDER BY i.fecha_ingreso DESC`;

    const result = await pool.query(query, params);

    // Calcular total
    const total = result.rows.reduce((sum, i) => sum + Number(i.monto || 0), 0);

    res.json({
      total_ingresos: total,
      cantidad: result.rows.length,
      ingresos: result.rows
    });
  } catch (error) {
    console.error('Error obteniendo ingresos:', error);
    res.status(500).json({ error: 'Error al obtener ingresos' });
  }
};
