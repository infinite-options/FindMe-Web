import React, { Component, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Grid, Typography, Button } from "@mui/material";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function EventParticulars() {
    const navigate = useNavigate();
    const retrievedEventObject = localStorage.getItem('event') === null ? {} : JSON.parse(localStorage.getItem('event'));
    
    const today = dayjs();
    const tomorrow = dayjs().add(1, 'day');
    const todayAtMidnight = dayjs().set('hour', 0).startOf('hour');

    const [selectedStartDate, setSelectedStartDate] = useState(today);
    const [selectedEndDate, setSelectedEndDate] = useState(today);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const [startDateTime, setStartDateTime] = useState('');
    const [endDateTime, setEndDateTime] = useState('');
    const [end_Time, setEnd_Time] = useState('');

    const saveEventObject = () => {
        console.log("** ", retrievedEventObject)
        retrievedEventObject['eventStartDate'] = new Date(selectedStartDate).toLocaleDateString("en-US");
        retrievedEventObject['eventEndDate'] = new Date(selectedEndDate).toLocaleDateString("en-US");
        retrievedEventObject['eventStartTime'] = new Date(startTime).toLocaleTimeString("en-US");;
        retrievedEventObject['eventEndTime'] = new Date(endTime).toLocaleTimeString("en-US");;
        localStorage.setItem('event', JSON.stringify(retrievedEventObject));
        console.log("66 ",retrievedEventObject)
    }

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
                <Typography variant="h4" sx={{mt: 2}}> {retrievedEventObject.eventType} </Typography>
                <Typography variant="poster" sx={{mt: 2}}> Event Particulars </Typography>
                                
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker', 'TimePicker']}>
                     <Grid
                    container
                    direction="column">
                    <Typography variant="poster" sx={{mt: 2}}> Select Event Date </Typography>

                    <DatePicker 
                    sx={{mt: 2}}
                    label="Event Start Date" 
                    value={selectedStartDate}
                    // defaultValue={today}
                    minDate={today}
                    onChange={(newDate) => 
                    {
                        setSelectedStartDate(newDate);
                        if (selectedEndDate < newDate)
                        { setSelectedEndDate(newDate); }
                        // let start_Date = new Date(selectedStartDate).toLocaleDateString("en-US");
                        // let start_Time = new Date(startTime).toLocaleTimeString("en-US");
                        // let startDateTime = new Date(start_Date + ' ' + start_Time)
                        // setStartDateTime(new Date(start_Date + ' ' + start_Time))
                        // if (endDateTime < startDateTime) {
                        //     let day_after_startDate = dayjs(selectedStartDate).add(1, 'day')
                        //     setSelectedEndDate(day_after_startDate);
                        //     setEndDateTime(new Date(day_after_startDate + ' ' + end_Time))
                        // }

                    }}
                    />
                    <DatePicker
                    sx={{mt: 2}}
                    label="Event End Date" 
                    value={selectedEndDate}
                    // defaultValue={today}
                    minDate={selectedStartDate}
                    onChange={(newDate) => {
                        setSelectedEndDate(newDate)

                        // let end_Date = new Date(newDate).toLocaleDateString("en-US");
                        // let end_Time = new Date(endTime).toLocaleTimeString("en-US");
                        // let endDateTime = new Date(end_Date + ' ' + end_Time)
                        // if (endDateTime < startDateTime) {
                        //     let day_after_startDate = dayjs(selectedStartDate).add(1, 'day')
                        //     setSelectedEndDate(day_after_startDate);
                        //     setEnd_Time(end_Time)
                        //     setEndDateTime(new Date(day_after_startDate + ' ' + end_Time))
                        // }
                        // else {
                        //     setSelectedEndDate(newDate)
                        // }
                    }}
                    />
                    </Grid>
                    
                    <Grid
                    container
                    direction="column">
                    <Typography variant="poster" sx={{mt: 2}}> Select Event Timings </Typography>

                    <TimePicker
                    sx={{mt: 2}}
                    label="Enter Event Start Time"
                    value={startTime}
                    onChange={(newStartTime) => { 
                        setStartTime(newStartTime);
                        // let start_Date = new Date(selectedStartDate).toLocaleDateString("en-US");
                        // let start_Time = new Date(newStartTime).toLocaleTimeString("en-US");
                        // let startDateTime = new Date(start_Date + ' ' + start_Time)
                        // setStartDateTime(new Date(start_Date + ' ' + start_Time))
                        // if (endDateTime < startDateTime) {
                        //     let day_after_startDate = dayjs(selectedStartDate).add(1, 'day')
                        //     setSelectedEndDate(day_after_startDate);
                        //     setEndDateTime(new Date(day_after_startDate + ' ' + end_Time))
                        // }
                    }}
                    />
                    <TimePicker
                    sx={{mt: 2}}
                    label="Enter Event End Time"
                    value={endTime}
                    onChange={(newEndTime) => 
                    {
                        setEndTime(newEndTime)
                        if (newEndTime < startTime && selectedStartDate === selectedEndDate)
                        { setSelectedEndDate(dayjs(selectedStartDate).add(1, 'day')); }
                        // let end_Date = new Date(selectedEndDate).toLocaleDateString("en-US");
                        // let end_Time = new Date(newEndTime).toLocaleTimeString("en-US");
                        // let endDateTime = new Date(end_Date + ' ' + end_Time)
                        // if (endDateTime < startDateTime) {
                        //     let day_after_startDate = dayjs(selectedStartDate).add(1, 'day')
                        //     setSelectedEndDate(day_after_startDate);
                        //     setEnd_Time(end_Time)
                        //     setEndDateTime(new Date(day_after_startDate + ' ' + end_Time))
                        // }
                    }}
                    />
                    </Grid>
                </DemoContainer>
                </LocalizationProvider>
                    <Button onClick={() => { navigate('/eventLocation'); saveEventObject() }}> Next</Button>
            </Grid>
        </div>
        </>
    )
}