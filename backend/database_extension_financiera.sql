-- EXTENSIÓN FINANCIERA COMPLETA - CONDOMINIO360
-- Agregar estas tablas DESPUÉS de ejecutar database_init.sql

-- ============================================================================
-- MEJORA DE TABLA PAGOS (Agregar campos faltantes)
-- ============================================================================

ALTER TABLE pagos ADD COLUMN IF NOT EXISTS metodo_pago VARCHAR(50) DEFAULT 'stripe'
  CHECK (metodo_pago IN ('stripe', 'transferencia', 'efectivo', 'cheque', 'tarjeta'));
ALTER TABLE pagos ADD COLUMN IF NOT EXISTS tipo_cuota VARCHAR(50) DEFAULT 'mantenimiento'
  CHECK (tipo_cuota IN ('mantenimiento', 'extraordinaria', 'agua', 'gas', 'otros'));
ALTER TABLE pagos ADD COLUMN IF NOT EXISTS mes VARCHAR(20);
ALTER TABLE pagos ADD COLUMN IF NOT EXISTS anio INT;
ALTER TABLE pagos ADD COLUMN IF NOT EXISTS referencia VARCHAR(100); -- Para transferencias
ALTER TABLE pagos ADD COLUMN IF NOT EXISTS comprobante_url TEXT; -- URL del comprobante
ALTER TABLE pagos ADD COLUMN IF NOT EXISTS notas TEXT;
ALTER TABLE pagos ADD COLUMN IF NOT EXISTS registrado_por INT REFERENCES users(id); -- Admin que registró
ALTER TABLE pagos ADD COLUMN IF NOT EXISTS fecha_vencimiento DATE;
ALTER TABLE pagos ADD COLUMN IF NOT EXISTS recargo DECIMAL(10,2) DEFAULT 0;

-- Índices adicionales
CREATE INDEX IF NOT EXISTS idx_pagos_metodo ON pagos(metodo_pago);
CREATE INDEX IF NOT EXISTS idx_pagos_tipo_cuota ON pagos(tipo_cuota);
CREATE INDEX IF NOT EXISTS idx_pagos_mes_anio ON pagos(mes, anio);
CREATE INDEX IF NOT EXISTS idx_pagos_vencimiento ON pagos(fecha_vencimiento);

-- ============================================================================
-- TABLA: ESTADOS DE CUENTA POR RESIDENTE
-- ============================================================================

CREATE TABLE IF NOT EXISTS estados_cuenta (
  id SERIAL PRIMARY KEY,
  id_residente INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  id_unidad INT REFERENCES unidades(id) ON DELETE SET NULL,
  mes VARCHAR(20) NOT NULL,
  anio INT NOT NULL,
  saldo_anterior DECIMAL(10,2) DEFAULT 0,
  cargos_mes DECIMAL(10,2) DEFAULT 0,
  pagos_mes DECIMAL(10,2) DEFAULT 0,
  saldo_actual DECIMAL(10,2) DEFAULT 0,
  estado VARCHAR(20) DEFAULT 'abierto' CHECK (estado IN ('abierto', 'cerrado', 'pagado')),
  fecha_generacion TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(id_residente, mes, anio)
);

CREATE INDEX idx_estados_residente ON estados_cuenta(id_residente);
CREATE INDEX idx_estados_mes_anio ON estados_cuenta(mes, anio);
CREATE INDEX idx_estados_estado ON estados_cuenta(estado);

COMMENT ON TABLE estados_cuenta IS 'Estado de cuenta mensual de cada residente';

-- ============================================================================
-- TABLA: PROVEEDORES / SERVICIOS
-- ============================================================================

CREATE TABLE IF NOT EXISTS proveedores (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('mantenimiento', 'seguridad', 'limpieza', 'jardineria', 'electricidad', 'plomeria', 'internet', 'cfe', 'agua', 'gas', 'otros')),
  contacto VARCHAR(100),
  telefono VARCHAR(20),
  email VARCHAR(120),
  rfc VARCHAR(20),
  direccion TEXT,
  cuenta_bancaria VARCHAR(50),
  banco VARCHAR(100),
  activo BOOLEAN DEFAULT TRUE,
  notas TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_proveedores_tipo ON proveedores(tipo);
CREATE INDEX idx_proveedores_activo ON proveedores(activo);
CREATE INDEX idx_proveedores_nombre ON proveedores(nombre);

