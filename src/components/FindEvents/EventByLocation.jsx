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

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export default function EventByLocation() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [city, setCity] = useState("");
  const [miles, setMiles] = useState("");
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
        <Typography variant="h2" className={classes.whiteText}>
          byLocation
        </Typography>
      </Stack>
      <Stack
        direction="column"
        justifyContent="center"
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FormGroup>
                <TextField
                  style={{ width: 80 }}
                  type="email"
                  value={miles}
                  margin="normal"
                  className={classes.textfield}
                  onChange={(e) => setMiles(e.target.value)}
                />
              </FormGroup>
              <Typography className={classes.whiteText}>
                &nbsp;mile radius from
              </Typography>
            </div>
            <FormGroup>
              <Typography className={classes.whiteText}>Zip Code</Typography>
              <TextField
                // placeholder="Email"
                type="email"
                value={zipCode}
                margin="normal"
                className={classes.textfield}
                onChange={(e) => setZipCode(e.target.value)}
                fullWidth
              />
            </FormGroup>
            <Button
              className={classes.button}
              sx={{ mt: 1 }}
              onClick={() => getCurrentLocation()}
            >
              Current Location
            </Button>
            <Button
              className={classes.button}
              sx={{ my: 1 }}
              onClick={() => getEventByLocation()}
            >
              Get Events
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
                    className={classes.ellipse}
                    src={`${JSON.parse(event.event_photo)}?${Date.now()}`}
                  />
                </div>
              </Box>
            );
          })
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
              setMiles("");
            }}
          >
            <img src={Back} style={{ width: "2rem" }} />
            &nbsp; &nbsp;Back
          </Button>
        ) : (
          <Button
            className={classes.button}
            onClick={() => {
              navigate(-1);
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
