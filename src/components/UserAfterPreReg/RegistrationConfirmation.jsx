import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, Button, Box } from "@mui/material";
import { small } from "../../styles";
export default function RegistrationConfirmation() {
  const navigate = useNavigate();
  const { state } = useLocation();
  let email = state.email;
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
        alignItems="center"
        justify="center"
        border={1}
      >
        {" "}
        <div style={{ margin: "1rem 0rem", fontSize: "18px" }}>
          {" "}
          Registration Confirmation
        </div>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "2rem 0rem",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              navigate("/create-card", { state: { email: email } })
            }
          >
            {" "}
            Create FindMe Card
          </Button>
          <p style={small}>Better than a business card</p>
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "2rem 0rem",
          }}
        >
          <a
            href="https://skedul.online"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
          >
            {" "}
            <Button variant="contained" color="warning">
              {" "}
              Create Skedul
            </Button>
          </a>

          <p style={small}>Make it easy to Meet with you</p>
        </Box>
      </Grid>
    </div>
  );
}
