import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

// Import models
import User from "./models/User.js";
import City from "./models/City.js";
import Hospital from "./models/Hospital.js";
import GovernmentOffice from "./models/GovernmentOffice.js";
import Temple from "./models/Temple.js";
import Hotel from "./models/Hotel.js";
import Education from "./models/Education.js";
import Banking from "./models/Banking.js";
import TravelAgency from "./models/TravelAgency.js";
import AtmSpot from "./models/AtmSpot.js";
import FamousShop from "./models/FamousShop.js";

dotenv.config();

// ------------------- DATABASE CONNECTION -------------------
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully!");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

// Load optional snapshot file if present
const loadSnapshot = () => {
  try {
    const snapshotPath = path.join(process.cwd(), "backend", "seed_snapshot.json");
    if (fs.existsSync(snapshotPath)) {
      const raw = fs.readFileSync(snapshotPath, "utf-8");
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn("Could not load seed snapshot:", err.message);
  }
  return null;
};

// ------------------- SEED DATA -------------------
const seedData = async () => {
  try {
    const snapshot = loadSnapshot();

    // ------------------- SEED USERS -------------------
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log("👤 Seeding users...");
      const hashedAdminPassword = await bcrypt.hash("UrbanAdmin!2025", 10);
      const usersToInsert = snapshot?.users?.length ? snapshot.users : [
        { email: "admin@urbanguide.com", password: hashedAdminPassword, role: "admin" },
        { email: "user@example.com", password: await bcrypt.hash("user123", 10), role: "user" },
      ];
      await User.insertMany(usersToInsert);
      console.log(`✅ ${usersToInsert.length} users seeded`);
    } else {
      console.log(`👤 Users already present (${userCount}), skipping user seed`);
    }

    // ------------------- SEED CITIES -------------------
    const cityCount = await City.countDocuments();
    if (cityCount === 0) {
      console.log("🏙️  Seeding cities...");
      const citiesToInsert = snapshot?.cities?.length ? snapshot.cities : [
        { name: "Belagavi", reputation: 4.5, reviews: "A historic city known for its rich culture and heritage." },
        { name: "Chikodi", reputation: 4.4, reviews: "A vibrant town with excellent connectivity and modern amenities." },
        { name: "Athani", reputation: 4.3, reviews: "A peaceful town with traditional values and community spirit." },
        { name: "Gokak", reputation: 4.2, reviews: "A scenic town famous for its waterfalls and natural beauty." },
      ];
      await City.insertMany(citiesToInsert);
      console.log(`✅ ${citiesToInsert.length} cities seeded`);
    } else {
      console.log(`🏙️ Cities already present (${cityCount}), skipping city seed`);
    }

    // ------------------- SEED HOSPITALS -------------------
    const hospitalCount = await Hospital.countDocuments();
    if (hospitalCount === 0) {
      console.log("🏥 Seeding hospitals...");
      const hospitalsToInsert = snapshot?.hospitals?.length ? snapshot.hospitals : [
        {
          name: "Chikodi General Hospital",
          type: "General Hospital",
          description: "A comprehensive healthcare facility providing quality medical services to the community.",
          images: ["https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800", "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800"],
          location: { address: "Main Street, Chikodi", city: "Chikodi", state: "Karnataka", country: "India", pincode: "591201", latitude: 16.4289, longitude: 74.5954 },
          contact: { phone: "+91-1234567890", emergencyNumber: "+91-9876543210", email: "info@chikodihospital.com", website: "https://www.chikodihospital.com" },
          facilities: { departments: ["Emergency", "Cardiology", "Pediatrics", "Orthopedics", "General Medicine"], numBeds: 150, specializations: ["Cardiac Care", "Trauma Care", "Maternity", "Surgery"], doctorCount: 25, nurseCount: 50 },
        },
      ];
      await Hospital.insertMany(hospitalsToInsert);
      console.log(`✅ ${hospitalsToInsert.length} hospitals seeded`);
    } else {
      console.log(`🏥 Hospitals already present (${hospitalCount}), skipping hospital seed`);
    }

    // ------------------- SEED GOVERNMENT OFFICES -------------------
    const officeCount = await GovernmentOffice.countDocuments();
    if (officeCount === 0) {
      console.log("🏛️  Seeding government offices...");
      const officesToInsert = snapshot?.governmentOffices?.length ? snapshot.governmentOffices : [
        {
          name: "District Collectorate Office",
          type: "Administrative Office",
          description: "Main administrative office handling district-level governance and public services.",
          openingTime: "9:00 AM - 5:00 PM",
          location: { address: "Collectorate Road, Chikodi", city: "Chikodi", state: "Karnataka", country: "India", pincode: "591201", latitude: 16.4289, longitude: 74.5954 },
          contact: { phone: "+91-1234567800", emergencyNumber: "+91-9876543200", email: "collector@chikodidistrict.gov.in", website: "https://www.chikodidistrict.gov.in" },
          staff: { officerCount: 15, staffCount: 45, cells: "Revenue, Administration, Public Grievances, Development" },
        },
      ];
      await GovernmentOffice.insertMany(officesToInsert);
      console.log(`✅ ${officesToInsert.length} government offices seeded`);
    } else {
      console.log(`🏛️ Government offices already present (${officeCount}), skipping office seed`);
    }

    // ------------------- SEED TEMPLES -------------------
    const templeCount = await Temple.countDocuments();
    if (templeCount === 0) {
      console.log("🕉️  Seeding temples...");
      const templesToInsert = snapshot?.temples?.length ? snapshot.temples : [
        {
          name: "Shri Krishna Temple",
          description: "A beautiful temple dedicated to Lord Krishna, known for its peaceful atmosphere and architectural beauty.",
          deity: "Lord Krishna",
          openingTime: "6:00 AM - 9:00 PM",
          images: ["https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800", "https://images.unsplash.com/photo-1584116831289-9c17590fd2fa?w=800"],
          location: { address: "Temple Street, Chikodi", city: "Chikodi", state: "Karnataka", country: "India", pincode: "591201", latitude: 16.4289, longitude: 74.5954 },
          contact: { phone: "+91-1234567777", email: "info@shrikrishnatemple.com", website: "https://www.shrikrishnatemple.com" },
        },
      ];
      await Temple.insertMany(templesToInsert);
      console.log(`✅ ${templesToInsert.length} temples seeded`);
    } else {
      console.log(`🕉️ Temples already present (${templeCount}), skipping temple seed`);
    }

    console.log("\n🎉 Seed completed (inserted only into empty collections).\n");

  } catch (error) {
    console.error("❌ Error seeding data:", error);
    throw error;
  }
};

// ------------------- MAIN EXECUTION -------------------
const runSeed = async () => {
  try {
    await connectDB();
    await seedData();
    await mongoose.connection.close();
    console.log("\n✅ Database connection closed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

// Run the seed script only when invoked directly (e.g., `node seed.js`)
if (process.argv[1] && process.argv[1].endsWith("seed.js")) {
  runSeed();
}

// Export seedData for programmatic use
export { seedData };
