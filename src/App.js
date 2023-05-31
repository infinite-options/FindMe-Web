import React, { useState, useEffect } from "react";
import "./App.css";
import { Button, Grid, Paper, TextField } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PreRegMenu from "./components/UserPreReg/PreRegMenu";
import RegCode from "./components/UserPreReg/RegCode";
import EventProfile from "./components/UserPreReg/EventProfile";
import FindEventByDate from "./components/UserPreReg/FindEventByDate";
import Welcome from "./components/Home/Welcome";
import EventTypeMenu from "./components/EventCreation/EventTypeMenu";
import EventVisibility from "./components/EventCreation/EventVisibility";
import EventParticulars from "./components/EventCreation/EventParticulars";
import EventLocation from "./components/EventCreation/EventLocation";
import EventTitle from "./components/EventCreation/EventTitle";
import EventCapacity from "./components/EventCreation/EventCapacity";
import EventPhotoUpload from "./components/EventCreation/EventPhotoUpload";
import PreEventQuestionnaire from "./components/EventCreation/PreEventQuestionnaire";
import EventReview from "./components/EventCreation/EventReview";
import EventCreationConfirmation from "./components/EventCreation/EventCreationConfirmation";
import PreRegistration from "./components/UserAfterPreReg/PreRegistration";
import PreRegQuestionnare from "./components/UserAfterPreReg/PreRegQuestionnare";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import EmailSignup from "./components/Signup/EmailSignup";
import GoogleSignupForm from "./components/Signup/GoogleSignupForm";
import EmailSignupForm from "./components/Signup/EmailSignupForm";
import RegistrationConfirmation from "./components/UserAfterPreReg/RegistrationConfirmation";
import CreateFindMeCard from "./components/UserAfterPreReg/CreateFindMeCard";
import ValidationCode from "./components/Signup/ValidationCode";
import FindEvent from "./components/FindEvents/FindEvent";
import EventList from "./components/FindEvents/EventList";
import CurrentRSVPs from "./components/FindEvents/CurrentRSVPs";
import EventByType from "./components/FindEvents/EventByType";
import Searchbox from "./components/EventCreation/Searchbox";
import EventsByOrganizer from "./components/FindEvents/EventsByOrganizer";
import EditEventsReg from "./components/UserAfterPreReg/EditEventsReg";
import EventsRegDetails from "./components/UserAfterPreReg/EventsRegDetails";
import CurrentEvents from "./components/Arrival/CurrentEvents";
import EventDashboard from "./components/Arrival/EventDashboard";
import EventAgenda from "./components/Arrival/EventAgenda";
import BroadcastMessage from "./components/Arrival/BroadcastMessage";
import EventAttendees from "./components/Arrival/EventAttendees";
import AttendeeDetails from "./components/Arrival/AttendeeDetails";
import AttendeeCheckin from "./components/Arrival/AttendeeCheckin";
import NetworkingDashboard from "./components/Arrival/NetworkingDashboard";
import Networking from "./components/Arrival/Networking";
import ShowCheckinCode from "./components/Arrival/ShowCheckinCode";
import OrganizerEventList from "./components/EventCreation/OrganizerEventList";
import EventByLocation from "./components/FindEvents/EventByLocation";

