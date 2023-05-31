import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Button, Paper } from "@mui/material";

export default function Welcome() {
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
            Welcome to Find Me!{" "}
          </Typography>
          <Typography sx={{ mt: 2 }}> What do you want to do : </Typography>
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            style={{ width: "20rem" }}
            onClick={() => navigate("/pre-registration")}
          >
            {" "}
            Pre-register{" "}
          </Button>
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            style={{ width: "20rem" }}
            onClick={() =>
              navigate("/login", { state: { path: "/currentEvents" } })
            }
          >
            {" "}
            Arrive at Event{" "}
          </Button>
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            style={{ width: "20rem" }}
            onClick={() => navigate("/find-event")}
          >
            {" "}
            Find an Event{" "}
          </Button>
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            style={{ width: "20rem" }}
            onClick={() => {
              if (document.cookie !== "") {
                document.cookie
                  .split("; ")
                  .find((row) => row.startsWith("loggedIn="))
                  .split("=")[1] === "true"
                  ? navigate("/organizerEventList", {
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
                  : navigate("/login", {
                      state: { path: "/organizerEventList" },
                    });
              } else {
                navigate("/login", {
                  state: { path: "/organizerEventList" },
                });
              }
            }}
          >
            {" "}
            Create/Edit an Event{" "}
          </Button>
          <Typography variant="small" sx={{ mt: 2 }}>
            {" "}
            Disclaimer : We use cookies{" "}
          </Typography>
        </Paper>
      </div>
    </>
  );
}
