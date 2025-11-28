import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  address: String,
  city: String,
  state: String,
  country: String,
  pincode: String,
  latitude: Number,
  longitude: Number,
});

const contactSchema = new mongoose.Schema({
  phone: String,
  email: String,
  website: String,
});

const educationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String }, // "school" or "college"
    description: { type: String },
    images: [String],
    location: locationSchema,
    contact: contactSchema,
    timings: String,
    facilitiesAvailable: String, // For schools
    coursesAvailable: String, // For colleges
    cityId: { type: mongoose.Schema.Types.ObjectId, ref: "City" },
  },
  { timestamps: true }
);

export default mongoose.model("Education", educationSchema);

