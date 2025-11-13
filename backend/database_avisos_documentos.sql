-- ============================================================================
-- MÓDULO: AVISOS Y DOCUMENTOS
-- Descripción: Sistema para publicar avisos y almacenar documentos oficiales
-- Fecha: 2025-01-10
-- ============================================================================

-- ============================================================================
-- TABLA: avisos
-- Descripción: Avisos generales del condominio (comunicados, avisos importantes)
-- ============================================================================
CREATE TABLE IF NOT EXISTS avisos (
  id SERIAL PRIMARY KEY,
  condominio_id INTEGER NOT NULL REFERENCES condominios(id) ON DELETE CASCADE,
  titulo VARCHAR(200) NOT NULL,
  contenido TEXT NOT NULL,
  tipo VARCHAR(50) NOT NULL DEFAULT 'general'
    CHECK (tipo IN ('general', 'urgente', 'mantenimiento', 'evento', 'recordatorio')),
  prioridad VARCHAR(20) DEFAULT 'normal'
    CHECK (prioridad IN ('baja', 'normal', 'alta', 'urgente')),
  archivo_url TEXT,  -- URL de Cloudinary si tiene archivo adjunto
  publicado_por INTEGER NOT NULL REFERENCES users(id),
  activo BOOLEAN DEFAULT true,
  fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_expiracion TIMESTAMP,  -- NULL = no expira
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- TABLA: documentos
-- Descripción: Documentos oficiales del condominio (minutas, reglamentos, etc)
-- ============================================================================
CREATE TABLE IF NOT EXISTS documentos (
  id SERIAL PRIMARY KEY,
  condominio_id INTEGER NOT NULL REFERENCES condominios(id) ON DELETE CASCADE,
  nombre VARCHAR(200) NOT NULL,
  descripcion TEXT,
  tipo_documento VARCHAR(50) NOT NULL
    CHECK (tipo_documento IN (
      'minuta',
      'reglamento',
      'acta',
      'circular',
      'contrato',
      'manual',
      'politica',
      'otro'
    )),
  archivo_url TEXT NOT NULL,  -- URL de Cloudinary (PDF, Word, etc)
  archivo_tipo VARCHAR(50),    -- 'pdf', 'docx', 'xlsx', etc
  tamaño_bytes INTEGER,
  subido_por INTEGER NOT NULL REFERENCES users(id),
  version VARCHAR(20) DEFAULT '1.0',
  fecha_documento DATE,  -- Fecha del documento (no de subida)
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- TABLA: lecturas_avisos (tracking de quién leyó cada aviso)
-- ============================================================================
CREATE TABLE IF NOT EXISTS lecturas_avisos (
  id SERIAL PRIMARY KEY,
  aviso_id INTEGER NOT NULL REFERENCES avisos(id) ON DELETE CASCADE,
  usuario_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  leido_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(aviso_id, usuario_id)  -- Un usuario solo puede marcar como leído una vez
);

-- ============================================================================
-- ÍNDICES para optimización
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_avisos_condominio ON avisos(condominio_id);
CREATE INDEX IF NOT EXISTS idx_avisos_fecha ON avisos(fecha_publicacion DESC);
CREATE INDEX IF NOT EXISTS idx_avisos_activo ON avisos(activo);
CREATE INDEX IF NOT EXISTS idx_avisos_tipo ON avisos(tipo);

CREATE INDEX IF NOT EXISTS idx_documentos_condominio ON documentos(condominio_id);
CREATE INDEX IF NOT EXISTS idx_documentos_tipo ON documentos(tipo_documento);
CREATE INDEX IF NOT EXISTS idx_documentos_activo ON documentos(activo);

CREATE INDEX IF NOT EXISTS idx_lecturas_aviso ON lecturas_avisos(aviso_id);
CREATE INDEX IF NOT EXISTS idx_lecturas_usuario ON lecturas_avisos(usuario_id);

-- ============================================================================
-- TRIGGER: Actualizar updated_at automáticamente
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_avisos_updated_at BEFORE UPDATE ON avisos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_documentos_updated_at BEFORE UPDATE ON documentos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- VISTA: avisos_con_estadisticas
-- Descripción: Avisos con conteo de lecturas
-- ============================================================================
CREATE OR REPLACE VIEW avisos_con_estadisticas AS
SELECT
  a.*,
  u.name as publicado_por_nombre,
  COUNT(DISTINCT la.usuario_id) as total_lecturas
FROM avisos a
LEFT JOIN users u ON a.publicado_por = u.id
LEFT JOIN lecturas_avisos la ON a.id = la.aviso_id
GROUP BY a.id, u.name;

-- ============================================================================
-- VISTA: documentos_recientes
-- Descripción: Últimos documentos subidos por condominio
-- ============================================================================
CREATE OR REPLACE VIEW documentos_recientes AS
SELECT
  d.*,
  u.name as subido_por_nombre,
  c.nombre as condominio_nombre
FROM documentos d
LEFT JOIN users u ON d.subido_por = u.id
LEFT JOIN condominios c ON d.condominio_id = c.id
WHERE d.activo = true
ORDER BY d.created_at DESC;

-- ============================================================================
-- DATOS DE EJEMPLO (comentados - descomentar si necesitas datos de prueba)
-- ============================================================================
-- INSERT INTO avisos (condominio_id, titulo, contenido, tipo, prioridad, publicado_por) VALUES
-- (1, 'Mantenimiento Programado', 'Se realizará mantenimiento de elevadores el día 15 de enero de 9:00 a 14:00 hrs.', 'mantenimiento', 'alta', 1),
-- (1, 'Asamblea General', 'Se convoca a asamblea general de condóminos para el próximo 20 de enero a las 18:00 hrs en el salón de eventos.', 'evento', 'normal', 1);

-- ============================================================================
-- FIN DEL SCRIPT
-- ============================================================================
COMMENT ON TABLE avisos IS 'Avisos y comunicados del condominio';
COMMENT ON TABLE documentos IS 'Documentos oficiales (minutas, reglamentos, etc)';
COMMENT ON TABLE lecturas_avisos IS 'Tracking de lectura de avisos por usuario';
