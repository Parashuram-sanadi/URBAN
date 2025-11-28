import mongoose from "mongoose";

const updateReportSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    submittedBy: { type: String, default: "Guest" },
    isRead: { type: Boolean, default: false },
    readAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("UpdateReport", updateReportSchema);

