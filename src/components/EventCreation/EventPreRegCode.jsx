import React, { Component, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, Button } from "@mui/material";
import axios from "axios";

export default function EventPreRegCode() {
    const navigate = useNavigate();
    const getQRcodeLink = 'https://api.qrserver.com/v1/create-qr-code/?data=http://localhost:3000/preEventQuestionnaire&size=150x150';

    return (
        <>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: "5%" }}>
            <Grid
            container
            direction="column"
            margin={1}
            style={{ height: "30rem" , width: "80rem" }}
            alignItems="center"
            justify="center"
            border={1}
            >
                <Typography variant="h5" sx={{mt: 2}}> Pre-registration Code </Typography>
                <Typography sx={{mt: 2}}> Registration Code : </Typography>
                <Typography sx={{mt: 2}}> QR Code : </Typography>
                
                <img src={getQRcodeLink} alt="QR code unavailable" title="QR code" />

                <footer> Confirmation sent to 'email/mobile' </footer>
                <Button onClick={() => { navigate('/eventCheckInCode'); }}>Next</Button>

            </Grid>
        </div>
        </>
    )
}