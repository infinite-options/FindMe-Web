import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ably from "../../config/ably";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

const Waiting = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { event, user } = location.state;

  const joinSubscribe = () => {
    const channel = ably.channels.get(`FindMe/${event.event_uid}`);
    channel.subscribe((e) => {
      if (e.data.message === "Event started") {
        navigate("/networking", { state: { event, user } });
      }
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
        </Stack>
      </Box>
    </Container>
  );
};

export default Waiting;
