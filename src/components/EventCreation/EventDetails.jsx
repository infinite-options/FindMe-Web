import React, { useEffect, useState } from "react";
import { Grid, Button, Typography, Paper, Box, Stack, ButtonBase } from "@mui/material";
import { useNavigate } from "react-router-dom";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { tileImg } from "../../styles";
import useStyles from "../../theming/styles";
import { styled } from "@mui/material/styles";

import QRCode from "../QRCode/QRCode";
const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function EventDetails() {
  const classes = useStyles();
  const navigate = useNavigate();
  const retrievedEventObject =
    localStorage.getItem("event") === null
      ? {}
      : JSON.parse(localStorage.getItem("event"));

  const event = {};
  event["event_uid"] = "200-000009";
  console.log(retrievedEventObject);
  console.log(retrievedEventObject.eventPhoto);
  const [images, setImages] = useState([]);
  useEffect(() => {
    if (retrievedEventObject) {
      if (typeof retrievedEventObject.eventPhoto === "string") {
        setImages(JSON.parse(retrievedEventObject.eventPhoto));
      } else {
        setImages(retrievedEventObject.eventPhoto);
      }
    }
  }, []);

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
          justifyContent="center"
          sx={{ mt :2}}
        >
          <Typography variant="h4" className={classes.whiteText}>
            {retrievedEventObject.eventTitle}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
        >
          <Typography variant="h5" className={classes.whiteText}>
            {new Date(retrievedEventObject.eventStartDate).toLocaleString('default', { month: 'short', day: 'numeric' })}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
        >
          <Typography variant="h5" className={classes.whiteText}>
            {retrievedEventObject.eventStartTime} - {retrievedEventObject.eventEndTime}
          </Typography>
        </Stack>
        
          <Stack
            direction="column"
            justifyContent="center"
            spacing={2}
            sx={{ mt: 3 }}
          >
            <Button
            className={classes.button}
            onClick={() => {
              navigate("/eventPreRegCode");
            }}
            >
              Registration Code
            </Button>
            <Button
            className={classes.button}
            onClick={() => {
              navigate("/eventCheckInCode");
            }}
            >
              Check In Code
            </Button>
            <Button
            className={classes.button}
            onClick={() => {
              navigate("/eventAttendeesList");
            }}
            >
              View Attendees
            </Button>
            <Button
            className={classes.button}
            onClick={() => {
              navigate("/emailBroadcastMessage");
            }}
            >
              Broadcast Message
            </Button>
            <Button
            className={classes.button}
            onClick={() => {
              navigate("/organizerEventList");
            }}
            >
              See Event List
            </Button>
            <Button
            className={classes.button}
            onClick={() => {
              navigate("/eventReview", { state: { edit: true } });
            }}
            >
              Edit Event
            </Button>
          </Stack>
        </Box>
    </>
  );
}
