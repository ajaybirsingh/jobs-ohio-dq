import * as React from "react";
import "./Table.css";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../Loader/Loader";
import { toast } from "react-toastify";
import {
  APIUrlFour,
  APIUrlOne,
  APIUrlThree,
  APIUrlTwo,
  GetUserId,
  SetOrganizationCount,
} from "../../../Utils/Utils";
import InfiniteScroll from "react-infinite-scroll-component";
import * as InfiniteScrollMain from "react-infinite-scroller";
import * as XLSX from "xlsx";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ORGANIZATION_RECORDS, ORG_DETAILS } from "../../../Utils/Constants";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Textarea } from "@mui/joy";
function Row({
  key,
  row,
  ExpandHandler,
  expandHandlerAccept,
  selectedRows,
  setSelectedRows,
  pageInner,
  openRowId,
  onLoadApi,
  setHasMoreInner,
  setopenRowId,
}) {
  const [hasMoreInnerTable, setHasMoreInnerTable] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [innerTableData, setInnerTAbleData] = React.useState([]);
  const innerTableJsonData = innerTableData;
  const [open, setOpen] = React.useState(false);
  const [openSidebar, setOpenSidebar] = React.useState(false);
  const [dataShortestPath, setDataShortestPath] = React.useState();
  const [strengthTableData, setStrengthTableData] = React.useState([]);
  const [userDetails, setUserDetails] = useState();
  const [scrollPagination, setScrollPagination] = useState(false);
  const linkedInUrl = row?.linkedin ? row?.linkedin : 'Not Available';
  const websiteUrl = row?.website_url ? row?.website_url : 'Not Available';
  const userId = GetUserId();
  const handleRightsidebar = (event) => {
    const data = {};
    // data.source_uid = Number(loggedInUserId);
    data.target_uid = Number(event?.person_id);
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
          setUserDetails(event);
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  const getColor = (aiScore) => {
    if (aiScore > 80) {
      return "green";
    } else if (aiScore >= 50 && aiScore <= 80) {
      return "yellow";
    } else {
      return "red";
    }
  };
  const color = getColor(row.ai_score);
  const [rowsSelect, setRowsSelect] = useState(false);
  const handleAllSelectCollapsible = () => {
    if (rowsSelect) {
      const newList = innerTableData
        ?.map((info) => ({ ...info, organizationInfo: row }))
        ?.filter((i) => !i?.suspect_status);
      setSelectedRows(newList);
    } else {
      setSelectedRows([]);
    }
  };

  const onExpand = (event) => {
    setLoading(true);
    onLoadApi(event)
      .then((e) => {
        const childData = e;
        getStrength(childData, true);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const ExpandHandlerChild = (event) => {
    setLoading(true);
    ExpandHandler(event)
      .then((e) => {
        const childData = e;
        getStrength(childData);

        setLoading(false);
        if (e?.status === 200) {
          const innerdata = e?.data?.data;
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    if (expandHandlerAccept?.length > 0) {
      setInnerTAbleData([...expandHandlerAccept]);
    }
  }, [expandHandlerAccept]);

  const getStrength = async (childData, isExpand) => {
    if (!childData?.length) {
      setLoading(false);
      return;
    }
    setLoading(true);

    const tuples = childData?.map((item) => ({
      // items: [Number(loggedInUserId), item.person_id],
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

      const updatedData = childData?.map((item, index) => ({
        ...item,
        strengthData: strengthData[index],
      }));

      if (isExpand) {
        setInnerTAbleData([...updatedData]);
      } else {
        setInnerTAbleData([...innerTableData, ...updatedData]);
      }

      if (open) {
      } else {
        setOpen(!open);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setScrollPagination(true);
      }, 0);
      setTimeout(() => {
        setHasMoreInner(true);
      }, 1000);
    }
  };

  const clickHandler = (row) => {
    navigate(ORG_DETAILS, { state: row })
  };

  React.useEffect(() => {
    if (
      innerTableData?.length >= 50 &&
      row.org_id === openRowId &&
      pageInner > 1 &&
      pageInner <= Math.ceil(pages)
    ) {
      setHasMoreInner(false);
      ExpandHandlerChild(openRowId);
    }
  }, [pageInner]);

  const isChecked = (id) => {
    return selectedRows.some((info) => info.person_id === id);
  };

  const pages = row.people_count / 50;
  const closeExpandHandler = () => {
    setInnerTAbleData([]);
    setOpen(false);
    setopenRowId("");
    setScrollPagination(false);
  };

  React.useEffect(() => {
    handleAllSelectCollapsible();
  }, [rowsSelect]);
  const ref = React.useRef(null);
  const isBranchLocationsDisabled = true;
  const EditOrgUser = (row) => {
    navigate(ORGANIZATION_RECORDS, { state: row })
  }
  const [modalTeaxtArea, setModalTeaxtArea] = React.useState("")
  const [deleteData, setDeleteData] = React.useState('');
  const [ModalOpen, setModalOpen] = useState(false)
  const handleClose = (row) => {
    setModalOpen(false);
  };
  const DeletePeople = (row) => {
    setDeleteData(row)
    setModalOpen(true);

  }

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
      // records: [
      //   // {
      //   //   org_id: deleteData.org_id,
      //   //   user_id: null,
      //   //   name: deleteData.name,
      //   //   legal_name: deleteData.legal_name,
      //   //   permalink: deleteData.permalink,
      //   //   revenue_range: deleteData.revenue_range,
      //   //   num_employees: deleteData.num_employees,
      //   //   linkedin: deleteData.linkedin,
      //   //   website_url: deleteData.website_url,
      //   //   description: deleteData.description,
      //   //   categories: deleteData.categories,
      //   //   city: deleteData.city,
      //   //   state: deleteData.state,
      //   //   country: deleteData.country,
      //   //   phone_number: deleteData.phone_number,
      //   //   comments: modalTeaxtArea,
      //   //   source: deleteData.source,
      //   //   source_description: deleteData.source_description,
      //   //   validation_status: deleteData.validation_status,
      //   //   action: "Delete",
      //   //   updated_at: new Date().toISOString().slice(0, 10),
      //   // },
      //   {
      //     record_id: "4",
      //     user_id: 0,
      //   }
      // ],

      records: [
        {
          record_id: deleteData.org_id,
          user_id: userId
        }
      ]


    };
    const option = {
      method: "POST",
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json",
      },
      url: `${APIUrlFour()}/v1/delete_record_org`,
      data: JSON.stringify(data),
    };
    axios(option)
      .then((e) => {
        setLoading(false);
        if (e?.status === 200) {
          toast.success("Record Deleted Seccussfully");
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
    <React.Fragment key={key}>
      {loading ? <Loader /> : null}
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        style={{ cursor: "pointer" }}

      >
        <>

          <TableCell
            component="th"
            scope="row"
            onClick={() => clickHandler(row)}
          >
            <Tooltip title={row.name ? row.name : 'Not Available'}>
              <h3 className="company-name-country-prospect justify-center">
                {row.name ? row.name : "-"}
              </h3>
            </Tooltip>
          </TableCell>
          <TableCell
            align="left"
            className="companylocation"
            onClick={() => clickHandler(row)}
          >
            <Tooltip title={row?.legal_name ? row?.legal_name : 'Not Available'}>
              <h3 className="company-name-country-prospect">
                {row?.legal_name ? row?.legal_name : "-"}
              </h3>
            </Tooltip>
          </TableCell>
          <TableCell align="center" onClick={() => clickHandler(row)}>
            <div className="section-employee-size">
              <Tooltip title={row?.revenue_range ? row?.revenue_range : 'Not Available'}>
                <h3 className="employee-size-table">
                  {row?.revenue_range ? row?.revenue_range : "-"}
                </h3>
              </Tooltip>
            </div>
          </TableCell>
          <TableCell align="left" onClick={() => clickHandler(row)}>
            <Tooltip title={row?.num_employees ? row?.num_employees : 'Not Available'}>
              <h3 className="annual-revenue-table">
                {row?.num_employees ? row?.num_employees : "-"}
              </h3>
            </Tooltip>
          </TableCell>
          {/* <TableCell
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
          </TableCell> */}
          <TableCell align="left" className="table-cell-of-contact-details-dropdown-th-prospect" style={{ cursor: 'pointer' }} onClick={() => clickHandler(row)}>
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
        </>
        <TableCell align="left" onClick={() => clickHandler(row)}>
          <Tooltip title={
            websiteUrl !== 'Not Available' ?
              <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="linkedin-url-tooltip">{websiteUrl}</a>
              : 'Not Available'
          }>
            <h3 className="employee-size-table text-lowercase">
              {row?.website_url ? row?.website_url : "-"}
            </h3>
          </Tooltip>
        </TableCell>

        <TableCell className="table-cellhandleRightsidebar-prospect">
          <div className="table-cellhandleRightsidebar" style={{ display: "flex", justifyContent: "center", gap: "10px" }}>

            <Tooltip title="Edit">
              <EditIcon className="action-icons-people-edit" onClick={() => EditOrgUser(row)} />
            </Tooltip>

            <Tooltip title="Delete">
              <DeleteIcon onClick={() => DeletePeople(row)} className="action-icons-people-delete" />
            </Tooltip>

          </div>
        </TableCell>
        {/* <TableCell className="collapse-expand-main-header">
          <Tooltip title={open ? "Collapse" : "Expand"}>
            {open ? (
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => closeExpandHandler()}
                className="button-collapse-table-main"
              >
                <RemoveRoundedIcon className="icon-collapse-table" />
              </IconButton>
            ) : (
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => {
                  setInnerTAbleData([]);
                  setHasMoreInner(false);
                  setTimeout(() => {
                    if (openRowId !== row?.org_id) {
                      setLoading(true);
                      setPageInner(1);
                      onExpand(row?.org_id);
                    }
                  }, 0);
                }}
                className="button-collapse-table-main"
              >
                <AddIcon className="icon-collapse-table" />
              </IconButton>
            )}
          </Tooltip>
        </TableCell> */}
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
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default function AiLeadsTable({
  tableCommingData,
  istableDataFilter,
  setCurrentLeadsLength,
  setIstableDataFilter,
  setIsDecisionMakerExcel,
  isDecisionMakerExcel,
  isSalesForceTrigger,
  handleApply,
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
  const [loading, setLoading] = React.useState(false);
  const [jsonData, setJsonData] = React.useState([]);
  const [hasMore, setHasMore] = React.useState(false);
  const [hasMoreInner, setHasMoreInner] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [expandHandlerAccept, setExpandHandlerAccept] = useState([]);
  const [pageInner, setPageInner] = React.useState(1);
  const [openRowId, setopenRowId] = useState("");

  React.useEffect(() => {
    if (tableCommingData) {
      setJsonData(tableCommingData);
    }
  }, [tableCommingData]);

  const aiLeadsTable = () => {
    setLoading(true);
    const option = {
      method: "GET",
      headers: {
        "content-type": "plain/text",
      },
      url: `${APIUrlFour()}/v1/org_validation?limit=50&skip=${(page - 1) * 50
        }`,
    };
    axios(option)
      .then((e) => {
        setLoading(false);
        SetOrganizationCount('orgCount',e?.data?.count);
        const comingData = e?.data?.data;
        if (comingData.length === 0 || comingData.length % 50 !== 0) {
          setHasMore(false);
        } else {
          setTimeout(() => {
            setHasMore(true);
          }, 500);
        }

        if (page > 1) {
          setJsonData((prevData) => [...prevData, ...comingData]);
        } else {
          setJsonData(comingData);
        }
        if (comingData.length === 0) {
          setHasMore(false);
        }
        setIstableDataFilter(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const resetDataRetrieve = () => {
    setLoading(true);
    const option = {
      method: "GET",
      headers: {
        "content-type": "plain/text",
      },
      url: `${APIUrlFour()}/v1/org_validation?limit=50&skip=0`,
    };
    axios(option)
      .then((e) => {
        setLoading(false);
        const comingData = e?.data?.data;
        if (comingData.length === 0) {
          setHasMore(false);
        } else {
        }

        if (page > 1) {
          setJsonData((prevData) => [...prevData, ...comingData]);
        } else {
          setJsonData(comingData);
        }
        if (comingData.length === 0) {
          setHasMore(false);
        }
        setIstableDataFilter(false);
        setPage(1);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    if (istableDataFilter) {
      resetDataRetrieve();
    }
    return;
    if (istableDataFilter) {
      setPage(1);
      setJsonData([]);
      setHasMore(true);
      if (tableCommingData?.length) {
        alert("00");
        handleApply();
      }
    }
  }, [istableDataFilter, tableCommingData]);

  React.useEffect(() => {
    setTimeout(() => {
      if (page > 0) {
        if (tableCommingData?.length) {
        } else {
          aiLeadsTable();
        }
      } else {
        setPage(1);
      }
    }, 150);
  }, [page]);

  React.useEffect(() => {
    setCurrentLeadsLength(jsonData?.length);
  }, [jsonData]);

  React.useEffect(() => {
    if (isDecisionMakerExcel) {
      exportToExcel(jsonData, "aileads_exported_data");
    }
  }, [isDecisionMakerExcel]);

  const validateSalesforce = () => {
    if (!selectedRows || selectedRows?.length === 0) {
      toast.error("Please Select Records For Push To Salesforce");
      return false;
    }
    return true;
  };
  const ExpandHandler = (event, page) => {
    setopenRowId(event);

    const option = {
      method: "GET",
      headers: {
        "content-type": "plain/text",
      },
      url: `${APIUrlOne()}/v1/decision_maker?org_id=${event}&limit=50&skip=${(pageInner - 1) * 50
        }`,
    };
    return axios(option).then((e) => {
      if (e?.status === 200) {
        const innerdata = e?.data?.data;
        if (innerdata?.length === 0) {
          setHasMoreInner(false);
        }
        return innerdata;
      }

      return e;
    });
  };

  const onLoadApi = (event) => {
    setopenRowId(event);

    const option = {
      method: "GET",
      headers: {
        "content-type": "plain/text",
      },
      url: `${APIUrlOne()}/v1/decision_maker?org_id=${event}&limit=50&skip=${0}`,
    };
    return axios(option).then((e) => {
      if (e?.status === 200) {
        const innerdata = e?.data?.data;
        if (innerdata?.length === 0) {
          setHasMoreInner(false);
        } else {
        }
        return innerdata;
      }

      return e;
    });
  };
  const pushToSalesForce = () => {
    if (!validateSalesforce()) return;
    setLoading(true);

    const ms = {
      updateData: {
        data: selectedRows?.map((item) => ({
          items: [item?.person_id, "Suspect"],
        })),
      },
    };
    const transformedData = selectedRows
      ?.map((i) => {
        const organizationInfo =
          jsonData.find((org) => org?.org_id === i?.org_id) || {};
        return { ...i, organizationInfo };
      })
      ?.map((item) => ({
        attributes: {
          type: "Lead",
          referenceId: "rec" + item?.person_id,
        },
        LastName: item?.last_name,
        FirstName: item?.first_name,
        Salutation: null,
        Title: item.primary_job_title,
        Company: item.primary_organization,
        City: item?.organizationInfo?.location_identifiers?.split(",")[0],
        State: item?.organizationInfo?.location_identifiers?.split(",")[1],
        Country: item?.organizationInfo?.country,
        LeadSource: "JOI",
        Status: "Suspect",
      }));
    const finalJson = { records: transformedData, ...ms };
    const option = {
      method: "POST",
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json",
      },
      data: finalJson,
      url: `${APIUrlThree()}/v1/add_suspects`,
    };
    axios(option)
      .then(async (response) => {
        setLoading(false);
        if (response?.status === 200) {
          toast.success("Record has been created");
          const promiseRequest = selectedRows?.map((item) => {
            return ExpandHandler(item?.org_id, 1);
          });
          const result = await Promise.all(promiseRequest);
          setExpandHandlerAccept(...result);
          setSelectedRows([]);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.response?.data?.message);
      });
  };

  React.useEffect(() => {
    if (isSalesForceTrigger) {
      pushToSalesForce();
    }
  }, [isSalesForceTrigger]);
  return (
    <React.Fragment>
      {loading ? <Loader /> : null}
      <InfiniteScroll
        dataLength={jsonData.length}
        next={() => {
          if (hasMore) {
            setHasMore(false);
            setPage((prevPage) => prevPage + 1);
          }
        }}
        hasMore={hasMore}
      >
        {jsonData?.length ? (
          <>
            <TableContainer component={Paper} className="ai-leads-table-main">
              <Table aria-label="collapsible table" className="ai-leads-table">
                <TableHead>
                  <TableRow className="table-row-ai-leads">
                    <TableCell className="score-row-table">Name</TableCell>
                    <TableCell align="left" className="company-row-table">
                      Legal Name
                    </TableCell>
                    <TableCell align="left" className="employee-row-table">
                      Revenue Range
                    </TableCell>
                    <TableCell align="left" className="annual-row-table">
                      Num Employees
                    </TableCell>
                    <TableCell align="left" className="industry-row-table">
                      <p className="sector-industry-inner-new">Linkedin</p>
                    </TableCell>
                    <TableCell align="left" className="industry-row-table">
                      <p className="industry-row-Inner">Website Url</p>
                    </TableCell>
                    <TableCell align="left" className="industry-row-tableStatus">
                      <p className="DecisionstableStrength-strength">Action</p>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {jsonData?.map((row, index) => {
                    const isSelected = selectedRows?.find(
                      (item) => item?.person_id === row?.person_id
                    );
                    return (
                      <React.Fragment key={index}>
                        <Row
                          key={row.name}
                          row={row}
                          selected={isSelected}
                          onSelect={(selectedRow) => {
                            const localRows = [...selectedRows];
                            const selectedIndex = localRows.findIndex(
                              (row) => row?.person_id === selectedRow?.person_id
                            );
                            let newSelected = [];
                            if (selectedIndex === -1) {
                              newSelected = [selectedRow];
                            } else if (selectedIndex === 0) {
                              newSelected = newSelected.concat(
                                localRows.slice(1)
                              );
                            } else if (selectedIndex === localRows.length - 1) {
                              newSelected = newSelected.concat(
                                localRows.slice(0, -1)
                              );
                            } else if (selectedIndex > 0) {
                              newSelected = localRows.filter(
                                (child) =>
                                  child.person_id !== selectedRow.person_id
                              );
                            }
                            const updatedOrganizations = newSelected.map(
                              (name) => {
                                const organization = jsonData.find(
                                  (org) => org?.org_id === name?.org_id
                                );
                                return {
                                  ...name,
                                  organizationInfo: organization,
                                };
                              }
                            );
                            setSelectedRows(
                              selectedIndex > -1
                                ? updatedOrganizations
                                : [...selectedRows, ...updatedOrganizations]
                            );
                          }}
                          connectionStrength={row.connectionStrength}
                          ExpandHandler={ExpandHandler}
                          onLoadApi={onLoadApi}
                          expandHandlerAccept={expandHandlerAccept}
                          selectedRows={selectedRows}
                          setSelectedRows={setSelectedRows}
                          setPageInner={setPageInner}
                          pageInner={pageInner}
                          openRowId={openRowId}
                          hasMoreInner={hasMoreInner}
                          setExpandHandlerAccept={setExpandHandlerAccept}
                          setHasMore={setHasMore}
                          setopenRowId={setopenRowId}
                          setHasMoreInner={setHasMoreInner}
                        />
                      </React.Fragment>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </>
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
    </React.Fragment>
  );
}
