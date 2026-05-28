const recommendationService = require('./recommendation.service');

const getRecommendations = (req, res, next) => {
  const { budget } = req.body;

  if (!budget) {
    return res.status(400).json({
      success: false,
      message: 'Budget is required',
    });
  }
  return recommendationService
    .getRecommendations(req.body)
    .then((cars) => {
      return res.status(200).json({
        success: true,
        count: cars.length,
        message: cars.length
          ? 'Recommendations fetched successfully'
          : 'No matching cars found',
        data: cars,
      });
    })
    .catch((error) => {
      return next(error);
    });
};

module.exports = {
  getRecommendations,
};
