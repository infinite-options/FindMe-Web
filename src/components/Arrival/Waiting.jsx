import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ably from "../../config/ably";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)(
  () => `
      width: 200px;
      align-self: center;
    `
);

const Waiting = () => {
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
    channel.presence.leaveClient(user.user_uid, {
      user_uid: user.user_uid,
      name: user.first_name + " " + user.last_name,
    });
    navigate(-1);
  };

  const joinSubscribe = () => {
    channel.subscribe((e) => {
      if (e.data.message === "Event started") {
        navigate("/networkingActivity", { state: { event, user } });
      }
    });
    channel.presence.enterClient(user.user_uid, {
      user_uid: user.user_uid,
      name: user.first_name + " " + user.last_name,
    });
  };

  useEffect(() => {
    joinSubscribe();
  }, []);

  return (
    <Container maxWidth="sm">
      <Box component="form" noValidate autoComplete="off" sx={{ my: 4 }}>
        <Stack
          spacing={4}
          direction="column"
          sx={{ my: 4, justifyContent: "center", alignItems: "center" }}
        >
          <Typography variant="h4" gutterBottom>
            {event.event_title}
          </Typography>
          <Typography variant="h5" gutterBottom>
            {"Waiting for host to start activity..."}
          </Typography>
          <CircularProgress disableShrink />
          <StyledButton variant="contained" onClick={handleCancel}>
            {"Cancel"}
          </StyledButton>
        </Stack>
      </Box>
    </Container>
  );
};

export default Waiting;
