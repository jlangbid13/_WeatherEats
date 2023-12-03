const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const axios = require('axios');

const app = express();
app.use(cors());

// Initialize Firestore with your credentials
const serviceAccount = require("C:/Users/Jefferson Langbid/Desktop/_WeatherEats/weathereats.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const fetchWeatherData = async () => {
  const apiKey = '5851652f2f5da157701707dfc5f5b0f6'; // Replace with your actual OpenWeatherMap API key
  const latitude = '14.6091';
  const longitude = '121.0223';

  try {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error.response || error.message || error);
    return null;
  }
}

const setupRoutes = async () => {
  const weatherData = await fetchWeatherData();
  let weatherCondition;

  if (weatherData && weatherData.main && weatherData.main.temp && weatherData.main.humidity) {
    const temperature = weatherData.main.temp - 273.15;
    const humidity = parseInt(weatherData.main.humidity);
    const weather = weatherData.weather[0].main;

    if (temperature >= 30 && humidity >= 60) {
      weatherCondition = 'Hot and Humid';
    } else if (temperature >= 30 && humidity <= 60) {
      weatherCondition = 'hot and dry';
    } else if (temperature >= 20 && temperature < 30 && humidity > 60) {
      weatherCondition = 'mild cool';
    } else if (temperature >= 25 && temperature < 32 && weather === "Rain" && humidity < 60) {
      weatherCondition = 'rainy and dry';
    } else if (temperature >= 25 && temperature < 32 && weather === "Rain" && humidity > 60) {
      weatherCondition = 'rainy and humid';
    }

    app.get('/api/recipe', async (req, res) => {
      try {
        // Get the current time
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
  
        // Determine the time of day based on the current hour
        let timeOfDay;
        if (currentHour >= 0 && currentHour < 10) {
          timeOfDay = 'Breakfast';
        } else if (currentHour >= 10 && currentHour < 16) {
          timeOfDay = 'Lunch';
        } else {
          timeOfDay = 'Dinner';
        }
  
        // Retrieve recipes from Firestore based on TimeOfDay
        const recipes = [];
        const recipeDocs = await db.collection(weatherCondition).where('TimeOfDay', '==', timeOfDay).get();
  
        recipeDocs.forEach(doc => {
          const recipe = doc.data();
          recipe.id = doc.id;  // Include the recipe ID in the response
          recipes.push(recipe);
        });
  
        const responseData = { recipes };
        console.log('Server Response:', responseData);
        console.log('Weather: ', weatherCondition);
        res.status(200).json(responseData);
      } catch (error) {
        console.error('Server Error:', error.message);
        res.status(500).json({ error: error.message });
      }
    });
  
    app.get('/api/recipe/:id', async (req, res) => {
      try {
        const recipeId = req.params.id;
        // Retrieve the specific recipe from Firestore based on the provided ID
        const recipeDoc = await db.collection(weatherCondition).doc(recipeId).get();
  
        if (!recipeDoc.exists) {
          return res.status(404).json({ error: 'Recipe not found' });
        }
  
        const recipe = recipeDoc.data();
        recipe.id = recipeDoc.id;  // Include the recipe ID in the response
  
        const responseData = { recipe };
        console.log('Server Response:', responseData);
        res.status(200).json(responseData);
      } catch (error) {
        console.error('Server Error:', error.message);
        res.status(500).json({ error: error.message });
      }
    });
  }
};

setupRoutes();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://192.168.1.100:${PORT}`);
});
