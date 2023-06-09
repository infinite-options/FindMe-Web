import React, { Component, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Grid, Typography, Button, Box, Stack } from "@mui/material";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import useStyles from '../../theming/styles';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function EventParticulars() {
    const classes = useStyles();
    const navigate = useNavigate();
    const location = useLocation();
    const [showAddTime, setShowAddTime] = useState(false);
    const retrievedEventObject = localStorage.getItem('event') === null ? {} : JSON.parse(localStorage.getItem('event'));
    
    const today = dayjs();
    const tomorrow = dayjs().add(1, 'day');
    const todayAtMidnight = dayjs().set('hour', 0).startOf('hour');

    const [selectedStartDate, setSelectedStartDate] = useState(today);
    const [selectedEndDate, setSelectedEndDate] = useState(today);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const saveEventObject = () => {
        if (startTime === '' || endTime === '') {
            setShowAddTime(true);
        }
        else {
            console.log("retrievedEventObject - ", retrievedEventObject)
            retrievedEventObject['eventStartDate'] = new Date(selectedStartDate).toLocaleDateString("en-US");
            retrievedEventObject['eventEndDate'] = new Date(selectedEndDate).toLocaleDateString("en-US");
            let start_time = new Date(startTime).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
            retrievedEventObject['eventStartTime'] = start_time ? start_time.replace(/^0+/, '') : '';
            let end_time = new Date(endTime).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
            retrievedEventObject['eventEndTime'] = end_time ? end_time.replace(/^0+/, '') : '';
            localStorage.setItem('event', JSON.stringify(retrievedEventObject));
            console.log("retrievedEventObject - ", retrievedEventObject)

            if(location.state && location.state.edit){
                navigate(-1);
            }
            else{
                navigate('/eventLocation');
            }
        }
    }

    const DialogAddTime = () => {
    return (
      <Dialog
        open={showAddTime}
        // onClose={onCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            padding: "2rem",
          }}
        >
          Enter Event Time
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              setShowAddTime(false);
            }}
          >
            Okay
          </Button>
        </DialogActions>
        </Dialog>
        )
    }
    
    return (
        <>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Stack 
          direction="row"
          justifyContent="flex-start"
        >
        <Typography variant="h2" className={classes.whiteText}>
            create
        </Typography>
        </Stack>
        <Stack 
          direction="row"
          justifyContent="flex-start"
          sx={{ mt: 5 }}
        >
        <Typography variant="h4" className={classes.whiteText}>
            Event Date & Time
        </Typography>
        </Stack>
       
        <Stack 
        direction="row"
        justifyContent="flex-start"
        sx={{ mt: 5 }}
        alignItems="center"
        >
            <Typography variant="h5" className={classes.whiteText}> Start Date </Typography>
        </Stack>
        <Stack 
        direction="row"
        justifyContent="center"
        sx={{ mt: 2 }}
        alignItems="center"
        >
            {DialogAddTime()}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'TimePicker']}>
            <DatePicker 
                className={classes.textfield}
                // sx={{mt: 2, backgroundColor:"white", borderRadius: "30px"}}
                // label="Event Start Date" 
                value={selectedStartDate}
                // defaultValue={today}
                minDate={today}
                onChange={(newDate) => 
                {
                    setSelectedStartDate(newDate);
                    if (selectedEndDate < newDate)
                    { setSelectedEndDate(newDate); }
                }}
            />
            </DemoContainer>
            </LocalizationProvider>
        </Stack>
        
        <Stack 
        direction="row"
        justifyContent="flex-start"
        sx={{ mt: 2 }}
        alignItems="center"
        >
            <Typography variant="h5" className={classes.whiteText}> End Date </Typography>
        </Stack>
        <Stack 
        direction="row"
        // spacing={1}
        justifyContent="center"
        sx={{ mt: 2 }}
        alignItems="center"
        >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'TimePicker']}>
            <DatePicker
                className={classes.textfield}
                // sx={{mt: 2, backgroundColor:"white", borderRadius: "30px"}}
                // label="Event End Date" 
                value={selectedEndDate}
                // defaultValue={today}
                minDate={selectedStartDate}
                onChange={(newDate) => {
                    setSelectedEndDate(newDate)
                }}
            />
            </DemoContainer>
            </LocalizationProvider>
        </Stack>
        
        <Stack 
        direction="row"
        justifyContent="flex-start"
        sx={{ mt: 2 }}
        alignItems="center"
        >
            <Typography variant="h5" className={classes.whiteText}> Start Time </Typography>
        </Stack>
        <Stack 
        direction="row"
        // spacing={1}
        justifyContent="center"
        sx={{ mt: 2 }}
        alignItems="center"
        >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'TimePicker']}>
            <TimePicker
                className={classes.textfield}
                // sx={{mt: 2, backgroundColor:"white", borderRadius: "30px",}}
                // label="Enter Event Start Time"
                value={startTime}
                onChange={(newStartTime) => { 
                    setStartTime(newStartTime);
                }}
            />
            </DemoContainer>
            </LocalizationProvider>
        </Stack>
        
        <Stack 
        direction="row"
        justifyContent="flex-start"
        sx={{ mt: 2 }}
        alignItems="center"
        >
            <Typography variant="h5" className={classes.whiteText} > End Time </Typography>
        </Stack>
        <Stack 
        direction="row"
        justifyContent="center"
        sx={{ mt: 2 }}
        alignItems="center"
        >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'TimePicker']}>
            <TimePicker
                className={classes.textfield}
                // sx={{ backgroundColor:"white", borderRadius: "30px"}}
                // label="Enter Event End Time"
                value={endTime}
                onChange={(newEndTime) => 
                {
                    setEndTime(newEndTime)
                    if (newEndTime < startTime && selectedStartDate === selectedEndDate)
                    { setSelectedEndDate(dayjs(selectedStartDate).add(1, 'day')); }
                }}
            />
            </DemoContainer>
            </LocalizationProvider>
        </Stack>
        
        <Stack 
        direction="row"
        justifyContent="center"
        sx={{ mt: 5 }}>
        <Button 
        className={classes.button}
        onClick={() => {
            saveEventObject()
        }}> Next</Button>
        </Stack>
        </Box>
        </>
    )
}