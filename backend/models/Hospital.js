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
  emergencyNumber: String,
  email: String,
  website: String,
});

const facilitySchema = new mongoose.Schema({
  departments: [String],
  numBeds: Number,
  specializations: [String],
  doctorCount: Number,
  nurseCount: Number,
});

const hospitalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String },
    description: { type: String },
    images: [String],
    location: locationSchema,
    contact: contactSchema,
    facilities: facilitySchema,
    cityId: { type: mongoose.Schema.Types.ObjectId, ref: "City" },
  },
  { timestamps: true }
);

export default mongoose.model("Hospital", hospitalSchema);






