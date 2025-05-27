import { v4 as uuidv4 } from "uuid";

const cars = [];

export const GET_ALL_CARS = (req, res) => {
  const isDataExist = !!cars.length;

  if (!isDataExist) {
    return res.status(404).json({
      message: "Data does not exist",
    });
  }

  return res.status(200).json({
    cars: cars,
  });
};

export const GET_CAR_BY_ID = (req, res) => {
  const id = req.params.id;

  const car = cars.find((c) => {
    return c.id === id;
  });

  if (!car) {
    return res.status(404).json({
      message: "Car does not exist",
    });
  }

  return res.status(200).json({
    message: "Here is your car",
    car: car,
  });
};

export const INSERT_CAR = (req, res) => {
  const car = {
    id: uuidv4(),
    model: req.body.model,
    year: req.body.year,
    cratedAt: new Date(),
  };

  const isDataExist = cars.some((c) => {
    return c.model === car.model;
  });

  if (isDataExist) {
    return res
      .status(409)
      .json({ message: `Data with id ${car.id} already exist` });
  }

  cars.push(car);

  return res.status(201).json({
    messgage: "car was added",
    car: car,
  });
};
