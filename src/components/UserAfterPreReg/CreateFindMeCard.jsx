import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Grid,
  Button,
  Box,
  FormControl,
  TextField,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";
import Checkbox from "@mui/material/Checkbox";
import UploadPhotos from "../UploadPhotos";
import { tileImg } from "../../styles";
const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;
export default function CreateFindMeCard() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state.email;
  const userDetails = state.user;
  const edit = state.edit;
  // const [userDetails, setUserDetails] = useState([]);
  const [displayCard, setDisplayCard] = useState(false);
  const [agreement, setAgreement] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [catchPhrase, setCatchPhrase] = useState("");
  const imageState = useState([]);
  const loadUserDetails = () => {
    setFirstName(userDetails.first_name);
    setLastName(userDetails.last_name);
    setPhoneNumber(userDetails.phone_number);
    setCompany(userDetails.company);
    setTitle(userDetails.title);
    setCatchPhrase(userDetails.catch_phrase);

    loadImages();
  };
  const loadImages = async () => {
    const files = [];
    const images = JSON.parse(userDetails.images);
    if (images !== null && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        files.push({
          index: i,
          image: images[i],
          file: null,
          coverPhoto: i === 0,
        });
      }
      imageState[1](files);
    }
  };
  useEffect(() => {
    if (userDetails) {
      loadUserDetails();
    }
  }, [userDetails]);
  const UpdateProfile = async () => {
    if (edit) {
      const body = {
        profile_uid: userDetails.profile_uid,
        profile_user_id: userDetails.user_uid,
        title: title,
        company: company,
        catch_phrase: catchPhrase,
      };
      const files = imageState[0];
      let i = 0;
      for (const file of imageState[0]) {
        let key = file.coverPhoto ? "img_cover" : `img_${i++}`;
        if (file.file !== null) {
          body[key] = file.file;
        } else {
          body[key] = file.image;
        }
      }

      let headers = {
        "content-type": "application/json",
      };
      let requestBody = JSON.stringify(body);
      if (files !== null) {
        headers = {};
        requestBody = new FormData();
        for (const key of Object.keys(body)) {
          requestBody.append(key, body[key]);
        }
      }

      const response = await fetch(BASE_URL + "/UserProfile", {
        method: "PUT",
        headers: headers,
        body: requestBody,
      });

      const data = await response.json();
      navigate("/registration-confirmation", {
        state: {
          email: email,
          user: userDetails,
        },
      });
    } else {
      const body = {
        profile_user_id: userDetails.user_uid,
        title: title,
        company: company,
        catch_phrase: catchPhrase,
      };
      const files = imageState[0];
      let i = 0;
      for (const file of imageState[0]) {
        let key = file.coverPhoto ? "img_cover" : `img_${i++}`;
        if (file.file !== null) {
          body[key] = file.file;
        } else {
          body[key] = file.image;
        }
      }
      let headers = {
        "content-type": "application/json",
      };
      let requestBody = JSON.stringify(body);
      if (files !== null) {
        headers = {};
        requestBody = new FormData();
        for (const key of Object.keys(body)) {
          requestBody.append(key, body[key]);
        }
      }

      const response = await fetch(BASE_URL + "/UserProfile", {
        method: "POST",
        headers: headers,
        body: requestBody,
      });

      const data = await response.json();
      navigate("/registration-confirmation", {
        state: {
          email: email,
          user: userDetails,
        },
      });
    }
  };
  const handleChange = (e) => {
    setAgreement(e.target.checked);
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
        {" "}
        {displayCard ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ margin: "1rem 0rem", fontSize: "18px" }}>
              {" "}
              My FindMe Card
            </div>
            <div>
              {imageState[0].map((file, i) => (
                <div
                  className="mx-2"
                  style={{
                    position: "relative",
                    minHeight: "100px",
                    minWidth: "100px",
                    height: "100px",
                    width: "100px",
                  }}
                  key={i}
                >
                  {file.file === null ? (
                    ""
                  ) : (
                    <img
                      key={Date.now()}
                      src={file.image}
                      // src={`${file.image}?${Date.now()}`}
                      style={{ ...tileImg, objectFit: "cover" }}
                    />
                  )}
                </div>
              ))}
            </div>
            <div style={{ margin: "0.5rem 0rem" }}>{catchPhrase}</div>
            <div>
              {userDetails.first_name} {userDetails.last_name}
            </div>
            <div>{title}</div>
            <div>{company}</div>
            <div style={{ margin: "0.5rem 0rem" }}>
              {userDetails.phone_number}
            </div>
            <div style={{ margin: "0.5rem 0rem" }}>{userDetails.email}</div>
            <Button
              variant="outlined"
              style={{ margin: "2rem 0rem" }}
              onClick={UpdateProfile}
            >
              {" "}
              Confirm FindMe Card
            </Button>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {" "}
            <div style={{ margin: "1rem 0rem", fontSize: "18px" }}>
              {" "}
              Your FindMe Card
            </div>
            <FormControl>
              <TextField
                InputLabelProps={{ shrink: true }}
                fullWidth
                variant="outlined"
                size="small"
                margin="normal"
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                InputLabelProps={{ shrink: true }}
                fullWidth
                variant="outlined"
                size="small"
                margin="normal"
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <TextField
                InputLabelProps={{ shrink: true }}
                fullWidth
                variant="outlined"
                size="small"
                margin="normal"
                label="Email Address"
                value={userDetails.email}
                disabled
              />
              <TextField
                InputLabelProps={{ shrink: true }}
                fullWidth
                variant="outlined"
                size="small"
                margin="normal"
                label="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <TextField
                InputLabelProps={{ shrink: true }}
                fullWidth
                variant="outlined"
                size="small"
                margin="normal"
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                InputLabelProps={{ shrink: true }}
                fullWidth
                variant="outlined"
                size="small"
                margin="normal"
                label="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
              <TextField
                InputLabelProps={{ shrink: true }}
                fullWidth
                variant="outlined"
                size="small"
                margin="normal"
                label="Catch Phrase"
                value={catchPhrase}
                onChange={(e) => setCatchPhrase(e.target.value)}
              />
              {/* pop up upload pic */}
            </FormControl>{" "}
            <UploadPhotos state={imageState} />
            <FormControlLabel
              required
              control={<Checkbox checked={agreement} onChange={handleChange} />}
              label="I agree to let this information be shared with other participants"
            />
            <Button
              variant="contained"
              color="primary"
              style={{ margin: "2rem 0rem" }}
              onClick={() => setDisplayCard(true)}
            >
              {" "}
              Review FindMe Card
            </Button>
          </div>
        )}
      </Grid>
    </div>
  );
}
