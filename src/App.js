import './App.css';
import React, { useState } from 'react'
import WeatherCard from './components/WeatherCard/WeatherCard';
import Header from './components/Header/Header';
import AskLocation from './components/AskLocation/AskLocation';
import axios from 'axios';


const App = () => {
  const [weatherData, setWeatherData] = useState({});
  const [showAskLocation, setShowAskLocation] = useState(true);

  const getDataFromAskLocation = (city) => {
    console.log(city)
    let lat = city.data.results[0].geometry.lat;
    let long = city.data.results[0].geometry.lng
    getWeatherData(lat, long)
      .then(weather => {
        console.log(weather)
        if (weather.status === 200) {
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

  const getWeatherData = async (lat, long) => {
    let weather = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=17ddd591be9b48501a52fd56a9e33ce3`);
    return weather;
  }

  return (
    <>
      <Header />
      {showAskLocation ? 
        <AskLocation  sendDataToApp={getDataFromAskLocation} />
      :
        <WeatherCard weatherData={weatherData} />
      }
      
      
    </>
  );
}

export default App;
