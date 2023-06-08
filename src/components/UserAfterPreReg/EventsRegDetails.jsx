import React from "react";
import { Grid, Button, Box, Stack, Typography, TextField } from "@mui/material";
import useStyles from "../../theming/styles";
import { useLocation, useNavigate } from "react-router-dom";
import NoImage from "../../Icons/NoImage.png";

export default function EventsRegDetails() {
  const navigate = useNavigate();
  const classes = useStyles();
  const { state } = useLocation();
  const event = state.event;
  console.log(event);
  console.log(JSON.parse(event.eu_qas));
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Stack direction="row" justifyContent="flex-start" sx={{ mt: 2, p: 2 }}>
        <Typography
          variant="h2"
          className={classes.whiteText}
          onClick={() => navigate("/")}
        >
          details
        </Typography>
      </Stack>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ mt: 2 }}
      >
        {JSON.parse(event.event_photo).length === 0 ? (
          <img
            style={{ width: "150px", height: "150px", borderRadius: "50%" }}
            src={NoImage}
          />
        ) : (
          <img
            src={`${JSON.parse(event.event_photo)}?${Date.now()}`}
            style={{ width: "150px", height: "150px", borderRadius: "50%" }}
          />
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            margin: "2rem 0rem",
          }}
        >
          <Typography variant="h4" className={classes.whiteText}>
            {event.event_title}
          </Typography>
          <Typography variant="h5" className={classes.whiteText}>
            {new Date(event.event_start_date).toLocaleString("default", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </Typography>
          <Typography variant="h5" className={classes.whiteText}>
            {event.event_start_time} - {event.event_end_time}
          </Typography>
        </div>
        {JSON.parse(event.eu_qas).map((quest, i) => {
          return (
            <div style={{ margin: "5px" }}>
              <div sx={{ m: 1 }}>
                <Typography
                  className={classes.whiteText}
                  style={{ maxWidth: "250px", wordWrap: "break-word" }}
                >
                  {quest.question}
                </Typography>
              </div>
              <div>
                <Box className={classes.events}>{quest.answer}</Box>
              </div>
            </div>
          );
        })}
      </Stack>{" "}
      <Stack
        direction="column"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 8 }}
      >
        {" "}
        <Button
          className={classes.button}
          sx={{ my: 1 }}
          onClick={() =>
            navigate("/edit-event", {
              state: {
                event: event,
              },
            })
          }
        >
          Edit Answers
        </Button>
      </Stack>
      <Stack
        direction="column"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 8, mb: 2 }}
      >
        <Button className={classes.button} onClick={() => navigate("/")}>
          Homepage
        </Button>
      </Stack>
    </Box>
  );
}
