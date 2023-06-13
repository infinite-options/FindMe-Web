import React, { Component, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Grid, Typography, Button, TextField, Box, Stack } from "@mui/material";
import Radio from "@mui/material/Radio";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Select from "@mui/material/Select";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import useStyles from "../../theming/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function PreEventQuestionnaire() {
    const classes = useStyles();
    const navigate = useNavigate();
    const location = useLocation();
    const [showAddQuestion, setShowAddQuestion] = useState(false);
    const retrievedEventObject =
        localStorage.getItem("event") === null
        ? {}
        : JSON.parse(localStorage.getItem("event"));
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [question, setQuestion] = useState("");
    const options = [
        "What is your current role?",
        "What Are you really good at?",
        "What are a few things you need?",
        "What is one thing you are really proud of?",
        "What is one thing you wish you were better at?",
        "What are one or two words that describe you?",
    ];
    
    useEffect(() => {
        let ques = [];
        if (retrievedEventObject && retrievedEventObject.preEventQuestionnaire && retrievedEventObject.preEventQuestionnaire.length !== 0) {
            let questions = retrievedEventObject.preEventQuestionnaire;
            questions.map(question => {
                ques.push(question.question)
            })
        }
        console.log(ques);
        setSelectedOptions(ques);
    },[])
    const handleSelectOption = (e) => {
        if (selectedOptions.length < 3) {
        setSelectedOptions([...selectedOptions, e.target.value]);
        }
    };

    const handleDeselectOption = (option) => {
        const newSelectedOptions = selectedOptions.filter((o) => o !== option);
        setSelectedOptions(newSelectedOptions);
    };

    const handleQuestionInput = (e) => {
        setQuestion(e.target.value);
    };

    const handleAddQuestion = (question) => {
        console.log(" question ", question)
        if (question === "" || question === " ") {
            setShowAddQuestion(true)
        }
        else {
            if (selectedOptions.length < 3) {
            setSelectedOptions([...selectedOptions, question]);
            }
            setQuestion("")
        }
    };

    const saveEventObject = () => {
        let preEventQuestionnaire = selectedOptions.map((question, index) => ({
        id: index + 1,
        question: question,
        }));
        // console.log("preEventQuestionnaire - ", preEventQuestionnaire);

        retrievedEventObject["preEventQuestionnaire"] = preEventQuestionnaire;
        localStorage.setItem("event", JSON.stringify(retrievedEventObject));
        // console.log("retrievedEventObject - ", retrievedEventObject);
    };

    const DialogAddQuestion = () => {
    return (
      <Dialog
        open={showAddQuestion}
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
          Enter question
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              setShowAddQuestion(false);
            }}
          >
            Okay
          </Button>
        </DialogActions>
        </Dialog>
        )}
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
            Event Questionnaire
        </Typography>
        </Stack>
        
        <FormControl>
        <Stack 
          direction="row"
          justifyContent="flex-start"
          sx={{ mt: 5 }}
        >
            <FormLabel id="demo-radio-buttons-group-label">
                <Typography className={classes.whiteText}>Select from list</Typography>
            </FormLabel>
        </Stack>
        <Stack 
          direction="row"
          justifyContent="center"
          sx={{ mt: 2 }}
        >
            <div>
            <Select
                className={classes.textfieldMulti}
                multiple
                native
                onChange={handleSelectOption}
                label="Native"
                inputProps={{
                id: "select-multiple-native",
                }}
            >                
                {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
                ))}
            </Select>

            <div style={{ marginBlock: "30px" }}>
                {DialogAddQuestion()}
                <TextField
                className={classes.textfield}
                // id="outlined-basic"
                placeholder="Write your own question"
                inputProps={{
                    autoComplete: 'off'
                }}
                // variant="outlined"
                // sx={{ mt:2 }}
                value={question}
                onChange={handleQuestionInput}
                />
                <IconButton
                color="primary"
                component="span"
                // sx={{ width: "15%" }}
                onClick={() => handleAddQuestion(question)}
                >
                <AddIcon />
                </IconButton>
            </div>
            </div>
        </Stack>
            <div>
            <List sx={{ mt: 2 }}>
                {selectedOptions.length > 0 ? (
                <Stack 
                direction="row"
                justifyContent="flex-start"
                sx={{ mt: 2 }}
                >
                <Typography variant="h5" className={classes.whiteText}>Pre-Event Questionnaire</Typography>
                </Stack> ) : (
                ""
                )}
                {selectedOptions.map((option, index) => (
                // <Stack 
                // direction="row"
                // justifyContent="center"
                // sx={{ mt: 1 }}
                // >
                //<ListItem>
                    <Grid container
                    direction="row"
                    justifyContent="center"
                    alignItems="center">
                        <Grid item xs={8} md={8}>
                            <Typography className={classes.whiteText} key={index}>
                            {option}
                            </Typography>
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <IconButton
                            color="primary"
                            component="span"
                            // sx={{ width: "15%" }}
                            onClick={() => handleDeselectOption(option)}
                            >
                            <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Grid>
                    </Grid>
                //</ListItem> 
                // </Stack>
                ))}
            </List>
            </div>
        </FormControl>
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
                    navigate("/eventReview", { state: { edit: false } });
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
