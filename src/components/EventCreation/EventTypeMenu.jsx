import React, { Component, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Grid, Typography, Button, Box, Stack } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import useStyles from '../../theming/styles';

export default function EventTypeMenu() {
    const classes = useStyles();
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
            Event Type
        </Typography>
        </Stack>
        <Stack 
          direction="row"
          justifyContent="flex-start"
          sx={{ mt: 5 }}
        >
            <FormControl>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                value={eventType}
                onChange={handleChange}
            >
                <FormControlLabel sx={{ mt: 3 }} value="Business Networking" control={<Radio sx={{color: '#ffffff','&.Mui-checked': {color: '#ffffff'}}}/>} label={<Typography variant="h5" className={classes.whiteText}>Business Networking</Typography>}></FormControlLabel>
                <FormControlLabel sx={{ mt: 3 }} value="Party" control={<Radio sx={{color: '#ffffff','&.Mui-checked': {color: '#ffffff'}}}/>} label={<Typography variant="h5" className={classes.whiteText}>Party</Typography>}></FormControlLabel>
                <FormControlLabel sx={{ mt: 3 }} value="Social Mixer" control={<Radio sx={{color: '#ffffff','&.Mui-checked': {color: '#ffffff'}}}/>} label={<Typography variant="h5" className={classes.whiteText}>Social Mixer</Typography>}></FormControlLabel>
                <FormControlLabel sx={{ mt: 3 }} value="other" control={<Radio sx={{color: '#ffffff','&.Mui-checked': {color: '#ffffff'}}}/>} label={<Typography variant="h5" className={classes.whiteText}>Other</Typography>}></FormControlLabel>
            </RadioGroup>
            </FormControl>
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
                    navigate('/eventVisibility'); 
                }
            }}> 
            Next
            </Button>
        </Stack>
        </Box>
        </>
    )
}