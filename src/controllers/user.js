import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import UserModel from "../models/user.js";

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

export const GET_ALL = async (req, res) => {
  const users = await UserModel.find().select("-password -createdAt -__v");

  res.status(200).json({
    users: users,
  });
};
