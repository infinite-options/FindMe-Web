import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Back from "../../Icons/Back.png";
import useStyles from "../../theming/styles";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const EventRegistrations = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { event, user } = location.state;
  const [registrations, setRegistrations] = useState([]);

  const handleClickRegistration = (registration) => {
    navigate("/registrantDetails", {
      state: { event, user, registrantId: registration.user_uid },
    });
  };

  const handleBack = () => {
    navigate(-1, { state: { event } });
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
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h4" className={classes.whiteText} gutterBottom>
        {"registrations"}
      </Typography>
      <Typography variant="h4" className={classes.whiteText} align="center">
        {event.event_title}
      </Typography>
      <Stack
        sx={{
          mt: 5,
        }}
        direction="column"
      >
        {registrations.map((registration) => (
          <Typography
            key={registration.user_uid}
            align="center"
            variant="h6"
            className={classes.whiteText}
            onClick={() => handleClickRegistration(registration)}
            gutterBottom
          >
            {registration.first_name +
              " " +
              registration.last_name +
              "(" +
              registration.role +
              ")"}
          </Typography>
        ))}
        {registrations.length < 1 && (
          <Typography
            align="center"
            variant="h6"
            className={classes.whiteText}
            gutterBottom
          >
            {"No registrations"}
          </Typography>
        )}
      </Stack>
      <Box sx={{ display: "flex", flexDirection: "column", my: 4 }}>
        <Button className={classes.button} align="center" onClick={handleBack}>
          <img src={Back} style={{ width: "2rem" }} alt="back" />
          {"Back"}
        </Button>
      </Box>
    </Box>
  );
};

export default EventRegistrations;
