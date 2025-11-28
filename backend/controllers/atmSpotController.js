import AtmSpot from "../models/AtmSpot.js";

export const listAtmSpots = async (req, res) => {
  try {
    const items = await AtmSpot.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch ATM spots", error: e.message });
  }
};

export const getAtmSpot = async (req, res) => {
  try {
    const item = await AtmSpot.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch ATM spot", error: e.message });
  }
};

export const createAtmSpot = async (req, res) => {
  try {
    console.log("📝 Creating ATM spot:", req.body.name);
    const created = await AtmSpot.create(req.body);
    console.log("✅ ATM spot created with ID:", created._id);
    res.status(201).json(created);
  } catch (e) {
    console.error("❌ Failed to create ATM spot:", e.message);
    res.status(400).json({ message: "Failed to create ATM spot", error: e.message });
  }
};

export const updateAtmSpot = async (req, res) => {
  try {
    const updated = await AtmSpot.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ message: "Failed to update ATM spot", error: e.message });
  }
};

export const deleteAtmSpot = async (req, res) => {
  try {
    await AtmSpot.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (e) {
    res.status(400).json({ message: "Failed to delete ATM spot", error: e.message });
  }
};

