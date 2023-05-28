import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, Button, Box } from "@mui/material";
import { small } from "../../styles";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

export default function RegistrationConfirmation() {
  const navigate = useNavigate();
  const [showCreateCard, setShowCreateCard] = useState(false);
  const [showEditCard, setShowEditCard] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const { state } = useLocation();
  let email = state.email;
  let user = state.user;

  const GetUserProfile = async () => {
    let x = {
      profile_user_id: user.user_uid,
    };

    axios
      .get(BASE_URL + `/CheckUserProfile/${user.user_uid}`)
      .then((response) => {
        if (response.data.message === "User Profile Doest Not Exist") {
          setShowCreateCard(true);
        } else {
          setShowEditCard(true);
        }
        setUserDetails(response.data.result[0]);
      });
  };

  useEffect(() => {
    GetUserProfile();
  }, []);

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
