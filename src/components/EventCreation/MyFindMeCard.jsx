import React, { Component } from 'react';
import { Button, Grid, TextField, Typography } from "@mui/material";


export default function MyFindMeCard() {
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
                <Typography variant="h5" sx={{mt: 2}}> My FindMe Card </Typography>

            </Grid>
        </div>
        </>
    )
}