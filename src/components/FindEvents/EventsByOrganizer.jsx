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
import { useNavigate } from "react-router-dom";
import { mediumBold, xSmall, small } from "../../styles";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function EventByOrganizer() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [organizers, setOrganizers] = useState("");
  const [eventOrganizer, setEventOrganizer] = useState("");
  const [eventOrganizerSet, setEventOrganizerSet] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getOrganizers = () => {
    axios.get(BASE_URL + `/GetOrganizers`).then((response) => {
      setOrganizers(response.data.result);
      setIsLoading(false);
    });
  };

  const getEventsByOrganizer = (id) => {
    axios
      .get(BASE_URL + `/GetEvents?event_organizer_uid=${id}`)
      .then((response) => {
        setEvents(response.data.result);
        setEventOrganizerSet(true);
      });
  };
  useEffect(() => {
    getOrganizers();
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
        Events By Organizer {eventOrganizerSet ? `: ${eventOrganizer}` : ""}
        {!eventOrganizerSet ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              margin: "2rem 0rem",
            }}
          >
            {organizers &&
              organizers.map((organizer) => {
                return (
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                      border: "1px solid black",
                      borderRadius: "5px",
                      margin: "1rem 0rem",
                      padding: "1rem",
                      width: "400px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setEventOrganizer(
                        organizer.first_name + " " + organizer.last_name
                      );
                      getEventsByOrganizer(organizer.user_uid);
                    }}
                  >
                    {organizer.first_name} {organizer.last_name}
                  </Box>
                );
              })}
          </div>
        ) : !isLoading ? (
          events.map((event) => {
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
                onClick={() => {
                  navigate("/preregistration-event", {
                    state: { event: event },
                  });
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
                  <Typography variant="body2" color="text.secondary">
                    {event.event_start_date}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {event.event_start_time} - {event.event_end_time}
                  </Typography>
                </Grid>
              </Grid>
            );
          })
        ) : (
          `No events of type ${eventOrganizer}`
        )}
      </Paper>
    </div>
  );
}
