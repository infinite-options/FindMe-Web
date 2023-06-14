import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAbly from "../../util/ably";
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
  const { addAttendee, isAttendeePresent } = useAbly(eventObj.event_uid);

  const handleEnterWaitingRoom = async () => {
    const response = await axios.get(
      `${BASE_URL}/eventStatus?eventId=${eventObj.event_uid}&userId=${userObj.user_uid}`
    );
    if (response.data.eventStarted === "1") {
      navigate("/networkingActivity", {
        state: { eventObj, userObj },
      });
    } else {
      navigate("/eventAttendees", {
        state: { eventObj, userObj },
      });
    }
  };

  const handleNewAttendee = async () => {
    await axios.put(
      `${BASE_URL}/eventAttend?userId=${userObj.user_uid}&eventId=${eventObj.event_uid}&attendFlag=1`
    );
    addAttendee(userObj.user_uid);
  };

  const validateAndRoute = async () => {
    const response = await axios.get(
      `${BASE_URL}/isOrganizer?userId=${userObj.user_uid}&eventId=${eventObj.event_uid}`
    );
    if (response.data.isOrganizer) {
      handleNewAttendee();
      navigate("/eventDashboard", {
        state: { eventObj, userObj },
      });
    } else {
      const response = await axios.get(
        `${BASE_URL}/eventStatus?eventId=${eventObj.event_uid}&userId=${userObj.user_uid}`
      );
      if (!response.data.hasRegistered) {
        navigate("/preregistration-event/" + eventObj.event_registration_code, {
          state: { event: eventObj },
        });
        return;
      }
      handleNewAttendee();
      isAttendeePresent(eventObj.event_organizer_uid, () => {
        if (response.data.eventStarted === "1") {
          navigate("/networkingActivity", {
            state: { eventObj, userObj },
          });
        } else {
          navigate("/waiting", {
            state: { eventObj, userObj },
          });
        }
      });
    }
  };

  useEffect(() => {
    validateAndRoute();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography
        variant="h2"
        className={classes.whiteText}
        onClick={() => navigate("/currentEvents")}
        gutterBottom
      >
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
