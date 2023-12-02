import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const WeatherContainer = () => {
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = '4c1b8630272cf28179e61ddcf4be5c6c'; // Replace with your actual API key
  const latitude = '14.5995';
  const longitude = '120.9842';

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${latitude},${longitude}`)
      .then((response) => {
        const data = response.data;
        setWeatherData(data);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error.response || error.message || error);
        setWeatherData(null); // Set weatherData to null in case of an error
      });
  }, []);

  const isCloudy = weatherData && weatherData.current.weather_descriptions.includes('cloudy');

  return (
    <View style={styles.container}>
      {weatherData ? (
        <View style={[styles.weatherInfo, isCloudy ? styles.cloudyWeather : null]}>
          <Text style={styles.location}>Location: {weatherData.location.name}</Text>
          <Text style={styles.temperature}>Temperature: {weatherData.current.temperature} °C</Text>
          <Text style={styles.weatherCondition}>
            Weather Condition: {weatherData.current.weather_descriptions[0]}
          </Text>
          {/* You can display more weather data here */}
        </View>
      ) : (
        <Text>Error loading weather data or no data available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherInfo: {
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 20,
    borderRadius: 10,
  },
  location: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  temperature: {
    fontSize: 16,
  },
  weatherCondition: {
    fontSize: 16,
  },
  cloudyWeather: {
    backgroundColor: 'lightgray',
    borderWidth: 1,
    borderColor: 'gray',
  },
});

export default WeatherContainer;
