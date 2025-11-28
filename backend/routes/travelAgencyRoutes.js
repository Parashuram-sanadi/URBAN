import express from "express";
import { listTravelAgencies, getTravelAgency, createTravelAgency, updateTravelAgency, deleteTravelAgency } from "../controllers/travelAgencyController.js";

const router = express.Router();

router.get("/", listTravelAgencies);
router.get("/:id", getTravelAgency);
router.post("/", createTravelAgency);
router.put("/:id", updateTravelAgency);
router.delete("/:id", deleteTravelAgency);

export default router;

