import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

const EventRegistrations = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const event = location.state;
  const [registrations, setRegistrations] = useState([]);

  const handleClickAttendee = (attendee) => {
    navigate("/attendeeDetails", { state: attendee });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const fetchRegistrations = async () => {
    const response = await axios.get(
      `${BASE_URL}/eventAttendees?eventId=${event.event_uid}`
    );
    const data = response["data"];
    setRegistrations(data["attendees"]);
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: "flex", flexDirection: "column", my: 4 }}>
        <Typography align="center" variant="h4" gutterBottom>
          {"Registrations"}
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
          {registrations.map((registration) => (
            <Button
              key={registration.user_uid}
              variant="text"
              onClick={() => handleClickAttendee(registration)}
            >
              {registration.first_name + " " + registration.last_name}
            </Button>
          ))}
          {registrations.length < 1 && (
            <Typography align="center" variant="h6" gutterBottom>
              {"No registrations"}
            </Typography>
          )}
        </Stack>
        <Box sx={{ display: "flex", flexDirection: "column", my: 4 }}>
          <StyledButton variant="contained" align="center" onClick={handleBack}>
            {"Back"}
          </StyledButton>
        </Box>
      </Box>
    </Container>
  );
};

export default EventRegistrations;
