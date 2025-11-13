-- Condominio360 - Database Initialization Script
-- PostgreSQL Database Schema

-- Drop tables if exist (for clean reinstall)
DROP TABLE IF EXISTS reservas CASCADE;
DROP TABLE IF EXISTS pagos CASCADE;
DROP TABLE IF EXISTS unidades CASCADE;
DROP TABLE IF EXISTS condominios CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Table: users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(120) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role VARCHAR(20) DEFAULT 'residente' CHECK (role IN ('residente', 'admin', 'conserje')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Table: condominios
CREATE TABLE condominios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  direccion TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Table: unidades (departamentos/casas)
CREATE TABLE unidades (
  id SERIAL PRIMARY KEY,
  numero VARCHAR(20) NOT NULL,
  id_condominio INT NOT NULL REFERENCES condominios(id) ON DELETE CASCADE,
  id_residente INT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(numero, id_condominio)
);

-- Table: pagos
CREATE TABLE pagos (
  id SERIAL PRIMARY KEY,
  id_residente INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  monto DECIMAL(10,2) NOT NULL CHECK (monto > 0),
  descripcion TEXT NOT NULL,
  estado VARCHAR(20) DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'completado', 'cancelado')),
  stripe_session_id VARCHAR(255),
  fecha_pago TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table: reservas (áreas comunes)
CREATE TABLE reservas (
  id SERIAL PRIMARY KEY,
  id_residente INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  area VARCHAR(50) NOT NULL CHECK (area IN ('salon', 'piscina', 'gimnasio', 'terraza', 'salon_juegos', 'cancha')),
  fecha DATE NOT NULL,
  hora_inicio TIME NOT NULL,
  hora_fin TIME NOT NULL,
  estado VARCHAR(20) DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'confirmada', 'cancelada')),
  created_at TIMESTAMP DEFAULT NOW(),
  CHECK (hora_fin > hora_inicio),
  CHECK (fecha >= CURRENT_DATE)
);

-- Índices para optimización de consultas
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

CREATE INDEX idx_condominios_nombre ON condominios(nombre);

CREATE INDEX idx_unidades_condominio ON unidades(id_condominio);
CREATE INDEX idx_unidades_residente ON unidades(id_residente);

CREATE INDEX idx_pagos_residente ON pagos(id_residente);
CREATE INDEX idx_pagos_estado ON pagos(estado);
CREATE INDEX idx_pagos_fecha ON pagos(fecha_pago);
CREATE INDEX idx_pagos_stripe_session ON pagos(stripe_session_id);

CREATE INDEX idx_reservas_residente ON reservas(id_residente);
CREATE INDEX idx_reservas_fecha ON reservas(fecha);
CREATE INDEX idx_reservas_area ON reservas(area);
CREATE INDEX idx_reservas_estado ON reservas(estado);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_condominios_updated_at BEFORE UPDATE ON condominios
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_unidades_updated_at BEFORE UPDATE ON unidades
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Datos de ejemplo (opcional - comentar en producción)
-- Usuario administrador de prueba (password: Admin123)
INSERT INTO users (name, email, password, role) VALUES
('Admin Condominio360', 'admin@condominio360.com', '$2b$10$rqZ5qF5qF5qF5qF5qF5qFuhW6q5qF5qF5qF5qF5qF5qF5qF5qF5qF', 'admin');

-- Usuario residente de prueba (password: User123)
INSERT INTO users (name, email, password, role) VALUES
('Juan Pérez', 'juan@example.com', '$2b$10$rqZ5qF5qF5qF5qF5qF5qFuhW6q5qF5qF5qF5qF5qF5qF5qF5qF5qF', 'residente');

-- Condominio de ejemplo
INSERT INTO condominios (nombre, direccion) VALUES
('Torres del Sol', 'Av. Principal 123, Ciudad');

-- Unidad de ejemplo
INSERT INTO unidades (numero, id_condominio, id_residente) VALUES
('A-101', 1, 2);

COMMENT ON TABLE users IS 'Usuarios del sistema (residentes, admins, conserjes)';
COMMENT ON TABLE condominios IS 'Condominios gestionados en la plataforma';
COMMENT ON TABLE unidades IS 'Unidades habitacionales (departamentos/casas)';
COMMENT ON TABLE pagos IS 'Registro de pagos y expensas';
COMMENT ON TABLE reservas IS 'Reservas de áreas comunes';
