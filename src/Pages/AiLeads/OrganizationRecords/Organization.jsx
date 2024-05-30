import React from "react";
import "./Organization.css";
import "../../../Pages/AiDecisionMakers/PeopleRecords/Style.css";
import Layout from "../../../Components/Layout/Layout";
import Organization from "../../../Components/AiLeads/OrganizationScreen/Organization";


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