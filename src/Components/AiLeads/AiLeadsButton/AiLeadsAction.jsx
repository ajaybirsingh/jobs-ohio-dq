import * as React from "react";
import "./AiLeadsAction.css";
import Button from "@mui/material/Button";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import AddIcon from '@mui/icons-material/Add';
import { APIUrlOne, GetOrganizationCount, GetPeopleCount, GetStatsData } from "../../../Utils/Utils";
import { useNavigate } from "react-router-dom";
import { AI_DECISION_MAKER, ORGANIZATION_RECORDS, PEOPLE_RECORDS } from "../../../Utils/Constants";
import { InputBase, Paper } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from "react-toastify";
import axios from "axios";

export default function AiLeadsAction({ currentLeadsLength, setIsSalesForceTrigger, isSalesForceTrigger, setIsDecisionMakerExcel, statsCount, statsCountDecisionMaker,
  setFilterData, FilterData, PeopleData, setPeopleData, showSearchdata, setshowSearchdata, setLoading
}) {
  const navigate = useNavigate();
  const orgCount = GetOrganizationCount();
  const peopleCount = GetPeopleCount();
  const formattedOrgCount = new Intl.NumberFormat().format(orgCount);
  const formattedPeopleCount = new Intl.NumberFormat().format(peopleCount);
  const [searchData, setSearchData] = React.useState('');

  const crossPeopleSearch = () => {
    setSearchData('');
    window?.location?.reload();
    setFilterData([])
  }
  const handelselectdata = (item) => {
    const people_name = [
      item?.first_name ? item?.first_name : "",
      item?.primary_job_title ? item?.primary_job_title : "",
      item?.primary_organization ? item?.primary_organization : "",
      item?.linkedin ? item?.linkedin : ""
    ].filter(Boolean).join(", ");
    setFilterData(item)
    setSearchData(people_name);
    setshowSearchdata(false);
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };
  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === "light"
          ? "rgb(55, 65, 81)"
          : theme.palette.grey[300],
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": {
        padding: "4px 0",
      },
      "& .MuiMenuItem-root": {
        "& .MuiSvgIcon-root": {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        "&:active": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  }));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    navigate(PEOPLE_RECORDS)
  };
  const handleOrganization = (event) => {
    setAnchorEl(event.currentTarget);
    navigate(ORGANIZATION_RECORDS)
  }
  React.useEffect(() => {
    if (isSalesForceTrigger) {
      setIsSalesForceTrigger(false)
    }
  }, [isSalesForceTrigger])

  const location = window?.location?.pathname;
  const SearchPeople = () => {
    setLoading(true);
    const data = {
      people_name: searchData,
    };
    axios
      .post(`${APIUrlOne()}/v1/people_search?limit=50&skip=0`, data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setshowSearchdata(true)
        if (response.status === 200) {
          setLoading(false);
          setPeopleData(response?.data?.data)
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.message);
      });
  };

  React.useEffect(() => {
    let timer;
    if (searchData?.length > 2 && PeopleData.length === 0) {
      timer = setTimeout(() => {
        SearchPeople();
      }, 1000);
    }
    if (window.location.pathname === "/aidecisionmakers") {
      if (searchData?.length === 0) {
        setPeopleData([]);
      }
    }
    return () => clearTimeout(timer);
  }, [searchData]);
  return (
    <>
      <section className=
        "Leades-filter-drop-down-button-main-container"
      >        <div className="setProspects-Search-filter">

          <div className="showing-leads-head">
            {
              currentLeadsLength && !statsCount && location === "/organization" ?
                <>
                  <h3>Showing {currentLeadsLength} {location === "/people" ? 'People ' : 'Organization'}</h3>
                  <p>Out of {location === "/organization" || "/organization" ? formattedOrgCount?.toLocaleString() || '-' : null}</p>
                </> : null
            }
            {
              statsCount ?
                <>
                  <h3>Showing {currentLeadsLength} {location === "/people" ? 'People ' : 'Organization'}</h3>
                  <p>Out of {location === "/organization" || "/organization" ? statsCount?.toLocaleString() : null}</p>
                </> : null
            }
            {
              currentLeadsLength && !statsCount && location === "/people" && !statsCountDecisionMaker ?
                <>
                  <h3>Showing {currentLeadsLength} {location === "/people" ? 'People ' : 'Organization'}</h3>
                  <p>Out of {location === "/people" ? formattedPeopleCount?.toLocaleString() || '-' : null}</p>
                </> : null
            }
            {
              statsCountDecisionMaker ?
                <>
                  <h3>Showing {currentLeadsLength} {location === "/people" ? 'People ' : 'Organization'}</h3>
                  <p>Out of {location === "/people" ? statsCountDecisionMaker?.toLocaleString() || '-' : null}</p>
                </> : null
            }

          </div>
          {location === AI_DECISION_MAKER && (

            <Paper className='Ai-Prospect-Serach-data'
              component="form"
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            >
              <SearchIcon className='searchicon-in-header' />
              <InputBase
                value={searchData}
                onChange={(e) => {
                  setSearchData(e?.target?.value);
                }}
                className='search-inner-text'
                sx={{ ml: 1, flex: 1 }}
                placeholder="by people name"
                inputProps={{ 'aria-label': 'Search google maps' }}
                autoComplete="off"
                onKeyDownCapture={handleKeyPress}
              />
              {/* <CloseIcon className="cross-icon-people-search" onClick={() => crossPeopleSearch()} /> */}
              {searchData && (
                <CloseIcon
                  className="cross-icon-people-search"
                  onClick={() => {
                    crossPeopleSearch();
                  }}
                />
              )}
              {showSearchdata && (
                <div className={!PeopleData.length ? "noodata" : "Autocompletedropdown-for-prospect"}>
                  {PeopleData?.length > 0 ? (
                    PeopleData?.map((item) => {
                      return (
                        <div key={item.id}>
                          <div onClick={() => handelselectdata(item)} className='Ai-prospect-filterlist-data'>
                            {item?.first_name ? `${item.first_name}` : ""}  {item?.last_name ? `${item.last_name}` : ""}
                            {item.primary_organization ? `, ${item.primary_organization}` : ""}
                            {item.primary_job_title ? `, ${item.primary_job_title}` : ""}   {item?.linkedin
                              ? item?.linkedin.length > 28
                                ? item?.linkedin.substr(28, 28) ||
                                item?.linkedin.length > 20 + "..."
                                : item?.linkedin
                              : ""}
                          </div>
                          <div className='separatorline'></div>
                        </div>
                      )
                    })
                  ) : (
                    searchData.length > 0 ? (
                      <div className='useralldata-forai-propect'>{FilterData ? " Not Available" : null} </div>
                    ) : null
                  )}
                </div>
              )}
            </Paper>

          )}
        </div>
        {
          window?.location?.pathname === '/people' ?

            <div className="Leades-filter-inner-container">
              <Button
                style={{ textTransform: "none" }}
                id="action-button"
                aria-controls={open ? "action-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                variant="contained"
                disableElevation
                onClick={handleMenuClick}
                endIcon={<AddIcon />}
              >
                Add People
              </Button>
            </div> :
            <div className="Leades-filter-inner-container add-organization-button">
              <Button
                style={{ textTransform: "none" }}
                id="action-button"
                aria-controls={open ? "action-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                variant="contained"
                disableElevation
                onClick={handleOrganization}
                endIcon={<AddIcon />}
              >
                Add Organization
              </Button>
            </div>
        }

      </section>
    </>
  );
}