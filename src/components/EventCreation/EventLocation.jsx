import React, { Component, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Grid, Typography, Button, TextField, Box, Stack } from "@mui/material";
import Searchbox from './Searchbox';
import MapComponent from './MapComponent';
import useStyles from '../../theming/styles';

export default function EventLocation() {
    const classes = useStyles();
    const navigate = useNavigate();
    const location = useLocation();
    const retrievedEventObject = localStorage.getItem('event') === null ? {} : JSON.parse(localStorage.getItem('event'));
    const [lat, setLat] = useState(37.236720);
    const [long, setLong] = useState(-121.887370);
    const [address, setAddress] = useState('');
    const [zipcode, setZipcode] = useState('');

    const latLongHandler = (lat, long) => {
        setLat(lat)
        setLong(long)
    }
    const addressHandler = (address, zipcode) => {
        setAddress(address)
        setZipcode(zipcode)
    }
    const saveEventObject = () => {
        retrievedEventObject['eventLocation'] = address;
        retrievedEventObject['eventZip'] = zipcode;
        localStorage.setItem('event', JSON.stringify(retrievedEventObject));
        console.log("retrievedEventObject - ", retrievedEventObject)
    }
    return (
        <>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Stack 
          direction="row"
          justifyContent="flex-start"
        >
        <Typography variant="h2" className={classes.whiteText}>
            create
        </Typography>
        </Stack>
        <Stack 
          direction="row"
          justifyContent="flex-start"
        >
        <Typography variant="h4" className={classes.whiteText}>
            Event Location
        </Typography>
        </Stack>
        <Stack 
          direction="row"
          justifyContent="flex-start"
        >
        <Grid
        container
        direction="column"
        margin={1}
        style={{ height: "80rem" , width: "80rem" }}
        alignItems="center"
        justify="center"
        >
            <Searchbox
                latLongHandler={latLongHandler}
                addressHandler={addressHandler}
            ></Searchbox>
            <MapComponent
                latitude={lat}
                longitude={long}
            ></MapComponent >
            <Stack 
            direction="row"
            justifyContent="flex-start"
            sx={{mt:2}}
            >
                <Button
                className={classes.button}
                onClick={() => {
                    saveEventObject()
                    if(location.state && location.state.edit){
                        navigate(-1);
                    }
                    else{
                        navigate('/eventTitle');
                    }
                }}> Next</Button>
            </Stack>
        </Grid>
        </Stack>
        </Box>
        </>
    )
}