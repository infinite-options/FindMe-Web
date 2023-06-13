import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Back from "../../Icons/Back.png";
import useStyles from "../../theming/styles";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const AttendeeDetails = () => {
  const classes = useStyles();
  const location = useLocation();
  const { event, user, attendeeId } = location.state;
  const navigate = useNavigate();
  const [registrant, setRegistrant] = useState({ images: "[]" });
  const [qas, setQas] = useState([]);

  const fetchRegistrantDetails = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/eventRegistrant?eventId=${event.event_uid}&registrantId=${attendeeId}`
      );
      const data = response["data"];
      setRegistrant(data.registrant);
      setQas(JSON.parse(data.registrant.eu_qas));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRegistrantDetails();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h5" className={classes.whiteText} align="center">
        {event.event_title}
      </Typography>
      <Typography variant="h6" className={classes.whiteText} align="center">
        {new Date(event.event_start_date).toLocaleString("default", {
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
        {`${event.event_start_time.slice(0, -2)} - ${event.event_end_time}`}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", mt: 4 }}>
        <Stack align="center" direction="column">
          <Avatar
            src={registrant.images.replace(/\\/g, "").slice(2, -2)}
            sx={{
              width: "150px",
              height: "150px",
              bgcolor: "#ff5722",
              alignSelf: "center",
            }}
            alt={registrant.first_name}
            sizes=""
          />
          <Typography
            align="center"
            variant="h6"
            className={classes.whiteText}
            sx={{ mt: 2 }}
          >
            {registrant.first_name + " " + registrant.last_name}
          </Typography>
          <Typography
            align="center"
            variant="h6"
            className={classes.whiteText}
            sx={{ mt: 2 }}
          >
            {registrant.title}
          </Typography>
          <Typography align="center" variant="h6" className={classes.whiteText}>
            {registrant.company}
          </Typography>
          <Typography
            align="center"
            variant="body1"
            className={classes.whiteText}
            sx={{ mt: 2 }}
          >
            {registrant.phone_number}
          </Typography>
          <Typography
            align="center"
            variant="body1"
            className={classes.whiteText}
          >
            {registrant.email}
          </Typography>
          <Typography
            align="center"
            variant="body1"
            className={classes.whiteText}
            sx={{ mt: 2 }}
          >
            {registrant.catch_phrase}
          </Typography>
        </Stack>
        {qas.map((qa) => (
          <Box
            key={qa.id}
            sx={{ display: "flex", flexDirection: "column", my: 2 }}
          >
            <Typography
              align="center"
              variant="body1"
              className={classes.whiteText}
              gutterBottom
            >
              {qa.question}
            </Typography>
            <Button className={classes.button} disabled>
              {qa.answer}
            </Button>
          </Box>
        ))}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", my: 4 }}>
        <Button
          className={classes.button}
          onClick={() => navigate(-1, { state: { event, user } })}
        >
          <img src={Back} style={{ width: "2rem" }} alt="back" />
          {"Back"}
        </Button>
      </Box>
    </Box>
  );
};

export default AttendeeDetails;