COMMENT ON TABLE proveedores IS 'Proveedores y prestadores de servicios del condominio';

-- ============================================================================
-- TABLA: EGRESOS / GASTOS DEL CONDOMINIO
-- ============================================================================

CREATE TABLE IF NOT EXISTS egresos (
  id SERIAL PRIMARY KEY,
  id_condominio INT NOT NULL REFERENCES condominios(id) ON DELETE CASCADE,
  id_proveedor INT REFERENCES proveedores(id) ON DELETE SET NULL,
  concepto VARCHAR(200) NOT NULL,
  descripcion TEXT,
  monto DECIMAL(10,2) NOT NULL CHECK (monto > 0),
  categoria VARCHAR(50) NOT NULL CHECK (categoria IN ('servicios', 'mantenimiento', 'reparaciones', 'sueldos', 'seguros', 'impuestos', 'suministros', 'otros')),
  metodo_pago VARCHAR(50) DEFAULT 'transferencia' CHECK (metodo_pago IN ('transferencia', 'efectivo', 'cheque', 'tarjeta')),
  referencia VARCHAR(100),
  factura_numero VARCHAR(50),
  factura_url TEXT,
  comprobante_url TEXT,
  mes VARCHAR(20),
  anio INT,
  fecha_egreso DATE DEFAULT CURRENT_DATE,
  autorizado_por INT REFERENCES users(id),
  registrado_por INT NOT NULL REFERENCES users(id),
  estado VARCHAR(20) DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'pagado', 'cancelado')),
  notas TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_egresos_condominio ON egresos(id_condominio);
CREATE INDEX idx_egresos_proveedor ON egresos(id_proveedor);
CREATE INDEX idx_egresos_categoria ON egresos(categoria);
CREATE INDEX idx_egresos_fecha ON egresos(fecha_egreso);
CREATE INDEX idx_egresos_mes_anio ON egresos(mes, anio);
CREATE INDEX idx_egresos_estado ON egresos(estado);

COMMENT ON TABLE egresos IS 'Gastos y egresos del condominio';

-- ============================================================================
-- TABLA: INGRESOS ADICIONALES (No pagos de residentes)
-- ============================================================================

