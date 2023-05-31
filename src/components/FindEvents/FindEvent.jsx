import React from "react";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function FindEvent() {
  const navigate = useNavigate();
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
        style={{ height: "30rem", width: "80rem" }}
        alignItems="center"
        justify="center"
        border={1}
      >
        Find an Event
        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={() => navigate("/findEventByDate")}
        >
          Find By Event Date
        </Button>
        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={() => navigate("/event-byorganizer")}
        >
          Find By Organizer
        </Button>
        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={() => navigate("/event-list")}
        >
          See Event List
        </Button>
        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={() => navigate("/event-bylocation")}
        >
          Events in your location
        </Button>{" "}
        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={() =>
            navigate("/login", { state: { path: "/current-rsvps" } })
          }
        >
          See Current RSVPs
        </Button>
        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={() => navigate("/event-bytype")}
        >
          Event By Type
        </Button>
      </Grid>
    </div>
  );
}
