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

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String }, // "hotel" or "restaurant"
    description: { type: String },
    images: [String],
    location: locationSchema,
    contact: contactSchema,
    rating: String,
    timing: String,
    cityId: { type: mongoose.Schema.Types.ObjectId, ref: "City" },
  },
  { timestamps: true }
);

export default mongoose.model("Hotel", hotelSchema);

