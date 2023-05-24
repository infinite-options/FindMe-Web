import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, Button } from "@mui/material";

export default function EventCreationConfirmation() {
    const navigate = useNavigate();
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
                <Typography variant="h5" sx={{mt: 2}}> Confirmation </Typography>
                <Typography sx={{mt: 2}}> Registration Code : </Typography>
                <Typography sx={{mt: 2}}> QR Code : </Typography>
                <footer> Confirmation sent to 'email/mobile' </footer>
            </Grid>
        </div>
        </>
    )
}