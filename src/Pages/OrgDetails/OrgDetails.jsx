import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import OrgDetailsScreen from "../../Components/AiLeads/OrganizationScreen/OrgDetailScreen/OrgDetailScreen";
import OrgTabsScreen from "../../Components/AiLeads/OrganizationScreen/OrgDetailScreen/OrgTabs/OrgTabsScreen";
import { useLocation } from "react-router-dom";
import { APIUrlFour } from "../../Utils/Utils";
import axios from "axios";
import Loader from "../../Components/Loader/Loader";

const OrgDetails = () => {
  const location = useLocation();
  const locationdata = location?.state;
  const [loading, setLoading] = useState(false);
  const [organizationData, setOrganizationData] = useState('');

  const fetOrgData = () => {
    setLoading(true);
    const data = {}
    data.uuid = locationdata?.uuid;
    data.record_type = 'organization';
    const option = {
      method: "POST",
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json",
      },
      url: `${APIUrlFour()}/v1/fetch_record`,
      data: JSON.stringify(data),
    };
    axios(option)
      .then((e) => {
        setLoading(false);
        if (e?.status === 200) {
          setOrganizationData(e?.data);
        }
      })
      .catch((err) => {
        setLoading(false)
      })
  }

  useEffect(() => {
    if (locationdata?.uuid) {
      fetOrgData()
    }
  }, [locationdata])
  return (
    <>
      {
        loading ? <Loader /> : null
      }
      <Layout>
        <div className="child-section-of-everypage">
          <OrgDetailsScreen organizationData={organizationData} />
          <OrgTabsScreen organizationData={organizationData} />
        </div>
      </Layout>
    </>
  );
};
export default OrgDetails;