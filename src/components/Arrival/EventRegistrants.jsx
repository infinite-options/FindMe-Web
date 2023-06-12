import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import useStyles from "../../theming/styles";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

const EventRegistrants = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { event, user } = location.state;
  const [registrants, setRegistrants] = useState([]);

  const handleBack = () => {
    navigate(-1, {
      state: { event, user },
    });
  };

  const handleClickRegistrant = (attendee) => {
    navigate("/attendeeDetails", {
      state: { event, user, attendeeId: attendee.user_uid },
    });
  };

  const fetchRegistrants = async () => {
    const response = await axios.get(
      `${BASE_URL}/eventAttendees?eventId=${event.event_uid}`
    );
    const data = response["data"];
    setRegistrants(data["attendees"]);
  };

  useEffect(() => {
    fetchRegistrants();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography
        variant="h2"
        className={classes.whiteText}
        onClick={handleBack}
        gutterBottom
      >
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
        {registrants.map((registrant) => (
          <Grid key={registrant.user_uid} item xs={4}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <LightTooltip title={registrant.first_name} arrow>
                <Avatar
                  src={JSON.parse(registrant.images)[0]}
                  sx={{
                    width: "80px",
                    height: "80px",
                    bgcolor: "#ff5722",
                    alignSelf: "center",
                  }}
                  alt={registrant.first_name}
                  onClick={() => handleClickRegistrant(registrant)}
                />
              </LightTooltip>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default EventRegistrants;
