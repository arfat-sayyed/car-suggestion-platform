const express = require('express');

const carRoutes = require('../modules/car/car.route');
const recommendationRoutes = require('../modules/recommendation/recommendation.route');
const metaRoutes = require('../modules/meta/meta.route');

const router = express.Router();

router.get('/health', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'API is running',
  });
});

router.use('/cars', carRoutes);

router.use('/recommendations', recommendationRoutes);

router.use('/meta', metaRoutes);

router.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

module.exports = router;
