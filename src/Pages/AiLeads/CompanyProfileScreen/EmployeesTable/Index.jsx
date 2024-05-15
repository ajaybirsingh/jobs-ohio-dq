import * as React from "react";
import PropTypes from "prop-types";
import "./Style.css";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import decisionMakerImage from "../../../../Assets/Cloudfigma.svg";
import ContactDetailList from "../../../../Components/AiLeads/ContactDetailList/ContactDetailList";
import RightSidebar from "../../../../Components/RightSiderbar/RightSiderbar";
import { Tooltip } from "@mui/material";
import axios from "axios";
import Loader from "../../../../Components/Loader/Loader";
import { toast } from "react-toastify";
import { APIUrlOne, APIUrlTwo, GetUserId } from "../../../../Utils/Utils";
import { useLocation } from "react-router-dom";
import IndustryDropdown from "../../../../Components/AiLeads/IndustrySectorDropdown/Index";
import InfiniteScroll from "react-infinite-scroll-component";
import * as XLSX from "xlsx";
let loaded = false;
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
          // const shortestPath = { ...response.data };
          // shortestPath.source = loggedInUserId;
          // shortestPath.target = event;
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

          <div className="Decision-maker-user-name-main-container">
            <div
              className={
                row?.decision_maker === true
                  ? "Decision-maker-user-name"
                  : "Decision-maker-user-namenoborder"
              }
            >
              <img
                className={
                  row?.suspect_status === null
                    ? "hide-image"
                    : "decisionMakerImage-new"
                }
                src={decisionMakerImage}
                alt=""
              />
              <p className="letter-heading">
                {row?.first_name?.substring(0, 1)}
                {row?.last_name?.substring(0, 1)}
              </p>
            </div>
            {/* <div className="name-and-title-text">
              <h3 className="company-name-country-prospect">
                {`${row?.first_name} ${row?.last_name}`}{" "}
              </h3>
              <p className="after-company-name-country-prospect">
                {row?.primary_job_title?.substring(0, 15) +
                  (row?.primary_job_title?.length > 10 ? "...." : "")}
              </p>
            </div> */}
          </div>
        </TableCell>
        <TableCell className="Decision-maker-userTeblesell" align="left">
          {/* <img
            className={
              row?.suspect_status === null ? "hide-image" : "decisionMakerImage"
            }
            src={decisionMakerImage}
            alt=""
          /> */}
          <div className="Decision-maker-user-name-main-container">
            {/* <div
              className={
                row?.decision_maker === true
                  ? "Decision-maker-user-name"
                  : "Decision-maker-user-namenoborder"
              }
            >
              <p className="letter-heading">
                {row?.first_name?.substring(0, 1)}
                {row?.last_name?.substring(0, 1)}
              </p>
            </div> */}
            {/* <div className="name-and-title-text">
              <h3 className="company-name-country-prospect-added">
                {`${row?.first_name} ${row?.last_name}`}{" "}
              </h3>
              <p className="after-company-name-country-prospect-new">
                {row?.primary_job_title?.substring(0, 15) +
                  (row?.primary_job_title?.length > 10 ? "...." : "")}
              </p>
            </div> */}

            <div className="name-and-title-text">
              <h3 className="company-name-country-prospect-added">
                {`${row?.first_name} ${row?.last_name}`}{" "}
              </h3>
              <p className="after-company-name-country-prospect-new">
                {row?.primary_job_title
                  ? row.primary_job_title.substring(0, 20) +
                  (row.primary_job_title.length > 10 ? "..." : "")
                  : '-'
                }
              </p>

            </div>
          </div>
        </TableCell>
        <TableCell component="th" scope="row">
          <p className="strengthdata">{row?.strengthData?.strength ? row?.strengthData?.strength : "-"}</p>
        </TableCell>
        {/* <TableCell align="left">
          <h3 className="annual-revenue-table">{row.primary_organization}</h3>
        </TableCell> */}

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
                <IndustryDropdown row={row}

                />
              </div>
            </div>
          </div>
        </TableCell>

        {/* <TableCell align="left">
                    <h3 className="industry-sector-table">-</h3>
                </TableCell> */}
        <TableCell align="left">
          <div className="Suspect-table-data">
            <h3 className="industry-sector-table">
              {row?.suspect_status ? row.suspect_status : "-"}
            </h3>
          </div>
        </TableCell>
        {/* <TableCell
          align="left"
          className="contact-details-leads-to-company-profile"
        >
          <div style={{ position: "relative" }}>
            <div className="email-and-other-info">
              <div className="maked-component-of-dropdown">
                <ContactDetailList item={row} />
              </div>
            </div>
          </div>
        </TableCell> */}
        <TableCell align="left" className="table-cell-of-contact-details-dropdown-th-prospect">

          <div
            className="Set-dropdown-ofContactDetailList"
            style={{ position: "relative" }}
          >
            <div className="email-and-other-infodc">
              <div className="maked-component-of-dropdown">
                <ContactDetailList item={row} />
              </div>
            </div>
          </div>
        </TableCell>
      </>
      <TableCell className="table-cellhandleRightsidebar-newclasss">
        <div className="table-cellhandleRightsidebar-edit">
          {/* <Tooltip   className="dfvbvfe2wefvfe2wefvwfv" title={"View AI Path"}> */}
          <IconButton
            aria-label="expand row"
            size="small"
            // onClick={() => handleRightsidebar(row?.person_id)}
            className="button-collapse-table-for-company"
          >
            <RightSidebar
              row={row}
              rowid={row?.person_id}
              handleRightsidebar={handleRightsidebar}
              dataShortestPath={dataShortestPath}
              openSidebar={openSidebar}
            />
          </IconButton>
          {/* </Tooltip> */}
        </div>
      </TableCell>
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
    const filteredData = data.map(
      ({ person_id, org_id, strengthData, ...rest }) => rest
    );
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `${filename}.xlsx`);
    setIsDecisionMakerExcel(false);
  };

  const location = useLocation();
  const newdata = location?.state?.data;
  const isComponyScreen = location?.state?.isComponyScreen;
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
  const [decisionMakerDataCount, setDecisionMakerDataCount] = React.useState('');
  const getStrength = async () => {
    if (!decisionMakerTableData?.length) return;
    setLoading(true);
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
      setLoading(false);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
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
    const hasMore = decisionMakerData?.length < rowData?.people_count || decisionMakerDataCount;
    if (!hasMore) return;
    setSkip((prevskip) => prevskip + 50);
    // const newSkip = skip + 10;
    // aiDecisionMakerTable(newSkip);
  };
  const [orgId, setOrgId] = React.useState('');
  React.useEffect(() => {
    if (orgId !== (newdata?.org_id || newdata.id)) {
      setSkip(0);
      setDecisionMakerData([])
    }

  }, [newdata?.org_id, newdata.id])

  const aiDecisionMakerTable = (eventName) => {
    setHasMore(false);
    setLoading(true);
    if (orgId !== (newdata?.org_id || newdata.id) && isComponyScreen) {
      setOrgId(newdata?.org_id || newdata.id)
    }

    const option = {
      method: "GET",
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json",
      },
      url: `${APIUrlOne()}/v1/decision_maker?org_id=${newdata?.org_id || newdata.id
        }&limit=50&skip=${orgId !== (newdata?.org_id || newdata.id) && isComponyScreen ? 0 : skip ? skip : 0}`,
    };
    axios(option)
      .then((e) => {
        setDecisionMakerDataCount(e?.data?.count);
        setLoading(false);
        const comingData = e?.data?.data;

        if (comingData.length === 0) {
          setHasMore(false);
          setDecisionMakerData([]);
          setStrengthTableData([]);
        }
        else {
          if (isComponyScreen) {
            loaded = true;
            setTimeout(() => setHasMore(true), 1000);
            // setDecisionMakerData(comingData);
            setDecisionMakerData([...decisionMakerData, ...comingData])
            return
          }
          if (comingData.length % 50 === 0)
            setTimeout(() => setHasMore(true), 1000);
          decisionMakerData.length === 0
            ? setDecisionMakerData(comingData)
            :
            setDecisionMakerData([...decisionMakerData, ...comingData]);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };



  // const aiDecisionMakerTable = (eventName) => {
  //   setHasMore(false);
  //   setLoading(true);
  //   const option = {
  //     headers: {
  //       "access-control-allow-origin": "*",
  //       "content-type": "application / json",
  //     },
  //     url: `${APIUrlOne()}/v1/decision_maker?org_id=${newdata?.org_id || newdata.id}&limit=50&skip=${skip ? skip : 0}`,
  //   };
  //   axios(option)
  //     .then((e) => {
  //       setLoading(false);
  //       const comingData = e?.data?.data;
  //       if (comingData.length === 0) {
  //         setHasMore(false);
  //         setDecisionMakerData([]);
  //         setStrengthTableData([]);
  //       }
  //       else {
  //         if (window.location.pathname === '/companyprofilescreen' && !loaded) {
  //           loaded = true
  //           setDecisionMakerData(comingData)
  //           return
  //         }
  //         if (comingData.length % 50 === 0)
  //           setTimeout(() => setHasMore(true), 1000);
  //         decisionMakerData.length === 0
  //           ? setDecisionMakerData(comingData)
  //           : setDecisionMakerData([...decisionMakerData, ...comingData]);
  //       }
  //     })
  //     .catch(() => {
  //       setLoading(false);
  //     });
  // };

  // React.useEffect(() => {
  //   if (dataForInformation) {
  //     aiDecisionMakerTable();
  //   }
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
      exportToExcel(decisionMakerData, "decisionmaker_exported_data");
    }
  }, [isDecisionMakerExcel]);

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
                  <TableCell className="Decisions-row-tableNameaAndtitle">
                    <p className="title-of-company-profile-screen">

                      Name & Title
                    </p>
                  </TableCell>
                  <TableCell align="left" className="DecisionstableJOIStrength">
                    <p className="strengthdata">JOI Strength</p>
                  </TableCell>
                  {/* <TableCell
                    align="left"
                    className="employee-row-tableCompanydata"
                  >
                    <p className="company-tag-leads-to-company">Company</p>
                  </TableCell> */}
                  <TableCell
                    align="left"
                    className="annual-row-tableIndustrySector"
                  >
                    <p className="sector-heading-companyscreen">
                      {" "}
                      Industry/ Sector
                    </p>
                  </TableCell>
                  <TableCell align="left" className="industry-row-tableStatus">
                    <p className="strengthdata">JOSF Status</p>
                  </TableCell>
                  {/* <TableCell
                    align="left"
                    className="Decisions-row-tableNameaAndtitle-leads-to-companyprofile"
                  >
                    <p className="Contact-Details-heading-leads-to-profile">
                      Contact Details
                    </p>
                  </TableCell> */}
                  <TableCell
                    align="left"
                    className="prospects-row-tableDetails-cd">
                    <p className="Com-details-prospect">  Contact Details</p>
                  </TableCell>
                  {/* <TableCell
                    align="left"
                    className="prospects-row-table"
                  ></TableCell> */}
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
