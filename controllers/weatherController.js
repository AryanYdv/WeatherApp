const Weather = require('../models/weather');
const fetchWeatherData = require('../utils/openWeatherClient');

exports.getWeather = async (req, res) => {
    const { city } = req.query;
    if (!city) return res.status(400).json({ error: 'City is required' });
    try {
        const weatherData = await fetchWeatherData(city);
        const weatherRecord = new Weather({
            city,
            temperature: weatherData.temperature,
            description: weatherData.description,
            icon: weatherData.icon,
        });

        await weatherRecord.save();
        res.json(weatherRecord);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//for historical weather data with filters
exports.getHistoricalWeather = async (req, res) => {
    const { city, from, to } = req.query;

    const filters = {};
    if (city) filters.city = city;
    if (from || to) {
        filters.fetchedAt = {};
        if (from) filters.fetchedAt.$gte = new Date(from);
        if (to) filters.fetchedAt.$lte = new Date(to);
    }

    try {
        const weatherRecords = await Weather.find(filters).sort({ fetchedAt: -1 });
        res.json(weatherRecords);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