CREATE TABLE IF NOT EXISTS ingresos (
  id SERIAL PRIMARY KEY,
  id_condominio INT NOT NULL REFERENCES condominios(id) ON DELETE CASCADE,
  concepto VARCHAR(200) NOT NULL,
  descripcion TEXT,
  monto DECIMAL(10,2) NOT NULL CHECK (monto > 0),
  categoria VARCHAR(50) NOT NULL CHECK (categoria IN ('renta_espacios', 'multas', 'eventos', 'estacionamiento', 'publicidad', 'intereses', 'otros')),
  metodo_pago VARCHAR(50) DEFAULT 'transferencia',
  referencia VARCHAR(100),
  comprobante_url TEXT,
  mes VARCHAR(20),
  anio INT,
  fecha_ingreso DATE DEFAULT CURRENT_DATE,
  registrado_por INT NOT NULL REFERENCES users(id),
  notas TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_ingresos_condominio ON ingresos(id_condominio);
CREATE INDEX idx_ingresos_categoria ON ingresos(categoria);
CREATE INDEX idx_ingresos_fecha ON ingresos(fecha_ingreso);
CREATE INDEX idx_ingresos_mes_anio ON ingresos(mes, anio);

COMMENT ON TABLE ingresos IS 'Ingresos adicionales del condominio (no cuotas)';

-- ============================================================================
-- TABLA: REPORTES DE COBRANZA
-- ============================================================================

CREATE TABLE IF NOT EXISTS reporte_cobranza (
  id SERIAL PRIMARY KEY,
  id_condominio INT NOT NULL REFERENCES condominios(id) ON DELETE CASCADE,
  mes VARCHAR(20) NOT NULL,
  anio INT NOT NULL,
  total_residentes INT DEFAULT 0,
  residentes_pagaron INT DEFAULT 0,
  residentes_deben INT DEFAULT 0,
  monto_esperado DECIMAL(10,2) DEFAULT 0,
  monto_cobrado DECIMAL(10,2) DEFAULT 0,
  monto_pendiente DECIMAL(10,2) DEFAULT 0,
  porcentaje_cobranza DECIMAL(5,2) DEFAULT 0,
  fecha_generacion TIMESTAMP DEFAULT NOW(),
  generado_por INT REFERENCES users(id),
  UNIQUE(id_condominio, mes, anio)
);

CREATE INDEX idx_reporte_cobranza_condominio ON reporte_cobranza(id_condominio);
CREATE INDEX idx_reporte_cobranza_mes_anio ON reporte_cobranza(mes, anio);

COMMENT ON TABLE reporte_cobranza IS 'Resumen mensual de cobranza por condominio';

-- ============================================================================
-- TABLA: CUOTAS CONFIGURADAS (Definir cuotas mensuales)
-- ============================================================================

CREATE TABLE IF NOT EXISTS cuotas_configuracion (
  id SERIAL PRIMARY KEY,
  id_condominio INT NOT NULL REFERENCES condominios(id) ON DELETE CASCADE,
  tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('mantenimiento', 'agua', 'gas', 'seguridad', 'otros')),
  nombre VARCHAR(100) NOT NULL,
  monto_base DECIMAL(10,2) NOT NULL CHECK (monto_base > 0),
  frecuencia VARCHAR(20) DEFAULT 'mensual' CHECK (frecuencia IN ('mensual', 'bimestral', 'trimestral', 'anual')),
  dia_vencimiento INT DEFAULT 10 CHECK (dia_vencimiento BETWEEN 1 AND 31),
  recargo_porcentaje DECIMAL(5,2) DEFAULT 0,
  activo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_cuotas_config_condominio ON cuotas_configuracion(id_condominio);
CREATE INDEX idx_cuotas_config_tipo ON cuotas_configuracion(tipo);
CREATE INDEX idx_cuotas_config_activo ON cuotas_configuracion(activo);

COMMENT ON TABLE cuotas_configuracion IS 'Configuración de cuotas por condominio';

-- ============================================================================
-- TABLA: MOROSOS / DEUDORES
-- ============================================================================

CREATE TABLE IF NOT EXISTS morosos (
  id SERIAL PRIMARY KEY,
  id_residente INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  id_unidad INT REFERENCES unidades(id) ON DELETE SET NULL,
  monto_adeudado DECIMAL(10,2) NOT NULL CHECK (monto_adeudado > 0),
  meses_adeudados INT DEFAULT 1,
  fecha_primer_incumplimiento DATE,
  fecha_ultima_actualizacion TIMESTAMP DEFAULT NOW(),
  notificado BOOLEAN DEFAULT FALSE,
  fecha_notificacion DATE,
  en_plan_pagos BOOLEAN DEFAULT FALSE,
  notas TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_morosos_residente ON morosos(id_residente);
CREATE INDEX idx_morosos_unidad ON morosos(id_unidad);
CREATE INDEX idx_morosos_notificado ON morosos(notificado);
CREATE INDEX idx_morosos_monto ON morosos(monto_adeudado);

COMMENT ON TABLE morosos IS 'Registro de residentes con adeudos';

-- ============================================================================
-- VISTAS ÚTILES
-- ============================================================================

-- Vista: Resumen financiero por mes
CREATE OR REPLACE VIEW vista_resumen_financiero AS
SELECT
  c.id as condominio_id,
  c.nombre as condominio,
  e.mes,
  e.anio,
  COALESCE(SUM(p.monto), 0) as total_ingresos_cuotas,
  COALESCE(SUM(i.monto), 0) as total_ingresos_otros,
  COALESCE(SUM(eg.monto), 0) as total_egresos,
  (COALESCE(SUM(p.monto), 0) + COALESCE(SUM(i.monto), 0) - COALESCE(SUM(eg.monto), 0)) as saldo
FROM condominios c
CROSS JOIN (SELECT DISTINCT mes, anio FROM pagos WHERE mes IS NOT NULL AND anio IS NOT NULL) e
LEFT JOIN pagos p ON p.mes = e.mes AND p.anio = e.anio AND p.estado = 'completado'
LEFT JOIN ingresos i ON i.mes = e.mes AND i.anio = e.anio
LEFT JOIN egresos eg ON eg.mes = e.mes AND eg.anio = e.anio AND eg.estado = 'pagado'
GROUP BY c.id, c.nombre, e.mes, e.anio
ORDER BY e.anio DESC, e.mes DESC;

-- Vista: Residentes que deben del mes actual
CREATE OR REPLACE VIEW vista_deudores_mes_actual AS
SELECT
  u.id,
  u.name as residente,
  u.email,
  un.numero as unidad,
  c.nombre as condominio,
  COALESCE(SUM(p.monto), 0) as monto_adeudado,
  COUNT(p.id) as cuotas_pendientes
FROM users u
JOIN unidades un ON un.id_residente = u.id
JOIN condominios c ON c.id = un.id_condominio
LEFT JOIN pagos p ON p.id_residente = u.id
  AND p.estado = 'pendiente'
  AND EXTRACT(MONTH FROM p.fecha_vencimiento) = EXTRACT(MONTH FROM CURRENT_DATE)
  AND EXTRACT(YEAR FROM p.fecha_vencimiento) = EXTRACT(YEAR FROM CURRENT_DATE)
WHERE u.role = 'residente'
GROUP BY u.id, u.name, u.email, un.numero, c.nombre
HAVING COUNT(p.id) > 0
ORDER BY monto_adeudado DESC;

-- ============================================================================
-- TRIGGERS PARA ACTUALIZACIÓN AUTOMÁTICA
-- ============================================================================

-- Trigger para actualizar updated_at en proveedores
CREATE TRIGGER update_proveedores_updated_at BEFORE UPDATE ON proveedores
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger para actualizar updated_at en egresos
CREATE TRIGGER update_egresos_updated_at BEFORE UPDATE ON egresos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger para actualizar updated_at en cuotas_configuracion
CREATE TRIGGER update_cuotas_config_updated_at BEFORE UPDATE ON cuotas_configuracion
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- DATOS DE EJEMPLO PARA PROVEEDORES
-- ============================================================================

INSERT INTO proveedores (nombre, tipo, contacto, telefono, email) VALUES
('CFE - Comisión Federal de Electricidad', 'cfe', 'Servicio CFE', '071', 'atencion@cfe.mx'),
('Total Play Internet', 'internet', 'Soporte Total Play', '5555-1234', 'soporte@totalplay.com'),
('Agua y Drenaje Municipal', 'agua', 'Servicio Municipal', '5555-5678', 'agua@municipal.gob'),
('Mantenimiento Express', 'mantenimiento', 'Juan Pérez', '5512-3456', 'contacto@mantexpress.com'),
('Seguridad Privada 24/7', 'seguridad', 'Roberto García', '5598-7654', 'info@seguridad247.com'),
('Gas Natural México', 'gas', 'Servicio Gas', '088', 'atencion@gasnatural.mx')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- FUNCIONES ÚTILES
-- ============================================================================

-- Función: Calcular estado de cuenta de un residente
CREATE OR REPLACE FUNCTION calcular_estado_cuenta(residente_id INT, mes_param VARCHAR, anio_param INT)
RETURNS TABLE (
  saldo_anterior DECIMAL,
  cargos DECIMAL,
  pagos DECIMAL,
  saldo_actual DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COALESCE(e.saldo_actual, 0) as saldo_anterior,
    COALESCE(SUM(CASE WHEN p.mes = mes_param AND p.anio = anio_param THEN p.monto ELSE 0 END), 0) as cargos,
    COALESCE(SUM(CASE WHEN p.mes = mes_param AND p.anio = anio_param AND p.estado = 'completado' THEN p.monto ELSE 0 END), 0) as pagos,
    (COALESCE(e.saldo_actual, 0) +
     COALESCE(SUM(CASE WHEN p.mes = mes_param AND p.anio = anio_param THEN p.monto ELSE 0 END), 0) -
     COALESCE(SUM(CASE WHEN p.mes = mes_param AND p.anio = anio_param AND p.estado = 'completado' THEN p.monto ELSE 0 END), 0)) as saldo_actual
  FROM users u
  LEFT JOIN estados_cuenta e ON e.id_residente = u.id
    AND e.mes < mes_param
    AND e.anio <= anio_param
  LEFT JOIN pagos p ON p.id_residente = u.id
  WHERE u.id = residente_id
  GROUP BY u.id, e.saldo_actual;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- COMENTARIOS FINALES
-- ============================================================================

COMMENT ON DATABASE condominio360 IS 'Sistema completo de gestión de condominios con módulo financiero avanzado';

-- Fin de la extensión financiera
