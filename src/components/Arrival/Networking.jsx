import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ably from "../../config/ably";
import axios from "axios";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Highcharts from "../../config/networking";
import HighchartsReact from "highcharts-react-official";
import Snackbar from "@mui/material/Snackbar";
import MUIAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { styled } from "@mui/material/styles";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const StyledButton = styled(Button)(
  () => `
      width: 200px;
      align-self: center;
    `
);

const SlideTransition = (props) => {
  return <Slide {...props} direction="down" />;
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MUIAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Networking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { event, user } = location.state;
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [options, setOptions] = useState({
    chart: {
      type: "networkgraph",
      height: 400,
    },
    title: {
      text: null,
    },
    plotOptions: {
      networkgraph: {
        keys: ["from", "to"],
        layoutAlgorithm: {
          enableSimulation: true,
          friction: -0.9,
          integration: "euler",
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
    console.log(e);
  };

  const refreshGraph = async () => {
    const user_uid =
      typeof user === "string" ? JSON.parse(user).user_uid : user.user_uid;
    if (!user_uid) alert("User UID is undefined");
    const response = await axios.get(
      `${BASE_URL}/networkingGraph?eventId=${event.event_uid}&userId=${user_uid}`
    );
    const data = response["data"];
    let nodesArr = [];
    data["users"].forEach((u, i) => {
      nodesArr.push({
        id: u.user_uid,
        mass: u.graph_code,
        marker: {
          symbol: `url(profile-pic-${i}.webp)`,
          width: 50,
          height: 50,
        },
        name: `${u.first_name} is ${u.role}`,
        plotX: Math.random() * 500,
        plotY: Math.random() * 500,
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

  const broadcastAndExitSubscribe = () => {
    const channel = ably.channels.get(`FindMe/${event.event_uid}`);
    channel.subscribe((event) => {
      if (event.data.message === "Event ended") {
        alert("Event ended");
        channel.unsubscribe();
        navigate("/currentEvents", { state: { event, user } });
      } else {
        setMessage(event.data.message);
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

  useEffect(() => {
    refreshGraph();
    broadcastAndExitSubscribe();
  }, []);

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: "flex", flexDirection: "column", my: 4 }}>
        <Snackbar
          open={showAlert}
          autoHideDuration={5000}
          onClose={handleAlertClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          TransitionComponent={SlideTransition}
        >
          <Alert onClose={handleAlertClose} severity="info">
            {message}
          </Alert>
        </Snackbar>
        <Typography variant="h4" align="center" gutterBottom>
          {"Networking activity"}
        </Typography>
        <Stack spacing={2} direction="column">
          <Typography align="center" variant="h5" gutterBottom>
            {event.name}
          </Typography>
          <HighchartsReact highcharts={Highcharts} options={options} />
          <StyledButton
            variant="contained"
            onClick={() => navigate("/eventAttendees")}
          >
            {"See other attendees"}
          </StyledButton>
        </Stack>
      </Box>
    </Container>
  );
};

export default Networking;
