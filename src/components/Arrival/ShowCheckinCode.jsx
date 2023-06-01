import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import QRCode from "qrcode";
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

const ShowCheckinCode = () => {
  const location = useLocation();
  const event = location.state;

  useEffect(() => {
    const canvas = document.getElementById("canvas");
    QRCode.toCanvas(canvas, event.event_checkin_code, (error) => {
      if (error) console.error(error);
    });
  }, []);

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          {event.event_title}
        </Typography>
        <Stack
          spacing={2}
          direction="column"
          align="center"
          sx={{
            bgcolor: "background.paper",
            border: 1,
            borderColor: "primary.main",
            borderRadius: "15px",
            padding: "10px",
          }}
        >
          <Typography variant="h5" gutterBottom>
            {"Check-in QR"}
          </Typography>
          <canvas id="canvas" style={{ alignSelf: "center" }} />
          <StyledButton variant="contained">{"Share QR"}</StyledButton>
          <Typography variant="h5" gutterBottom>
            {"Check-in code"}
          </Typography>
          <Typography variant="h5" gutterBottom>
            {event.event_registration_code}
          </Typography>
          <StyledButton variant="contained">{"Share code"}</StyledButton>
        </Stack>
      </Box>
    </Container>
  );
};

export default ShowCheckinCode;
