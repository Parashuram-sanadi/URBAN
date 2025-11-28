import express from "express";
import { listTemples, getTemple, createTemple, updateTemple, deleteTemple } from "../controllers/templeController.js";

const router = express.Router();

router.get("/", listTemples);
router.get("/:id", getTemple);
router.post("/", createTemple);
router.put("/:id", updateTemple);
router.delete("/:id", deleteTemple);

export default router;


