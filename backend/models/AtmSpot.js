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

const atmSpotSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    images: [String],
    location: locationSchema,
    website: String,
    cityId: { type: mongoose.Schema.Types.ObjectId, ref: "City" },
  },
  { timestamps: true }
);

export default mongoose.model("AtmSpot", atmSpotSchema);

