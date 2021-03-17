import React from 'react';
import { Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography, TextField } from '@material-ui/core';
import SunnyImg from '../../images/sunny.jpg';
import RainyImg from '../../images/rainy.jpg';
import CloudyImg from '../../images/cloudy.jpg';
import SnowImg from '../../images/snowy.jpg';
import FireImg from '../../images/fire.png';

const IndividualCard = ({dayData}) => {
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
                    <Typography>
                        Loop here for hourly temps
                    </Typography>
                    <Typography>
                        {dayData.temp.max}
                    </Typography>
                </CardContent>
                </CardActionArea>
            </Card>
        </>
    )
}

export default IndividualCard;