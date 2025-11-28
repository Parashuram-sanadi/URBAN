// backend/controllers/cityController.js

import City from "../models/City.js";

// ---------------- GET ALL CITIES ----------------
export const getCities = async (req, res) => {
  try {
    const cities = await City.find(); // Fetch all cities from DB
    res.json(cities);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ---------------- ADD A NEW CITY (Admin only) ----------------
export const addCity = async (req, res) => {
  try {
    const { name, reputation, reviews } = req.body;

    if (!name || !reputation || !reviews) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const city = new City({ name, reputation, reviews });
    await city.save();

    res.status(201).json({ message: "City added successfully", city });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ---------------- UPDATE EXISTING CITY ----------------
export const updateCity = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCity = await City.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedCity) {
      return res.status(404).json({ message: "City not found" });
    }

    res.json({ message: "City updated successfully", updatedCity });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ---------------- DELETE CITY (optional) ----------------
export const deleteCity = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCity = await City.findByIdAndDelete(id);

    if (!deletedCity) {
      return res.status(404).json({ message: "City not found" });
    }

    res.json({ message: "City deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
