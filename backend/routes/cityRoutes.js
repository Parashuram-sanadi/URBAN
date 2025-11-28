// backend/routes/cityRoutes.js

import express from "express";
import {
  getCities,
  addCity,
  updateCity,
  deleteCity,
} from "../controllers/cityController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route GET /api/cities
 * @desc Get all cities (User + Admin)
 * @access Private (requires JWT)
 */
router.get("/", authMiddleware, getCities);

/**
 * @route POST /api/cities
 * @desc Add new city (Admin)
 * @access Private (requires JWT)
 */
router.post("/", authMiddleware, addCity);

/**
 * @route PUT /api/cities/:id
 * @desc Update existing city
 * @access Private (requires JWT)
 */
router.put("/:id", authMiddleware, updateCity);

/**
 * @route DELETE /api/cities/:id
 * @desc Delete a city
 * @access Private (requires JWT)
 */
router.delete("/:id", authMiddleware, deleteCity);

export default router;
