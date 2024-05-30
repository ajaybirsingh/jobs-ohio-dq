import * as React from "react";
import "./Style.css";
import Filtericon from "../../../Assets/Filtericon.svg";
import Filter from "../../../Assets/FilterOval.svg";
import ReplayIcon from "@mui/icons-material/Replay";
import FormControlSelect from "../../FormControl/Index";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import axios from "axios";
import Loader from "../../Loader/Loader";
import { APIUrlFour, APIUrlOne } from "../../../Utils/Utils";
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
  const [aidecisiondata, setaidecisiondata] = React.useState([]);
  const peopleActionDropdown = () => {
    setLoading(true);
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
        setLoading(false);
        const data = e?.data?.status_list;
        setaidecisiondata(data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    peopleActionDropdown();
  },[])
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
                dataList: aidecisiondata,
                checked: selectedData,
              }}
              placeholder="Action"
            />
          </div>
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