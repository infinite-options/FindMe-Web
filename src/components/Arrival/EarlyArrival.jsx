import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useStyles from "../../theming/styles";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const EarlyArrival = () => {
  const classes = useStyles();
  const location = useLocation();
  const { eventObj, user } = location.state;
  const userObj = typeof user === "string" ? JSON.parse(user) : user;
  const navigate = useNavigate();

  const handleEnterWaitingRoom = async () => {
    navigate("/waiting", { state: { event: eventObj, user } });
  };

  const validateAndRoute = async () => {
    const response = await axios.get(
      `${BASE_URL}/isOrganizer?userId=${userObj.user_uid}&eventId=${eventObj.event_uid}`
    );
    if (response.data.isOrganizer) {
      navigate("/eventDashboard", {
        state: { event: eventObj, user },
      });
    } else {
      const response = await axios.get(
        `${BASE_URL}/eventStatus?eventId=${eventObj.event_uid}&userId=${userObj.user_uid}`
      );
      if (!response.data.hasRegistered) {
        navigate("/preregistration-event/" + eventObj.event_registration_code, {
          state: { event: eventObj },
        });
      } else if (response.data.eventStarted) {
        navigate("/activityWaiting", {
          state: { event: eventObj, user },
        });
      }
    }
  };

  useEffect(() => {
    validateAndRoute();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h2" className={classes.whiteText} gutterBottom>
        {"attend"}
      </Typography>
      <Typography variant="h5" className={classes.whiteText} align="center">
        {eventObj.event_title}
      </Typography>
      <Typography variant="h6" className={classes.whiteText} align="center">
        {new Date(eventObj.event_start_date).toLocaleString("default", {
          month: "short",
          day: "numeric",
        })}
      </Typography>
      <Typography
        variant="h6"
        className={classes.whiteText}
        align="center"
        sx={{ fontKerning: "none" }}
      >
        {`${eventObj.event_start_time.slice(0, -2)} - ${
          eventObj.event_end_time
        }`}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", my: 25 }}>
        <Typography variant="h5" className={classes.whiteText} align="center">
          {"Event has not started"}
        </Typography>
      </Box>
      <Button className={classes.button} onClick={handleEnterWaitingRoom}>
        {"Enter Waiting Room"}
      </Button>
    </Box>
  );
};

export default EarlyArrival;
