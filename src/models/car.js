import mongoose from "mongoose";

const carSchema = mongoose.Schema({
  id: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  cratedAt: { type: Date, required: true },
});

export default mongoose.model("Car", carSchema);
