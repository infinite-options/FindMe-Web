import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, Button, Box } from "@mui/material";
export default function PreRegistration() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const event = state.event;
  console.log(event);
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
        <Button
          variant="outlined"
          color="info"
          style={{ margin: "2rem 0rem" }}
          onClick={() =>
            navigate("/registration-questionnare", { state: { event: event } })
          }
        >
          Next
        </Button>
      </Grid>
    </div>
  );
}
