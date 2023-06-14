import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import QRCode from "../QRCode/QRCode";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import useStyles from "../../theming/styles";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const ShowRegistrationCode = () => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const { eventObj } = location.state;

  const sendEmail = () => {
    axios.post(BASE_URL + "/SendEventDetails", eventObj);
  };

  return (
    <Box>
      <Typography
        variant="h2"
        className={classes.whiteText}
        onClick={() => navigate(-1)}
        gutterBottom
      >
        {"attend"}
      </Typography>
      <Typography variant="h4" className={classes.whiteText} align="center">
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
      <Typography
        variant="h4"
        className={classes.whiteText}
        align="center"
        sx={{ mt: 5 }}
      >
        {"Registration Code"}
      </Typography>
      <Stack direction="row" justifyContent="center" sx={{ mt: 5 }}>
        <Typography
          variant="h4"
          className={classes.whiteText}
          onClick={() => {
            navigate(
              "/preregistration-event/" + eventObj.event_registration_code
            );
          }}
        >
          {eventObj.event_registration_code}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="center" sx={{ mt: 5 }}>
        <QRCode
          route={"/preregistration-event/"}
          event_registration_code={eventObj.event_registration_code}
        ></QRCode>
      </Stack>
      <Stack direction="row" justifyContent="center" sx={{ mt: 5 }}>
        <Button className={classes.button} onClick={sendEmail}>
          {"Send Email"}
        </Button>
      </Stack>
    </Box>
  );
};

export default ShowRegistrationCode;
