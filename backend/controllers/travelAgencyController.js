import TravelAgency from "../models/TravelAgency.js";

export const listTravelAgencies = async (req, res) => {
  try {
    const items = await TravelAgency.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch travel agencies", error: e.message });
  }
};

export const getTravelAgency = async (req, res) => {
  try {
    const item = await TravelAgency.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch travel agency", error: e.message });
  }
};

export const createTravelAgency = async (req, res) => {
  try {
    console.log("📝 Creating travel agency:", req.body.name);
    const created = await TravelAgency.create(req.body);
    console.log("✅ Travel agency created with ID:", created._id);
    res.status(201).json(created);
  } catch (e) {
    console.error("❌ Failed to create travel agency:", e.message);
    res.status(400).json({ message: "Failed to create travel agency", error: e.message });
  }
};

export const updateTravelAgency = async (req, res) => {
  try {
    const updated = await TravelAgency.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ message: "Failed to update travel agency", error: e.message });
  }
};

export const deleteTravelAgency = async (req, res) => {
  try {
    await TravelAgency.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (e) {
    res.status(400).json({ message: "Failed to delete travel agency", error: e.message });
  }
};

