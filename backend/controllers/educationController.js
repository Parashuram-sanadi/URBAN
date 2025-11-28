import Education from "../models/Education.js";

export const listEducations = async (req, res) => {
  try {
    const items = await Education.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch educations", error: e.message });
  }
};

export const getEducation = async (req, res) => {
  try {
    const item = await Education.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch education", error: e.message });
  }
};

export const createEducation = async (req, res) => {
  try {
    console.log("📝 Creating education:", req.body.name);
    const created = await Education.create(req.body);
    console.log("✅ Education created with ID:", created._id);
    res.status(201).json(created);
  } catch (e) {
    console.error("❌ Failed to create education:", e.message);
    res.status(400).json({ message: "Failed to create education", error: e.message });
  }
};

export const updateEducation = async (req, res) => {
  try {
    const updated = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ message: "Failed to update education", error: e.message });
  }
};

export const deleteEducation = async (req, res) => {
  try {
    await Education.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (e) {
    res.status(400).json({ message: "Failed to delete education", error: e.message });
  }
};

