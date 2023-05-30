import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Grid, Typography, Button, Box } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { mediumBold, xSmall, small } from "../../styles";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;
export default function FindEventByDate() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [events, setEvents] = useState([]);
  const [eventDateSet, setEventDateSet] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getEventsByDate = () => {
    setEventDateSet(true);
    axios
      .get(BASE_URL + `/GetEvents?event_start_date=${selectedDate}`)
      .then((response) => {
        setEvents(response.data.result);
        setIsLoading(false);
      });
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "5%",
        }}
      >
        <Grid
          container
          direction="column"
          margin={1}
          style={{ height: "20rem", width: "80rem" }}
          alignItems="center"
          justify="center"
          border={1}
        >
          {eventDateSet ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                margin: "2rem 0rem",
              }}
            >
              {!isLoading
                ? events.length > 0
                  ? events.map((event) => {
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
                            navigate("/preregistration-event", {
                              state: { event: event },
                            });
                          }}
                        >
                          <div
                            style={{
                              width: "50px",
                              border: "1px solid red",
                              padding: "1rem",
                              margin: "0rem 1rem",
                            }}
                          >
                            img
                          </div>
                          <div style={{ lineHeight: "2px" }}>
                            <p style={mediumBold}>{event.event_title}</p>
                            <p style={small}>{event.event_description}</p>
                            <p style={small}>{event.event_start_date}</p>
                            <p style={small}>
                              {event.event_start_time} - {event.event_end_time}
                            </p>
                          </div>
                        </Box>
                      );
                    })
                  : `No events available for ${selectedDate}`
                : ""}
            </div>
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
              <Typography variant="h5" sx={{ mt: 2 }}>
                {" "}
                Pre-registration{" "}
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Enter Event Date"
                    value={selectedDate}
                    inputFormat="MM-DD-YYYY"
                    onChange={(d) => {
                      setSelectedDate(d.format("M/D/YYYY"));
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <Button
                variant="outlined"
                style={{ margin: "2rem 0rem" }}
                onClick={() => getEventsByDate()}
              >
                Get Events
              </Button>
            </div>
          )}
        </Grid>
      </div>
    </>
  );
}
