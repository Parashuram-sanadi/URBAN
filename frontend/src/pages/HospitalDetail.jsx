import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api.js";
import ImageLightbox from "../components/ImageLightbox.jsx";

export default function HospitalDetail() {
  const { id } = useParams();
  const [search] = useSearchParams();
  const [h, setH] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightboxImage, setLightboxImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`${API_ENDPOINTS.HOSPITALS}/${id}`);
        setH(res.data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <div className="dashboard">Loading hospital...</div>;
  if (!h) return <div className="dashboard">Not found</div>;

  const showMap = search.get("view") === "map";
  const lat = h.location?.latitude;
  const lng = h.location?.longitude;
  const mapSrc = lat && lng ? `https://www.google.com/maps?q=${lat},${lng}&z=16&output=embed` : null;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-center">
          <h1>{h.name}</h1>
          <p>{h.type}</p>
        </div>
      </div>

      <div className="p-6 max-w-5xl mx-auto">
        {showMap && mapSrc ? (
          // Map View
          <div>
            <div style={{ width: "100%", height: "600px", marginBottom: 20 }}>
              <iframe
                title="Hospital Map"
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: 8 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <h3>Location</h3>
                <p>{h.location?.address}</p>
                <p>{[h.location?.city, h.location?.state, h.location?.country, h.location?.pincode].filter(Boolean).join(", ")}</p>
                {lat && lng && <p>Coordinates: {lat}, {lng}</p>}
              </div>
              <div>
                <h3>Contact</h3>
                <p>Phone: {h.contact?.phone || "N/A"}</p>
                <p>Emergency: {h.contact?.emergencyNumber || "N/A"}</p>
                <p>Email: {h.contact?.email || "N/A"}</p>
              </div>
            </div>
          </div>
        ) : (
          // Details View
          <>
            {h.images?.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
                {h.images.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={h.name + idx}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/600x300?text=No+Image";
                    }}
                    onClick={() => setLightboxImage(url)}
                    className="image-clickable"
                    style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 8 }}
                  />
                ))}
              </div>
            )}
            {lightboxImage && <ImageLightbox imageUrl={lightboxImage} onClose={() => setLightboxImage(null)} />}

            <div style={{ marginTop: 16 }}>
              <h3>Description</h3>
              <p>{h.description || "No description available."}</p>
            </div>

            <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <h3>Location</h3>
                <p>{h.location?.address || "N/A"}</p>
                <p>{[h.location?.city, h.location?.state, h.location?.country, h.location?.pincode].filter(Boolean).join(", ") || "N/A"}</p>
                {lat && lng && <p>Coordinates: {lat}, {lng}</p>}
              </div>
              <div>
                <h3>Contact</h3>
                <p>Phone: {h.contact?.phone || "N/A"}</p>
                <p>Emergency: {h.contact?.emergencyNumber || "N/A"}</p>
                <p>Email: {h.contact?.email || "N/A"}</p>
                {h.contact?.website && (
                  <p><a href={h.contact.website} target="_blank" rel="noreferrer">Website</a></p>
                )}
              </div>
            </div>

            <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <h3>Facilities</h3>
                <p>Beds: {h.facilities?.numBeds || "N/A"}</p>
                <p>Departments: {(h.facilities?.departments || []).length > 0 ? h.facilities.departments.join(", ") : "N/A"}</p>
              </div>
              <div>
                <h3>Staff</h3>
                <p>Doctors: {h.facilities?.doctorCount || "N/A"}</p>
                <p>Nurses: {h.facilities?.nurseCount || "N/A"}</p>
                <p>Specializations: {(h.facilities?.specializations || []).length > 0 ? h.facilities.specializations.join(", ") : "N/A"}</p>
              </div>
            </div>

            {mapSrc && (
              <div style={{ marginTop: 20 }}>
                <h3>Map</h3>
                <div style={{ width: "100%", height: 400 }}>
                  <iframe
                    title="Hospital Map"
                    src={mapSrc}
                    width="100%"
                    height="100%"
                    style={{ border: 0, borderRadius: 8 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <footer>
        <button className="footer-btn" onClick={() => navigate("/feature/hospitals")}>← Back to Hospitals</button>
        {!showMap && mapSrc && (
          <button className="footer-btn" onClick={() => navigate(`/feature/hospitals/${id}?view=map`)}>View on Map</button>
        )}
        {showMap && (
          <button className="footer-btn" onClick={() => navigate(`/feature/hospitals/${id}`)}>View Details</button>
        )}
        {mapSrc && (
          <button className="footer-btn" onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, "_blank")}>Open in Google Maps</button>
        )}
      </footer>
    </div>
  );
}


