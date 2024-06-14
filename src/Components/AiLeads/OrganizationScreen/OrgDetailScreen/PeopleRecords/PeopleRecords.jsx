// import * as React from "react";
// import "./Style.css";
// import PropTypes from "prop-types";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import axios from "axios";
// import {
//   APIUrlFour
// } from "../../../../../Utils/Utils";
// import { useLocation } from "react-router-dom";
// import InfiniteScroll from "react-infinite-scroll-component";
// import { Tooltip } from "@mui/material";
// import Loader from "../../../../Loader/Loader";
// let loaded = false;
// function Row({ row }) {
//   const linkedInUrl = row?.linkedin ? row.linkedin : "Not Available";
//   return (
//     <TableRow className="juyds" sx={{ "& > *": { borderBottom: "unset" } }}>
//       <>
//         <TableCell className="Decisions-row-empty" align="left">
//           <div className="Decision-maker-user-name-main-container">
//             <div
//               className={
//                 row?.decision_maker === true
//                   ? "Decision-maker-user-name"
//                   : "Decision-maker-user-namenoborder"
//               }
//             >
//               <p className="letter-heading">{row?.first_name?.substring(0, 1) + row?.last_name?.substring(0, 1)}</p>
//             </div>
//           </div>
//         </TableCell>

//         <TableCell className="Decision-maker-userTeblesell cursor-pointer" align="left">
//           <Tooltip title={row?.first_name + row.last_name}>
//             {row?.first_name
//               ? row.first_name + row.last_name.substring(0, 10) + (row.last_name.length > 10 ? "..." : "")
//               : "-"}
//           </Tooltip>
//           <Tooltip title={row?.primary_job_title}>
//             <p className="job-title-table"> {row?.primary_job_title
//               ? row.primary_job_title.substring(0, 10) +
//               (row.primary_job_title.length > 10 ? "..." : "")
//               : "-"}</p>
//           </Tooltip>
//         </TableCell>

//         {/* <TableCell className="Decision-maker-userTeblesell cursor-pointer" align="left">
//           <Tooltip title={row?.primary_organization}>
//             {row?.primary_organization
//               ? row.primary_organization.substring(0, 10) +
//               (row.primary_organization.length > 10 ? "..." : "")
//               : "-"}
//           </Tooltip>
//         </TableCell> */}

//         {/* <TableCell className="Decision-maker-userTeblesell cursor-pointer" align="left">
//           <Tooltip title={row?.primary_job_title}>
//             {row?.primary_job_title
//               ? row.primary_job_title.substring(0, 10) +
//               (row.primary_job_title.length > 10 ? "..." : "")
//               : "-"}
//           </Tooltip>
//         </TableCell> */}
//         <TableCell align="left" className="table-cell-of-contact-details-dropdown-th-prospect" style={{ cursor: 'pointer' }}>
//           <Tooltip title={
//             linkedInUrl !== 'Not Available' ?
//               <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="linkedin-url-tooltip">{linkedInUrl}</a>
//               : 'Not Available'
//           }>
//             <div
//               className="Set-dropdown-ofContactDetailList"
//               style={{ position: "relative" }}
//             >

