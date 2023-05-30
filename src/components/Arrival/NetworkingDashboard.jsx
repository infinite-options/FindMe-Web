import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ably from "../../config/ably";
import Countdown from "react-countdown";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
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
  const navigate = useNavigate();
  const location = useLocation();
  const event = location.state;
  const [hasStarted, setStarted] = useState(false);
  const countdownRef = useRef();

  const handleStarted = () => {
    setStarted(true);
    countdownRef.current.start();
    const channel = ably.channels.get(`FindMe/${event.event_uid}`);
    channel.publish({ data: { message: "Event started" } });
  };

  const handleBroadcast = () => {
    navigate("/broadcastMessage");
  };

  const handleStop = () => {
    setStarted(false);
    countdownRef.current.stop();
    const channel = ably.channels.get(`FindMe/${event.event_uid}`);
    channel.publish({ data: { message: "Event ended" } });
  };

  const countdownRenderer = ({ minutes, seconds, completed }) => {
    if (completed) {
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
                <OrangeButton variant="contained" onClick={handleBroadcast}>
                  {"Broadcast"}
                </OrangeButton>
              </>
            )}
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default NetworkingDashboard;
