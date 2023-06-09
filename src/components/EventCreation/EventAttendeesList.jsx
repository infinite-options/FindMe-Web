import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Grid, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import Back from "../../Icons/Back.png";
import useStyles from "../../theming/styles";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const StyledButton = styled(Button)(
  () => `
      width: 200px;
      align-self: center;
    `
);

const EventAttendeesList = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  //   const location = useLocation();
  //   const event = location.state;
  const retrievedEventObject = localStorage.getItem("event") === null ? {} : JSON.parse(localStorage.getItem("event"));
  const [attendees, setAttendees] = useState([]);

  const handleClickAttendee = (attendee) => {
    // navigate("/attendeeDetails", { state: attendee });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const fetchAttendees = async () => {
    const response = await axios.get(
      `${BASE_URL}/eventAttendees?eventId=${retrievedEventObject.event_uid}`
    );
    const data = response["data"];
    console.log(data);
    setAttendees(data["attendees"]);
  };

  useEffect(() => {
    if (retrievedEventObject && retrievedEventObject.event_uid) {
      fetchAttendees();
    } else setAttendees([]);
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Stack
          direction="row"
          justifyContent="flex-start"
          sx={{ mt :2}}
        >
      <Typography variant="h2" className={classes.whiteText} gutterBottom>
        edit
      </Typography>
      </Stack>
      <Stack
          direction="row"
          justifyContent="center"
          sx={{ mt :2}}
        >
          <Typography variant="h4" className={classes.whiteText}>
            {retrievedEventObject.eventTitle}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
        >
          <Typography variant="h5" className={classes.whiteText}>
            {new Date(retrievedEventObject.eventStartDate).toLocaleString('default', { month: 'short', day: 'numeric' })}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
        >
          <Typography variant="h5" className={classes.whiteText}>
            {retrievedEventObject.eventStartTime} - {retrievedEventObject.eventEndTime}
          </Typography>
      </Stack>
      <Stack
          direction="row"
          justifyContent="center"
          sx={{ mt :5}}
      >
        <Typography variant="h5" className={classes.whiteText}>
          Current Attendees
        </Typography>
        </Stack>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          alignItems="center"
          sx={{ minHeight: "30vh" }}
        >
          {attendees.map((attendee) => (
            <Grid key={attendee.user_uid} item xs={4}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Avatar
                  src={attendee.images.replace(/\\/g, "").slice(2, -2)}
                  sx={{
                    width: "80px",
                    height: "80px",
                    bgcolor: "#ff5722",
                    alignSelf: "center",
                  }}
                  alt={attendee.first_name}
                  onClick={() => handleClickAttendee(attendee)}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      <Box sx={{ display: "flex", flexDirection: "column", my: 4 }}>
        <Button className={classes.button} align="center" onClick={handleBack}>
          <img src={Back} style={{ width: "2rem" }} alt="back" />
          {"Back"}
        </Button>
      </Box>
    </Box>
  );
};

export default EventAttendeesList;
