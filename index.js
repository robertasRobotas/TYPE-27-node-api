import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import gameRouter from "./src/routes/game.js";
import userRouter from "./src/routes/user.js";

const app = express();

// TODO: add real ui url
app.use(cors());

app.use(express.json());

mongoose
  .connect(process.env.MONGO_DB_CONNECTION)
  .then(console.log("Connected to DB!"))
  .catch((err) => {
    console.log(err);
  });

app.use("/users", userRouter);
app.use("/games", gameRouter);

app.use((_req, res) => {
  return res.status(404).json({
    message: "This endpoint does not exist",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`App started on port ${process.env.PORT}`);
});
