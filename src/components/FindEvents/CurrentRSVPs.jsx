import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, Box } from "@mui/material";
import { mediumBold, xSmall, small } from "../../styles";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

export default function CurrentRSVPs() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state.email;
  const user = state.user;
  const [events, setEvents] = useState([]);

  const getRSVPdEvents = () => {
    axios.get(BASE_URL + `/GetEventUser/${user.user_uid}`).then((response) => {
      setEvents(response.data.result);
    });
  };
  useEffect(() => {
    getRSVPdEvents();
  }, []);

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
        Current RSVPs
        {events.map((event) => {
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
              onClick={() =>
                navigate("/event-details", { state: { event: event } })
              }
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
        })}
      </Grid>
    </div>
  );
}
