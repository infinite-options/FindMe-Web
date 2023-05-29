import { useLocation, useNavigate } from "react-router-dom";
import Countdown from "react-countdown";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { orange, red } from "@mui/material/colors";

const RedButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(red[500]),
  backgroundColor: red[500],
  "&:hover": {
    backgroundColor: red[700],
  },
}));

const OrangeButton = styled(Button)(({ theme }) => ({
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

  const handleBroadcast = () => {
    navigate("/broadcastMessage");
  };

  const handleStop = () => {};

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
      <Box sx={{ my: 4 }}>
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
      <Box sx={{ my: 8 }}>
        <Typography variant="h4" gutterBottom>
          <Countdown date={Date.now() + 1800000} renderer={countdownRenderer} />
        </Typography>
      </Box>
      <Box sx={{ my: 4 }}>
        <Stack spacing={2} direction="column">
          <RedButton variant="contained" onClick={handleStop}>
            {"Stop"}
          </RedButton>
          <OrangeButton variant="contained" onClick={handleBroadcast}>
            {"Broadcast"}
          </OrangeButton>
        </Stack>
      </Box>
    </Container>
  );
};

export default NetworkingDashboard;
