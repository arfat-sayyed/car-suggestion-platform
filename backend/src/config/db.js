const mongoose = require("mongoose");

const connectDB = async (mongoUri) => {
  try {
    if (!mongoUri) {
      console.log(
        "Mongo URI not found. Starting server without DB."
      );

      return;
    }

    await mongoose.connect(mongoUri);

    console.log("MongoDB connected");
  } catch (error) {
    console.error(
      "MongoDB connection failed",
      error.message
    );

    process.exit(1);
  }
};

module.exports = connectDB;