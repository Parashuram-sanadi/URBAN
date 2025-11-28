import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api.js";

export default function ReportUpdatesPage() {
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [acknowledgedAt, setAcknowledgedAt] = useState(null);
  const navigate = useNavigate();
  const submittedBy = localStorage.getItem("urbanGuideUser") || "Guest";

  const loadAcknowledgements = async () => {
    try {
      const res = await axios.get(API_ENDPOINTS.UPDATE_REPORTS, {
        params: { submittedBy },
      });
      const reviewedReport = res.data.find((rep) => rep.isRead);
      if (reviewedReport) {
        setAcknowledgedAt(reviewedReport.readAt || reviewedReport.updatedAt || reviewedReport.createdAt);
      } else {
        setAcknowledgedAt(null);
      }
    } catch (error) {
      console.error("Failed to fetch update reports", error);
    }
  };

  React.useEffect(() => {
    loadAcknowledgements();
  }, [submittedBy]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      alert("Please describe the update you'd like to report.");
      return;
    }
    setSubmitting(true);
    try {
      await axios.post(API_ENDPOINTS.UPDATE_REPORTS, {
        message,
        submittedBy,
      });
      alert("Thanks! Your update has been sent to the administrators.");
      setMessage("");
      await loadAcknowledgements();
      // stay on page for next request
    } catch (error) {
      console.error("Failed to submit report", error);
      alert(error?.response?.data?.message || "Failed to submit your update. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-center">
          <h1>Share Review And Suggest Any Recent Upadates</h1>
          <p>Let us know what needs to be updated or corrected.</p>
        </div>
      </div>

      {acknowledgedAt && (
        <div className="report-ack">
          <strong>Admin viewed your request.</strong> Reviewed on {new Date(acknowledgedAt).toLocaleString()}.
        </div>
      )}

      <form className="report-form" onSubmit={handleSubmit}>
        <label htmlFor="report-message">Your Update Request</label>
        <textarea
          id="report-message"
          className="report-textarea"
          placeholder="Describe the changes we should make..."
          rows={10}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="report-actions">
          <button type="button" className="footer-btn" onClick={() => navigate("/urban-dashboard")} disabled={submitting}>
            Cancel
          </button>
          <button type="submit" className="footer-btn active" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit to Admin"}
          </button>
        </div>
      </form>
    </div>
  );
}

