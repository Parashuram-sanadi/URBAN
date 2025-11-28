import UpdateReport from "../models/UpdateReport.js";

export const createReport = async (req, res) => {
  try {
    const { message, submittedBy } = req.body;
    if (!message || !message.trim()) {
      return res.status(400).json({ message: "Message is required" });
    }

    const report = await UpdateReport.create({
      message: message.trim(),
      submittedBy: submittedBy?.trim() || "Guest",
    });

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: "Failed to submit update", error: error.message });
  }
};

export const listReports = async (req, res) => {
  try {
    const { status, submittedBy } = req.query;
    const filter = {};
    if (status === "unread") {
      filter.isRead = false;
    }
    if (submittedBy) {
      filter.submittedBy = submittedBy;
    }
    const reports = await UpdateReport.find(filter).sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reports", error: error.message });
  }
};

export const markReportRead = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await UpdateReport.findByIdAndUpdate(
      id,
      { isRead: true, readAt: new Date() },
      { new: true }
    );
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: "Failed to update report", error: error.message });
  }
};

export const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await UpdateReport.findByIdAndDelete(id);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.json({ message: "Report deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete report", error: error.message });
  }
};

