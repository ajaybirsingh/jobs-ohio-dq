import React from "react";
import Layout from "../../Components/Layout/Layout";
import OrgDetailsScreen from "../../Components/AiLeads/OrganizationScreen/OrgDetailScreen/OrgDetailScreen";
import OrgTabsScreen from "../../Components/AiLeads/OrganizationScreen/OrgDetailScreen/OrgTabs/OrgTabsScreen";

const OrgDetails = () => {
  return (
    <>
      <Layout>
        <div className="child-section-of-everypage">
            <OrgDetailsScreen/>
            <OrgTabsScreen/>
        </div>
      </Layout>
    </>
  );
};
export default OrgDetails;