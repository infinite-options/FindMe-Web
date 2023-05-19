import React, { Component } from 'react';
import { Grid } from "@mui/material";

export default function PageOutlineTemplate() {
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
            </Grid>
        </div>
        </>
    )
}