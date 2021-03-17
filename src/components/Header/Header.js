import React from 'react';
import './Header.css';

import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';

const Header = () => {
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className="title">
                        <span>Weather</span>
                    </Typography>
                    <Button className="button">
                        <span>Celsius</span>
                    </Button>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header