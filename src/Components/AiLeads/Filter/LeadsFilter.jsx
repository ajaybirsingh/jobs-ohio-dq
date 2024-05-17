import * as React from "react";
import "../Filter/LeadsFilter.css";
import Filtericon from "../../../Assets/Filtericon.svg";
import Filter from "../../../Assets/FilterOval.svg";
import ReplayIcon from "@mui/icons-material/Replay";
import FormControlSelect from "../../FormControl/Index";
import axios from "axios";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import { APIUrlOne } from "../../../Utils/Utils";
export default function LeadsFilter({ setTableCommingData, setIstableDataFilter,
  handleApply,
  setSelectedData,
  selectedData,
  setShowData,
  setJscore, jScoredata, showlast, setShowlast,
  setStatsCount,
  setPage
}) {
  const [isLoadFilters, setIsLoadFilters] = React.useState(false);
  const [selectedIndustry, setSelectedIndustry] = React.useState("");
  const [selectedRevenue, setSelectedRevenue] = React.useState("");
  const [selectedJscore, setSelectedJscore] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [aiLeadsFilters, setAiLeadsFilters] = React.useState({
    industry: "",
    ravenue: "",
    jScore: "",
  });
  const LeadsFilters = () => {
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
        setAiLeadsFilters(data);
      })
      .catch(() => { });
  };
  // React.useEffect(() => {
  //   if (isLoadFilters) {
  //     LeadsFilters();
  //   } else {
  //     setIsLoadFilters(true);
  //   }

  // }, [isLoadFilters]);
  const handleIndustryChange = (event) => {
    const value = event.target.value;
    setSelectedIndustry(value);
  };
  const handleRevenueChange = (event) => {
    const value = event.target.value;
    setSelectedRevenue(value);
  };
  const handleJscoreChange = (event) => {
    const value = event.target.value;
    setSelectedJscore(value);
  };
  const handeldata = (event, item) => {
    if (event.target.checked) {
      setSelectedData([...selectedData, item]);
    } else {
      setSelectedData(selectedData?.filter((uncheck) => uncheck !== item));
    }
  };
  const handeldatajScore = (event, item) => {
    if (event.target.checked) {
      setJscore([...jScoredata, item]);
    } else {
      setJscore(jScoredata.filter((uncheck) => uncheck !== item));
    }
  };
  const handeldatalast = (event, item) => {
    if (event.target.checked) {
      setShowlast([...showlast, item]);
    } else {
      setShowlast(showlast.filter((uncheck) => uncheck !== item));
    }
  };
  const ResetFilterData = () => {
    setSelectedData([]);
    setShowData([]);
    setShowlast([]);
    setJscore([]);
    if (selectedData?.length || showlast?.length || jScoredata?.length) {
      setPage(1);
      setTableCommingData([]);
      setIstableDataFilter(true);
      setStatsCount('');
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <div className="outer-main-for-filtersand-buttons">
        <section className="Leads-Filter-main-container">
          <div className="AILeads-Filter1st">
            <div>
              <div className="AiLeads-filter-icons">
                <img src={Filter} alt="" />
              </div>
              <div>
                <img src={Filtericon} alt="" />
              </div>
            </div>
          </div>
          <div className="AILeads-Filter2nddrop-down">
            <FormControlSelect
              formControlData={{
                value: selectedIndustry,
                handleChange: handleIndustryChange,
                selectedData: selectedData,
                handleCheckboxChange: handeldata,
                dataList: aiLeadsFilters?.data?.categories,
                checked: selectedData,
              }}
              onMouseEnter={handleOpen}
              onMouseLeave={handleClose}
              placeholder="Industry"
            />
          </div>
          <div className="Leads-Filter-Laststdrop-down">
            <FormControlSelect
              formControlData={{
                value: selectedRevenue,
                handleChange: handleRevenueChange,
                selectedData: showlast,
                handleCheckboxChange: handeldatalast,
                isRevenue: true,
                dataList: aiLeadsFilters?.data?.revenue_range,
                checked: showlast,
              }}
              placeholder="Revenue"
              onMouseEnter={handleOpen}
              onMouseLeave={handleClose}
            />
          </div>
          <div className="JScoreContainer">
            <FormControlSelect
              formControlData={{
                value: selectedJscore,
                handleChange: handleJscoreChange,
                selectedData: jScoredata,
                handleCheckboxChange: handeldatajScore,
                dataList: aiLeadsFilters?.data?.j_score?.slice(1),
                checked: jScoredata,
              }}
              onMouseEnter={handleOpen}
              onMouseLeave={handleClose}
              placeholder="JOI Score"
            />
          </div>
        </section>
        <div className="apply-hit-button">
          <div className="inner-apply-button-container" onClick={handleApply}>
            <FileDownloadDoneIcon className="apply-tick-icon" />
            <button className="AileadsFilter-Apply-button" variant="contained">
              Apply
            </button>
          </div>
        </div>
        <div onClick={ResetFilterData} className="Reset-filter-container">
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
    </React.Fragment>
  );
}