import React, { useState } from "react";
import axios from "axios";
import {
  Stack,
  Box,
  Typography,
  Button,
  FormGroup,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useStyles from "../../theming/styles";
import Back from "../../Icons/Back.png";
import NoImage from "../../Icons/NoImage.png";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export default function EventByLocation() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [city, setCity] = useState("");
  const [miles, setMiles] = useState(5);
  const [zipCode, setZipCode] = useState("");
  const [events, setEvents] = useState([]);
  const [eventCitySet, setEventCitySet] = useState(false);
  const [eventZipSet, setEventZipSet] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getEventByLocation = () => {
    let user_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (city !== "") {
      let obj = {
        city: city,
      };
      axios
        .post(BASE_URL + `/EventsByCity?timeZone=${user_timezone}`, obj)
        .then((response) => {
          setEvents(response.data.result);
          setEventZipSet(true);
          setIsLoading(false);
        });
    } else {
      let obj = {
        miles: miles,
        zip_code: zipCode,
      };
      axios
        .post(BASE_URL + `/EventsByZipCodes?timeZone=${user_timezone}`, obj)
        .then((response) => {
          setEvents(response.data.result);
          setEventZipSet(true);
          setIsLoading(false);
        });
    }
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${API_KEY}`
        )
        .then((response) => {
          let result = response.data.results[0].address_components[6];
          setZipCode(result.short_name);
        });
    });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Stack direction="row" justifyContent="flex-start" sx={{ mt: 2, p: 2 }}>
        <Typography
          variant="h2"
          className={classes.whiteText}
          onClick={() => navigate(-1)}
        >
          byLocation
        </Typography>
      </Stack>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ mt: 2 }}
      >
        {!eventCitySet && !eventZipSet ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {" "}
            <FormGroup>
              <Typography className={classes.whiteText}>City</Typography>
              <TextField
                // placeholder="Email"
                type="email"
                value={city}
                margin="normal"
                className={classes.textfield}
                onChange={(e) => setCity(e.target.value)}
                fullWidth
              />
            </FormGroup>
            <Typography className={classes.whiteText}>OR</Typography>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                margin: "2rem 0rem",
              }}
            >
              {" "}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  verticalAlign: "middle",
                }}
              >
                <TextField
                  style={{ width: 50 }}
                  type="email"
                  value={miles}
                  margin="normal"
                  className={classes.textfield}
                  onChange={(e) => setMiles(e.target.value)}
                />
                <Typography className={classes.whiteText}>
                  &nbsp;&nbsp;&nbsp;miles radius from
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  verticalAlign: "middle",
                }}
              >
                <FormGroup>
                  <TextField
                    placeholder="Zip Code"
                    type="email"
                    value={zipCode}
                    margin="normal"
                    className={classes.textfield}
                    onChange={(e) => setZipCode(e.target.value)}
                    fullWidth
                  />
                </FormGroup>
                <Typography className={classes.whiteText}>
                  {" "}
                  &nbsp;&nbsp;OR &nbsp;&nbsp;
                </Typography>
                <Button
                  margin="normal"
                  sx={{
                    height: "62px",
                    width: "214px",
                    color: "#000000",
                    backgroundColor: "#ffffff",
                    borderRadius: "30px",
                    padding: "15px",
                    fontSize: "18px !important",
                    fontWeight: "400 !important",
                    // fontFamily: "Inter !important",
                    textTransform: "none !important",
                  }}
                  onClick={() => getCurrentLocation()}
                >
                  Current Location
                </Button>
              </div>
            </Box>
            <Button
              className={classes.button}
              sx={{ my: 1 }}
              onClick={() => getEventByLocation()}
            >
              Get Events
            </Button>
          </div>
        ) : !isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
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
        ) : (
          `No events in the ${city} ${zipCode}`
        )}
      </Stack>
      <Stack
        direction="column"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 12 }}
      >
        {eventCitySet || eventZipSet ? (
          <Button
            className={classes.button}
            onClick={() => {
              setEventCitySet(false);
              setEventZipSet(false);
              setCity("");
              setZipCode("");
              setMiles(5);
            }}
          >
            <img src={Back} style={{ width: "2rem" }} />
            &nbsp; &nbsp;Back
          </Button>
        ) : (
          ""
        )}
      </Stack>
    </Box>
  );
}
