export const errorHandler = (err, req, res, next) => {
  // Log del error para debugging
  console.error("Error:", err);

  // Error de base de datos PostgreSQL
  if (err.code) {
    switch (err.code) {
      case "23505": // unique_violation
        return res.status(409).json({
          error: "Ya existe un registro con esos datos"
        });
      case "23503": // foreign_key_violation
        return res.status(400).json({
          error: "Referencia inválida a otro registro"
        });
      case "22P02": // invalid_text_representation
        return res.status(400).json({
          error: "Formato de datos inválido"
        });
      default:
        return res.status(500).json({
          error: "Error en la base de datos"
        });
    }
  }

  // Error de Stripe
  if (err.type && err.type.includes("Stripe")) {
    return res.status(400).json({
      error: "Error en el procesamiento del pago",
      details: err.message
    });
  }

  // Error de validación JWT
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      error: "Token inválido"
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      error: "Token expirado"
    });
  }

  // Error genérico
  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || "Error interno del servidor";

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
};

export const notFound = (req, res, next) => {
  res.status(404).json({
    error: `Ruta no encontrada: ${req.method} ${req.originalUrl}`
  });
};
