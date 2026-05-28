const express = require('express');

const metaController = require('./meta.controller');

const router = express.Router();

router.post('/preferences', metaController.getPreferencesMeta);

module.exports = router;
