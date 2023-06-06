import React, { Component, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Grid, Typography, Button } from "@mui/material";
import QRCode from '../QRCode/QRCode';
import axios from "axios";

const APP_URL = process.env.REACT_APP_CLIENT_BASE_URI;

export default function EventPreRegCode() {
    const navigate = useNavigate();
    const retrievedEventObject = localStorage.getItem("event") === null ? {} : JSON.parse(localStorage.getItem("event"));
    const link_path = APP_URL + "/preregistration-event/" + retrievedEventObject.eventRegistrationCode;
    
    return (
        <>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: "5%" }}>
            <Grid
            container
            direction="column"
            style={{ height: "30rem" , width: "80rem" }}
            alignItems="center"
            justify="center"
            >
                <Typography variant="h5" sx={{mt: 2}}> Registration Code </Typography>
                <Typography sx={{mt: 2}}> Registration Code : 
                    <Link to={link_path}>
                        {retrievedEventObject.eventRegistrationCode}
                    </Link>
                </Typography>
                <Typography sx={{mt: 2}}> QR Code : </Typography>
                
                <QRCode 
                    route = {"/preregistration-event/"}
                    event_registration_code = {retrievedEventObject.eventRegistrationCode}
                ></QRCode>
                <footer> Confirmation sent to 'email/mobile' </footer>

                <Button onClick={() => { navigate('/eventCheckInCode'); }}>Next</Button>

            </Grid>
        </div>
        </>
    )
}