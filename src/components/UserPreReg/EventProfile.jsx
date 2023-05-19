import React, { Component } from 'react';
import { Grid, Button,Typography } from "@mui/material";
import { useNavigate, useLocation } from 'react-router-dom';

export default function EventProfile(props) {
    const location = useLocation()
    console.log("location", location)
    const proceedToRegister = () => {
        console.log("proceedToRegister")
    }
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
                <Typography variant="h5" sx={{mt: 2}}> Event Profile </Typography>

                event_title : {location.state.event.event_title} <br/>
                event_description :{location.state.event.event_description} <br/>
                event_organizer_uid :{location.state.event.event_organizer_uid} <br/>
                event_start_time :{location.state.event.event_start_time} <br/>
                event_end_time :{location.state.event.event_end_time} <br/>
                <Button variant="outlined" sx={{mt: 2}} onClick={() => proceedToRegister()}> Proceed </Button>

            </Grid>
        </div>
        </>
    )
}