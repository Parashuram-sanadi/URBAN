import Banking from "../models/Banking.js";

export const listBankings = async (req, res) => {
  try {
    const items = await Banking.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch bankings", error: e.message });
  }
};

export const getBanking = async (req, res) => {
  try {
    const item = await Banking.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch banking", error: e.message });
  }
};

export const createBanking = async (req, res) => {
  try {
    console.log("📝 Creating banking:", req.body.name);
    const created = await Banking.create(req.body);
    console.log("✅ Banking created with ID:", created._id);
    res.status(201).json(created);
  } catch (e) {
    console.error("❌ Failed to create banking:", e.message);
    res.status(400).json({ message: "Failed to create banking", error: e.message });
  }
};

export const updateBanking = async (req, res) => {
  try {
    const updated = await Banking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ message: "Failed to update banking", error: e.message });
  }
};

export const deleteBanking = async (req, res) => {
  try {
    await Banking.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (e) {
    res.status(400).json({ message: "Failed to delete banking", error: e.message });
  }
};

