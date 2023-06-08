import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
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

const Waiting = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state
    ? location.state.user
    : JSON.parse(localStorage.getItem("user"));
  const event = location.state
    ? location.state.event
    : JSON.parse(localStorage.getItem("event"));
  const [orgProfile, setOrgProfile] = useState({ images: "[]" });
  const [showAlert, setShowAlert] = useState(false);

  const fetchOrganizerProfile = async () => {
    const response = await axios.get(
      `${BASE_URL}/profileByUserUID?userId=${event.event_organizer_uid}`
    );
    setOrgProfile(response.data.profile);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowAlert(false);
  };

  const handleAttend = async () => {
    navigate("/eventAttendees", {
      state: { event, user },
    });
  };

  useEffect(() => {
    fetchOrganizerProfile();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
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
      <Typography variant="h5" className={classes.whiteText} align="center">
        {event.event_title}
      </Typography>
      <Typography variant="h6" className={classes.whiteText} align="center">
        {new Date(event.event_start_date).toLocaleString("default", {
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
        {`${event.event_start_time.slice(0, -2)} - ${event.event_end_time}`}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", my: 18 }}>
        <Typography
          variant="h5"
          className={classes.whiteText}
          align="center"
          sx={{ mb: 2 }}
        >
          {"Waiting for the host"}
        </Typography>
        <Avatar
          src={orgProfile.images.replace(/\\/g, "").slice(2, -2)}
          sx={{
            width: "150px",
            height: "150px",
            bgcolor: "#ff5722",
            alignSelf: "center",
          }}
          alt={orgProfile.first_name}
          sizes=""
        />
      </Box>
      <Button className={classes.button} onClick={handleAttend}>
        {"Attend"}
      </Button>
    </Box>
  );
};

export default Waiting;
