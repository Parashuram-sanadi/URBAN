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

const templeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    deity: String,
    openingTime: String,
    images: [String],
    location: locationSchema,
    contact: contactSchema,
  },
  { timestamps: true }
);

export default mongoose.model("Temple", templeSchema);


