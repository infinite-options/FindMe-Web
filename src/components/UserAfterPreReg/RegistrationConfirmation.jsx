import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Box, Stack, Typography, TextField } from "@mui/material";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import useStyles from "../../theming/styles";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

export default function RegistrationConfirmation() {
  const navigate = useNavigate();
  const classes = useStyles();
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
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Stack direction="row" justifyContent="flex-start" sx={{ mt: 2, p: 2 }}>
        <Typography variant="h2" className={classes.whiteText}>
          confirmed
        </Typography>
      </Stack>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ mt: 2 }}
      >
        {alreadyRegistered()}
        <Typography className={classes.whiteText}>You're going to</Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            margin: "2rem 0rem",
          }}
        >
          <Typography variant="h4" className={classes.whiteText}>
            {event.event_title}
          </Typography>
          <Typography variant="h5" className={classes.whiteText}>
            {new Date(event.event_start_date).toLocaleString("default", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </Typography>
          <Typography variant="h5" className={classes.whiteText}>
            {event.event_start_time} - {event.event_end_time}
          </Typography>
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
              className={classes.button}
              onClick={() =>
                navigate("/create-card", {
                  state: { email: email, user: userDetails, edit: false },
                })
              }
            >
              {" "}
              Create FindMe Card
            </Button>
            <Typography className={classes.whiteText}>
              Make it easy to share your contact info by making a Free bizCard
            </Typography>
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
              className={classes.button}
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
            <Button className={classes.button}> Create Skedul</Button>
          </a>

          <Typography className={classes.whiteText}>
            Make it easy to Meet with you
          </Typography>
        </Box>
      </Stack>
      <Stack
        direction="column"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 8 }}
      >
        <Button className={classes.button} onClick={() => navigate("/")}>
          Homepage
        </Button>
      </Stack>
    </Box>
  );
}
