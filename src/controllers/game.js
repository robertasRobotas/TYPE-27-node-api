import { v4 as uuidv4 } from "uuid";
import BoardGameModel from "../models/game.js";

export const GET_ALL = async (req, res) => {
  try {
    const games = await BoardGameModel.find();

    return res.status(200).json({
      games: games,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "We have some problems",
    });
  }
};

export const GET_BY_ID = async (req, res) => {
  try {
    const id = req.params.id;
    const game = await BoardGameModel.findOne({ id: id });

    if (!game) {
      return res.status(404).json({
        message: "Game does not exist",
      });
    }

    return res.status(200).json({
      message: "Here is your game",
      game: game,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "We have some problems",
    });
  }
};

export const INSERT = async (req, res) => {
  try {
    const existingGame = await BoardGameModel.findOne({
      title: req.body.title,
    });

    if (existingGame) {
      return res.status(409).json({
        messgage: `Game ${req.body.title} already exist`,
      });
    }

    const game = {
      ...req.body,
      id: uuidv4(),
      cratedAt: new Date(),
    };

    const response = new BoardGameModel(game);

    const data = await response.save();

    return res.status(201).json({
      messgage: "game was added",
      game: data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "We have some problems",
    });
  }
};

export const UPDATE_BY_ID = async (req, res) => {
  try {
    const id = req.params.id;

    const game = await BoardGameModel.findOneAndUpdate(
      { id: id },
      { ...req.body },
      { new: true }
    );

    if (!game) {
      return res.status(404).json({
        messgage: `Data with id ${id} does not exist`,
      });
    }

    return res.status(200).json({
      messgage: "game was updated",
      game: game,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "We have some problems",
    });
  }
};

export const DELETE_BY_ID = async (req, res) => {
  try {
    const id = req.params.id;

    const game = await BoardGameModel.findOneAndDelete({ id: id });

    if (!game) {
      return res.status(404).json({
        message: `Data with id ${id} does not exist`,
      });
    }

    return res.status(200).json({
      message: "Game was deleted",
      game,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "We have some problems",
    });
  }
};
