import React, { Component, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, Button } from "@mui/material";
import axios from "axios";
import QRCode from '../QRCode/QRCode';

export default function EventCheckInCode() {
    const navigate = useNavigate();
    const getQRcodeLink = 'https://api.qrserver.com/v1/create-qr-code/?data=http://localhost:3000/preEventQuestionnaire&size=150x150';
    const retrievedEventObject =
    localStorage.getItem("event") === null
      ? {}
      : JSON.parse(localStorage.getItem("event"));
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
                <Typography variant="h5" sx={{mt: 2}}> Check-in Code </Typography>
                <Typography sx={{mt: 2}}> Check-in Code : {retrievedEventObject.eventCheckinCode}</Typography>
                <Typography sx={{mt: 2}}> QR Code : </Typography>
                <QRCode></QRCode>

                {/* <img src={getQRcodeLink} alt="QR code unavailable" title="QR code" />

                <footer> Confirmation sent to 'email/mobile' </footer> */}
                <Button onClick={() => { navigate('/seeEventsList'); }}>See Events</Button>
                <Button onClick={() => { navigate('/eventDetails'); }}>Event Details</Button>

            </Grid>
        </div>
        </>
    )
}