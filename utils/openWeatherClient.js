const axios = require('axios');

const fetchWeatherData = async (city) => {
    try {
        console.log("heyyy---6",city,process.env.OPENWEATHER_API_KEY)
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
        );
        return {
            temperature: response.data.main.temp,
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon,
        };
    } catch (error) {
        if (error.response) {
            console.error("API Response Error:", error.response.data);
        } else if (error.request) {
            console.error("No Response Received:", error.request);
        } else {
            console.error("Error Configuring Request:", error.message);
        }
        throw new Error('Error fetching weather data');
    }
};

module.exports = fetchWeatherData;