function App() {
  return (
    <div className="hero-container">
      <Router>
        <Routes>
          <Route exact path="/" element={<Welcome />} />
          <Route exact path="/eventTypeMenu" element={<EventTypeMenu />} />
          <Route exact path="/eventVisibility" element={<EventVisibility />} />
          <Route
            exact
            path="/eventParticulars"
            element={<EventParticulars />}
          />
          <Route exact path="/eventLocation" element={<EventLocation />} />
          <Route exact path="/eventTitle" element={<EventTitle />} />
          <Route
            exact
            path="/eventPhotoUpload"
            element={<EventPhotoUpload />}
          />
          <Route
            exact
            path="/preEventQuestionnaire"
            element={<PreEventQuestionnaire />}
          />
          <Route exact path="/eventReview" element={<EventReview />} />
          <Route
            exact
            path="/eventCreationConfirmation"
            element={<EventCreationConfirmation />}
          />
          <Route exact path="/pre-registration" element={<PreRegMenu />} />
          <Route exact path="/registrationCode" element={<RegCode />} />
          <Route exact path="/eventProfile" element={<EventProfile />} />
          <Route exact path="/findEventByDate" element={<FindEventByDate />} />
          <Route
            exact
            path="/preregistration-event"
            element={<PreRegistration />}
          />
          <Route
            exact
            path="/registration-questionnare"
            element={<PreRegQuestionnare />}
          />
          <Route
            exact
            path="/registration-confirmation"
            element={<RegistrationConfirmation />}
          />{" "}
          <Route exact path="/edit-event" element={<EditEventsReg />} />{" "}
          <Route exact path="/event-details" element={<EventsRegDetails />} />
          <Route exact path="/create-card" element={<CreateFindMeCard />} />
          <Route exact path="/login" element={<Login />} />{" "}
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/email-signup" element={<EmailSignup />} />
          <Route
            exact
            path="/google-signup-form"
            element={<GoogleSignupForm />}
          />
          <Route
            exact
            path="/email-signup-form"
            element={<EmailSignupForm />}
          />
          <Route exact path="/validate-code" element={<ValidationCode />} />
          <Route exact path="/find-event" element={<FindEvent />} />
          <Route exact path="/event-list" element={<EventList />} />
          <Route exact path="/current-rsvps" element={<CurrentRSVPs />} />
          <Route exact path="/event-bytype" element={<EventByType />} />{" "}
          <Route
            exact
            path="/event-byorganizer"
            element={<EventsByOrganizer />}
          />
          <Route exact path="/event-bylocation" element={<EventByLocation />} />
          <Route exact path="/welcome" element={<Welcome />} />
          <Route
            exact
            path="/organizerEventList"
            element={<OrganizerEventList />}
          />
          <Route exact path="/eventTypeMenu" element={<EventTypeMenu />} />
          <Route exact path="/eventVisibility" element={<EventVisibility />} />
          <Route
            exact
            path="/eventParticulars"
            element={<EventParticulars />}
          />
          <Route exact path="/eventLocation" element={<EventLocation />} />
          <Route exact path="/eventTitle" element={<EventTitle />} />
          <Route
            exact
            path="/eventPhotoUpload"
            element={<EventPhotoUpload />}
          />
          <Route
            exact
            path="/preEventQuestionnaire"
            element={<PreEventQuestionnaire />}
          />
          <Route exact path="/eventReview" element={<EventReview />} />
          <Route
            exact
            path="/eventCreationConfirmation"
            element={<EventCreationConfirmation />}
          />
          <Route exact path="/eventCapacity" element={<EventCapacity />} />
          <Route
            exact
            path="/broadcastMessage"
            element={<BroadcastMessage />}
          />
          <Route exact path="/pre-registration" element={<PreRegMenu />} />
          <Route exact path="/registrationCode" element={<RegCode />} />
          <Route exact path="/eventProfile" element={<EventProfile />} />
          <Route exact path="/findEventByDate" element={<FindEventByDate />} />
          <Route exact path="/searchbox" element={<Searchbox />} />
          <Route exact path="/currentEvents" element={<CurrentEvents />} />
          <Route exact path="/eventDashboard" element={<EventDashboard />} />
          <Route exact path="/eventAgenda" element={<EventAgenda />} />
          <Route exact path="/eventAttendees" element={<EventAttendees />} />
          <Route exact path="/attendeeDetails" element={<AttendeeDetails />} />
          <Route exact path="/attendeeCheckin" element={<AttendeeCheckin />} />
          <Route exact path="/networking" element={<Networking />} />
          <Route
            exact
            path="/networkingDashboard"
            element={<NetworkingDashboard />}
          />
          <Route exact path="/showCheckinCode" element={<ShowCheckinCode />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
