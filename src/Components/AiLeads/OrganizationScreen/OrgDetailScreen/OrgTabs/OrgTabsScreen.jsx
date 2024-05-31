import * as React from 'react';
import "./Style.css"
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PeopleRecords from '../PeopleRecords/PeopleRecords';
import { useLocation, useNavigate } from 'react-router-dom';
import { PEOPLE_RECORDS } from '../../../../../Utils/Constants';
import AddIcon from '@mui/icons-material/Add';
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
export default function OrgTabsScreen({ organizationData }) {
    const navigate = useNavigate();
    const [value, setValue] = React.useState(0);
    const location = useLocation();
    const orgData = organizationData || location?.state || {};
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const addPeople = () => {
        const orgData = organizationData || location?.state || {};
        const updatedOrgData = {
            ...orgData,
            orgDetails: window.location.pathname === '/OrgDetails',
        };

        navigate(PEOPLE_RECORDS, { state: updatedOrgData })
    }
    return (
        <Box className="OrgTabs_main-box" sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="box-add-people-button">

                <Tabs className='Companydata' value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab
                        label="Peoples " {...a11yProps(0)} className='tab-peoples' />
                </Tabs>

                <button className='add-people-button-details-screen' onClick={() => addPeople(orgData)}>
                    Add people
                    <AddIcon className='add-people-icon' />
                </button>



            </Box>
            <CustomTabPanel value={value} index={0}>
                <PeopleRecords organizationData={organizationData} />
            </CustomTabPanel>
        </Box>
    );
}