import React, { useState, useEffect } from 'react';
import './WeatherCard.css';
import IndividualCard from '../IndividualCard/IndividualCard';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import SunnyImg from '../../images/sunny.jpg';
import RainyImg from '../../images/rainy.jpg';
import CloudyImg from '../../images/cloudy.jpg';
import SnowImg from '../../images/snowy.jpg';
import FireImg from '../../images/fire.png';
import Dusk from '../../images/dusk.jpg';

const WeatherCard = ({weatherData, currentTempType}) => {
    const [isCardClicked, setIsCardClicked] = useState(false);
    const [acquiredWeatherData, setAcquiredWeatherData] = useState(weatherData);
    const [dataForIndividualCard, setDataForIndividualCard] = useState({});

    const initialChangeTemp = () => {
        let configuredWeatherData = {...acquiredWeatherData}
        if (currentTempType === 'Fahrenheit') {
            console.log(configuredWeatherData.current);
            configuredWeatherData.current.temp = fahrenheitToCelsius(configuredWeatherData.current.temp);
            configuredWeatherData.daily.forEach(day => {
                day.temp.day = fahrenheitToCelsius(day.temp.day);
                day.temp.eve = fahrenheitToCelsius(day.temp.eve);
                day.temp.max = fahrenheitToCelsius(day.temp.max);
                day.temp.min = fahrenheitToCelsius(day.temp.min);
                day.temp.morn = fahrenheitToCelsius(day.temp.morn);
                day.temp.night = fahrenheitToCelsius(day.temp.night);
                day.feels_like.day = fahrenheitToCelsius(day.feels_like.day);
                day.feels_like.eve = fahrenheitToCelsius(day.feels_like.eve);
                day.feels_like.morn = fahrenheitToCelsius(day.feels_like.morn);
                day.feels_like.night = fahrenheitToCelsius(day.feels_like.night);
            })
            setAcquiredWeatherData(configuredWeatherData)
        } else {
            configuredWeatherData.current.temp = celsiusToFahrenheit(configuredWeatherData.current.temp);
            configuredWeatherData.daily.forEach(day => {
                day.temp.day = celsiusToFahrenheit(day.temp.day);
                day.temp.eve = celsiusToFahrenheit(day.temp.eve);
                day.temp.max = celsiusToFahrenheit(day.temp.max);
                day.temp.min = celsiusToFahrenheit(day.temp.min);
                day.temp.morn = celsiusToFahrenheit(day.temp.morn);
                day.temp.night = celsiusToFahrenheit(day.temp.night);
                day.feels_like.day = celsiusToFahrenheit(day.feels_like.day);
                day.feels_like.eve = celsiusToFahrenheit(day.feels_like.eve);
                day.feels_like.morn = celsiusToFahrenheit(day.feels_like.morn);
                day.feels_like.night = celsiusToFahrenheit(day.feels_like.night);
            })
            setAcquiredWeatherData(configuredWeatherData)
        }
    }

    const celsiusToFahrenheit = (celsius) => {
        let cel = (celsius * 9/5) + 32;
        return Math.round(cel);
    }

    const fahrenheitToCelsius = (fahrenheit) => {
        let fah = (fahrenheit - 32) * 5/9
        return Math.round(fah);
    };

    const handleCardClick = (day) => {
        setDataForIndividualCard(day);
        setIsCardClicked(true);
    }

    const handleBackClick = () => {
        setIsCardClicked(false);
    }

    useEffect(() => {
        initialChangeTemp();
        // eslint-disable-next-line
    }, [currentTempType])

    return (
        <>
        <div className="current-main">
            <Card className="root-current-card">
                <CardActionArea>
                    <CardMedia className="media" image={Dusk} />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Today
                        </Typography>
                        <Typography component="div">
                            <p>Current Temp: {acquiredWeatherData.current.temp} {currentTempType === 'Fahrenheit' ? '\u00B0C' : '\u00B0F'}</p>
                        </Typography>
                        </CardContent>
                </CardActionArea>
            </Card>
        </div>
        {!isCardClicked ?
        <div className="main-weatherCard">
        {acquiredWeatherData.daily.map(day => {
                return (
                    <Card className="root-weatherCard" key={day.dt} onClick={() => handleCardClick(day)}>
                        <CardActionArea>
                            <CardMedia className="media" 
                                       image={
                                           day.weather[0].main === 'Clear' ? SunnyImg : 
                                           day.weather[0].main === 'Rain' ? RainyImg : 
                                           day.weather[0].main === 'Clouds' ? CloudyImg :
                                           day.weather[0].main === 'Snow' ? SnowImg : 
                                           FireImg} />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' })}
                                </Typography>
                                <Typography component="div">
                                    <p>High: {day.temp.max} {currentTempType === 'Fahrenheit' ? '\u00B0C' : '\u00B0F'}</p>
                                    <p>Low: {day.temp.min} {currentTempType === 'Fahrenheit' ? '\u00B0C' : '\u00B0F'}</p>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                )
            })}
        </div> 
        :
        <IndividualCard dayData={dataForIndividualCard} backClick={handleBackClick} currentTempType={currentTempType} />
        }
        </>
    )
}

export default WeatherCard