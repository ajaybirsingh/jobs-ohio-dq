import React from "react";
import "./Style.css";
import "../../../Components/PeopleScreen/PeopleScreen.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
// import LabelInput from "../LabelInputFields/Index";
import { FormControl, MenuItem, Select, TextField } from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import { toast } from "react-toastify";
import SaveAltTwoToneIcon from "@mui/icons-material/SaveAltTwoTone";
// import Loader from "../Loader/Loader";
import axios from "axios";
import LabelInput from "../../LabelInputFields/Index";
import Loader from "../../Loader/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import { APIUrlFour } from "../../../Utils/Utils";
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
    });
    const [loading, setLoading] = React.useState();
    const OrgAction = [
        "outdated ",
        "inaccurate ",
        "missing ",
        "format ",
        "error",
    ];
    const OrgStatus = ["pending", "verified", "updated", "notfound", "debatable"];

    const validations = () => {
        if (Organization.Name === "") {
            toast.error("Please Enter Name ")
            return false
        }
        if (Organization.LegalName === "") {
            toast.error("Please Enter Legal Name ")
            return false
        }
        if (Organization.num_employees === "") {
            toast.error("Please Enter Num Employees ")
            return false
        }
        if (Organization.RevenueRange === "") {
            toast.error("Please Enter Revenue Range ")
            return false
        }
        if (Organization.linkedin === "") {
            toast.error("Please Enter Linkedin ")
            return false
        }
        if (Organization.categories === "") {
            toast.error("Please Enter Categories ")
            return false
        }
        if (Organization.orgpermalink === "") {
            toast.error("Please Enter Org Permalink")
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
        const data = {
            records: [
                {
                    org_id: null,
                    user_id: '17279a04-c331-4b16-b397-d752e75e6335',
                    name: Organization.Name,
                    legal_name: Organization.LegalName,
                    permalink: Organization.orgpermalink,
                    revenue_range: Organization.RevenueRange,
                    num_employees: Organization.num_employees,
                    linkedin: Organization.linkedin,
                    website_url: Organization.website_url,
                    description: Organization.description,
                    categories: Organization.categories,
                    city: Organization.city,
                    state: Organization.state,
                    country: Organization.country,
                    phone_number: Organization.phoneNumber,
                    comments: Organization.comments,
                    source: Organization.source,
                    source_description: Organization.source_description,
                    validation_status: Organization.validation_status,
                    action: "add",
                    updated_at: new Date().toISOString().slice(0, 10),
                },
            ],
        };
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
        const data = {
            records: [
                {
                    org_id: OrganizationData.org_id,
                    user_id: '17279a04-c331-4b16-b397-d752e75e6335',
                    name: Organization.Name,
                    legal_name: Organization.LegalName,
                    permalink: Organization.orgpermalink,
                    revenue_range: Organization.RevenueRange,
                    num_employees: Organization.num_employees,
                    linkedin: Organization.linkedin,
                    website_url: Organization.website_url,
                    description: Organization.description,
                    categories: Organization.categories,
                    city: Organization.city,
                    state: Organization.state,
                    country: Organization.country,
                    phone_number: Organization.phoneNumber,
                    comments: Organization.comments,
                    source: Organization.source,
                    source_description: Organization.source_description,
                    validation_status: Organization.validation_status,
                    action: "update",
                    updated_at: new Date().toISOString().slice(0, 10),
                },
            ],
        };
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
            })
        }
    }, [OrganizationData])
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
                                    Legal Name <span className="OrganizationMandatoryfields">*</span>
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
                            <div className="AddOrganization-child-container">
                                <label htmlFor="" className="PeopleScreen-lables">
                                    Num Employees <span className="OrganizationMandatoryfields">*</span>
                                </label>
                                <LabelInput
                                    onChange={(e) => {
                                        const inputvalue = e?.target?.value;
                                        setOrganization({
                                            ...Organization,
                                            num_employees: inputvalue,
                                        });
                                    }}
                                    value={Organization?.num_employees}
                                />
                            </div>
                        </div>
                        <div className="AddOrganization-flex-container">
                            <div className="AddOrganization-child-container">
                                <label htmlFor="" className="PeopleScreen-lables">
                                    Revenue Range <span className="OrganizationMandatoryfields">*</span>
                                </label>
                                <LabelInput
                                    onChange={(e) => {
                                        const inputvalue = e?.target?.value;
                                        setOrganization({
                                            ...Organization,
                                            RevenueRange: inputvalue,
                                        });
                                    }}
                                    value={Organization?.RevenueRange}
                                />
                            </div>
                            <div className="AddOrganization-child-container">
                                <label className="PeopleScreen-lables" htmlFor="">
                                    Linkedin <span className="OrganizationMandatoryfields">*</span>
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
                            <div className="AddOrganization-child-container">
                                <label htmlFor="" className="PeopleScreen-lables">
                                    Categories <span className="OrganizationMandatoryfields">*</span>
                                </label>
                                <LabelInput
                                    onChange={(e) => {
                                        const inputvalue = e?.target?.value;
                                        setOrganization({
                                            ...Organization,
                                            categories: inputvalue,
                                        });
                                    }}
                                    value={Organization?.categories}
                                />
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
                            <div className="uploderinput">
                                <label className="PeopleScreen-lables" htmlFor="">
                                    State
                                </label>
                                <LabelInput
                                    onChange={(e) => {
                                        const inputvalue = e?.target?.value;
                                        setOrganization({
                                            ...Organization,
                                            state: inputvalue,
                                        });
                                    }}
                                    value={Organization?.state}
                                />
                            </div>
                        </div>
                        <div className="AddOrganization-flex-container">
                            <div className="AddOrganization-child-container">
                                <label htmlFor="" className="PeopleScreen-lables">
                                    Country
                                </label>
                                <LabelInput
                                    onChange={(e) => {
                                        const inputvalue = e?.target?.value;
                                        setOrganization({
                                            ...Organization,
                                            country: inputvalue,
                                        });
                                    }}
                                    value={Organization?.country}
                                />
                            </div>
                            <div className="uploderinput">
                                <label className="PeopleScreen-lables" htmlFor="">
                                    Org Permalink <span className="OrganizationMandatoryfields">*</span>
                                </label>
                                <LabelInput
                                    onChange={(e) => {
                                        const inputvalue = e?.target?.value;
                                        setOrganization({
                                            ...Organization,
                                            orgpermalink: inputvalue,
                                        });
                                    }}
                                    value={Organization?.orgpermalink}
                                />
                            </div>
                        </div>
                        <div className="AddOrganization-flex-container">
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
                                        <MenuItem disabled value="">
                                            <em className="SelectAction-css"> Select Status</em>
                                        </MenuItem>
                                        {OrgStatus?.map((item, index) => {
                                            return (
                                                <MenuItem key={index} value={item}>
                                                    {item}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            {/* <div className="People-child-container">
                                <label className="PeopleScreen-lables" htmlFor="">
                                    Action
                                </label>
                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <Select
                                        className="ContactUsScreen-dropdown"
                                        placeholder="Select Action"
                                        onChange={(e) => {
                                            const inputvalue = e?.target?.value;
                                            setOrganization({
                                                ...Organization,
                                                action: inputvalue,
                                            });
                                        }}
                                        value={Organization?.action}
                                        displayEmpty
                                        inputProps={{ "aria-label": "Without label" }}
                                    >
                                        <MenuItem disabled value="">
                                            <em className="SelectAction-css">Select Action</em>
                                        </MenuItem>
                                        {OrgAction?.map((item, index) => {
                                            return (
                                                <MenuItem key={index} value={item}>
                                                    {item}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </div> */}
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
                        {/* <div className="SUBMITbutton-div">
                            <Stack spacing={2} direction="row">
                                <Button
                                    className="addOrganization-SUBMIT-button"
                                    variant="contained"
                                    onClick={handelAddOrg}
                                >
                                    <SaveAltTwoToneIcon />
                                    SUBMIT
                                </Button>
                            </Stack>
                        </div> */}
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