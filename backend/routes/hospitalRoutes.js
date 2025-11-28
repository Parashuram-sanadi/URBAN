import express from "express";
import { listHospitals, getHospital, createHospital, updateHospital, deleteHospital } from "../controllers/hospitalController.js";

const router = express.Router();

router.get("/", listHospitals);
router.get("/:id", getHospital);
router.post("/", createHospital);
router.put("/:id", updateHospital);
router.delete("/:id", deleteHospital);

export default router;


