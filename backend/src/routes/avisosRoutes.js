// Rutas para avisos y documentos
import express from 'express';
import {
  crearAviso,
  obtenerAvisos,
  marcarAvisoLeido,
  desactivarAviso,
  subirDocumento,
  obtenerDocumentos,
  eliminarDocumento
} from '../controllers/avisosController.js';
import { verifyToken, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// ============================================================================
// RUTAS DE AVISOS
// ============================================================================

// Crear aviso (solo admin)
router.post('/avisos', verifyToken, requireRole('admin'), crearAviso);

// Obtener avisos de un condominio
router.get('/avisos/:condominioId', verifyToken, obtenerAvisos);

// Marcar aviso como leído
router.post('/avisos/:avisoId/leer', verifyToken, marcarAvisoLeido);

// Desactivar aviso (solo admin)
router.delete('/avisos/:avisoId', verifyToken, requireRole('admin'), desactivarAviso);

// ============================================================================
// RUTAS DE DOCUMENTOS
// ============================================================================

// Subir documento (solo admin)
router.post('/documentos', verifyToken, requireRole('admin'), subirDocumento);

// Obtener documentos de un condominio
router.get('/documentos/:condominioId', verifyToken, obtenerDocumentos);

// Eliminar documento (solo admin)
router.delete('/documentos/:documentoId', verifyToken, requireRole('admin'), eliminarDocumento);

export default router;
