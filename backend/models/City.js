import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
  name: String,
  reputation: Number,
  reviews: String
});

export default mongoose.model("City", citySchema);
