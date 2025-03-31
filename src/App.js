import React, { useState } from "react";
import axios from "axios";
import "./WeatherApp.css"; // Import CSS

const API_KEY = "9334f65eac03523d11970a00b1a5db7c";

const WeatherApp = () => {
  const [city, setCity] = useState(""), [weather, setWeather] = useState(null);

  const fetchWeather = async (e) => {
    e.preventDefault();
    if (!city) return;
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeather(data);
    } catch {
      alert("City not found!");
    }
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <form onSubmit={fetchWeather} className="weather-form">
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city" />
        <button>Get</button>
      </form>
      {weather && (
        <div className="weather-box">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p className="temp">{Math.round(weather.main.temp)}°C</p>
          <p>{weather.weather[0].main} | Feels: {Math.round(weather.main.feels_like)}°C</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
