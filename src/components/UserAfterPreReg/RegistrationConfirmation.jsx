import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, Button, Box } from "@mui/material";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import { small } from "../../styles";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

export default function RegistrationConfirmation() {
  const navigate = useNavigate();
  const [showCreateCard, setShowCreateCard] = useState(false);
  const [showEditCard, setShowEditCard] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [event, setEvent] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const { state } = useLocation();
  let email = state.email;
  let user = state.user;
  const eventObj = state.eventObj !== undefined ? state.eventObj : "";

  let user_uid =
    typeof user === "string" ? JSON.parse(user).user_uid : user.user_uid;

  const GetUserProfile = async () => {
    let x = {
      profile_user_id: user_uid,
    };

    axios.get(BASE_URL + `/CheckUserProfile/${user_uid}`).then((response) => {
      if (response.data.message === "User Profile Doest Not Exist") {
        setShowCreateCard(true);
      } else {
        setShowEditCard(true);
      }
      setUserDetails(response.data.result[0]);
    });
  };
  const addEventUser = () => {
    let eObj = eventObj;

    eObj.eu_user_id = user_uid;
    axios
      .get(
        BASE_URL +
          `/CheckAlreadyRegistered/${eObj.eu_event_id},${eObj.eu_user_id}`
      )
      .then((response) => {
        if (response.data.message === "Already Registered") {
          setEvent(response.data.result[0]);
          setShowModal(true);
        } else {
          axios.post(BASE_URL + "/EventUser", eObj).then((response) => {
            console.log(response);
          });
        }
      });
  };

  useEffect(() => {
    GetUserProfile();
    if (eventObj) {
      addEventUser();
    }
  }, []);
  console.log(event);
  const alreadyRegistered = () => {
    return (
      <Dialog
        open={showModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Already Registered</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You have already registered for this event
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              navigate("/event-details", {
                state: { event: event },
              });
            }}
            color="primary"
          >
            Go to Event Details
          </Button>
          <Button
            onClick={() => {
              setShowModal(false);
            }}
            color="primary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
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
      <Grid
        container
        direction="column"
        margin={5}
        alignItems="center"
        justify="center"
        border={1}
      >
        {alreadyRegistered()}
        <div style={{ margin: "1rem 0rem", fontSize: "18px" }}>
          {" "}
          Registration Confirmation
        </div>
        {showCreateCard ? (
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
                navigate("/create-card", {
                  state: { email: email, user: userDetails, edit: false },
                })
              }
            >
              {" "}
              Create FindMe Card
            </Button>
            <p style={small}>Better than a business card</p>
          </Box>
        ) : (
          ""
        )}
        {showEditCard ? (
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
                navigate("/create-card", {
                  state: { email: email, user: userDetails, edit: true },
                })
              }
            >
              {" "}
              Edit FindMe Card
            </Button>
          </Box>
        ) : (
          ""
        )}
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
