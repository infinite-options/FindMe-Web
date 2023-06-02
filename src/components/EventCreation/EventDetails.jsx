import React, { Component } from "react";
import { Grid, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { tileImg } from "../../styles";
const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

export default function EventDetails() {
  const navigate = useNavigate();
  const retrievedEventObject =
    localStorage.getItem("event") === null
      ? {}
      : JSON.parse(localStorage.getItem("event"));

  const event = {};
  event["event_uid"] = "200-000009";

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "5%",
        }}
      >
        <Paper
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: 5,
            flexDirection: "row",
            flexGrow: 1,
            border: 1,
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#1A2027" : "#fff",
          }}
        >
          <List sx={{ bgcolor: "background.paper", mt: 2 }}>
            <Typography variant="h5" sx={{ mt: 2 }}>
              {" "}
              Event Details
            </Typography>
            <ListItem sx={{ border: "1px solid grey" }}>
              <Typography>
                Event Title : {retrievedEventObject.eventTitle}
              </Typography>
            </ListItem>
            <ListItem sx={{ border: "1px solid grey" }}>
              <Typography>
                Event Description : {retrievedEventObject.eventDescription}
              </Typography>
            </ListItem>
            <ListItem sx={{ border: "1px solid grey" }}>
              <Typography>
                Event Type : {retrievedEventObject.eventType}
              </Typography>
            </ListItem>

            <ListItem sx={{ border: "1px solid grey" }}>
              <Typography>
                Event Visibility : {retrievedEventObject.eventVisibility}
              </Typography>
            </ListItem>

            <ListItem sx={{ border: "1px solid grey" }}>
              <Typography>
                Event Location : {retrievedEventObject.eventLocation}
              </Typography>
            </ListItem>

            <ListItem sx={{ border: "1px solid grey" }}>
              <Typography>
                Event Start Date : {retrievedEventObject.eventStartDate}
              </Typography>
            </ListItem>

            <ListItem sx={{ border: "1px solid grey" }}>
              <Typography>
                Event Start Time : {retrievedEventObject.eventStartTime}
              </Typography>
            </ListItem>

            <ListItem sx={{ border: "1px solid grey" }}>
              <Typography>
                Event End Date : {retrievedEventObject.eventEndDate}
              </Typography>
            </ListItem>

            <ListItem sx={{ border: "1px solid grey" }}>
              <Typography>
                Event End Time : {retrievedEventObject.eventEndTime}
              </Typography>
            </ListItem>

            <ListItem sx={{ border: "1px solid grey" }}>
              <Typography>
                Event Photo :
                {JSON.parse(retrievedEventObject.eventPhoto) ? (
                  <img
                    key={Date.now()}
                    src={`${
                      JSON.parse(retrievedEventObject.eventPhoto)[0]
                    }?${Date.now()}`}
                    // src={JSON.parse(retrievedEventObject.eventPhoto)[0]}
                    style={{
                      ...tileImg,
                      objectFit: "cover",
                      position: "relative",
                      minHeight: "100px",
                      minWidth: "100px",
                      height: "100px",
                      width: "100px",
                    }}
                    alt="Event Photo"
                  />
                ) : (
                  "None"
                )}
              </Typography>
            </ListItem>

            <ListItem sx={{ border: "1px solid grey" }}>
              <Typography>
                Pre-Event Questionnaire :
                {retrievedEventObject.preEventQuestionnaire.map(
                  (question, index) => {
                    {
                      return <ListItem>{question.question}</ListItem>;
                    }
                  }
                )}
              </Typography>
            </ListItem>
          </List>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Button
              onClick={() => {
                navigate("/eventReview", { state: { edit: true } });
              }}
            >
              {" "}
              Edit Event{" "}
            </Button>
            <Button
              onClick={() => {
                navigate("/eventPreRegCode");
              }}
            >
              {" "}
              Show Pre-registration Code{" "}
            </Button>
            <Button
              onClick={() => {
                navigate("/eventCheckInCode");
              }}
            >
              {" "}
              Show Event Check-In Code{" "}
            </Button>
            <Button
              onClick={() => {
                navigate("/eventAttendeesList");
              }}
            >
              {" "}
              View Attendees{" "}
            </Button>
            <Button
              onClick={() => {
                navigate("/emailBroadcastMessage");
              }}
            >
              {" "}
              Broadcast Message{" "}
            </Button>
            <Button
              onClick={() => {
                navigate("/seeEventsList");
              }}
            >
              {" "}
              See Events{" "}
            </Button>
          </div>
        </Paper>
      </div>
    </>
  );
}
