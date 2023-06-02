import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { mediumBold, xSmall, small } from "../../styles";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
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
          Events By Date
          {eventDateSet ? (
            !isLoading ? (
              events.length > 0 ? (
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
                            src={`${JSON.parse(
                              event.event_photo
                            )}?${Date.now()}`}
                          />
                        </ButtonBase>
                      </Grid>
                      <Grid item xs={8} direction="column" spacing={2}>
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          component="div"
                        >
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
                `No events available for ${selectedDate}`
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
        </Paper>
      </div>
    </>
  );
}
