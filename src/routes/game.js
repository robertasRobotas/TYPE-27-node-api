import express from "express";

import {
  GET_ALL,
  GET_BY_ID,
  INSERT,
  UPDATE_BY_ID,
  DELETE_BY_ID,
} from "../controllers/game.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", auth, GET_ALL);

router.get("/:id", auth, GET_BY_ID);

router.post("/", auth, INSERT);

router.put("/:id", auth, UPDATE_BY_ID);

router.delete("/:id", auth, DELETE_BY_ID);

export default router;
