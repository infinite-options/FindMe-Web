import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import {
  Grid,
  Box,
  Paper,
  Typography,
  ButtonBase,
  Button,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import GroupsIcon from "@mui/icons-material/Groups";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useLocation, useNavigate } from "react-router-dom";
import { mediumBold, xSmall, small } from "../../styles";
import useStyles from "../../theming/styles";
import NoImage from "../../Icons/NoImage.png"

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
export default function OrganizerEventList() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { state } = useLocation();
  const retrievedEventObject = localStorage.getItem("event") === null ? {} : JSON.parse(localStorage.getItem("event"));
  
  var user_uid;
  useEffect(() => {
    if (state !== null) {
      let user = state.user;
      user_uid = typeof user === "string" ? JSON.parse(user).user_uid : user.user_uid;
    }
    else {
      user_uid = retrievedEventObject.event_organizer_uid;
    }
    setEventOrganizerUID(user_uid)
  },[])
  
  const [events, setEvents] = useState([]);
  const [eventOrganizerUID, setEventOrganizerUID] = useState(user_uid);

  const getAllEvents = () => {
    let user_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    axios
      .get(BASE_URL + `/GetEvents?event_organizer_uid=${eventOrganizerUID}&timeZone=${user_timezone}`)
      .then((response) => {
        console.log("GetEvents result", response.data.result);
        setEvents(response.data.result);
      });
  };
  const handleCreateEvent = () => {
    localStorage.clear();
    let newEvent = {};
    newEvent["event_organizer_uid"] = eventOrganizerUID;
    localStorage.setItem("event", JSON.stringify(newEvent));
    navigate("/eventTypeMenu");
  };
  useEffect(() => {
    getAllEvents();
  }, [eventOrganizerUID]);

  const saveEventObject = (event) => {
    // console.log("event - ", event);
    retrievedEventObject["eventCapacity"] = event.event_capacity;
    retrievedEventObject["eventDescription"] = event.event_description;
    retrievedEventObject["eventPhoto"] = event.event_photo;
    retrievedEventObject["eventTitle"] = event.event_title;
    retrievedEventObject["eventType"] = event.event_type;
    retrievedEventObject["event_organizer_uid"] = event.event_organizer_uid;
    retrievedEventObject["preEventQuestionnaire"] = JSON.parse(
      event.pre_event_questionnaire
    );
    retrievedEventObject["eventVisibility"] = event.event_visibility;
    retrievedEventObject["eventStartDate"] = event.event_start_date;
    retrievedEventObject["eventStartTime"] = event.event_start_time;
    retrievedEventObject["eventEndDate"] = event.event_end_date;
    retrievedEventObject["eventEndTime"] = event.event_end_time;
    retrievedEventObject["event_uid"] = event.event_uid;
    retrievedEventObject["eventLocation"] = event.event_location;
    retrievedEventObject["eventZip"] = event.event_zip;
    retrievedEventObject["eventRegistrationCode"] = event.event_registration_code;
    retrievedEventObject["eventCheckinCode"] = event.event_checkin_code;

    localStorage.setItem("event", JSON.stringify(retrievedEventObject));
    // console.log("retrievedEventObject ", retrievedEventObject);
  };

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
        <Button
          className={classes.button}
          onClick={() => handleCreateEvent()}>
          Create an Event
        </Button>
      <Stack 
      direction="row"
      justifyContent="flex-start"
      >
        <Typography variant="h2" className={classes.whiteText}>
          edit
        </Typography>
        </Stack>
        <Stack
          direction="column"
          justifyContent="center"
          spacing={2}
          sx={{ mt: 2 }}
        >
        {events.map((event) => {
          return (
            <Box
                className={classes.eventContainer}
                justifyContent={"center"}
                onClick={() => {
                  saveEventObject(event)
                  navigate(
                    "/eventDetails/"
                  );
                }}
              >
                <div direction="column" spacing={2} className={classes.events}>
                    <Stack
                    className={classes.ellipseSmall}
                      direction="column"
                      justifyContent="center"
                      spacing={2}
                    >
                      <Typography variant="h4" className={classes.blueText}>{event.num_attendees}</Typography>
                    </Stack>
                  <Typography className={classes.eventText}>
                    {event.event_title}
                    <br />
                    {new Date(event.event_start_date).toLocaleString(
                      "default",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                    <br />
                    {event.event_start_time} - {event.event_end_time}
                  </Typography>
                </div>
                <div className={classes.ellipse}>
                  {JSON.parse(event.event_photo).length === 0 ? (
                    <img className={classes.ellipseImg} src={NoImage} />
                  ) : (
                    <img
                      className={classes.ellipseImg}
                      src={`${JSON.parse(event.event_photo)}?${Date.now()}`}
                    />
                  )}
                </div>
              </Box>
          );
        })}
          </Stack>
        </Box>
      </>
  );
}
