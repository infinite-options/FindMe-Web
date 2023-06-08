import React from "react";
import { Grid, Typography, Button, Paper, Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useStyles from "../../theming/styles";
export default function FindEvent() {
  const navigate = useNavigate();
  const classes = useStyles();
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Stack direction="row" justifyContent="flex-start" sx={{ mt: 2, p: 2 }}>
        <Typography
          variant="h2"
          className={classes.whiteText}
          onClick={() => navigate(-1)}
        >
          find
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
          {" "}
          <Button
            sx={{ mt: 2 }}
            className={classes.button}
            onClick={() => navigate("/event-list")}
          >
            See Event List
          </Button>
          <Button
            sx={{ mt: 2 }}
            className={classes.button}
            onClick={() => navigate("/findEventByDate")}
          >
            Find By Event Date
          </Button>
          <Button
            sx={{ mt: 2 }}
            className={classes.button}
            onClick={() => navigate("/event-byorganizer")}
          >
            Find By Organizer
          </Button>
          <Button
            sx={{ mt: 2 }}
            className={classes.button}
            onClick={() => navigate("/event-bylocation")}
          >
            Events in Your Location
          </Button>{" "}
          <Button
            sx={{ mt: 2 }}
            className={classes.button}
            onClick={() => navigate("/event-bytype")}
          >
            Event By Type
          </Button>
          <Button
            sx={{ mt: 2 }}
            className={classes.button}
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
        </div>
      </Stack>
    </Box>
  );
}
