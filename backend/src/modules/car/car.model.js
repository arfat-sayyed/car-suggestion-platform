const mongoose = require('mongoose');

const carSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: true,
      trim: true,
    },

    model: {
      type: String,
      required: true,
      trim: true,
    },

    variant: {
      type: String,
      required: true,
      trim: true,
    },

    bodyType: {
      type: String,
      enum: ['Hatchback', 'Sedan', 'SUV', 'Compact SUV', 'MPV', 'EV'],
      required: true,
    },

    price: {
      exShowroom: {
        type: Number,
        required: true,
        min: 1,
      },
    },

    specifications: {
      fuelType: {
        type: String,
        enum: ['Petrol', 'Diesel', 'EV', 'CNG', 'Hybrid'],
        required: true,
      },

      transmission: {
        type: String,
        enum: ['Manual', 'Automatic'],
        required: true,
      },

      mileage: {
        type: Number,
        required: true,
      },

      seatingCapacity: {
        type: Number,
        required: true,
      },

      engineCC: {
        type: Number,
      },
    },

    safety: {
      rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
      },

      airbags: {
        type: Number,
        default: 2,
      },
    },

    features: {
      type: [String],
      default: [],
    },

    suitableFor: {
      type: [String],
      enum: ['city', 'family', 'highway', 'offroad'],
      default: [],
    },

    userRating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

carSchema.index(
  {
    make: 1,
    model: 1,
    variant: 1,
  },
  {
    unique: true,
  }
);

carSchema.index({
  'price.exShowroom': 1,
});

carSchema.index({
  'specifications.fuelType': 1,
});

carSchema.index({
  'safety.rating': -1,
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
