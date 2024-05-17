import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DecisionMaker from "./Pages/AiDecisionMakers/Index";
import AILeads from "./Pages/AiLeads/Index";
import AiProfile from "./Pages/AiProfile/Index";
import ProfileFormTable from "./Pages/AiProfile/ProfileFormTable/Index";
import ProspectProfile from "./Pages/AiProfile/AiProspectProfile/Index";
import Login from "./Components/Auth/Login/Login";
import { Security } from "@okta/okta-react";
import { OktaAuth } from '@okta/okta-auth-js';
import CompanyProfileScreen from "./Pages/AiLeads/CompanyProfileScreen/Index";
import AiPath from "./Pages/AiPath/Index";
import TwitterFeed from "./Components/TwitterFeed/TwitterFeed";
import { ToastContainer } from "react-toastify";
import { SetOktaIssuer } from "./Utils/Utils";
import {
  AI_DECISION_MAKER,
  AI_LEADS,
  AI_PATH,
  AI_PROFILE,
  AI_PROFILE_FORM_TABLE,
  AI_PROSPECT_PROFILE,
  COMING_SOON,
  COMPANY_PROFILE_SCREEN,
  CONTACT_US,
  DASHBOARD,
  FAQ_SCREEN,
  JOI_TRAINING,
  LOGIN,
  LOGIN_CALLBACK,
  PDF_SAMPLE,
  PEOPLE_RECORDS,
  TWITTER_FEED,
} from "./Utils/Constants";
import ContactUs from "../src/Pages/ContactUs/Index";
import FaqLayout from "./Pages/FAQ/Index";
import Comingsoon from "./Components/ComingSoon/ComingSoon";
import LoginVerify from "./Components/Auth/Login/LoginVerify";
import PDFSample from "./Components/AiLeads/CompanyProfile/PDF/Index";
import CombinedPDFComponent from "./Pages/AiLeads/PDFDATA/CombinedData";
import JoiTraining from "./Pages/JoiTraining/Index";
import ReactGA from "react-ga4";
import PeopleRecords from "./Pages/AiDecisionMakers/PeopleRecords/People";
function App() {
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    window.location.replace(originalUri);
  };
  const oktaAuth = new OktaAuth({
    issuer: SetOktaIssuer(),
    clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
    redirectUri: `${window.location.origin}/login/callback`,
    tokenManager: {
      storage: "sessionStorage",
    },
    storageManager: {
      token: {
        storageTypes: ["localStorage"],
      },
    },
  });

  useEffect(() => {
    console.log("Tracking page view: ", window.location.pathname + window.location.search);
    ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search });
  }, [window.location]); // This ensures the effect is only run on location change
return (
  <div className="App">
    <Router>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
        <Routes>
          <Route path={LOGIN} element={<Login />} />
          <Route path={DASHBOARD} element={<Dashboard />} />
          <Route path={TWITTER_FEED} element={<TwitterFeed />} />
          <Route path={AI_LEADS} element={<AILeads />} />
          <Route path={AI_DECISION_MAKER} element={<DecisionMaker />} />
          <Route path={AI_PATH} element={<AiPath />} />
          <Route path={AI_PROFILE} element={<AiProfile />} />
          <Route
            path={AI_PROFILE_FORM_TABLE}
            element={<ProfileFormTable />}
          />
          <Route path={AI_PROSPECT_PROFILE} element={<ProspectProfile />} />
          <Route
            path={COMPANY_PROFILE_SCREEN}
            element={<CompanyProfileScreen />}
          />
          <Route path={CONTACT_US} element={<ContactUs />} />
          <Route path={FAQ_SCREEN} element={<FaqLayout />} />
          <Route path={JOI_TRAINING} element={<JoiTraining />} />

          <Route path={COMING_SOON} element={<Comingsoon />} />
          <Route path={LOGIN_CALLBACK} element={<LoginVerify />} />
          <Route path={PDF_SAMPLE} element={<PDFSample />} />
          <Route path={'/combinedData'} element={<CombinedPDFComponent />} />
          <Route path={PEOPLE_RECORDS} element={<PeopleRecords />} />
          
        </Routes>
      </Security>
    </Router>
  </div>
);
}
export default App;