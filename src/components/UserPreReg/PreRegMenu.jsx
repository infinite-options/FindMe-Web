import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Button, Paper } from "@mui/material";

export default function PreRegMenu() {
  const navigate = useNavigate();
  return (
    <>
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
          <Typography variant="h5" sx={{ mt: 2 }}>
            {" "}
            Pre-registration{" "}
          </Typography>
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            style={{ width: "20rem" }}
            onClick={() => navigate("/registrationCode")}
          >
            {" "}
            Enter Registration Code{" "}
          </Button>
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            style={{ width: "20rem" }}
            onClick={() => navigate("/findEventByDate")}
          >
            {" "}
            Find Event by Date{" "}
          </Button>
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            style={{ width: "20rem" }}
            onClick={() => navigate("/event-byorganizer")}
          >
            {" "}
            Find Event by Organizer{" "}
          </Button>
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            style={{ width: "20rem" }}
            onClick={() => navigate("/event-list")}
          >
            {" "}
            See Event List{" "}
          </Button>
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            style={{ width: "20rem" }}
            onClick={() => navigate("/event-bylocation")}
          >
            {" "}
            See Events in your location{" "}
          </Button>
        </Paper>
      </div>
    </>
  );
}
