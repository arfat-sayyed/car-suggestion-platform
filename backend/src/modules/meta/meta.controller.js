const metaService = require('./meta.service');

const getPreferencesMeta = (req, res, next) => {
  return metaService
    .getPreferencesMeta()
    .then((data) => {
      return res.status(200).json({
        success: true,
        data,
      });
    })
    .catch((error) => {
      return next(error);
    });
};

module.exports = {
  getPreferencesMeta,
};
