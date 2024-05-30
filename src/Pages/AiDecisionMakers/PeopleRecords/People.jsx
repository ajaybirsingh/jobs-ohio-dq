import React from "react";
import "./Style.css";
import PeopleScreen from "../../../Components/PeopleScreen/PeopleScreen";
import Layout from "../../../Components/Layout/Layout";


const PeopleRecords = () => {
    
    return (
        <>
            <Layout className={"paddingSet"}>
                <div className="PeopleRecords-parent-div">
                    <PeopleScreen />
                </div>
            </Layout>
        </>
    );
};
export default PeopleRecords;