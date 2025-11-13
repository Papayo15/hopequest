import QRModel from '../models/qrModel.js';
import { sendPushNotification } from '../services/pushService.js';
import crypto from 'crypto';

class QRController {
  /**
   * Generar código QR para visitante
   * POST /api/qr/generar
   */
  static async generarCodigo(req, res) {
    try {
      const {
        id_condominio,
        id_unidad,
        nombre_visitante,
        documento_visitante,
        telefono_visitante,
        motivo_visita,
        horas_validez
      } = req.body;

      const id_usuario = req.user.id; // Del middleware de autenticación

      // Validaciones
      if (!nombre_visitante || nombre_visitante.trim().length < 2) {
        return res.status(400).json({
          error: 'El nombre del visitante es requerido (mínimo 2 caracteres)'
        });
      }

      if (!id_condominio) {
        return res.status(400).json({
          error: 'El ID del condominio es requerido'
        });
      }

      // Generar código único
      const timestamp = Date.now();
      const random = crypto.randomBytes(4).toString('hex');
      const codigo = `QR-${timestamp}-${id_condominio}-${random}`;

      // Crear el código en la base de datos
      const qrData = {
        codigo,
        id_usuario,
        id_condominio,
        id_unidad: id_unidad || null,
        nombre_visitante: nombre_visitante.trim(),
        documento_visitante: documento_visitante?.trim(),
        telefono_visitante: telefono_visitante?.trim(),
        motivo_visita: motivo_visita?.trim(),
        horas_validez: horas_validez || 24
      };

      const qr = await QRModel.generarCodigoQR(qrData);

      res.status(201).json({
        mensaje: 'Código QR generado exitosamente',
        codigo_qr: {
          id: qr.id,
          codigo: qr.codigo,
          nombre_visitante: qr.nombre_visitante,
          fecha_expiracion: qr.fecha_expiracion,
          estado: qr.estado
        }
      });
    } catch (error) {
      console.error('Error al generar código QR:', error);
      res.status(500).json({
        error: 'Error al generar el código QR',
        detalle: error.message
      });
    }
  }

  /**
   * Validar código QR (usado por vigilancia)
   * POST /api/qr/validar
   */
  static async validarCodigo(req, res) {
    try {
      const { codigo } = req.body;
      const id_vigilante = req.user.id;

      if (!codigo) {
        return res.status(400).json({
          error: 'El código QR es requerido'
        });
      }

      // Validar el código
      const qr = await QRModel.validarCodigoQR(codigo, id_vigilante);

      // Enviar notificación push al residente
      try {
        const tokens = await QRModel.obtenerPushTokens(qr.id_usuario);
        if (tokens.length > 0) {
          await sendPushNotification(tokens, {
            title: '🔔 Visita Ingresada',
            body: `${qr.nombre_visitante} ha ingresado al condominio`,
            data: {
              tipo: 'ingreso_visita',
              id_codigo: qr.id,
              nombre_visitante: qr.nombre_visitante
            }
          });
        }
      } catch (pushError) {
        console.error('Error al enviar notificación push:', pushError);
        // No fallar la validación si falla la notificación
      }

      res.json({
        mensaje: 'Código QR validado exitosamente',
        valido: true,
        visitante: {
          nombre: qr.nombre_visitante,
          documento: qr.documento_visitante,
          telefono: qr.telefono_visitante,
          motivo: qr.motivo_visita
        },
        fecha_validacion: qr.fecha_uso
      });
    } catch (error) {
      console.error('Error al validar código QR:', error);

      // Mensajes de error específicos
      const errorMessages = {
        'CODIGO_NO_EXISTE': 'El código QR no existe',
        'CODIGO_YA_USADO': 'Este código QR ya fue utilizado',
        'CODIGO_EXPIRADO': 'Este código QR ha expirado',
        'CODIGO_INACTIVO': 'Este código QR está inactivo'
      };

      const mensaje = errorMessages[error.message] || 'Error al validar el código QR';

      res.status(400).json({
        error: mensaje,
        valido: false,
        codigo_error: error.message
      });
    }
  }

  /**
   * Obtener historial de códigos del usuario
   * GET /api/qr/historial
   */
  static async obtenerHistorial(req, res) {
    try {
      const id_usuario = req.user.id;
      const { limit = 50, offset = 0 } = req.query;

      const historial = await QRModel.obtenerHistorialUsuario(
        id_usuario,
        parseInt(limit),
        parseInt(offset)
      );

      res.json({
        historial,
        total: historial.length,
        limit: parseInt(limit),
        offset: parseInt(offset)
      });
    } catch (error) {
      console.error('Error al obtener historial:', error);
      res.status(500).json({
        error: 'Error al obtener el historial',
        detalle: error.message
      });
    }
  }

