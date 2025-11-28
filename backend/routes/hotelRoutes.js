import express from "express";
import { listHotels, getHotel, createHotel, updateHotel, deleteHotel } from "../controllers/hotelController.js";

const router = express.Router();

router.get("/", listHotels);
router.get("/:id", getHotel);
router.post("/", createHotel);
router.put("/:id", updateHotel);
router.delete("/:id", deleteHotel);

export default router;

