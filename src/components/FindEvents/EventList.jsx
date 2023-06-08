import React, { useState, useEffect } from "react";
import axios from "axios";
import { Stack, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useStyles from "../../theming/styles";
import Back from "../../Icons/Back.png";
import NoImage from "../../Icons/NoImage.png";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

export default function EventList() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [events, setEvents] = useState([]);
  const getAllEvents = () => {
    let user_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    axios
      .get(BASE_URL + `/GetEvents?timeZone=${user_timezone}`)
      .then((response) => {
        setEvents(response.data.result);
      });
  };
  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Stack direction="row" justifyContent="flex-start" sx={{ mt: 2, p: 2 }}>
        <Typography
          variant="h2"
          className={classes.whiteText}
          onClick={() => {
            navigate(-1);
          }}
        >
          all
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
                    {event.event_location.split(",")[1]},{" "}
                    {event.event_location.split(",")[2]}
                    <br />
                    {new Date(event.event_start_date).toLocaleString(
                      "default",
                      {
                        month: "short",
                        day: "numeric",
                      }
                    )}
                    ,{event.event_start_time} - {event.event_end_time}
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
