const Car = require('../car/car.model');

const getRecommendations = (payload) => {
  const {
    budget,
    fuelType,
    transmission,
    familySize,
    bodyType,
    usage,
    priorities = [],
  } = payload;

  return Car.find({
    'price.exShowroom': {
      $gte: Math.max(5, budget - 15),
      $lte: budget + 5,
    },
  })
    .lean()
    .then((cars) => {
      let filteredCars = cars;

      if (bodyType) {
        filteredCars = filteredCars.filter((car) => car.bodyType === bodyType);
      }

      const scoredCars = filteredCars.map((car) => {
        let score = 0;

        const matchReason = [];

        // Budget
        // Budget relevance
        const priceDifference = Math.abs(budget - car.price.exShowroom);

        if (car.price.exShowroom <= budget) {
          if (priceDifference <= 3) {
            score += 35;

            matchReason.push('Perfect budget match');
          } else if (priceDifference <= 8) {
            score += 25;

            matchReason.push('Good budget fit');
          } else if (priceDifference <= 15) {
            score += 10;

            matchReason.push('Within your budget');
          }
        }

        // Fuel
        if (fuelType && car.specifications.fuelType === fuelType) {
          score += 20;

          matchReason.push(`${fuelType} preference matched`);
        }

        // Transmission
        if (transmission && car.specifications.transmission === transmission) {
          score += 15;

          matchReason.push(`${transmission} transmission matched`);
        }

        // Family size
        if (familySize && car.specifications.seatingCapacity >= familySize) {
          score += 15;

          matchReason.push('Suitable for family size');
        }

        // Usage
        if (usage && car.suitableFor.includes(usage)) {
          score += 10;

          matchReason.push(`Great for ${usage} driving`);
        }

        // Safety priority
        if (priorities.includes('safety') && car.safety.rating >= 4) {
          score += 10;

          matchReason.push('Excellent safety rating');
        }

        // Mileage priority
        if (
          priorities.includes('mileage') &&
          car.specifications.mileage >= 18
        ) {
          score += 10;

          matchReason.push('Fuel efficient');
        }

        if (priorities.includes('features') && car.features.length) {
          score += 10;

          matchReason.push('Feature rich car');
        }

        return {
          id: car._id,

          name: `${car.make} ${car.model} ${car.variant}`,

          make: car.make,
          model: car.model,
          variant: car.variant,
          bodyType: car.bodyType,

          price: car.price.exShowroom,

          fuelType: car.specifications.fuelType,

          transmission: car.specifications.transmission,

          mileage: car.specifications.mileage,

          seatingCapacity: car.specifications.seatingCapacity,

          safetyRating: car.safety.rating,

          airbags: car.safety.airbags,

          features: car.features,

          userRating: car.userRating,

          score,

          matchReason,
        };
      });

      return scoredCars
        .filter((car) => car.score >= 20)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
    })
    .catch((error) => {
      throw error;
    });
};

module.exports = {
  getRecommendations,
};
