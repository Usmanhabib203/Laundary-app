import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useEffect } from 'react';
const { width, height } = Dimensions.get('window');

const WeatherApp = () => {
  const [cityName, setCityName] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('metric');

  useEffect(() => {
    fetchWeather();
  }, [unit]); // Re-fetch weather data when unit changes

  const fetchWeather = async () => {
    const apiKey = '50f40e26c28bbf98c8ffa6f8685b7313';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unit}`;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      setWeatherData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
      setError('Failed to fetch weather data. Please try again.');
      setLoading(false);
    }
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={cityName}
        onChangeText={setCityName}
      />
      <Button title="Get Weather" onPress={fetchWeather} />
      {loading && <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />}
      {error && <Text style={styles.error}>{error}</Text>}
      {weatherData && (
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherText}>City: {weatherData.name}</Text>
          <Text style={styles.weatherText}>Temperature: {weatherData.main.temp}°{unit === 'metric' ? 'C' : 'F'}</Text>
          <Text style={styles.weatherText}>Description: {weatherData.weather[0].description}</Text>
          <Text style={styles.weatherText}>Humidity: {weatherData.main.humidity}%</Text>
          <Text style={styles.weatherText}>Wind Speed: {weatherData.wind.speed} m/s</Text>
          <Text style={styles.weatherText}>Pressure: {weatherData.main.pressure} hPa</Text>
          <Text style={styles.weatherText}>Visibility: {weatherData.visibility} meters</Text>
          <Text style={styles.weatherText}>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</Text>
          <Text style={styles.weatherText}>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</Text>
        </View>
      )}
      <TouchableOpacity onPress={toggleUnit} style={styles.unitButton}>
        <Text style={styles.unitButtonText}>Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 40,
    width: 250,
    borderColor: '#999',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  loader: {
    marginTop: 20,
  },
  error: {
    marginTop: 20,
    color: 'red',
  },
  weatherContainer: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 2,
  },
  weatherText: {
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
  },
  unitButton: {
    marginTop: 20,
    borderRadius: 30,
  },
  unitButtonText: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
});

export default WeatherApp;
