import React from 'react';
import { Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography, TextField } from '@material-ui/core';
import SunnyImg from '../../images/sunny.jpg';
import RainyImg from '../../images/rainy.jpg';
import CloudyImg from '../../images/cloudy.jpg';
import SnowImg from '../../images/snowy.jpg';
import FireImg from '../../images/fire.png';

const IndividualCard = ({dayData, backClick}) => {
    return (
        <>
            <Card>
                <CardActionArea>
                <CardMedia className="media" 
                                       image={
                                        dayData.weather[0].main === 'Clear' ? SunnyImg : 
                                        dayData.weather[0].main === 'Rain' ? RainyImg : 
                                        dayData.weather[0].main === 'Clouds' ? CloudyImg :
                                        dayData.weather[0].main === 'Snow' ? SnowImg : 
                                        FireImg} 
                />
                <CardContent>
                    <Typography component="h3" variant="h5">
                        Temperatures throughout the day
                    </Typography>
                    <Typography>
                        <p>Day: {dayData.feels_like.day}</p>
                        <p>Evening: {dayData.feels_like.eve}</p>
                        <p>Morning: {dayData.feels_like.morn}</p>
                        <p>Night: {dayData.feels_like.night}</p>
                    </Typography>
                </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button variant="contained" color="primary" onClick={backClick}>Back</Button>
                </CardActions>
            </Card>
        </>
    )
}

export default IndividualCard;