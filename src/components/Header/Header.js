import React from 'react';
import './Header.css';

import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';

const Header = ({changeTempType, currentTempType}) => {
    
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className="title">
                        <span className="weather-span" onClick={() => window.location.reload()}>Weather</span>
                    </Typography>
                    <Button className="button" onClick={changeTempType}>
                        <span>{currentTempType === 'Fahrenheit' ? 'To Fahrenheit' : 'To Celsius'}</span>
                    </Button>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header