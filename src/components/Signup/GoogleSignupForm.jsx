import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
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
import { boldSmall } from "../../styles";

let SCOPES =
  "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.profile";

function GoogleSignupForm(props) {
  const navigate = useNavigate();
  const location = useLocation();
  let user = location.state.user;
  console.log(user);
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
        console.log(response);
        if (response.data.message == "User already exists") {
          setUserAlreadyExists(!userAlreadyExists);
          return;
          // add validation
        } else {
          setSignupSuccessful(true);
        }
      });
  };

  const onCancel = () => {
    setUserAlreadyExists(false);
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
      {
        <UserAlreadyExistsModal
          isOpen={userAlreadyExists}
          onCancel={onCancel}
          email={email}
        />
      }
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        border={1}
        margin={5}
      >
        <div className="mt-5 mb-3">Confirm Profile</div>
        {signupSuccessful ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "5%",
            }}
          >
            <div>
              <p style={boldSmall}>Signup Successful</p>
              <Button
                variant="outlined"
                style={{ margin: "2rem" }}
                onClick={() =>
                  navigate("/login", {
                    state: {
                      path: "",
                    },
                  })
                }
              >
                Login
              </Button>
            </div>
          </div>
        ) : (
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
                        label="First Name"
                        InputLabelProps={{ shrink: true }}
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
                        InputLabelProps={{ shrink: true }}
                        label="Last Name"
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
                    label="Phone Number"
                    InputLabelProps={{ shrink: true }}
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
            <Button
              variant="outlined"
              style={{ margin: "2rem" }}
              onClick={submitForm}
            >
              Confirm
            </Button>
          </div>
        )}
      </Grid>
    </div>
  );
}

export default GoogleSignupForm;
