import mongoose from "mongoose";

const boardgameSchema = mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  imgUrl: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  playTimeMin: { type: Number, required: true },
  bestStartPlayAtAge: { type: Number, required: true },
  rating: { type: Number, required: true },
  dificulty: { type: Number, required: true },
  boxSize: { type: String, required: true },
  ratingCount: { type: Number, required: true },
  canPlayPersons: { type: [Number], required: true },
  bestPlayPersons: { type: [Number], required: true },
  cratedAt: { type: Date, required: true },
});

export default mongoose.model("Boardgame", boardgameSchema);
