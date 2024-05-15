import React, { useEffect } from "react";
import "./Dashboard.css";
import Layout from "../../Components/Layout/Layout";
import InfoDashboard from "../../Components/InfoDashboard/InfoDashboard";
import TwitterFeed from "../../Components/TwitterFeed/TwitterFeed";
import { useOktaAuth } from "@okta/okta-react";

const Dashboard = () => {
  const auth = useOktaAuth();

  useEffect(() => {
    const getUser = async () => {
      try {
      } catch (error) { }
    };

    const fetchState = () => {
      auth.oktaAuth.token
        .parseFromUrl()
        .then(async () => {

        })
        .catch(() => { });
    };
    fetchState();

    auth.authState?.isAuthenticated && getUser();
  }, [auth.authState, auth.oktaAuth]);
  return (
    <Layout>
      <div className="child-section-of-everypage">
        <InfoDashboard />
        <TwitterFeed />
      </div>
    </Layout>
  );
};

export default Dashboard;