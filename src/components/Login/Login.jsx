import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import EmailLogin2 from "../../Icons/EmailLogin2.png";
import GoogleLogin from "./GoogleLogin";
import EmailLogin from "./EmailLogin";
import UserDoesNotExistModal from "./UserDoesNotExistModal";

export default function Login() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const path = state.path;
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
            />
          )}

          <EmailLogin
            userDoesntExist={userDoesntExist}
            setUserDoesntExist={setUserDoesntExist}
            showForm={showForm}
            setShowForm={setShowForm}
            path={path}
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
              onClick={() => navigate("/signup", { state: { path: path } })}
            >
              Signup
            </Button>
          </div>
        )}
      </Grid>
    </div>
  );
}
