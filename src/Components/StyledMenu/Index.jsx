import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { AI_LEADS, COMPANY_PROFILE_SCREEN } from "../../Utils/Constants";
export default function StyledMenuInput({ handleMenuSalesforce, anchorEl, open, handleMenuDownloadExcel, handleToPDF }) {
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
  return (
    <>
      <div className="Leades-filter-inner-container">
        {window?.location?.pathname === (AI_LEADS || 'aiLeads') ?
          <StyledMenu
            id="action-menu"
            MenuListProps={{
              "aria-labelledby": "action-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuSalesforce || handleMenuDownloadExcel}
          >
            <MenuItem
              className="AI-Leads-button-drop-down-up"
              onClick={handleMenuSalesforce}
              disableRipple
            >
              <p className="push-to-slaesforce-in-button"> Push to Salesforce </p>
            </MenuItem>
            <MenuItem
              className="AI-Leads-button-drop-down"
              onClick={handleMenuDownloadExcel}
              disableRipple
            >
              <p className="push-to-slaesforce-in-button">Download Excel</p>
            </MenuItem>
          </StyledMenu> :
          window?.location?.pathname === (COMPANY_PROFILE_SCREEN || 'CompanyProfileScreen') ?
            <StyledMenu
              id="action-menu"
              MenuListProps={{
                "aria-labelledby": "action-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuSalesforce || handleMenuDownloadExcel}>
              <MenuItem
                className="AI-Leads-button-drop-down"
                onClick={handleMenuDownloadExcel}
                disableRipple
              >
                <p className="push-to-slaesforce-in-button">Download Excel</p>
              </MenuItem>
              <div className="seprator-line-forcompany"></div>
              <MenuItem
                className="AI-Leads-button-drop-down"
                onClick={handleToPDF}
                disableRipple
              >
                <p className="push-to-slaesforce-in-button" >Download PDF</p>
              </MenuItem>
            </StyledMenu> :

            <StyledMenu
              id="action-menu"
              MenuListProps={{
                "aria-labelledby": "action-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuSalesforce || handleMenuDownloadExcel}>
              <MenuItem
                className="AI-Leads-button-drop-down"
                onClick={handleMenuDownloadExcel}
                disableRipple
              >
                <p className="push-to-slaesforce-in-button">Download Excel</p>
              </MenuItem>

              <MenuItem
                className="AI-Leads-button-drop-down"
                disableRipple
              >
                <p className="push-to-slaesforce-in-button">Add People</p>
              </MenuItem>
            </StyledMenu>
        }
      </div>
    </>
  );
}
