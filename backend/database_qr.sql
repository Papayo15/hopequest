-- ================================================================
-- EXTENSIÓN QR: Sistema de Códigos QR para Visitantes
-- ================================================================
-- Este archivo añade las tablas necesarias para el sistema de QR
-- Ejecutar después de database_init.sql
-- ================================================================

-- Tabla: codigos_qr
-- Almacena los códigos QR generados por residentes para sus visitas
CREATE TABLE IF NOT EXISTS codigos_qr (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(255) UNIQUE NOT NULL,
    id_usuario INTEGER REFERENCES users(id) ON DELETE CASCADE,
    id_condominio INTEGER REFERENCES condominios(id) ON DELETE CASCADE,
    id_unidad INTEGER REFERENCES unidades(id) ON DELETE SET NULL,

    -- Datos del visitante
    nombre_visitante VARCHAR(255) NOT NULL,
    documento_visitante VARCHAR(50),
    telefono_visitante VARCHAR(20),
    motivo_visita TEXT,

    -- Fechas y estado
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_expiracion TIMESTAMP NOT NULL,
    fecha_uso TIMESTAMP,

    -- Estado del código
    estado VARCHAR(20) DEFAULT 'activo', -- activo, usado, expirado, cancelado
    usado BOOLEAN DEFAULT FALSE,

    -- Datos de validación (cuando se usa el código)
    validado_por INTEGER REFERENCES users(id) ON DELETE SET NULL, -- ID del vigilante
    notas_validacion TEXT,

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: push_tokens
-- Almacena los tokens de notificaciones push de los dispositivos móviles
CREATE TABLE IF NOT EXISTS push_tokens (
    id SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES users(id) ON DELETE CASCADE,
    push_token VARCHAR(500) NOT NULL UNIQUE,
    plataforma VARCHAR(20) NOT NULL, -- ios, android
    modelo_dispositivo VARCHAR(100),
    version_app VARCHAR(20),

    -- Gestión de tokens
    activo BOOLEAN DEFAULT TRUE,
    ultimo_uso TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Constraint: un usuario puede tener múltiples dispositivos
    CONSTRAINT unique_user_token UNIQUE(id_usuario, push_token)
);

-- Tabla: historial_accesos
-- Registro de todos los accesos validados con QR
CREATE TABLE IF NOT EXISTS historial_accesos (
    id SERIAL PRIMARY KEY,
    id_codigo_qr INTEGER REFERENCES codigos_qr(id) ON DELETE CASCADE,
    id_condominio INTEGER REFERENCES condominios(id) ON DELETE CASCADE,
    id_unidad INTEGER REFERENCES unidades(id) ON DELETE SET NULL,

    -- Datos del acceso
    nombre_visitante VARCHAR(255) NOT NULL,
    tipo_acceso VARCHAR(50) DEFAULT 'visita', -- visita, delivery, servicio, emergencia
    validado_por INTEGER REFERENCES users(id) ON DELETE SET NULL, -- vigilante

    -- Detalles
    fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_salida TIMESTAMP,
    notas TEXT,
    foto_visitante TEXT, -- URL si se captura foto

    -- Geolocalización (opcional)
    latitud DECIMAL(10, 8),
    longitud DECIMAL(11, 8),

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: configuracion_qr
-- Configuración personalizada del sistema QR por condominio
CREATE TABLE IF NOT EXISTS configuracion_qr (
    id SERIAL PRIMARY KEY,
    id_condominio INTEGER REFERENCES condominios(id) ON DELETE CASCADE UNIQUE,

    -- Configuración de códigos
    duracion_default_horas INTEGER DEFAULT 24, -- duración por defecto
    max_usos_por_codigo INTEGER DEFAULT 1, -- si se permite reusar códigos
    requiere_aprobacion_admin BOOLEAN DEFAULT FALSE,

    -- Configuración de notificaciones
    notificar_residente_ingreso BOOLEAN DEFAULT TRUE,
    notificar_residente_salida BOOLEAN DEFAULT FALSE,
    notificar_admin_accesos BOOLEAN DEFAULT FALSE,

    -- Seguridad
    requiere_documento BOOLEAN DEFAULT TRUE,
    requiere_foto BOOLEAN DEFAULT FALSE,
    validacion_biometrica BOOLEAN DEFAULT FALSE,

    -- Horarios permitidos
    horario_inicio TIME DEFAULT '00:00:00',
    horario_fin TIME DEFAULT '23:59:59',
    permitir_fines_semana BOOLEAN DEFAULT TRUE,

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================================================
-- ÍNDICES para optimizar consultas
-- ================================================================

-- Búsqueda rápida de códigos QR
CREATE INDEX idx_codigos_qr_codigo ON codigos_qr(codigo);
CREATE INDEX idx_codigos_qr_estado ON codigos_qr(estado);
CREATE INDEX idx_codigos_qr_usuario ON codigos_qr(id_usuario);
CREATE INDEX idx_codigos_qr_condominio ON codigos_qr(id_condominio);
CREATE INDEX idx_codigos_qr_fecha_expiracion ON codigos_qr(fecha_expiracion);

-- Índices para push tokens
CREATE INDEX idx_push_tokens_usuario ON push_tokens(id_usuario);
CREATE INDEX idx_push_tokens_activo ON push_tokens(activo);

-- Índices para historial
CREATE INDEX idx_historial_accesos_condominio ON historial_accesos(id_condominio);
CREATE INDEX idx_historial_accesos_fecha ON historial_accesos(fecha_ingreso);
CREATE INDEX idx_historial_accesos_qr ON historial_accesos(id_codigo_qr);

-- ================================================================
-- FUNCIONES AUXILIARES
-- ================================================================

-- Función: Actualizar estado de códigos expirados automáticamente
CREATE OR REPLACE FUNCTION actualizar_codigos_expirados()
RETURNS void AS $$
BEGIN
    UPDATE codigos_qr
    SET estado = 'expirado'
    WHERE fecha_expiracion < NOW()
    AND estado = 'activo';
END;
$$ LANGUAGE plpgsql;

-- Función: Obtener estadísticas de accesos por condominio
CREATE OR REPLACE FUNCTION estadisticas_accesos_condominio(p_id_condominio INTEGER, p_fecha_inicio DATE, p_fecha_fin DATE)
RETURNS TABLE(
    total_accesos BIGINT,
    accesos_exitosos BIGINT,
    accesos_rechazados BIGINT,
    visitantes_unicos BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        COUNT(*) as total_accesos,
        COUNT(*) FILTER (WHERE fecha_ingreso IS NOT NULL) as accesos_exitosos,
        COUNT(*) FILTER (WHERE fecha_ingreso IS NULL) as accesos_rechazados,
        COUNT(DISTINCT nombre_visitante) as visitantes_unicos
    FROM historial_accesos
    WHERE id_condominio = p_id_condominio
    AND created_at BETWEEN p_fecha_inicio AND p_fecha_fin;
END;
$$ LANGUAGE plpgsql;

-- ================================================================
-- TRIGGERS
-- ================================================================

-- Trigger: Actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_codigos_qr_updated_at
    BEFORE UPDATE ON codigos_qr
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_push_tokens_updated_at
    BEFORE UPDATE ON push_tokens
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_configuracion_qr_updated_at
    BEFORE UPDATE ON configuracion_qr
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ================================================================
-- DATOS INICIALES
-- ================================================================

-- Insertar configuración por defecto para condominios existentes
INSERT INTO configuracion_qr (id_condominio)
SELECT id FROM condominios
WHERE id NOT IN (SELECT id_condominio FROM configuracion_qr WHERE id_condominio IS NOT NULL);

-- ================================================================
-- VISTAS ÚTILES
-- ================================================================

-- Vista: Códigos QR activos con información completa
CREATE OR REPLACE VIEW v_codigos_qr_activos AS
SELECT
    cq.id,
    cq.codigo,
    u.nombre as residente,
    u.email as email_residente,
    c.nombre as condominio,
    un.numero_unidad,
    cq.nombre_visitante,
    cq.documento_visitante,
    cq.telefono_visitante,
    cq.fecha_creacion,
    cq.fecha_expiracion,
    cq.estado,
    cq.usado,
    CASE
        WHEN cq.fecha_expiracion < NOW() THEN 'Expirado'
        WHEN cq.usado THEN 'Usado'
        ELSE 'Activo'
    END as estado_actual
FROM codigos_qr cq
JOIN users u ON cq.id_usuario = u.id
JOIN condominios c ON cq.id_condominio = c.id
LEFT JOIN unidades un ON cq.id_unidad = un.id
WHERE cq.estado IN ('activo', 'usado')
ORDER BY cq.fecha_creacion DESC;

-- Vista: Historial de accesos con detalles
CREATE OR REPLACE VIEW v_historial_accesos_detallado AS
SELECT
    ha.id,
    ha.nombre_visitante,
    ha.tipo_acceso,
    c.nombre as condominio,
    un.numero_unidad,
    uv.nombre as vigilante,
    ha.fecha_ingreso,
    ha.fecha_salida,
    EXTRACT(EPOCH FROM (ha.fecha_salida - ha.fecha_ingreso))/3600 as horas_estancia,
    ha.notas,
    ha.created_at
FROM historial_accesos ha
JOIN condominios c ON ha.id_condominio = c.id
LEFT JOIN unidades un ON ha.id_unidad = un.id
LEFT JOIN users uv ON ha.validado_por = uv.id
ORDER BY ha.fecha_ingreso DESC;

-- ================================================================
-- PERMISOS (ajustar según tus necesidades)
-- ================================================================

-- Nota: Ajusta estos permisos según tu configuración de roles
-- GRANT SELECT, INSERT, UPDATE ON codigos_qr TO rol_residente;
-- GRANT SELECT, UPDATE ON codigos_qr TO rol_vigilancia;
-- GRANT ALL PRIVILEGES ON codigos_qr TO rol_admin;

-- ================================================================
-- NOTAS DE USO
-- ================================================================

/*
EJEMPLOS DE USO:

1. Generar un código QR:
INSERT INTO codigos_qr (codigo, id_usuario, id_condominio, nombre_visitante, fecha_expiracion)
VALUES ('QR-1234567890-101-abc123', 1, 1, 'Juan Pérez', NOW() + INTERVAL '24 hours')
RETURNING *;

2. Validar un código QR:
UPDATE codigos_qr
SET usado = TRUE,
    estado = 'usado',
    fecha_uso = NOW(),
    validado_por = 2
WHERE codigo = 'QR-1234567890-101-abc123'
AND estado = 'activo'
AND fecha_expiracion > NOW()
RETURNING *;

3. Registrar acceso en historial:
INSERT INTO historial_accesos (id_codigo_qr, id_condominio, nombre_visitante, validado_por)
VALUES (1, 1, 'Juan Pérez', 2);

4. Obtener estadísticas:
SELECT * FROM estadisticas_accesos_condominio(1, '2025-01-01', '2025-12-31');

5. Ver códigos activos:
SELECT * FROM v_codigos_qr_activos WHERE condominio = 'Torres del Sol';

6. Actualizar códigos expirados:
SELECT actualizar_codigos_expirados();
*/

-- ================================================================
-- FIN DEL SCRIPT
-- ================================================================
