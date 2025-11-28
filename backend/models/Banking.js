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

const bankingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    images: [String],
    location: locationSchema,
    contact: contactSchema,
    timing: String,
    cityId: { type: mongoose.Schema.Types.ObjectId, ref: "City" },
  },
  { timestamps: true }
);

export default mongoose.model("Banking", bankingSchema);

