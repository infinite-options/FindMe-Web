import React, { useState, useEffect } from "react";
import './App.css';
import { Button, Grid, Paper, TextField } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PreRegMenu from "./components/UserPreReg/PreRegMenu";
import RegCode from "./components/UserPreReg/RegCode";
import EventProfile from "./components/UserPreReg/EventProfile";
import FindEventByDate from "./components/UserPreReg/FindEventByDate";

function App() {

  return (
    <div className="hero-container">
      <Router>
        <Routes>
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