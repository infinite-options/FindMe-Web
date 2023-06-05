import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Grid, Button, Box } from "@mui/material";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

export default function PreRegistration() {
  const navigate = useNavigate();
  const { id } = useParams()
  const { state } = useLocation();
  const [event, setEvent] = useState({});

  useEffect(() => {
    if (state !== null) {
    setEvent(state.event);
  }
  else if (id !== null) {
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
          console.log("event result for registration code ",response.data.result.result[0]);
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
    console.log("&&&&& ",id);
  }
  else {
    // display event not found error
    console.log("&&&&& no id no state");
  }
  },[])

  const logProps = () => {
    console.log("&&&&& *** ",state);
  };
  logProps();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "5%",
      }}
    >
      <Grid
        container
        direction="column"
        margin={5}
        alignItems="center"
        justify="center"
        border={1}
      >
        {" "}
        <div style={{ margin: "1rem 0rem" }}> You are Pregistering for</div>
        <Box style={{ margin: "2rem 0rem" }}>{event.event_title}</Box>
        <div style={{ margin: "1rem 0rem", textAlign: "center" }}>
          {event.event_description}
        </div>
        {event.event_start_time} - {event.event_end_time}

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Button
          variant="outlined"
          style={{ margin: "2rem 0rem" }}
          onClick={() =>
            navigate(-1)
          }
        >
          Back
        </Button>
        <Button
          variant="outlined"
          style={{ margin: "2rem 0rem" }}
          onClick={() =>
            navigate("/registration-questionnare", { state: { event: event } })
          }
        >
          Next
        </Button>
        </Grid>

      </Grid>
    </div>
  );
}
