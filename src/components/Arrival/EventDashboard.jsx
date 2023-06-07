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
  const user = location.state
    ? location.state.user
    : JSON.parse(localStorage.getItem("user"));
  const [eventStarted, setEventStarted] = useState(event.event_status === "1");
  const [activityStarted, setActivityStarted] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [message, setMessage] = useState("");
  const [attendeeMap, setAttendeeMap] = useState(new Map());
  const channel = ably.channels.get(`FindMe/${event.event_uid}`);

  const handleAttend = async () => {
    const response = await axios.post(`${BASE_URL}/verifyCheckinCode`, {
      regCode: event.event_checkin_code,
      userId: user.user_uid,
      eventId: event.event_uid,
    });
    if (!response.data.hasRegistered)
      navigate("/preregistration-event/" + event.event_registration_code, {
        state: { event },
      });
    else {
      localStorage.setItem("event", JSON.stringify(event));
      localStorage.setItem("user", JSON.stringify(user));
      window.open("/waiting", "_blank");
    }
  };

  const handleShowCheckinQRCode = () => {
    localStorage.setItem("event", JSON.stringify(event));
    localStorage.setItem("user", JSON.stringify(user));
    window.open("/showCheckinCode", "_blank");
  };

  const handleBroadcast = () => {
    channel.publish({ data: { message } });
    setShowDialog(false);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleStartEvent = async () => {
    await axios.put(
      `${BASE_URL}/eventStatus?eventId=${event.event_uid}&eventStatus=1`
    );
    event.event_status = "1";
    setEventStarted(true);
    localStorage.setItem("event", JSON.stringify(event));
  };

  const handleStartActivity = () => {
    setActivityStarted(true);
    channel.publish({ data: { message: "Event started" } });
  };

  const handleStopActivity = () => {
    setActivityStarted(false);
    channel.publish({ data: { message: "Event ended" } });
  };

  const presenceSubstribe = () => {
    channel.presence.get((err, members) => {
      if (err) console.error("Ably error: " + err.message);
      members.forEach((member) => {
        const userObj = member.data;
        attendeeMap.set(userObj.user_uid, userObj.name);
        setAttendeeMap(new Map(attendeeMap));
      });
    });
    channel.presence.subscribe("enter", (member) => {
      const userObj = member.data;
      attendeeMap.set(userObj.user_uid, userObj.name);
      setAttendeeMap(new Map(attendeeMap));
    });
    channel.presence.subscribe("leave", (member) => {
      const userObj = member.data;
      attendeeMap.delete(userObj.user_uid);
      setAttendeeMap(new Map(attendeeMap));
    });
  };

  useEffect(() => {
    presenceSubstribe();
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
        {event.event_start_date}
      </Typography>
      <Typography variant="h5" className={classes.whiteText} align="center">
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
          {!eventStarted && (
            <Button className={classes.button} onClick={handleStartEvent}>
              {"Start Event"}
            </Button>
          )}
          <Button
            className={classes.button}
            onClick={() =>
              navigate("/eventRegistrations", {
                state: { event, user },
              })
            }
          >
            {"View registrations"}
          </Button>
          <Button className={classes.button} onClick={handleShowCheckinQRCode}>
            {"Show check-in QR/code"}
          </Button>
          {eventStarted && (
            <Box sx={{ my: 5 }}>
              <Stack spacing={5} align="center" direction="column">
                {activityStarted ? (
                  <>
                    <Button
                      className={classes.button}
                      onClick={handleStopActivity}
                    >
                      {"Stop"}
                    </Button>
                    <Button
                      className={classes.button}
                      onClick={() => setShowDialog(true)}
                    >
                      {"Broadcast"}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      className={classes.button}
                      onClick={handleStartActivity}
                    >
                      {"Start Activity"}
                    </Button>
                    <Button className={classes.button} onClick={handleAttend}>
                      {"Attend Activity"}
                    </Button>
                  </>
                )}
              </Stack>
            </Box>
          )}
        </Stack>
        <Box sx={{ display: "flex", flexDirection: "column", mt: 4 }}>
          <Typography
            align="center"
            variant="h5"
            className={classes.whiteText}
            gutterBottom
          >
            {"Attendees"}
          </Typography>
          <Stack
            sx={{
              bgcolor: "background.paper",
              border: 1,
              borderColor: "primary.main",
              borderRadius: "15px",
            }}
            direction="column"
          >
            {[...attendeeMap.keys()].map((k) => (
              <Button key={k} variant="text">
                {attendeeMap.get(k)}
              </Button>
            ))}
            {attendeeMap.size < 1 && (
              <Typography align="center" variant="h6" gutterBottom>
                {"No attendees!"}
              </Typography>
            )}
          </Stack>
        </Box>
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
