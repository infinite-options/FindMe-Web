import React, { Component } from "react";
import { Grid, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

export default function EventDetails() {
  const navigate = useNavigate();
  const retrievedEventObject =
    localStorage.getItem("event") === null
      ? {}
          : JSON.parse(localStorage.getItem("event"));
    
    const event = {};
    event["event_uid"] = '200-000009';
  
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
                <Typography variant="h5" sx={{mt: 2}}> Event Details</Typography>
                
                <List sx={{ bgcolor: 'background.paper', mt:2 }}>
                    <ListItem sx={{ border: '1px solid grey' }}>                    
                        <Typography>Event Title : {retrievedEventObject.eventTitle}</Typography>
                    </ListItem>
                    <ListItem sx={{ border: '1px solid grey' }}>                    
                        <Typography>Event Description : {retrievedEventObject.eventDescription}</Typography>
                    </ListItem>
                    <ListItem sx={{ border: '1px solid grey' }}>                    
                        <Typography>Event Type : {retrievedEventObject.eventType}</Typography>
                    </ListItem>
                    
                    <ListItem sx={{ border: '1px solid grey' }}>                    
                        <Typography>Event Visibility : {retrievedEventObject.eventVisibility}</Typography>
                    </ListItem>
                    
                    <ListItem sx={{ border: '1px solid grey' }}>                    
                        <Typography>Event Start Date : {retrievedEventObject.eventStartDate}</Typography>
                    </ListItem>
                    
                    <ListItem sx={{ border: '1px solid grey' }}>                    
                        <Typography>Event Photo :
                        {retrievedEventObject.eventPhoto ? <img src={retrievedEventObject.eventPhoto} width={250} height={250} alt='Event Photo' /> : "None"}
                        </Typography>
                    </ListItem>
                    
                    <ListItem sx={{ border: '1px solid grey' }}>                    
                        <Typography>
                        Pre-Event Questionnaire : 
                        {retrievedEventObject.preEventQuestionnaire.map(
                            (question, index) => {
                                { return <ListItem>{question.question}</ListItem> }
                            })}
                        </Typography>
                    </ListItem>
                </List>
                
                
                <Button onClick={() => { navigate('/eventReview');}}> Edit Event </Button>
                <Button onClick={() => { navigate('/eventPreRegCode');}}> Show Pre-registration Code </Button>
                <Button onClick={() => { navigate('/eventCheckInCode');}}> Show Event Check-In Code </Button>
                <Button onClick={() => { navigate('/eventAttendees', {state: {event: event}})}}> View Attendees </Button>
                <Button onClick={() => { navigate('/emailBroadcastMessage'); }}> Broadcast Message </Button>
                <Button onClick={() => { navigate('/eventReview');}}> See Events </Button>

            </Grid>
        </div>
        </>
    )
}
