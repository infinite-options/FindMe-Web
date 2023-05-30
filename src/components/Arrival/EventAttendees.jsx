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

const EventAttendees = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const event = location.state;
  const [attendees, setAttendees] = useState([]);

  const handleClickAttendee = (attendee) => {
    navigate("/attendeeDetails", { state: attendee });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const fetchAttendees = async () => {
    const response = await axios.get(
      `${BASE_URL}/eventAttendees?eventId=${event.event_uid}`
    );
    const data = response["data"];
    setAttendees(data["attendees"]);
  };

  useEffect(() => {
    fetchAttendees();
  }, []);

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: "flex", flexDirection: "column", my: 4 }}>
        <Typography align="center" variant="h4" gutterBottom>
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
          {attendees.map((attendee) => (
            <Button
              key={attendee.user_uid}
              variant="text"
              onClick={() => handleClickAttendee(attendee)}
            >
              {attendee.first_name + " " + attendee.last_name}
            </Button>
          ))}
          {!attendees && (
            <Typography align="center" variant="h4" gutterBottom>
              {"No attendees"}
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

export default EventAttendees;
