import FamousShop from "../models/FamousShop.js";

export const listFamousShops = async (req, res) => {
  try {
    const items = await FamousShop.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch famous shops", error: e.message });
  }
};

export const getFamousShop = async (req, res) => {
  try {
    const item = await FamousShop.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch famous shop", error: e.message });
  }
};

export const createFamousShop = async (req, res) => {
  try {
    console.log("📝 Creating famous shop:", req.body.name);
    const created = await FamousShop.create(req.body);
    console.log("✅ Famous shop created with ID:", created._id);
    res.status(201).json(created);
  } catch (e) {
    console.error("❌ Failed to create famous shop:", e.message);
    res.status(400).json({ message: "Failed to create famous shop", error: e.message });
  }
};

export const updateFamousShop = async (req, res) => {
  try {
    const updated = await FamousShop.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ message: "Failed to update famous shop", error: e.message });
  }
};

export const deleteFamousShop = async (req, res) => {
  try {
    await FamousShop.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (e) {
    res.status(400).json({ message: "Failed to delete famous shop", error: e.message });
  }
};

