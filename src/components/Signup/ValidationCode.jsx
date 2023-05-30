import React, { useState } from "react";
import axios from "axios";
import { Grid, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ReactCodeInput from "react-code-input";

const codeInputStyle = {
  borderRadius: "6px",
  border: "1px solid",
  boxShadow: "0px 0px 10px 0px rgba(0,0,0,.10)",
  margin: "4px",
  padding: "0 0 0 10px",
  width: "60px",
  height: "46px",
  fontSize: "32px",
  boxSizing: "border-box",
};

export default function ValidationCode() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const user_uid = state.user_uid;
  const path = state.path;
  const eventObj = state.eventObj !== undefined ? state.eventObj : "";
  const email = state.email;
  const user = state.user;
  const [code, setCode] = useState("");
  const [valid, setValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState(true);

  function handleChange(code) {
    setCode(code);
  }

  function submitButton() {
    let input = {
      user_uid: user_uid,
      code: code,
    };
    axios
      .post(
        "https://mrle52rri4.execute-api.us-west-1.amazonaws.com/dev/api/v2/CheckEmailValidationCode/FINDME",
        input
      )
      .then((response) => {
        if (response.data.email_validated_status === "...") {
          setErrorMessage(response.data.message);
        } else if (response.data.email_validated_status === "TRUE") {
          navigate("/email-signup-form", {
            state: {
              user_uid: user_uid,
              eventObj: eventObj,
              path: path,
            },
          });
        }
      });
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "5%",
      }}
    >
      {" "}
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        border={1}
        margin={5}
      >
        Enter Code
        <div style={{ margin: "2rem 0rem", textAlign: "center" }}>
          We just sent a code to your email address.
          <br /> Please enter the code below
        </div>
        <ReactCodeInput
          type="number"
          inputStyle={codeInputStyle}
          fields={3}
          onChange={handleChange}
        />
        <Button
          variant="outlined"
          style={{ margin: "2rem 0rem" }}
          onClick={submitButton}
        >
          Enter
        </Button>
        {errorMessage}
      </Grid>
    </div>
  );
}