//               <p className="email-in-accordian">
//                 {row?.linkedin
//                   ? row?.linkedin.length > 28
//                     ? row?.linkedin.substr(28, 28) ||
//                     row?.linkedin.length > 20 + "..."
//                     : row?.linkedin
//                   : "Not Available"}
//               </p>
//             </div>
//           </Tooltip>
//         </TableCell>
//         <TableCell align="left" className="cursor-pointer">
//           <Tooltip title={row?.email ? row?.email : "Not Available"}>
//             <div className="Suspect-table-data">
//               <h3 className="industry-sector-table">
//                 {row?.email
//                   ? row?.email.length > 26
//                     ? row?.email.substr(0, 26) + "..."
//                     : row?.email
//                   : "-"}
//               </h3>
//             </div>
//           </Tooltip>
//         </TableCell>
//         <TableCell align="left">
//           <Tooltip
//             title={row?.phone_number ? row?.phone_number : "Not Available"}
//           >
//             <div className="Suspect-table-data">
//               {row?.phone_number
//                 ? row?.phone_number.length > 14
//                   ? row?.phone_number.substr(0, 14) + "..."
//                   : row?.phone_number
//                 : "-"}
//             </div>
//           </Tooltip>
//         </TableCell>
//         {/* <TableCell
//           align="left"
//           className="table-cell-of-contact-details-dropdown-th-prospect"
//         >
//           <Tooltip title={row?.comments}>
//             {row?.comments
//               ? row?.comments.length > 28
//                 ? row?.comments.substr(28, 28) ||
//                 row?.comments.length > 20 + "..."
//                 : row?.comments
//               : "-"}
//           </Tooltip>
//         </TableCell>
//         <TableCell align="left" className="Num-ofemployeess-data">
//           <Tooltip Tooltip={row?.source_description}
//           >
//             {row?.source_description ? row.source_description : "-"}
//           </Tooltip>
//         </TableCell> */}
//       </>
//     </TableRow>
//   );
// }
// Row.propTypes = {
//   row: PropTypes.object.isRequired,
//   selected: PropTypes.bool.isRequired,
//   onSelect: PropTypes.func.isRequired,
// };
// export default function PeopleRecords({ rowData, organizationData }) {
//   const location = useLocation();
//   const orgData = location?.state;
//   const isComponyScreen = location?.state?.isComponyScreen;
//   const [loading, setLoading] = React.useState(false);
//   const [decisionMakerData, setDecisionMakerData] = React.useState([]);
//   const [selectedRows, setSelectedRows] = React.useState([]);
//   const decisionMakerTableData = decisionMakerData;
//   const [hasMore, setHasMore] = React.useState(false);
//   const [page, setPage] = React.useState(1);
//   const [skip, setSkip] = React.useState(0);
//   const [isMakerTable, setIsMakerTable] = React.useState(false);
//   const [decisionMakerDataCount, setDecisionMakerDataCount] = React.useState(
//     []
//   );
//   const fetchMoreData = () => {
//     if (!decisionMakerData?.length) return;
//     const hasMore = decisionMakerData?.length < rowData?.people_count || decisionMakerDataCount;
//     if (!hasMore) return;
//     setSkip((prevskip) => prevskip + 50);
//   };
//   const [orgId, setOrgId] = React.useState("");
//   React.useEffect(() => {
//     if (orgId !== (orgData?.org_id || orgData?.id || organizationData?.org_id)) {
//       setSkip(0);
//       setDecisionMakerData([]);
//     }
//   }, [orgData?.org_id, organizationData?.org_id]);
//   const aiDecisionMakerTable = () => {
//     setLoading(true);
//     const org_id = organizationData?.org_id || orgData.org_id;
//     const option = {
//       method: "GET",
//       headers: {
//         "content-type": "plain/text",
//       },
//       url: `${APIUrlFour()}/v1/people_validation?limit=50&skip=${skip ? skip : 0}&org_id=${org_id}`,
//     };
//     axios(option)
//       .then((e) => {
//         setDecisionMakerDataCount(e?.data?.count);
//         setLoading(false);
//         const comingData = e?.data?.data;
//         if (comingData.length === 0) {
//           setHasMore(false);
//         } else {
//           if (isComponyScreen) {
//             loaded = true;
//             setTimeout(() => setHasMore(true), 1000);
//             setDecisionMakerData([...decisionMakerData, ...comingData]);
//             return;
//           }
//           if (comingData.length % 50 === 0)
//             setTimeout(() => setHasMore(true), 1000);
//           decisionMakerData.length === 0
//             ? setDecisionMakerData(comingData)
//             : setDecisionMakerData([...decisionMakerData, ...comingData]);
//         }
//       })
//       .catch(() => {
//         setLoading(false);
//       });
//   };
//   React.useEffect(() => {
//     if (organizationData?.org_id || orgData.org_id) {
//       aiDecisionMakerTable();
//     }
//   }, [organizationData?.org_id, orgData.org_id, skip]);
//   return (
//     <>
//       {loading ? <Loader /> : null}
//       <InfiniteScroll
//         // rowData?.people_count (may be we need to use here)
//         dataLength={decisionMakerData?.length}
//         next={() => fetchMoreData()}
//         hasMore={hasMore}
//         scrollableTarget="DecisionMaker-table-main"
//       >
//         {decisionMakerData?.length ? (
//           <TableContainer component={Paper} className="All-People-table">
//             <Table
//               aria-label="collapsible table"
//               className="All-people-table-main"
//             >
//               <TableHead>
//                 <TableRow className="table-row-ai-leads">
//                   <TableCell className="Decisions-row-empty"></TableCell>
//                   <TableCell>Name & Title</TableCell>
//                   {/* <TableCell>Organization </TableCell> */}
//                   {/* <TableCell align="left" className="DecisionstableJOIStrength">
//                     <p className="strengthdata">Job Title</p>
//                   </TableCell> */}
//                   <TableCell align="left" className="People-linkdin-table-cell">
//                     <p className="People-Linkedin">Linkedin</p>
//                   </TableCell>
//                   <TableCell align="left" className="People-linkdin-table-cell">
//                     <p className="People-Linkedin">Email</p>
//                   </TableCell>
//                   <TableCell
//                     align="left"
//                     className="prospects-row-tableDetails-cd"
//                   >
//                     <p className="People-phone-data"> Phone no</p>
//                   </TableCell>
//                   {/* <TableCell align="left" className="">
//                     Comments
//                   </TableCell>
//                   <TableCell align="left" className="industry-row-tableStatus">
//                     <p className="People-Employees-data">Source Description</p>
//                   </TableCell> */}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {decisionMakerData?.map((row, index) => (
//                   <React.Fragment key={index}>
//                     <Row
//                       row={row}
//                       selected={selectedRows.includes(row.first_name)}
//                       onSelect={(firstName) => {
//                         const selectedIndex = selectedRows.indexOf(firstName);
//                         let newSelected = [];
//                         if (selectedIndex === -1) {
//                           newSelected = newSelected.concat(
//                             selectedRows,
//                             firstName
//                           );
//                         } else if (selectedIndex === 0) {
//                           newSelected = newSelected.concat(
//                             selectedRows.slice(1)
//                           );
//                         } else if (selectedIndex === selectedRows.length - 1) {
//                           newSelected = newSelected.concat(
//                             selectedRows.slice(0, -1)
//                           );
//                         } else if (selectedIndex > 0) {
//                           newSelected = newSelected.concat(
//                             selectedRows.slice(0, selectedIndex),
//                             selectedRows.slice(selectedIndex + 1)
//                           );
//                         }
//                         setSelectedRows(newSelected);
//                       }}
//                     />
//                   </React.Fragment>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         ) : (
//           <div className="ai-leads-table-main">
//             <div className="ai-leads-no-data-available-outter">
//               <div className="ai-leads-no-data-available">
//                 No Data Available
//               </div>
//             </div>
//           </div>
//         )}
//       </InfiniteScroll>
//     </>
//   );
// }
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
import axios from "axios";
import {
  APIUrlFour,
  GetUserId
} from "../../../../../Utils/Utils";
import { useLocation, useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tooltip } from "@mui/material";
import Loader from "../../../../Loader/Loader";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Textarea } from "@mui/joy";
import { toast } from "react-toastify";
import { PEOPLE_RECORDS } from "../../../../../Utils/Constants";
let loaded = false;
function Row({ row, organizationData }) {
  const navigate = useNavigate();
  const linkedInUrl = row?.linkedin ? row.linkedin : "Not Available";
  const [deleteData, setDeleteData] = React.useState('');
  const [ModalOpen, setModalOpen] = React.useState(false)
  const [modalTeaxtArea, setModalTeaxtArea] = React.useState("")
  const userId = GetUserId();
  const DeletePeople = (row) => {
    setDeleteData(row)
    setModalOpen(true);
  }
  const handleClose = (row) => {
    setModalOpen(false);
  };
  const validateFields = () => {
    if (modalTeaxtArea === "") {
      toast.error("Please Enter Reason")
      return false
    }
    return true
  }
  const removeQuotes = (str) => {
    if (str.startsWith('"') && str.endsWith('"')) {
      return str.slice(1, -1);
    }
    return str;
  };
  const userIdWithoutQuotes = removeQuotes(userId);
  const handleDeleteCase = () => {
    if (!validateFields()) return
    const data = {
      records: [
        {
          record_id: row?.uuid,
          user_id: userIdWithoutQuotes
        }
      ]
    };
    const option = {
      method: "POST",
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json",
      },
      url: `${APIUrlFour()}/v1/delete_record_people`,
      data: JSON.stringify(data),
    };
    axios(option)
      .then((e) => {
        if (e?.status === 200) {
          toast.success("Record Deleted Successfully");
          setModalTeaxtArea('');
          handleClose();
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  }

  const EditPeople = (row) => {
    const orgPeopleData = {
      ...row,
      orgData: organizationData
    };
    navigate(PEOPLE_RECORDS, { state: { data: orgPeopleData, isOrganizationScreen: window.location.pathname === '/OrgDetails' } })
  }
  return (
    <React.Fragment>
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
                <p className="letter-heading">{row?.first_name?.substring(0, 1) + row?.last_name?.substring(0, 1)}</p>
              </div>
            </div>
          </TableCell>
          {/* <TableCell className="Decision-maker-userTeblesell cursor-pointer" align="left">
            <Tooltip title={row?.first_name + row.last_name}>
              {row?.first_name
                ? row.first_name + row.last_name.substring(0, 10) + (row.last_name.length > 10 ? "..." : "")
                : "-"}
            </Tooltip>
            <Tooltip title={row?.primary_job_title}>
              <p className="job-title-table"> {row?.primary_job_title
                ? row.primary_job_title.substring(0, 10) +
                (row.primary_job_title.length > 10 ? "..." : "")
                : "-"}</p>
            </Tooltip>
          </TableCell> */}


          {/* <TableCell className="Decision-maker-userTeblesell cursor-pointer" align="left">
            <Tooltip title={row?.first_name + row.last_name}>
              {row?.first_name
                ? row.first_name + row.last_name.substring(0, 15) + (row.last_name.length > 15 ? "..." : "")
                : "-"}
            </Tooltip>
            <Tooltip title={row?.primary_job_title}>
              <p className="job-title-table"> {row?.primary_job_title
                ? row.primary_job_title.substring(0, 25) +
                (row.primary_job_title.length > 25 ? "..." : "")
                : "-"}</p>
            </Tooltip>
          </TableCell> */}

          <TableCell className="Decision-maker-userTeblesell cursor-pointer" align="left">
            <Tooltip title={row?.first_name + " " + row?.last_name}>
              {row?.first_name
                ? row.first_name + " " + row.last_name.substring(0, 15) + (row.last_name.length > 15 ? "..." : "")
                : "-"}
            </Tooltip>
            <Tooltip title={row?.primary_job_title}>
              <p className="job-title-table">
                {row?.primary_job_title
                  ? row.primary_job_title.substring(0, 25) + (row.primary_job_title.length > 25 ? "..." : "")
                  : "-"}
              </p>
            </Tooltip>
          </TableCell>

          {/* <TableCell className="Decision-maker-userTeblesell cursor-pointer" align="left">
          <Tooltip title={row?.primary_organization}>
            {row?.primary_organization
              ? row.primary_organization.substring(0, 10) +
              (row.primary_organization.length > 10 ? "..." : "")
              : "-"}
          </Tooltip>
        </TableCell> */}
          {/* <TableCell className="Decision-maker-userTeblesell cursor-pointer" align="left">
          <Tooltip title={row?.primary_job_title}>
            {row?.primary_job_title
              ? row.primary_job_title.substring(0, 10) +
              (row.primary_job_title.length > 10 ? "..." : "")
              : "-"}
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
              // style={{ position: "relative" }}
              >
                <p className="">
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
              title={row?.phone_no ? row?.phone_no : "Not Available"}
            >
              <div className="Suspect-table-data">
                {row?.phone_no
                  ? row?.phone_no.length > 14
                    ? row?.phone_no.substr(0, 14) + "..."
                    : row?.phone_no
                  : "-"}
              </div>
            </Tooltip>
          </TableCell>
          <TableCell className="table-cellhandleRightsidebar-prospect">
            <div className="table-cellhandleRightsidebar" style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
              <Tooltip title="Edit">
                <EditIcon className="action-icons-people-edit" onClick={() => EditPeople(row)} />
              </Tooltip>
              <Tooltip title="Delete">
                <DeleteIcon onClick={() => DeletePeople(row)} className="action-icons-people-delete" />
              </Tooltip>
            </div>
          </TableCell>
          {/* <TableCell
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
        </TableCell> */}
        </>
      </TableRow>
      <Dialog className="Delete-Confirmation"
        open={ModalOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="deleteD-ConfirmationOutter_class" id="alert-dialog-title">
          {"Delete Confirmation "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <label htmlFor=""> Reason <span className="Decisionmaker-Reasonteaxt-area-lable">*</span> </label>
            <Textarea minRows={3} value={modalTeaxtArea} onChange={(e) => setModalTeaxtArea(e.target.value)} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className="DecisionmakerModalButton" autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button className="CancelDelete-Confirmation" onClick={handleDeleteCase}>Delete</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
Row.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};
export default function PeopleRecords({ rowData, organizationData }) {
  const location = useLocation();
  const orgData = location?.state;
  const isComponyScreen = location?.state?.isComponyScreen;
  const [loading, setLoading] = React.useState(false);
  const [decisionMakerData, setDecisionMakerData] = React.useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const decisionMakerTableData = decisionMakerData;
  const [hasMore, setHasMore] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [skip, setSkip] = React.useState(0);
  const [isMakerTable, setIsMakerTable] = React.useState(false);
  const [decisionMakerDataCount, setDecisionMakerDataCount] = React.useState(
    []
  );
  const fetchMoreData = () => {
    if (!decisionMakerData?.length) return;
    const hasMore = decisionMakerData?.length < rowData?.people_count || decisionMakerDataCount;
    if (!hasMore) return;
    setSkip((prevskip) => prevskip + 50);
  };
  const [orgId, setOrgId] = React.useState("");
  React.useEffect(() => {
    if (orgId !== (orgData?.org_id || orgData?.id || organizationData?.org_id)) {
      setSkip(0);
      setDecisionMakerData([]);
    }
  }, [orgData?.org_id, organizationData?.org_id]);
  const aiDecisionMakerTable = () => {
    setLoading(true);
    const org_id = organizationData?.permalink || orgData?.permalink;
    const option = {
      method: "GET",
      headers: {
        "content-type": "plain/text",
      },
      url: `${APIUrlFour()}/v1/people_validation?limit=50&skip=${skip ? skip : 0}&org_permalink=${org_id}&org_id=${orgData?.org_id}`,
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
  // React.useEffect(() => {
  //   if (organizationData?.permalink || orgData?.permalink) {
  //     aiDecisionMakerTable();
  //   }
  // }, [organizationData?.permalink, orgData?.permalink, skip]);

  React.useEffect(() => {
    if (organizationData?.permalink) {
      aiDecisionMakerTable();
    }
  }, [organizationData?.permalink, skip]);
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
        {decisionMakerData?.length ? (
          <TableContainer component={Paper} className="All-People-table">
            <Table
              aria-label="collapsible table"
              className="All-people-table-main"
            >
              <TableHead>
                <TableRow className="table-row-ai-leads">
                  <TableCell className="People-Record-emty-row"></TableCell>
                  <TableCell className="People-Name-row" >Name & Title</TableCell>
                  {/* <TableCell>Organization </TableCell> */}
                  {/* <TableCell align="left" className="DecisionstableJOIStrength">
                    <p className="strengthdata">Job Title</p>
                  </TableCell> */}
                  <TableCell align="left" className="People-linkdin-table-cell">
                    <p className="People-Linkedin">Linkedin</p>
                  </TableCell>
                  <TableCell align="left" className="People-linkdin-table-cell">
                    <p className="People-Linkedin">Email</p>
                  </TableCell>
                  <TableCell
                    align="left"
                    className="People-Phone-no-row"
                  >
                    <p className="People-phone-data"> Phone no</p>
                  </TableCell>
                  <TableCell align="left" className="People-linkdin-table-cell">
                    Action
                  </TableCell>
                  {/* <TableCell align="left" className="">
                    Comments
                  </TableCell>
                  <TableCell align="left" className="industry-row-tableStatus">
                    <p className="People-Employees-data">Source Description</p>
                  </TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {decisionMakerData?.map((row, index) => (
                  <React.Fragment key={index}>
                    <Row
                      row={row}
                      organizationData={organizationData}
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