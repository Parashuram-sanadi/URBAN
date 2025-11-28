import Hospital from "../models/Hospital.js";

export const listHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find().sort({ createdAt: -1 });
    res.json(hospitals);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch hospitals", error: e.message });
  }
};

export const getHospital = async (req, res) => {
  try {
    const item = await Hospital.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch hospital", error: e.message });
  }
};

export const createHospital = async (req, res) => {
  try {
    console.log("📝 Creating hospital:", req.body.name);
    const created = await Hospital.create(req.body);
    console.log("✅ Hospital created with ID:", created._id);
    res.status(201).json(created);
  } catch (e) {
    console.error("❌ Failed to create hospital:", e.message);
    res.status(400).json({ message: "Failed to create hospital", error: e.message });
  }
};

export const updateHospital = async (req, res) => {
  try {
    const updated = await Hospital.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ message: "Failed to update hospital", error: e.message });
  }
};

export const deleteHospital = async (req, res) => {
  try {
    await Hospital.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (e) {
    res.status(400).json({ message: "Failed to delete hospital", error: e.message });
  }
};






