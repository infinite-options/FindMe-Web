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

const Networking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { event, user } = location.state;
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
    const response = await axios.get(
      `http://localhost:4000/api/v2/networkingGraph?eventId=${event.event_uid}&userId=${user.user_uid}`
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
        navigate("/currentEvents", { state: { event, user } });
      }
      if (event.data.message[0] === "Broadcast") {
        alert(event.data.message[1]);
      }
    });
  };

  useEffect(() => {
    refreshGraph();
    broadcastAndExitSubscribe();
  }, []);

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" gutterBottom>
          {"Networking activity"}
        </Typography>
        <Stack spacing={2} direction="column">
          <Typography variant="h5" gutterBottom>
            {event.name}
          </Typography>
          <HighchartsReact highcharts={Highcharts} options={options} />
          <Button
            variant="contained"
            onClick={() => navigate("/eventAttendees")}
          >
            {"See other attendees"}
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default Networking;
