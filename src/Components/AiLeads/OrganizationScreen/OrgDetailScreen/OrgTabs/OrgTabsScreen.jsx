import * as React from 'react';
import "./Style.css"
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DecisionMaker from '../../../../../Pages/AiDecisionMakers/Index';
import PeopleRecords from '../PeopleRecords/PeopleRecords';
import { useLocation, useNavigate } from 'react-router-dom';
import { PEOPLE_RECORDS } from '../../../../../Utils/Constants';
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
    const navigate = useNavigate();
    const [value, setValue] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const location = useLocation();
    const orgData = location?.state;
    const open = Boolean(anchorEl);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleMenuDownloadExcel = () => {
        setAnchorEl(null);
    }
    const addPeople = (orgData) => {
        navigate(PEOPLE_RECORDS, {state: orgData})
    }
    return (
        <Box className="OrgTabs_main-box" sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="box-add-people-button">

                <Tabs className='Companydata' value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab
                        label="Peoples " {...a11yProps(0)} className='tab-peoples' />
                </Tabs>

                <button className='add-people-button-details-screen' onClick={() => addPeople(orgData)}>
                    add people
                </button>

            </Box>
            <CustomTabPanel value={value} index={0}>
                <PeopleRecords />
            </CustomTabPanel>
        </Box>
    );
}