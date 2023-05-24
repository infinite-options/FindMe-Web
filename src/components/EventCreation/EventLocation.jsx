import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, Button } from "@mui/material";

export default function EventLocation() {
    const navigate = useNavigate();
    const retrievedEventObject = localStorage.getItem('event') === null ? {} : JSON.parse(localStorage.getItem('event'));

    return (
        <>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: "5%" }}>
            <Grid
            container
            direction="column"
            margin={1}
            style={{ height: "20rem" , width: "80rem" }}
            alignItems="center"
            justify="center"
            border={1}
            >
                <Typography variant="h5" sx={{mt: 2}}> {retrievedEventObject.eventType} </Typography>
                EventLocation
                <Button onClick={() => { navigate('/eventTitle'); }}> Next</Button>

                </Grid>
        </div>
        </>
    )
}