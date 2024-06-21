import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import "./Style.css";
import AiLeadsAction from "../../Components/AiLeads/AiLeadsButton/AiLeadsAction";
import DecisionMakerTable from "../../Components/DecisionMaker/DecisionMakerTable";
import DecisionmakersFilter from "../../Components/DecisionMaker/DecisionFilter/Index";
import { toast } from "react-toastify";
import axios from "axios";
import { APIUrlFour, APIUrlOne } from "../../Utils/Utils";
import Loader from "../../Components/Loader/Loader";
import { useFetcher } from "react-router-dom";

const DecisionMaker = () => {
  const [loading, setLoading] = useState(false);
  const [tableCommingData, setTableCommingData] = React.useState([]);
  const [firstFilterData, setFirstFilterData] = useState([]);
  const [istableDataFilter, setIstableDataFilter] = React.useState(false);
  const [currentLeadsLength, setCurrentLeadsLength] = React.useState('');
  const [isSalesForceTrigger, setIsSalesForceTrigger] = useState(false);
  const [isDecisionMakerExcel, setIsDecisionMakerExcel] = useState(false);
  const [selectedData, setSelectedData] = React.useState(['pending']);
  const [showData, setShowData] = React.useState([]);
  const [lastdata, setlastdata] = React.useState([]);
  const [skip, setSkip] = React.useState(0);
  const [decisionMakerData, setDecisionMakerData] = React.useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [statsCountDecisionMaker, setStatsCountDecisionMaker] = useState(0);
  const [applyFilter, setIsApplyFilter] = useState(false);

  const [PeopleData, setPeopleData] = useState([]);
  const [FilterData, setFilterData] = useState([]);
  const [showSearchdata, setshowSearchdata] = React.useState(false);
  const [previousData, setpreviousData] = useState(false)
  const [isDeleted, setIsDeleted] = React.useState(false);

  const validateFilters = () => {
    if (!selectedData?.length && !showData?.length && !lastdata?.length
    ) {
      toast.error("Please Select Filters");
      return false;
    }
    return true;
  }

  useEffect(() => {
    if (istableDataFilter) {
      setSkip(0);
    }
  }, [istableDataFilter])
  const duplicateHandlePass = (e) => {
    if (!validateFilters()) return;
    setLoading(true);
    setIsApplyFilter(true);
    setSkip(0);
    const data = {};
    data.categories = selectedData;
    data.decision_maker = showData?.[0];
    data.josf_status = lastdata?.[0]
    const option = {
      method: "GET",
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json",
      },
      url: `${APIUrlFour()}/v1/people_validation?limit=50&skip=0&validation_filter=${selectedData}`,

      data: JSON.stringify(data),
    };
    axios(option)
      .then((e) => {
        setTimeout(() => setLoading(false), 100)
        if (e?.status === 200) {
          const comingData = e?.data?.data;
          const statsCount = e?.data?.count;
          setStatsCountDecisionMaker(statsCount);
          setFirstFilterData(comingData);
          if (comingData.length === 0 || comingData.length % 50 !== 0) {
            setHasMore(false);
          } else {
            setTimeout(() => {
              setHasMore(true);
            }, 1000);
          }
          if (skip > 1) {
            setTableCommingData(comingData)
          } else {
            setTableCommingData(comingData);
          }

          toast.success(e?.data?.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.response?.data?.message);
      });
  };

  const handlePassSubmit = (e) => {
    if (!validateFilters()) return;
    if (statsCountDecisionMaker <= tableCommingData.length) return;
    setHasMore(false);
    setLoading(true);
    const data = {};
    data.categories = selectedData;
    data.decision_maker = showData?.[0];
    data.josf_status = lastdata?.[0]
    const option = {
      method: "GET",
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json",
      },
      url: `${APIUrlFour()}/v1/people_validation?limit=50&skip=${skip ? skip : 0}&validation_filter=${selectedData}`,
      data: JSON.stringify(data),
    };
    axios(option)
      .then((e) => {
        setTimeout(() => setLoading(false), 100)
        if (e?.status === 200) {
          const comingData = e?.data?.data;
          const statsCount = e?.data?.count;
          setStatsCountDecisionMaker(statsCount);
          if (comingData.length === 0 || comingData.length % 50 !== 0) {
            setHasMore(false);
          } else {
            setTimeout(() => {
              setHasMore(true);
            }, 1000);
          }
          if (skip > 1) {
            setTableCommingData(prevdata => [...prevdata, ...comingData,])
          } else {
            setTableCommingData(comingData);
          }

          toast.success(e?.data?.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.response?.data?.message);
      });
  };


  useEffect(() => {
    const timer = setTimeout(() => {
      if (skip === 0 && tableCommingData?.length === 0) {
        duplicateHandlePass();
      }
    }, 150);

    return () => clearTimeout(timer);

  }, [tableCommingData])

  useEffect(() => {
    if (isDeleted) {
      duplicateHandlePass();
    }
  }, [isDeleted])
  return (
    <>
      {
        loading ? <Loader /> : null
      }
      <Layout>
        <div className="child-section-of-everypage">
          <AiLeadsAction
            currentLeadsLength={currentLeadsLength}
            setIsSalesForceTrigger={setIsSalesForceTrigger}
            isSalesForceTrigger={isSalesForceTrigger}
            setIsDecisionMakerExcel={setIsDecisionMakerExcel}
            statsCountDecisionMaker={statsCountDecisionMaker}
            setFilterData={setFilterData}
            FilterData={FilterData}
            PeopleData={PeopleData}
            setPeopleData={setPeopleData}
            setpreviousData={setpreviousData}
            showSearchdata={showSearchdata}
            setshowSearchdata={setshowSearchdata}
            setLoading={setLoading}
            setDecisionMakerData={setDecisionMakerData}
            setTableCommingData={setTableCommingData}
          />
          <DecisionmakersFilter
            tableCommingData={tableCommingData}
            setTableCommingData={setTableCommingData}
            istableDataFilter={istableDataFilter}
            setIstableDataFilter={setIstableDataFilter}
            duplicateHandlePass={duplicateHandlePass}
            setSelectedData={setSelectedData}
            selectedData={selectedData}
            setShowData={setShowData}
            showData={showData}
            setlastdata={setlastdata}
            lastdata={lastdata}
            setStatsCountDecisionMaker={setStatsCountDecisionMaker}
          />
          <DecisionMakerTable
            tableCommingData={tableCommingData}
            setTableCommingData={setTableCommingData}
            istableDataFilter={istableDataFilter}
            setCurrentLeadsLength={setCurrentLeadsLength}
            isSalesForceTrigger={isSalesForceTrigger}
            isDecisionMakerExcel={isDecisionMakerExcel}
            setIsDecisionMakerExcel={setIsDecisionMakerExcel}
            setIstableDataFilter={setIstableDataFilter}
            handlePassSubmit={handlePassSubmit}
            selectedData={selectedData}
            setSkip={setSkip}
            skip={skip}
            setDecisionMakerData={setDecisionMakerData}
            decisionMakerData={decisionMakerData}
            setHasMore={setHasMore}
            hasMore={hasMore}
            firstFilterData={firstFilterData}
            setIsApplyFilter={setIsApplyFilter}
            applyFilter={applyFilter}

            previousData={previousData}
            FilterData={FilterData}
            setIsDeleted={setIsDeleted}
            isDeleted={isDeleted}


          />
        </div>
      </Layout>
    </>
  );
};
export default DecisionMaker;