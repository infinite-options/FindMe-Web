import { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import ably from "../../config/ably";
import Countdown from "react-countdown";
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

const NetworkingDashboard = () => {
  const location = useLocation();
  const { event } = location.state;
  const [hasStarted, setStarted] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [message, setMessage] = useState("");
  const countdownRef = useRef();

  const handleBroadcast = () => {
    const channel = ably.channels.get(`FindMe/${event.event_uid}`);
    channel.publish({ data: { message } });
    setShowDialog(false);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleStarted = () => {
    setStarted(true);
    countdownRef.current.start();
    const channel = ably.channels.get(`FindMe/${event.event_uid}`);
    channel.publish({ data: { message: "Event started" } });
  };

  const handleStop = () => {
    setStarted(false);
    countdownRef.current.stop();
    const channel = ably.channels.get(`FindMe/${event.event_uid}`);
    channel.publish({ data: { message: "Event ended" } });
  };

  const countdownRenderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      handleStop();
      return <span>{"Event ended!"}</span>;
    } else {
      return (
        <span>
          {minutes}:{seconds}
        </span>
      );
    }
  };

  return (
    <Container maxWidth="sm">
      <Stack spacing={4} direction="column" sx={{ my: 4 }} align="center">
        <Box>
          <Typography variant="h4" gutterBottom>
            {event.event_title}
          </Typography>
          <Typography variant="h4" gutterBottom>
            {"Networking"}
          </Typography>
          <Stack spacing={2} direction="column">
            <Typography variant="h5" gutterBottom>
              {"Duration: 30:00 min"}
            </Typography>
          </Stack>
        </Box>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" gutterBottom>
            <Countdown
              date={Date.now() + 1800000}
              renderer={countdownRenderer}
              autoStart={false}
              ref={countdownRef}
            />
          </Typography>
        </Box>
        <Box>
          <Stack spacing={2} direction="column">
            {!hasStarted && (
              <StyledButton variant="contained" onClick={handleStarted}>
                {"Start"}
              </StyledButton>
            )}
            {hasStarted && (
              <>
                <RedButton variant="contained" onClick={handleStop}>
                  {"Stop"}
                </RedButton>
                <OrangeButton
                  variant="contained"
                  onClick={() => setShowDialog(true)}
                >
                  {"Broadcast"}
                </OrangeButton>
              </>
            )}
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
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default NetworkingDashboard;
