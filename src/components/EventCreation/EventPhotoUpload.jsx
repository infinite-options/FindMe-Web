import React, { Component, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Grid, Typography, Button } from "@mui/material";
import { Fragment } from 'react';

export default function EventPhotoUpload() {
    const navigate = useNavigate();
    const retrievedEventObject = localStorage.getItem('event') === null ? {} : JSON.parse(localStorage.getItem('event'));

    const [image, setImage] = useState('');
    const [video, setVideo] = useState('');

    const handleCapture = ({ target }) => {
        const fileReader = new FileReader();
        const name = target.accept.includes('image') ? 'images' : 'videos';

        fileReader.readAsDataURL(target.files[0]);
        fileReader.onload = (e) => {
            setImage(e.target.result);
            setVideo(e.target.result);
        };
    };

    const saveEventObject = () => {
        console.log("** ", retrievedEventObject)
        retrievedEventObject['eventPhoto'] = image;
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
            style={{ height: "30rem" , width: "80rem" }}
            alignItems="center"
            justify="center"
            border={1}
            >
                <Typography variant="h5" sx={{mt: 2}}> {retrievedEventObject.eventType} </Typography>
                <Typography sx={{mt: 2}}> Add a Photo </Typography>
                <Grid
                container
                direction="column"
                margin={1}
                style={{ height: 250 , width: 250 }}
                alignItems="center"
                justify="center"
                border={1}
                >
                    {image && <img src={image} width={250} height={250} alt='Event Photo' />}
                </Grid>
                <Fragment>
                <input
                    accept="image/*"
                    id="icon-button-photo"
                    onChange={handleCapture}
                    type="file"
                />
                </Fragment>
            
                <Button onClick={() => { navigate('/preEventQuestionnaire'); saveEventObject() }}> Next</Button>
            </Grid>
        </div>
        </>
    )
}