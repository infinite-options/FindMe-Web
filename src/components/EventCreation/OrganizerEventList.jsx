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

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
export default function OrganizerEventList() {
  const navigate = useNavigate();
  const { state } = useLocation();
  let user = state.user;
  let user_uid =
    typeof user === "string" ? JSON.parse(user).user_uid : user.user_uid;
  const [events, setEvents] = useState([]);

  const [eventOrganizerUID, setEventOrganizerUID] = useState(user_uid);

  const retrievedEventObject =
    localStorage.getItem("event") === null
      ? {}
      : JSON.parse(localStorage.getItem("event"));

  const getAllEvents = () => {
    let user_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    axios
      .get(BASE_URL + `/GetEvents?event_organizer_uid=${eventOrganizerUID}&timeZone=${user_timezone}`)
      .then((response) => {
        // console.log("GetEvents result", response.data.result);
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
  }, []);

  const saveEventObject = (event) => {
    // console.log("event - ", event);
    retrievedEventObject["eventCapacity"] = event.event_capacity;
    retrievedEventObject["eventDescription"] = event.event_description;
    retrievedEventObject["eventPhoto"] = JSON.parse(event.event_photo);
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
    // console.log("66 ", retrievedEventObject);
  };

  return (
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
          justifyContent: "center",
          alignItems: "center",
          margin: 5,
          flexDirection: "column",
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <Typography variant="h5" sx={{ mt: 2 }}>
          Create
        </Typography>
        <Button onClick={() => handleCreateEvent()}>Create Event</Button>
        <Typography variant="h5" sx={{ mt: 2 }}>
          Edit
        </Typography>

        {events.map((event) => {
          // console.log("event ", event);
          return (
            <>
            <Stack
            sx={{
              bgcolor: "background.paper",
              border: 1,
              borderColor: "primary.main",
              borderRadius: "15px",
            }}
            direction="column"
          >
            <Grid
              container
              spacing={2}
              // margin={2}
              sx={{
                p: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid item>
                <ButtonBase
                  sx={{
                    width: 128,
                    height: 128,
                    border: "1px solid red",
                  }}
                >
                  <Img
                    alt="complex"
                    src={`${JSON.parse(event.event_photo)}?${Date.now()}`}
                  />
                </ButtonBase>
              </Grid>
              <Grid item xs={8} direction="column" spacing={2}>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {event.event_title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {event.event_description}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {event.event_location.split(',')[0]}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(event.event_start_date).toLocaleString('default', { month: 'short', day: 'numeric' })}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {event.event_start_time} - {event.event_end_time}
                </Typography>
              </Grid>
              <IconButton
                component="span"
                onClick={() => {
                  saveEventObject(event);
                  navigate("/eventReview", { state: { edit: true } });
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton
                component="span"
                onClick={() => {
                  saveEventObject(event);
                  navigate("/eventAttendeesList");
                }}
              >
                <GroupsIcon fontSize="medium" />
              </IconButton>
              <IconButton
                component="span"
                onClick={() => {
                  saveEventObject(event);
                  navigate("/eventDetails");
                }}
              >
                <MoreHorizIcon fontSize="medium" />
              </IconButton>
            </Grid>
            </Stack>            
            <br></br>
            </>
          );
        })}
      </Paper>
    </div>
  );
}
