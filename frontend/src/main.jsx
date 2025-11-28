
// frontend/src/main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import './App.css';

//import "./index.css"; // ✅ or comment out if you removed it

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
