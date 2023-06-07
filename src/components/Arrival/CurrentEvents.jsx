import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MUIAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import useStyles from "../../theming/styles";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const SlideTransition = (props) => {
  return <Slide {...props} direction="down" />;
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MUIAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CurrentEvents = () => {
  const classes = useStyles();
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
    let user_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const response = await axios.get(
      `${BASE_URL}/currentEvents?timeZone=${user_timezone}`
    );
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
    <Box>
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
      <Typography variant="h2" className={classes.whiteText} gutterBottom>
        {"attend"}
      </Typography>
      <Stack
        sx={{
          pt: 5,
        }}
        spacing={2}
        direction="column"
      >
        {events.map((event) => (
          <Button
            key={event.event_uid}
            onClick={() => handleEventClick(event)}
            className={classes.button}
            sx={{ py: 5 }}
          >
            {event.event_title + " " + event.event_start_date}
          </Button>
        ))}
        {events.length < 1 && (
          <Typography
            align="center"
            variant="h6"
            className={classes.whiteText}
            gutterBottom
          >
            {"No current events"}
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default CurrentEvents;
