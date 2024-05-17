import * as React from "react";
import "./Table.css";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import ContactDetailList from "../ContactDetailList/ContactDetailList";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import RightSidebar from "../../RightSiderbar/RightSiderbar";
import axios from "axios";
import Loader from "../../Loader/Loader";
import { toast } from "react-toastify";
import {
  APIUrlOne,
  APIUrlThree,
  APIUrlTwo,
  GetUserId,
} from "../../../Utils/Utils";
import InfiniteScroll from "react-infinite-scroll-component";
import * as InfiniteScrollMain from "react-infinite-scroller";
import * as XLSX from "xlsx";
import { useState } from "react";
import IndustryDropdown from "../IndustrySectorDropdown/Index";

function Row({
  key,
  row,
  onSelect,
  ExpandHandler,
  expandHandlerAccept,
  selectedRows,
  setSelectedRows,
  setPageInner,
  pageInner,
  openRowId,
  hasMoreInner,
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

  const loggedInUserId = GetUserId();
  const handleRightsidebar = (event) => {
    const data = {};
    data.source_uid = Number(loggedInUserId);
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
      items: [Number(loggedInUserId), item.person_id],
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

  const clickHandler = (event) => {
    navigate("/companyprofilescreen", { state: { data: event } });
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
            <div className="kjhgf">
              <div
                className="ai-score-background"
                style={{
                  background:
                    color === "red"
                      ? "#DA291C"
                      : color === "yellow"
                        ? "#EAB121"
                        : color === "green"
                          ? "#0EB93E"
                          : null,
                }}
              >
                {/* {row.ai_score ? row.ai_score : "-"} */}
                {row?.ai_score !== null && row?.ai_score !== undefined
                    ? row?.ai_score
                    : "NA"}
              </div>
            </div>
          </TableCell>
          <TableCell
            align="left"
            className="companylocation"
            onClick={() => clickHandler(row)}
          >
            <h3 className="company-name-country-prospect">
              {row.name ? row.name : "-"}
            </h3>
            <p className="after-company-name-country-prospect">
              {row.location_identifiers ? row.location_identifiers : "-"}
            </p>
          </TableCell>
          <TableCell align="center" onClick={() => clickHandler(row)}>
            <div className="section-employee-size">
              <h3 className="employee-size-table">
                {row.num_employees ? row.num_employees : "-"}
              </h3>
            </div>
          </TableCell>
          <TableCell align="left" onClick={() => clickHandler(row)}>
            <h3 className="annual-revenue-table">
              {row?.revenue_range ? row?.revenue_range : "-"}
            </h3>
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
        </>
        <TableCell align="left" onClick={() => clickHandler(row)}>
          <h3 className="employee-size-table">
            {row.people_count ? row.people_count : "-"}
          </h3>
        </TableCell>
        <TableCell className="collapse-expand-main-header">
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
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{ margin: 1 }}
              id="scrollableDiv"
              className="ai-leads-table-inner"
              ref={ref}
            >
              <TableContainer component={Paper}>
                <InfiniteScrollMain
                  pageStart={0}
                  loadMore={(e) => {
                    setTimeout(() => {
                      if (pageInner <= Math.ceil(pages) && hasMoreInner) {
                        setHasMoreInner(false);
                        setPageInner(Number(pageInner) + 1);
                      } else {
                        setHasMoreInnerTable(false);
                        setHasMoreInner(false);
                      }
                    }, 10);
                  }}
                  hasMore={hasMoreInner}
                  loader={
                    <div className="loader" key={0}>
                      Loading ...
                    </div>
                  }
                  useWindow={false}
                  getScrollParent={() => ref?.current}
                >
                  <Table
                    aria-label="collapsible table"
                    className="ai-leads-table"
                  >
                    <TableHead>
                      <TableRow className="row-head">
                        <TableCell className="checkbox-row-table-inner checkbox-row-table">
                          <input
                            type="checkbox"
                            onChange={(e) => setRowsSelect(e?.target?.checked)}
                            checked={rowsSelect}
                          />
                        </TableCell>
                        <TableCell className="empty-name-and-title">
                        </TableCell>

                        <TableCell className="company-row-table-inner-name-and-other">
                          <p className="title-name-inner-lead-table">Name & Title</p>
                        </TableCell>
                        <TableCell
                          align="left"
                          className="score-row-table-New-Data"
                        >
                          JOI Strength
                        </TableCell>
                        <TableCell
                          align="left"
                          className="employee-row-table-innerIndustryAndSector"
                        >
                         <p className="sector-industry"> Industry/ Sector</p>
                        </TableCell>
                        <TableCell
                          align="left"
                          className="annual-row-table-NewJOSFStatus"
                        >
                          JOSF Status
                        </TableCell>
                        <TableCell align="left" className="industry-row-table-inner-table">
                          Contact details
                        </TableCell>
                        <TableCell
                          align="left"
                          className="industry-row-table-inner-table-last"
                        ></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {innerTableData?.map((item, index) => {
                        const firstName = item?.first_name;
                        const lastName = item?.last_name;
                        const decision_maker = item.decision_maker === true;
                        const concatedName = `${firstName
                            ? firstName
                              ?.split(" ")
                              ?.find((item) => !item.includes("("))
                              ?.charAt(0)
                            : ""
                          }${lastName
                            ? lastName
                              ?.split(" ")
                              ?.find((item) => !item.includes("("))
                              ?.charAt(0)
                            : ""
                          }`;

                        const isSelected = isChecked(item.person_id);
                        return (
                          <React.Fragment key={index}>
                            <TableRow
                              key={index}
                              sx={{ "& > *": { borderBottom: "unset" } }}
                            >
                              <TableCell className="checkbox-row-table">
                                {item?.suspect_status ? null : (
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => onSelect(item)}
                                  />
                                )}
                              </TableCell>
                              <TableCell align="left" className="empty-name-and-title">
                                <div className="name-title-inner-table-ofAi-leads">
                                  <div className="relation-section-inner">
                                    <div
                                      className={
                                        decision_maker
                                          ? "decision-maker-class"
                                          : "create-name-img"
                                      }
                                    >
                                      <p className="name-heading">
                                        {concatedName}
                                      </p>
                                      <img
                                        className={
                                          item.suspect_status === null
                                            ? "hide-image"
                                            : "../images/salesforce-logo.svg"
                                        }
                                        src="../images/salesforce-logo.svg"
                                        alt=""
                                      />
                                    </div>



                                  </div>
                                </div>
                              </TableCell>

                              <TableCell align="left" className="company-row-table-inner-name-and-other">
                                <div className="name-title-inner-table-ofAi-leads">
                                  <div className="relation-section-inner">
                                    <div className="name-and-designation">
                                      <p className="name-in-acordian">{`${item?.first_name
                                          ? item?.first_name
                                          : "-"
                                        } ${item?.last_name ? item?.last_name : "-"
                                        }`}</p>
                                      <p className="designation-in-acordian">
                                        {item?.primary_job_title?.length
                                          ? item?.primary_job_title?.length > 20
                                            ? item?.primary_job_title.substr(
                                              0,
                                              30
                                            ) + "..."
                                            : item?.primary_job_title
                                          : "-"}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell component="th" scope="row">
                                <p className="j-strength-cell">
                                  {item?.strengthData?.strength
                                    ? item?.strengthData?.strength
                                    : "-"}
                                </p>
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
                                <div className="suspect-and-arrow-in-accordian">
                                  <p>
                                    {item?.suspect_status
                                      ? item?.suspect_status
                                      : "-"}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell
                                align="left"
                                className="table-cell-of-contact-details-dropdown-th"
                              >
                                <div
                                  className="Set-dropdown-ofContactDetailList"
                                  style={{ position: "relative" }}
                                >
                                  <div className="email-and-other-infodc">
                                    <div className="maked-component-of-dropdown">
                                      <ContactDetailList item={item} />
                                    </div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="left-arrow-main-cell-container">
                                <IconButton
                                  className="egberh"
                                  aria-label="expand row"
                                  size="small"
                                >
                                  <RightSidebar
                                    handleRightsidebar={handleRightsidebar}
                                    rowid={item}
                                    dataShortestPath={dataShortestPath}
                                    openSidebar={openSidebar}
                                    userDetails={userDetails}
                                  />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          </React.Fragment>
                        );
                      })}
                    </TableBody>
                  </Table>
                </InfiniteScrollMain>
              </TableContainer>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
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
      url: `${APIUrlOne()}/v1/leads?userid=default&limit=50&skip=${(page - 1) * 50
        }`,
    };
    axios(option)
      .then((e) => {
        setLoading(false);
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
      url: `${APIUrlOne()}/v1/leads?userid=default&limit=50&skip=0`,
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
                    <TableCell className="score-row-table">JOI Score</TableCell>
                    <TableCell align="left" className="company-row-table">
                      Company & location
                    </TableCell>
                    <TableCell align="left" className="employee-row-table">
                      Employee size
                    </TableCell>
                    <TableCell align="left" className="annual-row-table">
                      Annual revenue
                    </TableCell>
                    <TableCell align="left" className="industry-row-table">
                    <p className="sector-industry-inner-new">  Industry/ Sector </p>
                    </TableCell>
                    <TableCell align="left" className="industry-row-table">
                      <p className="industry-row-Inner">Employees</p>
                    </TableCell>
                    <TableCell align="left" className=""></TableCell>
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
