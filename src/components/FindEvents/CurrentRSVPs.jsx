import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Stack } from "@mui/material";
import Back from "../../Icons/Back.png";
import useStyles from "../../theming/styles";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

export default function CurrentRSVPs() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const classes = useStyles();
  const email = state.email;
  const user = state.user;
  let user_uid =
    typeof user === "string" ? JSON.parse(user).user_uid : user.user_uid;
  const [events, setEvents] = useState([]);

  const getRSVPdEvents = () => {
    axios.get(BASE_URL + `/GetEventUser/${user_uid}`).then((response) => {
      setEvents(response.data.result);
    });
  };
  useEffect(() => {
    getRSVPdEvents();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Stack direction="row" justifyContent="flex-start" sx={{ mt: 2, p: 2 }}>
        <Typography
          variant="h2"
          className={classes.whiteText}
          onClick={() => navigate(-1)}
        >
          currentRSVPs
        </Typography>
      </Stack>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ mt: 2 }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {" "}
          {events.map((event) => {
            return (
              <Box
                className={classes.eventContainer}
                onClick={() => {
                  navigate("/event-details", { state: { event: event } });
                }}
              >
                <div direction="column" spacing={2} className={classes.events}>
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
                  <img
                    className={classes.ellipseImg}
                    src={`${JSON.parse(event.event_photo)}?${Date.now()}`}
                  />
                </div>
              </Box>
            );
          })}
        </div>
      </Stack>
      {/* {events ? (
        <Stack
          direction="column"
          justifyContent="center"
          spacing={2}
          sx={{ mt: 12 }}
        >
          <Button
            className={classes.button}
            onClick={() => {
              navigate(-1);
            }}
          >
            <img src={Back} style={{ width: "2rem" }} />
            &nbsp; &nbsp;Back
          </Button>
        </Stack>
      ) : (
        ""
      )} */}
    </Box>
  );
}
