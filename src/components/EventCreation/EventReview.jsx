import React, { Component } from "react";
import { Grid, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@mui/icons-material/Edit";

const BASE_URL = "http://localhost:4000/api/v2/";

export default function EventReview() {
  const navigate = useNavigate();
  const retrievedEventObject =
    localStorage.getItem("event") === null
      ? {}
      : JSON.parse(localStorage.getItem("event"));
  const addEvent = () => {
    delete retrievedEventObject["eventPhoto"];
    var event = JSON.stringify(retrievedEventObject);
    console.log(event);

        axios
          .post(BASE_URL + `AddEvent`, retrievedEventObject)
            .then((response) => {
                console.log("event created")
                navigate('/eventCreationConfirmation');
          })
          .catch((error) => {
            console.log(error);
            console.log("Invalid Code")
          });
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
                <Typography variant="h5" sx={{mt: 2}}> Review Event </Typography>
                
                <List sx={{ bgcolor: 'background.paper', mt:2 }}>
                    <ListItem sx={{ border: '1px solid grey' }}>                    
                        <Typography>Event Type : {retrievedEventObject.eventTitle}</Typography>
                            <IconButton component="span" onClick={() => { navigate('/eventTitle') }}>
                            <EditIcon fontSize="small"/>
                        </IconButton>
                    </ListItem>
                    <ListItem sx={{ border: '1px solid grey' }}>                    
                        <Typography>Event Type : {retrievedEventObject.eventDescription}</Typography>
                            <IconButton component="span" onClick={() => { navigate('/eventTitle') }}>
                            <EditIcon fontSize="small"/>
                        </IconButton>
                    </ListItem>
                    <ListItem sx={{ border: '1px solid grey' }}>                    
                        <Typography>Event Type : {retrievedEventObject.eventType}</Typography>
                            <IconButton component="span" onClick={() => { navigate('/eventTypeMenu') }}>
                            <EditIcon fontSize="small"/>
                        </IconButton>
                    </ListItem>
                    
                    <ListItem sx={{ border: '1px solid grey' }}>                    
                        <Typography>Event Visibility : {retrievedEventObject.eventVisibility}</Typography>
                        <IconButton component="span" onClick={() => { navigate('/eventVisibility') }}>
                            <EditIcon fontSize="small"/>
                        </IconButton>
                    </ListItem>
                    
                    <ListItem sx={{ border: '1px solid grey' }}>                    
                        <Typography>Event Start Date : {retrievedEventObject.eventStartDate}</Typography>
                        <IconButton component="span" onClick={() => { navigate('/eventParticulars') }}>
                            <EditIcon fontSize="small"/>
                        </IconButton>
                    </ListItem>
                    
                    <ListItem sx={{ border: '1px solid grey' }}>                    
                        <Typography>Event Photo :
                        {retrievedEventObject.eventPhoto ? <img src={retrievedEventObject.eventPhoto} width={250} height={250} alt='Event Photo' /> : "None"}

                        </Typography>
                        <IconButton component="span" onClick={() => { navigate('/eventPhotoUpload') }}>
                            <EditIcon fontSize="small"/>
                        </IconButton>
                    </ListItem>
                    
                    <ListItem sx={{ border: '1px solid grey' }}>                    
                        <Typography>Pre-Event Questionnaire : {retrievedEventObject.preEventQuestionnaire}</Typography>
                        <IconButton component="span" onClick={() => { navigate('/preEventQuestionnaire') }}>
                            <EditIcon fontSize="small"/>
                        </IconButton>
                    </ListItem>
                </List>
                
                
                <Button onClick={() => { navigate('/eventReview'); addEvent()}}> Create Event </Button>

            </Grid>
        </div>
        </>
    )
}
