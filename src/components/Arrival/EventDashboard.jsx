import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useAbly from "../../util/ably";
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
  const { eventObj, userObj } = location.state;
  const [eventStarted, setEventStarted] = useState(
    eventObj.event_status === "1"
  );
  const [showDialog, setShowDialog] = useState(false);
  const [message, setMessage] = useState("");
  const { publish } = useAbly(eventObj.event_uid);

  const handleShowRegistrationCode = () => {
    navigate("/showRegistrationCode", {
      state: { eventObj, userObj },
    });
  };

  const handleBroadcast = () => {
    publish(message);
    setShowDialog(false);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleStartEvent = async () => {
    const response = await axios.get(
      `${BASE_URL}/eventStatus?eventId=${eventObj.event_uid}&userId=${userObj.user_uid}`
    );
    if (!response.data.hasRegistered) {
      navigate("/preregistration-event/" + eventObj.event_registration_code, {
        state: { event: eventObj },
      });
      return;
    }
    await axios.put(
      `${BASE_URL}/eventStatus?eventId=${eventObj.event_uid}&eventStatus=1`
    );
    eventObj.event_status = "1";
    setEventStarted(true);
    handleClearStorage(["event", "user"]);
    localStorage.setItem("event", JSON.stringify(eventObj));
    localStorage.setItem("user", JSON.stringify(userObj));
    window.open("/networkingActivity", "_blank");
    publish("Event started");
    navigate(".", {
      state: { eventObj, userObj },
    });
  };

  const handleStopEvent = () => {
    setEventStarted(false);
    publish("Event ended");
    axios.put(
      `${BASE_URL}/eventStatus?eventId=${eventObj.event_uid}&eventStatus=0`
    );
    eventObj.event_status = "0";
    navigate(".", {
      state: { eventObj, userObj },
    });
  };

  const handleClearStorage = (items) => {
    items.forEach((item) => {
      localStorage.removeItem(item);
    });
  };

  return (
    <Box>
      <Typography
        variant="h2"
        className={classes.whiteText}
        onClick={() => navigate("/currentEvents")}
        gutterBottom
      >
        {"attend"}
      </Typography>
      <Typography variant="h4" className={classes.whiteText} align="center">
        {eventObj.event_title}
      </Typography>
      <Typography variant="h5" className={classes.whiteText} align="center">
        {new Date(eventObj.event_start_date).toLocaleString("default", {
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
        {`${eventObj.event_start_time.slice(0, -2)} - ${
          eventObj.event_end_time
        }`}
      </Typography>
      <Stack
        align="center"
        direction="column"
        spacing={5}
        sx={{
          py: 5,
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
              navigate("/eventRegistrants", {
                state: { eventObj, userObj },
              })
            }
          >
            {"View Registrants"}
          </Button>
          <Button
            className={classes.button}
            onClick={() =>
              navigate("/eventAttendees", {
                state: { eventObj, userObj },
              })
            }
          >
            {"View Attendees"}
          </Button>
          <Button
            className={classes.button}
            onClick={() =>
              navigate("/overallNetwork", {
                state: { eventObj, userObj },
              })
            }
          >
            {"View Network"}
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
