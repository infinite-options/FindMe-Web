import React, { Component, useEffect, useState } from "react";
import {
  Stack,
  Box,
  Typography,
  Button,
  FormGroup,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useStyles from "../../theming/styles";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

export default function RegCode() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [regCode, setRegCode] = useState("");
  const [event, setEvent] = useState({});
  const [showError, setShowError] = useState(false);

  const verifyRegCode = () => {
    axios
      .get(BASE_URL + `/verifyRegCode/${regCode}`)
      .then((response) => {
        if (
          response.data.result.result.length !== 0 &&
          response.data.result.result[0] !== undefined
        ) {
          setEvent(response.data.result.result[0]);
          console.log(response.data.result.result[0]);
          // navigate("/eventProfile", {
          //   state: { event: response.data.result.result[0] },
          // });
          navigate("/preregistration-event/" + regCode, {
            state: { event: response.data.result.result[0] },
          });
        } else {
          setShowError(true);
          console.log("Invalid registration code");
        }
      })
      .catch((error) => {
        console.log(error);
        console.log("Invalid Code");
      });
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Stack direction="row" justifyContent="flex-start" sx={{ mt: 2, p: 2 }}>
        <Typography
          variant="h2"
          className={classes.whiteText}
          onClick={() => navigate(-1)}
        >
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
        <Typography className={classes.whiteText}>
          {" "}
          Enter Registration Code{" "}
        </Typography>

        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Enter Registration Code"
          className={classes.textfield}
          value={regCode}
          onChange={(e) => setRegCode(e.target.value)}
        />

        {showError && (
          <Typography sx={{ mt: 2 }} className={classes.error}>
            Invalid Code. Please try again.
          </Typography>
        )}
      </Stack>
      <Stack
        direction="column"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 12 }}
      >
        {" "}
        <Button className={classes.button} onClick={() => verifyRegCode()}>
          {" "}
          Verify{" "}
        </Button>
      </Stack>
    </Box>
  );
}
