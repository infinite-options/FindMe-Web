import React, { useState, useEffect } from "react";
import axios from "axios";
import { Stack, Box, Paper, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useStyles from "../../theming/styles";
import Back from "../../Icons/Back.png";
import NoUserImage from "../../Icons/NoUserImage.png";
import NoImage from "../../Icons/NoImage.png";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

export default function EventByOrganizer() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [events, setEvents] = useState([]);
  const [organizers, setOrganizers] = useState("");
  const [eventOrganizer, setEventOrganizer] = useState("");
  const [eventOrganizerSet, setEventOrganizerSet] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getOrganizers = () => {
    let user_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    axios
      .get(BASE_URL + `/GetOrganizers?timeZone=${user_timezone}`)
      .then((response) => {
        setOrganizers(response.data.result);
        setIsLoading(false);
      });
  };

  const getEventsByOrganizer = (id) => {
    let user_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    axios
      .get(
        BASE_URL +
          `/GetEvents?event_organizer_uid=${id}&timeZone=${user_timezone}`
      )
      .then((response) => {
        setEvents(response.data.result);
        setEventOrganizerSet(true);
      });
  };
  useEffect(() => {
    getOrganizers();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Stack direction="row" justifyContent="flex-start" sx={{ mt: 2, p: 2 }}>
        <Typography
          variant="h2"
          className={classes.whiteText}
          onClick={() => navigate(-1)}
        >
          byOrganizer
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
                      className={classes.eventContainer}
                      onClick={() => {
                        setEventOrganizer(
                          organizer.first_name + " " + organizer.last_name
                        );
                        getEventsByOrganizer(organizer.user_uid);
                      }}
                    >
                      <div
                        direction="column"
                        spacing={2}
                        className={classes.events}
                      >
                        <Typography className={classes.eventText}>
                          {organizer.first_name} {organizer.last_name}
                        </Typography>
                      </div>
                      <div className={classes.ellipse}>
                        {JSON.parse(organizer.images) === null ? (
                          <img
                            className={classes.ellipseImg}
                            src={NoUserImage}
                          />
                        ) : (
                          <img
                            className={classes.ellipseImg}
                            src={`${JSON.parse(
                              organizer.images
                            )}?${Date.now()}`}
                          />
                        )}
                      </div>
                    </Box>
                  );
                })}
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
                  <div
                    direction="column"
                    spacing={2}
                    className={classes.events}
                  >
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
                      , {event.event_start_time} - {event.event_end_time}
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
            })
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div className={classes.events}>
                <Typography className={classes.eventText}>
                  No events by organizer ${eventOrganizer}
                </Typography>
              </div>
            </div>
          )}
        </div>
      </Stack>

      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ mt: 12 }}
      >
        {!eventOrganizerSet ? (
          ""
        ) : (
          <Button
            className={classes.button}
            onClick={() => {
              setEventOrganizerSet(false);
              setEventOrganizer("");
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
