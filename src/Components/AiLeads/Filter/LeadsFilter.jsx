import * as React from "react";
import "../Filter/LeadsFilter.css";
import Filtericon from "../../../Assets/Filtericon.svg";
import Filter from "../../../Assets/FilterOval.svg";
import ReplayIcon from "@mui/icons-material/Replay";
import FormControlSelect from "../../FormControl/Index";
import axios from "axios";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import { APIUrlFour, APIUrlOne } from "../../../Utils/Utils";
export default function LeadsFilter({ setTableCommingData, setIstableDataFilter,
  handleApply,
  setSelectedData,
  selectedData,
  setShowData,
  setJscore, jScoredata, showlast, setShowlast,
  setStatsCount,
  setPage,
}) {
  const [selectedIndustry, setSelectedIndustry] = React.useState("");
  const [selectedRevenue, setSelectedRevenue] = React.useState("");
  const [selectedJscore, setSelectedJscore] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [aiLeadsFilters, setAiLeadsFilters] = React.useState({
    industry: "",
    ravenue: "",
    jScore: "",
  });
  const [actionFilterData, setActionFilterData] = React.useState([]);
  const LeadsFilters = () => {
    const option = {
      method: "GET",
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json",
      },
      url: `${APIUrlFour()}/v1/get_status_list`,
    };
    axios(option)
      .then((e) => {
        const data = e?.data?.status_list;
        setActionFilterData(data);
      })
      .catch(() => { });
  };

  React.useEffect(() => {
    LeadsFilters();
  }, [])
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
  const ResetFilterData = () => {
    setSelectedData([]);
    setShowData([]);
    setShowlast([]);
    setJscore([]);
    if (selectedData?.length || showlast?.length || jScoredata?.length) {
      setPage(0);
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
                dataList: actionFilterData,
                checked: selectedData,
              }}
              onMouseEnter={handleOpen}
              onMouseLeave={handleClose}
              placeholder="Action"
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