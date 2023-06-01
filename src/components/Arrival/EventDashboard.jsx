import { useState } from "react";
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
  const { event, user } = location.state;
  const [eventStarted, setEventStarted] = useState(false);
  const [activityStarted, setActivityStarted] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [message, setMessage] = useState("");

  const handleAttend = () => {
    localStorage.setItem("event", JSON.stringify(event));
    localStorage.setItem("user", JSON.stringify(user));
    window.open("/waiting", "_blank");
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
  };

  const handleStartActivity = () => {
    setActivityStarted(true);
    const channel = ably.channels.get(`FindMe/${event.event_uid}`);
    channel.publish({ data: { message: "Event started" } });
  };

  const handleStopActivity = () => {
    setActivityStarted(false);
    const channel = ably.channels.get(`FindMe/${event.event_uid}`);
    channel.publish({ data: { message: "Event ended" } });
  };

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
                navigate("/eventAttendees", {
                  state: event,
                })
              }
            >
              {"View attendees"}
            </StyledButton>
            <StyledButton
              variant="contained"
              onClick={handleShowCheckinQRCode}
            >
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
                    <StyledButton
                      variant="contained"
                      onClick={handleStartActivity}
                    >
                      {"Start Activity"}
                    </StyledButton>
                  )}
                  <StyledButton variant="contained" onClick={handleAttend}>
                    {"Attend Activity"}
                  </StyledButton>
                </Stack>
              </Box>
            )}
          </Stack>
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
