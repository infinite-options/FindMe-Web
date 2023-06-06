import React, { Component, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Grid, Typography, Button } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function EventTypeMenu() {
    const navigate = useNavigate();
    const location = useLocation();

    const retrievedEventObject = localStorage.getItem('event') === null ? {} : JSON.parse(localStorage.getItem('event'));

    const [eventType, setEventType] = useState(retrievedEventObject && retrievedEventObject.eventType ? retrievedEventObject.eventType : 'Business Networking');
    
    const handleChange = (e) => {
        setEventType(e.target.value);
    }
    const saveEventObject = () => {
        console.log("** ", retrievedEventObject)
        retrievedEventObject['eventType'] = eventType;
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
            >
                <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                    <Typography variant="h5" sx={{mt: 2}}> Create </Typography>
                    <Typography sx={{mt: 2}}> Event Type </Typography>
                </FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                    value={eventType}
                    onChange={handleChange}
                >
                    <FormControlLabel value="Business Networking" control={<Radio />} label="Business Networking" />
                    <FormControlLabel value="Party" control={<Radio />} label="Party" />
                    <FormControlLabel value="Social Mixer" control={<Radio />} label="Social Mixer" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
                </FormControl>
                <Button onClick={() => {
                    saveEventObject()
                    if(location.state && location.state.edit){
                        navigate(-1);
                    }
                    else{
                        navigate('/eventVisibility'); 
                    }
                }}> Next</Button>
            </Grid>
        </div>
        </>
    )
}