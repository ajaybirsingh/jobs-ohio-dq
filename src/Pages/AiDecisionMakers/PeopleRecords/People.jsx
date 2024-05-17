import React from "react";
// import Layout from "../../Components/Layout/Layout";
import "./Style.css";
import PeopleScreen from "../../../Components/PeopleScreen/PeopleScreen";
import Layout from "../../../Components/Layout/Layout";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { APIUrlOne } from "../../../Utils/Utils";
// import PeopleScreen from "../../Components/PeopleScreen/PeopleScreen";

const PeopleRecords = () => {



  
  return (
    <>
      <Layout className={"paddingSet"}>
        <div className="PeopleRecords-parent-div">
          <PeopleScreen  />
        </div>
      </Layout>
    </>
  );
};
export default PeopleRecords;
