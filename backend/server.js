import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.js";
import cityRoutes from "./routes/cityRoutes.js";
import hospitalRoutes from "./routes/hospitalRoutes.js";
import governmentOfficeRoutes from "./routes/governmentOfficeRoutes.js";
import templeRoutes from "./routes/templeRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import educationRoutes from "./routes/educationRoutes.js";
import bankingRoutes from "./routes/bankingRoutes.js";
import travelAgencyRoutes from "./routes/travelAgencyRoutes.js";
import atmSpotRoutes from "./routes/atmSpotRoutes.js";
import famousShopRoutes from "./routes/famousShopRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import updateReportRoutes from "./routes/updateReportRoutes.js";

dotenv.config();

// ------------------- APP CONFIG -------------------
const app = express();
const PORT = process.env.PORT || 5000;

// ------------------- MIDDLEWARE -------------------
// Get allowed origins from environment variables
// ------------------- MIDDLEWARE -------------------
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://localhost:3000",
];

console.log("Allowed CORS Origins:", allowedOrigins);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());


// Request logger for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// ------------------- ROUTES -------------------
app.use("/api/users", userRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/govoffices", governmentOfficeRoutes);
app.use("/api/temples", templeRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/educations", educationRoutes);
app.use("/api/bankings", bankingRoutes);
app.use("/api/travelagencies", travelAgencyRoutes);
app.use("/api/atmspots", atmSpotRoutes);
app.use("/api/famousshops", famousShopRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/update-reports", updateReportRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("🌆 Urban Guide API is running successfully!");
});

// ------------------- DATABASE CONNECTION -------------------
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected successfully!");
    console.log(`📊 Database: ${mongoose.connection.name}`);
    console.log(`🌐 Host: ${mongoose.connection.host}`);
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // Stop server if DB connection fails
  });

// ------------------- GLOBAL ERROR HANDLER -------------------
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});
