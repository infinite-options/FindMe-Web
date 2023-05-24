import React, { Component, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, Button } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function EventVisibility() {
    const navigate = useNavigate();
    const [eventVisibility, setEventVisibility] = useState('Public');
    const retrievedEventObject = localStorage.getItem('event') === null ? {} : JSON.parse(localStorage.getItem('event'));

    const handleChange = (e) => {
        setEventVisibility(e.target.value);
    }
    const saveEventObject = () => {
        console.log("** ", retrievedEventObject)
        retrievedEventObject['eventVisibility'] = eventVisibility;
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
                <Typography variant="h5" sx={{mt: 2}}> {retrievedEventObject.eventType} </Typography>
                <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                            Event Type
                            Is this a Public or Private event?
                </FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                    value={eventVisibility}
                    onChange={handleChange}                    
                >
                    <FormControlLabel value="Public" control={<Radio />} label="Public" />
                    <FormControlLabel value="Private" control={<Radio />} label="Private" />
                </RadioGroup>
                </FormControl>
                <footer>Pubic events can be found in search and attended by anyone who has the registration code. <br/> Private events are by invitation only</footer>
                    <Button onClick={() => { navigate('/eventParticulars'); saveEventObject() }}> Next</Button>
            </Grid>
        </div>
        </>
    )
}