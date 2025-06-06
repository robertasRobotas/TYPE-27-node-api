import express from "express";

import { INSERT_USER, GET_ALL } from "../controllers/user.js";

const router = express.Router();

router.post("/", INSERT_USER);

router.get("/", GET_ALL);

export default router;
