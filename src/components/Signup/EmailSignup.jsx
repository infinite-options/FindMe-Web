import React, { useState } from "react";
import axios from "axios";
import * as ReactBootStrap from "react-bootstrap";
import {
  Grid,
  Button,
  FormControl,
  FormGroup,
  Typography,
  Box,
  Stack,
  FormControlLabel,
  TextField,
  FormLabel,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import UserAlreadyExistsModal from "./UserAlreadyExistsModal";
import useStyles from "../../theming/styles";
import Back from "../../Icons/Back.png";

export default function EmailSignup() {
  const navigate = useNavigate();
  const classes = useStyles();
  const { state } = useLocation();
  const path = state.path;
  const email = state.email;
  const password = state.password;
  const eventObj = state.eventObj !== undefined ? state.eventObj : "";

  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [userAlreadyExists, setUserAlreadyExists] = useState(false);
  const onCancel = () => {
    setUserAlreadyExists(false);
  };
  const required =
    errorMessage === "Please fill out all fields" ? (
      <span className={classes.error}>*</span>
    ) : (
      ""
    );
  const submitForm = async () => {
    console.log("in submit form");
    if (email === "" || password === "" || confirmPassword === "") {
      setErrorMessage("Please fill out all fields");
      console.log("error");
      return;
    }

    if (password !== confirmPassword) {
      console.log(password, confirmPassword);
      setErrorMessage("Passwords must match");
      console.log("error");
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
    console.log(user);
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
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <UserAlreadyExistsModal
        isOpen={userAlreadyExists}
        onCancel={onCancel}
        email={email}
      />
      <Stack direction="row" justifyContent="flex-start" sx={{ mt: 2, p: 2 }}>
        <Typography variant="h2" className={classes.whiteText}>
          signup
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
              <FormGroup>
                <Typography variant="h5" className={classes.whiteText}>
                  Username
                </Typography>
                <TextField
                  className={classes.textfield}
                  type="email"
                  name="email"
                  margin="normal"
                  value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Typography variant="h5" className={classes.whiteText}>
                  Confirm Password
                </Typography>
                <TextField
                  className={classes.textfield}
                  type="password"
                  margin="normal"
                  name="confirm_password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </FormGroup>
              <div className={errorMessage === "" ? classes.hidden : {}}>
                <p className={classes.error}>{errorMessage || "error"}</p>
              </div>
              <Stack sx={{ mt: 2 }}>
                <Button className={classes.button} onClick={submitForm}>
                  Create New Account
                </Button>{" "}
              </Stack>
            </FormControl>
          </div>
        </div>
      </Stack>
      <Stack sx={{ mt: 12 }}>
        {" "}
        <Button className={classes.button} onClick={() => navigate(-1)}>
          <img src={Back} style={{ width: "2rem" }} />
          &nbsp; &nbsp;Back
        </Button>
      </Stack>
    </Box>
  );
}
