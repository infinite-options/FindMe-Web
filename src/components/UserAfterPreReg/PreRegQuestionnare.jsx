import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Grid, Button, Box, Stack, Typography, TextField } from "@mui/material";
import useStyles from "../../theming/styles";
import Next from "../../Icons/Next.svg";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

export default function PreRegQuestionnare() {
  const navigate = useNavigate();
  const classes = useStyles();
  const { state } = useLocation();
  const event = state.event;
  const [index, setIndex] = useState(0);
  const [showAllQuestions, setShowAllQuestions] = useState(0);
  const [questions, setQuestions] = useState(
    JSON.parse(event.pre_event_questionnaire)
  );
  const current = questions[index];

  const handleChange = (e, id) => {
    setQuestions((prevCards) =>
      prevCards.map((card, i) => {
        if (i === index) {
          return { ...card, [e.target.name]: e.target.value };
        } else {
          return card;
        }
      })
    );
  };
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

  const CreateEventReg = () => {
    let eventObj = {
      eu_user_id: "",
      eu_event_id: event.event_uid,
      eu_qas: JSON.stringify(questions),
    };
    if (
      document.cookie !== "" &&
      document.cookie.split("; ").find((row) => row.startsWith("loggedIn=")) !==
        undefined
    ) {
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("loggedIn="))
        .split("=")[1] === "true"
        ? navigate("/registration-confirmation", {
            state: {
              email: document.cookie
                .split("; ")
                .find((row) => row.startsWith("user_email="))
                .split("=")[1],
              user: document.cookie
                .split("; ")
                .find((row) => row.startsWith("user_details="))
                .split("=")[1],
              eventObj: eventObj,
            },
          })
        : navigate("/login", {
            state: {
              path: "/registration-confirmation",
              eventObj: eventObj,
            },
          });
    } else {
      navigate("/login", {
        state: {
          path: "/registration-confirmation",
          eventObj: eventObj,
        },
      });
    }
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Stack direction="row" justifyContent="flex-start" sx={{ mt: 2, p: 2 }}>
        <Typography variant="h2" className={classes.whiteText}>
          register
        </Typography>
      </Stack>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ mt: 2 }}
      >
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
        {showAllQuestions ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {questions.map((quest, i) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div>
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
            <Button
              className={classes.button}
              sx={{ mt: 2 }}
              onClick={() => CreateEventReg()}
              // onClick={() =>
              //   navigate("/login", {
              //     state: {
              //       path: "/registration-confirmation",
              //     },
              //   })
              // }
            >
              Confirm Answers
            </Button>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div sx={{ m: 1 }}>
              <Typography className={classes.whiteText}>
                {current.question}
              </Typography>
            </div>
            <div key={index}>
              <TextField
                multiline
                name="answer"
                value={current.answer}
                className={classes.textfieldMulti}
                onChange={(e) => handleChange(e)}
                rows={7}
              ></TextField>
            </div>
          </div>
        )}
      </Stack>
      <Stack
        direction="column"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 8 }}
      >
        {index == questions.length - 1 ? (
          <Button
            className={classes.button}
            style={{
              display: showAllQuestions ? "none" : "",
            }}
            onClick={() => setShowAllQuestions(true)}
          >
            Next &nbsp; &nbsp; <img src={Next} style={{ width: "2rem" }} />
          </Button>
        ) : (
          <Button
            className={classes.button}
            onClick={() => setIndex(index + 1)}
          >
            Next &nbsp; &nbsp; <img src={Next} style={{ width: "2rem" }} />
          </Button>
        )}
      </Stack>
    </Box>
  );
}
