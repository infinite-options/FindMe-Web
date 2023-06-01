import React, { Component } from 'react';
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


export default function EmailBroadcastMessage() {
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
                <Typography variant="h5" sx={{mt: 2}}> Broadcast Message </Typography>
                <Typography sx={{ mt: 2 }}> What Do you want to say? </Typography>
                <TextField
                multiline>
                    
                </TextField>
                <Button>Send</Button>
                <Button onClick={() => navigate("/eventDetails")}>Event Details</Button>
                <Button onClick={() => navigate(-1)}>Back</Button>

            </Grid>
        </div>
        </>
    )
}