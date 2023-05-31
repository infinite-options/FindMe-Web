import React from "react";
import { Button, Grid, Paper } from "@mui/material";
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
      <Paper
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: 5,
          flexDirection: "column",
          flexGrow: 1,
          border: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        Find an Event
        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          style={{ width: "20rem" }}
          onClick={() => navigate("/findEventByDate")}
        >
          Find By Event Date
        </Button>
        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          style={{ width: "20rem" }}
          onClick={() => navigate("/event-byorganizer")}
        >
          Find By Organizer
        </Button>
        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          style={{ width: "20rem" }}
          onClick={() => navigate("/event-list")}
        >
          See Event List
        </Button>
        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          style={{ width: "20rem" }}
          onClick={() => navigate("/event-bylocation")}
        >
          Events in your location
        </Button>{" "}
        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          style={{ width: "20rem" }}
          onClick={() => {
            if (
              document.cookie !== "" &&
              document.cookie
                .split("; ")
                .find((row) => row.startsWith("loggedIn=")) !== undefined
            ) {
              document.cookie
                .split("; ")
                .find((row) => row.startsWith("loggedIn="))
                .split("=")[1] === "true"
                ? navigate("/current-rsvps", {
                    state: {
                      email: document.cookie
                        .split("; ")
                        .find((row) => row.startsWith("user_email="))
                        .split("=")[1],
                      user: document.cookie
                        .split("; ")
                        .find((row) => row.startsWith("user_details="))
                        .split("=")[1],
                    },
                  })
                : navigate("/login", { state: { path: "/current-rsvps" } });
            } else {
              navigate("/login", { state: { path: "/current-rsvps" } });
            }
          }}
        >
          See Current RSVPs
        </Button>
        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          style={{ width: "20rem" }}
          onClick={() => navigate("/event-bytype")}
        >
          Event By Type
        </Button>
      </Paper>
    </div>
  );
}
