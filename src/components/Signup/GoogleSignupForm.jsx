import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Stack,
  Box,
  Typography,
  Grid,
  Button,
  FormControl,
  FormGroup,
  TextField,
  FormLabel,
} from "@mui/material";
import axios from "axios";
import UserAlreadyExistsModal from "./UserAlreadyExistsModal";
import { formatPhoneNumber } from "../../helper";
import useStyles from "../../theming/styles";
import { boldSmall } from "../../styles";

let SCOPES =
  "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.profile";

function GoogleSignupForm(props) {
  const navigate = useNavigate();
  const classes = useStyles();
  const { state } = useLocation();
  let user = state.user;
  let path = state.path;
  let eventObj = state.eventObj !== undefined ? state.eventObj : "";
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [signupSuccessful, setSignupSuccessful] = useState(false);
  const [userAlreadyExists, setUserAlreadyExists] = useState(false);

  const submitForm = () => {
    let u = {
      email: user.email,
      password: user.password,
      first_name: user.first_name,
      last_name: user.last_name,
      role: "",
      phone_number: phoneNumber,
      google_auth_token: user.google_auth_token,
      google_refresh_token: user.google_refresh_token,
      social_id: user.social_id,
      access_expires_in: user.access_expires_in,
    };
    axios
      .post(
        "https://mrle52rri4.execute-api.us-west-1.amazonaws.com/dev/api/v2/UserSocialSignUp/FINDME",
        u
      )
      .then((response) => {
        if (response.data.message == "User already exists") {
          setUserAlreadyExists(!userAlreadyExists);
          return;
          // add validation
        } else {
          navigate("/create-card", {
            state: {
              email: email,
              user_uid: response.data.result.user_uid,
              edit: false,
              eventObj: eventObj,
              path: path,
              user: response.data.result,
            },
          });
          // setSignupSuccessful(true);
        }
      });
  };

  const onCancel = () => {
    setUserAlreadyExists(false);
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {
        <UserAlreadyExistsModal
          isOpen={userAlreadyExists}
          onCancel={onCancel}
          email={email}
        />
      }{" "}
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
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "5%",
          }}
        >
          <div></div>
          <div>
            <FormControl>
              <div>
                {" "}
                <div>
                  <FormGroup className="mb-3" controlId="formBasicEmail">
                    <TextField
                      type="email"
                      placeholder="First Name"
                      margin="normal"
                      className={classes.textfield}
                      name="email"
                      value={user.first_name}
                      // onChange={(e) => setFirstName(e.target.value)}
                    />
                  </FormGroup>
                </div>
                <div>
                  <FormGroup className="mb-3" controlId="formBasicEmail">
                    <TextField
                      type="email"
                      className={classes.textfield}
                      placeholder="Last Name"
                      margin="normal"
                      name="email"
                      value={user.last_name}
                      // onChange={(e) => setLastName(e.target.value)}
                    />
                  </FormGroup>
                </div>
              </div>
              <FormGroup className="mb-3" controlId="formBasicEmail">
                <TextField
                  placeholder="(xxx)xxx-xxxx"
                  margin="normal"
                  type="tel"
                  className={classes.textfield}
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) =>
                    setPhoneNumber(formatPhoneNumber(e.target.value))
                  }
                />
              </FormGroup>
            </FormControl>
          </div>
        </div>
      </Stack>{" "}
      <Stack
        direction="column"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 8 }}
      >
        {" "}
        <Button className={classes.button} onClick={submitForm}>
          Enter
        </Button>
      </Stack>
    </Box>
  );
}

export default GoogleSignupForm;
