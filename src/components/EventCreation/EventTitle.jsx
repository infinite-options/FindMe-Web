import React, { Component, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Grid, Typography, Button, TextField } from "@mui/material";

export default function EventTitle() {
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
                <Typography variant="h5" sx={{mt: 2}}> {retrievedEventObject.eventType} </Typography>
                <TextField 
                id="outlined-basic" 
                label="Enter Event Title" 
                variant="outlined" sx={{ width: '30%', mt: 2}} 
                value={eventTitle}
                onChange={handleTitleInput}/>
                <TextField 
                id="outlined-basic" 
                multiline
                label="Enter Event Description" 
                variant="outlined" sx={{ width: '30%', mt: 2}} 
                value={eventDescription}
                onChange={handleDescInput}/>
                
                <Button onClick={() => {
                    saveEventObject()
                    if(location.state && location.state.edit){
                        navigate(-1);
                    }
                    else{
                        navigate('/eventCapacity');
                    }
                }}> Next</Button>

                </Grid>
        </div>
        </>
    )
}