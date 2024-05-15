import * as React from "react";
import "./PDFTabs.css";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PDFtable from "./PDFtable";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function PDFTabs({
  dataForInformation,
  rowData,
}) {
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isSalesForceTrigger, setIsSalesForceTrigger] = React.useState(false);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuSalesforce = () => {
    setIsSalesForceTrigger(true);
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  React.useEffect(() => {
    if (isSalesForceTrigger) {
      setIsSalesForceTrigger(false);
    }
  }, [isSalesForceTrigger]);
  const isBranchLocationsDisabled = true;
  return (
    <Box className="company-profile-main-tabs-data" sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          className="Companydata"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Employees " {...a11yProps(0)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <PDFtable
          dataForInformation={dataForInformation}
          rowData={rowData}
        />
      </CustomTabPanel>
      <CustomTabPanel
        value={value}
        index={1}
        disabled={isBranchLocationsDisabled}
      >
      </CustomTabPanel>
      <CustomTabPanel
        value={value}
        index={2}
        disabled={isBranchLocationsDisabled}
      >
      </CustomTabPanel>
      <CustomTabPanel
        value={value}
        index={3}
        disabled={isBranchLocationsDisabled}
      >
      </CustomTabPanel>
    </Box>
  );
}