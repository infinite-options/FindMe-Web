import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Grid, Box, Paper, Typography, ButtonBase } from "@mui/material";
import { mediumBold, xSmall, small } from "../../styles";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function CurrentRSVPs() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state.email;
  const user = state.user;
  let user_uid =
    typeof user === "string" ? JSON.parse(user).user_uid : user.user_uid;
  const [events, setEvents] = useState([]);

  const getRSVPdEvents = () => {
    axios.get(BASE_URL + `/GetEventUser/${user_uid}`).then((response) => {
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
        Current RSVPs
        {events.map((event) => {
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
                navigate("/event-details", { state: { event: event } });
              }}
            >
              <Grid item>
                <ButtonBase
                  sx={{ width: 128, height: 128, border: "1px solid red" }}
                >
                  <Img alt="complex" src="/static/images/grid/complex.jpg" />
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
        })}
      </Paper>
    </div>
  );
}
