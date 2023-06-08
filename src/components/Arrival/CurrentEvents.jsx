import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import useStyles from "../../theming/styles";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const CurrentEvents = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  const handleEventClick = (event) => {
    if (
      document.cookie !== "" &&
      document.cookie.split("; ").find((row) => row.startsWith("loggedIn=")) !==
        undefined
    ) {
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("loggedIn="))
        .split("=")[1] === "true"
        ? navigate("/earlyArrival", {
            state: {
              email: document.cookie
                .split("; ")
                .find((row) => row.startsWith("user_email="))
                .split("=")[1],
              user: document.cookie
                .split("; ")
                .find((row) => row.startsWith("user_details="))
                .split("=")[1],
              eventObj: event,
            },
          })
        : navigate("/login", {
            state: { path: "/earlyArrival", eventObj: event },
          });
    } else {
      navigate("/login", {
        state: { path: "/earlyArrival", eventObj: event },
      });
    }
  };

  const fetchEvents = async () => {
    let user_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const date = new Date();
    const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    const amOrPm = date.getHours() >= 12 ? " PM" : " AM";
    const response = await axios.get(
      `${BASE_URL}/GetEvents?event_start_date=${date.toLocaleDateString()}&event_start_time=${
        hours + ":" + date.getMinutes() + amOrPm
      }&timeZone=${user_timezone}`
    );
    setEvents(response.data.result);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <Box>
      <Typography variant="h2" className={classes.whiteText} gutterBottom>
        {"attend"}
      </Typography>
      <Stack
        sx={{
          pt: 5,
        }}
        spacing={2}
        direction="column"
      >
        {events.length > 0 ? (
          events.map((event) => {
            return (
              <Box
                key={event.event_uid}
                className={classes.eventContainer}
                onClick={() => handleEventClick(event)}
              >
                <div direction="column" spacing={2} className={classes.events}>
                  <Typography className={classes.eventText}>
                    {event.event_title} <br />
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
                  <img
                    className={classes.ellipseImg}
                    src={`${JSON.parse(event.event_photo)}?${Date.now()}`}
                    alt={event.event_title}
                  />
                </div>
              </Box>
            );
          })
        ) : (
          <Box className={classes.events} sx={{ alignSelf: "center" }}>
            <Typography className={classes.eventText}>
              No events available for today!
            </Typography>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default CurrentEvents;
