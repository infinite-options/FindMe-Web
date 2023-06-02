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
export default function EventByType() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [eventType, setEventType] = useState("");
  const [eventTypeSet, setEventTypeSet] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const getEventsByType = () => {
    axios
      .get(BASE_URL + `/GetEvents?event_type=${eventType}`)
      .then((response) => {
        setEvents(response.data.result);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getEventsByType();
  }, [eventTypeSet]);

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
        Events By Type {eventTypeSet ? `: ${eventType}` : ""}
        {!eventTypeSet ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              margin: "2rem 0rem",
            }}
          >
            {" "}
            <Button
              variant="outlined"
              sx={{ mt: 1, width: "10rem" }}
              onClick={() => {
                setEventType("Business Networking");
                setEventTypeSet(true);
              }}
            >
              Business Networking
            </Button>
            <Button
              variant="outlined"
              sx={{ mt: 1, width: "10rem" }}
              onClick={() => {
                setEventType("Party");
                setEventTypeSet(true);
              }}
            >
              Party
            </Button>
            <Button
              variant="outlined"
              sx={{ mt: 1, width: "10rem" }}
              onClick={() => {
                setEventType("Social Mixer");
                setEventTypeSet(true);
              }}
            >
              Social Mixer
            </Button>
            <Button
              variant="outlined"
              sx={{ mt: 1, width: "10rem" }}
              onClick={() => {
                setEventType("Other");
                setEventTypeSet(true);
              }}
            >
              Other
            </Button>
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
          `No events of type ${eventType}`
        )}
      </Paper>
    </div>
  );
}
