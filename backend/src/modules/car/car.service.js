const Car = require('./car.model');

const getCars = (filters = {}) => {
  return Car.find(filters)
    .lean()
    .then((cars) => cars)
    .catch((error) => {
      throw error;
    });
};

const searchCars = (payload) => {
  const { budget, fuelType, transmission, bodyType, familySize } = payload;

  const query = {};

  if (budget) {
    query['price.exShowroom'] = {
      $lte: budget + 3,
    };
  }

  if (fuelType) {
    query['specifications.fuelType'] = fuelType;
  }

  if (transmission) {
    query['specifications.transmission'] = transmission;
  }

  if (bodyType) {
    query.bodyType = bodyType;
  }

  if (familySize) {
    query['specifications.seatingCapacity'] = {
      $gte: familySize,
    };
  }

  return Car.find(query)
    .limit(20)
    .sort({
      userRating: -1,
    })
    .lean()
    .then((cars) => cars)
    .catch((error) => {
      throw error;
    });
};

module.exports = {
  getCars,
  searchCars,
};
