import * as React from "react";
import "./Style.css";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import decisionMakerImage from "../../../../Assets/Cloudfigma.svg";
import decisionMakerImage from "../../../../../Assets/Cloudfigma.svg";
import axios from "axios";
// import Loader from "../../../../Components/Loader/Loader";
import {
  APIUrlFour,
  APIUrlOne,
  APIUrlTwo,
  GetUserId,
} from "../../../../../Utils/Utils";
import { useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Tooltip } from "@mui/material";
import Loader from "../../../../Loader/Loader";
let loaded = false;
function Row({ row, selected, onSelect }) {
  const [open, setOpen] = React.useState(false);
  const loggedInUserId = GetUserId();
  const linkedInUrl = row?.linkedin ? row.linkedin : "Not Available";
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
              {/* <img
                                className={
                                    row?.suspect_status === null
                                        ? "hide-image"
                                        : "decisionMakerImage-new"
                                }
                                src={decisionMakerImage}
                                alt=""
                            /> */}
              <p className="letter-heading">{row?.first_name?.substring(0, 1) + row?.last_name?.substring(0, 1)}</p>
            </div>
          </div>
        </TableCell>

        <TableCell className="Decision-maker-userTeblesell cursor-pointer" align="left">
          <Tooltip title={row?.first_name + row.last_name}>
            {row?.first_name
              ? row.first_name + row.last_name.substring(0, 10) + (row.last_name.length > 10 ? "..." : "")
              : "-"}
          </Tooltip>
        </TableCell>

        <TableCell className="Decision-maker-userTeblesell cursor-pointer" align="left">
          <Tooltip title={row?.primary_organization}>
            {row?.primary_organization
              ? row.primary_organization.substring(0, 10) +
              (row.primary_organization.length > 10 ? "..." : "")
              : "-"}
          </Tooltip>
        </TableCell>

        <TableCell className="Decision-maker-userTeblesell cursor-pointer" align="left">
          <Tooltip title={row?.primary_job_title}>
            {row?.primary_job_title
              ? row.primary_job_title.substring(0, 10) +
              (row.primary_job_title.length > 10 ? "..." : "")
              : "-"}
          </Tooltip>
        </TableCell>

        {/* <TableCell align="left">
          <Tooltip title={row?.linkedin ? row?.linkedin : "Not Available"}>
            <div className="Suspect-table-data">
              <h3 className="industry-sector-table">
                {row?.linkedin
                  ? row?.linkedin.length > 26
                    ? row?.linkedin.substr(0, 26) + "..."
                    : row?.linkedin
                  : "-"}
              </h3>
            </div>
          </Tooltip>
        </TableCell> */}
        <TableCell align="left" className="table-cell-of-contact-details-dropdown-th-prospect" style={{ cursor: 'pointer' }}>
          <Tooltip title={
            linkedInUrl !== 'Not Available' ?
              <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="linkedin-url-tooltip">{linkedInUrl}</a>
              : 'Not Available'
          }>
            <div
              className="Set-dropdown-ofContactDetailList"
              style={{ position: "relative" }}
            >

              <p className="email-in-accordian">
                {row?.linkedin
                  ? row?.linkedin.length > 28
                    ? row?.linkedin.substr(28, 28) ||
                    row?.linkedin.length > 20 + "..."
                    : row?.linkedin
                  : "Not Available"}
              </p>
            </div>
          </Tooltip>
        </TableCell>
        <TableCell align="left" className="cursor-pointer">
          <Tooltip title={row?.email ? row?.email : "Not Available"}>
            <div className="Suspect-table-data">
              <h3 className="industry-sector-table">
                {row?.email
                  ? row?.email.length > 26
                    ? row?.email.substr(0, 26) + "..."
                    : row?.email
                  : "-"}
              </h3>
            </div>
          </Tooltip>
        </TableCell>
        <TableCell align="left">
          <Tooltip
            title={row?.phone_number ? row?.phone_number : "Not Available"}
          >
            <div className="Suspect-table-data">
              {row?.phone_number
                ? row?.phone_number.length > 14
                  ? row?.phone_number.substr(0, 14) + "..."
                  : row?.phone_number
                : "-"}
            </div>
          </Tooltip>
        </TableCell>
        <TableCell
          align="left"
          className="table-cell-of-contact-details-dropdown-th-prospect"
        >
          <Tooltip title={row?.comments}>
            {row?.comments
              ? row?.comments.length > 28
                ? row?.comments.substr(28, 28) ||
                row?.comments.length > 20 + "..."
                : row?.comments
              : "-"}
          </Tooltip>
        </TableCell>
        <TableCell align="left" className="Num-ofemployeess-data">
          <Tooltip Tooltip={row?.source_description}
          >
            {row?.source_description ? row.source_description : "-"}
          </Tooltip>
        </TableCell>
        {/* <TableCell className="Peoples-org_permalink" align="left">
          <Tooltip
            title={row?.org_permalink ? row?.org_permalink : "Not Available"}
          >
            <div className="Suspect-table-data">
              {row?.org_permalink
                ? row?.org_permalink?.length > 14
                  ? row?.org_permalink.substr(0, 14) + "..."
                  : row?.org_permalink
                : "-"}
            </div>
          </Tooltip>
        </TableCell>
        <TableCell
          align="left"
          className="table-cell-of-contact-details-dropdown-th-prospect"
        >
          {row?.comments ? row.comments : "-"}
        </TableCell>
        <TableCell
          align="left"
          className="table-cell-of-contact-details-dropdown-th-prospect"
        >
          <Tooltip title={row?.country ? row?.country : "Not Available"}>
            <div className="Suspect-table-data">
              {row?.country
                ? row?.country?.length > 6
                  ? row?.country.substr(0, 6) + ".."
                  : row?.country
                : "-"}
            </div>
          </Tooltip>
        </TableCell>
        <TableCell
          align="left"
          className="table-cell-of-contact-details-dropdown-th-prospect"
        >
          {row?.state ? row.state : "-"}
        </TableCell>
        <TableCell align="left" className="">
          <Tooltip title={row?.city ? row?.city : "Not Available"}>
            {row?.city
              ? row?.city?.length > 4
                ? row?.city.substr(0, 4) + ".."
                : row?.city
              : "-"}
          </Tooltip>
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
export default function PeopleRecords({ rowData }) {
  const location = useLocation();
  const orgData = location?.state;
  const isComponyScreen = location?.state?.isComponyScreen;
  const [loading, setLoading] = React.useState(false);
  const [decisionMakerData, setDecisionMakerData] = React.useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [strengthTableData, setStrengthTableData] = React.useState([]);
  const decisionMakerTableData = decisionMakerData;
  const [hasMore, setHasMore] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [skip, setSkip] = React.useState(0);
  const [isMakerTable, setIsMakerTable] = React.useState(false);
  const [decisionMakerDataCount, setDecisionMakerDataCount] = React.useState(
    []
  );
  //   const fetchMoreData = () => {
  //     if (!decisionMakerData?.length) return;
  //     const hasMore = decisionMakerData?.length < rowData?.people_count || decisionMakerDataCount;
  //     if (!hasMore) return;
  //     setSkip((prevskip) => prevskip + 50);
  //   };
  const [orgId, setOrgId] = React.useState("");
  React.useEffect(() => {
    if (orgId !== (orgData?.org_id || orgData?.id)) {
      setSkip(0);
      setDecisionMakerData([]);
    }
  }, [orgData?.org_id]);
  const aiDecisionMakerTable = () => {
    setLoading(true);
    // setHasMore(false);
    // if (orgId !== (orgData?.org_id || orgData?.id) && isComponyScreen) {
    //     setOrgId(orgData?.org_id || orgData.id);
    // }
    var org_id = orgData.org_id;
    const option = {
      method: "GET",
      headers: {
        "content-type": "plain/text",
      },
      // url: `${APIUrlFour()}v1/org_validation?limit=50&skip=0&org_id=${org_id}`
      url: `${APIUrlFour()}/v1/people_validation?limit=50&skip=0&org_id=${org_id}`,
    };
    axios(option)
      .then((e) => {
        setDecisionMakerDataCount(e?.data?.count);
        setLoading(false);
        const comingData = e?.data?.data;
        if (comingData.length === 0) {
          setHasMore(false);
        } else {
          if (isComponyScreen) {
            loaded = true;
            setTimeout(() => setHasMore(true), 1000);
            setDecisionMakerData([...decisionMakerData, ...comingData]);
            return;
          }
          if (comingData.length % 50 === 0)
            setTimeout(() => setHasMore(true), 1000);
          decisionMakerData.length === 0
            ? setDecisionMakerData(comingData)
            : setDecisionMakerData([...decisionMakerData, ...comingData]);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };
  React.useEffect(() => {
    aiDecisionMakerTable();
    // if (orgData?.length) {
    // } else {
    //     setIsMakerTable(true);
    // }
  }, []);
  //   const handleSelectAllClick = (event) => {
  //     if (decisionMakerTableData.length === 0) {
  //       return;
  //     }
  //     if (event.target.checked) {
  //       const newSelecteds = decisionMakerTableData.map((row) => row.first_name);
  //       setSelectedRows(newSelecteds);
  //     } else {
  //       setSelectedRows([]);
  //     }
  //   };
  //   React.useEffect(() => {
  //       if (decisionMakerData?.length > 50) {
  //         aiDecisionMakerTable(comingOrgId);
  //     }
  //   }, [skip]);
  return (
    <>
      {loading ? <Loader /> : null}
      <InfiniteScroll
        // rowData?.people_count (may be we need to use here)
        dataLength={decisionMakerData?.length}
        // next={() => fetchMoreData()}
        hasMore={hasMore}
        scrollableTarget="DecisionMaker-table-main"
      >
        {decisionMakerData?.length ? (
          <TableContainer component={Paper} className="All-People-table">
            <Table
              aria-label="collapsible table"
              className="All-people-table-main"
            >
              <TableHead>
                <TableRow className="table-row-ai-leads">
                  <TableCell className="Decisions-row-empty"></TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Organization </TableCell>
                  <TableCell align="left" className="DecisionstableJOIStrength">
                    <p className="strengthdata">Job Title</p>
                  </TableCell>
                  {/* <TableCell
                    align="left"
                    className="employee-row-tableCompanydata"
                  >
                    <p className="company-tag-leads-to-company">Company</p>
                  </TableCell> */}
                  <TableCell align="left" className="People-linkdin-table-cell">
                    <p className="People-Linkedin">Linkedin</p>
                  </TableCell>
                  <TableCell align="left" className="People-linkdin-table-cell">
                    <p className="People-Linkedin">Email</p>
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
                    className="prospects-row-tableDetails-cd"
                  >
                    <p className="People-phone-data"> Phone no</p>
                  </TableCell>
                  <TableCell align="left" className="">
                    Comments
                  </TableCell>
                  <TableCell align="left" className="industry-row-tableStatus">
                    <p className="People-Employees-data">Source Description</p>
                  </TableCell>
                  {/* <TableCell align="left" className="Permalink-all-people">
                    permalink
                  </TableCell>
                  <TableCell align="left" className="">
                    comments
                  </TableCell>
                  <TableCell align="left" className="">
                    country
                  </TableCell>
                  <TableCell align="left" className="">
                    state
                  </TableCell>
                  <TableCell
                    align="left"
                    className="prospects-row-tableDetails-cd"
                  >
                    <p className="people-city-data">city</p>
                  </TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {decisionMakerData?.map((row, index) => (
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
