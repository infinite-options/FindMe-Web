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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import { useNavigate, useLocation } from "react-router-dom";
import PasswordModal from "./PasswordModal";
import EmailLogin2 from "../../Icons/EmailLogin2.png";
import { red, pillButton, boldSmall, hidden, small } from "../../styles";

export default function EmailLogin(props) {
  const navigate = useNavigate();

  const { userDoesntExist, setUserDoesntExist, path, showForm, setShowForm } =
    props;
  const [passModal, setpassModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // const [showSpinner, setShowSpinner] = useState(false);
  // const [userDoesntExist, setUserDoesntExist] = useState(false);
  function submitForm() {
    if (email === "" || password === "") {
      setErrorMessage("Please fill out all fields");
      return;
    }
    // setShowSpinner(true);
    axios
      .post(
        "https://mrle52rri4.execute-api.us-west-1.amazonaws.com/dev/api/v2/AccountSalt/FINDME",
        {
          email: email,
        }
      )
      .then((res) => {
        let saltObject = res;
        if (res.data.message == "Email doesn't exist") {
          setUserDoesntExist(true);
        }
        if (saltObject.data.code === 200) {
          let hashAlg = saltObject.data.result[0].password_algorithm;
          let salt = saltObject.data.result[0].password_salt;

          if (hashAlg != null && salt != null) {
            // Make sure the data exists
            if (hashAlg !== "" && salt !== "") {
              // Rename hash algorithm so client can understand
              switch (hashAlg) {
                case "SHA256":
                  hashAlg = "SHA-256";
                  break;
                default:
                  break;
              }
              // Salt plain text password
              let saltedPassword = password + salt;
              // Encode salted password to prepare for hashing
              const encoder = new TextEncoder();
              const data = encoder.encode(saltedPassword);
              //Hash salted password
              crypto.subtle.digest(hashAlg, data).then((res) => {
                let hash = res;
                // Decode hash with hex digest
                let hashArray = Array.from(new Uint8Array(hash));
                let hashedPassword = hashArray
                  .map((byte) => {
                    return byte.toString(16).padStart(2, "0");
                  })
                  .join("");
                let loginObject = {
                  email: email,
                  password: hashedPassword,
                };
                axios
                  .post(
                    "https://mrle52rri4.execute-api.us-west-1.amazonaws.com/dev/api/v2/Login/FINDME",
                    loginObject
                  )
                  .then((response) => {
                    if (response.data.message === "Incorrect password") {
                      setErrorMessage(response.data.message);
                      // setShowSpinner(false);
                    } else if (
                      response.data.message === "Email doesn't exist"
                    ) {
                      setUserDoesntExist(true);
                      // setShowSpinner(false);
                    } else if (response.data.message === "Login successful") {
                      setErrorMessage("");
                      navigate(path, {
                        state: { email: email, user: response.data.result },
                      });
                    }
                  })
                  .catch((err) => {
                    if (err.response) {
                      console.log(err.response);
                    }
                    console.log(err);
                  });
              });
            }
          }
        } else {
        }
      });
  }

  const onReset = async () => {
    if (email == "") {
      setErrorMessage("Please enter an email");
      return;
    }
    // setShowSpinner(true);
    axios
      .post(
        "https://mrle52rri4.execute-api.us-west-1.amazonaws.com/dev/api/v2/SetTempPassword/FINDME",
        {
          email: email,
        }
      )
      .then((response) => {
        if (response.data.message === "A temporary password has been sent") {
          setErrorMessage("");
          // setShowSpinner(false);
          setpassModal(true);
        }
        if (response.data.code === 280) {
          console.log(response);
          setErrorMessage("No account found with that email.");
          return;
        }
      });
  };
  const onCancel = () => {
    setpassModal(false);
  };

  const required =
    errorMessage === "Please fill out all fields" ? (
      <span style={red} className="ms-1">
        *
      </span>
    ) : (
      ""
    );
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "5%",
      }}
    >
      <PasswordModal isOpen={passModal} onCancel={onCancel} />
      {showForm ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "5%",
          }}
        >
          <FormControl>
            <FormGroup className="mx-2 my-3">
              <TextField
                style={{ borderRadius: 0 }}
                // placeholder="Email"
                type="email"
                value={email}
                margin="normal"
                label="Email Address"
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup className="mx-2 my-3">
              <TextField
                style={{ borderRadius: 0 }}
                // placeholder="Password"
                type="password"
                value={password}
                margin="normal"
                label="Pasword"
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>
          </FormControl>
          <div className="text-center pt-1 pb-2">
            <div className="text-center mb-4">
              <p style={{ ...boldSmall, cursor: "pointer" }} onClick={onReset}>
                Forgot Password?
              </p>
            </div>

            <Button
              variant="outlined"
              color="info"
              onClick={() => submitForm()}
            >
              Login
            </Button>
          </div>
          <div
            className="text-center"
            style={errorMessage === "" ? hidden : {}}
          >
            <p style={{ ...red, ...small }}>{errorMessage || "error"}</p>
          </div>
        </div>
      ) : (
        <img
          src={EmailLogin2}
          style={{ width: "2.7rem", margin: "2rem" }}
          onClick={() => setShowForm(true)}
        />
      )}
    </div>
  );
}
