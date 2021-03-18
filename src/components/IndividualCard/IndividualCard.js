import React from 'react';
import './IndividualCard.css';
import { Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography, TextField } from '@material-ui/core';
import Marble from '../../images/marble.jpg'

const IndividualCard = ({dayData, backClick, currentTempType}) => {
    return (
        <>
            <Card className="ind-card">
                <CardActionArea>
                <CardMedia className="media" image={Marble} />
                <CardContent>
                    <Typography component="h3" variant="h5">
                        Temperatures throughout {new Date(dayData.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' })}
                    </Typography>
                    <Typography component="div">
                        <p>Day: {dayData.feels_like.day} {currentTempType === 'Fahrenheit' ? '\u00B0C' : '\u00B0F'}</p>
                        <p>Evening: {dayData.feels_like.eve} {currentTempType === 'Fahrenheit' ? '\u00B0C' : '\u00B0F'}</p>
                        <p>Morning: {dayData.feels_like.morn} {currentTempType === 'Fahrenheit' ? '\u00B0C' : '\u00B0F'}</p>
                        <p>Night: {dayData.feels_like.night} {currentTempType === 'Fahrenheit' ? '\u00B0C' : '\u00B0F'}</p>
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