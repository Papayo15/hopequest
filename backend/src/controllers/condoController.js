import pool from "../db.js";

export const getCondos = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT id, nombre, direccion, created_at FROM condominios ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

export const getCondoById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const result = await pool.query(
      "SELECT id, nombre, direccion, created_at FROM condominios WHERE id = $1",
      [id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: "Condominio no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

export const createCondo = async (req, res, next) => {
  try {
    const { nombre, direccion } = req.body;

    // Validaciones
    if (!nombre || !direccion) {
      return res.status(400).json({ error: "Nombre y dirección son requeridos" });
    }

    if (nombre.length < 3 || nombre.length > 100) {
      return res.status(400).json({ error: "El nombre debe tener entre 3 y 100 caracteres" });
    }

    if (direccion.length < 5 || direccion.length > 500) {
      return res.status(400).json({ error: "La dirección debe tener entre 5 y 500 caracteres" });
    }

    // Solo admins pueden crear condominios
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "No tienes permisos para crear condominios" });
    }

    // Verificar si ya existe
    const existing = await pool.query(
      "SELECT id FROM condominios WHERE LOWER(nombre) = LOWER($1)",
      [nombre]
    );

    if (existing.rows.length > 0) {
      return res.status(409).json({ error: "Ya existe un condominio con ese nombre" });
    }

    const result = await pool.query(
      "INSERT INTO condominios (nombre, direccion) VALUES ($1, $2) RETURNING *",
      [nombre, direccion]
    );

    res.status(201).json({
      message: "Condominio creado exitosamente",
      condominio: result.rows[0]
    });
  } catch (err) {
    next(err);
  }
};

export const updateCondo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, direccion } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "No tienes permisos para actualizar condominios" });
    }

    if (!nombre && !direccion) {
      return res.status(400).json({ error: "Debe proporcionar al menos un campo para actualizar" });
    }

    // Construir query dinámicamente
    const updates = [];
    const values = [];
    let paramCount = 1;

    if (nombre) {
      if (nombre.length < 3 || nombre.length > 100) {
        return res.status(400).json({ error: "El nombre debe tener entre 3 y 100 caracteres" });
      }
      updates.push(`nombre = $${paramCount}`);
      values.push(nombre);
      paramCount++;
    }

    if (direccion) {
      if (direccion.length < 5 || direccion.length > 500) {
        return res.status(400).json({ error: "La dirección debe tener entre 5 y 500 caracteres" });
      }
      updates.push(`direccion = $${paramCount}`);
      values.push(direccion);
      paramCount++;
    }

    values.push(id);

    const result = await pool.query(
      `UPDATE condominios SET ${updates.join(", ")} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: "Condominio no encontrado" });
    }

    res.json({
      message: "Condominio actualizado exitosamente",
      condominio: result.rows[0]
    });
  } catch (err) {
    next(err);
  }
};

export const deleteCondo = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "No tienes permisos para eliminar condominios" });
    }

    const result = await pool.query(
      "DELETE FROM condominios WHERE id = $1 RETURNING *",
      [id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: "Condominio no encontrado" });
    }

    res.json({ message: "Condominio eliminado exitosamente" });
  } catch (err) {
    next(err);
  }
};
