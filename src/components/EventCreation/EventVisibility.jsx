import React, { Component, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Grid, Typography, Button, Box, Stack } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import useStyles from '../../theming/styles';

export default function EventVisibility() {
    const classes = useStyles();
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
            Event Accessibility
        </Typography>
        </Stack>
        <Stack 
          direction="row"
          justifyContent="center"
          sx={{ mt: 5 }}>
                <FormControl>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                    value={eventVisibility}
                    onChange={handleChange}                    
                >
                    <FormControlLabel value="Public" control={<Radio />} label={<Typography variant="h5" className={classes.whiteText}>Public</Typography>} />
                    <footer><Typography className={classes.whiteText}>Event is searchable and anyone can attend</Typography></footer>

                    <br></br>
                    
                    <FormControlLabel value="Private" control={<Radio />} label={<Typography variant="h5" className={classes.whiteText}>Private</Typography>} />
                    <footer><Typography className={classes.whiteText}>Event is by Invitation Only</Typography></footer>

                </RadioGroup>
                </FormControl>
        </Stack>
        <Stack 
          direction="row"
          justifyContent="center"
          sx={{ mt: 5 }}>
                <Button 
                className={classes.button}
                onClick={() => {
                    saveEventObject()
                    if(location.state && location.state.edit){
                        navigate(-1);
                    }
                    else{
                        navigate('/eventParticulars');
                    }
                }}> Next</Button>
        </Stack>
        </Box>
        </>
    )
}