import React, { Component, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, Button, TextField } from "@mui/material";
import Radio from '@mui/material/Radio';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export default function PreEventQuestionnaire() {
    const navigate = useNavigate();
    const retrievedEventObject = localStorage.getItem('event') === null ? {} : JSON.parse(localStorage.getItem('event'));

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [question, setQuestion] = useState('')
    const options = [
        'What is your current role?',
        'What Are You Really Good At?',
        'What are a Few Things you Need?',
        'What is one thing you are really proud of?',
        'What is one thing you wish you were better at?',
        'What are one or two words that describe you?'
    ];
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
        setQuestion(e.target.value)
    }

    const handleAddQuestion = (question) => {
        if (selectedOptions.length < 3) {
        setSelectedOptions([...selectedOptions, question]);
        }
    }

    const saveEventObject = () => {        
        let preEventQuestionnaire = selectedOptions.map((question, index) => ({ id: index + 1, question: question }));
        console.log("preEventQuestionnaire - ", preEventQuestionnaire)

        retrievedEventObject['preEventQuestionnaire'] = preEventQuestionnaire;
        localStorage.setItem('event', JSON.stringify(retrievedEventObject));
        console.log("66 ",retrievedEventObject)
    }

    return (
        <>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: "5%" }}>
            <Grid
            container
            direction="column"
            margin={1}
            style={{ width: "80rem" }}
            alignItems="center"
            justify="center"
            border={1}
            >
                <Typography variant="h5" sx={{mt: 2}}> {retrievedEventObject.eventType} </Typography>
                <Typography sx={{mt: 2}}> What Questions Should be on the Questionnaire? </Typography>
                
                <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                            Select from list
                </FormLabel>
                <div>
                <Select
                multiple
                native
                // value={personName}
                onChange={handleSelectOption}
                label="Native"
                inputProps={{
                    id: 'select-multiple-native',
                }}
                >
                
                {options.map((option, index) => (
                    <option key={index} value={option}>
                            {option}
                        </option>
                ))}
                </Select>
                
                <div style={{ marginBlock: '5px' }}>
                <TextField 
                id="outlined-basic" 
                label="Write your own question" 
                variant="outlined" sx={{ width: '85%'}} 
                value={question}
                onChange={handleQuestionInput}/>
                <IconButton color="primary" component="span" sx={{ width: '15%'}} onClick={()=>handleAddQuestion(question)}>
                    <AddIcon />
                </IconButton>
                </div>
                </div>

                <div>
                    <List sx={{ width: '100%', bgcolor: 'background.paper', mt:2 }}>
                    {selectedOptions.length>0 ? <Typography>Pre-Event Questionnaire</Typography> : ""}
                    {selectedOptions.map((option, index) => (
                        <ListItem sx={{ border: '1px solid grey' }}>                    
                        <Typography key={index} sx={{ width: '85%'}}>{option}</Typography>
                        <IconButton component="span" sx={{ width: '15%'}} onClick={()=>handleDeselectOption(option)}>
                            <DeleteIcon fontSize="small"/>
                        </IconButton>
                    </ListItem>
                    ))}
                    </List>
                </div>
                </FormControl>
                <Button onClick={() => { navigate('/eventReview'); saveEventObject() }}> Next</Button>
            </Grid>
        </div>
        </>
    )
}