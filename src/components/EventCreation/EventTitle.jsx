import React, { Component, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Grid, Typography, Button, TextField, Box, Stack } from "@mui/material";
import useStyles from '../../theming/styles';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function EventTitle() {
    const classes = useStyles();
    const navigate = useNavigate();
    const location = useLocation();
    const retrievedEventObject = localStorage.getItem('event') === null ? {} : JSON.parse(localStorage.getItem('event'));
    const [eventTitle, setEventTitle] = useState(retrievedEventObject && retrievedEventObject.eventTitle ? retrievedEventObject.eventTitle : '');
    const [eventDescription, setEventDescription] = useState(retrievedEventObject && retrievedEventObject.eventDescription ? retrievedEventObject.eventDescription : '');
    const [showAddTitle, setShowAddTitle] = useState(false)

    const handleTitleInput = (e) => {
        setEventTitle(e.target.value)
    }
    const handleDescInput = (e) => {
         setEventDescription(e.target.value)
    }
    const saveEventObject = () => {
        if (eventTitle === '') {
            setShowAddTitle(true);
        }
        else {
            console.log("retrievedEventObject ", retrievedEventObject)
            retrievedEventObject['eventTitle'] = eventTitle;
            retrievedEventObject['eventDescription'] = eventDescription;
            localStorage.setItem('event', JSON.stringify(retrievedEventObject));
            console.log("retrievedEventObject ", retrievedEventObject)

            if(location.state && location.state.edit){
                navigate(-1);
            }
            else{
                navigate('/eventCapacity');
            }
        }
    }
    const DialogAddTitle = () => {
    return (
      <Dialog
        open={showAddTitle}
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
          Enter Event Title
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              setShowAddTitle(false);
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
            Event Title
        </Typography>
        </Stack>
        <Stack 
          direction="row"
          justifyContent="center"
          sx={{ mt: 5 }}
        >
            {DialogAddTitle()}
            <TextField 
            className={classes.textfield}
            inputProps={{
                maxLength: 20,
                autoComplete: 'off'
            }}
            placeholder="Limit to 20 characters"
            // id="outlined-basic" 
            // label="Enter Event Title" 
            // variant="outlined"
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
            className={classes.textfieldMulti}
            // id="outlined-basic" 
            multiline
            rows={7}
            inputProps={{ 
                maxLength: 100,
                autoComplete: 'off'
            }}
            placeholder="Limit to 100 characters"
            // label="Enter Event Description" 
            // variant="outlined" sx={{ width: '30%', mt: 2}} 
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
            }}> Next</Button>
        </Stack>
        </Box>
        </>
    )
}