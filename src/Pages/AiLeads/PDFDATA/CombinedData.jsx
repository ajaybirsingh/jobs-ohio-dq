import React, { useRef } from 'react';
import { saveAs } from 'file-saver';
import IndustryImage from '../../../Assets/office-building.png';
import GlobalImg from '../../../Assets/Globe.svg';
import LoctionImg from '../../../Assets/loction.svg';
import userprofile from "../../../Assets/user.svg"
import GrowIcons from "../../../Assets/grow.svg"
import Companyimg from "../../../Assets/company.svg"
import callImg from '../../../Assets/call.svg';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import EmployeesTable from '../../../Pages/AiLeads/CompanyProfileScreen/EmployeesTable/Index';
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from '@mui/material/Typography';
import { APIUrlOne, APIUrlTwo, GetUserId } from '../../../Utils/Utils';
import axios from 'axios';
import { toast } from 'react-toastify';
import { TableContainer } from '@mui/material';
import * as XLSX from 'xlsx';
import { Link, useLocation } from "react-router-dom";
import decisionMakerImage from "../../../Assets/Cloudfigma.svg";

function Row({ row }) {
    return (
        <TableRow style={{ borderBottom: "0.6px solid #dedfe5" , pageBreakInside: "avoid"}} sx={{ "& > *": { borderBottom: "unset" } }}>
            <>
                <TableCell style={{ padding: "0px 0px 0px 15px", position: "relative"  }} align="left">
                    <img

                        style={{
                            ...(row?.suspect_status === null ?
                                { display: "none" } : {
                                    width: "22px",
                                    height: "22px",
                                    borderRadius: "50%",
                                    position: "absolute",
                                    top: "8px",
                                    left: "44px"
                                }),
                        }}

                        src={decisionMakerImage}
                        alt=""
                    />
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div

                            style={{
                                ...(row?.decision_maker === true ? {
                                    border: "2px solid #DA291C",
                                    color: "#003057",
                                    width: "46px",
                                    height: "46px",
                                    backgroundColor: "#F5F6FA",
                                    borderRadius: "50%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontWeight: 500,
                                    fontSize: "16px"
                                } : {
                                    color: "#003057",
                                    width: "46px",
                                    height: "46px",
                                    backgroundColor: "#F5F6FA",
                                    borderRadius: "120px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontWeight: 500,
                                    fontSize: "16px"
                                }),
                            }}
                        >
                            <p style={{ textTransform: "uppercase" }}>
                                {row?.first_name ? row?.first_name?.substring(0, 1) : "-"}
                                {row?.last_name ? row?.last_name?.substring(0, 1) : "-"}
                            </p>
                        </div>
                    </div>
                </TableCell>
                <TableCell >
                    <div style={{ width: "100%" }}>
                        <h3 style={{
                            textAlign: "left",
                            display: "flex",
                            justifyContent: "left",
                            textTransform: "capitalize",
                            fontSize: "13px",
                            fontWeight: "500",
                            color: "#202224"
                            , lineHeight: "24px"
                        }}>
                            {`${row?.first_name ? row?.first_name : "-"}
                             ${row?.last_name ? row?.last_name : "-"}
                             `}
                        </h3>

                        <p style={{ textAlign: "left", fontSize: "13px", display: "flex" }}>
                            {row?.primary_job_title ? (row?.primary_job_title.length > 15 ? row?.primary_job_title.slice(0, 15) + '...' : row?.primary_job_title) : "-"}
                        </p>
                      
                    </div>
                </TableCell>
                <TableCell>
                    <p style={{ textAlign: "center", fontSize: "13px" }}>{row?.strengthData?.strength}</p>
                </TableCell>
                <TableCell>
                    <h3 style={{ fontSize: "13px", textAlign: "center", textTransform: "capitalize", fontWeight: "400", lineHeight: "16.94px", color: "#202224" }}>
                        {row?.suspect_status ? row.suspect_status : "-"}
                    </h3>
                </TableCell>
                <TableCell>
                    <p style={{ textAlign: "center", fontSize: "13px" }}>
                        <a href={row?.linkedin ? row?.linkedin : "#"} onClick={() => row?.linkedin && window.open(row?.linkedin)}>
                            {row?.linkedin ? row?.linkedin.substring(28 , 40) : "-"}
                        </a>
                    </p>
                </TableCell>
                <TableCell>
                    <p style={{ textAlign: "center", fontSize: "13px" }}>
                        {row?.email ? row?.email : "-"}   </p>
                </TableCell>
                <TableCell>
                    <p style={{ textAlign: "center", fontSize: "13px" }}>
                        {row?.phone_no ? row?.phone_no : "-"} </p>
                </TableCell>
            </>
        </TableRow>
    );
}

