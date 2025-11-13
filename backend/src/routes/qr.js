import express from 'express';
import QRController from '../controllers/qrController.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(authMiddleware);

/**
 * @route   POST /api/qr/generar
 * @desc    Generar código QR para visitante (residentes)
 * @access  Private (residentes, admin)
 */
router.post('/generar', QRController.generarCodigo);

/**
 * @route   POST /api/qr/validar
 * @desc    Validar código QR escaneado (vigilancia)
 * @access  Private (vigilancia, admin)
 */
router.post('/validar', QRController.validarCodigo);

/**
 * @route   GET /api/qr/historial
 * @desc    Obtener historial de códigos QR del usuario autenticado
 * @access  Private
 */
router.get('/historial', QRController.obtenerHistorial);

/**
 * @route   GET /api/qr/historial-condominio/:id_condominio
 * @desc    Obtener historial de accesos del condominio
 * @access  Private (admin, vigilancia)
 */
router.get('/historial-condominio/:id_condominio', QRController.obtenerHistorialCondominio);

/**
 * @route   GET /api/qr/estadisticas/:id_condominio
 * @desc    Obtener estadísticas de accesos
 * @access  Private (admin, vigilancia)
 */
router.get('/estadisticas/:id_condominio', QRController.obtenerEstadisticas);

/**
 * @route   DELETE /api/qr/cancelar/:id_codigo
 * @desc    Cancelar un código QR antes de ser usado
 * @access  Private (propietario del código)
 */
router.delete('/cancelar/:id_codigo', QRController.cancelarCodigo);

/**
 * @route   POST /api/qr/register-push-token
 * @desc    Registrar token de notificaciones push del dispositivo
 * @access  Private
 */
router.post('/register-push-token', QRController.registrarPushToken);

/**
 * @route   GET /api/qr/configuracion/:id_condominio
 * @desc    Obtener configuración QR del condominio
 * @access  Private
 */
router.get('/configuracion/:id_condominio', QRController.obtenerConfiguracion);

/**
 * @route   PUT /api/qr/configuracion/:id_condominio
 * @desc    Actualizar configuración QR del condominio
 * @access  Private (solo admin)
 */
router.put('/configuracion/:id_condominio', QRController.actualizarConfiguracion);

/**
 * @route   POST /api/qr/registrar-salida/:id_historial
 * @desc    Registrar salida de visitante
 * @access  Private (vigilancia, admin)
 */
router.post('/registrar-salida/:id_historial', QRController.registrarSalida);

/**
 * @route   GET /api/qr/health
 * @desc    Health check del módulo QR
 * @access  Public
 */
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    modulo: 'QR',
    timestamp: new Date().toISOString()
  });
});

export default router;
