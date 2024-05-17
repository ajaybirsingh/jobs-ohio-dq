import * as React from "react";
import "./AiLeadsAction.css";
import Button from "@mui/material/Button";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import AddIcon from '@mui/icons-material/Add';
import StyledMenuInput from "../../StyledMenu/Index";
import { GetLeadsFilterStatsData, GetStatsData } from "../../../Utils/Utils";
import { useNavigate } from "react-router-dom";
import { PEOPLE_RECORDS } from "../../../Utils/Constants";
export default function AiLeadsAction({ currentLeadsLength, setIsSalesForceTrigger, isSalesForceTrigger, setIsDecisionMakerExcel, statsCount, statsCountDecisionMaker }) {
  const navigate = useNavigate();
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
  const handleMenuSalesforce = () => {
    setIsSalesForceTrigger(true);
    setAnchorEl(null);
  };
  const handleMenuDownloadExcel = () => {
    setIsDecisionMakerExcel(true);
    setAnchorEl(null);
  }
  React.useEffect(() => {
    if (isSalesForceTrigger) {
      setIsSalesForceTrigger(false)
    }
  }, [isSalesForceTrigger])
  const location = window?.location?.pathname;
  const statsData = GetStatsData();
  const filterStatsData = GetLeadsFilterStatsData();
  return (
    <>
      <section className=
        "Leades-filter-drop-down-button-main-container"
      >
        <div className="showing-leads-head">
          {
            currentLeadsLength && !statsCount && location === "/organization" ?
              <>
                <h3>Showing {currentLeadsLength} {location === "/people" ? 'People ' : 'leads'}</h3>
                <p>Out of {location === "/organization" || "/organization" ? statsData?.generated_leads.toLocaleString() || '-' : null}</p>
              </> : null
          }
          {
            statsCount ?
              <>
                <h3>Showing {currentLeadsLength} {location === "/people" ? 'People ' : 'leads'}</h3>
                <p>Out of {location === "/organization" || "/organization" ? statsCount : null}</p>
              </> : null
          }
          {
            currentLeadsLength && !statsCount && location === "/people" && !statsCountDecisionMaker ?
              <>
                <h3>Showing {currentLeadsLength} {location === "/people" ? 'People ' : 'leads'}</h3>
                <p>Out of {location === "/people" ? statsData?.decisionmaker_count.toLocaleString() || '-' : null}</p>
              </> : null
          }
          {
            statsCountDecisionMaker ?
              <>
                <h3>Showing {currentLeadsLength} {location === "/people" ? 'People ' : 'leads'}</h3>
                <p>Out of {location === "/people" ? statsCountDecisionMaker || '-' : null}</p>
              </> : null
          }
        </div>
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
          
          {/* <StyledMenuInput
            anchorEl={anchorEl}
            open={open}
            handleMenuSalesforce={handleMenuSalesforce}
            handleMenuDownloadExcel={handleMenuDownloadExcel} /> */}

        </div>
      </section>
    </>
  );
}