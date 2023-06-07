import React, { useState, useEffect } from "react";
import axios from "axios";
import { Stack, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useStyles from "../../theming/styles";
import Back from "../../Icons/Back.png";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

export default function EventByType() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [events, setEvents] = useState([]);
  const [eventType, setEventType] = useState("");
  const [eventTypeSet, setEventTypeSet] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const getEventsByType = () => {
    let user_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    axios
      .get(
        BASE_URL +
          `/GetEvents?event_type=${eventType}&timeZone=${user_timezone}`
      )
      .then((response) => {
        setEvents(response.data.result);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getEventsByType();
  }, [eventTypeSet]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Stack direction="row" justifyContent="flex-start" sx={{ mt: 2, p: 2 }}>
        <Typography variant="h2" className={classes.whiteText}>
          byType
        </Typography>
      </Stack>
      <Stack
        direction="column"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 2 }}
      >
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
              sx={{ mt: 1 }}
              className={classes.button}
              onClick={() => {
                setEventType("Business Networking");
                setEventTypeSet(true);
              }}
            >
              Business Networking
            </Button>
            <Button
              sx={{ mt: 1 }}
              className={classes.button}
              onClick={() => {
                setEventType("Party");
                setEventTypeSet(true);
              }}
            >
              Party
            </Button>
            <Button
              sx={{ mt: 1 }}
              className={classes.button}
              onClick={() => {
                setEventType("Social Mixer");
                setEventTypeSet(true);
              }}
            >
              Social Mixer
            </Button>
            <Button
              sx={{ mt: 1 }}
              className={classes.button}
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
              <Box
                className={classes.eventContainer}
                onClick={() => {
                  navigate(
                    "/preregistration-event/" + event.event_registration_code,
                    {
                      state: { event: event },
                    }
                  );
                }}
              >
                <div direction="column" spacing={2} className={classes.events}>
                  <Typography className={classes.eventText}>
                    {event.event_title}
                    <br />
                    {event.event_description}
                    <br />
                    {event.event_start_date}
                    <br />
                    {event.event_start_time} - {event.event_end_time}
                  </Typography>
                </div>
                <div className={classes.ellipse}>
                  <img
                    className={classes.ellipse}
                    src={`${JSON.parse(event.event_photo)}?${Date.now()}`}
                  />
                </div>
              </Box>
            );
          })
        ) : (
          `No events of type ${eventType}`
        )}
      </Stack>
      <Stack
        direction="column"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 12 }}
      >
        {!eventTypeSet ? (
          <Button
            className={classes.button}
            onClick={() => {
              navigate(-1);
            }}
          >
            <img src={Back} style={{ width: "2rem" }} />
            &nbsp; &nbsp;Back
          </Button>
        ) : (
          <Button
            className={classes.button}
            onClick={() => {
              setEventTypeSet(false);
              setEventType("");
            }}
          >
            <img src={Back} style={{ width: "2rem" }} />
            &nbsp; &nbsp;Back
          </Button>
        )}
      </Stack>
    </Box>
  );
}
