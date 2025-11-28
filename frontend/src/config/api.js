// API Configuration - uses environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  // Auth endpoints
  REGISTER: `${API_BASE_URL}/api/users/register`,
  LOGIN: `${API_BASE_URL}/api/users/login`,
  
  // Resource endpoints
  CITIES: `${API_BASE_URL}/api/cities`,
  HOSPITALS: `${API_BASE_URL}/api/hospitals`,
  GOV_OFFICES: `${API_BASE_URL}/api/govoffices`,
  TEMPLES: `${API_BASE_URL}/api/temples`,
  HOTELS: `${API_BASE_URL}/api/hotels`,
  EDUCATION: `${API_BASE_URL}/api/educations`,
  BANKING: `${API_BASE_URL}/api/bankings`,
  TRAVEL_AGENCIES: `${API_BASE_URL}/api/travelagencies`,
  ATM_SPOTS: `${API_BASE_URL}/api/atmspots`,
  FAMOUS_SHOPS: `${API_BASE_URL}/api/famousshops`,
  UPDATE_REPORTS: `${API_BASE_URL}/api/update-reports`,
  
  // Admin endpoints
  ADMIN: `${API_BASE_URL}/api/admin`,
};

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
  if (endpoint.startsWith('http')) {
    return endpoint; // Already a full URL
  }
  return `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
};

export default API_BASE_URL;

