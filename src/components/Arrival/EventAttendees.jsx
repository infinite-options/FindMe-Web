import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ably from "../../config/ably";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import useStyles from "../../theming/styles";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const EventAttendees = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { event, user } = location.state;
  const [attendees, setAttendees] = useState([]);
  const channel = ably.channels.get(`FindMe/${event.event_uid}`);

  const handleClickAttendee = (attendee) => {
    navigate("/attendeeDetails", {
      state: { event, user, attendeeId: attendee.user_uid },
    });
  };

  const fetchAttendees = async () => {
    const response = await axios.get(
      `${BASE_URL}/eventAttendees?eventId=${event.event_uid}&attendFlag=1`
    );
    const data = response["data"];
    setAttendees(data["attendees"]);
  };

  const joinSubscribe = () => {
    channel.subscribe((e) => {
      if (e.data.message === "Activity started") {
        navigate("/networkingActivity", { state: { event, user } });
      }
      if (e.data.message === "New attendee") {
        fetchAttendees();
      }
    });
  };

  useEffect(() => {
    fetchAttendees();
    joinSubscribe();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h2" className={classes.whiteText} gutterBottom>
        {"attend"}
      </Typography>
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
      <Typography
        variant="h5"
        className={classes.whiteText}
        align="center"
        sx={{ my: 5 }}
      >
        {"Current Attendees"}
      </Typography>
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
    </Box>
  );
};

export default EventAttendees;
