import React, { useState } from "react";
import axios from "axios";
import { Grid, Button, Box, Stack, Typography, TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import useStyles from "../../theming/styles";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;
export default function EditEventsReg() {
  const navigate = useNavigate();
  const classes = useStyles();
  const { state } = useLocation();
  const event = state.event;
  const [questions, setQuestions] = useState(JSON.parse(event.eu_qas));
  const handleChangeLater = (e, ind) => {
    // console.log(ind);
    setQuestions((prevCards) =>
      prevCards.map((card, i) => {
        // console.log(i, ind);
        if (i === ind) {
          // console.log("===");
          // console.log(e.target.name, e.target.value);
          return { ...card, [e.target.name]: e.target.value };
        } else {
          return card;
        }
        // console.log(card);
      })
    );
  };
  const UpdateEventReg = () => {
    let eventObj = {
      event_user_uid: event.event_user_uid,
      eu_qas: JSON.stringify(questions),
    };
    axios.put(BASE_URL + "/EventUser", eventObj).then((response) => {
      console.log(response);
      navigate("/event-details", { state: { event: response.data.result[0] } });
    });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Stack direction="row" justifyContent="flex-start" sx={{ mt: 2, p: 2 }}>
        <Typography variant="h2" className={classes.whiteText}>
          edit
        </Typography>
      </Stack>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ mt: 2 }}
      >
        <img
          src={`${JSON.parse(event.event_photo)}?${Date.now()}`}
          style={{ width: "150px", height: "150px", borderRadius: "50%" }}
        />
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
        {questions.map((quest, i) => {
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
                <TextField
                  multiline
                  name="answer"
                  value={quest.answer}
                  className={classes.textfieldMulti}
                  onChange={(e) => handleChangeLater(e, i)}
                  rows={7}
                ></TextField>
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
        <Button
          className={classes.button}
          sx={{ my: 1 }}
          onClick={() => UpdateEventReg()}
        >
          Confirm Answers
        </Button>
      </Stack>
    </Box>
  );
}
