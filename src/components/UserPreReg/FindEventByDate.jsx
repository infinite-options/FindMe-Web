import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { Box, Typography, Button, Stack } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Back from "../../Icons/Back.png";
import useStyles from "../../theming/styles";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

export default function FindEventByDate() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState("");
  const [events, setEvents] = useState([]);
  const [eventDateSet, setEventDateSet] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getEventsByDate = () => {
    setEventDateSet(true);
    let user_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    axios
      .get(
        BASE_URL +
          `/GetEvents?event_start_date=${selectedDate}&timeZone=${user_timezone}`
      )
      .then((response) => {
        setEvents(response.data.result);
        setIsLoading(false);
      });
  };
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Stack direction="row" justifyContent="flex-start" sx={{ mt: 2, p: 2 }}>
          <Typography variant="h2" className={classes.whiteText}>
            byDate
          </Typography>
        </Stack>
        <Stack
          direction="column"
          justifyContent="center"
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
            {eventDateSet ? (
              !isLoading ? (
                events.length > 0 ? (
                  events.map((event) => {
                    return (
                      <Box
                        className={classes.eventContainer}
                        onClick={() => {
                          navigate(
                            "/preregistration-event/" +
                              event.event_registration_code,
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
                            {event.event_title} <br />
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
                            src={`${JSON.parse(
                              event.event_photo
                            )}?${Date.now()}`}
                          />
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
                        No events available for {selectedDate}
                      </Typography>
                    </div>
                  </div>
                )
              ) : (
                ""
              )
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  margin: "2rem 0rem",
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      className={classes.textfield}
                      value={selectedDate}
                      inputFormat="MM-DD-YYYY"
                      onChange={(d) => {
                        setSelectedDate(d.format("MM/DD/YYYY"));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            )}
          </div>
        </Stack>
        <Stack
          direction="column"
          justifyContent="center"
          spacing={2}
          sx={{ mt: 12 }}
        >
          {eventDateSet ? (
            <Button
              className={classes.button}
              onClick={() => {
                setEventDateSet(false);
                setSelectedDate("");
              }}
            >
              <img src={Back} style={{ width: "2rem" }} />
              &nbsp; &nbsp;Back
            </Button>
          ) : (
            <Button
              className={classes.button}
              onClick={() => getEventsByDate()}
            >
              Get Events
            </Button>
          )}
        </Stack>
      </Box>
    </>
  );
}
