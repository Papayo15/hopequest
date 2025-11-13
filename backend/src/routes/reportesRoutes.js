// Rutas para reportes financieros
import express from 'express';
import {
  obtenerBalance,
  obtenerResumenCobranza,
  obtenerReporteFinanciero,
  obtenerListaResidentes,
  obtenerEstadoCuenta,
  obtenerEgresos,
  obtenerIngresos
} from '../controllers/reportesController.js';
import { verifyToken, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// Balance de cuenta bancaria del condominio
router.get('/balance/:condominioId', verifyToken, requireRole('admin'), obtenerBalance);

// Resumen de cobranza mensual (quién debe, quién pagó)
router.get('/cobranza/:condominioId', verifyToken, requireRole('admin'), obtenerResumenCobranza);

// Reporte financiero detallado (ingresos/egresos por mes)
router.get('/financiero/:condominioId', verifyToken, requireRole('admin'), obtenerReporteFinanciero);

// Lista completa de residentes
router.get('/residentes/:condominioId', verifyToken, requireRole('admin'), obtenerListaResidentes);

// Estado de cuenta de un residente (admin puede ver todos, residente solo el suyo)
router.get('/estado-cuenta/:residenteId', verifyToken, obtenerEstadoCuenta);

// Historial de egresos
router.get('/egresos/:condominioId', verifyToken, requireRole('admin'), obtenerEgresos);

// Historial de ingresos adicionales
router.get('/ingresos/:condominioId', verifyToken, requireRole('admin'), obtenerIngresos);

export default router;
