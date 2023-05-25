import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Button, Box } from "@mui/material";

export default function PreRegQuestionnare() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [showAllQuestions, setShowAllQuestions] = useState(0);
  const [questions, setQuestions] = useState([
    { id: 1, question: "What Help Do You Need?", answer: "" },
    { id: 2, question: "What is your Area of Expertise?", answer: "" },
    { id: 3, question: "If you had a magic wand...", answer: "" },
    { id: 4, question: "Trivia Question", answer: "" },
  ]);
  const current = questions[index];

  const handleChange = (e) => {
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
    console.log(ind);
    setQuestions((prevCards) =>
      prevCards.map((card, i) => {
        console.log(i, ind);
        if (i === ind) {
          console.log("===");
          console.log(e.target.name, e.target.value);
          return { ...card, [e.target.name]: e.target.value };
        } else {
          return card;
        }
        console.log(card);
      })
    );
  };
  console.log(questions);
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
                      <p>{quest.question}</p>
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
                onClick={() =>
                  navigate("/login", {
                    state: {
                      path: "/registration-confirmation",
                    },
                  })
                }
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
              <div>
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
