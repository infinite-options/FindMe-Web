import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Grid, Button, Box, Stack, Typography } from "@mui/material";
import axios from "axios";
import useStyles from "../../theming/styles";
import Back from "../../Icons/Back.png";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

export default function PreRegistration() {
  const navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams();
  const { state } = useLocation();
  const [event, setEvent] = useState({});

  useEffect(() => {
    if (state !== null) {
      setEvent(state.event);
    } else if (id !== null) {
      // API call - get event by id
      // set event variable
      const verifyRegCode = () => {
        axios
          .get(BASE_URL + `/verifyRegCode/${id}`)
          .then((response) => {
            if (
              response.data.result.result.length !== 0 &&
              response.data.result.result[0] !== undefined
            ) {
              setEvent(response.data.result.result[0]);
              console.log(
                "event result for registration code ",
                response.data.result.result[0]
              );
              // navigate("/preregistration-event", {
              //   state: { event: response.data.result.result[0] },
              // });
            } else {
              window.alert("Invalid registration code");
              console.log("Invalid registration code");
            }
          })
          .catch((error) => {
            console.log(error);
            console.log("Invalid Code");
          });
      };
      verifyRegCode();
      console.log("&&&&& ", id);
    } else {
      // display event not found error
      console.log("&&&&& no id no state");
    }
  }, []);

  const logProps = () => {
    console.log("&&&&& *** ", state);
  };
  logProps();
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Stack direction="row" justifyContent="flex-start" sx={{ mt: 2, p: 2 }}>
        <Typography
          variant="h2"
          className={classes.whiteText}
          onClick={() => navigate(-1)}
        >
          register
        </Typography>
      </Stack>
      <Stack
        direction="column"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 2 }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h4" className={classes.whiteText}>
            {event.event_title}
          </Typography>
          <Typography variant="h5" className={classes.whiteText}>
            {new Date(event.event_start_date).toLocaleString("default", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </Typography>
          <Typography variant="h5" className={classes.whiteText}>
            {event.event_start_time} - {event.event_end_time}
          </Typography>
          <Typography
            variant="h5"
            className={classes.whiteText}
            style={{ cursor: "pointer" }}
          >
            <a
              onClick={() => {
                window.open(
                  `http://maps.google.com/maps?q=${event.event_location}`,
                  "_blank"
                );
              }}
              target="_blank"
            >
              {event.event_location}
            </a>
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography className={classes.whiteText}>
            {event.event_description}
          </Typography>
        </div>
      </Stack>
      <Stack
        direction="column"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 12 }}
      >
        <Button
          className={classes.button}
          onClick={() =>
            navigate("/registration-questionnare", {
              state: { event: event },
            })
          }
        >
          Register
        </Button>
      </Stack>
    </Box>
  );
}
