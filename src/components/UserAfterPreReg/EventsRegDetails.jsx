import React from "react";
import { Button, Grid, Box, ButtonBase } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function EventsRegDetails() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const event = state.event;
  console.log(event);
  console.log(JSON.parse(event.eu_qas));
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
        // style={{ height: "30rem", width: "80rem" }}
        alignItems="center"
        justify="center"
        border={1}
      >
        <div style={{ textTransform: "uppercase", fontSize: "20px" }}>
          Registration Confirmation
        </div>
        <ButtonBase
          sx={{
            width: 128,
            height: 128,
          }}
        >
          <Img
            alt="complex"
            src={`${JSON.parse(event.event_photo)}?${Date.now()}`}
          />
        </ButtonBase>
        <div style={{ margin: "1rem 0rem" }}>{event.event_title}</div>
        <div style={{ margin: "1rem 0rem", textAlign: "center" }}>
          {event.event_description}
        </div>
        {event.event_start_time} - {event.event_end_time}
        {JSON.parse(event.eu_qas).map((quest, i) => {
          return (
            <div style={{ margin: "5px" }}>
              <div>
                <p style={{ maxWidth: "250px", wordWrap: "break-word" }}>
                  {quest.question}
                </p>
              </div>
              <div>
                <Box
                  style={{
                    width: "15rem",
                    border: "1px solid black",
                    padding: "5px",
                  }}
                  //   onChange={(e) => handleChangeLater(e, i)}
                >
                  {quest.answer}
                </Box>
              </div>
            </div>
          );
        })}
        <Button
          variant="outlined"
          sx={{ my: 1 }}
          onClick={() =>
            navigate("/edit-event", {
              state: {
                event: event,
              },
            })
          }
        >
          Edit Answers
        </Button>
      </Grid>
    </div>
  );
}
