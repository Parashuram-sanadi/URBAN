import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api.js";

const tiles = [
  { label: "Manage Hospitals", path: "/admin/hospitals" },
  { label: "Manage Hotels", path: "/admin/hotels" },
  { label: "Manage Government Offices", path: "/admin/government-offices" },
  { label: "Manage Education", path: "/admin/education" },
  { label: "Manage Banks", path: "/admin/banking" },
  { label: "Manage Travel Agencies", path: "/admin/travel-agencies" },
  { label: "Manage Temples", path: "/admin/temples" },
  { label: "Manage ATMs", path: "/admin/atm-spots" },
  { label: "Manage Shops", path: "/admin/famous-shops" },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [pendingReports, setPendingReports] = useState([]);
  const [showList, setShowList] = useState(false);
  const [reportList, setReportList] = useState([]);
  const [markingIds, setMarkingIds] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("adminAuth") !== "true") {
      navigate("/admin-login");
    }
    loadPendingReports();
  }, [navigate]);

  const fetchReports = async (status = "unread") => {
    try {
      const params = status ? { status } : {};
      const res = await axios.get(API_ENDPOINTS.UPDATE_REPORTS, { params });
      return res.data;
    } catch (error) {
      console.error("Failed to load update reports", error);
      return [];
    }
  };

  const loadPendingReports = async () => {
    try {
      const reports = await fetchReports("unread");
      setPendingReports(reports);
    } catch (error) {
      console.error("Failed to load update reports", error);
    }
  };

  const openPendingReports = async () => {
    const list = await fetchReports("unread");
    setReportList(list);
    if (list.length === 0) {
      alert("No update requests have been submitted yet.");
      return;
    }
    setShowList(true);
  };

  const handleMarkRead = async (reportId) => {
    if (markingIds.includes(reportId)) return;
    setMarkingIds((prev) => [...prev, reportId]);
    try {
      await axios.delete(`${API_ENDPOINTS.UPDATE_REPORTS}/${reportId}`);
      setReportList((prev) => prev.filter((report) => report._id !== reportId));
      setPendingReports((prev) => prev.filter((report) => report._id !== reportId));
    } catch (error) {
      console.error("Failed to delete update request", error);
      alert(error?.response?.data?.message || "Failed to delete request. Please try again.");
    } finally {
      setMarkingIds((prev) => prev.filter((id) => id !== reportId));
    }
  };

  useEffect(() => {
    if (showList && reportList.length === 0) {
      setShowList(false);
    }
  }, [showList, reportList]);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-center">
          <h1>Admin Dashboard</h1>
        </div>
      </div>

      <div className="city-grid" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))" }}>
        {tiles.map((t) => (
          <button key={t.label} className="city-card" onClick={() => navigate(t.path)} style={{ textAlign: "center" }}>
            <div className="card-title">{t.label}</div>
          </button>
        ))}
        <button className="city-card" onClick={() => {
          localStorage.removeItem("adminAuth");
          navigate("/urban-dashboard");
        }}>
          <div className="card-title">Logout</div>
        </button>
      </div>

      {pendingReports.length > 0 && (
        <div style={{ marginTop: 20, textAlign: "center" }}>
          <button className="footer-btn" onClick={openPendingReports}>
            View {pendingReports.length} Update {pendingReports.length === 1 ? "Request" : "Requests"}
          </button>
        </div>
      )}

      {showList && (
        <div className="report-modal-overlay" role="dialog" aria-modal="true">
          <div className="report-modal">
            <div className="report-modal-header">
              <h3>Update Requests</h3>
              <button className="footer-btn" onClick={() => setShowList(false)}>
                Close
              </button>
            </div>
            <div className="report-modal-body">
              {reportList.map((rep) => {
                const isMarking = markingIds.includes(rep._id);
                return (
                  <div key={rep._id} className="report-list-item">
                    <div className="report-list-meta">
                      <div>
                        <strong>{rep.submittedBy || "Guest"}</strong>
                        <p style={{ margin: "4px 0 0", color: "#6b7280", fontSize: 13 }}>{rep.message}</p>
                      </div>
                      <div className="report-list-actions">
                        <span className="status-pill status-pending">Status: Pending</span>
                        <button
                          className="check-btn"
                          title="Mark as read"
                          onClick={() => handleMarkRead(rep._id)}
                          disabled={isMarking}
                        >
                          {isMarking ? "..." : "✓"}
                        </button>
                      </div>
                    </div>
                    <div className="report-list-timestamp">
                      {new Date(rep.createdAt).toLocaleString()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}






