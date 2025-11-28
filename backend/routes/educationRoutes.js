import express from "express";
import { listEducations, getEducation, createEducation, updateEducation, deleteEducation } from "../controllers/educationController.js";

const router = express.Router();

router.get("/", listEducations);
router.get("/:id", getEducation);
router.post("/", createEducation);
router.put("/:id", updateEducation);
router.delete("/:id", deleteEducation);

export default router;

