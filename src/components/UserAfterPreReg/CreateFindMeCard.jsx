import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Grid,
  Button,
  Box,
  FormControl,
  TextField,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import UploadPhotos from "../UploadPhotos";
import { tileImg } from "../../styles";
import useStyles from "../../theming/styles";
import { formatPhoneNumber } from "../../helper";
const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;
export default function CreateFindMeCard() {
  const navigate = useNavigate();
  const classes = useStyles();
  const { state } = useLocation();
  const email = state.email;
  const userDetails = state.user;
  const edit = state.edit;
  const user_uid = state.user_uid;
  const path = state.path;
  const eventObj = state.eventObj;
  // const [userDetails, setUserDetails] = useState([]);
  const [displayCard, setDisplayCard] = useState(false);
  const [agreement, setAgreement] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [catchPhrase, setCatchPhrase] = useState("");
  const [role, setRole] = useState("");
  const imageState = useState([]);
  const loadUserDetails = () => {
    setFirstName(userDetails.first_name);
    setLastName(userDetails.last_name);
    setPhoneNumber(userDetails.phone_number);
    setCompany(userDetails.company);
    setTitle(userDetails.title);
    setCatchPhrase(userDetails.catch_phrase);
    setRole(userDetails.role);

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
    if (userDetails && edit) {
      loadUserDetails();
    }
  }, [userDetails]);
  const UpdateProfile = async () => {
    if (edit) {
      const body = {
        profile_uid: userDetails.profile_uid,
        profile_user_id: user_uid,
        title: title,
        company: company,
        catch_phrase: catchPhrase,
        role: role,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
      };
      const files = imageState[0];
      console.log(files);
      let i = 0;
      for (const file of imageState[0]) {
        let key = file.coverPhoto ? "img_cover" : `img_${i++}`;
        if (file.file !== null) {
          console.log("if file not null");
          body[key] = file.file;
        } else {
          console.log("if else");
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
      console.log(requestBody);

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
        profile_user_id: user_uid,
        title: title,
        company: company,
        catch_phrase: catchPhrase,
        role: role,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
      };
      const files = imageState[0];
      let i = 0;
      console.log(files);
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
      navigate(path, {
        state: {
          email: email,
          user: userDetails,
          user_uid: user_uid,
        },
      });
    }
  };
  const handleChange = (e) => {
    setAgreement(e.target.checked);
  };
  const canBeSubmitted = () => {
    const isValid = agreement; // checkbox for terms

    if (isValid) {
      document.getElementById("submitButton").removeAttribute("disabled");
    } else {
      document.getElementById("submitButton").setAttribute("disabled", true);
    }
    console.log({ agreement });
  };
  useEffect(() => canBeSubmitted(), [agreement]);
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Stack direction="row" justifyContent="flex-start" sx={{ mt: 2, p: 2 }}>
        <Typography variant="h2" className={classes.whiteText}>
          bizCard
        </Typography>
      </Stack>{" "}
      <Stack direction="row" justifyContent="center" sx={{ mt: 2, p: 2 }}>
        {displayCard ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
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
                  {console.log(imageState[0])}
                  {file.file === null ? (
                    <img
                      key={Date.now()}
                      // src={file.image}
                      src={`${file.image}?${Date.now()}`}
                      style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "50%",
                      }}
                    />
                  ) : (
                    <img
                      key={Date.now()}
                      src={file.image}
                      style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "50%",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
            <Typography
              className={classes.whiteText}
              style={{ margin: "0.5rem 0rem" }}
            >
              {catchPhrase}
            </Typography>
            <Typography className={classes.whiteText}>
              {firstName} {lastName}
            </Typography>
            <Typography className={classes.whiteText}>{title}</Typography>
            <Typography className={classes.whiteText}>{company}</Typography>
            <Typography
              className={classes.whiteText}
              style={{ margin: "0.5rem 0rem" }}
            >
              {phoneNumber}
            </Typography>
            <Typography
              className={classes.whiteText}
              style={{ margin: "0.5rem 0rem" }}
            >
              {email}
            </Typography>
            <Button className={classes.button} onClick={UpdateProfile}>
              {" "}
              Confirm bizCard
            </Button>
          </Box>
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
            <FormControl>
              <TextField
                className={classes.textfield}
                margin="normal"
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <TextField
                className={classes.textfield}
                margin="normal"
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              {/* <TextField
                className={classes.textfield}
                margin="normal"
                label="Email Address"
                value={email}
                disabled
              /> */}
              <Typography
                className={classes.whiteText}
                sx={{ textAlign: "center" }}
              >
                {" "}
                {email}
              </Typography>
              <TextField
                className={classes.textfield}
                margin="normal"
                label="Phone Number"
                value={phoneNumber}
                onChange={(e) =>
                  setPhoneNumber(formatPhoneNumber(e.target.value))
                }
                required
              />
              <TextField
                className={classes.textfield}
                margin="normal"
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <TextField
                className={classes.textfield}
                margin="normal"
                label="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
              <TextField
                className={classes.textfield}
                margin="normal"
                label="Catch Phrase"
                value={catchPhrase}
                onChange={(e) => setCatchPhrase(e.target.value)}
                required
              />
              <Select
                InputLabelProps={{ shrink: true }}
                className={classes.textfield}
                value={role}
                label="Role"
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <MenuItem value={"VC"}>VC</MenuItem>
                <MenuItem value={"Founder"}>Founder</MenuItem>
                <MenuItem value={"Looking for Next Opportunity"}>
                  Looking for Next Opportunity
                </MenuItem>
              </Select>
              {/* pop up upload pic */}
            </FormControl>{" "}
            <UploadPhotos state={imageState} />
            <FormControlLabel
              className={classes.whiteText}
              sx={{ m: 2 }}
              required
              control={<Checkbox checked={agreement} onChange={handleChange} />}
              label="I agree to let this information be shared with other participants"
            />
            <Button
              id="submitButton"
              className={classes.button}
              onClick={() => setDisplayCard(true)}
            >
              {" "}
              Save
            </Button>
          </div>
        )}
      </Stack>
    </Box>
  );
}
