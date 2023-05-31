import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Button } from "@mui/material";

export default function OrganizerEventAgenda() {
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
            Event Agenda
          </Typography>
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            style={{ width: "50rem" }}
          >
            Intro
          </Button>
          <Button 
            variant="outlined" 
            sx={{ mt: 2 }} 
            style={{ width: "50rem" }} 
            >
            Networking
          </Button>
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            style={{ width: "50rem" }}
          >
            Main Event
          </Button>
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            style={{ width: "50rem" }}
            
          >
            Summary/Close
          </Button>
        </Grid>
      </div>
    </>
  );
}
