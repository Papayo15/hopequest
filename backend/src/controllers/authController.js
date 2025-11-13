import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db.js";

// Validación de email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validación de contraseña fuerte
const isStrongPassword = (password) => {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password)
  );
};

export const register = async (req, res, next) => {
  const { name, email, password, role, telefono, cuota_mensual, unidad_id, condominio_id } = req.body;

  try {
    // Validaciones
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    if (name.length < 2 || name.length > 100) {
      return res.status(400).json({ error: "El nombre debe tener entre 2 y 100 caracteres" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Email inválido" });
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({
        error: "La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas y números"
      });
    }

    // Verificar si el email ya existe
    const existingUser = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: "El email ya está registrado" });
    }

    // 🎯 IMPORTANTE: El primer usuario registrado será ADMIN automáticamente
    const userCount = await pool.query("SELECT COUNT(*) FROM users");
    const totalUsers = parseInt(userCount.rows[0].count);

    let userRole = role || "residente";
    let isFirstUser = false;

    if (totalUsers === 0) {
      userRole = "admin";
      isFirstUser = true;
      console.log("🎉 PRIMER USUARIO - Asignando rol de ADMINISTRADOR");
    } else {
      // Validar rol para usuarios siguientes
      const validRoles = ["residente", "admin", "conserje"];
      if (role && !validRoles.includes(role)) {
        return res.status(400).json({ error: "Rol inválido" });
      }
      // Solo admins pueden crear otros admins después del primero
      userRole = role || "residente";
    }

    // Hash de contraseña
    const hashed = await bcrypt.hash(password, 10);

    // Insertar usuario con nuevos campos
    const result = await pool.query(
      `INSERT INTO users (name, email, password, role, telefono, cuota_mensual, unidad_id, condominio_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id, name, email, role, telefono, cuota_mensual, unidad_id, condominio_id, created_at`,
      [name, email, hashed, userRole, telefono, cuota_mensual, unidad_id, condominio_id]
    );

    res.status(201).json({
      message: isFirstUser
        ? "¡Administrador principal creado exitosamente! Ahora puedes gestionar todo el sistema."
        : "Usuario registrado exitosamente",
      user: result.rows[0],
      isFirstAdmin: isFirstUser
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Validaciones
    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña son requeridos" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Email inválido" });
    }

    // Buscar usuario
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (!result.rows.length) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const user = result.rows[0];

    // Verificar contraseña
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // Generar token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      message: "Login exitoso",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    next(err);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, role, created_at FROM users WHERE id = $1",
      [req.user.id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};
