import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import ImageLightbox from "../components/ImageLightbox.jsx";
import { API_ENDPOINTS } from "../config/api.js";

export default function AtmSpotDetail() {
  const { id } = useParams();
  const [search] = useSearchParams();
  const [a, setA] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightboxImage, setLightboxImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`${API_ENDPOINTS.ATM_SPOTS}/${id}`);
        setA(res.data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <div className="dashboard">Loading...</div>;
  if (!a) return <div className="dashboard">Not found</div>;

  const showMap = search.get("view") === "map";
  const lat = a.location?.latitude;
  const lng = a.location?.longitude;
  const mapSrc = lat && lng ? `https://www.google.com/maps?q=${lat},${lng}&z=16&output=embed` : null;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-center">
          <h1>{a.name}</h1>
          <p>ATM Spot</p>
        </div>
      </div>

      <div className="p-6 max-w-5xl mx-auto">
        {showMap && mapSrc ? (
          // Map View
          <div>
            <div style={{ width: "100%", height: "600px", marginBottom: 20 }}>
              <iframe
                title="ATM Map"
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: 8 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div>
              <h3>Location</h3>
              <p>{a.location?.address || "N/A"}</p>
              <p>{[a.location?.city, a.location?.state, a.location?.country, a.location?.pincode].filter(Boolean).join(", ") || "N/A"}</p>
              {lat && lng && <p>Coordinates: {lat}, {lng}</p>}
            </div>
          </div>
        ) : (
          // Details View
          <>
            {a.images?.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
                {a.images.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={a.name + idx}
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
              <p>{a.description || "No description available."}</p>
            </div>

            <div style={{ marginTop: 16 }}>
              <h3>Location</h3>
              <p>{a.location?.address || "N/A"}</p>
              <p>{[a.location?.city, a.location?.state, a.location?.country, a.location?.pincode].filter(Boolean).join(", ") || "N/A"}</p>
              {lat && lng && <p>Coordinates: {lat}, {lng}</p>}
            </div>

            {a.website && (
              <div style={{ marginTop: 16 }}>
                <h3>Website</h3>
                <p><a href={a.website} target="_blank" rel="noreferrer">{a.website}</a></p>
              </div>
            )}

            {mapSrc && (
              <div style={{ marginTop: 20 }}>
                <h3>Map</h3>
                <div style={{ width: "100%", height: 400 }}>
                  <iframe
                    title="ATM Map"
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
        <button className="footer-btn" onClick={() => navigate("/feature/atm-spots")}>← Back to ATM Spots</button>
        {!showMap && mapSrc && (
          <button className="footer-btn" onClick={() => navigate(`/feature/atm-spots/${id}?view=map`)}>View on Map</button>
        )}
        {showMap && (
          <button className="footer-btn" onClick={() => navigate(`/feature/atm-spots/${id}`)}>View Details</button>
        )}
        {mapSrc && (
          <button className="footer-btn" onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, "_blank")}>Open in Google Maps</button>
        )}
      </footer>
    </div>
  );
}

