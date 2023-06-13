import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ably from "../../config/ably";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Highcharts from "../../config/networking";
import HighchartsReact from "highcharts-react-official";
import Snackbar from "@mui/material/Snackbar";
import MUIAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import NoUserImage from "../../Icons/NoUserImage.png";
import useStyles from "../../theming/styles";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const SlideTransition = (props) => {
  return <Slide {...props} direction="down" />;
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MUIAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NetworkingActivity = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const event = location.state
    ? location.state.event
    : JSON.parse(localStorage.getItem("event"));
  const user = location.state
    ? typeof location.state.user === "string"
      ? JSON.parse(location.state.user)
      : location.state.user
    : JSON.parse(localStorage.getItem("user"));
  const channel = ably.channels.get(`FindMe/${event.event_uid}`);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [options, setOptions] = useState({
    chart: {
      type: "networkgraph",
      height: 400,
      backgroundColor: "transparent",
    },
    title: {
      text: null,
    },
    plotOptions: {
      networkgraph: {
        keys: ["from", "to"],
        point: {
          events: {
            click(e) {
              handleNodeClick(e.point);
            },
          },
        },
      },
    },
    series: [
      {
        link: {
          width: 2,
          color: "white",
        },
        dataLabels: {
          enabled: false,
          linkFormat: "",
          allowOverlap: true,
        },
        id: "networking",
        data: [],
        nodes: [],
      },
    ],
    credits: {
      enabled: false,
    },
  });

  const handleNodeClick = (e) => {
    navigate("/attendeeDetails", {
      state: { event, user, attendeeId: e.id },
    });
  };

  const handleUserImage = (images) => {
    const imagesArr = JSON.parse(images);
    return imagesArr.length > 0 ? imagesArr[0] : NoUserImage;
  };

  const refreshGraph = async () => {
    const response = await axios.get(
      `${BASE_URL}/networkingGraph?eventId=${event.event_uid}&userId=${user.user_uid}`
    );
    const data = response["data"];
    let nodesArr = [];
    data["users"].forEach((u) => {
      nodesArr.push({
        id: u.user_uid,
        mass: u.graph_code,
        marker: {
          symbol: `url(${handleUserImage(u.images)})`,
          width: 50,
          height: 50,
        },
        name: `${u.first_name} is ${u.role}`,
        className: classes.circularImage,
      });
    });
    setOptions({
      series: [
        {
          data: data["links"],
          nodes: nodesArr,
        },
      ],
    });
  };

  const handleStopEvent = () => {
    axios.put(
      `${BASE_URL}/eventStatus?eventId=${event.event_uid}&eventStatus=0`
    );
  };

  const handleExitEvent = () => {
    axios.put(
      `${BASE_URL}/eventAttend?userId=${user.user_uid}&eventId=${event.event_uid}&attendFlag=0`
    );
  };

  const broadcastAndExitSubscribe = () => {
    channel.subscribe((e) => {
      if (e.data.message === "Event ended") {
        handleStopEvent();
        handleExitEvent();
        channel.detach();
        navigate("/");
      } else if (e.data.message === "New attendee") {
        refreshGraph();
      } else {
        setMessage(e.data.message);
        setShowAlert(true);
      }
    });
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowAlert(false);
  };

  const handleSeeAttendees = () => {
    navigate("/eventAttendees", { state: { event, user } });
  };

  useEffect(() => {
    refreshGraph();
    broadcastAndExitSubscribe();
    return () => channel.unsubscribe();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Snackbar
        open={showAlert}
        autoHideDuration={15000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={SlideTransition}
      >
        <Alert onClose={handleAlertClose} severity="info">
          {message}
        </Alert>
      </Snackbar>
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
      <Stack spacing={2} direction="column">
        <Typography align="center" variant="h5" gutterBottom>
          {event.name}
        </Typography>
        <HighchartsReact highcharts={Highcharts} options={options} />
        <Button className={classes.button} onClick={handleSeeAttendees}>
          {"See attendees"}
        </Button>
      </Stack>
    </Box>
  );
};

export default NetworkingActivity;
