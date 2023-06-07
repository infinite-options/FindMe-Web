import React, { Component, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Grid, Typography, Button, TextField, Box, Stack } from "@mui/material";
import useStyles from '../../theming/styles';

export default function EventTitle() {
    const classes = useStyles();
    const navigate = useNavigate();
    const location = useLocation();
    const retrievedEventObject = localStorage.getItem('event') === null ? {} : JSON.parse(localStorage.getItem('event'));
    const [eventTitle, setEventTitle] = useState(retrievedEventObject && retrievedEventObject.eventTitle ? retrievedEventObject.eventTitle : '');
    const [eventDescription, setEventDescription] = useState(retrievedEventObject && retrievedEventObject.eventDescription ? retrievedEventObject.eventDescription : '');
    
    const handleTitleInput = (e) => {
        setEventTitle(e.target.value)
    }
    const handleDescInput = (e) => {
         setEventDescription(e.target.value)
    }
    const saveEventObject = () => {
        console.log("** ", retrievedEventObject)
        retrievedEventObject['eventTitle'] = eventTitle;
        retrievedEventObject['eventDescription'] = eventDescription;
        localStorage.setItem('event', JSON.stringify(retrievedEventObject));
        console.log("66 ",retrievedEventObject)
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
            Event Title
        </Typography>
        </Stack>
        <Stack 
          direction="row"
          justifyContent="center"
          sx={{ mt: 5 }}
        >
            <TextField 
            id="outlined-basic" 
            label="Enter Event Title" 
            variant="outlined" sx={{ width: '30%', mt: 2}} 
            value={eventTitle}
            onChange={handleTitleInput}/>
        </Stack>
        <Stack 
          direction="row"
          justifyContent="flex-start"
          sx={{ mt: 5 }}
        >
        <Typography variant="h4" className={classes.whiteText}>
            Event Description
        </Typography>
        </Stack>
        <Stack 
          direction="row"
          justifyContent="center"
          sx={{ mt: 5 }}
        >
            <TextField 
            id="outlined-basic" 
            multiline
            label="Enter Event Description" 
            variant="outlined" sx={{ width: '30%', mt: 2}} 
            value={eventDescription}
            onChange={handleDescInput}/>
        </Stack>
        <Stack 
          direction="row"
          justifyContent="center"
          sx={{ mt: 5 }}
        >
            <Button 
            className={classes.button}
            onClick={() => {
                saveEventObject()
                if(location.state && location.state.edit){
                    navigate(-1);
                }
                else{
                    navigate('/eventCapacity');
                }
            }}> Next</Button>
        </Stack>
        </Box>
        </>
    )
}