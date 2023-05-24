import React, { useState, useEffect } from "react";
import './App.css';
import { Button, Grid, Paper, TextField } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PreRegMenu from "./components/UserPreReg/PreRegMenu";
import RegCode from "./components/UserPreReg/RegCode";
import EventProfile from "./components/UserPreReg/EventProfile";
import FindEventByDate from "./components/UserPreReg/FindEventByDate"
import Welcome from "./components/Home/Welcome";
import EventTypeMenu from "./components/EventCreation/EventTypeMenu";
import EventVisibility from "./components/EventCreation/EventVisibility";
import EventParticulars from "./components/EventCreation/EventParticulars";
import EventLocation from "./components/EventCreation/EventLocation";
import EventTitle from "./components/EventCreation/EventTitle";
import EventPhotoUpload from "./components/EventCreation/EventPhotoUpload";
import PreEventQuestionnaire from "./components/EventCreation/PreEventQuestionnaire";
import EventReview from "./components/EventCreation/EventReview";
import EventCreationConfirmation from "./components/EventCreation/EventCreationConfirmation";
function App() {

  return (
    <div className="hero-container">
      <Router>
        <Routes>
          <Route exact path='/welcome' element={<Welcome />} />
          <Route exact path='/eventTypeMenu' element={<EventTypeMenu />} />
          <Route exact path='/eventVisibility' element={<EventVisibility />} />
          <Route exact path='/eventParticulars' element={<EventParticulars />} />
          <Route exact path='/eventLocation' element={<EventLocation />} />
          <Route exact path='/eventTitle' element={<EventTitle />} />
          <Route exact path='/eventPhotoUpload' element={<EventPhotoUpload />} />
          <Route exact path='/preEventQuestionnaire' element={<PreEventQuestionnaire />} />
          <Route exact path='/eventReview' element={<EventReview />} />
          <Route exact path='/eventCreationConfirmation' element={<EventCreationConfirmation />} />

          <Route exact path='/pre-registration' element={<PreRegMenu />} />
          <Route exact path='/registrationCode' element={<RegCode />} />
          <Route exact path='/eventProfile' element={<EventProfile />} />
          <Route exact path='/findEventByDate' element={<FindEventByDate/>} />

        </Routes>
      </Router>
    </div>
  )
}

export default App;