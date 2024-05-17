import React, { useEffect, useState } from "react";
import Layout from "../../../Components/Layout/Layout";
import DetailsTableProspect from "../../../Components/AiProfile/AddProfile/DetailsTableProspect/Index";
import DetailsFormProspect from "../../../Components/AiProfile/AddProfile/DetailsFormProspect/Index";
import NewAIProfileButton from "../../../Components/AiLeads/NewAiProfileButton/Index";
import { toast } from "react-toastify";
import axios from "axios";
import { APIUrlOne, GetUserId } from "../../../Utils/Utils";
import Loader from "../../../Components/Loader/Loader";
import { AI_PROFILE } from "../../../Utils/Constants";
import { useLocation, useNavigate } from "react-router-dom";

const ProspectProfile = () => {
  const location = useLocation();
  const prefilledData = location?.state;
  const navigate = useNavigate();
  const [ShowAutocompleteprimary, setShowAutocompleteprimary] = useState(false);
  const [ResponseDatanew, setResponseDatanew] = useState(null);
  const [ResponseData, setResponseData] = useState(null);
  const loggedInUserId = GetUserId();
  const [loading, setLoading] = useState();
  const [tableShowResult, setTableShowResult] = useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [isFilterRetrieve, setIsFilterRetrieve] = useState([]);
  const [applyPeopleFilterData, setApplyPeopleFilterData] = useState([]);
  const [resultRetrieve, setResultRetrieve] = useState([]);
  const [decisionMakerData, setDecisionMakerData] = useState({
    decisionmaker: "",
    primaryOrganization: "",
    sample: "",
    primaryJobTitle: "",
    sampleTwo: "",
    country: "",
    state: "",
    josfStatus: "",
    strengthScore: "",
    addedName: "",
  });
  const [hasMore, setHasMore] = React.useState(true);
  const [totalRecords, setTotalRecords] = useState('');
  const [skip, setSkip] = React.useState(0);

  const [ResponseJobData, setResponseJobData] = useState(null);
  const [ShowAutocomplete, setShowAutocomplete] = useState(false);
  const decisionmakerfilter = () => {
    const option = {
      method: "GET",
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json",
      },
      url: `${APIUrlOne()}/v1/people_filters`,
    };
    axios(option)
      .then((e) => {
        const data = JSON.parse(e?.request?.response);
        setIsFilterRetrieve(data);
      })
      .catch(() => { });
  };
  React.useEffect(() => {
    decisionmakerfilter();
  }, []);

  const validations = () => {
    if (
      !decisionMakerData?.decisionmaker &&
      !decisionMakerData?.primaryOrganization &&
      !decisionMakerData?.primaryJobTitle &&
      !decisionMakerData?.country &&
      !decisionMakerData?.state &&
      !decisionMakerData?.josfStatus
    ) {
      toast.error("Please select at least one field");
      return false;
    }
    return true;
  };

  const modalvalidation = () => {
    if (!decisionMakerData?.addedName) {
      toast.error("Please Enter Search Name");
      return false;
    }
    return true;
  };
  const handlesave = (e) => {
    e.preventDefault();
  };
  const handleClose = () => setModalOpen(false);

  const handleModelSave = () => {
    if (!modalvalidation()) return;
    setLoading(true);
    const data = {};
    data.user_id = loggedInUserId;
    data.name = decisionMakerData?.addedName;
    data.decision_maker = decisionMakerData?.decisionmaker
      ? decisionMakerData?.decisionmaker
      : null;
    data.primary_organization = decisionMakerData?.primaryOrganization
      ? decisionMakerData?.primaryOrganization
      : null;
    data.primary_job_title = decisionMakerData?.primaryJobTitle
      ? decisionMakerData?.primaryJobTitle
      : null;
    data.country = decisionMakerData?.country
      ? decisionMakerData?.country
      : null;
    data.state = decisionMakerData?.state ? decisionMakerData?.state : null;
    data.josf_status = decisionMakerData?.josfStatus
      ? decisionMakerData?.josfStatus
      : null;
    data.j_score = decisionMakerData?.strengthScore
      ? decisionMakerData?.strengthScore
      : null;
    const option = {
      method: "POST",
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json",
      },
      url: `${APIUrlOne()}/v1/add_filter_people`,
      data: JSON.stringify(data),
    };
    axios(option)
      .then((response) => {
        setLoading(false);
        if (response?.status === 200) {
          setDecisionMakerData({
            decisionmaker: "",
            primaryOrganization: "",
            sample: "",
            primaryJobTitle: "",
            sampleTwo: "",
            country: "",
            state: "",
            josfStatus: "",
            strengthScore: "",
            addedName: "",
          });
          handleClose();
          toast.success(response?.data?.message);
          navigate(AI_PROFILE, { state: 1 });
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error?.response?.data?.message);
      });
  };
  const fetchMoreData = () => {
    if (!resultRetrieve?.length) return
    const hasMore = resultRetrieve?.length < totalRecords;
    if (!hasMore) return
    // when i need to hit pagination please uncomment line no. 633
    setSkip((prevskip) => prevskip + 50);
  };

  const toggleResult = () => {
    setModalOpen(false);
    if (!validations()) return;
    setLoading(true);
    const data = {};
    data.decision_maker = decisionMakerData?.decisionmaker
      ? decisionMakerData?.decisionmaker === "True"
        ? true
        : false
      : null;
    data.primary_organization = decisionMakerData?.primaryOrganization
      ? decisionMakerData?.primaryOrganization
      : null;
    data.country = decisionMakerData?.country
      ? decisionMakerData?.country
      : null;
    data.state = decisionMakerData?.state ? decisionMakerData?.state : null;
    data.josf_status = decisionMakerData?.josfStatus
      ? decisionMakerData?.josfStatus === "True"
        ? true
        : false
      : null;
    data.j_score = decisionMakerData?.strengthScore
      ? decisionMakerData?.strengthScore
      : null;
    const option = {
      method: "POST",
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json",
      },
      url: `${APIUrlOne()}/v1/apply_people_filter?limit=50&skip=${skip ? skip : 0}`,
      data: JSON.stringify(data),
    };
    axios(option)
      .then((response) => {
        setLoading(false);
        if (response?.status === 200) {
          if (response?.data?.data?.length === 0) {
            setHasMore(false);
          } else {
            setTotalRecords(response?.data?.count)
            setResultRetrieve([...resultRetrieve, ...response?.data?.data]);
          }
          if (response?.data?.data?.length) {
            setTableShowResult(true);
          }

          toast.success(response?.data?.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error?.response?.data?.message);
      });
  };
  useEffect(() => {
    if (resultRetrieve?.length >= 50) {
      toggleResult();
    }
  }, [skip])

  useEffect(() => {
    if (prefilledData?.id) {
      setDecisionMakerData({
        decisionmaker: prefilledData?.decisionmaker === true ? "True" : prefilledData?.decisionmaker === false ? "False" : null,
        primaryOrganization: prefilledData?.primary_organization,
        primaryJobTitle: prefilledData?.primary_job_title,
        country: prefilledData?.country,
        state: prefilledData?.state,
        josfStatus: prefilledData?.josf_status === "true" ? "True" : prefilledData?.josf_status === "false" ? "False" : null,
        strengthScore: "",
        addedName: prefilledData?.name,
      });
      setShowAutocompleteprimary(false)
    }
  }, [prefilledData]);


  useEffect(() => {
  }, [decisionMakerData])

  useEffect(() => {
    if (
      (decisionMakerData?.addedName ||
        decisionMakerData?.country ||
        decisionMakerData?.decisionmaker ||
        decisionMakerData?.josfStatus ||
        decisionMakerData?.primaryJobTitle ||
        decisionMakerData?.primaryOrganization ||
        decisionMakerData?.state) && prefilledData
    ) {
      DecisionMakerDataListing();
    }
  }, [decisionMakerData, prefilledData]);


  const DecisionMakerDataListing = () => {
    setLoading(true);
    const data = {};
    data.user_id = loggedInUserId;
    data.name = decisionMakerData?.addedName;
    data.decision_maker =
      decisionMakerData?.decisionmaker === "True" ? true : false;
    data.primary_organization = decisionMakerData?.primaryOrganization;
    data.country = decisionMakerData?.country;
    data.state = decisionMakerData?.state;
    data.josf_status = decisionMakerData?.josfStatus === "True" ? true : false;
    data.j_score = decisionMakerData?.strengthScore;
    const option = {
      method: "POST",
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json",
      },
      url: `${APIUrlOne()}/v1/apply_people_filter?limit=50&skip=0`,
      data: JSON.stringify(data),
    };
    axios(option)
      .then((response) => {
        setLoading(false);
        if (response?.status === 200) {
          if (response?.data?.data?.length === 0) {
            setHasMore(false);
          } else {
            setTotalRecords(response?.data?.count)
            setResultRetrieve([...resultRetrieve, ...response?.data?.data]);
          }

          if (response?.data?.data?.length) {
            setTableShowResult(true);
            toast.success(response?.data?.message);
          }
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error?.response?.data?.message);
      });
  };
  const jobtitlesearch = (e) => {
    setLoading(true);
    const data = {};
    data.job_title = decisionMakerData.primaryJobTitle;
    const option = {
      method: "POST",
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json",
      },
      url: `${APIUrlOne()}/v1/job_title_search`,
      data: JSON.stringify(data),
    };
    axios(option)
      .then((response) => {
        setLoading(false);
        setShowAutocomplete(true);
        if (response?.status === 200) {
          setResponseJobData(response.data);
          setResponseData(response.data);
          toast.success(response?.data?.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error?.response?.data?.message);
      });
  };

  const handelselectjobtitle = (item) => {
    setShowAutocomplete(true);
    const people_name = `${item.primary_job_title ? item?.primary_job_title : ""
      }`;
    setDecisionMakerData({
      ...decisionMakerData,
      primaryJobTitle: people_name,
    });
    setShowAutocomplete(false);
  };

  const handelselectdata = (item) => {
    if (prefilledData?.id) {
      setShowAutocompleteprimary(false);
    } else {
      setShowAutocompleteprimary(true);
    }

    const people_name = `${item.org_name ? item?.org_name : ""}`;
    setDecisionMakerData({
      ...decisionMakerData,
      primaryOrganization: people_name,
    });
    setShowAutocompleteprimary(false);
  };
  const handlesearch = (e) => {
    setLoading(true);
    const data = {
      org_name: decisionMakerData.primaryOrganization,
    };

    axios
      .post(`${APIUrlOne()}/v1/org_search`, data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          if (prefilledData?.id) {
            setShowAutocompleteprimary(false);
          } else {
            setShowAutocompleteprimary(true);
          }
          setLoading(false);
          setResponseDatanew(response.data);
          toast.success(response.data.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.message);
      });
  };

  React.useEffect(() => {
    if (!prefilledData?.id) {
      let timer;
      if (
        decisionMakerData.primaryJobTitle?.length > 2 &&
        ResponseData === null
      ) {
        timer = setTimeout(() => {
          jobtitlesearch();
        }, 1000);
      }

      if (decisionMakerData.primaryJobTitle?.length === 0) {
        setResponseData(null);
      }
      return () => clearTimeout(timer);
    }
  }, [decisionMakerData.primaryJobTitle, ResponseData]);

  React.useEffect(() => {
    if (!prefilledData?.id) {
      let timer;
      if (
        decisionMakerData.primaryOrganization?.length > 2 &&
        ResponseDatanew === null
      ) {
        timer = setTimeout(() => {
          handlesearch();
        }, 1000);
      }
      if (decisionMakerData.primaryOrganization?.length === 0) {
        setResponseDatanew(null);
      }
      return () => clearTimeout(timer);
    }
  }, [decisionMakerData, ResponseDatanew]);

  return (
    <>
      {loading ? <Loader /> : null}
      <Layout className={"paddingSet"}>
        <div className="child-section-of-everypage set-tabs-ai-section">
          <NewAIProfileButton
            prefilledData={prefilledData}
            validations={validations}
            handlesave={handlesave}
            handleModelSave={handleModelSave}
            decisionMakerData={decisionMakerData}
            setDecisionMakerData={setDecisionMakerData}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
          />
          <div className="details-table-form-page">
            <div className="details-table-page">
              <DetailsTableProspect
                prefilledData={prefilledData}
                setTableShowResult={tableShowResult}
                tableShowResult={tableShowResult}
                handleModelSave={handleModelSave}
                applyPeopleFilterData={applyPeopleFilterData}
                resultRetrieve={resultRetrieve}
                fetchMoreData={fetchMoreData}
                hasMore={hasMore}
              />
            </div>
            <div className="details-form-page">
              <DetailsFormProspect
                prefilledData={prefilledData}
                setShowAutocompleteprimary={setShowAutocompleteprimary}
                setShowAutocomplete={setShowAutocomplete}
                ResponseDatanew={ResponseDatanew}
                ResponseData={ResponseData}
                ShowAutocompleteprimary={ShowAutocompleteprimary}
                handlesearch={handlesearch}
                handelselectdata={handelselectdata}
                ShowAutocomplete={ShowAutocomplete}
                handelselectjobtitle={handelselectjobtitle}
                jobtitlesearch={jobtitlesearch}
                ResponseJobData={ResponseJobData}
                handlesave={handlesave}
                tableShowResult={tableShowResult}
                decisionMakerData={decisionMakerData}
                setDecisionMakerData={setDecisionMakerData}
                setTableShowResult={setTableShowResult}
                handleModelSave={handleModelSave}
                toggleResult={toggleResult}
                isFilterRetrieve={isFilterRetrieve}
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default ProspectProfile;
