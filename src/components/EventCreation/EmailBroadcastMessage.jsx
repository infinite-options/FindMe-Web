import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  FormControl,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useNavigate } from "react-router-dom";
import ThreeDots from "../../Icons/Threedots.gif";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;
export default function EmailBroadcastMessage() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [failed, setFailed] = useState([]);
  const [showDialogSendingEmail, setShowDialogSendingEmail] = useState(false);
  const [showSendingFailed, setShowSendingFailed] = useState(false);
  const [showSendingSuccess, setShowSendingSuccess] = useState(false);
  const event =
    localStorage.getItem("event") === null
      ? {}
      : JSON.parse(localStorage.getItem("event"));
  const [attendeesEmails, setAttendeesEmails] = useState([]);
  console.log(event);
  const handleClickAttendee = (attendee) => {
    navigate("/attendeeDetails", { state: attendee });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const fetchAttendees = async () => {
    const response = await axios.get(
      `${BASE_URL}/eventAttendees?eventId=${event.event_uid}`
    );
    const data = response["data"];
    let attendees = data.attendees;
    let emails = [];
    for (let i = 0; i < attendees.length; i++) {
      emails.push(attendees[i].email);
    }
    setAttendeesEmails(emails);
  };

  useEffect(() => {
    if (event && event.event_uid) {
      fetchAttendees();
    } else setAttendeesEmails([]);
  }, []);
  const sendMessages = () => {
    let obj = {
      recipient: attendeesEmails,
      subject: subject,
      message: message,
    };
    let newstate = Object.assign(obj, event);
    console.log(newstate);
    setShowDialogSendingEmail(true);
    axios.post(BASE_URL + "/SendEmailAttendee", obj).then((response) => {
      setShowDialogSendingEmail(false);
      let failedMessages = [];
      for (let i = 0; i < response.data.message.length; i++) {
        if (response.data["message"][i].includes("failed")) {
          failedMessages.push(response.data["message"][i]);
        }
      }

      setFailed(failedMessages);
      if (failedMessages.length > 0) {
        setShowSendingFailed(true);
      } else {
        setShowSendingSuccess(true);
      }
    });
  };
  const DialogSendingEmail = () => {
    return (
      <Dialog
        open={showDialogSendingEmail}
        // onClose={onCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"></DialogTitle>
        <DialogContent>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              padding: "1rem",
            }}
          >
            <h3> Sending Emails</h3>

            <img src={ThreeDots} style={{ width: "20%" }} alt="loading..." />
          </div>
        </DialogContent>
      </Dialog>
    );
  };
  const DialogSendingFailed = () => {
    return (
      <Dialog
        open={showSendingFailed}
        // onClose={onCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Failed Messages</DialogTitle>
        <DialogContent>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              padding: "2rem",
            }}
          >
            {failed.map((fail) => {
              return (
                <div>
                  <h5> {fail}</h5> <br />
                </div>
              );
            })}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSendingFailed(false)}>Okay</Button>
        </DialogActions>
      </Dialog>
    );
  };
  const DialogSendingSuccess = () => {
    return (
      <Dialog
        open={showSendingSuccess}
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
          Sent Successfully
        </DialogTitle>

        <DialogActions>
          <Button
            onClick={() => {
              setShowSendingSuccess(false);
              navigate("/eventDetails");
            }}
          >
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
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
        {" "}
        {DialogSendingEmail()}
        {DialogSendingFailed()}
        {DialogSendingSuccess()}
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
            Broadcast Message{" "}
          </Typography>
          <Typography sx={{ mt: 2 }}> What Do you want to say? </Typography>
          <TextField
            style={{ borderRadius: 0 }}
            type="email"
            value={subject}
            margin="normal"
            label="Subject"
            size="small"
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setSubject(e.target.value)}
            fullWidth
          />

          <TextField
            style={{ borderRadius: 0 }}
            type="email"
            value={message}
            margin="normal"
            label="Message"
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setMessage(e.target.value)}
            fullWidth
            multiline
          />

          <Button variant="outlined" sx={{ mt: 2 }} onClick={sendMessages}>
            Send
          </Button>
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => navigate("/eventDetails")}
          >
            Event Details
          </Button>
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </Paper>
      </div>
    </>
  );
}
