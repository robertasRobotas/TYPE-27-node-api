import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import UserModel from "../models/user.js";
import GameModel from "../models/game.js";
import jwt from "jsonwebtoken";

export const INSERT_USER = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(req.body.password, salt);

    const newUser = {
      ...req.body,
      savedBoardgames: [],
      id: uuidv4(),
      createdAt: new Date(),
      password: passwordHash,
    };

    const response = new UserModel(newUser);
    const data = await response.save();

    return res.status(201).json({ message: "user was created", user: data });
  } catch (err) {
    const DUPLICATE_ERROR_CODE = 11000;

    if (err.code === DUPLICATE_ERROR_CODE) {
      return res
        .status(409)
        .json({ message: "User with this email already exist" });
    }

    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const LOGIN_USER = async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });

  if (!user) {
    return res.status(401).json({
      message: "User provided data is wrong (email)",
    });
  }

  const isPasswordMatch = bcrypt.compareSync(req.body.password, user.password);

  if (!isPasswordMatch) {
    return res.status(401).json({
      message: "User provided data is wrong (password)",
    });
  }

  const token = jwt.sign(
    { userEmail: user.email, userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "12h" }
  );

  return res.status(200).json({
    message: "User legged in successfully",
    jwt: token,
  });
};

export const GET_ALL = async (req, res) => {
  const users = await UserModel.aggregate([
    {
      $lookup: {
        from: "boardgames",
        localField: "savedBoardgames",
        foreignField: "id",
        as: "boardgames",
      },
    },
    {
      $project: {
        password: 0,
        createAt: 0,
        __v: 0,
      },
    },
  ]);

  res.status(200).json({
    users: users,
  });
};

export const GET_USER_BY_ID = async (req, res) => {
  const userId = req.body.userId;

  console.log(userId);

  const user = await UserModel.findOne({ id: userId })
    .populate({
      path: "savedBoardgames",
      model: "Boardgame",
      localField: "savedBoardgames",
      foreignField: "id",
      as: "boardgames",
    })
    .select("-password -createAt -__v");

  res.status(200).json({
    user: user,
  });
};

export const SAVE_GAME_TO_USER = async (req, res) => {
  const userId = req.body.userId;
  const gameId = req.body.gameId;

  const game = await GameModel.findOne({ id: gameId });

  if (!game) {
    return res.status(404).json({
      message: `Game with id ${gameId} does not exist`,
    });
  }

  // const user = await UserModel.findOne({ id: userId });
  // user.savedBoardgames.push(gameId);

  const response = await UserModel.findOneAndUpdate(
    { id: userId },
    { $push: { savedBoardgames: gameId } },
    { new: true }
  );

  res.status(200).json({
    message: "boardgame was added",
    response: response,
  });
};
