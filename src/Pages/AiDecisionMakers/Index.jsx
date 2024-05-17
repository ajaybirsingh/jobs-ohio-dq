import React, { useState } from "react";
import Layout from "../../Components/Layout/Layout";
import "./Style.css";
import AiLeadsAction from "../../Components/AiLeads/AiLeadsButton/AiLeadsAction";
import DecisionMakerTable from "../../Components/DecisionMaker/DecisionMakerTable";
import DecisionmakersFilter from "../../Components/DecisionMaker/DecisionFilter/Index";
import { toast } from "react-toastify";
import axios from "axios";
import { APIUrlOne } from "../../Utils/Utils";

const DecisionMaker = () => {
  const [loading, setLoading] = useState(false);
  const [tableCommingData, setTableCommingData] = React.useState([]);
  const [firstFilterData, setFirstFilterData] = useState([]);
  const [istableDataFilter, setIstableDataFilter] = React.useState(false);
  const [currentLeadsLength, setCurrentLeadsLength] = React.useState('');
  const [isSalesForceTrigger, setIsSalesForceTrigger] = useState(false);
  const [isDecisionMakerExcel, setIsDecisionMakerExcel] = useState(false);
  const [selectedData, setSelectedData] = React.useState([]);
  const [showData, setShowData] = React.useState([]);
  const [lastdata, setlastdata] = React.useState([]);
  const [skip, setSkip] = React.useState(0);
  const [decisionMakerData, setDecisionMakerData] = React.useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [statsCountDecisionMaker, setStatsCountDecisionMaker] = useState(0);
  const [applyFilter,setIsApplyFilter] = useState(false);
  const validateFilters = () => {
    if (!selectedData?.length && !showData?.length && !lastdata?.length
    ) {
      toast.error("Please Select Filters");
      return false;
    }
    return true;
  }

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
      method: "POST",
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json",
      },
      url: `${APIUrlOne()}/v1/apply_people_filter?limit=50&skip=0`,
      data: JSON.stringify(data),
    };
    axios(option)
      .then((e) => {
        setTimeout(()=>      setLoading(false),100)
        if (e?.status === 200) {
          const comingData = e?.data?.data;
          const statsCount = e?.data?.count;
          setStatsCountDecisionMaker(statsCount);
          setFirstFilterData(comingData);
          if (comingData.length === 0 || comingData.length % 50 !==0) {
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
    if(statsCountDecisionMaker<=tableCommingData.length) return ;
    setHasMore(false);
    setLoading(true);
    const data = {};
    data.categories = selectedData;
    data.decision_maker = showData?.[0];
    data.josf_status = lastdata?.[0]
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
      .then((e) => {
        setTimeout(()=>      setLoading(false),100)
        if (e?.status === 200) {
          const comingData = e?.data?.data;
          const statsCount = e?.data?.count;
          setStatsCountDecisionMaker(statsCount);
          if (comingData.length === 0 || comingData.length % 50 !==0) {
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
  return (
    <>
      <Layout>
        <div className="child-section-of-everypage">
          <AiLeadsAction
            currentLeadsLength={currentLeadsLength}
            setIsSalesForceTrigger={setIsSalesForceTrigger}
            isSalesForceTrigger={isSalesForceTrigger}
            setIsDecisionMakerExcel={setIsDecisionMakerExcel}
            statsCountDecisionMaker={statsCountDecisionMaker} />
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

          />
        </div>
      </Layout>
    </>
  );
};
export default DecisionMaker;