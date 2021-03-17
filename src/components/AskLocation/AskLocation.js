import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AskLocation.css';
import { Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography, TextField } from '@material-ui/core';
import imageUrl from '../../images/location.jpg';

const AskLocation = ({sendDataToApp}) => {
    const [cityData, setCityData] = useState({})
    const [cityFound, setCityFound] = useState(false);
    const [cityInput, setCityInput] = useState('');

    const getLatLong = async (city) => {
        const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${city}&key=45facaa86dae4aa1931ec743bfe9b84e`);
        console.log(response)
        setCityData(response)
        return response;
    }

    const handleCityFound = (city) => {
        setCityInput('');
        getLatLong(city)
            .then(response => {
                console.log(response)
                if (response.data.status.code === 200) {
                    setCityFound(!cityFound);
                } else {
                    return;
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const onChanges = (event) => {
        setCityInput(event.target.value)
    }

    

    return (
        <>
            <Card className="root">
                <CardActionArea disableRipple disableTouchRipple>
                    <CardMedia className="media" image={imageUrl} title="Location Image" height="200px"/>
                    {!cityFound ? 
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Find Your City 
                            </Typography>
                            <Typography component="span" variant="body2" color="textSecondary" className="secondTypography">
                                <span className="searchMedia">
                                    <TextField type="text" placeholder="City" variant="outlined" onChange={(e) => onChanges(e)} />
                                </span>
                            </Typography>
                        </CardContent>
                    : 
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Is this your City?
                            </Typography>
                            <Typography component="span" variant="body2" color="textSecondary" className="secondTypography">
                                {cityData.data.results[0].formatted}
                            </Typography>
                        </CardContent>
                    }
                </CardActionArea>
                <CardActions>
                    {!cityFound ? 
                        <Button variant="contained" color="primary" onClick={() => handleCityFound(cityInput)}>Search</Button>
                    :
                        <div className="buttonSeperator">
                            <Button variant="contained" color="primary" onClick={() => sendDataToApp(cityData)}>Yes</Button>
                            <Button variant="contained" color="secondary" onClick={() => setCityFound('')}>No</Button> 
                        </div>
                    }
                </CardActions>
            </Card>
        </>
    )
}

export default AskLocation;