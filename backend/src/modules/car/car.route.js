const express = require("express");

const carController = require("./car.controller");

const router = express.Router();

router.get("/", carController.getCars);

router.post("/", carController.createCar);

router.post(
  "/search",
  carController.searchCars
);

module.exports = router;