import React, { useState } from 'react';
import './WeatherCard.css';
import IndividualCard from '../IndividualCard/IndividualCard';
import { Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography, TextField } from '@material-ui/core';
import SunnyImg from '../../images/sunny.jpg';
import RainyImg from '../../images/rainy.jpg';
import CloudyImg from '../../images/cloudy.jpg';
import SnowImg from '../../images/snowy.jpg';
import FireImg from '../../images/fire.png';

const WeatherCard = ({weatherData}) => {
    const [isCardClicked, setIsCardClicked] = useState(false);
    const [acquiredWeatherData, setAcquiredWeatherData] = useState(weatherData);
    const [dataForIndividualCard, setDataForIndividualCard] = useState({});

    // let data = weatherData.daily.forEach(day => {
    //     let weekday = new Date(day.dt).toLocaleDateString('en-US', { weekday: 'long' });
    //     Object.assign(day.dt, weekday)
    // })
    // console.log(data)
    // setAcquiredWeatherData(data)

    const handleCardClick = (day) => {
        setDataForIndividualCard(day);
        setIsCardClicked(true);
    }

    const handleBackClick = () => {
        setIsCardClicked(false);
    }

    return (
        <>
        <Button color="primary" variant="contained">View Todays</Button>
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
                                    <p>{day.temp.max}</p>
                                    <p>{day.temp.min}</p>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                )
            })}
        </div> 
        :
        <IndividualCard dayData={dataForIndividualCard} backClick={handleBackClick} />
        }
        </>
    )
}

export default WeatherCard