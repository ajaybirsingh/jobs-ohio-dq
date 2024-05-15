import * as React from "react";
import PropTypes from "prop-types";
import "./PDFtable.css";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import decisionMakerImage from "../../../Assets/Cloudfigma.svg";
import ContactDetailList from "../../../Components/AiLeads/ContactDetailList/ContactDetailList";
import RightSidebar from "../../../Components/RightSiderbar/RightSiderbar";
import { Tooltip } from "@mui/material";
import axios from "axios";
import Loader from "../../../Components/Loader/Loader";
import { toast } from "react-toastify";
import { APIUrlOne, APIUrlTwo, GetUserId } from "../../../Utils/Utils";
import { useLocation } from "react-router-dom";
import IndustryDropdown from "../../../Components/AiLeads/IndustrySectorDropdown/Index";
import InfiniteScroll from "react-infinite-scroll-component";
import * as XLSX from 'xlsx';
function Row({ row, selected, onSelect }) {
  const [open, setOpen] = React.useState(false);
  const loggedInUserId = GetUserId();
  const [openSidebar, setOpenSidebar] = React.useState(false);
  const [dataShortestPath, setDataShortestPath] = React.useState();
  const handleRightsidebar = (event) => {
    const data = {};
    data.source_uid = Number(loggedInUserId);
    data.target_uid = Number(event);
    const option = {
      method: "POST",
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json",
      },
      data: data,
      url: `${APIUrlTwo()}/v1/shortest-path`,
    };
    axios(option)
      .then((response) => {
        if (response?.status === 200) {
          const data = Object.values(response.data);
          setDataShortestPath(data);
          setOpenSidebar(true);
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };
  return (
    <TableRow className="juyds" sx={{ "& > *": { borderBottom: "unset" } }}>
      <>
        <TableCell className="Decisions-row-empty" align="left">
          <img
            className={
              row?.suspect_status === null
                ? "hide-image"
                : "decisionMakerImage-new-PDF-new"
            }
            src={decisionMakerImage}
            alt=""
          />
          <div className="Decision-maker-user-name-main-container">
            <div
              className={
                row?.decision_maker === true
                  ? "Decision-maker-user-name-pdf"
                  : "Decision-maker-user-namenoborder-pdf"
              }
            >
              <p className="letter-heading-pdf">
                {row?.first_name?.substring(0, 1)}
                {row?.last_name?.substring(0, 1)}
              </p>
            </div>
          </div>
        </TableCell>
        <TableCell className="Decisions-row-empty-new">
          <div className="name-and-title-text-new">
            <h3 className="company-name-country-prospect-added-pdf">
              {`${row?.first_name} ${row?.last_name}`}
            </h3>
            <p className="after-company-name-country-prospect-new-pdf">
              {row?.primary_job_title?.substring(0, 20) +
                (row?.primary_job_title?.length > 20 ? "...." : "")}
            </p>
          </div>
        </TableCell>
        <TableCell>
        <p className="strengthdata-pdf-body">{row?.strengthData?.strength }</p>
          {/* <p className="strengthdata">{row?.strengthData?.strength ? row?.strengthData?.strength : "-"}</p> */}
        </TableCell>
        <TableCell>
        <h3 className="annual-revenue-table-pdf">
              {row?.suspect_status ? row.suspect_status : "-"}
            </h3>
        </TableCell>
        
        <TableCell>
          <p className="tabel-body-content">
            {row?.linkedin ? row?.linkedin?.substring(28) : "-"}   </p>
        </TableCell>
        <TableCell>
          <p className="tabel-body-content">
            {row?.email ? row?.email : "-"}   </p>
        </TableCell>
        <TableCell>
          <p className="tabel-body-content">
            {row?.phone_no ? row?.phone_no : "-"} </p>
        </TableCell>
        {/* <TableCell className="Decision-maker-userTeblesell" align="left">
          <div className="Decision-maker-user-name-main-container">
            <div className="name-and-title-text">
              <h3 className="company-name-country-prospect-added">
                {`${row?.first_name} ${row?.last_name}`}{" "}
              </h3>
              <p className="after-company-name-country-prospect-new">
                {row?.primary_job_title?.substring(0, 20) +
                  (row?.primary_job_title?.length > 20 ? "...." : "")}
              </p>
            </div>
          </div>
        </TableCell>
        <TableCell component="th" scope="row">
          <p className="strengthdata">{row?.strengthData?.strength}</p>
        </TableCell>
        <TableCell align="left">
          <h3 className="annual-revenue-table">{row.primary_organization}</h3>
        </TableCell>
        <TableCell
          align="left"
          className="table-cell-of-contact-details-dropdown-th"
        >
          <div
            className="Set-dropdown-ofIndustry"
            style={{ position: "relative" }}
          >
            <div className="email-andrelative-other-info">
              <div className="maked-component-of-dropdown-forai-leads">
                <IndustryDropdown row={row} />
              </div>
            </div>
          </div>
        </TableCell>
        <TableCell align="left">
          <div className="Suspect-table-data">
            <h3 className="industry-sector-table">
              {row?.suspect_status ? row.suspect_status : "-"}
            </h3>
          </div>
        </TableCell>
        <TableCell
          align="left"
          className="Decisions-row-linkedin"
        >
          <p>
            {row?.linkedin}   </p>
        </TableCell>
        <TableCell
          align="left"
          className="Decisions-row-linkedin"
        >
          <p>{row?.email} </p>
        </TableCell>
        <TableCell
          align="left"
          className="Decisions-row-linkedin"
        >
          <p className="email-id-only-accordian">
          {row?.phone_no}
          </p>
        </TableCell> */}
      </>
    </TableRow>
  );
}
Row.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};
export default function EmployeesTable({
  tableCommingData,
  setTableCommingData,
  istableDataFilter,
  setCurrentLeadsLength,
  dataForInformation,
  rowData,
  setIsDecisionMakerExcel,
  isDecisionMakerExcel,
}) {
  const exportToExcel = (data, filename) => {
    const filteredData = data.map(({ person_id, org_id, strengthData, ...rest }) => rest);
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${filename}.xlsx`);
    setIsDecisionMakerExcel(false);
  };
  const location = useLocation();
  const newdata = location?.state?.data;
  const [loading, setLoading] = React.useState(false);
  const [decisionMakerData, setDecisionMakerData] = React.useState([]);
  const [comingOrgId, setComingOrgId] = React.useState("");
  const loggedInUserId = GetUserId();
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [strengthTableData, setStrengthTableData] = React.useState([]);
  const decisionMakerTableData = decisionMakerData;
  const [hasMore, setHasMore] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [skip, setSkip] = React.useState(0);
  const [isMakerTable, setIsMakerTable] = React.useState(false);
  const getStrength = async () => {
    if (!decisionMakerTableData?.length) return;
    const tuples = decisionMakerTableData.map((item) => ({
      items: [Number(loggedInUserId), item?.person_id],
    }));
    const data = { tuples };
    const options = {
      method: "POST",
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json",
      },
      data: data,
      url: `${APIUrlTwo()}/v1/conn_strength`,
    };
    try {
      const response = await axios(options);
      const strengthData = response?.data;
      const updatedData = decisionMakerTableData?.map((item, index) => ({
        ...item,
        strengthData: strengthData[index],
      }));
      setStrengthTableData(updatedData);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
    }
  };
  React.useEffect(() => {
    getStrength();
  }, [decisionMakerTableData]);
  // const fetchMoreData = () => {
  //     const newSkip = skip + 50;
  //     setSkip(newSkip);
  //     aiDecisionMakerTable(newSkip);
  // };
  const fetchMoreData = () => {
    if (!decisionMakerData?.length) return;
    const hasMore = decisionMakerData?.length < rowData?.people_count;
    if (!hasMore) return;
    setSkip((prevskip) => prevskip + 50);
    // const newSkip = skip + 10;
    // aiDecisionMakerTable(newSkip);
  };
  const aiDecisionMakerTable = (eventName) => {
    setHasMore(false);
    const option = {
      method: "GET",
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json",
      },
      // url: `${APIUrlOne()}/v1/decision_maker?org_id=${newdata?.org_id || newdata.id}&limit=50&skip=${eventName ? eventName : 0}`,
      url: `${APIUrlOne()}/v1/decision_maker?org_id=${newdata?.org_id || newdata.id
        }&limit=50&skip=${skip ? skip : 0}`,
    };
    axios(option)
      .then((e) => {
        const comingData = e?.data?.data;
        if (comingData.length === 0) {
          setHasMore(false);
          setDecisionMakerData([]);
          setStrengthTableData([]);
        } else {
          if (comingData.length % 50 === 0)
            setTimeout(() => setHasMore(true), 1000);
          decisionMakerData.length === 0
            ? setDecisionMakerData(comingData)
            : setDecisionMakerData([...decisionMakerData], [...comingData]);
        }
      })
      // axios(option)
      //     .then((e) => {
      //         setLoading(false);
      //         setDecisionMakerData(e?.data?.data);
      //         setHasMore(false);
      //     })
      .catch(() => {
      });
  };
  // React.useEffect(() => {
  //     if (dataForInformation) {
  //         aiDecisionMakerTable();
  //     }
  // }, [dataForInformation]);
  React.useEffect(() => {
    if (dataForInformation && isMakerTable) {
      aiDecisionMakerTable();
    } else {
      setIsMakerTable(true);
    }
  }, [dataForInformation, isMakerTable]);
  React.useEffect(() => {
    if (dataForInformation) {
      setComingOrgId(dataForInformation?.org_id);
    }
  }, [dataForInformation]);
  // React.useEffect(() => {
  //     aiDecisionMakerTable();
  // }, []);
  React.useEffect(() => {
    if (tableCommingData) {
      setCurrentLeadsLength(tableCommingData?.length);
    }
  }, [tableCommingData]);
  const handleSelectAllClick = (event) => {
    if (decisionMakerTableData.length === 0) {
      return;
    }
    if (event.target.checked) {
      const newSelecteds = decisionMakerTableData.map((row) => row.first_name);
      setSelectedRows(newSelecteds);
    } else {
      setSelectedRows([]);
    }
  };
  React.useEffect(() => {
    if (decisionMakerData?.length >= 50) {
      aiDecisionMakerTable(comingOrgId);
    }
  }, [skip]);
  React.useEffect(() => {
    if (isDecisionMakerExcel) {
      exportToExcel(decisionMakerData, 'decisionmaker_exported_data');
    }
  }, [isDecisionMakerExcel])
  return (
    <>
      {loading ? <Loader /> : null}
      <InfiniteScroll
        // rowData?.people_count (may be we need to use here)
        dataLength={decisionMakerData?.length}
        next={() => fetchMoreData()}
        hasMore={hasMore}
        scrollableTarget="DecisionMaker-table-main"
      >
        {" "}
        {strengthTableData?.length ? (
          <TableContainer
            component={Paper}
            className="DecisionMaker-table-main"
          >
            <Table
              aria-label="collapsible table"
              className="DecisionMaker-table"
            >
              <TableHead>
                <TableRow className="table-row-ai-leads">
                  <TableCell className="Decisions-row-empty"></TableCell>
                  <TableCell className="head-one"> <p className="title-of-company-profile-screen-pdf">
                    Name & Title
                  </p> </TableCell>
                  <TableCell className="head-two">  <p className="strengthdata-pdf">JOI Strength</p> </TableCell>
                  {/* <TableCell className="head-three">  <p className="company-tag-leads-to-company">Company</p> </TableCell>
                  <TableCell className="head-four"><p className="sector-heading-companyscreen"> Industry/ Sector</p>  </TableCell> */}
                  <TableCell className="head-five" >  <p className="strengthdata-pdf">JOSF Status</p></TableCell>
                  <TableCell className="head-six">  <p className="">
                    <p className="new-Linked-In">Linked In</p>
                  </p> </TableCell>
                  <TableCell className="head-seven">  <p className="">
                  <p className="new-Linked-In">Email</p>  
                  </p> </TableCell>
                  <TableCell className="head-eight">  <p className="">
                  <p className="new-Linked-In">Mobile</p> 
                  </p>  </TableCell>
                 
                </TableRow>
              </TableHead>
              <TableBody>
                {strengthTableData?.map((row, index) => (
                  <React.Fragment key={index}>
                    <Row
                      row={row}
                      selected={selectedRows.includes(row.first_name)}
                      onSelect={(firstName) => {
                        const selectedIndex = selectedRows.indexOf(firstName);
                        let newSelected = [];
                        if (selectedIndex === -1) {
                          newSelected = newSelected.concat(
                            selectedRows,
                            firstName
                          );
                        } else if (selectedIndex === 0) {
                          newSelected = newSelected.concat(
                            selectedRows.slice(1)
                          );
                        } else if (selectedIndex === selectedRows.length - 1) {
                          newSelected = newSelected.concat(
                            selectedRows.slice(0, -1)
                          );
                        } else if (selectedIndex > 0) {
                          newSelected = newSelected.concat(
                            selectedRows.slice(0, selectedIndex),
                            selectedRows.slice(selectedIndex + 1)
                          );
                        }
                        setSelectedRows(newSelected);
                      }}
                    />
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <div className="ai-leads-table-main">
            <div className="ai-leads-no-data-available-outter">
              <div className="ai-leads-no-data-available">
                No Data Available
              </div>
            </div>
          </div>
        )}
      </InfiniteScroll>
    </>
  );
}