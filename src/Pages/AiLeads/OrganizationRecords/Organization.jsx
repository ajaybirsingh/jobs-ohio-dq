import React from "react";
// import Layout from "../../Components/Layout/Layout";
import "./Organization.css";
import "../../../Pages/AiDecisionMakers/PeopleRecords/Style.css";
import Layout from "../../../Components/Layout/Layout";
import Organization from "../../../Components/AiLeads/OrganizationScreen/Organization";
// import PeopleScreen from "../../../Components/PeopleScreen/PeopleScreen";
// import Layout from "../../../Components/Layout/Layout";


const OrganizationRecords = () => {

    return (
        <>
            <Layout className={"paddingSet"}>
                <div className="PeopleRecords-parent-div">
                    <Organization />
                </div>
            </Layout>
        </>
    );
};
export default OrganizationRecords;