  /**
   * Obtener historial de accesos del condominio (admin/vigilancia)
   * GET /api/qr/historial-condominio/:id_condominio
   */
  static async obtenerHistorialCondominio(req, res) {
    try {
      const { id_condominio } = req.params;
      const { limit = 100, offset = 0 } = req.query;

      // Verificar que el usuario tiene permiso (admin o vigilancia)
      if (req.user.rol !== 'admin' && req.user.rol !== 'conserje') {
        return res.status(403).json({
          error: 'No tienes permiso para ver este historial'
        });
      }

      const historial = await QRModel.obtenerHistorialCondominio(
        id_condominio,
        parseInt(limit),
        parseInt(offset)
      );

      res.json({
        historial,
        total: historial.length,
        limit: parseInt(limit),
        offset: parseInt(offset)
      });
    } catch (error) {
      console.error('Error al obtener historial del condominio:', error);
      res.status(500).json({
        error: 'Error al obtener el historial',
        detalle: error.message
      });
    }
  }

  /**
   * Obtener estadísticas de accesos
   * GET /api/qr/estadisticas/:id_condominio
   */
  static async obtenerEstadisticas(req, res) {
    try {
      const { id_condominio } = req.params;
      const { fecha_inicio, fecha_fin } = req.query;

      // Verificar permisos
      if (req.user.rol !== 'admin' && req.user.rol !== 'conserje') {
        return res.status(403).json({
          error: 'No tienes permiso para ver estas estadísticas'
        });
      }

      const inicio = fecha_inicio || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const fin = fecha_fin || new Date().toISOString().split('T')[0];

      const estadisticas = await QRModel.obtenerEstadisticas(
        id_condominio,
        inicio,
        fin
      );

      res.json({
        estadisticas,
        periodo: {
          inicio,
          fin
        }
      });
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      res.status(500).json({
        error: 'Error al obtener las estadísticas',
        detalle: error.message
      });
    }
  }

  /**
   * Cancelar código QR
   * DELETE /api/qr/cancelar/:id_codigo
   */
  static async cancelarCodigo(req, res) {
    try {
      const { id_codigo } = req.params;
      const id_usuario = req.user.id;

      const qr = await QRModel.cancelarCodigoQR(id_codigo, id_usuario);

      res.json({
        mensaje: 'Código QR cancelado exitosamente',
        codigo_qr: qr
      });
    } catch (error) {
      console.error('Error al cancelar código QR:', error);
      res.status(400).json({
        error: error.message || 'Error al cancelar el código QR'
      });
    }
  }

  /**
   * Registrar token de notificaciones push
   * POST /api/qr/register-push-token
   */
  static async registrarPushToken(req, res) {
    try {
      const { push_token, plataforma, modelo_dispositivo, version_app } = req.body;
      const id_usuario = req.user.id;

      if (!push_token || !plataforma) {
        return res.status(400).json({
          error: 'Token y plataforma son requeridos'
        });
      }

      const token = await QRModel.registrarPushToken({
        id_usuario,
        push_token,
        plataforma,
        modelo_dispositivo,
        version_app
      });

      res.json({
        mensaje: 'Token registrado exitosamente',
        token
      });
    } catch (error) {
      console.error('Error al registrar token push:', error);
      res.status(500).json({
        error: 'Error al registrar el token',
        detalle: error.message
      });
    }
  }

  /**
   * Obtener configuración QR del condominio
   * GET /api/qr/configuracion/:id_condominio
   */
  static async obtenerConfiguracion(req, res) {
    try {
      const { id_condominio } = req.params;

      const config = await QRModel.obtenerConfiguracion(id_condominio);

      res.json({ configuracion: config });
    } catch (error) {
      console.error('Error al obtener configuración:', error);
      res.status(500).json({
        error: 'Error al obtener la configuración',
        detalle: error.message
      });
    }
  }

  /**
   * Actualizar configuración QR del condominio (solo admin)
   * PUT /api/qr/configuracion/:id_condominio
   */
  static async actualizarConfiguracion(req, res) {
    try {
      const { id_condominio } = req.params;

      if (req.user.rol !== 'admin') {
        return res.status(403).json({
          error: 'Solo administradores pueden modificar la configuración'
        });
      }

      const config = await QRModel.actualizarConfiguracion(id_condominio, req.body);

      res.json({
        mensaje: 'Configuración actualizada exitosamente',
        configuracion: config
      });
    } catch (error) {
      console.error('Error al actualizar configuración:', error);
      res.status(500).json({
        error: 'Error al actualizar la configuración',
        detalle: error.message
      });
    }
  }

  /**
   * Registrar salida de visitante
   * POST /api/qr/registrar-salida/:id_historial
   */
  static async registrarSalida(req, res) {
    try {
      const { id_historial } = req.params;
      const { notas } = req.body;

      // Verificar permisos
      if (req.user.rol !== 'admin' && req.user.rol !== 'conserje') {
        return res.status(403).json({
          error: 'No tienes permiso para registrar salidas'
        });
      }

      const historial = await QRModel.registrarSalida(id_historial, notas);

      res.json({
        mensaje: 'Salida registrada exitosamente',
        historial
      });
    } catch (error) {
      console.error('Error al registrar salida:', error);
      res.status(500).json({
        error: 'Error al registrar la salida',
        detalle: error.message
      });
    }
  }
}

export default QRController;