Row.propTypes = {
    row: PropTypes.object.isRequired,
    selected: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default function CombinedPDFComponent({ tableCommingData,
    setTableCommingData,
    istableDataFilter,
    setCurrentLeadsLength,
    dataForInformation,
    rowData,
    setIsDecisionMakerExcel,
    isDecisionMakerExcel, }) {

    const exportToExcel = (data, filename) => {
        const filteredData = data.map(({ person_id, org_id, strengthData, ...rest }) => rest);
        const ws = XLSX.utils.json_to_sheet(filteredData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, `${filename}.xlsx`);
        setIsDecisionMakerExcel(false);
    };


    const contentRef = useRef(null);
    const downloadPDF = () => {
        const pdfContent = `
      Company Name: ${dataForInformation?.name ? dataForInformation.name : '-'}
      Website: ${dataForInformation?.website_url ? dataForInformation.website_url : 'Not Available'}
      Phone Number: ${dataForInformation?.phone_number ? dataForInformation.phone_number : 'Not Available'}
      Address: ${`${dataForInformation?.street ? dataForInformation.street + ',' : ''} ${dataForInformation?.location_identifiers ? dataForInformation.location_identifiers + ',' : ''} ${dataForInformation?.postalcode ? dataForInformation.postalcode + ',' : ''} ${dataForInformation?.country ? dataForInformation.country : ''}`
            }
      Prospects: ${dataForInformation?.num_employees ? dataForInformation.num_employees : 'Not Available'}
      Annual Revenue: ${dataForInformation?.revenue_range ? dataForInformation.revenue_range : 'Not Available'}
      Industry/Sector: ${dataForInformation?.categories ? dataForInformation.categories : 'Not Available'}
      Company Bio: ${dataForInformation?.description ? dataForInformation.description : 'Not Available'}
    `;
        const pdfBlob = new Blob([pdfContent], { type: 'application/pdf' });
        saveAs(pdfBlob, 'company_info.pdf');
    };

    // ------------------//////  tabs

    const [value, setValue] = React.useState(0);
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
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const isBranchLocationsDisabled = true;

    ///--------------/////////  Table 

    const location = useLocation();
    const newdata = location?.state?.data;
    const [decisionMakerData, setDecisionMakerData] = React.useState([]);
    const [comingOrgId, setComingOrgId] = React.useState("");
    const loggedInUserId = GetUserId();
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [strengthTableData, setStrengthTableData] = React.useState([]);
    const decisionMakerTableData = decisionMakerData;
    const [hasMore, setHasMore] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [skip, setSkip] = React.useState(0);
    const [isMakerTable, setIsMakerTable] = React.useState(false);
    const getStrength = async () => {
        if (!decisionMakerTableData?.length) return;
        const tuples = decisionMakerTableData.map((item) => ({
            items: [Number(loggedInUserId), item?.person_id],
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
            const updatedData = decisionMakerTableData?.map((item, index) => ({
                ...item,
                strengthData: strengthData[index],
            }));
            setStrengthTableData(updatedData);
        } catch (error) {
            toast.error(error?.response?.data?.message);
        } finally {
        }
    };
    React.useEffect(() => {
        getStrength();
    }, [decisionMakerTableData]);

    const fetchMoreData = () => {
        if (!decisionMakerData?.length) return;
        const hasMore = decisionMakerData?.length < rowData?.people_count;
        if (!hasMore) return;
        setSkip((prevskip) => prevskip + 50);

    };
    const aiDecisionMakerTable = (eventName) => {
        setHasMore(false);
        const option = {
            method: "GET",
            headers: {
                "access-control-allow-origin": "*",
                "content-type": "application/json",
            },
            url: `${APIUrlOne()}/v1/decision_maker?org_id=${newdata?.org_id || newdata.id
                }&limit=50&skip=${skip ? skip : 0}`,
        };
        axios(option)
            .then((e) => {
                const comingData = e?.data?.data;
                if (comingData.length === 0) {
                    setHasMore(false);
                    setDecisionMakerData([]);
                    setStrengthTableData([]);
                } else {
                    if (comingData.length % 50 === 0)
                        setTimeout(() => setHasMore(true), 1000);
                    decisionMakerData.length === 0
                        ? setDecisionMakerData(comingData)
                        : setDecisionMakerData([...decisionMakerData], [...comingData]);
                }
            })

            .catch(() => {
            });
    };

    React.useEffect(() => {
        if (dataForInformation && isMakerTable) {
            aiDecisionMakerTable();
        } else {
            setIsMakerTable(true);
        }
    }, [dataForInformation, isMakerTable]);
    React.useEffect(() => {
        if (dataForInformation) {
            setComingOrgId(dataForInformation?.org_id);
        }
    }, [dataForInformation]);
    React.useEffect(() => {
        if (tableCommingData) {
            setCurrentLeadsLength(tableCommingData?.length);
        }
    }, [tableCommingData]);
    const handleSelectAllClick = (event) => {
        if (decisionMakerTableData.length === 0) {
            return;
        }
        if (event.target.checked) {
            const newSelecteds = decisionMakerTableData.map((row) => row.first_name);
            setSelectedRows(newSelecteds);
        } else {
            setSelectedRows([]);
        }
    };
    React.useEffect(() => {
        if (decisionMakerData?.length >= 50) {
            aiDecisionMakerTable(comingOrgId);
        }
    }, [skip]);
    React.useEffect(() => {
        if (isDecisionMakerExcel) {
            exportToExcel(decisionMakerData, 'decisionmaker_exported_data');
        }
    }, [isDecisionMakerExcel])

    return (
        <>
            {/* COMPANY DATA  */}

            <div id="content-id" ref={contentRef} style={{ fontSize: '5px', fontFamily: 'Arial, sans-serif' , paddingTop:"50px"  ,  }}>
                <div>
                    <div style={{ padding: "30px", backgroundColor: "#ffffff" }}>
                        <div
                            style={{
                                display: "flex",
                                width: "100%",
                                justifyContent: "space-between",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    gap: "15px",
                                    textTransform: "capitalize",
                                }}
                            >
                                <div
                                    style={{
                                        width: "97px",
                                        height: "97px",
                                        textTransform: "uppercase",
                                        borderRadius: "8px",
                                        border: "2px solid #ebedf5",
                                        backgroundColor: "#f5f6fa",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        fontSize: "16px",
                                        color: "#003057",
                                        fontWeight: "500",
                                    }}
                                >
                                    <img
                                        src={IndustryImage}
                                        style={{ width: "100%", height: "100%" }}
                                    />
                                    <p
                                        style={{
                                            fontSize: "16px",
                                            fontWeight: "bold",
                                            color: "#003057",
                                        }}
                                    >
                                    </p>
                                </div>
                                <div>
                                    <h3
                                        style={{
                                            fontSize: "18px",
                                            fontWeight: "600",
                                            lineHeight: "21.78px",
                                            paddingBottom: "4px",
                                            fontFamily: "Inter",
                                        }}
                                    >
                                        {dataForInformation?.name ? dataForInformation.name : "-"}
                                    </h3>
                                    <div style={{ display: "flex", gap: "8px", padding: "4.6px", }}>
                                        <img
                                            style={{
                                                width: "14.75px",
                                                height: "14.75px",
                                                color: "#003057"
                                            }}
                                            src={GlobalImg}
                                            alt=""
                                        />
                                        <p
                                            style={{
                                                fontSize: "14px",
                                                fontWeight: "400",
                                                lineHeight: "16.96px",
                                                fontFamily: "Inter",
                                            }}
                                        >
                                            {dataForInformation?.website_url ?
                                                <Link
                                                    to={dataForInformation?.website_url}
                                                    target="_blank"
                                                    style={{ textDecoration: "none", color: "#003057" }}
                                                >
                                                    <p>
                                                        {dataForInformation?.website_url?.split("www.")?.[1]
                                                            ? dataForInformation?.website_url?.split("www.")?.[1]
                                                            : dataForInformation?.website_url?.split("http://")?.[1]
                                                                ? dataForInformation?.website_url?.split("http://")?.[1] : dataForInformation?.website_url?.split("https://")?.[1]
                                                                    ? dataForInformation?.website_url?.split("https://")?.[1] : dataForInformation?.website_url
                                                        }
                                                    </p>
                                                </Link> : <p>Not Available</p>}
                                        </p>
                                    </div>
                                    <div style={{ display: "flex", gap: "8px", padding: "4.6px", }}
                                    >
                                        <img
                                            style={{
                                                width: "14.75px",
                                                height: "14.75px",
                                                color: "#003057",
                                            }}
                                            src={callImg}
                                            alt=""
                                        />
                                        <p
                                            style={{
                                                fontSize: "14px",
                                                fontWeight: "400",
                                                lineHeight: "16.96px",
                                                fontFamily: "Inter",
                                            }}
                                        >
                                            {dataForInformation?.phone_number
                                                ? dataForInformation.phone_number
                                                : "Not Available"}
                                        </p>
                                    </div>
                                    <div style={{ display: "flex", gap: "8px", padding: "4.6px", }}>
                                        <img
                                            style={{
                                                fontSize: "14px",
                                                fontWeight: "400",
                                                lineHeight: "16.96px",
                                                width: "14.75px",
                                                height: "14.75px",
                                                color: "#003057"
                                            }}
                                            src={LoctionImg}
                                            alt=""
                                        />
                                        <p
                                            style={{
                                                fontSize: "14px",
                                                fontWeight: "400",
                                                lineHeight: "16.96px",
                                                fontFamily: "Inter",
                                            }}
                                        >
                                            {`${dataForInformation?.street
                                                ? dataForInformation.street + ","
                                                : "Not Available"
                                                } ${dataForInformation?.location_identifiers
                                                    ? dataForInformation.location_identifiers + ","
                                                    : ""
                                                } ${dataForInformation?.postalcode
                                                    ? dataForInformation.postalcode + ","
                                                    : ""
                                                } ${dataForInformation?.country
                                                    ? dataForInformation.country
                                                    : ""
                                                }`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div style={{ disPlay: "flex", gap: "15px", textTransform: "capitalize", paddingTop: "1.5rem" }}>
                                <div style={{ display: "flex", gap: "8px", padding: "4.6px", fontFamily: "Inter", fontWeight: "400", lineHeight: "16.96px", fontSize: "14px" }}>
                                    <img
                                        style={{
                                            fontSize: "14px",
                                            fontWeight: "400",
                                            lineHeight: "16.96px",

                                        }}
                                        src={userprofile}
                                        alt=""
                                    />
                                    <p style={{ fontFamily: "Inter", fontWeight: "400", lineHeight: "16.96px", fontSize: "14px", fontFamily: "Inter", }}>
                                        Prospects -{" "}

                                        {dataForInformation?.num_employees
                                            ? dataForInformation.num_employees
                                            : "Not Available"}
                                    </p>
                                </div>
                                <div style={{ display: "flex", gap: "8px", padding: "4.6px", }}
                                >
                                    <img
                                        style={{
                                            fontSize: "14px",
                                            fontWeight: "400",
                                            lineHeight: "16.96px",
                                        }}
                                        src={GrowIcons}
                                        alt=""
                                    />
                                    <p style={{ fontFamily: "Inter", fontWeight: "400", lineHeight: "16.96px", fontSize: "14px" }}>
                                        Annual revenue -{" "}
                                        {dataForInformation?.revenue_range
                                            ? dataForInformation.revenue_range
                                            : "Not Available"}
                                    </p>
                                </div>
                                <div style={{ display: "flex", gap: "8px", padding: "4.6px", }}>
                                    <img
                                        style={{
                                            fontSize: "14px",
                                            fontWeight: "400",
                                            lineHeight: "16.96px",
                                            width: "14.75px",
                                            height: "14.75px",
                                            color: "#003057"
                                        }}
                                        src={Companyimg}
                                        alt=""
                                    />
                                    <p style={{ fontFamily: "Inter", fontWeight: "400", lineHeight: "16.96px", fontSize: "14px" }}>
                                        Industry/Sector -{" "}
                                        {dataForInformation?.categories
                                            ? dataForInformation?.categories
                                            : "Not Available"}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div
                        className=' '
                            style={{
                                boxShadow:
                                    "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)", 
                            }}
                        >
                            <div>
                                <p
                                    style={{ 
                                        margin: "0",
                                        fontFamily: "Roboto",
                                        fontWeight: 400,
                                        fontSize: "1rem",
                                        lineHeight: "1.5",
                                        letteSpacing: "0.00938em",
                                        margin: "20px 0",
                                        padding: "0px 16px",
                                    }}
                                >
                                    Company Bio
                                </p>
                            </div>
                            <div>
                                <p
                                    style={{
                                        fontSize: "14px",
                                        color: "#000000",
                                        fontWeight: "400",
                                        lineHeight: "25px",
                                        padding: "8px 16px 16px",
                                        fontFamily: "Inter",
                                    }}
                                >
                                    {dataForInformation?.description
                                        ? dataForInformation.description.replace(
                                            /(^|\.\s+)([a-z])/g,
                                            (match) => match.toUpperCase()
                                        )
                                        : "Not Available"}
                                        
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* TABS  */}

            <div style={{ backgroundColor: "#FFFFFF" }}>
                <Box className="company-profile-main-tabs-data" sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs className='Companydata' onChange={handleChange} aria-label="basic tabs example">
                            <Tab style={{ color: "#000000", fontWeight: "600", fontSize: "14px", lineHeight: "16.94px", height: "45px", borderBottom: "3px solid #DA291C" }}
                                label="Employees " {...a11yProps(0)} />

                        </Tabs>
                    </Box>
                    <CustomTabPanel index={0}>
                        <EmployeesTable dataForInformation={dataForInformation} rowData={rowData} setIsDecisionMakerExcel={setIsDecisionMakerExcel}
                            isDecisionMakerExcel={isDecisionMakerExcel} />
                    </CustomTabPanel>

                </Box>
            </div>

            {/* TABLE  */}
            <div style={{ padding: "24px 34px", backgroundColor: "#F5F6FA" ,  }}>
                {strengthTableData?.length ? (
                    <TableContainer
                        component={Paper}
                        style={{ border: "0.6px solid #D5D5D5", borderRadius: " 14px ", boxShadow: "none", fontFamily: "Inter" }}
                    >
                        <Table
                            aria-label="collapsible table"
                            className="DecisionMaker-table-added"
                        >
                            <TableHead>
                                <TableRow style={{ height:"67.08px"}} >
                                    <TableCell style={{ width: "0%"  }} ></TableCell>
                                    <TableCell style={{ width: "12%" }}>
                                        <p style={{ textAlign: "left", fontSize: "14px" }}>
                                            Name & Title
                                        </p> </TableCell>
                                    <TableCell style={{ width: "9%" }}>  <p style={{ textAlign: "center", fontSize: "14px" }}>JOI Strength</p> </TableCell>
                                 
                                    <TableCell style={{ width: "9%" }} >  <p style={{ textAlign: "center", fontSize: "14px" }}>JOSF Status</p></TableCell>
                                    <TableCell style={{ width: "12%" }}> <p >
                                        <p style={{ textAlign: "center", fontSize: "14px" }} >Linked In</p>
                                    </p> </TableCell>
                                    <TableCell style={{ width: "11%" }}>  <p>
                                        <p style={{ textAlign: "center", fontSize: "14px" }} >Email</p>
                                    </p> </TableCell>
                                    <TableCell style={{ width: "11%" }}>  <p >
                                        <p style={{ textAlign: "center", fontSize: "14px" }} >Mobile</p>
                                    </p>  </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {strengthTableData?.map((row, index) => (
                                    <React.Fragment key={index}>
                                        <Row
                                            row={row}
                                            selected={selectedRows.includes(row.first_name)}
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
                                        />
                                    </React.Fragment>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <div style={{ marginTop: "10px", overflow: "hidden", border: "0.6px solid #D5D5D5", borderRadius: "14px", boxShadow: "none", fontFamily: "Inter" }}>
                        <div style={{ height: "20vh", backgroundColor: "white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <div  style={{fontSize:"16px"}}>
                                No Data Available
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* DOWNLOARD PDF BUTTON  */}
            {/* <div className="company-profile-main-tabs-data" style={{ width: "100%", textAlign: "center" }}>
                <button
                    style={{
                        backgroundColor: '#DA291C',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        fontFamily: 'Arial, sans-serif',
                        marginTop: '20px'
                    }}
                    onClick={downloadPDF}
                >
                    Download PDF
                </button>
            </div> */}
        </>
    );
}

