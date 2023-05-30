import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

const EventDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { event } = location.state;
  const [selectedId, setSelectedId] = useState();

  const hanldeOptionClick = (id, event) => {
    setSelectedId(id);
  };

  const handleStartClick = () => {
    switch (selectedId) {
      case 1:
        navigate("/eventAgenda");
        break;
      case 2:
        navigate("/introduction");
        break;
      case 3:
        navigate("/networkingDashboard", {
          state: event,
        });
        break;
      case 4:
        navigate("/eventAttendees", {
          state: event,
        });
        break;
      case 5:
        navigate("/showCheckinCode", {
          state: event,
        });
        break;
      default:
        break;
    }
  };

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
          <StyledButton
            variant={selectedId === 1 ? "outlined" : "text"}
            onClick={() => hanldeOptionClick(1, event)}
          >
            {"View/Edit agenda"}
          </StyledButton>
          <StyledButton
            variant={selectedId === 3 ? "outlined" : "text"}
            onClick={() => hanldeOptionClick(3, event)}
          >
            {"Networking"}
          </StyledButton>
          <StyledButton
            variant={selectedId === 4 ? "outlined" : "text"}
            onClick={() => hanldeOptionClick(4, event)}
          >
            {"View attendees"}
          </StyledButton>
          <StyledButton
            variant={selectedId === 5 ? "outlined" : "text"}
            onClick={() => hanldeOptionClick(5, event)}
          >
            {"Show check-in QR/code"}
          </StyledButton>
        </Stack>
      </Box>
      <Box sx={{ my: 4 }} align="center">
        <OrangeButton variant="contained" onClick={handleStartClick}>
          {"Enter"}
        </OrangeButton>
      </Box>
    </Container>
  );
};

export default EventDashboard;
