import React, { Component, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Grid, Typography, Button, Box, Stack } from "@mui/material";
import QRCode from '../QRCode/QRCode';
import useStyles from '../../theming/styles';
import axios from "axios";

const APP_URL = process.env.REACT_APP_CLIENT_BASE_URI;

export default function EventPreRegCode() {
    const classes = useStyles();
    const navigate = useNavigate();
    const retrievedEventObject = localStorage.getItem("event") === null ? {} : JSON.parse(localStorage.getItem("event"));
    const link_path = "/preregistration-event/" + retrievedEventObject.eventRegistrationCode;

    return (
        <>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Stack 
          direction="row"
          justifyContent="flex-start"
        >
        <Typography variant="h2" className={classes.whiteText}>
            edit
        </Typography>
        </Stack>

        <Stack
          direction="row"
          justifyContent="flex-start"
          sx={{ mt : 5}}
        >
          <Typography variant="h4" className={classes.whiteText}>
            Registration Code
          </Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          sx={{ mt : 5}}
        >
          <Typography 
          variant="h4" 
          className={classes.whiteText}
          onClick={()=>{navigate(link_path);}}
          >
            {retrievedEventObject.eventRegistrationCode}
          </Typography>
        </Stack> 
        <Stack
          direction="row"
          justifyContent="center"
          sx={{ mt : 5}}
        >
            <QRCode 
                route = {"/preregistration-event/"}
                event_registration_code = {retrievedEventObject.eventRegistrationCode}
            ></QRCode>
        </Stack>        
        <Stack
          direction="row"
          justifyContent="center"
          sx={{ mt:5 }}
        >
            <Button 
            className={classes.button}
            onClick={() => { }}>
                Send Email
            </Button>
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          sx={{ mt:2}}
        >
            <Button 
            className={classes.button}
            onClick={() => { navigate(-1); }}>
                Back
            </Button>
        </Stack>
        </Box>
        </>
    )
}