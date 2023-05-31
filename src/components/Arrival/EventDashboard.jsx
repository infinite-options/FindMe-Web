import { useLocation, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)(
  () => `
      width: 200px;
      align-self: center;
    `
);

const EventDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { event, user } = location.state;

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
            <StyledButton
              variant="contained"
              onClick={() => navigate("/eventAgenda")}
            >
              {"View/Edit agenda"}
            </StyledButton>
            <StyledButton
              variant="contained"
              onClick={() =>
                navigate("/networkingDashboard", {
                  state: { event, user },
                })
              }
            >
              {"Networking"}
            </StyledButton>
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
              onClick={() =>
                navigate("/showCheckinCode", {
                  state: event,
                })
              }
            >
              {"Show check-in QR/code"}
            </StyledButton>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
};

export default EventDashboard;
