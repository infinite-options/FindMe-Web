import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useAbly from "../../util/ably";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
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

const EventAttendees = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { eventObj, userObj } = location.state;
  const [attendees, setAttendees] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const { onAttendeeUpdate, subscribe, unSubscribe } = useAbly(
    eventObj.event_uid
  );

  const handleClickAttendee = (attendee) => {
    navigate("/attendeeDetails", {
      state: { eventObj, userObj, id: attendee.user_uid },
    });
  };

  const fetchAttendees = async () => {
    const response = await axios.get(
      `${BASE_URL}/eventAttendees?eventId=${eventObj.event_uid}&attendFlag=1`
    );
    const data = response["data"];
    setAttendees(data["attendees"]);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowAlert(false);
  };

  const joinSubscribe = () => {
    onAttendeeUpdate((m) => {
      fetchAttendees();
    });
    subscribe((e) => {
      if (e.data === "Event started") {
        navigate("/networkingActivity", { state: { eventObj, userObj } });
      } else {
        setMessage(e.data);
        setShowAlert(true);
      }
    });
  };

  useEffect(() => {
    fetchAttendees();
    joinSubscribe();
    return () => unSubscribe();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Snackbar
        open={showAlert}
        autoHideDuration={15000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={SlideTransition}
      >
        <Alert onClose={handleAlertClose} severity="info">
          {message}
        </Alert>
      </Snackbar>
      <Typography
        variant="h2"
        className={classes.whiteText}
        onClick={() => navigate(-1, { state: { eventObj, userObj } })}
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
      <Typography
        variant="h5"
        className={classes.whiteText}
        align="center"
        sx={{ my: 5 }}
      >
        {"Current Attendees"}
      </Typography>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        alignItems="center"
        sx={{ minHeight: "30vh" }}
      >
        {attendees.map((attendee) => (
          <Grid key={attendee.user_uid} item xs={4}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Avatar
                src={JSON.parse(attendee.images)[0]}
                sx={{
                  width: "80px",
                  height: "80px",
                  bgcolor: "#ff5722",
                  alignSelf: "center",
                }}
                alt={attendee.first_name}
                onClick={() => handleClickAttendee(attendee)}
              />
              <Typography className={classes.whiteText} align="center">
                {attendee.first_name}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default EventAttendees;
