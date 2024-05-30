import React, { useEffect, useState } from "react";
import "./Style.css";
import "../../../Components/PeopleScreen/PeopleScreen.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { FormControl, MenuItem, Select, TextField, InputLabel } from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import { toast } from "react-toastify";
import SaveAltTwoToneIcon from "@mui/icons-material/SaveAltTwoTone";
import axios from "axios";
import LabelInput from "../../LabelInputFields/Index";
import Loader from "../../Loader/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import { APIUrlFour, APIUrlOne, GetUserId } from "../../../Utils/Utils";
import { ORGANIZATION } from "../../../Utils/Constants";
const Organization = () => {
    const location = useLocation();
    const OrganizationData = location?.state;
    const navigate = useNavigate();
    const [Organization, setOrganization] = React.useState({
        Name: "",
        LegalName: "",
        RevenueRange: "",
        num_employees: "",
        orgpermalink: "",
        linkedin: "",
        website_url: "",
        description: "",
        categories: "",
        city: "",
        state: "",
        country: "",
        phoneNumber: "",
        source: "",
        source_description: "",
        validation_status: "",
        action: "",
        comments: "",
        uuid: ""
    });
    const removeQuotes = (str) => {
        if (str.startsWith('"') && str.endsWith('"')) {
            return str.slice(1, -1);
        }
        return str;
    };
    const userId = GetUserId();
    const userIdWithoutQuotes = removeQuotes(userId);
    const [loading, setLoading] = React.useState();
    const [actionData, setActionData] = useState([]);
    const [dropDownData, setDropDownData] = useState([]);

    const validations = () => {
        if (Organization.Name === "") {
            toast.error("Please Enter Name ")
            return false
        }
        if (Organization.website_url === "") {
            toast.error("Please Enter Website Url ")
            return false
        }
        return true
    }

    const handelAddOrg = () => {
        if (!validations()) return
        const data =
        {
            records: [
                {
                    uuid: null,
                    name: Organization.Name,
                    revenue_range: Organization.RevenueRange,
                    num_employees: Organization.num_employees,
                    linkedin: Organization.linkedin,
                    website_url: Organization.website_url,
                    description: Organization.description,
                    categories: Organization.categories,
                    state: Organization.state,
                    country: Organization.country,
                    legal_name: Organization.LegalName,
                    city: Organization.city,
                    phone_number: Organization.phoneNumber,
                    org_id: null,
                    permalink: Organization.orgpermalink,
                    comments: Organization.comments,
                    source: Organization.source,
                    source_description: Organization.source_description,
                    validation_status: Organization.validation_status,
                    action: "add",
                    user_id: userIdWithoutQuotes,
                    updated_at: new Date().toISOString().slice(0, 10)
                }
            ]
        }
        const option = {
            method: "POST",
            headers: {
                "access-control-allow-origin": "*",
                "content-type": "application/json",
            },
            url: `${APIUrlFour()}/v1/add_record_org`,
            data: JSON.stringify(data),
        };
        axios(option)
            .then((e) => {
                setLoading(false);
                if (e?.status === 200) {
                    toast.success("Record Add Successfully");
                    setOrganization({
                        Name: "",
                        LegalName: "",
                        RevenueRange: "",
                        num_employees: "",
                        orgpermalink: "",
                        linkedin: "",
                        website_url: "",
                        description: "",
                        categories: "",
                        city: "",
                        state: "",
                        country: "",
                        phoneNumber: "",
                        source: "",
                        source_description: "",
                        validation_status: "",
                        action: "",
                        comments: "",
                    });
                    navigate(ORGANIZATION);
                }
            })
            .catch((err) => {
                setLoading(false);
                toast.error(err?.response?.data?.message);
            });
    };

    const handelUpdateOrg = () => {
        if (!validations()) return
        const data =
        {
            records: [
                {
                    uuid: Organization?.uuid,
                    name: Organization.Name,
                    revenue_range: Organization.RevenueRange,
                    num_employees: Organization.num_employees,
                    linkedin: Organization.linkedin,
                    website_url: Organization.website_url,
                    description: Organization.description,
                    categories: Organization.categories,
                    state: Organization.state,
                    country: Organization.country,
                    legal_name: Organization.LegalName,
                    city: Organization.city,
                    phone_number: Organization.phoneNumber,
                    org_id: OrganizationData.org_id,
                    permalink: Organization.orgpermalink,
                    comments: Organization.comments,
                    source: Organization.source,
                    source_description: Organization.source_description,
                    validation_status: Organization.validation_status,
                    action: "update",
                    user_id: userIdWithoutQuotes,
                    updated_at: new Date().toISOString().slice(0, 10)
                }
            ]
        }
        const option = {
            method: "POST",
            headers: {
                "access-control-allow-origin": "*",
                "content-type": "application/json",
            },
            url: `${APIUrlFour()}/v1/update_record_org`,
            data: JSON.stringify(data),
        };
        axios(option)
            .then((e) => {
                setLoading(false);
                if (e?.status === 200) {
                    toast.success("Record Updated Successfully");
                    setOrganization({
                        Name: "",
                        LegalName: "",
                        RevenueRange: "",
                        num_employees: "",
                        orgpermalink: "",
                        linkedin: "",
                        website_url: "",
                        description: "",
                        categories: "",
                        city: "",
                        state: "",
                        country: "",
                        phoneNumber: "",
                        source: "",
                        source_description: "",
                        validation_status: "",
                        action: "",
                        comments: "",
                    });
                    navigate(ORGANIZATION);
                }

            })
            .catch((err) => {
                setLoading(false);
                toast.error(err?.response?.data?.message);
            });
    };

    React.useEffect(() => {
        if (OrganizationData?.name) {
            setOrganization({
                Name: OrganizationData?.name,
                LegalName: OrganizationData.legal_name,
                RevenueRange: OrganizationData.revenue_range,
                num_employees: OrganizationData.num_employees,
                orgpermalink: OrganizationData.permalink,
                linkedin: OrganizationData.linkedin,
                website_url: OrganizationData.website_url,
                description: OrganizationData.description,
                categories: OrganizationData.categories,
                city: OrganizationData.city,
                state: OrganizationData.state,
                country: OrganizationData.country,
                phoneNumber: OrganizationData.phone_number,
                source: OrganizationData.source,
                source_description: OrganizationData.source_description,
                validation_status: OrganizationData.validation_status,
                comments: OrganizationData.comments,
                action: OrganizationData.action,
                uuid: OrganizationData?.uuid
            })
        }
    }, [OrganizationData])

    const actionFilters = () => {
        const option = {
            method: "GET",
            headers: {
                "content-type": "plain/text",
            },
            url: `${APIUrlFour()}/v1/get_status_list`,
        };
        axios(option)
            .then((e) => {
                const data = e?.data?.status_list;
                setActionData(data);
            })
            .catch(() => {

            })
    }
    useEffect(() => {
        actionFilters();
    }, [])

    const DropDownsData = () => {
        const option = {
            method: "GET",
            headers: {
                "access-control-allow-origin": "*",
                "content-type": "application/json",
            },
            url: `${APIUrlOne()}/v1/org_filters`,
        };
        axios(option)
            .then((e) => {
                if (e?.status === 200) {
                    setDropDownData(e?.data?.data);
                }
            })
            .catch(() => {

            })
    }
    useEffect(() => {
        DropDownsData();
    }, [])
    const states = Organization?.country === 'United States' ? dropDownData?.state : dropDownData?.ca_states;
    return (
        <>
            {loading ? <Loader /> : null}
            <section className="AddOrganization-main-container">
                <div className="AddOrganization-heading">
                    <h3> Add Organization </h3>
                    <p>You are welcome to Add Organization the JOI AI Team</p>
                </div>
                <div className="AddOrganization-container-outter">
                    <div className="AddOrganization-container">
                        <div className="AddOrganization-flex-container">
                            <div className="AddOrganization-child-container">
                                <label htmlFor="" className="PeopleScreen-lables">
                                    Name <span className="OrganizationMandatoryfields">*</span>

                                </label>

                                <LabelInput
                                    onChange={(e) => {
                                        const inputvalue = e?.target?.value;
                                        setOrganization({
                                            ...Organization,
                                            Name: inputvalue,
                                        });
                                    }}
                                    value={Organization?.Name}
                                />
                            </div>
                            <div className="AddOrganization-child-container">
                                <label htmlFor="" className="PeopleScreen-lables">
                                    Legal Name
                                </label>
                                <LabelInput
                                    onChange={(e) => {
                                        const inputvalue = e?.target?.value;
                                        setOrganization({
                                            ...Organization,
                                            LegalName: inputvalue,
                                        });
                                    }}
                                    value={Organization?.LegalName}
                                />
                            </div>
                        </div>
                        <div className="AddOrganization-flex-container">
                            <div className="AddOrganization-child-container">
                                <label htmlFor="" className="PeopleScreen-lables">
                                    Phone No
                                </label>
                                <LabelInput
                                    onChange={(e) => {
                                        const inputvalue = e?.target?.value;
                                        setOrganization({
                                            ...Organization,
                                            phoneNumber: inputvalue,
                                        });
                                    }}
                                    value={Organization?.phoneNumber}
                                />
                            </div>
                           
                            <div className="People-child-container">
                                <label htmlFor="" className="PeopleScreen-lables">
                                    Num Employees
                                </label>
                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <Select
                                        placeholder="Select Num Employees"
                                        className="AddOrg-dropdown"
                                        onChange={(e) => {
                                            const inputvalue = e?.target?.value;
                                            setOrganization({
                                                ...Organization,
                                                num_employees: inputvalue,
                                            });
                                        }}
                                        value={Organization?.num_employees}
                                        displayEmpty
                                        inputProps={{ "aria-label": "Without label" }}
                                    >
                                        <MenuItem disabled value="" className="disable-menu-action">
                                            <em className="SelectAction-css"> Select Num Employees</em>
                                        </MenuItem>
                                        {dropDownData?.num_employees?.map((item, index) => {
                                            return (
                                                <MenuItem key={index} value={item}>
                                                    {item}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className="AddOrganization-flex-container">
                            
                            <div className="People-child-container">
                                <label htmlFor="" className="PeopleScreen-lables">
                                    Revenue Range
                                </label>
                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <Select
                                        placeholder="Select Revenue Range"
                                        className="AddOrg-dropdown"
                                        onChange={(e) => {
                                            const inputvalue = e?.target?.value;
                                            setOrganization({
                                                ...Organization,
                                                RevenueRange: inputvalue,
                                            });
                                        }}
                                        value={Organization?.RevenueRange}
                                        displayEmpty
                                        inputProps={{ "aria-label": "Without label" }}
                                    >
                                        <MenuItem disabled value="" className="disable-menu-action">
                                            <em className="SelectAction-css"> Select Revenue Range</em>
                                        </MenuItem>
                                        {dropDownData?.revenue_range?.map((item, index) => {
                                            return (
                                                <MenuItem key={index} value={item}>
                                                    {item}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="AddOrganization-child-container">
                                <label className="PeopleScreen-lables" htmlFor="">
                                    Linkedin
                                </label>
                                <LabelInput
                                    onChange={(e) => {
                                        const inputvalue = e?.target?.value;
                                        setOrganization({
                                            ...Organization,
                                            linkedin: inputvalue,
                                        });
                                    }}
                                    value={Organization?.linkedin}
                                />
                            </div>
                        </div>
                        <div className="AddOrganization-flex-container">
                            
                            <div className="People-child-container">
                                <label htmlFor="" className="PeopleScreen-lables">
                                    Categories
                                </label>
                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <Select
                                        placeholder="Select Categories"
                                        className="AddOrg-dropdown"
                                        onChange={(e) => {
                                            const inputvalue = e?.target?.value;
                                            setOrganization({
                                                ...Organization,
                                                categories: inputvalue,
                                            });
                                        }}
                                        value={Organization?.categories}
                                        displayEmpty
                                        inputProps={{ "aria-label": "Without label" }}
                                    >
                                        <MenuItem disabled value="" className="disable-menu-action">
                                            <em className="SelectAction-css"> Select Categories</em>
                                        </MenuItem>
                                        {dropDownData?.categories?.map((item, index) => {
                                            return (
                                                <MenuItem key={index} value={item}>
                                                    {item}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                                
                            </div>
                            <div className="uploderinput">
                                <label className="PeopleScreen-lables" htmlFor="">
                                    Source Description
                                </label>
                                <LabelInput
                                    onChange={(e) => {
                                        const inputvalue = e?.target?.value;
                                        setOrganization({
                                            ...Organization,
                                            source_description: inputvalue,
                                        });
                                    }}
                                    value={Organization?.source_description}
                                />
                            </div>
                        </div>
                        <div className="AddOrganization-flex-container">
                           
                            <div className="People-child-container">
                                <label htmlFor="" className="PeopleScreen-lables">
                                    Country
                                </label>
                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <Select
                                        placeholder="Select Country"
                                        className="AddOrg-dropdown"
                                        onChange={(e) => {
                                            const inputvalue = e?.target?.value;
                                            setOrganization({
                                                ...Organization,
                                                country: inputvalue,
                                            });
                                        }}
                                        value={Organization?.country}
                                        displayEmpty
                                        inputProps={{ "aria-label": "Without label" }}
                                    >
                                        <MenuItem disabled value="" className="disable-menu-action">
                                            <em className="SelectAction-css"> Select Country</em>
                                        </MenuItem>
                                        {dropDownData?.country?.map((item, index) => {
                                            return (
                                                <MenuItem key={index} value={item}>
                                                    {item}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            
                            <div className="People-child-container">
                                <label className="PeopleScreen-lables" htmlFor="">
                                    State
                                </label>
                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <Select
                                        placeholder="Select State"
                                        className="AddOrg-dropdown"
                                        onChange={(e) => {
                                            const inputvalue = e?.target?.value;
                                            setOrganization({
                                                ...Organization,
                                                state: inputvalue,
                                            });
                                        }}
                                        value={Organization?.state}
                                        displayEmpty
                                        inputProps={{ "aria-label": "Without label" }}
                                    >
                                        <MenuItem disabled value="" className="disable-menu-action">
                                            <em className="SelectAction-css"> Select State</em>
                                        </MenuItem>

                                        {states?.map((item, index) => {
                                            return (
                                                <MenuItem key={index} value={item}>
                                                    {item}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className="AddOrganization-flex-container">
                            <div className="AddOrganization-child-container">
                                <label htmlFor="" className="PeopleScreen-lables">
                                    City
                                </label>
                                <LabelInput
                                    onChange={(e) => {
                                        const inputvalue = e?.target?.value;
                                        setOrganization({
                                            ...Organization,
                                            city: inputvalue,
                                        });
                                    }}
                                    value={Organization?.city}
                                />
                            </div>
                            
                            <div className="AddOrganization-child-container">
                                <label htmlFor="" className="PeopleScreen-lables">
                                    Description
                                </label>
                                <LabelInput
                                    onChange={(e) => {
                                        const inputvalue = e?.target?.value;
                                        setOrganization({
                                            ...Organization,
                                            description: inputvalue,
                                        });
                                    }}
                                    value={Organization?.description}
                                />
                            </div>
                        </div>
                        <div className="AddOrganization-flex-container">

                            <div className="uploderinput">
                                <label className="PeopleScreen-lables" htmlFor="">
                                    Source
                                </label>
                                <LabelInput
                                    onChange={(e) => {
                                        const inputvalue = e?.target?.value;
                                        setOrganization({
                                            ...Organization,
                                            source: inputvalue,
                                        });
                                    }}
                                    value={Organization?.source}
                                />
                            </div>

                            <div className="AddOrganization-child-container">
                                <label htmlFor="" className="PeopleScreen-lables">
                                    Website Url <span className="OrganizationMandatoryfields">*</span>
                                </label>
                                <LabelInput
                                    onChange={(e) => {
                                        const inputvalue = e?.target?.value;
                                        setOrganization({
                                            ...Organization,
                                            website_url: inputvalue,
                                        });
                                    }}
                                    value={Organization?.website_url}
                                />
                            </div>
                        </div>
                        <div className="Pepole-flex-container">
                            <div className="People-child-container">
                                <label className="PeopleScreen-lables" htmlFor="">
                                    Validation status
                                </label>
                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <Select
                                        placeholder="Select Status"
                                        className="AddOrg-dropdown"
                                        onChange={(e) => {
                                            const inputvalue = e?.target?.value;
                                            setOrganization({
                                                ...Organization,
                                                validation_status: inputvalue,
                                            });
                                        }}
                                        value={Organization?.validation_status}
                                        displayEmpty
                                        inputProps={{ "aria-label": "Without label" }}
                                    >
                                        <MenuItem disabled value="" className="disable-menu-action">
                                            <em className="SelectAction-css"> Select Status</em>
                                        </MenuItem>
                                        {actionData?.map((item, index) => {
                                            return (
                                                <MenuItem key={index} value={item}>
                                                    {item}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="AddOrganization-child-container">
                                <label cl htmlFor="" className="PeopleScreen-lables">
                                    Comment
                                </label>
                                <div className="PeopleTextarea">
                                    <Textarea
                                        className="PeopleScreen-lables-text-field-area"
                                        value={Organization?.comments}
                                        aria-label="minimum height"
                                        minRows={3}
                                        onChange={(e) => {
                                            const inputvalue = e?.target?.value;
                                            setOrganization({
                                                ...Organization,
                                                comments: inputvalue,
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                            

                        </div>
                        <div className="Pepole-flex-container">


                        </div>
                        
                        <div className="SUBMITbutton-div">
                            <Stack spacing={2} direction="row">
                                {OrganizationData ? <Button
                                    className="addOrganization-SUBMIT-button"
                                    variant="contained"
                                    onClick={handelUpdateOrg}
                                >
                                    <SaveAltTwoToneIcon />
                                    Update
                                </Button>
                                    : <Button
                                        className="addOrganization-SUBMIT-button"
                                        variant="contained"
                                        onClick={handelAddOrg}
                                    >
                                        <SaveAltTwoToneIcon />
                                        SUBMIT
                                    </Button>}

                            </Stack>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
export default Organization;