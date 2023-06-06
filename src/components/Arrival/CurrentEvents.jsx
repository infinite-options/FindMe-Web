import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MUIAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { styled } from "@mui/material/styles";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const StyledButton = styled(Button)(
  () => `
      width: 200px;
      align-self: center;
    `
);

const SlideTransition = (props) => {
  return <Slide {...props} direction="down" />;
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MUIAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CurrentEvents = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = location.state;
  const [events, setEvents] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const handleEventClick = async (event) => {
    const user_uid =
      typeof user === "string" ? JSON.parse(user).user_uid : user.user_uid;
    if (!user_uid) alert("User UID is undefined");
    const response = await axios.get(
      `${BASE_URL}/isOrganizer?userId=${user_uid}&eventId=${event.event_uid}`
    );
    if (response.data.isOrganizer) {
      navigate("/eventDashboard", {
        state: { event, user },
      });
    } else {
      const response = await axios.get(
        `${BASE_URL}/eventStatus?eventId=${event.event_uid}`
      );
      if (!response.data.eventStarted) setShowAlert(true);
      else {
        navigate("/attendeeCheckin", {
          state: { event, user },
        });
      }
    }
  };

  const fetchEventsByOrganizer = async () => {
    let user_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const response = await axios.get(`${BASE_URL}/currentEvents?timeZone=${user_timezone}`);
    setEvents(response.data.events);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowAlert(false);
  };

  useEffect(() => {
    fetchEventsByOrganizer();
  }, []);

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Snackbar
          open={showAlert}
          autoHideDuration={5000}
          onClose={handleAlertClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          TransitionComponent={SlideTransition}
        >
          <Alert onClose={handleAlertClose} severity="warning">
            {"Event has not started yet"}
          </Alert>
        </Snackbar>
        <Typography variant="h4" align="center" gutterBottom>
          {"Current events"}
        </Typography>
        <Stack
          sx={{
            bgcolor: "background.paper",
            border: 1,
            borderColor: "primary.main",
            borderRadius: "15px",
            padding: "10px",
          }}
          spacing={2}
          direction="column"
        >
          {events.map((event) => (
            <StyledButton
              key={event.event_uid}
              variant="contained"
              onClick={() => handleEventClick(event)}
            >
              {event.event_title + " " + event.event_start_date}
            </StyledButton>
          ))}
        </Stack>
      </Box>
    </Container>
  );
};

export default CurrentEvents;
