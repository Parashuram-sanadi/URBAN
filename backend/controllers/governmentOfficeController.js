import GovernmentOffice from "../models/GovernmentOffice.js";

export const listOffices = async (req, res) => {
  try {
    const items = await GovernmentOffice.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch offices", error: e.message });
  }
};

export const getOffice = async (req, res) => {
  try {
    const item = await GovernmentOffice.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch office", error: e.message });
  }
};

export const createOffice = async (req, res) => {
  try {
    console.log("📝 Creating office:", req.body.name);
    const created = await GovernmentOffice.create(req.body);
    console.log("✅ Office created with ID:", created._id);
    res.status(201).json(created);
  } catch (e) {
    console.error("❌ Failed to create office:", e.message);
    res.status(400).json({ message: "Failed to create office", error: e.message });
  }
};

export const updateOffice = async (req, res) => {
  try {
    const updated = await GovernmentOffice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ message: "Failed to update office", error: e.message });
  }
};

export const deleteOffice = async (req, res) => {
  try {
    await GovernmentOffice.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (e) {
    res.status(400).json({ message: "Failed to delete office", error: e.message });
  }
};






