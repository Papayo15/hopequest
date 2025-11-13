-- ============================================================================
-- AMPLIACIÓN DE TABLA USERS
-- Agregar campos: teléfono, cuota mensual, relación con unidad
-- ============================================================================

-- Agregar teléfono
ALTER TABLE users ADD COLUMN IF NOT EXISTS telefono VARCHAR(20);

-- Agregar cuota mensual que paga este residente
ALTER TABLE users ADD COLUMN IF NOT EXISTS cuota_mensual DECIMAL(10,2) DEFAULT 0.00;

-- Agregar relación directa con unidad (casa/depto)
ALTER TABLE users ADD COLUMN IF NOT EXISTS unidad_id INTEGER REFERENCES unidades(id) ON DELETE SET NULL;

-- Agregar relación con condominio (automático cuando se registra)
ALTER TABLE users ADD COLUMN IF NOT EXISTS condominio_id INTEGER REFERENCES condominios(id) ON DELETE SET NULL;

-- Índices para optimización
CREATE INDEX IF NOT EXISTS idx_users_unidad ON users(unidad_id);
CREATE INDEX IF NOT EXISTS idx_users_condominio ON users(condominio_id);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Comentarios
COMMENT ON COLUMN users.telefono IS 'Teléfono de contacto del residente';
COMMENT ON COLUMN users.cuota_mensual IS 'Cuota mensual que paga el residente';
COMMENT ON COLUMN users.unidad_id IS 'Unidad (casa/depto) asignada al residente';
COMMENT ON COLUMN users.condominio_id IS 'Condominio al que pertenece el residente';

-- ============================================================================
-- VISTA: residentes_completo
-- Información completa de residentes con su unidad y condominio
-- ============================================================================
CREATE OR REPLACE VIEW residentes_completo AS
SELECT
  u.id,
  u.name as nombre,
  u.email,
  u.telefono,
  u.cuota_mensual,
  u.role,
  un.numero as casa_numero,
  c.nombre as condominio_nombre,
  c.id as condominio_id,
  u.created_at as fecha_registro
FROM users u
LEFT JOIN unidades un ON u.unidad_id = un.id
LEFT JOIN condominios c ON u.condominio_id = c.id
WHERE u.role = 'residente'
ORDER BY c.nombre, un.numero;

-- ============================================================================
-- VISTA: resumen_cobranza_mensual
-- Resumen de cobranza: quién debe pagar, cuánto, y su estado (cálculo automático)
-- ============================================================================
CREATE OR REPLACE VIEW resumen_cobranza_mensual AS
SELECT
  u.id as residente_id,
  u.name as nombre,
  u.email,
  u.telefono,
  c.nombre as condominio,
  un.numero as casa,
  u.cuota_mensual,
  COALESCE(SUM(CASE WHEN p.estado = 'completado'
    AND DATE_TRUNC('month', p.fecha_pago) = DATE_TRUNC('month', CURRENT_DATE)
    THEN p.monto ELSE 0 END), 0) as pagado_mes_actual,
  u.cuota_mensual - COALESCE(SUM(CASE WHEN p.estado = 'completado'
    AND DATE_TRUNC('month', p.fecha_pago) = DATE_TRUNC('month', CURRENT_DATE)
    THEN p.monto ELSE 0 END), 0) as saldo_pendiente,
  CASE
    WHEN COALESCE(SUM(CASE WHEN p.estado = 'completado'
      AND DATE_TRUNC('month', p.fecha_pago) = DATE_TRUNC('month', CURRENT_DATE)
      THEN p.monto ELSE 0 END), 0) >= u.cuota_mensual
    THEN 'PAGADO'
    ELSE 'PENDIENTE'
  END as estado_pago
FROM users u
LEFT JOIN unidades un ON u.unidad_id = un.id
LEFT JOIN condominios c ON u.condominio_id = c.id
LEFT JOIN pagos p ON p.id_residente = u.id
WHERE u.role = 'residente'
GROUP BY u.id, u.name, u.email, u.telefono, c.nombre, un.numero, u.cuota_mensual
ORDER BY c.nombre, un.numero;

-- ============================================================================
-- VISTA: balance_cuenta_bancaria
-- Cálculo automático del saldo en cuenta del condominio
-- Ingresos (pagos de residentes) - Egresos (pagos a proveedores)
-- ============================================================================
CREATE OR REPLACE VIEW balance_cuenta_bancaria AS
SELECT
  c.id as condominio_id,
  c.nombre as condominio,
  COALESCE((
    SELECT SUM(p.monto)
    FROM users u
    JOIN pagos p ON p.id_residente = u.id
    WHERE u.condominio_id = c.id AND p.estado = 'completado'
  ), 0) as total_ingresos_cuotas,
  COALESCE((
    SELECT SUM(monto) FROM ingresos WHERE id_condominio = c.id
  ), 0) as ingresos_adicionales,
  COALESCE((
    SELECT SUM(monto) FROM egresos WHERE id_condominio = c.id
  ), 0) as total_egresos,
  COALESCE((
    SELECT SUM(p.monto)
    FROM users u
    JOIN pagos p ON p.id_residente = u.id
    WHERE u.condominio_id = c.id AND p.estado = 'completado'
  ), 0) + COALESCE((
    SELECT SUM(monto) FROM ingresos WHERE id_condominio = c.id
  ), 0) - COALESCE((
    SELECT SUM(monto) FROM egresos WHERE id_condominio = c.id
  ), 0) as saldo_cuenta_bancaria,
  CURRENT_TIMESTAMP as calculado_en
FROM condominios c;

-- ============================================================================
-- VISTA: reporte_financiero_detallado
-- Reporte completo para descargar (PDF): ingresos, egresos, balance por mes
-- ============================================================================
CREATE OR REPLACE VIEW reporte_financiero_detallado AS
SELECT
  c.id as condominio_id,
  c.nombre as condominio,
  DATE_TRUNC('month', p.fecha_pago) as mes,
  COUNT(p.id) as total_pagos_recibidos,
  SUM(p.monto) as ingresos_cuotas_mes,
  0 as egresos_mes,
  SUM(p.monto) as balance_mes
FROM condominios c
JOIN users u ON u.condominio_id = c.id AND u.role = 'residente'
JOIN pagos p ON p.id_residente = u.id AND p.estado = 'completado'
GROUP BY c.id, c.nombre, DATE_TRUNC('month', p.fecha_pago)
ORDER BY c.nombre, mes DESC;

-- ============================================================================
-- FIN
-- ============================================================================
