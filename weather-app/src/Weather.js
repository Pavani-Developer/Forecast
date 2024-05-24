import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showClouds, setShowClouds] = useState(false);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setShowClouds(true); // Show clouds when fetching data starts
      const API_KEY = 'c328c3b3441999ca91d33c518ba2011f';
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
      setError('');
    } catch (error) {
      setError('City not found.');
      setWeatherData(null);
    } finally {
      setLoading(false);
      setTimeout(() => setShowClouds(false), 6000); // Hide clouds after 6 seconds
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearchClick = () => {
    fetchWeatherData();
  };

  return (
    <div id="weather-app">
      <div className="weather-container">
        <h1>Weather App</h1>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={handleInputChange}
        />
        <button onClick={handleSearchClick}>Search</button>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {showClouds && (
          <>
            <div className="cloud-emoji" style={{ left: '10%', fontSize: '32px', animation: 'fall-top 5s linear infinite' }}>
              ☁️
            </div>
            <div className="cloud-emoji" style={{ left: '30%', fontSize: '24px', animation: 'fall-bottom 7s linear infinite' }}>
              🎉☁️
            </div>
            <div className="cloud-emoji" style={{ left: '50%', fontSize: '36px', animation: 'fall-top 9s linear infinite' }}>
              ☁️🎊
            </div>
            <div className="cloud-emoji" style={{ left: '70%', fontSize: '28px', animation: 'fall-bottom 8s linear infinite' }}>
              ☁️
            </div>
            <div className="cloud-emoji" style={{ left: '90%', fontSize: '32px', animation: 'fall-top 11s linear infinite' }}>
            🌼☁️
            </div>
            <div className="cloud-emoji" style={{ left: '20%', fontSize: '38px', animation: 'fall-top 12s linear infinite' }}>
              ☁️
            </div>
            <div className="cloud-emoji" style={{ left: '40%', fontSize: '40px', animation: 'fall-bottom 15s linear infinite' }}>
            🌸☁️
            </div>
            <div className="cloud-emoji" style={{ left: '60%', fontSize: '42px', animation: 'fall-top 17s linear infinite' }}>
              ☁️
            </div>
            <div className="cloud-emoji" style={{ left: '80%', fontSize: '48px', animation: 'fall-bottom 19s linear infinite' }}>
              ☁️
            </div>
          </>
        )}
        {weatherData && (
          <div className="weather-info">
            <h2>{weatherData.name}</h2>
            <p>Temperature: {weatherData.main.temp} °C</p>
            <p>Weather: {weatherData.weather[0].description}</p>
            <p>Humidity: {weatherData.main.humidity} %</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
