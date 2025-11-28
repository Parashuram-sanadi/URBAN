import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import all pages
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx"; // ✅ Added Register Page
import Dashboard from "./pages/Dashboard.jsx";
import UrbanDashboard from "./pages/UrbanDashboard.jsx";
import AdminUpload from "./pages/AdminUpload.jsx";
import ExploreCities from "./pages/ExploreCities.jsx";
import FeaturePage from "./pages/FeaturePage.jsx";
import AdminHome from "./pages/AdminHome.jsx";
import AdminFeature from "./pages/AdminFeature.jsx";
import HospitalsAdmin from "./pages/HospitalsAdmin.jsx";
import HospitalDetail from "./pages/HospitalDetail.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import GovernmentOfficesAdmin from "./pages/GovernmentOfficesAdmin.jsx";
import GovernmentOfficesPage from "./pages/GovernmentOfficesPage.jsx";
import GovernmentOfficeDetail from "./pages/GovernmentOfficeDetail.jsx";
import TemplesAdmin from "./pages/TemplesAdmin.jsx";
import TemplesPage from "./pages/TemplesPage.jsx";
import TempleDetail from "./pages/TempleDetail.jsx";
import ATMSpotsAdmin from "./pages/ATMSpotsAdmin.jsx";
import BankingAdmin from "./pages/BankingAdmin.jsx";
import HotelsRestaurantsAdmin from "./pages/HotelsRestaurantsAdmin.jsx";
import EducationAdmin from "./pages/EducationAdmin.jsx";
import FamousShopsAdmin from "./pages/FamousShopsAdmin.jsx";
import TravelAgenciesAdmin from "./pages/TravelAgenciesAdmin.jsx";
import HotelDetail from "./pages/HotelDetail.jsx";
import EducationDetail from "./pages/EducationDetail.jsx";
import BankingDetail from "./pages/BankingDetail.jsx";
import TravelAgencyDetail from "./pages/TravelAgencyDetail.jsx";
import AtmSpotDetail from "./pages/AtmSpotDetail.jsx";
import FamousShopDetail from "./pages/FamousShopDetail.jsx";
import ReportUpdatesPage from "./pages/ReportUpdatesPage.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* 🔐 Authentication Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🧭 Main App Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/urban-dashboard" element={<UrbanDashboard />} />
        <Route path="/report-updates" element={<ReportUpdatesPage />} />
        <Route path="/admin-upload" element={<AdminUpload />} />
        <Route path="/explore" element={<ExploreCities />} />
        {/* Detail pages - must be before /feature/:slug to match correctly */}
        <Route path="/feature/hospitals/:id" element={<HospitalDetail />} />
        <Route path="/feature/hotels/:id" element={<HotelDetail />} />
        <Route path="/feature/hotels-restaurants/:id" element={<HotelDetail />} />
        <Route path="/feature/education/:id" element={<EducationDetail />} />
        <Route path="/feature/banking/:id" element={<BankingDetail />} />
        <Route path="/feature/travel-agencies/:id" element={<TravelAgencyDetail />} />
        <Route path="/feature/atm-spots/:id" element={<AtmSpotDetail />} />
        <Route path="/feature/famous-shops/:id" element={<FamousShopDetail />} />
        <Route path="/feature/government-offices/:id" element={<GovernmentOfficeDetail />} />
        <Route path="/feature/temples/:id" element={<TempleDetail />} />
        {/* Feature list pages */}
        <Route path="/feature/:slug" element={<FeaturePage />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/hospitals" element={<HospitalsAdmin />} />
        <Route path="/admin/government-offices" element={<GovernmentOfficesAdmin />} />
        <Route path="/admin/atm-spots" element={<ATMSpotsAdmin />} />
        <Route path="/admin/banking" element={<BankingAdmin />} />
        <Route path="/admin/hotels" element={<HotelsRestaurantsAdmin />} />
        <Route path="/admin/hotels-restaurants" element={<HotelsRestaurantsAdmin />} />
        <Route path="/admin/education" element={<EducationAdmin />} />
        <Route path="/admin/famous-shops" element={<FamousShopsAdmin />} />
        <Route path="/admin/travel-agencies" element={<TravelAgenciesAdmin />} />
        <Route path="/admin/temples" element={<TemplesAdmin />} />
        <Route path="/admin/:slug" element={<AdminFeature />} />

        {/* 🧠 Sanity Test Route */}
        <Route path="/test" element={<h1>Hello, Routing Works!</h1>} />
      </Routes>
    </Router>
  );
}
