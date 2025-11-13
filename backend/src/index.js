import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import condoRoutes from "./routes/condos.js";
import pagosRoutes from "./routes/pagos.js";
import avisosRoutes from "./routes/avisosRoutes.js";
import reportesRoutes from "./routes/reportesRoutes.js";
import qrRoutes from "./routes/qr.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración de CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging en desarrollo
if (process.env.NODE_ENV === "development") {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// Ruta raíz
app.get("/", (req, res) => {
  res.json({
    message: "✅ Condominio360 Unified API activa",
    version: "2.0.0",
    endpoints: {
      auth: "/api/auth",
      condos: "/api/condos",
      pagos: "/api/pagos",
      avisos: "/api/avisos",
      documentos: "/api/documentos",
      reportes: "/api/reportes",
      qr: "/api/qr"
    },
    features: ["Sistema QR para Visitantes", "Notificaciones Push", "Control de Accesos"]
  });
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Rutas de la API
app.use("/api/auth", authRoutes);
app.use("/api/condos", condoRoutes);
app.use("/api/pagos", pagosRoutes);
app.use("/api", avisosRoutes);  // Incluye /api/avisos y /api/documentos
app.use("/api/reportes", reportesRoutes);
app.use("/api/qr", qrRoutes);  // Sistema QR para visitantes

// Manejo de rutas no encontradas
app.use(notFound);

// Manejo de errores global
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Backend corriendo en puerto ${PORT}`);
  console.log(`📍 Entorno: ${process.env.NODE_ENV || "development"}`);
  console.log(`🔗 CORS habilitado para: ${process.env.FRONTEND_URL || "http://localhost:5173"}`);
});

export default app;
