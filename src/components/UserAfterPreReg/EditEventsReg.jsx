import React, { useState } from "react";
import axios from "axios";
import { Button, Grid, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;
export default function EditEventsReg() {
  const navigate = useNavigate();
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
      eu_qas: questions,
    };
    axios.put(BASE_URL + "/EventUser", eventObj).then((response) => {
      console.log(response);
      navigate("/event-details", { state: { event: response.data.result[0] } });
    });
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
        // style={{ height: "30rem", width: "80rem" }}
        alignItems="center"
        justify="center"
        border={1}
      >
        <div
          style={{
            width: "50px",
            border: "1px solid red",
            padding: "1rem",
            margin: "1rem 1rem",
          }}
        >
          img
        </div>
        <div style={{ margin: "1rem 0rem" }}>{event.event_title}</div>
        <div style={{ margin: "1rem 0rem", textAlign: "center" }}>
          {event.event_description}
        </div>
        {event.event_start_time} - {event.event_end_time}
        {questions.map((quest, i) => {
          return (
            <div style={{ margin: "5px" }}>
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
          onClick={() => UpdateEventReg()}
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
      </Grid>
    </div>
  );
}
