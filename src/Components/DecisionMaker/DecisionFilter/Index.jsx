// import * as React from "react";
// import "./Style.css";
// import Filtericon from "../../../Assets/Filtericon.svg";
// import Filter from "../../../Assets/FilterOval.svg";
// import ReplayIcon from "@mui/icons-material/Replay";
// import FormControlSelect from "../../FormControl/Index";
// import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
// import axios from "axios";
// import Loader from "../../Loader/Loader";
// import { APIUrlOne } from "../../../Utils/Utils";
// export default function LeadsFilter({
//   setTableCommingData,
//   setIstableDataFilter,
//   setSelectedData,
//   selectedData,
//   setShowData,
//   showData,
//   setlastdata,
//   lastdata,
//   setStatsCountDecisionMaker,
//   duplicateHandlePass
// }) {
//   const [selectedIndustry, setSelectedIndustry] = React.useState("");
//   const [selectedCompany, setSelectedCompany] = React.useState("");
//   const [aiDecisionMaker, setAiDecisionMaker] = React.useState("");
//   const handleCheckboxChange = (event, item) => {
//     if (event.target.checked) {
//       setShowData([item]);
//     } else {
//       setShowData([]);
//     }
//   };
//   const [loading, setLoading] = React.useState(false);
//   const [strength, setStrength] = React.useState([]);
//   const [isLoadMakerFilters, setIsLoadMakerFilters] = React.useState(false);
//   const handleIndustryChange = (event) => {
//     const value = event.target.value;
//     setSelectedIndustry(value);
//   };
//   const handeldata = (event, item) => {
//     if (event.target.checked) {
//       setSelectedData([...selectedData, item]);
//     } else {
//       setSelectedData(selectedData?.filter((uncheck) => uncheck !== item));
//     }
//   };
//   const handeldatalast = (event, item) => {
//     if (event.target.checked) {
//       setlastdata([...lastdata, item]);
//     } else {
//       setlastdata(lastdata.filter((uncheck) => uncheck !== item));
//     }
//   };
//   const handeldatashow = (event, item) => {
//     if (event.target.checked) {
//       setShowData([item]);
//     } else {
//       setShowData(showData.filter((selectedItem) => selectedItem !== item));
//     }
//   };
//   const ResetFilterData = () => {
//     setSelectedData([]);
//     setShowData([]);
//     setStrength([]);
//     setSelectedIndustry([]);
//     setlastdata([]);
//     setTableCommingData([])
//     setIstableDataFilter(true);
//     setStatsCountDecisionMaker('');
//   };
//   const aiDecisionMakerFilters = () => {
//     const option = {
//       method: "GET",
//       headers: {
//         "access-control-allow-origin": "*",
//         "content-type": "application/json",
//       },
//       url: `${APIUrlOne()}/v1/org_filters`,
//     };
//     axios(option)
//       .then((e) => {
//         const data = JSON.parse(e?.request?.response);
//         setAiDecisionMaker(data);
//       })
//       .catch(() => { });
//   };
//   // React.useEffect(() => {
//   //   if (isLoadMakerFilters) {
//   //     aiDecisionMakerFilters();
//   //     aiDecisionMakerdropdown();
//   //   } else
//   //     setIsLoadMakerFilters(true)
//   // }, [isLoadMakerFilters]);
//   const [aidecisiondata, setaidecisiondata] = React.useState("");
//   const aiDecisionMakerdropdown = () => {
//     setLoading(true);
//     const option = {
//       method: "GET",
//       headers: {
//         "access-control-allow-origin": "*",
//         "content-type": "application/json",
//       },
//       url: `${APIUrlOne()}/v1/people_filters`,
//     };
//     axios(option)
//       .then((e) => {
//         setLoading(false);
//         const data = JSON.parse(e?.request?.response);
//         setaidecisiondata(data);
//       })
//       .catch(() => {
//         setLoading(false);
//       });
//   };
//   React.useEffect(() => {
//     // aiDecisionMakerFilters();
//     // aiDecisionMakerdropdown();
//   }, []);
//   return (
//     <>
//       {loading ? <Loader /> : null}
//       <div className="outer-main-for-filtersand-buttons">
//         <section className="Leads-Filter-main-container">
//           <div className="AILeads-Filter1st">
//             <div>
//               <div className="AiLeads-filter-icons">
//                 <img src={Filter} alt="" />
//               </div>
//               <div>
//                 <img src={Filtericon} alt="" />
//               </div>
//             </div>
//           </div>
//           <div className="Leads-Filter-1stdrop-down">
//             <FormControlSelect
//               formControlData={{
//                 value: selectedIndustry,
//                 handleChange: handleIndustryChange,
//                 selectedData: selectedData,
//                 handleCheckboxChange: handeldata,
//                 dataList: aidecisiondata?.data?.categories,
//                 checked: selectedData,
//               }}
//               placeholder="Industry"
//             />
//           </div>
//           {/* <div className="AILeads-Filter2nddrop-down">
//             <FormControlSelect
//               formControlData={{
//                 value: selectedCompany,
//                 handleChange: handleIndustryChange,
//                 selectedData: showData,
//                 handleCheckboxChange: handeldatashow,
//                 dataList: aidecisiondata?.data?.decision_maker,
//                 selectedData: showData,
//                 checked: showData,
//                 type: "radio",
//                 dataListType: "decision_maker",
//               }}
//               placeholder="Decisionmaker"
//             />
//           </div> */}
//           {/* <div className="Leads-Filter-Laststdrop-down">
//             <FormControlSelect
//               formControlData={{
//                 value: selectedIndustry,
//                 handleChange: handleIndustryChange,
//                 selectedData: lastdata,
//                 handleCheckboxChange: handeldatalast,
//                 dataList: aidecisiondata?.data?.josf_status,
//                 checked: lastdata,
//                 dataListType: "josf_status",
//                 type: "radio",
//               }}
//               placeholder="JOSF Status"
//             />
//           </div> */}
//         </section>
//         <div className="apply-hit-button">
//           <div
//             className="inner-apply-button-container"
//             onClick={duplicateHandlePass}
//           >
//             <FileDownloadDoneIcon className="apply-tick-icon" />
//             <button className="AileadsFilter-Apply-button" variant="contained">
//               Apply
//             </button>
//           </div>
//         </div>
//         <div onClick={ResetFilterData} className="Reset-filter-container">
//           <div className="inner-reset-filter">
//             <div>
//               <ReplayIcon className="reset-filter-icon" />
//             </div>
//             <div>
//               <p>Reset Filter</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import * as React from "react";
import "./Style.css";
import Filtericon from "../../../Assets/Filtericon.svg";
import Filter from "../../../Assets/FilterOval.svg";
import ReplayIcon from "@mui/icons-material/Replay";
import FormControlSelect from "../../FormControl/Index";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import axios from "axios";
import Loader from "../../Loader/Loader";
import { APIUrlOne } from "../../../Utils/Utils";
export default function LeadsFilter({
  setTableCommingData,
  setIstableDataFilter,
  setSelectedData,
  selectedData,
  setShowData,
  showData,
  setlastdata,
  lastdata,
  setStatsCountDecisionMaker,
  duplicateHandlePass
}) {
  const [selectedIndustry, setSelectedIndustry] = React.useState("");
  const [selectedCompany, setSelectedCompany] = React.useState("");
  const [aiDecisionMaker, setAiDecisionMaker] = React.useState("");
  const handleCheckboxChange = (event, item) => {
    if (event.target.checked) {
      setShowData([item]);
    } else {
      setShowData([]);
    }
  };
  const [loading, setLoading] = React.useState(false);
  const [strength, setStrength] = React.useState([]);
  const [isLoadMakerFilters, setIsLoadMakerFilters] = React.useState(false);
  const handleIndustryChange = (event) => {
    const value = event.target.value;
    setSelectedIndustry(value);
  };
  const handeldata = (event, item) => {
    if (event.target.checked) {
      setSelectedData([...selectedData, item]);
    } else {
      setSelectedData(selectedData?.filter((uncheck) => uncheck !== item));
    }
  };
  const handeldatalast = (event, item) => {
    if (event.target.checked) {
      setlastdata([...lastdata, item]);
    } else {
      setlastdata(lastdata.filter((uncheck) => uncheck !== item));
    }
  };
  const handeldatashow = (event, item) => {
    if (event.target.checked) {
      setShowData([item]);
    } else {
      setShowData(showData.filter((selectedItem) => selectedItem !== item));
    }
  };
  const ResetFilterData = () => {
    setSelectedData([]);
    setShowData([]);
    setStrength([]);
    setSelectedIndustry([]);
    setlastdata([]);
    setTableCommingData([])
    setIstableDataFilter(true);
    setStatsCountDecisionMaker('');
  };
  const aiDecisionMakerFilters = () => {
    const option = {
      method: "GET",
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json",
      },
      url: `${APIUrlOne()}/v1/org_filters`,
    };
    axios(option)
      .then((e) => {
        const data = JSON.parse(e?.request?.response);
        setAiDecisionMaker(data);
      })
      .catch(() => { });
  };
  // React.useEffect(() => {
  //   if (isLoadMakerFilters) {
  //     aiDecisionMakerFilters();
  //     aiDecisionMakerdropdown();
  //   } else
  //     setIsLoadMakerFilters(true)
  // }, [isLoadMakerFilters]);
  const [aidecisiondata, setaidecisiondata] = React.useState("");
  const aiDecisionMakerdropdown = () => {
    setLoading(true);
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
        setLoading(false);
        const data = JSON.parse(e?.request?.response);
        setaidecisiondata(data);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  // React.useEffect(() => {
  //   aiDecisionMakerFilters();
  //   aiDecisionMakerdropdown();
  // }, []);
  const PeopleStatus = [
    "pending",
    "verified",
    "updated",
    "notfound",
    "debatable"
  ];
  return (
    <>
      {loading ? <Loader /> : null}
      <div className="outer-main-for-filtersand-buttons">
        <section className="Leads-Filter-main-container">
          <div className="Search-filter-icons">
            <div>
              <div className="AiLeads-filter-icons">
                <img src={Filter} alt="" />
              </div>
              <div>
                <img src={Filtericon} alt="" />
              </div>
            </div>
          </div>
          <div className="IndustyFilter-Drop-down">
            <FormControlSelect
              formControlData={{
                value: selectedIndustry,
                handleChange: handleIndustryChange,
                selectedData: selectedData,
                handleCheckboxChange: handeldata,
                // dataList: aidecisiondata?.data?.categories,
                dataList: PeopleStatus,
                checked: selectedData,
              }}
              placeholder="Action"
            />
          </div>
          {/* <div className="AILeads-Filter2nddrop-down">
            <FormControlSelect
              formControlData={{
                value: selectedCompany,
                handleChange: handleIndustryChange,
                selectedData: showData,
                handleCheckboxChange: handeldatashow,
                dataList: aidecisiondata?.data?.decision_maker,
                selectedData: showData,
                checked: showData,
                type: "radio",
                dataListType: "decision_maker",
              }}
              placeholder="Decisionmaker"
            />
          </div> */}
          {/* <div className="Leads-Filter-Laststdrop-down">
            <FormControlSelect
              formControlData={{
                value: selectedIndustry,
                handleChange: handleIndustryChange,
                selectedData: lastdata,
                handleCheckboxChange: handeldatalast,
                dataList: aidecisiondata?.data?.josf_status,
                checked: lastdata,
                dataListType: "josf_status",
                type: "radio",
              }}
              placeholder="JOSF Status"
            />
          </div> */}
        </section>
        <div className="apply-hit-button">
          <div
            className="inner-apply-button-container"
            onClick={duplicateHandlePass}
          >
            <FileDownloadDoneIcon className="apply-tick-icon" />
            <button className="AileadsFilter-Apply-button" variant="contained">
              Apply
            </button>
          </div>
        </div>
        <div
          onClick={ResetFilterData}
          className="Reset-filter-container">
          <div className="inner-reset-filter">
            <div>
              <ReplayIcon className="reset-filter-icon" />
            </div>
            <div>
              <p>Reset Filter</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}