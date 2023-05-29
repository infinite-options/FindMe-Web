import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { orange } from "@mui/material/colors";

const StyledButton = styled(Button)(
  () => `
      width: 200px;
      align-self: center;
    `
);

const OrangeButton = styled(StyledButton)(({ theme }) => ({
  color: theme.palette.getContrastText(orange[500]),
  backgroundColor: orange[500],
  "&:hover": {
    backgroundColor: orange[700],
  },
}));

const OrganizerDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state;
  const [selected, setSelected] = useState({ id: -1 });
  const [events, setEvents] = useState([]);

  const handleEventClick = (event) => {
    setSelected(event);
  };

  const fetchEventsByOrganizer = async () => {
    const response = await axios.get(
      `http://localhost:4000/api/v2/GetEvents?event_organizer_uid=${user.user_uid}`
    );
    setEvents(response.data.result);
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
        <Stack spacing={2} direction="column">
          {events.map((event) => (
            <StyledButton
              key={event.event_uid}
              variant={
                selected.event_uid === event.event_uid ? "outlined" : "text"
              }
              onClick={() => handleEventClick(event)}
            >
              {event.event_title}
            </StyledButton>
          ))}
        </Stack>
      </Box>
      <Box sx={{ my: 4 }}>
        <Stack spacing={2} direction="column">
          <StyledButton variant="contained">{"Edit"}</StyledButton>
          <OrangeButton
            variant="contained"
            onClick={() => navigate("/eventDashboard", { state: selected })}
          >
            {"Start"}
          </OrangeButton>
        </Stack>
      </Box>
    </Container>
  );
};

export default OrganizerDashboard;
