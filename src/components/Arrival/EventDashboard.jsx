import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ably from "../../config/ably";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useStyles from "../../theming/styles";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const EventDashboard = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const event = location.state
    ? location.state.event
    : JSON.parse(localStorage.getItem("event"));
  const user =
    typeof location.state.user === "string"
      ? JSON.parse(location.state.user)
      : location.state.user;
  const [eventStarted, setEventStarted] = useState(event.event_status === "1");
  const [showDialog, setShowDialog] = useState(false);
  const [message, setMessage] = useState("");
  const channel = ably.channels.get(`FindMe/${event.event_uid}`);

  const handleShowRegistrationCode = () => {
    localStorage.setItem("event", JSON.stringify(event));
    localStorage.setItem("user", JSON.stringify(user));
    window.open("/showRegistrationCode", "_blank");
  };

  const handleBroadcast = () => {
    channel.publish({ data: { message } });
    setShowDialog(false);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleStartEvent = async () => {
    const response = await axios.get(
      `${BASE_URL}/eventStatus?eventId=${event.event_uid}&userId=${user.user_uid}`
    );
    if (!response.data.hasRegistered) {
      navigate("/preregistration-event/" + event.event_registration_code, {
        state: { event },
      });
      return;
    }
    await axios.put(
      `${BASE_URL}/eventStatus?eventId=${event.event_uid}&eventStatus=1`
    );
    event.event_status = "1";
    setEventStarted(true);
    localStorage.setItem("event", JSON.stringify(event));
    localStorage.setItem("user", JSON.stringify(user));
    channel.publish({ data: { message: "Event started" } });
    window.open("/networkingActivity", "_blank");
  };

  const handleStopEvent = () => {
    setEventStarted(false);
    channel.publish({ data: { message: "Event ended" } });
    event.event_status = "0";
    localStorage.setItem("event", JSON.stringify(event));
    axios.put(
      `${BASE_URL}/eventStatus?eventId=${event.event_uid}&eventStatus=0`
    );
  };

  const handleOrganizerAttend = () => {
    axios.put(
      `${BASE_URL}/eventAttend?userId=${user.user_uid}&eventId=${event.event_uid}&attendFlag=1`
    );
    channel.presence.enterClient(user.user_uid + event.event_uid);
  };

  useEffect(() => {
    handleOrganizerAttend();
  }, []);

  return (
    <Box>
      <Typography variant="h2" className={classes.whiteText} gutterBottom>
        {"attend"}
      </Typography>
      <Typography variant="h4" className={classes.whiteText} align="center">
        {event.event_title}
      </Typography>
      <Typography variant="h5" className={classes.whiteText} align="center">
        {new Date(event.event_start_date).toLocaleString("default", {
          month: "short",
          day: "numeric",
        })}
      </Typography>
      <Typography
        variant="h5"
        className={classes.whiteText}
        align="center"
        sx={{ fontKerning: "none" }}
      >
        {`${event.event_start_time.slice(0, -2)} - ${event.event_end_time}`}
      </Typography>
      <Stack
        align="center"
        direction="column"
        spacing={5}
        sx={{
          pt: 5,
        }}
      >
        <Stack spacing={5}>
          <Button
            className={classes.button}
            onClick={handleShowRegistrationCode}
          >
            {"Registration code"}
          </Button>
          <Button
            className={classes.button}
            onClick={() =>
              navigate("/eventAttendees", {
                state: { event, user },
              })
            }
          >
            {"View Attendees"}
          </Button>
          <Button
            className={classes.button}
            onClick={() => setShowDialog(true)}
          >
            {"Broadcast"}
          </Button>
          {eventStarted && (
            <Box sx={{ my: 5 }}>
              <Button className={classes.button} onClick={handleStopEvent}>
                {"Stop Event"}
              </Button>
            </Box>
          )}
        </Stack>
        {!eventStarted && (
          <Button className={classes.button} onClick={handleStartEvent}>
            {"Start Event"}
          </Button>
        )}
        <Button className={classes.button} onClick={() => navigate("/")}>
          {"Home Page"}
        </Button>
      </Stack>
      <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
        <DialogTitle>{"Broadcast message"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="broadcast"
            label="Enter message here..."
            type="text"
            fullWidth
            variant="standard"
            value={message}
            onChange={handleMessageChange}
          />
        </DialogContent>
        <DialogActions>
          <Button className={classes.button} onClick={handleBroadcast}>
            {"Send"}
          </Button>
          <Button
            className={classes.button}
            onClick={() => setShowDialog(false)}
          >
            {"Cancel"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EventDashboard;
