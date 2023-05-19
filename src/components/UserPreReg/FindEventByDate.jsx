import React, { Component, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography } from "@mui/material";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function FindEventByDate() {
    const [selectedDate, setSelectedDate] = useState('');
    console.log("selectedDate", selectedDate)
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
                <DatePicker 
                label="Enter Event Date" 
                value={selectedDate}
                onChange={(newDate) => setSelectedDate(newDate)}
                />
            </DemoContainer>
            </LocalizationProvider>

            </Grid>
        </div>
        </>
    )
}