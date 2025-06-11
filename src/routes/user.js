import express from "express";
import auth from "../middlewares/auth.js";
import {
  INSERT_USER,
  GET_ALL,
  LOGIN_USER,
  SAVE_GAME_TO_USER,
  GET_USER_BY_ID,
} from "../controllers/user.js";
import validate from "../middlewares/validation.js";
import loginSchema from "../schemas/login.js";

const router = express.Router();

router.post("/", INSERT_USER);

router.post("/login", validate(loginSchema), LOGIN_USER);

router.get("/", GET_ALL);

router.get("/personal", auth, GET_USER_BY_ID);

router.post("/game/save", auth, SAVE_GAME_TO_USER);

export default router;
