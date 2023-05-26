import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { mediumBold, xSmall, small } from "../../styles";
export default function EventByType() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [eventType, setEventType] = useState("");
  const [eventTypeSet, setEventTypeSet] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const getEventsByType = () => {
    axios
      .get(
        `https://qlw29nnkwh.execute-api.us-west-1.amazonaws.com/dev/api/v2/GetEvents?event_type=${eventType}`
      )
      .then((response) => {
        console.log(response.data.result);
        setEvents(response.data.result);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getEventsByType();
  }, [eventTypeSet]);

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
        Events By Type {eventTypeSet ? `: ${eventType}` : ""}
        {!eventTypeSet ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              margin: "2rem 0rem",
            }}
          >
            {" "}
            <Button
              variant="outlined"
              sx={{ mt: 1, width: "10rem" }}
              onClick={() => {
                setEventType("Business Networking");
                setEventTypeSet(true);
              }}
            >
              Business Networking
            </Button>
            <Button
              variant="outlined"
              sx={{ mt: 1, width: "10rem" }}
              onClick={() => {
                setEventType("Party");
                setEventTypeSet(true);
              }}
            >
              Party
            </Button>
            <Button
              variant="outlined"
              sx={{ mt: 1, width: "10rem" }}
              onClick={() => {
                setEventType("Social Mixer");
                setEventTypeSet(true);
              }}
            >
              Social Mixer
            </Button>
            <Button
              variant="outlined"
              sx={{ mt: 1, width: "10rem" }}
              onClick={() => {
                setEventType("Other");
                setEventTypeSet(true);
              }}
            >
              Other
            </Button>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              margin: "2rem 0rem",
            }}
          >
            {!isLoading
              ? events.map((event) => {
                  return (
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        border: "1px solid black",
                        borderRadius: "5px",
                        margin: "1rem 0rem",
                        padding: "1rem",
                        width: "400px",
                      }}
                      onClick={() => {
                        navigate("/preregistration-event", {
                          state: { event: event },
                        });
                      }}
                    >
                      <div
                        style={{
                          width: "50px",
                          border: "1px solid red",
                          padding: "1rem",
                          margin: "0rem 1rem",
                        }}
                      >
                        img
                      </div>
                      <div style={{ lineHeight: "2px" }}>
                        <p style={mediumBold}>{event.event_title}</p>
                        <p style={small}>{event.event_description}</p>
                        <p style={small}>{event.event_start_date}</p>
                        <p style={small}>
                          {event.event_start_time} - {event.event_end_time}
                        </p>
                      </div>
                    </Box>
                  );
                })
              : `No events of type ${eventType}`}
            {}
          </div>
        )}
      </Grid>
    </div>
  );
}
