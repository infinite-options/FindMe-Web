import React, { useState } from "react";
import axios from "axios";
import * as ReactBootStrap from "react-bootstrap";
import {
  Grid,
  Button,
  FormControl,
  FormGroup,
  FormControlLabel,
  TextField,
  FormLabel,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import UserAlreadyExistsModal from "./UserAlreadyExistsModal";
import { formatPhoneNumber } from "../../helper";
import { red, boldSmall } from "../../styles";

export default function EmailSignup() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const path = state.path;
  const eventObj = state.eventObj !== undefined ? state.eventObj : "";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [signupSuccessful, setSignupSuccessful] = useState(false);
  const [userAlreadyExists, setUserAlreadyExists] = useState(false);
  const onCancel = () => {
    setUserAlreadyExists(false);
  };
  const required =
    errorMessage === "Please fill out all fields" ? (
      <span style={red} className="ms-1">
        *
      </span>
    ) : (
      ""
    );
  const submitForm = async () => {
    if (email === "" || password === "" || confirmPassword === "") {
      setErrorMessage("Please fill out all fields");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords must match");
      return;
    } else if (password === confirmPassword) {
      setErrorMessage("");
    }
    setShowSpinner(true);
    const user = {
      first_name: "",
      last_name: "",
      phone_number: "",
      email: email,
      password: password,
      role: "",
    };
    axios
      .post(
        "https://mrle52rri4.execute-api.us-west-1.amazonaws.com/dev/api/v2/CreateAccount/FINDME",
        user
      )
      .then((response) => {
        if (response.data.message == "User already exists") {
          setUserAlreadyExists(!userAlreadyExists);
          return;
          // add validation
        } else {
          navigate("/validate-code", {
            state: {
              user_uid: response.data.result.user_uid,
              email: response.data.result.email,
              user: response.data.result,
              path: path,
              eventObj: eventObj,
            },
          });
        }
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
      <UserAlreadyExistsModal
        isOpen={userAlreadyExists}
        onCancel={onCancel}
        email={email}
      />
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        border={1}
        margin={5}
      >
        {" "}
        <div className="mt-5 mb-3">Email Signup</div>
        {signupSuccessful ? (
          <div className="d-flex flex-column justify-content-start mt-5">
            <div className="text-center">
              <p style={boldSmall} className="mb-1">
                Signup Successful
              </p>
              <Button
                variant="primary"
                onClick={() =>
                  navigate("/login", {
                    state: {
                      path: path,
                      eventObj: eventObj,
                    },
                  })
                }
                className="mb-4"
              >
                Login
              </Button>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FormControl>
                {" "}
                <FormGroup className="mb-3" controlId="formBasicEmail">
                  <TextField
                    type="email"
                    margin="normal"
                    label="Email Address"
                    InputLabelProps={{ shrink: true }}
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup className="mb-3" controlId="formBasicPassword">
                  <TextField
                    type="password"
                    name="password"
                    margin="normal"
                    label="Password"
                    InputLabelProps={{ shrink: true }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup className="mb-3" controlId="formBasicPassword">
                  <TextField
                    type="password"
                    margin="normal"
                    label="Confirm Password"
                    InputLabelProps={{ shrink: true }}
                    name="confirm_password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </FormGroup>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "2rem 0rem",
                  }}
                >
                  <Button variant="outlined" onClick={submitForm}>
                    Next
                  </Button>{" "}
                  {/* <Button variant="outlined" onClick={() => navigate("/")}>
                    Cancel
                  </Button> */}
                </div>
              </FormControl>
            </div>
          </div>
        )}
      </Grid>
    </div>
  );
}
