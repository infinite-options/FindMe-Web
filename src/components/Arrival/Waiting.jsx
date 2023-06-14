import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import useStyles from "../../theming/styles";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const Waiting = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { eventObj, userObj } = location.state;
  const [orgProfile, setOrgProfile] = useState({ images: "[]" });

  const fetchOrganizerProfile = async () => {
    const response = await axios.get(
      `${BASE_URL}/profileByUserUID?userId=${eventObj.event_organizer_uid}`
    );
    setOrgProfile(response.data.profile);
  };

  const handleAttend = async () => {
    const response = await axios.get(
      `${BASE_URL}/eventStatus?eventId=${eventObj.event_uid}&userId=${userObj.user_uid}`
    );
    if (response.data.eventStarted === "1") {
      navigate("/networkingActivity", {
        state: { eventObj, userObj },
      });
    } else {
      navigate("/eventAttendees", {
        state: { eventObj, userObj },
      });
    }
  };

  useEffect(() => {
    fetchOrganizerProfile();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography
        variant="h2"
        className={classes.whiteText}
        onClick={() => navigate("/currentEvents")}
        gutterBottom
      >
        {"attend"}
      </Typography>
      <Typography variant="h5" className={classes.whiteText} align="center">
        {eventObj.event_title}
      </Typography>
      <Typography variant="h6" className={classes.whiteText} align="center">
        {new Date(eventObj.event_start_date).toLocaleString("default", {
          month: "short",
          day: "numeric",
        })}
      </Typography>
      <Typography
        variant="h6"
        className={classes.whiteText}
        align="center"
        sx={{ fontKerning: "none" }}
      >
        {`${eventObj.event_start_time.slice(0, -2)} - ${
          eventObj.event_end_time
        }`}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", my: 18 }}>
        <Typography
          variant="h5"
          className={classes.whiteText}
          align="center"
          sx={{ mb: 2 }}
        >
          {"Waiting for the host"}
        </Typography>
        <Avatar
          src={JSON.parse(orgProfile.images)[0]}
          sx={{
            width: "150px",
            height: "150px",
            bgcolor: "#ff5722",
            alignSelf: "center",
          }}
          alt={orgProfile.first_name}
          sizes=""
        />
      </Box>
      <Button className={classes.button} onClick={handleAttend}>
        {"Attend"}
      </Button>
    </Box>
  );
};

export default Waiting;
