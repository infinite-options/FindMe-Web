import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ably from "../../config/ably";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import { orange, red } from "@mui/material/colors";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const StyledButton = styled(Button)(
  () => `
      width: 200px;
      align-self: center;
    `
);

const RedButton = styled(StyledButton)(({ theme }) => ({
  color: theme.palette.getContrastText(red[500]),
  backgroundColor: red[500],
  "&:hover": {
    backgroundColor: red[700],
  },
}));

const OrangeButton = styled(StyledButton)(({ theme }) => ({
  color: theme.palette.getContrastText(orange[500]),
  backgroundColor: orange[500],
  "&:hover": {
    backgroundColor: orange[700],
  },
}));

const EventDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = location.state;
  const event = location.state
    ? location.state.event
    : JSON.parse(localStorage.getItem("event"));
  const [eventStarted, setEventStarted] = useState(event.event_status === "1");
  const [activityStarted, setActivityStarted] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [message, setMessage] = useState("");
  const [attendeeMap, setAttendeeMap] = useState(new Map());
  const channel = ably.channels.get(`FindMe/${event.event_uid}`);

  const handleAttend = async () => {
    const user_uid =
      typeof user === "string" ? JSON.parse(user).user_uid : user.user_uid;
    const response = await axios.post(`${BASE_URL}/verifyCheckinCode`, {
      regCode: event.event_checkin_code,
      userId: user_uid,
      eventId: event.event_uid,
    });
    if (!response.data.hasRegistered)
      navigate("/preregistration-event/"+event.event_registration_code, { state: { event } });
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
    const channel = ably.channels.get(`FindMe/${event.event_uid}`);
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
    channel.presence.subscribe("enter", (member) => {
      console.log("Entered");
      console.log(member.data);
      const userObj = member.data;
      attendeeMap.set(userObj.user_uid, userObj.name);
      setAttendeeMap(new Map(attendeeMap));
    });
    channel.presence.subscribe("leave", (member) => {
      console.log("Left");
      console.log(member.data);
      const userObj = member.data;
      attendeeMap.delete(userObj.user_uid);
      setAttendeeMap(new Map(attendeeMap));
    });
  };

  useEffect(() => {
    presenceSubstribe();
  }, []);

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          {`${event.event_title} dashboard`}
        </Typography>
        <Stack
          align="center"
          direction="column"
          sx={{
            bgcolor: "background.paper",
            border: 1,
            borderColor: "primary.main",
            borderRadius: "15px",
            padding: "10px",
          }}
        >
          <Typography variant="h6" gutterBottom>
            {event.event_description}
          </Typography>
          <Typography variant="h6" gutterBottom>
            {event.event_type}
          </Typography>
          <Typography variant="h6" gutterBottom>
            {event.event_visibility}
          </Typography>
          <Typography variant="h6">
            {`Start: ${event.event_start_date} ${event.event_start_time}`}
          </Typography>
          <Typography variant="h6" gutterBottom>
            {`End: ${event.event_end_date} ${event.event_end_time}`}
          </Typography>
          <Typography variant="h6" gutterBottom>
            {`${event.event_location}, ${event.event_zip}`}
          </Typography>
          <Stack spacing={2}>
            {!eventStarted && (
              <StyledButton variant="contained" onClick={handleStartEvent}>
                {"Start Event"}
              </StyledButton>
            )}
            <StyledButton
              variant="contained"
              onClick={() =>
                navigate("/eventRegistrations", {
                  state: event,
                })
              }
            >
              {"View registrations"}
            </StyledButton>
            <StyledButton variant="contained" onClick={handleShowCheckinQRCode}>
              {"Show check-in QR/code"}
            </StyledButton>
            {eventStarted && (
              <Box sx={{ my: 5 }}>
                <Stack spacing={2} align="center" direction="column">
                  {activityStarted ? (
                    <>
                      <RedButton
                        variant="contained"
                        onClick={handleStopActivity}
                      >
                        {"Stop"}
                      </RedButton>
                      <OrangeButton
                        variant="contained"
                        onClick={() => setShowDialog(true)}
                      >
                        {"Broadcast"}
                      </OrangeButton>
                    </>
                  ) : (
                    <>
                      <StyledButton
                        variant="contained"
                        onClick={handleStartActivity}
                      >
                        {"Start Activity"}
                      </StyledButton>
                      <StyledButton variant="contained" onClick={handleAttend}>
                        {"Attend Activity"}
                      </StyledButton>
                    </>
                  )}
                </Stack>
              </Box>
            )}
          </Stack>
          <Box sx={{ display: "flex", flexDirection: "column", my: 4 }}>
            <Typography align="center" variant="h5" gutterBottom>
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
            <StyledButton variant="contained" onClick={handleBroadcast}>
              {"Send"}
            </StyledButton>
            <StyledButton
              variant="contained"
              onClick={() => setShowDialog(false)}
            >
              {"Cancel"}
            </StyledButton>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default EventDashboard;
