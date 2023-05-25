import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Button, Box } from "@mui/material";
export default function PreRegSuccess() {
  const navigate = useNavigate();
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
        <div style={{ margin: "1rem 0rem" }}> You are Pregistering for</div>
        <Box style={{ margin: "2rem 0rem" }}>
          Save the Gray Spotted Whales Color Blind Networking Event
        </Box>
        <div style={{ margin: "1rem 0rem", textAlign: "center" }}>
          January 18, 2024 <br />
          8pm - 9pm
        </div>
        <Button
          variant="outlined"
          color="info"
          style={{ margin: "2rem 0rem" }}
          onClick={() => navigate("/registration-questionnare")}
        >
          Next
        </Button>
      </Grid>
    </div>
  );
}
