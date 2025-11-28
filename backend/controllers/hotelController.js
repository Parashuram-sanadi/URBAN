import Hotel from "../models/Hotel.js";

export const listHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().sort({ createdAt: -1 });
    res.json(hotels);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch hotels", error: e.message });
  }
};

export const getHotel = async (req, res) => {
  try {
    const item = await Hotel.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch hotel", error: e.message });
  }
};

export const createHotel = async (req, res) => {
  try {
    console.log("📝 Creating hotel:", req.body.name);
    const created = await Hotel.create(req.body);
    console.log("✅ Hotel created with ID:", created._id);
    res.status(201).json(created);
  } catch (e) {
    console.error("❌ Failed to create hotel:", e.message);
    res.status(400).json({ message: "Failed to create hotel", error: e.message });
  }
};

export const updateHotel = async (req, res) => {
  try {
    const updated = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ message: "Failed to update hotel", error: e.message });
  }
};

export const deleteHotel = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (e) {
    res.status(400).json({ message: "Failed to delete hotel", error: e.message });
  }
};

