import * as React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ably from "../../config/ably";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { styled } from "@mui/system";
import { blue, grey } from "@mui/material/colors";

const StyledButton = styled(Button)(
  () => `
      width: 200px;
      align-self: center;
    `
);

const StyledTextarea = styled(TextareaAutosize)(
  ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[500] : blue[200]
      };
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
);

const BroadcastMessage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { event } = location.state;
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const channel = ably.channels.get(`FindMe/${event.event_uid}`);
    channel.publish({ data: { message: "Event started" } });
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" gutterBottom>
          {"Broadcast Message"}
        </Typography>
        <Stack spacing={2} direction="column">
          {/* <CustomInput
            startAdornment={<InputAdornment>{"Subject:"}</InputAdornment>}
            placeholder="Type subject here..."
          /> */}
          <StyledTextarea
            value={message}
            minRows={5}
            placeholder="Enter message here..."
            onChange={handleMessageChange}
          />
          <StyledButton variant="contained" onClick={handleSend}>
            {"Send"}
          </StyledButton>
          <StyledButton variant="contained" onClick={() => navigate(-1)}>
            {"Back"}
          </StyledButton>
        </Stack>
      </Box>
    </Container>
  );
};

export default BroadcastMessage;
