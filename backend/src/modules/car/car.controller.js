const carService = require('./car.service');

const getCars = (req, res, next) => {
  return carService
    .getCars()
    .then((cars) => {
      return res.status(200).json({
        success: true,
        data: cars,
      });
    })
    .catch((error) => {
      return next(error);
    });
};

const createCar = (req, res, next) => {
  return carService
    .createCar(req.body)
    .then((car) => {
      return res.status(201).json({
        success: true,
        data: car,
      });
    })
    .catch((error) => {
      return next(error);
    });
};

const searchCars = (req, res, next) => {
  return carService
    .searchCars(req.body)
    .then((cars) => {
      return res.status(200).json({
        success: true,
        count: cars.length,
        data: cars,
      });
    })
    .catch((error) => {
      return next(error);
    });
};

module.exports = {
  getCars,
  createCar,
  searchCars,
};
