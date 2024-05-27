import * as React from "react";
import PropTypes from "prop-types";
import "../DecisionMaker/DecisionMakerTable.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import decisionMakerImage from "../../Assets/Cloudfigma.svg";
import axios from "axios";
import Loader from "../Loader/Loader";
import { APIUrlFour, APIUrlTwo, GetUserId } from "../../Utils/Utils";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";
import * as XLSX from 'xlsx';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PEOPLE_RECORDS } from "../../Utils/Constants";
import Textarea from '@mui/joy/Textarea';
function Row({ row }) {
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [modalTeaxtArea, setModalTeaxtArea] = React.useState("")
  const linkedInUrl = row?.linkedin ? row?.linkedin : 'Not Available';
  const navigate = useNavigate();
  const EditPeople = (row) => {
    navigate(PEOPLE_RECORDS, { state: row })
  }
  const userId = GetUserId();
  const [deleteData, setDeleteData] = React.useState('');
  const DeletePeople = (row) => {
    setDeleteData(row)
    setOpen(true);
  };
  const handleClose = (row) => {
    setOpen(false);
  };
  const validateFields = () => {
    if (modalTeaxtArea === "") {
      toast.error("Please Enter Reason")
      return false
    }
    return true
  }
  
  const handleDeleteCase = () => {
    if (!validateFields()) return

    setLoading(true);
    const data = {
      // {
      records: [
        {
          record_id: "0",
          user_id: userId
        }
      ]
      // }
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
        setLoading(false);
        if (e?.status === 200) {
          toast.success("Record Deleted Successfully");
          setModalTeaxtArea('');
          handleClose();
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.response?.data?.message);
      });
  }
  return (

    <React.Fragment>
      {
        loading ? <Loader /> : null
      }
      <TableRow className="juyds" sx={{ "& > *": { borderBottom: "unset" } }}>
        <>
          <TableCell className="Decisions-row-tableName-prospect" align="left">

            <div
              className={
                row?.decision_maker === true
                  ? "Decision-maker-user-name"
                  : "Decision-maker-user-noborder create-name-img"
              }
            >
              <img
                className={
                  row?.suspect_status === null ? "hide-image" : "decisionMakerImageAi-Decisionmaker"
                }
                src={decisionMakerImage}
                alt=""
              />
              <p className="letter-heading">{row?.first_name ? row?.first_name?.split(" ")?.find(item => !item.includes('('))?.charAt(0) : ""}{row?.last_name ? row?.last_name?.split(" ")?.find(item => !item.includes('('))?.charAt(0) : ""}</p>
            </div>
          </TableCell>
          <TableCell className="Decision-maker-userTeblesell" align="left">
            <div className="Decision-maker-user-name-main-container">

              <div className="name-and-title-text">
                <div className="fullnameofuser">
                  <h3 className="company-name-country">{row?.first_name ? row?.first_name : "-"} {row?.last_name ? row?.last_name : "-"}</h3>
                </div>
                <p className="after-company-name-country-fordecisionmaker">
                  {row?.primary_job_title?.substring(0, 22) +
                    (row?.primary_job_title?.length > 25 ? "...." : "")}
                </p>
              </div>

            </div>
          </TableCell>
          <TableCell align="left">
            <h3 className="annual-revenue-table">{row.primary_organization ? row.primary_organization : "-"}</h3>
          </TableCell>
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

          {/* email */}
          <TableCell align="left">
            <Tooltip title={row?.email ? row?.email : 'Not Available'}>
              <div className="Suspect-table-data">
                <h3 className="industry-sector-table">
                  {row?.email
                    ? row?.email.length > 26
                      ? row?.email.substr(0, 26) + "..."
                      : row?.email
                    : "Not Available"}
                </h3>
              </div>
            </Tooltip>
          </TableCell>

          {/* phone no. */}
          <TableCell align="left">
            <Tooltip title={row?.phone_no ? row?.phone_no : 'Not Available'}>
              <div className="Suspect-table-data">
                {row?.phone_no
                  ? row?.phone_no.length > 14
                    ? row?.phone_no.substr(0, 14) + "..."
                    : row?.phone_no
                  : "Not Available"}
              </div>
            </Tooltip>
          </TableCell>
        </>
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
      </TableRow>
      <Dialog className="Delete-Confirmation"
        open={open}
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
          <Button className="CancelDelete-Confirmation" onClick={handleDeleteCase}  >Delete</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
Row.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  connectionStrength: PropTypes.string.isRequired,
};
export default function DecisionMakerTable({
  tableCommingData,
  setTableCommingData,
  istableDataFilter,
  setCurrentLeadsLength,
  isDecisionMakerExcel,
  setIsDecisionMakerExcel,
  setIstableDataFilter,
  handlePassSubmit,
  firstFilterData,
  setSkip,
  skip,
  setIsApplyFilter,
  applyFilter }) {
  const exportToExcel = (data, filename) => {
    const filteredData = data.map(({ person_id, org_id, strengthData, ...rest }) => rest);
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${filename}.xlsx`);
    setIsDecisionMakerExcel(false);
  };
  const [loading, setLoading] = React.useState(false);
  const [decisionMakerData, setDecisionMakerData] = React.useState([]);
  const [checkDecisionMakerData, setcheckDecisionMakerData] = React.useState([]);
  const loggedInUserId = GetUserId();
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [hasMore, setHasMore] = React.useState(false);
  const [isfetchData, setIsfetchData] = React.useState(false);
  React.useEffect(() => {
    if (tableCommingData) {
      setDecisionMakerData(tableCommingData);
    }
  }, [tableCommingData])
  const fetchMoreData = () => {
    setTimeout(() => {
      if (!loading) {
        setIsApplyFilter(false);
        const newSkip = skip + 50;
        setSkip(newSkip);
      }
    }, 100)
  };
  const fetchData = () => {
    if (tableCommingData.length !== skip) return;
    setLoading(true);
    const option = {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      url: `${APIUrlFour()}/v1/people_validation?limit=50&skip=${skip ? skip : 0}`,
    };
    axios(option)
      .then((response) => {
        setLoading(false);
        const comingData = response?.data?.data;
        if (comingData.length === 0 || comingData.length % 50 !== 0) {
          setHasMore(false);
        } else {
          setTimeout(() => {
            setHasMore(true);
          }, 1000);
          setDecisionMakerData([...decisionMakerData, ...comingData]);
          setTableCommingData([...decisionMakerData, ...comingData]);
          setcheckDecisionMakerData(comingData);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const fetchDataReturnFilter = () => {
    setLoading(true);
    const option = {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      url: `${APIUrlFour()}/v1/people_validation?limit=50&skip=${skip ? skip : 0}`,
    };
    axios(option)
      .then((response) => {
        setLoading(false);
        const comingData = response?.data?.data;
        if (comingData.length === 0) {
          setHasMore(false);
        } else {
          setDecisionMakerData(comingData);
          setTableCommingData(comingData);
          setIstableDataFilter(false);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const getStrength = async () => {
    if (!tableCommingData?.length) return;
    setLoading(true);
    const tuples = tableCommingData.map(item => ({
      items: [Number(loggedInUserId), item.person_id]
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
      const strengthData = response?.data
      const updatedData = tableCommingData?.map((item, index) => ({
        ...item,
        strengthData: strengthData[index]
      }));
      setDecisionMakerData(updatedData);
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }
  // React.useEffect(() => {
  //   if (checkDecisionMakerData || tableCommingData) {
  //     getStrength();
  //   }
  // }, [checkDecisionMakerData, tableCommingData]);
  React.useEffect(() => {
    if (firstFilterData?.length && skip > 0) {
      handlePassSubmit();
    }
    else if (firstFilterData?.length === 0 && !applyFilter) {
      if (isfetchData) {
        fetchData();
      } else {
        setIsfetchData(true);
      }
    }
  }, [skip, firstFilterData, applyFilter, isfetchData]);
  React.useEffect(() => {
    if (istableDataFilter) {
      fetchDataReturnFilter();
    }
  }, [istableDataFilter]);
  React.useEffect(() => {
    if (decisionMakerData) {
      setCurrentLeadsLength(decisionMakerData?.length);
    }
  }, [decisionMakerData])
  React.useEffect(() => {
    if (isDecisionMakerExcel) {
      exportToExcel(decisionMakerData, 'decisionmaker_exported_data');
    }
  }, [isDecisionMakerExcel])
  return (
    <>
      {loading ? <Loader /> : null}
      <InfiniteScroll
        dataLength={tableCommingData.length}
        next={fetchMoreData}
        hasMore={hasMore}
        scrollableTarget="DecisionMaker-table-main"
      >
        <TableContainer component={Paper} className="DecisionMaker-table-main">
          <Table aria-label="collapsible table" className="DecisionMaker-table">
            <TableHead>
              <TableRow className="table-row-ai-leads">
                <TableCell className="Decisions-row-tableName-prospect">
                </TableCell>
                <TableCell className="Decisions-row-tableName">
                  <p className="prospect-Name-and-Title-propect">Name & Title</p>
                </TableCell>
                <TableCell align="left" className="employee-row-tableCompany">
                  <p className="DecisionstableStrength-companynew">Organization</p>
                </TableCell>
                <TableCell
                  align="left"
                  className="prospects-row-tableDetails-cd">
                  <p className="Com-details-prospect">Linkedin</p>
                </TableCell>

                {/* email */}
                <TableCell align="left" className="industry-row-tableStatus">
                  <p className="DecisionstableStrength-strength">Email</p>
                </TableCell>

                {/* phone no. */}
                <TableCell align="left" className="industry-row-tableStatus">
                  <p className="DecisionstableStrength-strength">Phone no.</p>
                </TableCell>

                <TableCell align="left" className="industry-row-tableStatus">
                  <p className="DecisionstableStrength-strength">Action</p>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {decisionMakerData?.map((row, index) => (
                <React.Fragment key={index}>
                  <Row
                    row={row}
                    selected={selectedRows.includes(row)}
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
                    connectionStrength={row.connectionStrength}
                  />
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </InfiniteScroll>
    </>
  );
}
DecisionMakerTable.propTypes = {
};
Row.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  connectionStrength: PropTypes.string.isRequired,
};