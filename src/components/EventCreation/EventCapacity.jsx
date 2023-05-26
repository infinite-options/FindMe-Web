import React, { Component, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, Button, TextField } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function EventCapacity() {
    const navigate = useNavigate();
    const retrievedEventObject = localStorage.getItem('event') === null ? {} : JSON.parse(localStorage.getItem('event'));
    const [limitOption, setLimitOption] = useState('No Limit');
    const [eventCapacity, setEventCapacity] = useState('No Limit');
    const [disabled, setDisabled] = useState(true);

    const handleSetLimitChange = (e) => {
        setLimitOption(e.target.value)
        if (e.target.value === 'No Limit') {
            setDisabled(true);
            setEventCapacity('No Limit');
        }
        if (e.target.value === 'Set Limit') {
            setDisabled(false);
        }
    }
    const handleCapacityChange = (e) => {
        setEventCapacity(e.target.value);
    }
    
    const saveEventObject = () => {
        console.log("** ", retrievedEventObject)
        retrievedEventObject['eventCapacity'] = eventCapacity;
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
                <Typography>Event Capacity</Typography>
                
                <FormControl sx={{mt: 2}}>
                <FormLabel id="demo-radio-buttons-group-label">
                            Select Maximum Event Capacity
                </FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                    value={limitOption}
                    onChange={handleSetLimitChange}                    
                >
                    <FormControlLabel value="No Limit" control={<Radio />} label="No Limit" />
                    <FormControlLabel value="Set Limit" control={<Radio />} label="Set Limit" />
                </RadioGroup>
                </FormControl>
                <TextField
                label="Event Capacity"
                type="number"
                value={eventCapacity}
                disabled={disabled}
                onChange={handleCapacityChange}
                sx={{mt: 2}}
                />
                <Button onClick={() => { navigate('/eventPhotoUpload'); saveEventObject()}}> Next</Button>

                </Grid>
        </div>
        </>
    )
}