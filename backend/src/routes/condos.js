import express from "express";
import {
  getCondos,
  getCondoById,
  createCondo,
  updateCondo,
  deleteCondo
} from "../controllers/condoController.js";
import { verifyToken, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getCondos);
router.get("/:id", verifyToken, getCondoById);
router.post("/", verifyToken, requireRole("admin"), createCondo);
router.put("/:id", verifyToken, requireRole("admin"), updateCondo);
router.delete("/:id", verifyToken, requireRole("admin"), deleteCondo);

export default router;
