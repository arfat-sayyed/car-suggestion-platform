const mongoose = require("mongoose");

const env = require("../config/env");
const connectDB = require("../config/db");

const Car = require(
  "../modules/car/car.model"
);

const cars = require(
  "../data/cars.seed"
);

const seedCars = async () => {
  try {
    await connectDB(env.mongoUri);

    await Car.deleteMany({});

    await Car.insertMany(cars);

    console.log(
      "Cars seeded successfully"
    );

    process.exit(0);
  } catch (error) {
    console.error(
      "Car seeding failed",
      error
    );

    process.exit(1);
  }
};

seedCars();