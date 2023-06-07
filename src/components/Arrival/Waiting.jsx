import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ably from "../../config/ably";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import useStyles from "../../theming/styles";

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
  const channel = ably.channels.get(`FindMe/${event.event_uid}`);

  const handleCancel = () => {
    channel.presence.leaveClient(user.user_uid + event.event_uid, {
      user_uid: user.user_uid,
      name: user.first_name + " " + user.last_name,
    });
    navigate(-1, { state: { event } });
  };

  const joinSubscribe = () => {
    channel.subscribe((e) => {
      if (e.data.message === "Event started") {
        navigate("/networkingActivity", { state: { event, user } });
      }
    });
    channel.presence.enterClient(user.user_uid + event.event_uid, {
      user_uid: user.user_uid,
      name: user.first_name + " " + user.last_name,
    });
  };

  useEffect(() => {
    joinSubscribe();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Stack
        direction="column"
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        <Typography variant="h5" className={classes.whiteText} align="center">
          {event.event_title}
        </Typography>
        <Typography variant="h6" className={classes.whiteText} align="center">
          {event.event_start_date}
        </Typography>
        <Typography
          variant="h6"
          className={classes.whiteText}
          align="center"
          sx={{ fontKerning: "none" }}
        >
          {`${event.event_start_time.slice(0, -2)} - ${event.event_end_time}`}
        </Typography>
        <Typography
          variant="h5"
          className={classes.whiteText}
          align="center"
          sx={{ my: 4 }}
        >
          {"Waiting for host to start activity..."}
        </Typography>
        <CircularProgress disableShrink />
        <Button
          className={classes.button}
          onClick={handleCancel}
          sx={{ my: 4 }}
        >
          {"Cancel"}
        </Button>
      </Stack>
    </Box>
  );
};

export default Waiting;
