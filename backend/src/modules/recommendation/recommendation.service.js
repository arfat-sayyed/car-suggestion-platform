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
      $lte: budget + 3,
    },
  })
    .lean()
    .then((cars) => {
      const scoredCars = cars.map((car) => {
        let score = 0;

        const matchReason = [];

        // Budget
        if (car.price.exShowroom <= budget) {
          score += 30;

          matchReason.push('Fits your budget');
        }

        if (bodyType && car.bodyType === bodyType) {
          score += 15;

          matchReason.push(`${bodyType} preference matched`);
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
        if (car.specifications.seatingCapacity >= familySize) {
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
        .filter((car) => car.score >= 40)
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
