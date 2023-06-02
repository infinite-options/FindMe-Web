import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Grid, Button, Box } from "@mui/material";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

export default function PreRegQuestionnare() {
  const navigate = useNavigate();
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
        // style={{ height: "20rem", width: "80rem" }}
        alignItems="center"
        justify="center"
        border={1}
      >
        Pre Registeration
        <div>
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
                  <div>
                    <div>
                      <p style={{ maxWidth: "250px", wordWrap: "break-word" }}>
                        {quest.question}
                      </p>
                    </div>
                    <div>
                      <textarea
                        rows={15}
                        name="answer"
                        value={quest.answer}
                        style={{ width: "15rem" }}
                        onChange={(e) => handleChangeLater(e, i)}
                      ></textarea>
                    </div>
                  </div>
                );
              })}
              <Button
                variant="outlined"
                color="primary"
                style={{ margin: "2rem 0rem" }}
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
              <div>
                <p>{current.question}</p>
              </div>
              <div key={index}>
                <textarea
                  rows={15}
                  name="answer"
                  value={current.answer}
                  style={{ width: "15rem" }}
                  onChange={(e) => handleChange(e)}
                ></textarea>
              </div>
            </div>
          )}
        </div>
        {index == questions.length - 1 ? (
          <Button
            variant="outlined"
            color="primary"
            style={{
              margin: "2rem 0rem",
              display: showAllQuestions ? "none" : "",
            }}
            onClick={() => setShowAllQuestions(true)}
          >
            Next
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="primary"
            style={{ margin: "2rem 0rem" }}
            onClick={() => setIndex(index + 1)}
          >
            Next
          </Button>
        )}
      </Grid>
    </div>
  );
}
