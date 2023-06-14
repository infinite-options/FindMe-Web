import React, { useEffect, useState } from "react";
import { Grid, Button, Typography, Paper, Box, Stack } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import UploadPhotos from "../UploadPhotos";
import QRCode from "../QRCode/QRCode";
import useStyles from "../../theming/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

export default function EventReview() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { state } = useLocation();
  const edit = state.edit;
  const [showUnsavedData, setShowUnsavedData] = useState(false)
  const retrievedEventObject =
    localStorage.getItem("event") === null
      ? {}
      : JSON.parse(localStorage.getItem("event"));

  const imageState = useState([]);
  useEffect(() => {
    if (edit && retrievedEventObject) {
      loadImages();
    }
  }, []);

  const loadImages = async () => {
    const files = [];
    if (typeof retrievedEventObject.eventPhoto === "string") {
      const images = JSON.parse(retrievedEventObject.eventPhoto);
      console.log(images);
      let i = 0;
      if (images !== null) {
        files.push({
          index: i,
          image: images,
          file: null,
          coverPhoto: i === 0,
        });

        imageState[1](files);
      }
    } else {
      const images = retrievedEventObject.eventPhoto;
      console.log("images ",images);
      let i = 0;
      if (images !== null) {
        files.push({
          index: i,
          image: images,
          file: null,
          coverPhoto: i === 0,
        });

        imageState[1](files);
      }
    }
  };
  const addEvent = async () => {
    let user_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    retrievedEventObject["user_timezone"] = user_timezone;
    retrievedEventObject["eventStartTime"] = retrievedEventObject["eventStartTime"] && retrievedEventObject["eventStartTime"].split(':')[0].length() == 1 ? ("0" + retrievedEventObject["eventStartTime"]) : retrievedEventObject["eventStartTime"];
    retrievedEventObject["eventEndTime"] = retrievedEventObject["eventEndTime"] && retrievedEventObject["eventEndTime"].split(':')[0].length() == 1 ? ("0" + retrievedEventObject["eventEndTime"]) : retrievedEventObject["eventEndTime"];
    const files = imageState[0];
    let i = 0;
    for (const file of imageState[0]) {
      let key = file.coverPhoto ? "img_cover" : `img_${i++}`;
      if (file.file !== null) {
        retrievedEventObject[key] = file.file;
      } else {
        retrievedEventObject[key] = file.image;
      }
    }
    let headers = {
      "content-type": "application/json",
    };
    let requestBody = JSON.stringify(retrievedEventObject);
    if (files !== null) {
      headers = {};
      requestBody = new FormData();
      for (const key of Object.keys(retrievedEventObject)) {
        if (
          typeof retrievedEventObject[key] === "object" &&
          key !== "img_cover"
        ) {
          requestBody.append(key, JSON.stringify(retrievedEventObject[key]));
        } else {
          requestBody.append(key, retrievedEventObject[key]);
        }
      }
    }

    const response = await fetch(BASE_URL + "/AddEvent", {
      method: "POST",
      headers: headers,
      body: requestBody,
    });

    const data = await response.json();
    saveEventObject(data.result[0]);
    let event = data.result[0];
    event.user_timezone = user_timezone;
    console.log(event);
    axios.post(BASE_URL + "/SendEventDetails", event).then((res) => {
      console.log(res);
    });
    navigate("/organizerEventList");
  };

  const updateEvent = async () => {
    let user_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    retrievedEventObject["user_timezone"] = user_timezone;
    retrievedEventObject["eventStartTime"] = retrievedEventObject["eventStartTime"] && retrievedEventObject["eventStartTime"].split(':')[0].length == 1 ? ("0" + retrievedEventObject["eventStartTime"]) : retrievedEventObject["eventStartTime"];
    retrievedEventObject["eventEndTime"] = retrievedEventObject["eventEndTime"] && retrievedEventObject["eventEndTime"].split(':')[0].length == 1 ? ("0" + retrievedEventObject["eventEndTime"]) : retrievedEventObject["eventEndTime"];
    const files = imageState[0];
    let i = 0;
    for (const file of imageState[0]) {
      let key = file.coverPhoto ? "img_cover" : `img_${i++}`;
      if (file.file !== null) {
        retrievedEventObject[key] = file.file;
      } else {
        retrievedEventObject[key] = file.image;
      }
    }
    let headers = {
      "content-type": "application/json",
    };
    let requestBody = JSON.stringify(retrievedEventObject);
    if (files !== null) {
      headers = {};
      requestBody = new FormData();
      for (const key of Object.keys(retrievedEventObject)) {
        if (
          typeof retrievedEventObject[key] === "object" &&
          key !== "img_cover"
        ) {
          requestBody.append(key, JSON.stringify(retrievedEventObject[key]));
        } else {
          requestBody.append(key, retrievedEventObject[key]);
        }
      }
    }

    const response = await fetch(BASE_URL + "/UpdateEvent", {
      method: "PUT",
      headers: headers,
      body: requestBody,
    });

    const data = await response.json();
    saveEventObject(data.result[0]);
    navigate("/organizerEventList");
  };

  const saveEventObject = (data) => {
    retrievedEventObject["eventPhoto"] = data.event_photo;
    retrievedEventObject["eventRegistrationCode"] =
      data.event_registration_code;
    retrievedEventObject["eventCheckinCode"] = data.event_checkin_code;
    localStorage.setItem("event", JSON.stringify(retrievedEventObject));
  };

  const DialogUnsavedData = () => {
    return (
      <Dialog
        open={showUnsavedData}
        // onClose={onCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            padding: "2rem",
          }}
        >
          Exit without saving changes?
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              setShowUnsavedData(false);
              navigate("/organizerEventList");
            }}
          >
            Exit
          </Button>
          <Button
            onClick={() => {
              setShowUnsavedData(false);
            }}
          >
            Cancel
          </Button>
        </DialogActions>
        </Dialog>
    )
  }
  
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Stack direction="row" justifyContent="flex-start">
          <Typography
            variant="h2"
            className={classes.whiteText}
            onClick={() => {
              setShowUnsavedData(true);
            }}
          >
            edit
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="center">
          <Typography
            variant="h4"
            className={classes.whiteText}
            onClick={() => {
              navigate("/eventTitle", { state: { edit: true } });
            }}
          >
            {retrievedEventObject.eventTitle}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          // sx={{ mt :2}}
        >
          <Typography
            variant="h5"
            className={classes.whiteText}
            onClick={() => {
              navigate("/eventParticulars", { state: { edit: true } });
            }}
          >
            {new Date(retrievedEventObject.eventStartDate).toLocaleString(
              "default",
              { month: "short", day: "numeric" }
            )}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="center">
          <Typography
            variant="h5"
            className={classes.whiteText}
            onClick={() => {
              navigate("/eventParticulars", { state: { edit: true } });
            }}
          >
            {retrievedEventObject.eventStartTime} -{" "}
            {retrievedEventObject.eventEndTime}
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="flex-start" sx={{ mt: 5 }}>
          {DialogUnsavedData()}
          <Typography
            variant="h5"
            className={classes.whiteText}
            onClick={() => {
              navigate("/eventTypeMenu", { state: { edit: true } });
            }}
          >
            {retrievedEventObject.eventType}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="flex-start" sx={{ mt: 2 }}>
          <Typography
            variant="h5"
            className={classes.whiteText}
            onClick={() => {
              navigate("/eventVisibility", { state: { edit: true } });
            }}
          >
            {retrievedEventObject.eventVisibility}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="flex-start" sx={{ mt: 2 }}>
          <Typography
            variant="h5"
            className={classes.whiteText}
            onClick={() => {
              navigate("/eventLocation", { state: { edit: true } });
            }}
          >
            {/* {retrievedEventObject.eventLocation
              ? retrievedEventObject.eventLocation.split(",")[0]
              : ""} */}
            {!retrievedEventObject.eventLocationName || retrievedEventObject.eventLocationName.match(/^\d/)
              ? retrievedEventObject.eventLocation
              : retrievedEventObject.eventLocationName+", "+retrievedEventObject.eventLocation}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="flex-start" sx={{ mt: 2 }}>
          <Typography
            variant="h5"
            className={classes.whiteText}
            onClick={() => {
              navigate("/eventCapacity", { state: { edit: true } });
            }}
          >
            Event Capacity : {retrievedEventObject.eventCapacity}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="flex-start" sx={{ mt: 2 }}>
          <Typography
            variant="h5"
            className={classes.whiteText}
            onClick={() => {
              navigate("/preEventQuestionnaire", { state: { edit: true } });
            }}
          >
            Pre-Event Questionnaire :{" "}
            {retrievedEventObject.preEventQuestionnaire.map(
              (question, index) => {
                {
                  return <ListItem>{question.question}</ListItem>;
                }
              }
            )}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
          <UploadPhotos state={imageState} />
        </Stack>
        <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
          {edit || retrievedEventObject.event_uid ? (
            <Button
              className={classes.button}
              variant="outlined"
              onClick={() => {
                updateEvent();
              }}
            >
              Update Event
            </Button>
          ) : (
            <Button
              className={classes.button}
              variant="outlined"
              onClick={() => {
                addEvent();
              }}
            >
              Create Event
            </Button>
          )}
        </Stack>
      </Box>
    </>
  );
}
