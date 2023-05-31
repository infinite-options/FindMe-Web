import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { mediumBold, xSmall, small } from "../../styles";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

export default function EventByOrganizer() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [organizers, setOrganizers] = useState("");
  const [eventOrganizer, setEventOrganizer] = useState("");
  const [eventOrganizerSet, setEventOrganizerSet] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getOrganizers = () => {
    axios.get(BASE_URL + `/GetOrganizers`).then((response) => {
      setOrganizers(response.data.result);
      setIsLoading(false);
    });
  };

  const getEventsByOrganizer = (id) => {
    axios
      .get(BASE_URL + `/GetEvents?event_organizer_uid=${id}`)
      .then((response) => {
        setEvents(response.data.result);
        setEventOrganizerSet(true);
      });
  };
  useEffect(() => {
    getOrganizers();
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
        Events By Organizer {eventOrganizerSet ? `: ${eventOrganizer}` : ""}
        {!eventOrganizerSet ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              margin: "2rem 0rem",
            }}
          >
            {organizers &&
              organizers.map((organizer) => {
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
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setEventOrganizer(
                        organizer.first_name + " " + organizer.last_name
                      );
                      getEventsByOrganizer(organizer.user_uid);
                    }}
                  >
                    {organizer.first_name} {organizer.last_name}
                  </Box>
                );
              })}
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
                        cursor: "pointer",
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
              : `No events of type ${eventOrganizer}`}
            {}
          </div>
        )}
      </Grid>
    </div>
  );
}
