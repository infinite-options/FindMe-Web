import React, { useState, useEffect } from "react";
import "./App.css";
import LoginContext, { LoginInitState } from "./LoginContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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
import EventDetails from "./components/EventCreation/EventDetails";
import EmailBroadcastMessage from "./components/EventCreation/EmailBroadcastMessage";
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
import EventRegistrations from "./components/Arrival/EventRegistrations";
import RegistrantDetails from "./components/Arrival/RegistrantDetails";
import AttendeeCheckin from "./components/Arrival/AttendeeCheckin";
import NetworkingActivity from "./components/Arrival/NetworkingActivity";
import ShowRegistrationCode from "./components/Arrival/ShowRegistrationCode";
import Waiting from "./components/Arrival/Waiting";
import OrganizerEventList from "./components/EventCreation/OrganizerEventList";
import SeeEventsList from "./components/EventCreation/SeeEventsList";
import EventPreRegCode from "./components/EventCreation/EventPreRegCode";
import EventCheckInCode from "./components/EventCreation/EventCheckInCode";
import EventAttendeesList from "./components/EventCreation/EventAttendeesList";
import EventByLocation from "./components/FindEvents/EventByLocation";
import EarlyArrival from "./components/Arrival/EarlyArrival";
import ActivityWaiting from "./components/Arrival/ActivitiyWaiting";
import useStyles from "./theming/styles";

function App() {
  const [loginState, setLoginState] = useState(LoginInitState);
  const classes = useStyles();

  const isSignedIn =
    document.cookie.split("; ").find((row) => row.startsWith("loggedIn=")) !==
    undefined
      ? loginState.loggedIn
        ? loginState.loggedIn
        : document.cookie
            .split("; ")
            .find((row) => row.startsWith("loggedIn="))
            .split("=")[1]
      : loginState.loggedIn;
  useEffect(
    () => console.log("curUser = ", loginState.user_uid),
    [loginState.user_uid]
  );

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Box className={classes.box}>
        <Router>
          <LoginContext.Provider
            value={{
              loginState: loginState,
              setLoginState: setLoginState,
            }}
          >
            {" "}
            <Routes>
              <Route exact path="/" element={<Welcome />} />
              <Route exact path="/eventTypeMenu" element={<EventTypeMenu />} />
              <Route
                exact
                path="/eventVisibility"
                element={<EventVisibility />}
              />
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
                path="/eventPreRegCode"
                element={<EventPreRegCode />}
              />
              <Route exact path="/eventDetails" element={<EventDetails />} />
              <Route
                exact
                path="/emailBroadcastMessage"
                element={<EmailBroadcastMessage />}
              />
              <Route exact path="/pre-registration" element={<PreRegMenu />} />
              <Route exact path="/registrationCode" element={<RegCode />} />
              <Route exact path="/eventProfile" element={<EventProfile />} />
              <Route
                exact
                path="/findEventByDate"
                element={<FindEventByDate />}
              />
              <Route
                exact
                path="/preregistration-event/:id"
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
              <Route
                exact
                path="/event-details"
                element={<EventsRegDetails />}
              />
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
              <Route
                exact
                path="/event-bytype"
                element={<EventByType />}
              />{" "}
              <Route
                exact
                path="/event-byorganizer"
                element={<EventsByOrganizer />}
              />
              <Route exact path="/welcome" element={<Welcome />} />
              <Route
                exact
                path="/organizerEventList"
                element={<OrganizerEventList />}
              />
              <Route exact path="/seeEventsList" element={<SeeEventsList />} />
              <Route
                exact
                path="/eventAttendeesList"
                element={<EventAttendeesList />}
              />
              <Route exact path="/eventTypeMenu" element={<EventTypeMenu />} />
              <Route
                exact
                path="/eventVisibility"
                element={<EventVisibility />}
              />
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
                path="/eventCheckInCode"
                element={<EventCheckInCode />}
              />
              <Route exact path="/eventCapacity" element={<EventCapacity />} />
              <Route exact path="/pre-registration" element={<PreRegMenu />} />
              <Route exact path="/registrationCode" element={<RegCode />} />
              <Route exact path="/eventProfile" element={<EventProfile />} />
              <Route
                exact
                path="/findEventByDate"
                element={<FindEventByDate />}
              />
              <Route exact path="/searchbox" element={<Searchbox />} />
              <Route exact path="/currentEvents" element={<CurrentEvents />} />
              <Route
                exact
                path="/event-bylocation"
                element={<EventByLocation />}
              />
              <Route
                exact
                path="/eventDashboard"
                element={<EventDashboard />}
              />
              <Route
                exact
                path="/eventRegistrations"
                element={<EventRegistrations />}
              />
              <Route
                exact
                path="/registrantDetails"
                element={<RegistrantDetails />}
              />
              <Route
                exact
                path="/attendeeCheckin"
                element={<AttendeeCheckin />}
              />
              <Route
                exact
                path="/networkingActivity"
                element={<NetworkingActivity />}
              />
              <Route
                exact
                path="/showRegistrationCode"
                element={<ShowRegistrationCode />}
              />
              <Route exact path="/waiting" element={<Waiting />} />
              <Route
                exact
                path="/activityWaiting"
                element={<ActivityWaiting />}
              />
              <Route exact path="/earlyArrival" element={<EarlyArrival />} />
            </Routes>
          </LoginContext.Provider>
        </Router>
      </Box>
      <Typography variant="h3" align="center" className={classes.blueText}>
        {"bizbuz.design"}
      </Typography>
    </Container>
  );
}

export default App;
