import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import HospitalsPage from "./HospitalsPage.jsx";
import GovernmentOfficesPage from "./GovernmentOfficesPage.jsx";
import TemplesPage from "./TemplesPage.jsx";
import HotelsPage from "./HotelsPage.jsx";
import EducationPage from "./EducationPage.jsx";
import BankingPage from "./BankingPage.jsx";
import TravelAgenciesPage from "./TravelAgenciesPage.jsx";
import FamousShopsPage from "./FamousShopsPage.jsx";
import AtmSpotsPage from "./AtmSpotsPage.jsx";

const FEATURE_META = {
  "map": { title: "Map", icon: "🗺️", description: "Explore and locate destinations around your city." },
  "education": { title: "Educational Institutions", icon: "🎓", description: "Find schools, colleges, and universities." },
  "hospitals": { title: "Hospitals", icon: "🏥", description: "Locate hospitals and emergency services." },
  "government-offices": { title: "Government Offices", icon: "🏛️", description: "Administrative and civic service centers." },
  "banking": { title: "Banking Details", icon: "🏦", description: "Banks, branches, and financial services." },
  "hotels-restaurants": { title: "Hotels & Restaurants", icon: "🍽️", description: "Dining and accommodation options." },
  "utilities": { title: "Regional Spots", icon: "🛕", description: "Temples and prominent regional landmarks." },
  "atm-spots": { title: "ATM Spots", icon: "🏧", description: "Find nearby ATMs quickly." },
  "travel-agencies": { title: "Traveling Agencies", icon: "✈️", description: "Tour and travel assistance providers." },
  "famous-shops": { title: "Essential Spots", icon: "🛍️", description: "Popular shopping destinations and markets." },
};

export default function FeaturePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const meta = FEATURE_META[slug];

  if (slug === "map") {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <div className="header-center">
            <div style={{ fontSize: 48, lineHeight: 1 }}>🗺️</div>
            <h1 style={{ marginTop: 8 }}>Chikodi City Map</h1>
            <p>Explore Chikodi, Karnataka and discover key spots across the city.</p>
          </div>
        </div>

        <div className="map-embed-wrapper">
          <iframe
            title="Chikodi City Map"
            src="https://www.google.com/maps?q=Chikodi,Karnataka&z=14&output=embed"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>

        <footer>
          <button className="footer-btn" onClick={() => navigate("/urban-dashboard")}>
            ← Back to Urban Dashboard
          </button>
        </footer>
      </div>
    );
  }

  if (slug === "hospitals") {
    return <HospitalsPage />;
  }
  if (slug === "government-offices") {
    return <GovernmentOfficesPage />;
  }
  if (slug === "temples" || slug === "utilities") {
    return <TemplesPage />;
  }
  if (slug === "hotels-restaurants") {
    return <HotelsPage />;
  }
  if (slug === "education") {
    return <EducationPage />;
  }
  if (slug === "banking") {
    return <BankingPage />;
  }
  if (slug === "travel-agencies") {
    return <TravelAgenciesPage />;
  }
  if (slug === "famous-shops") {
    return <FamousShopsPage />;
  }
  if (slug === "atm-spots") {
    return <AtmSpotsPage />;
  }

  if (!meta) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <div className="header-center">
            <h1>Feature Not Found</h1>
            <p>The requested feature is unavailable.</p>
          </div>
        </div>
        <button className="footer-btn" onClick={() => navigate("/urban-dashboard")}>Back</button>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-center">
          <div style={{ fontSize: 48, lineHeight: 1 }}>{meta.icon}</div>
          <h1 style={{ marginTop: 8 }}>{meta.title}</h1>
          <p>{meta.description}</p>
        </div>
        <button className="logout-btn" onClick={() => navigate("/admin/" + slug)}>Manage</button>
      </div>

      <div className="city-grid">
        {[...Array(8)].map((_, idx) => (
          <div key={idx} className="city-card">
            <h3>{meta.title} Item {idx + 1}</h3>
            <p>Details will appear here.</p>
          </div>
        ))}
      </div>

      <footer>
        <button className="footer-btn" onClick={() => navigate("/urban-dashboard")}>← Back to Urban Dashboard</button>
        <button className="footer-btn" onClick={() => navigate("/admin/" + slug)}>Manage Content</button>
      </footer>
    </div>
  );
}


