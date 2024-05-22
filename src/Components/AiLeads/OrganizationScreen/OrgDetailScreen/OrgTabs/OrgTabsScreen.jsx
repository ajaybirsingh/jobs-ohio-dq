import * as React from 'react';
import "./Style.css"
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DecisionMaker from '../../../../../Pages/AiDecisionMakers/Index';
import PeopleRecords from '../PeopleRecords/PeopleRecords';
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
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
export default function OrgTabsScreen() {
    const [value, setValue] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleMenuDownloadExcel = () => {
        setAnchorEl(null);
    }
    return (
        <Box className="OrgTabs_main-box" sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs className='Companydata' value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab
                        label="Peoples " {...a11yProps(0)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                    <PeopleRecords/>
            </CustomTabPanel>
        </Box>
    );
}