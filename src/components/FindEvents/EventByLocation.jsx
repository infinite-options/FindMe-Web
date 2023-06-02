import React, { useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import {
  Grid,
  Box,
  Paper,
  Typography,
  ButtonBase,
  Button,
  FormGroup,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { mediumBold, xSmall, small } from "../../styles";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
export default function EventByLocation() {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [miles, setMiles] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [events, setEvents] = useState([]);
  const [eventCitySet, setEventCitySet] = useState(false);
  const [eventZipSet, setEventZipSet] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getEventByLocation = () => {
    if (city !== "") {
      axios
        .get(BASE_URL + `/GetEvents?event_location=${city}`)
        .then((response) => {
          setEvents(response.data.result);
          setEventCitySet(true);
          setIsLoading(false);
        });
    } else {
      let obj = {
        miles: miles,
        zip_code: zipCode,
      };
      axios.post(BASE_URL + `/EventsByZipCodes`, obj).then((response) => {
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
        Event By Location
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
            <FormGroup className="mx-2 my-3">
              <TextField
                style={{ borderRadius: 0 }}
                // placeholder="Email"
                type="email"
                value={city}
                margin="normal"
                label="City"
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setCity(e.target.value)}
                fullWidth
              />
            </FormGroup>
            OR
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FormGroup className="mx-2 my-3">
                <TextField
                  style={{ borderRadius: 0, width: 80 }}
                  type="email"
                  value={miles}
                  margin="normal"
                  label="Miles"
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => setMiles(e.target.value)}
                />
              </FormGroup>
              &nbsp;mile radius from
            </div>
            <FormGroup className="mx-2 my-3">
              <TextField
                style={{ borderRadius: 0 }}
                // placeholder="Email"
                type="email"
                value={zipCode}
                margin="normal"
                label="Zip Code"
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setZipCode(e.target.value)}
                fullWidth
              />
            </FormGroup>
            <Button
              variant="outlined"
              sx={{ mt: 1 }}
              onClick={() => getCurrentLocation()}
            >
              Current Location
            </Button>
            <Button
              variant="outlined"
              sx={{ my: 1 }}
              onClick={() => getEventByLocation()}
            >
              Get Events
            </Button>
          </div>
        ) : !isLoading ? (
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
                    <Img alt="complex" src={JSON.parse(event.event_photo)} />
                  </ButtonBase>
                </Grid>
                <Grid item xs={8} direction="column" spacing={2}>
                  <Typography gutterBottom variant="subtitle1" component="div">
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
          `No events in the ${city} ${zipCode}`
        )}
      </Paper>
    </div>
  );
}
