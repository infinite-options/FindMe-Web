import React, { Component, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Grid, Typography, Button, TextField, Box, Stack } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import useStyles from '../../theming/styles';

export default function EventCapacity() {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const retrievedEventObject =
    localStorage.getItem("event") === null
      ? {}
      : JSON.parse(localStorage.getItem("event"));
  const [limitOption, setLimitOption] = useState(retrievedEventObject && retrievedEventObject.eventCapacity!=="No Limit" ? "Set Limit" : "No Limit");
  const [eventCapacity, setEventCapacity] = useState(retrievedEventObject && retrievedEventObject.eventCapacity ? retrievedEventObject.eventCapacity : "No Limit");
  const [disabled, setDisabled] = useState(retrievedEventObject && retrievedEventObject.eventCapacity!=="No Limit" ? false : true);

  const handleSetLimitChange = (e) => {
    setLimitOption(e.target.value);
    if (e.target.value === "No Limit") {
      setDisabled(true);
      setEventCapacity("No Limit");
    }
    if (e.target.value === "Set Limit") {
      setDisabled(false);
    }
  };
  const handleCapacityChange = (e) => {
    setEventCapacity(e.target.value);
  };

  const saveEventObject = () => {
    console.log("** ", retrievedEventObject);
    retrievedEventObject["eventCapacity"] = eventCapacity;
    localStorage.setItem("event", JSON.stringify(retrievedEventObject));
    console.log("66 ", retrievedEventObject);
  };
  return (
    <>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Stack 
          direction="row"
          justifyContent="flex-start"
        >
        <Typography variant="h2" className={classes.whiteText}>
            create
        </Typography>
        </Stack>
        <Stack 
          direction="row"
          justifyContent="flex-start"
          sx={{ mt: 5 }}
        >
        <Typography variant="h4" className={classes.whiteText}>
            Event Capacity
        </Typography>
        </Stack>
          
        <Stack 
          direction="row"
          justifyContent="flex-start"
          sx={{ mt: 5 }}
        >
          <FormControl>
            {/* <FormLabel id="demo-radio-buttons-group-label">
              <Typography className={classes.whiteText}>Select Maximum Event Capacity</Typography>
            </FormLabel> */}
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              value={limitOption}
              onChange={handleSetLimitChange}
            >
              <FormControlLabel
                value="No Limit"
                control={<Radio sx={{color: '#ffffff','&.Mui-checked': {color: '#ffffff'}}}/>}
                label={<Typography variant="h5" className={classes.whiteText}>No Limit</Typography>}
              />
              <FormControlLabel
                value="Set Limit"
                control={<Radio sx={{color: '#ffffff','&.Mui-checked': {color: '#ffffff'}}}/>}
                label={<Typography variant="h5" className={classes.whiteText}>Set Limit</Typography>}
              />
            </RadioGroup>
          </FormControl>
          </Stack>
          <Stack 
          direction="row"
          justifyContent="center"
          sx={{ mt: 5 }}
          >
            <TextField
              className={classes.textfield}
              // label="Event Capacity"
              type="number"
              value={eventCapacity}
              disabled={disabled}
              onChange={handleCapacityChange}
              sx={{ mt: 2 }}
            />
          </Stack>
          <Stack 
          direction="row"
          justifyContent="center"
          sx={{ mt: 5 }}
          >
          <Button
            className={classes.button}
            onClick={() => {
              saveEventObject()
              if(location.state && location.state.edit){
                  navigate(-1);
              }
              else{
                  navigate("/preEventQuestionnaire");
              }
            }}
          >
            {" "}
            Next
          </Button>
        </Stack>
      </Box>
    </>
  );
}
