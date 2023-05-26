import React, { Component, useEffect, useState } from "react";
import { Grid, Typography, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

export default function RegCode() {
  const navigate = useNavigate();
  const [regCode, setRegCode] = useState("");
  const [event, setEvent] = useState({});
  const [showError, setShowError] = useState(false);

  const verifyRegCode = () => {
    axios
      .get(BASE_URL + `verifyRegCode/${regCode}`)
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
          navigate("/preregistration-event", {
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
    <>
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
          style={{ height: "20rem", width: "80rem" }}
          alignItems="center"
          justify="center"
          border={1}
        >
          <Typography variant="h5" sx={{ mt: 2 }}>
            {" "}
            Pre-registration{" "}
          </Typography>
          <Grid
            container
            // rowSpacing={1}
            // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={3}>
              <Typography sx={{ mt: 2 }}> Enter Registration Code </Typography>
            </Grid>
            <Grid item xs={3}>
              <TextField
                required
                id="outlined-required"
                label="Required"
                defaultValue="Enter Registration Code"
                sx={{ mt: 2 }}
                value={regCode}
                onChange={(e) => setRegCode(e.target.value)}
              />
            </Grid>
          </Grid>

          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => verifyRegCode()}
          >
            {" "}
            Verify{" "}
          </Button>
          {showError && (
            <Typography sx={{ mt: 2 }}>
              Invalid Code. Please try again.
            </Typography>
          )}
        </Grid>
      </div>
    </>
  );
}
