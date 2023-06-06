import React, { Component, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Grid, Typography, Button } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function EventVisibility() {
    const navigate = useNavigate();
    const location = useLocation();
    const retrievedEventObject = localStorage.getItem('event') === null ? {} : JSON.parse(localStorage.getItem('event'));
    const [eventVisibility, setEventVisibility] = useState(retrievedEventObject && retrievedEventObject.eventVisibility ? retrievedEventObject.eventVisibility : 'Public');

    const handleChange = (e) => {
        setEventVisibility(e.target.value);
    }
    const saveEventObject = () => {
        console.log("retrievedEventObject - ", retrievedEventObject)
        retrievedEventObject['eventVisibility'] = eventVisibility;
        localStorage.setItem('event', JSON.stringify(retrievedEventObject));
        console.log("retrievedEventObject - ",retrievedEventObject)
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
                <Typography variant="h5" sx={{mt: 2}}> Create </Typography>
                <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                            Event Accessibility
                </FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                    value={eventVisibility}
                    onChange={handleChange}                    
                >
                    <FormControlLabel value="Public" control={<Radio />} label="Public" />
                    <footer>Event is searchable and anyone can attend</footer>

                    <br></br>
                    
                    <FormControlLabel value="Private" control={<Radio />} label="Private" />
                    <footer>Event is by Invitation Only</footer>

                </RadioGroup>
                </FormControl>
                
                <Button onClick={() => {
                    saveEventObject()
                    if(location.state && location.state.edit){
                        navigate(-1);
                    }
                    else{
                        navigate('/eventParticulars');
                    }
                }}> Next</Button>
            </Grid>
        </div>
        </>
    )
}