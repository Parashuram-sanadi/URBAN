import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api.js";
import ImageLightbox from "../components/ImageLightbox.jsx";

export default function TempleDetail() {
  const { id } = useParams();
  const [search] = useSearchParams();
  const [t, setT] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightboxImage, setLightboxImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`API_ENDPOINTS.TEMPLES/${id}`);
        setT(res.data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <div className="dashboard">Loading temple...</div>;
  if (!t) return <div className="dashboard">Not found</div>;

  const showMap = search.get("view") === "map";
  const lat = t.location?.latitude;
  const lng = t.location?.longitude;
  const mapSrc = lat && lng ? `https://www.google.com/maps?q=${lat},${lng}&z=16&output=embed` : null;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-center">
          <h1>{t.name}</h1>
          <p>{t.deity || "Temple"}</p>
        </div>
      </div>

      <div className="p-6 max-w-5xl mx-auto">
        {showMap && mapSrc ? (
          // Map View
          <div>
            <div style={{ width: "100%", height: "600px", marginBottom: 20 }}>
              <iframe
                title="Temple Map"
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
                <p>{t.location?.address || "N/A"}</p>
                <p>{[t.location?.city, t.location?.state, t.location?.country, t.location?.pincode].filter(Boolean).join(", ") || "N/A"}</p>
                {lat && lng && <p>Coordinates: {lat}, {lng}</p>}
              </div>
              <div>
                <h3>Contact</h3>
                <p>Phone: {t.contact?.phone || "N/A"}</p>
                <p>Email: {t.contact?.email || "N/A"}</p>
              </div>
            </div>
          </div>
        ) : (
          // Details View
          <>
            {t.images?.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
                {t.images.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={t.name + idx}
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
              <p>{t.description || "No description available."}</p>
            </div>

            <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <h3>Location</h3>
                <p>{t.location?.address || "N/A"}</p>
                <p>{[t.location?.city, t.location?.state, t.location?.country, t.location?.pincode].filter(Boolean).join(", ") || "N/A"}</p>
                {lat && lng && <p>Coordinates: {lat}, {lng}</p>}
              </div>
              <div>
                <h3>Contact</h3>
                <p>Phone: {t.contact?.phone || "N/A"}</p>
                <p>Email: {t.contact?.email || "N/A"}</p>
                {t.contact?.website && (
                  <p><a href={t.contact.website} target="_blank" rel="noreferrer">Website</a></p>
                )}
              </div>
            </div>

            {t.openingTime && (
              <div style={{ marginTop: 16 }}>
                <h3>Opening Time</h3>
                <p>{t.openingTime}</p>
              </div>
            )}

            {mapSrc && (
              <div style={{ marginTop: 20 }}>
                <h3>Map</h3>
                <div style={{ width: "100%", height: 400 }}>
                  <iframe
                    title="Temple Map"
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
        <button className="footer-btn" onClick={() => navigate("/feature/temples")}>← Back to Temples</button>
        {!showMap && mapSrc && (
          <button className="footer-btn" onClick={() => navigate(`/feature/temples/${id}?view=map`)}>View on Map</button>
        )}
        {showMap && (
          <button className="footer-btn" onClick={() => navigate(`/feature/temples/${id}`)}>View Details</button>
        )}
        {mapSrc && (
          <button className="footer-btn" onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, "_blank")}>Open in Google Maps</button>
        )}
      </footer>
    </div>
  );
}


