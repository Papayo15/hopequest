import express from "express";
import {
  crearPago,
  getPagos,
  getPagoById,
  verificarPago,
  registrarPagoManual
} from "../controllers/pagosController.js";
import { verifyToken, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/crear", verifyToken, crearPago);
router.post("/manual", verifyToken, requireRole('admin'), registrarPagoManual);  // Nuevo endpoint
router.get("/", verifyToken, getPagos);
router.get("/verificar", verificarPago);
router.get("/:id", verifyToken, getPagoById);

export default router;
