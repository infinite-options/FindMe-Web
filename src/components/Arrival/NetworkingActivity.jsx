import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAbly from "../../util/ably";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Highcharts from "../../util/networking";
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
  const eventObj = location.state
    ? location.state.eventObj
    : JSON.parse(localStorage.getItem("event"));
  const userObj = location.state
    ? location.state.userObj
    : JSON.parse(localStorage.getItem("user"));
  const { onAttendeeUpdate, subscribe, unSubscribe, detach } = useAbly(
    eventObj.event_uid
  );
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [options, setOptions] = useState({
    chart: {
      type: "networkgraph",
      height: 400,
      backgroundColor: "transparent",
      margin: 25,
      reflow: false,
    },
    title: {
      text: null,
    },
    plotOptions: {
      networkgraph: {
        keys: ["from", "to"],
        layoutAlgorithm: {
          enableSimulation: false,
          linkLength: 50,
          initialPositions: "circle",
        },
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
      state: { eventObj, userObj, id: e.id },
    });
  };

  const handleUserImage = (images) => {
    const imagesArr = JSON.parse(images);
    return imagesArr.length > 0 ? imagesArr[0] : NoUserImage;
  };

  const refreshGraph = async () => {
    const response = await axios.get(
      `${BASE_URL}/networkingGraph?eventId=${eventObj.event_uid}&userId=${userObj.user_uid}`
    );
    const data = response["data"];
    let nodesArr = [];
    data["users"].forEach((u) => {
      nodesArr.push({
        id: u.user_uid,
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

  const handleExitEvent = () => {
    axios.put(
      `${BASE_URL}/eventAttend?userId=${userObj.user_uid}&eventId=${eventObj.event_uid}&attendFlag=0`
    );
  };

  const broadcastAndExitSubscribe = () => {
    onAttendeeUpdate((m) => {
      refreshGraph();
    });
    subscribe((e) => {
      if (e.data === "Event ended") {
        handleExitEvent();
        detach();
        navigate("/");
      } else {
        setMessage(e.data);
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
    navigate("/eventAttendees", { state: { eventObj, userObj } });
  };

  useEffect(() => {
    refreshGraph();
    broadcastAndExitSubscribe();
    return () => unSubscribe();
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
      <Stack spacing={2} direction="column">
        <Typography align="center" variant="h5" gutterBottom>
          {eventObj.name}
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
