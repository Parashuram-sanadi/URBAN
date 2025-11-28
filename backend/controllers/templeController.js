import Temple from "../models/Temple.js";

export const listTemples = async (req, res) => {
  try {
    const items = await Temple.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch temples", error: e.message });
  }
};

export const getTemple = async (req, res) => {
  try {
    const item = await Temple.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch temple", error: e.message });
  }
};

export const createTemple = async (req, res) => {
  try {
    console.log("📝 Creating temple:", req.body.name);
    const created = await Temple.create(req.body);
    console.log("✅ Temple created with ID:", created._id);
    res.status(201).json(created);
  } catch (e) {
    console.error("❌ Failed to create temple:", e.message);
    res.status(400).json({ message: "Failed to create temple", error: e.message });
  }
};

export const updateTemple = async (req, res) => {
  try {
    const updated = await Temple.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ message: "Failed to update temple", error: e.message });
  }
};

export const deleteTemple = async (req, res) => {
  try {
    await Temple.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (e) {
    res.status(400).json({ message: "Failed to delete temple", error: e.message });
  }
};


