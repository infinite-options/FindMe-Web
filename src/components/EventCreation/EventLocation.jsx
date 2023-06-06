import React, { Component, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Grid, Typography, Button, TextField } from "@mui/material";
import Searchbox from './Searchbox';
import MapComponent from './MapComponent';

export default function EventLocation() {
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
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: "5%" }}>
            <Grid
            container
            direction="column"
            margin={1}
            style={{ height: "80rem" , width: "80rem" }}
            alignItems="center"
            justify="center"
            >
                <Typography variant="h5" sx={{mt: 2}}> Create </Typography>
                Event Location
                <Searchbox
                    latLongHandler={latLongHandler}
                    addressHandler={addressHandler}
                ></Searchbox>
                <MapComponent
                    latitude={lat}
                    longitude={long}
                ></MapComponent >
                <Button onClick={() => {
                    saveEventObject()
                    if(location.state && location.state.edit){
                        navigate(-1);
                    }
                    else{
                        navigate('/eventTitle');
                    }
                }}> Next</Button>

            </Grid>
        </div>
        </>
    )
}