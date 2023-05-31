import React, { useState } from "react";
import axios from "axios";
import { Grid, Button, Box, FormGroup, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { mediumBold, xSmall, small } from "../../styles";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
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
      <Grid
        container
        direction="column"
        margin={5}
        alignItems="center"
        justify="center"
        border={1}
      >
        EventByLocation
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
        ) : (
          <div>
            {" "}
            {!isLoading
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
              : `No events in the ${city} ${zipCode}`}
          </div>
        )}
      </Grid>
    </div>
  );
}
