import React, { Component, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Grid, Typography, Button, Box, Stack } from "@mui/material";
import QRCode from '../QRCode/QRCode';
import useStyles from '../../theming/styles';
import axios from "axios";
import Back from "../../Icons/Back.png";

const APP_URL = process.env.REACT_APP_CLIENT_BASE_URI;
const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

export default function EventPreRegCode() {
    const classes = useStyles();
    const navigate = useNavigate();
    const retrievedEventObject = localStorage.getItem("event") === null ? {} : JSON.parse(localStorage.getItem("event"));
    const link_path = "/preregistration-event/" + retrievedEventObject.eventRegistrationCode;

    const sendEmail = () => {
        let event = {};
        event['event_organizer_uid'] = retrievedEventObject.event_organizer_uid
        event["event_type"] = retrievedEventObject.eventType
        event["event_visibility"] = retrievedEventObject.eventVisibility
        event["event_title"] = retrievedEventObject.eventTitle
        event["event_description"] = retrievedEventObject.eventDescription
        event["event_capacity"] = retrievedEventObject.eventCapacity
        event["event_location"] = retrievedEventObject.eventLocation
        event["event_location_name"] = retrievedEventObject.eventLocationName
        event["event_start_time"] = retrievedEventObject.eventStartTime
        event["event_end_time"] = retrievedEventObject.eventEndTime
        event["event_start_date"] = retrievedEventObject.eventStartDate
        event["event_end_date"] = retrievedEventObject.eventEndDate
        event["event_registration_code"] = retrievedEventObject.eventRegistrationCode
        event["pre_event_questionnaire"] = JSON.stringify(retrievedEventObject.preEventQuestionnaire)
        event["event_photo"] = retrievedEventObject.eventPhoto
        event["event_checkin_code"] = retrievedEventObject.eventCheckinCode
        event["event_status"] = null
        event["user_timezone"] = Intl.DateTimeFormat().resolvedOptions().timeZone;

        console.log("found it ", event);
        axios.post(BASE_URL + "/SendEventDetails", event).then((res) => {
            console.log(res);
        });
    }
            
    return (
        <>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Stack 
          direction="row"
          justifyContent="flex-start"
        >
        <Typography variant="h2" className={classes.whiteText}>
            edit
        </Typography>
        </Stack>

        <Stack
          direction="row"
          justifyContent="flex-start"
          sx={{ mt : 5}}
        >
          <Typography variant="h4" className={classes.whiteText}>
            Registration Code
          </Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          sx={{ mt : 5}}
        >
          <Typography 
          variant="h4" 
          className={classes.whiteText}
          onClick={()=>{navigate(link_path);}}
          >
            {retrievedEventObject.eventRegistrationCode}
          </Typography>
        </Stack> 
        <Stack
          direction="row"
          justifyContent="center"
          sx={{ mt : 5}}
        >
            <QRCode 
                route = {"/preregistration-event/"}
                event_registration_code = {retrievedEventObject.eventRegistrationCode}
            ></QRCode>
        </Stack>        
        <Stack
          direction="row"
          justifyContent="center"
          sx={{ mt:5 }}
        >
            <Button 
            className={classes.button}
            onClick={() => {sendEmail() }}>
                Send Email
            </Button>
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          sx={{ mt:2}}
        >
            <Button 
            className={classes.button}
            onClick={() => { navigate(-1); }}>
                <img src={Back} style={{ width: "2rem" }} alt="back" />
                Back
            </Button>
        </Stack>
        </Box>
        </>
    )
}