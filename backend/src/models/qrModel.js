import pool from '../config/database.js';

class QRModel {
  /**
   * Generar un nuevo código QR
   */
  static async generarCodigoQR(data) {
    const {
      codigo,
      id_usuario,
      id_condominio,
      id_unidad,
      nombre_visitante,
      documento_visitante,
      telefono_visitante,
      motivo_visita,
      horas_validez = 24
    } = data;

    const query = `
      INSERT INTO codigos_qr (
        codigo, id_usuario, id_condominio, id_unidad,
        nombre_visitante, documento_visitante, telefono_visitante,
        motivo_visita, fecha_expiracion
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW() + INTERVAL '${horas_validez} hours')
      RETURNING *
    `;

    const values = [
      codigo,
      id_usuario,
      id_condominio,
      id_unidad,
      nombre_visitante,
      documento_visitante || null,
      telefono_visitante || null,
      motivo_visita || null
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  /**
   * Validar un código QR
   */
  static async validarCodigoQR(codigo, id_vigilante) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Verificar que el código existe y está activo
      const checkQuery = `
        SELECT * FROM codigos_qr
        WHERE codigo = $1
        AND estado = 'activo'
        AND usado = FALSE
        AND fecha_expiracion > NOW()
      `;
      const checkResult = await client.query(checkQuery, [codigo]);

      if (checkResult.rows.length === 0) {
        // Buscar el código para ver por qué falló
        const errorQuery = 'SELECT * FROM codigos_qr WHERE codigo = $1';
        const errorResult = await client.query(errorQuery, [codigo]);

        if (errorResult.rows.length === 0) {
          throw new Error('CODIGO_NO_EXISTE');
        }

        const qr = errorResult.rows[0];
        if (qr.usado) {
          throw new Error('CODIGO_YA_USADO');
        }
        if (new Date(qr.fecha_expiracion) < new Date()) {
          throw new Error('CODIGO_EXPIRADO');
        }
        if (qr.estado !== 'activo') {
          throw new Error('CODIGO_INACTIVO');
        }
      }

      const qr = checkResult.rows[0];

      // Marcar como usado
      const updateQuery = `
        UPDATE codigos_qr
        SET usado = TRUE,
            estado = 'usado',
            fecha_uso = NOW(),
            validado_por = $2
        WHERE id = $1
        RETURNING *
      `;
      const updateResult = await client.query(updateQuery, [qr.id, id_vigilante]);

      // Registrar en historial
      const historialQuery = `
        INSERT INTO historial_accesos (
          id_codigo_qr, id_condominio, id_unidad,
          nombre_visitante, validado_por
        ) VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `;
      await client.query(historialQuery, [
        qr.id,
        qr.id_condominio,
        qr.id_unidad,
        qr.nombre_visitante,
        id_vigilante
      ]);

      await client.query('COMMIT');
      return updateResult.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Obtener historial de códigos QR de un usuario
   */
  static async obtenerHistorialUsuario(id_usuario, limit = 50, offset = 0) {
    const query = `
      SELECT
        cq.*,
        c.nombre as nombre_condominio,
        un.numero_unidad,
        uv.nombre as validado_por_nombre,
        CASE
          WHEN cq.fecha_expiracion < NOW() THEN 'expirado'
          WHEN cq.usado THEN 'usado'
          ELSE 'activo'
        END as estado_actual
      FROM codigos_qr cq
      JOIN condominios c ON cq.id_condominio = c.id
      LEFT JOIN unidades un ON cq.id_unidad = un.id
      LEFT JOIN users uv ON cq.validado_por = uv.id
      WHERE cq.id_usuario = $1
      ORDER BY cq.created_at DESC
      LIMIT $2 OFFSET $3
    `;

    const result = await pool.query(query, [id_usuario, limit, offset]);
    return result.rows;
  }

  /**
   * Obtener historial de accesos de un condominio
   */
  static async obtenerHistorialCondominio(id_condominio, limit = 100, offset = 0) {
    const query = `
      SELECT * FROM v_historial_accesos_detallado
      WHERE condominio IN (SELECT nombre FROM condominios WHERE id = $1)
      ORDER BY fecha_ingreso DESC
      LIMIT $2 OFFSET $3
    `;

    const result = await pool.query(query, [id_condominio, limit, offset]);
    return result.rows;
  }

  /**
   * Obtener estadísticas de accesos
   */
  static async obtenerEstadisticas(id_condominio, fecha_inicio, fecha_fin) {
    const query = `
      SELECT * FROM estadisticas_accesos_condominio($1, $2, $3)
    `;

    const result = await pool.query(query, [id_condominio, fecha_inicio, fecha_fin]);
    return result.rows[0];
  }

  /**
   * Cancelar un código QR (antes de ser usado)
   */
  static async cancelarCodigoQR(id_codigo, id_usuario) {
    const query = `
      UPDATE codigos_qr
      SET estado = 'cancelado',
          notas_validacion = 'Cancelado por el usuario'
      WHERE id = $1
      AND id_usuario = $2
      AND usado = FALSE
      RETURNING *
    `;

    const result = await pool.query(query, [id_codigo, id_usuario]);
    if (result.rows.length === 0) {
      throw new Error('No se puede cancelar este código');
    }
    return result.rows[0];
  }

  /**
   * Registrar token de notificaciones push
   */
  static async registrarPushToken(data) {
    const { id_usuario, push_token, plataforma, modelo_dispositivo, version_app } = data;

    const query = `
      INSERT INTO push_tokens (
        id_usuario, push_token, plataforma, modelo_dispositivo, version_app
      ) VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (id_usuario, push_token)
      DO UPDATE SET
        activo = TRUE,
        ultimo_uso = NOW(),
        modelo_dispositivo = EXCLUDED.modelo_dispositivo,
        version_app = EXCLUDED.version_app
      RETURNING *
    `;

    const result = await pool.query(query, [
      id_usuario,
      push_token,
      plataforma,
      modelo_dispositivo || null,
      version_app || null
    ]);

    return result.rows[0];
  }

  /**
   * Obtener tokens push de un usuario
   */
  static async obtenerPushTokens(id_usuario) {
    const query = `
      SELECT push_token, plataforma
      FROM push_tokens
      WHERE id_usuario = $1
      AND activo = TRUE
    `;

    const result = await pool.query(query, [id_usuario]);
    return result.rows;
  }

  /**
   * Actualizar códigos expirados
   */
  static async actualizarCodigosExpirados() {
    const query = 'SELECT actualizar_codigos_expirados()';
    await pool.query(query);
  }

  /**
   * Obtener configuración QR de un condominio
   */
  static async obtenerConfiguracion(id_condominio) {
    const query = `
      SELECT * FROM configuracion_qr
      WHERE id_condominio = $1
    `;

    const result = await pool.query(query, [id_condominio]);
    if (result.rows.length === 0) {
      // Crear configuración por defecto
      const insertQuery = `
        INSERT INTO configuracion_qr (id_condominio)
        VALUES ($1)
        RETURNING *
      `;
      const insertResult = await pool.query(insertQuery, [id_condominio]);
      return insertResult.rows[0];
    }
    return result.rows[0];
  }

  /**
   * Actualizar configuración QR de un condominio
   */
  static async actualizarConfiguracion(id_condominio, config) {
    const fields = [];
    const values = [id_condominio];
    let paramCounter = 2;

    const allowedFields = [
      'duracion_default_horas',
      'max_usos_por_codigo',
      'requiere_aprobacion_admin',
      'notificar_residente_ingreso',
      'notificar_residente_salida',
      'notificar_admin_accesos',
      'requiere_documento',
      'requiere_foto',
      'validacion_biometrica',
      'horario_inicio',
      'horario_fin',
      'permitir_fines_semana'
    ];

    for (const field of allowedFields) {
      if (config[field] !== undefined) {
        fields.push(`${field} = $${paramCounter}`);
        values.push(config[field]);
        paramCounter++;
      }
    }

    if (fields.length === 0) {
      throw new Error('No hay campos para actualizar');
    }

    const query = `
      UPDATE configuracion_qr
      SET ${fields.join(', ')}
      WHERE id_condominio = $1
      RETURNING *
    `;

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  /**
   * Registrar salida de visitante
   */
  static async registrarSalida(id_historial, notas = null) {
    const query = `
      UPDATE historial_accesos
      SET fecha_salida = NOW(),
          notas = COALESCE($2, notas)
      WHERE id = $1
      RETURNING *
    `;

    const result = await pool.query(query, [id_historial, notas]);
    return result.rows[0];
  }
}

export default QRModel;
