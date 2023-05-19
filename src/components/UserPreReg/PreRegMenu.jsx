import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, Button } from "@mui/material";

export default function PreRegMenu() {
    const navigate = useNavigate();
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
                <Typography variant="h5" sx={{mt: 2}}> Pre-registration </Typography>
                <Button variant="outlined" sx={{mt: 2}} style={{ width: "50rem" }} onClick={()=>navigate('/registrationCode')}> Enter Registration Code </Button>
                <Button variant="outlined" sx={{mt: 2}} style={{ width: "50rem" }}> Find Event by Date </Button>
                <Button variant="outlined" sx={{mt: 2}} style={{ width: "50rem" }}> Find Event by Organizer </Button>
                <Button variant="outlined" sx={{mt: 2}} style={{ width: "50rem" }}> See Event List </Button>
                <Button variant="outlined" sx={{mt: 2}} style={{ width: "50rem" }}> See Events in your location </Button>
            </Grid>
        </div>
        </>
    )
}