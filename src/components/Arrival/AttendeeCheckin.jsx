import * as React from "react";
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

const StyledButton = styled(Button)(
  () => `
      width: 200px;
      align-self: center;
    `
);

const AttendeeCheckin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state;
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
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v2/eventByRegCode?regCode=${regCode}&userId=${user.user_uid}`
      );
      const event = response["data"];
      navigate("/networking", { state: event });
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
        <Typography variant="h4" gutterBottom>
          {"Enter registration code"}
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
