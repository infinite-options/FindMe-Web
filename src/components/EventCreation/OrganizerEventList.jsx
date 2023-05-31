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
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
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
  const [events, setEvents] = useState([]);
  const [eventOrganizerUID, setEventOrganizerUID] = useState("100-000036");
  const getAllEvents = () => {
    axios
      .get(BASE_URL + `/GetEvents?event_organizer_uid=${eventOrganizerUID}`)
      .then((response) => {
        console.log(response.data.result);
        setEvents(response.data.result);
      });
  };
  useEffect(() => {
    getAllEvents();
  }, []);

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
          border: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <Typography variant="h5" sx={{ mt: 2 }}>
          {" "}
          Events List{" "}
        </Typography>

        {events.map((event) => {
          console.log("event ", event);
          return (
            <Grid
              container
              spacing={2}
              margin={2}
              sx={{
                p: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: 1,
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
                  <Img alt="complex" src="/static/images/grid/complex.jpg" />
                </ButtonBase>
              </Grid>
              <Grid item xs={8} direction="column" spacing={2}>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {event.event_title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {event.event_description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {event.event_start_date}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {event.event_start_time} - {event.event_end_time}
                </Typography>
              </Grid>
              <IconButton
                component="span"
                onClick={() => {
                  navigate("/eventTitle");
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Grid>
          );
        })}
        <Button onClick={() => navigate("/eventTypeMenu")}>Create Event</Button>
      </Paper>
    </div>
  );
}
