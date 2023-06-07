import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { QrReader } from "react-qr-reader";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import useStyles from "../../theming/styles";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const AttendeeCheckin = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { event, user } = location.state;
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [regCode, setRegCode] = useState("");
  const [displayQRScanner, setDisplayQRScanner] = useState(false);

  const handleRegCodeChange = (e) => {
    setRegCode(e.target.value);
    setError(false);
    setHelperText("");
  };

  const handleOnSubmit = async () => {
    const user_uid =
      typeof user === "string" ? JSON.parse(user).user_uid : user.user_uid;
    if (!user_uid) alert("User UID is undefined");
    try {
      const response = await axios.post(`${BASE_URL}/verifyCheckinCode`, {
        regCode: regCode,
        userId: user_uid,
        eventId: event.event_uid,
      });
      if (!response.data.hasRegistered)
        navigate("/preregistration-event/" + event.event_registration_code, {
          state: { event },
        });
      else navigate("/waiting", { state: { event, user } });
    } catch (error) {
      setError(true);
      setHelperText(error.response.data.message);
    }
  };

  const handleDisplayQRScanner = () => {
    setDisplayQRScanner(true);
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <Typography variant="h5" className={classes.whiteText} align="center">
        {event.event_title}
      </Typography>
      <Typography variant="h6" className={classes.whiteText} align="center">
        {event.event_start_date}
      </Typography>
      <Typography variant="h6" className={classes.whiteText} align="center">
        {`${event.event_start_time.slice(0, -2)} - ${event.event_end_time}`}
      </Typography>
      <Typography
        variant="h5"
        className={classes.whiteText}
        align="center"
        sx={{ mt: 2 }}
        gutterBottom
      >
        {"Attendee check-in"}
      </Typography>
      <Typography
        variant="h6"
        className={classes.whiteText}
        align="center"
        gutterBottom
      >
        {"Enter event checkin code"}
      </Typography>
      <Box sx={{ my: 4 }}>
        <Stack spacing={2} direction="column">
          <TextField
            error={error}
            value={regCode}
            onChange={handleRegCodeChange}
            placeholder="Enter code here..."
            helperText={helperText}
            className={classes.textfield}
            sx={{ alignSelf: "center" }}
          />
          {displayQRScanner && (
            <QrReader
              onResult={(result) => {
                if (result) setRegCode(result.text);
              }}
              constraints={{
                facingMode: "environment",
              }}
              videoStyle={{ width: "", height: "" }}
            />
          )}
          <Button className={classes.button} onClick={handleOnSubmit}>
            {"Enter"}
          </Button>
          {!displayQRScanner && (
            <Button className={classes.button} onClick={handleDisplayQRScanner}>
              {"Scan QR code"}
            </Button>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default AttendeeCheckin;
