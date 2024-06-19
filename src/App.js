import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import DecisionMaker from "./Pages/AiDecisionMakers/Index";
import AILeads from "./Pages/AiLeads/Index";
import Login from "./Components/Auth/Login/Login";
import { Security } from "@okta/okta-react";
import { OktaAuth } from '@okta/okta-auth-js';
import { ToastContainer } from "react-toastify";
import { SetOktaIssuer } from "./Utils/Utils";
import {
  AI_DECISION_MAKER,
  LOGIN,
  ORGANIZATION,
  ORGANIZATION_RECORDS,
  ORG_DETAILS,
  PEOPLE_RECORDS,
  REGISTER,
} from "./Utils/Constants";
import PeopleRecords from "./Pages/AiDecisionMakers/PeopleRecords/People";
import OrganizationRecords from "./Pages/AiLeads/OrganizationRecords/Organization";
import ReactGA from "react-ga4";
import OrgDetails from "./Pages/OrgDetails/OrgDetails";
import Register from "./Components/Auth/Register/Register";
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
    ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search });
  }, [window.location]);
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
            <Route path={ORGANIZATION} element={<AILeads />} />
            <Route path={AI_DECISION_MAKER} element={<DecisionMaker />} />
            <Route path={PEOPLE_RECORDS} element={<PeopleRecords />} />
            <Route path={ORGANIZATION_RECORDS} element={<OrganizationRecords />} />
            <Route path={ORG_DETAILS} element={<OrgDetails />} />
            <Route path={REGISTER} element={<Register />} />
          </Routes>
        </Security>
      </Router>
    </div>
  );
}
export default App;