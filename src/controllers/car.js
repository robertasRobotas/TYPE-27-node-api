import { v4 as uuidv4 } from "uuid";
import CarModel from "../models/car.js";

export const GET_ALL_CARS = async (req, res) => {
  try {
    const cars = await CarModel.find();

    return res.status(200).json({
      cars: cars,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "We have some problems",
    });
  }
};

export const GET_CAR_BY_ID = async (req, res) => {
  try {
    const id = req.params.id;
    const car = await CarModel.findOne({ id: id });

    if (!car) {
      return res.status(404).json({
        message: "Car does not exist",
      });
    }

    return res.status(200).json({
      message: "Here is your car",
      car: car,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "We have some problems",
    });
  }
};

export const INSERT_CAR = async (req, res) => {
  try {
    const car = {
      id: uuidv4(),
      model: req.body.model,
      year: req.body.year,
      cratedAt: new Date(),
    };

    const response = new CarModel(car);

    const data = await response.save();

    return res.status(201).json({
      messgage: "car was added",
      car: data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "We have some problems",
    });
  }
};

export const UPDATE_CAR_BY_ID = async (req, res) => {
  try {
    const id = req.params.id;

    const car = await CarModel.findOneAndUpdate(
      { id: id },
      { ...req.body },
      { new: true }
    );

    if (!car) {
      return res.status(404).json({
        messgage: `Data with id ${id} does not exist`,
      });
    }

    return res.status(200).json({
      messgage: "car was updated",
      car: car,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "We have some problems",
    });
  }
};

export const DELETE_CAR_BY_ID = async (req, res) => {
  try {
    const id = req.params.id;

    const car = await CarModel.findOneAndDelete({ id: id });

    if (!car) {
      return res.status(404).json({
        message: `Data with id ${id} does not exist`,
      });
    }

    return res.status(200).json({
      message: "Car was deleted",
      car,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "We have some problems",
    });
  }
};
