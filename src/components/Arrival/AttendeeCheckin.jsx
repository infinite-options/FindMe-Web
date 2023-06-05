import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { QrReader } from "react-qr-reader";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const StyledButton = styled(Button)(
  () => `
      width: 200px;
      align-self: center;
    `
);

const AttendeeCheckin = () => {
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
        navigate("/preregistration-event/"+event.event_registration_code, { state: { event } });
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
    <Container maxWidth="sm">
      <Box component="form" noValidate autoComplete="off" sx={{ my: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          {"Attendee check-in"}
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
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
            <StyledButton variant="contained" onClick={handleOnSubmit}>
              {"Enter"}
            </StyledButton>
            {!displayQRScanner && (
              <StyledButton
                variant="contained"
                onClick={handleDisplayQRScanner}
              >
                {"Scan QR code"}
              </StyledButton>
            )}
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default AttendeeCheckin;
