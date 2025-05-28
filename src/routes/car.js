import express from "express";

import {
  GET_ALL_CARS,
  GET_CAR_BY_ID,
  INSERT_CAR,
  UPDATE_CAR_BY_ID,
  DELETE_CAR_BY_ID,
} from "../controllers/car.js";

const router = express.Router();

router.get("/cars", GET_ALL_CARS);

router.get("/cars/:id", GET_CAR_BY_ID);

router.post("/cars", INSERT_CAR);

router.put("/cars/:id", UPDATE_CAR_BY_ID);

router.delete("/cars/:id", DELETE_CAR_BY_ID);

export default router;
