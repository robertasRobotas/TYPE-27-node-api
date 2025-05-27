import express from "express";

import { GET_ALL_CARS, GET_CAR_BY_ID, INSERT_CAR } from "../controllers/car.js";

const router = express.Router();

router.get("/getAllCars", GET_ALL_CARS);

router.get("/car/:id", GET_CAR_BY_ID);

router.post("/insertCar", INSERT_CAR);

export default router;
