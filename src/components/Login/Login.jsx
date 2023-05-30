import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, Button } from "@mui/material";
import GoogleLogin from "./GoogleLogin";
import EmailLogin from "./EmailLogin";
import UserDoesNotExistModal from "./UserDoesNotExistModal";

export default function Login() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const path = state.path;
  const eventObj = state.eventObj !== undefined ? state.eventObj : "";
  const [userDoesntExist, setUserDoesntExist] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const onCancelModal = () => {
    setUserDoesntExist(false);
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
      <UserDoesNotExistModal
        isOpen={userDoesntExist}
        onCancel={onCancelModal}
        path={path}
        eventObj={eventObj}
      />

      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        border={1}
        margin={5}
      >
        <div style={{ marginTop: "3rem" }}> Welcome to Find Me!</div>
        <div style={{ marginTop: "3rem" }}> Sign In</div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {showForm ? (
            " "
          ) : (
            <GoogleLogin
              userDoesntExist={userDoesntExist}
              setUserDoesntExist={setUserDoesntExist}
              path={path}
              eventObj={eventObj}
            />
          )}

          <EmailLogin
            userDoesntExist={userDoesntExist}
            setUserDoesntExist={setUserDoesntExist}
            showForm={showForm}
            setShowForm={setShowForm}
            path={path}
            eventObj={eventObj}
          />
        </div>
        {showForm ? (
          ""
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "5%",
            }}
          >
            <Button
              variant="outlined"
              color="info"
              style={{ margin: "6rem 0rem" }}
              onClick={() =>
                navigate("/signup", {
                  state: { path: path, eventObj: eventObj },
                })
              }
            >
              Signup
            </Button>
          </div>
        )}
      </Grid>
    </div>
  );
}
