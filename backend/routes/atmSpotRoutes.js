import express from "express";
import { listAtmSpots, getAtmSpot, createAtmSpot, updateAtmSpot, deleteAtmSpot } from "../controllers/atmSpotController.js";

const router = express.Router();

router.get("/", listAtmSpots);
router.get("/:id", getAtmSpot);
router.post("/", createAtmSpot);
router.put("/:id", updateAtmSpot);
router.delete("/:id", deleteAtmSpot);

export default router;

