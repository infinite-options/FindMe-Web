import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Button } from "@mui/material";

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
        <Grid
          container
          direction="column"
          margin={5}
          style={{ height: "30rem", width: "80rem" }}
          alignItems="center"
          justify="center"
          border={1}
        >
          <Typography variant="h5" sx={{ mt: 2 }}>
            {" "}
            Welcome to Find Me!{" "}
          </Typography>
          <Typography sx={{ mt: 2 }}> What do you want to do : </Typography>
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            style={{ width: "50rem" }}
            onClick={() => navigate("/pre-registration")}
          >
            {" "}
            Pre-register{" "}
          </Button>
          <Button 
            variant="outlined" 
            sx={{ mt: 2 }} 
            style={{ width: "50rem" }} 
            onClick={() =>
              navigate("/login", { state: { path: "/currentEvents" } })
            }>
            {" "}
            Arrive at Event{" "}
          </Button>
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            style={{ width: "50rem" }}
            onClick={() => navigate("/find-event")}
          >
            {" "}
            Find an Event{" "}
          </Button>
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            style={{ width: "50rem" }}
            onClick={() =>
              navigate("/login", { state: { path: "/eventTypeMenu" } })
            }
          >
            {" "}
            Create/Edit an Event{" "}
          </Button>
          <Typography variant="small" sx={{ mt: 2 }}>
            {" "}
            Disclaimer : We use cookies{" "}
          </Typography>
        </Grid>
      </div>
    </>
  );
}
