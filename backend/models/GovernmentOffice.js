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

const staffSchema = new mongoose.Schema({
  officerCount: Number,
  staffCount: Number,
  cells: String,
});

const officeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String },
    description: { type: String },
    images: [String],
    openingTime: { type: String },
    location: locationSchema,
    contact: contactSchema,
    staff: staffSchema,
    cityId: { type: mongoose.Schema.Types.ObjectId, ref: "City" },
  },
  { timestamps: true }
);

export default mongoose.model("GovernmentOffice", officeSchema);






