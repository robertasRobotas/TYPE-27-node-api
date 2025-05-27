import express from "express";
import cors from "cors";
import carRouter from "./src/routes/car.js";
import "dotenv/config";

const app = express();

app.use(cors());

app.use(express.json());

app.use(carRouter);
// app.use(userRoutes);
// .....

app.use((_req, res) => {
  return res.status(404).json({
    message: "This endpoint does not exist",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`App started on port ${process.env.PORT}`);
});
