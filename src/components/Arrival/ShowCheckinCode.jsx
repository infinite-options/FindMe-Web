import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import QRCode from "qrcode";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import useStyles from "../../theming/styles";

const ShowCheckinCode = () => {
  const classes = useStyles();
  const location = useLocation();
  const event = location.state
    ? location.state.event
    : JSON.parse(localStorage.getItem("event"));

  useEffect(() => {
    const canvas = document.getElementById("canvas");
    QRCode.toCanvas(canvas, event.event_checkin_code, (error) => {
      if (error) console.error(error);
    });
  }, []);

  return (
    <Box>
      <Typography variant="h2" className={classes.whiteText} gutterBottom>
        {"attend"}
      </Typography>
      <Typography variant="h4" className={classes.whiteText} align="center">
        {event.event_title}
      </Typography>
      <Stack
        spacing={5}
        direction="column"
        align="center"
        sx={{
          pt: 5,
        }}
      >
        <Typography variant="h5" className={classes.whiteText} gutterBottom>
          {"Check-in QR"}
        </Typography>
        <canvas id="canvas" style={{ alignSelf: "center" }} />
        <Button className={classes.button}>{"Share QR"}</Button>
        <Typography variant="h5" className={classes.whiteText} gutterBottom>
          {"Check-in code"}
        </Typography>
        <Typography variant="h5" className={classes.whiteText} gutterBottom>
          {event.event_checkin_code}
        </Typography>
        <Button className={classes.button}>{"Share code"}</Button>
      </Stack>
    </Box>
  );
};

export default ShowCheckinCode;
