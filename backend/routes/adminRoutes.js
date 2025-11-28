import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { exportSeedSnapshot } from "../controllers/adminController.js";

const router = express.Router();

// POST /api/admin/export-seed  -> creates/overwrites backend/seed_snapshot.json with current DB
router.post("/export-seed", authMiddleware, exportSeedSnapshot);

export default router;
