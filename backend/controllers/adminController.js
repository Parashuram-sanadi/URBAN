import fs from "fs";
import path from "path";
import City from "../models/City.js";
import Hospital from "../models/Hospital.js";
import GovernmentOffice from "../models/GovernmentOffice.js";
import Temple from "../models/Temple.js";
import Hotel from "../models/Hotel.js";
import Education from "../models/Education.js";
import Banking from "../models/Banking.js";
import TravelAgency from "../models/TravelAgency.js";
import AtmSpot from "../models/AtmSpot.js";
import FamousShop from "../models/FamousShop.js";
import User from "../models/User.js";

// Export current DB collections to a snapshot JSON file (seed_snapshot.json)
export const exportSeedSnapshot = async (req, res) => {
  try {
    // require admin role
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    const [users, cities, hospitals, offices, temples, hotels, educations, bankings, travelAgencies, atmSpots, famousShops] = await Promise.all([
      User.find().lean(),
      City.find().lean(),
      Hospital.find().lean(),
      GovernmentOffice.find().lean(),
      Temple.find().lean(),
      Hotel.find().lean(),
      Education.find().lean(),
      Banking.find().lean(),
      TravelAgency.find().lean(),
      AtmSpot.find().lean(),
      FamousShop.find().lean(),
    ]);

    const snapshot = {
      users,
      cities,
      hospitals,
      governmentOffices: offices,
      temples,
      hotels,
      educations,
      bankings,
      travelAgencies,
      atmSpots,
      famousShops,
    };

    const outPath = path.resolve(new URL(import.meta.url).pathname.replace(/\\/g, "/").replace(/(^[A-Z]:)/i, ""), "..", "seed_snapshot.json");

    // For Windows path fix: use cwd-based path
    const cwdOut = path.join(process.cwd(), "backend", "seed_snapshot.json");

    fs.writeFileSync(cwdOut, JSON.stringify(snapshot, null, 2), { encoding: "utf-8" });

    return res.json({ message: "Seed snapshot exported", path: "backend/seed_snapshot.json" });
  } catch (err) {
    console.error("Failed to export seed snapshot:", err);
    return res.status(500).json({ message: "Failed to export seed snapshot", error: err.message });
  }
};
