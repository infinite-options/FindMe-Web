import React, { useState } from "react";
import { Grid, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import UploadPhotos from "../UploadPhotos";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

export default function EventReview() {
  const navigate = useNavigate();
  const retrievedEventObject =
    localStorage.getItem("event") === null
      ? {}
      : JSON.parse(localStorage.getItem("event"));
  console.log(retrievedEventObject);

  const imageState = useState([]);
  console.log(imageState);
  const addEvent = async () => {
    const files = imageState[0];
    let i = 0;
    console.log(files);
    for (const file of imageState[0]) {
      let key = file.coverPhoto ? "img_cover" : `img_${i++}`;
      if (file.file !== null) {
        retrievedEventObject[key] = file.file;
      } else {
        retrievedEventObject[key] = file.image;
      }
    }
    console.log(retrievedEventObject);
    let headers = {
      "content-type": "application/json",
    };
    let requestBody = JSON.stringify(retrievedEventObject);
    if (files !== null) {
      headers = {};
      requestBody = new FormData();
      for (const key of Object.keys(retrievedEventObject)) {
        console.log(
          typeof retrievedEventObject[key],
          retrievedEventObject[key],
          key
        );
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
    console.log(requestBody);

    const response = await fetch(BASE_URL + "/AddEvent", {
      method: "POST",
      headers: headers,
      body: requestBody,
    });

    const data = await response.json();
    saveEventObject(data);
    navigate("/eventPreRegCode");
    // axios
    //   .post(BASE_URL + `/AddEvent`, retrievedEventObject)
    //   .then((response) => {
    //     console.log("event created");
    //     // navigate("/eventPreRegCode");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     console.log("Invalid Code");
    //   });
  };
    
  const updateEvent = async () => {
    const files = imageState[0];
    let i = 0;
    console.log(files);
    for (const file of imageState[0]) {
      let key = file.coverPhoto ? "img_cover" : `img_${i++}`;
      if (file.file !== null) {
        retrievedEventObject[key] = file.file;
      } else {
        retrievedEventObject[key] = file.image;
      }
    }
    console.log(retrievedEventObject);
    let headers = {
      "content-type": "application/json",
    };
    let requestBody = JSON.stringify(retrievedEventObject);
    if (files !== null) {
      headers = {};
      requestBody = new FormData();
      for (const key of Object.keys(retrievedEventObject)) {
        console.log(
          typeof retrievedEventObject[key],
          retrievedEventObject[key],
          key
        );
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
    console.log(requestBody);

    // const response = await fetch(BASE_URL + "/AddEvent", {
    //   method: "POST",
    //   headers: headers,
    //   body: requestBody,
    // });

    // const data = await response.json();
    //   saveEventObject(data.image)
    navigate("/eventPreRegCode");
  };
    
  const saveEventObject = (data) => {
        console.log("#### ", data.result)
        // retrievedEventObject['eventPhoto'] = image;
        // localStorage.setItem('event', JSON.stringify(retrievedEventObject));
        console.log("66 ",retrievedEventObject)
  }
    
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "5%",
        }}
      >
        <Paper
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 5,
            flexDirection: "column",
            flexGrow: 1,
            border: 1,
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#1A2027" : "#fff",
          }}
        >
          <Typography variant="h5" sx={{ mt: 2 }}>
            {" "}
            Review Event{" "}
          </Typography>

          <List sx={{ bgcolor: "background.paper", mt: 2 }}>
            <ListItem sx={{ border: "1px solid grey" }}>
              <Typography>
                Event Title : {retrievedEventObject.eventTitle}
              </Typography>
              <IconButton
                component="span"
                onClick={() => {
                  navigate("/eventTitle");
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </ListItem>
            <ListItem sx={{ border: "1px solid grey" }}>
              <Typography>
                Event Description : {retrievedEventObject.eventDescription}
              </Typography>
              <IconButton
                component="span"
                onClick={() => {
                  navigate("/eventTitle");
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </ListItem>
            <ListItem sx={{ border: "1px solid grey" }}>
              <Typography>
                Event Type : {retrievedEventObject.eventType}
              </Typography>
              <IconButton
                component="span"
                onClick={() => {
                  navigate("/eventTypeMenu");
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </ListItem>

            <ListItem sx={{ border: "1px solid grey" }}>
              <Typography>
                Event Visibility : {retrievedEventObject.eventVisibility}
              </Typography>
              <IconButton
                component="span"
                onClick={() => {
                  navigate("/eventVisibility");
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </ListItem>

            <ListItem sx={{ border: "1px solid grey" }}>
              <Typography>
                Event Start Date : {retrievedEventObject.eventStartDate}
              </Typography>
              <IconButton
                component="span"
                onClick={() => {
                  navigate("/eventParticulars");
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </ListItem>
            
            <ListItem sx={{ border: "1px solid grey" }}>
              <Typography>
                Event Start Time : {retrievedEventObject.eventStartTime}
              </Typography>
              <IconButton
                component="span"
                onClick={() => {
                  navigate("/eventParticulars");
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </ListItem>

            <ListItem sx={{ border: "1px solid grey" }}>
              <Typography>
                Event End Date : {retrievedEventObject.eventEndDate}
              </Typography>
              <IconButton
                component="span"
                onClick={() => {
                  navigate("/eventParticulars");
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </ListItem>
            
            <ListItem sx={{ border: "1px solid grey" }}>
              <Typography>
                Event End Time : {retrievedEventObject.eventEndTime}
              </Typography>
              <IconButton
                component="span"
                onClick={() => {
                  navigate("/eventParticulars");
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </ListItem>
            
            <ListItem sx={{ border: "1px solid grey" }}>
              <Typography>
                Event Capacity : {retrievedEventObject.eventCapacity}
              </Typography>
              <IconButton
                component="span"
                onClick={() => {
                  navigate("/eventCapacity");
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </ListItem>
            
            <ListItem sx={{ border: "1px solid grey" }}>
              <Typography>
                Event Photo :
                {retrievedEventObject.eventPhoto ? (
                  <img
                    src={retrievedEventObject.eventPhoto}
                    width={250}
                    height={250}
                    alt="Event Photo"
                  />
                ) : (
                  "None"
                )}
              </Typography>
              <IconButton
                component="span"
                onClick={() => {
                  navigate("/eventPhotoUpload");
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </ListItem>

            <ListItem sx={{ border: "1px solid grey" }}>
              <Typography>
                Pre-Event Questionnaire :{" "}
                {retrievedEventObject.preEventQuestionnaire.map(
                  (question, index) => {
                    {
                      return <ListItem>{question.question}</ListItem>;
                    }
                  }
                )}
              </Typography>
              <IconButton
                component="span"
                onClick={() => {
                  navigate("/preEventQuestionnaire");
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </ListItem>
            <UploadPhotos state={imageState} />
          </List>

        {retrievedEventObject.event_uid &&
        <Button
            variant="outlined"
            onClick={() => {
              updateEvent();
            }}
          >
            Update Event
          </Button>
        }
        {!retrievedEventObject.event_uid &&
          <Button
            variant="outlined"
            onClick={() => {
              addEvent();
            }}
          >
            Create Event
          </Button>
        }
        </Paper>
      </div>
    </>
  );
}
