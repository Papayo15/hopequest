// Controller para avisos y documentos
import pool from '../db.js';
import { enviarNotificacionAviso } from '../utils/emailService.js';

// ============================================================================
// AVISOS
// ============================================================================

/**
 * Crear nuevo aviso
 * POST /api/avisos
 */
export const crearAviso = async (req, res) => {
  try {
    const {
      condominio_id,
      titulo,
      contenido,
      tipo,
      prioridad,
      archivo_url,
      fecha_expiracion
    } = req.body;

    const publicado_por = req.user.id;

    // Validaciones
    if (!condominio_id || !titulo || !contenido || !tipo) {
      return res.status(400).json({
        error: 'Faltan campos requeridos: condominio_id, titulo, contenido, tipo'
      });
    }

    // Crear aviso
    const result = await pool.query(
      `INSERT INTO avisos
       (condominio_id, titulo, contenido, tipo, prioridad, archivo_url, fecha_expiracion, publicado_por)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [condominio_id, titulo, contenido, tipo, prioridad || 'normal', archivo_url, fecha_expiracion, publicado_por]
    );

    const aviso = result.rows[0];

    // Enviar notificación por email a todos los residentes del condominio
    if (prioridad === 'urgente' || prioridad === 'alta') {
      const residentes = await pool.query(
        `SELECT u.email, u.name, c.nombre as condominio_nombre
         FROM users u
         JOIN condominios c ON u.condominio_id = c.id
         WHERE u.condominio_id = $1 AND u.role = 'residente' AND u.email IS NOT NULL`,
        [condominio_id]
      );

      // Enviar emails de forma asíncrona (no esperar)
      residentes.rows.forEach(residente => {
        enviarNotificacionAviso({
          residenteEmail: residente.email,
          residenteNombre: residente.name,
          tituloAviso: titulo,
          contenidoAviso: contenido,
          prioridad: prioridad || 'normal',
          condominio: residente.condominio_nombre
        }).catch(err => console.error('Error enviando notificación:', err));
      });
    }

    res.status(201).json({
      message: 'Aviso creado exitosamente',
      aviso
    });
  } catch (error) {
    console.error('Error creando aviso:', error);
    res.status(500).json({ error: 'Error al crear aviso' });
  }
};

/**
 * Obtener avisos de un condominio
 * GET /api/avisos/:condominioId
 */
export const obtenerAvisos = async (req, res) => {
  try {
    const { condominioId } = req.params;
    const { activos } = req.query; // ?activos=true para solo avisos activos

    let query = `
      SELECT a.*, u.name as publicado_por_nombre
      FROM avisos a
      LEFT JOIN users u ON a.publicado_por = u.id
      WHERE a.condominio_id = $1
    `;

    if (activos === 'true') {
      query += ` AND a.activo = true AND (a.fecha_expiracion IS NULL OR a.fecha_expiracion > NOW())`;
    }

    query += ` ORDER BY a.fecha_publicacion DESC`;

    const result = await pool.query(query, [condominioId]);

    res.json(result.rows);
  } catch (error) {
    console.error('Error obteniendo avisos:', error);
    res.status(500).json({ error: 'Error al obtener avisos' });
  }
};

/**
 * Marcar aviso como leído
 * POST /api/avisos/:avisoId/leer
 */
export const marcarAvisoLeido = async (req, res) => {
  try {
    const { avisoId } = req.params;
    const usuario_id = req.user.id;

    await pool.query(
      `INSERT INTO lecturas_avisos (aviso_id, usuario_id)
       VALUES ($1, $2)
       ON CONFLICT (aviso_id, usuario_id) DO NOTHING`,
      [avisoId, usuario_id]
    );

    res.json({ message: 'Aviso marcado como leído' });
  } catch (error) {
    console.error('Error marcando aviso como leído:', error);
    res.status(500).json({ error: 'Error al marcar aviso como leído' });
  }
};

/**
 * Desactivar aviso
 * DELETE /api/avisos/:avisoId
 */
export const desactivarAviso = async (req, res) => {
  try {
    const { avisoId } = req.params;

    await pool.query(
      `UPDATE avisos SET activo = false WHERE id = $1`,
      [avisoId]
    );

    res.json({ message: 'Aviso desactivado exitosamente' });
  } catch (error) {
    console.error('Error desactivando aviso:', error);
    res.status(500).json({ error: 'Error al desactivar aviso' });
  }
};

// ============================================================================
// DOCUMENTOS
// ============================================================================

/**
 * Subir documento
 * POST /api/documentos
 */
export const subirDocumento = async (req, res) => {
  try {
    const {
      condominio_id,
      nombre,
      descripcion,
      tipo_documento,
      archivo_url,
      archivo_tipo,
      tamaño_bytes,
      version,
      fecha_documento
    } = req.body;

    const subido_por = req.user.id;

    // Validaciones
    if (!condominio_id || !nombre || !tipo_documento || !archivo_url) {
      return res.status(400).json({
        error: 'Faltan campos requeridos: condominio_id, nombre, tipo_documento, archivo_url'
      });
    }

    const result = await pool.query(
      `INSERT INTO documentos
       (condominio_id, nombre, descripcion, tipo_documento, archivo_url, archivo_tipo, tamaño_bytes, subido_por, version, fecha_documento)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [condominio_id, nombre, descripcion, tipo_documento, archivo_url, archivo_tipo, tamaño_bytes, subido_por, version || '1.0', fecha_documento]
    );

    res.status(201).json({
      message: 'Documento subido exitosamente',
      documento: result.rows[0]
    });
  } catch (error) {
    console.error('Error subiendo documento:', error);
    res.status(500).json({ error: 'Error al subir documento' });
  }
};

/**
 * Obtener documentos de un condominio
 * GET /api/documentos/:condominioId
 */
export const obtenerDocumentos = async (req, res) => {
  try {
    const { condominioId } = req.params;
    const { tipo } = req.query; // ?tipo=minuta para filtrar por tipo

    let query = `
      SELECT d.*, u.name as subido_por_nombre
      FROM documentos d
      LEFT JOIN users u ON d.subido_por = u.id
      WHERE d.condominio_id = $1 AND d.activo = true
    `;

    const params = [condominioId];

    if (tipo) {
      query += ` AND d.tipo_documento = $2`;
      params.push(tipo);
    }

    query += ` ORDER BY d.created_at DESC`;

    const result = await pool.query(query, params);

    res.json(result.rows);
  } catch (error) {
    console.error('Error obteniendo documentos:', error);
    res.status(500).json({ error: 'Error al obtener documentos' });
  }
};

/**
 * Eliminar documento (desactivar)
 * DELETE /api/documentos/:documentoId
 */
export const eliminarDocumento = async (req, res) => {
  try {
    const { documentoId } = req.params;

    await pool.query(
      `UPDATE documentos SET activo = false WHERE id = $1`,
      [documentoId]
    );

    res.json({ message: 'Documento eliminado exitosamente' });
  } catch (error) {
    console.error('Error eliminando documento:', error);
    res.status(500).json({ error: 'Error al eliminar documento' });
  }
};
