import express from "express";

import {
  GET_ALL,
  GET_BY_ID,
  INSERT,
  UPDATE_BY_ID,
  DELETE_BY_ID,
} from "../controllers/game.js";
import auth from "../middlewares/auth.js";
import validate from "../middlewares/validation.js";
import boardgameSchema from "../schemas/boardgame.js";

const router = express.Router();

router.get("/", GET_ALL);

router.get("/:id", auth, GET_BY_ID);

router.post("/", validate(boardgameSchema), auth, INSERT);

router.put("/:id", auth, UPDATE_BY_ID);

router.delete("/:id", auth, DELETE_BY_ID);

export default router;
