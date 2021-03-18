import './App.css';
import React, { useState } from 'react'
import WeatherCard from './components/WeatherCard/WeatherCard';
import Header from './components/Header/Header';
import AskLocation from './components/AskLocation/AskLocation';
import axios from 'axios';


const App = () => {
  const [weatherData, setWeatherData] = useState({});
  const [showAskLocation, setShowAskLocation] = useState(true);
  const [currentTempType, setCurrentTempType] = useState('Fahrenheit');

  const getDataFromAskLocation = (city) => {
    console.log(city)
    let lat = city.data.results[0].geometry.lat;
    let long = city.data.results[0].geometry.lng;
    getWeatherData(lat, long)
      .then(weather => {
        console.log(weather)
        if (weather.status === 200) {
          // Kelvin to Fahrenheit: F = 9/5(K - 273) + 32
          weather.data.current.temp = convertToFahrenheit(weather.data.current.temp);
          weather.data.daily.forEach(day => {
            day.temp.day = convertToFahrenheit(day.temp.day);
            day.temp.eve = convertToFahrenheit(day.temp.eve);
            day.temp.max = convertToFahrenheit(day.temp.max);
            day.temp.min = convertToFahrenheit(day.temp.min);
            day.temp.morn = convertToFahrenheit(day.temp.morn);
            day.temp.night = convertToFahrenheit(day.temp.night);
            day.feels_like.day = convertToFahrenheit(day.feels_like.day);
            day.feels_like.eve = convertToFahrenheit(day.feels_like.eve);
            day.feels_like.morn = convertToFahrenheit(day.feels_like.morn);
            day.feels_like.night = convertToFahrenheit(day.feels_like.night);
          })
          console.log(weather.data)
          setWeatherData(weather.data);
          setShowAskLocation(false);
        } else {
          return;
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  const convertToFahrenheit = (Kelvin) => {
    let fahrenheit = (9/5 * (Kelvin - 273)) + 32;
    return Math.round(fahrenheit);
  }

  const tempButton = () => {
    if (currentTempType === 'Fahrenheit') {
      setCurrentTempType('Celsius')
    } else {
      setCurrentTempType('Fahrenheit')
    }
  }

  const getWeatherData = async (lat, long) => {
    let weather = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=17ddd591be9b48501a52fd56a9e33ce3`);
    return weather;
  }

  return (
    <>
      <Header changeTempType={tempButton} currentTempType={currentTempType} />
      {showAskLocation ? 
        <AskLocation  sendDataToApp={getDataFromAskLocation} />
      :
        <WeatherCard weatherData={weatherData} currentTempType={currentTempType} />
      }
      
      
    </>
  );
}

export default App;
