const express = require('express');
const { getWeather, getHistoricalWeather } = require('../controllers/weatherController');

const router = express.Router();

router.post('/current', getWeather);
router.post('/history', getHistoricalWeather);

module.exports = router;
