import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const StyledButton = styled(Button)(
  () => `
      width: 200px;
      align-self: center;
    `
);

const CurrentEvents = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = location.state;
  const [events, setEvents] = useState([]);

  const handleEventClick = async (event) => {
    const response = await axios.get(
      `${BASE_URL}/isOrganizer?userId=${user.user_uid}&eventId=${event.event_uid}`
    );
    if (response.data.isOrganizer) {
      navigate("/eventDashboard", {
        state: { event, user },
      });
    } else {
      const response = await axios.get(
        `${BASE_URL}/eventStatus?eventId=${event.event_uid}`
      );
      if (!response.data.eventStarted) alert("Event has not started yet");
      else {
        navigate("/attendeeCheckin", {
          state: { event, user },
        });
      }
    }
  };

  const fetchEventsByOrganizer = async () => {
    const response = await axios.get(`${BASE_URL}/currentEvents`);
    setEvents(response.data.events);
  };

  useEffect(() => {
    fetchEventsByOrganizer();
  }, []);

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          {"Current events"}
        </Typography>
        <Stack
          sx={{
            bgcolor: "background.paper",
            border: 1,
            borderColor: "primary.main",
            borderRadius: "15px",
            padding: "10px",
          }}
          spacing={2}
          direction="column"
        >
          {events.map((event) => (
            <StyledButton
              key={event.event_uid}
              variant="contained"
              onClick={() => handleEventClick(event)}
            >
              {event.event_title + " " + event.event_start_date}
            </StyledButton>
          ))}
        </Stack>
      </Box>
    </Container>
  );
};

export default CurrentEvents;
