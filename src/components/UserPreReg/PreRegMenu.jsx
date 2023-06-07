import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Button, Paper, Box, Stack } from "@mui/material";
import useStyles from "../../theming/styles";

export default function PreRegMenu() {
  const navigate = useNavigate();
  const classes = useStyles();
  return (
    <>
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
            <Button
              sx={{ mt: 2 }}
              className={classes.button}
              onClick={() => navigate("/registrationCode")}
            >
              {" "}
              Enter Registration Code{" "}
            </Button>
            <Button
              sx={{ mt: 2 }}
              className={classes.button}
              onClick={() => navigate("/findEventByDate")}
            >
              {" "}
              Find Event by Date{" "}
            </Button>
            <Button
              sx={{ mt: 2 }}
              className={classes.button}
              onClick={() => navigate("/event-byorganizer")}
            >
              {" "}
              Find Event by Organizer{" "}
            </Button>
            <Button
              sx={{ mt: 2 }}
              className={classes.button}
              onClick={() => navigate("/event-list")}
            >
              {" "}
              See Event List{" "}
            </Button>
            <Button
              sx={{ mt: 2 }}
              className={classes.button}
              onClick={() => navigate("/event-bylocation")}
            >
              {" "}
              See Events in Your Location{" "}
            </Button>
          </div>
        </Stack>
      </Box>
    </>
  );
}
