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

const famousShopSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String }, // "mall" or "petrolPump"
    description: { type: String },
    images: [String],
    location: locationSchema,
    contact: contactSchema,
    timings: String,
    shopsAnchors: String, // For malls
    cityId: { type: mongoose.Schema.Types.ObjectId, ref: "City" },
  },
  { timestamps: true }
);

export default mongoose.model("FamousShop", famousShopSchema);

