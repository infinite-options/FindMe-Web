import React, { Component, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Grid, Typography, Button, TextField, Box, Stack } from "@mui/material";
import Searchbox from './Searchbox';
import MapComponent from './MapComponent';
import useStyles from '../../theming/styles';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function EventLocation() {
    const classes = useStyles();
    const navigate = useNavigate();
    const location = useLocation();
    const retrievedEventObject = localStorage.getItem('event') === null ? {} : JSON.parse(localStorage.getItem('event'));
    const [lat, setLat] = useState(37.236720);
    const [long, setLong] = useState(-121.887370);
    const [address, setAddress] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [locationName, setLocationName] = useState('');
    const [showAddLocation, setShowAddLocation] = useState(false);
    
    const latLongHandler = (lat, long) => {
        setLat(lat)
        setLong(long)
    }
    const addressHandler = (address, name) => {
        setLocationName(name)
        setAddress(address)
        console.log(address)

        let zip = " ";

        var addressComponents = address.split(',');
        if (addressComponents && addressComponents.length > 1) {
            var stateZipCountry = addressComponents.slice(-2);
            if (stateZipCountry && stateZipCountry.length == 2) {
                var stateZip = stateZipCountry[0]
                // console.log("stateZip ", stateZip)
                var country = stateZipCountry[1]

                var stateZip_components = stateZip.split(/(\s+)/);
                // console.log("stateZip_components ", stateZip_components)
                if (stateZip_components && stateZip_components.length >0) {
                    zip = stateZip_components.pop()
                }
            }
            console.log(" selected adddress = location ", name, "\n zip ", zip, "\n country ", country )
        }
        // console.log(address.split(',')).slice(-2)[0]
        setZipcode(zip)
    }
    const saveEventObject = () => {
        if (address === '') {
            setShowAddLocation(true)
        }
        else {
            retrievedEventObject['eventLocationName'] = locationName;
            retrievedEventObject['eventLocation'] = address;
            retrievedEventObject['eventZip'] = zipcode;
            localStorage.setItem('event', JSON.stringify(retrievedEventObject));
            console.log("retrievedEventObject - ", retrievedEventObject)

            if (location.state && location.state.edit) {
                navigate(-1);
            }
            else {
                navigate('/eventTitle');
            }
        }
    }

    const DialogAddLocation = () => {
    return (
      <Dialog
        open={showAddLocation}
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
          Enter Event Location
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              setShowAddLocation(false);
            }}
          >
            Okay
          </Button>
        </DialogActions>
        </Dialog>
        )
    }
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
          sx={{mt:5}}
        >
        <Typography variant="h4" className={classes.whiteText}>
            Event Location
        </Typography>
        </Stack>
        <Stack 
          direction="row"
          justifyContent="flex-start"
        >
        <Grid
        container
        direction="column"
        margin={1}
        style={{ height: "80rem" , width: "80rem" }}
        alignItems="center"
        justify="center"
        >
            {DialogAddLocation()}
            <Searchbox
                latLongHandler={latLongHandler}
                addressHandler={addressHandler}
            ></Searchbox>
            <MapComponent
                latitude={lat}
                longitude={long}
            ></MapComponent >
            <Stack 
            direction="row"
            justifyContent="flex-start"
            sx={{mt:5}}
            >
                <Button
                className={classes.button}
                onClick={() => {
                    saveEventObject()
                }}> Next</Button>
            </Stack>
        </Grid>
        </Stack>
        </Box>
        </>
    )
}