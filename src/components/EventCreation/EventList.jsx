import React, { Component, useEffect, useState } from 'react';
import { Grid, Typography, Button, TextField } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function EventList() {
    const navigate = useNavigate();
    const [eventList, setEventList] = useState('');

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