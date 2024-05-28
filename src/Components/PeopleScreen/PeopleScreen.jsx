import * as React from "react";
import "./PeopleScreen.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import LabelInput from "../LabelInputFields/Index";
import {
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import { toast } from "react-toastify";
import SaveAltTwoToneIcon from "@mui/icons-material/SaveAltTwoTone";
import Loader from "../Loader/Loader";
import axios from "axios";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useLocation, useNavigate } from "react-router-dom";
import { APIUrlFour, APIUrlOne, GetUserId } from "../../Utils/Utils";
import CloseIcon from '@mui/icons-material/Close';
import { AI_DECISION_MAKER } from "../../Utils/Constants";
import moment from "moment/moment";
export default function PeopleScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const peopleData = location?.state;
  const [showSearchdata, setshowSearchdata] = React.useState(false);
  const [responseData, setResponseData] = React.useState(null);
  const [selectedOrganization, setSelectedOrganization] = React.useState('');
  const [actionData, setActionData] = React.useState([]);
  const [PeopleDetails, setPeopleDetails] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    PhoneNo: "",
    Linkedin: "",
    JobTitle: "",
    Oraganization: "",
    SourceDescription: "",
    City: "",
    Comments: "",
    State: "",
    Zip: "",
    Country: "",
    Orglinkedin: "",
    PositionEndDate: "",
    Status: "",
    UserId: "",
  });

  const formatedDate = moment(peopleData?.position_end_date).format("MM/DD/YYYY");
  React.useEffect(() => {
    if (peopleData?.first_name) {
      setPeopleDetails({
        firstName: peopleData?.first_name,
        lastName: peopleData?.last_name,
        email: peopleData?.email,
        PhoneNo: peopleData?.phone_no,
        Linkedin: peopleData?.linkedin,
        JobTitle: peopleData?.primary_job_title,
        Oraganization: peopleData?.primary_organization,
        SourceDescription: peopleData?.source_description,
        City: peopleData?.city,
        State: peopleData?.state,
        Country: peopleData?.country,
        Zip: peopleData?.zip_code,
        Orglinkedin: peopleData?.organization_linkedin_username,
        PositionEndDate: formatedDate,
        Comments: peopleData?.comments,
        validation_status: peopleData?.status
      })
    }
  }, [peopleData])

  const [loading, setLoading] = React.useState();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "563px",
    height: "532px",
    bgcolor: "#fff",
    border: "2px solid #fff",
    boxShadow: 24,
    p: 4,
    borderRadius: "17px",
  };
  const blue = {
    100: "#DAECFF",
    200: "#b6daff",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    900: "#003A75",
  };
  const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  function isValidEmail(email) {
    return emailRegex.test(email);
  }
  const validateFields = () => {
    if (!PeopleDetails?.firstName || PeopleDetails?.firstName?.trim() === "") {
      toast.error("Please Enter First Name");
      return false;
    }
    if (!PeopleDetails?.lastName || PeopleDetails?.lastName?.trim() === "") {
      toast.error("Please Enter Last Name");
      return false;
    }
    if (!PeopleDetails?.Linkedin) {
      toast.error("Please Enter Linkedin");
      return false;
    }
    if (!PeopleDetails?.JobTitle) {
      toast.error("Please Enter JobTitle");
      return false;
    }
    // if (!selectedOrganization?.org_name || !PeopleDetails?.Oraganization) {
    //   toast.error("Please Select Organization");
    //   return false;
    // }
    if (!selectedOrganization?.org_name && !PeopleDetails?.Oraganization) {
      toast.error("Please Select Organization");
      return false;
    }
    if (!PeopleDetails?.Status) {
      toast.error("Please Select Status");
      return false
    }
    return true;
  };
  const userId = GetUserId();
  const handelApplyRecords = () => {
    if (!validateFields()) return;
    setLoading(true);
    const data = {
      records: [
        {
          person_id: null,
          user_id: userId,
          first_name: PeopleDetails?.firstName,
          last_name: PeopleDetails?.lastName,
          email: PeopleDetails?.email,
          phone_no: PeopleDetails?.PhoneNo,
          linkedin: PeopleDetails?.Linkedin,
          primary_job_title: PeopleDetails?.JobTitle,
          primary_organization: selectedOrganization?.org_name,
          source_description: PeopleDetails?.SourceDescription,
          city: PeopleDetails?.City,
          state: PeopleDetails?.State,
          country: PeopleDetails?.Country,
          zip_code: PeopleDetails?.Zip,
          comments: PeopleDetails?.Comments,
          organization_linkedin_username: PeopleDetails?.Orglinkedin,
          position_end_date: PeopleDetails?.PositionEndDate,
          org_permalink: "",
          middle_name: "",
          updated_at: new Date().toISOString().slice(0, 10),
          name: "",
          source: "",
          validation_status: PeopleDetails?.Status,
          action: "",
        },
      ],
    };

    const option = {
      method: "POST",
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json",
      },
      url: `${APIUrlFour()}/v1/add_record_people`,
      data: JSON.stringify(data),
    };
    axios(option)
      .then((e) => {
        setLoading(false);
        if (e?.status === 200) {
          toast.success("Record Added successfully");
          setPeopleDetails({
            firstName: "",
            lastName: "",
            email: "",
            PhoneNo: "",
            Linkedin: "",
            JobTitle: "",
            Oraganization: "",
            SourceDescription: "",
            City: "",
            Comments: "",
            State: "",
            Zip: "",
            Country: "",
            Orglinkedin: "",
            PositionEndDate: "",
            Status: "",
          });
          navigate(AI_DECISION_MAKER);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.response?.data?.message);
      });
  };

  const handleEditRecords = () => {
    if (!validateFields()) return;
    setLoading(true);
    const data = {
      records: [
        {
          first_name: PeopleDetails?.firstName,
          last_name: PeopleDetails?.lastName,
          linkedin: PeopleDetails?.Linkedin,
          primary_job_title: PeopleDetails?.JobTitle,
          primary_organization: selectedOrganization?.org_name ? selectedOrganization?.org_name : "",
          organization_linkedin_username: PeopleDetails?.Orglinkedin ? PeopleDetails?.Orglinkedin : "",
          person_id: peopleData?.person_id,
          org_permalink: "",
          middle_name: "",
          email: PeopleDetails?.email,
          phone_no: PeopleDetails?.PhoneNo,
          city: PeopleDetails?.City,
          state: PeopleDetails?.State ? PeopleDetails?.State : "",
          country: PeopleDetails?.Country,
          zip_code: PeopleDetails?.Zip,
          position_end_date: PeopleDetails?.PositionEndDate,
          comments: PeopleDetails?.Comments,
          source: "",
          source_description: PeopleDetails?.SourceDescription,
          validation_status: PeopleDetails?.Status,
          action: "",
          user_id: userId,
          updated_at: new Date().toISOString().slice(0, 10),
        }
      ],
    };

    const option = {
      method: "POST",
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json",
      },
      url: `${APIUrlFour()}/v1/update_record_people`,
      data: JSON.stringify(data),
    };
    axios(option)
      .then((e) => {
        setLoading(false);
        if (e?.status === 200) {
          toast.success("Record Updated successfully");
          setPeopleDetails({
            firstName: "",
            lastName: "",
            email: "",
            PhoneNo: "",
            Linkedin: "",
            JobTitle: "",
            Oraganization: "",
            SourceDescription: "",
            City: "",
            Comments: "",
            State: "",
            Zip: "",
            Country: "",
            Orglinkedin: "",
            PositionEndDate: "",
            Status: "",
          });
          navigate(AI_DECISION_MAKER);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.response?.data?.message);
      });
  }
  const dateFromHandler = (date) => {
    const formattedDate = date.format("YYYY-MM-DD");
    setPeopleDetails({
      ...PeopleDetails,
      PositionEndDate: formattedDate,
    });
  };
  const dateFromHa = (date) => {
    const formattedDate = date.format("YYYY-MM-DD");
    setPeopleDetails({
      ...PeopleDetails,
      PositionEndDate: formattedDate,
    });
  };
  const PeopleStatus = [
    "pending",
    "verified",
    "updated",
    "notfound",
    "debatable",
  ];
  const PeopleAction = [
    "outdated ",
    "inaccurate ",
    "missing ",
    "format ",
    "error",
  ];

  const OrgSearch = () => {
    setLoading(true)
    const data = { org_name: PeopleDetails.Oraganization };
    axios
      .post(`${APIUrlOne()}/v1/org_search`, data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setLoading(false)
        if (response.status === 200) {
          setshowSearchdata(true);
          setResponseData(response.data);
          toast.success(response.data.message);
        } else {
          setshowSearchdata(false);
        }
      })
      .catch((error) => {
        setLoading(false)
        toast.error(error.response.data.message);
      });
  };
  React.useEffect(() => {
    let timer;
    if (PeopleDetails.Oraganization?.length > 2) {
      timer = setTimeout(() => {
        OrgSearch();
      }, 1000);
      setshowSearchdata(false)
    }
    return () => clearTimeout(timer);
  }, [PeopleDetails.Oraganization]);
  const handelselectdata = (item) => {
    setSelectedOrganization(item);
    setshowSearchdata(false)
    setPeopleDetails(prevState => ({
      ...prevState,
      Oraganization: item?.org_name || ""
    }));
    setshowSearchdata(false)
  };

  const handelEmtyData = () => {
    setPeopleDetails(prevState => ({
      ...prevState,
      Oraganization: ""
    }));
    setSelectedOrganization('');
  }

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
        .catch((err) => {

        })
}
React.useEffect(() => {
    actionFilters();
}, [])
  return (
    <>
      {loading ? <Loader /> : null}
      <section className="PeopleScreen-main-container">
        <div className="Peoplescreen-heading">
          <h3>People Records </h3>
          <p>You are welcome to People Records the JOI AI Team</p>
        </div>
        <div className="People-screencontainer-outter">
          <div className="Pepole-container">
            <div className="Pepole-flex-container">
              <div className="People-child-container">
                <label htmlFor="" className="PeopleScreen-lables">
                  First Name
                </label>
                <span className="PeopleMandatoryfields">*</span>
                <LabelInput
                  onChange={(e) => {
                    const inputvalue = e?.target?.value;
                    setPeopleDetails({
                      ...PeopleDetails,
                      firstName: inputvalue,
                    });
                  }}
                  value={PeopleDetails?.firstName}
                />
              </div>
              <div className="People-child-container">
                <label htmlFor="" className="PeopleScreen-lables">
                  Last Name
                </label>
                <span className="PeopleMandatoryfields">*</span>
                <LabelInput
                  onChange={(e) => {
                    const inputvalue = e?.target?.value;
                    setPeopleDetails({
                      ...PeopleDetails,
                      lastName: inputvalue,
                    });
                  }}
                  value={PeopleDetails?.lastName}
                />
              </div>
            </div>
            <div className="Pepole-flex-container">
              <div className="People-child-container">
                <label htmlFor="" className="PeopleScreen-lables">
                  Email
                </label>
                {/* <span className="PeopleMandatoryfields">*</span> */}
                <LabelInput
                  onChange={(e) => {
                    const inputvalue = e?.target?.value;
                    setPeopleDetails({
                      ...PeopleDetails,
                      email: inputvalue,
                    });
                  }}
                  value={PeopleDetails?.email}
                />
              </div>
              <div className="People-child-container">
                <label htmlFor="" className="PeopleScreen-lables">
                  Phone No
                </label>
                {/* <span className="PeopleMandatoryfields">*</span> */}
                <LabelInput
                  onChange={(e) => {
                    const inputvalue = e?.target?.value;
                    setPeopleDetails({
                      ...PeopleDetails,
                      PhoneNo: inputvalue,
                    });
                  }}
                  value={PeopleDetails?.PhoneNo}
                />
              </div>
            </div>
            <div className="Pepole-flex-container">
              <div className="People-child-container">
                <label htmlFor="" className="PeopleScreen-lables">
                  Linkedin
                </label>
                <span className="PeopleMandatoryfields">*</span>
                <LabelInput
                  onChange={(e) => {
                    const inputvalue = e?.target?.value;
                    setPeopleDetails({
                      ...PeopleDetails,
                      Linkedin: inputvalue,
                    });
                  }}
                  value={PeopleDetails?.Linkedin}
                />
              </div>
              <div className="People-child-container">
                <label className="PeopleScreen-lables" htmlFor="">
                  Job Title
                </label>
                <span className="PeopleMandatoryfields">*</span>

                <LabelInput
                  onChange={(e) => {
                    const inputvalue = e?.target?.value;
                    setPeopleDetails({
                      ...PeopleDetails,
                      JobTitle: inputvalue,
                    });
                  }}
                  value={PeopleDetails?.JobTitle}
                />
              </div>
            </div>

            {/* <div className="Pepole-flex-container">
              <div className="People-child-container">
                <label htmlFor="" className="PeopleScreen-lables">
                  Organization
                </label>
                <span className="PeopleMandatoryfields">*</span>
                <LabelInput
                  onChange={(e) => {
                    const inputvalue = e?.target?.value;
                    setPeopleDetails({
                      ...PeopleDetails,
                      Oraganization: inputvalue,
                    });
                  }}
                  value={PeopleDetails?.Oraganization}
                />
              </div>
              <div className="uploderinput">
                <label className="PeopleScreen-lables" htmlFor="">
                  Source Description
                </label>

                <LabelInput
                  onChange={(e) => {
                    const inputvalue = e?.target?.value;
                    setPeopleDetails({
                      ...PeopleDetails,
                      SourceDescription: inputvalue,
                    });
                  }}
                  value={PeopleDetails?.SourceDescription}
                />
              </div>
            </div> */}

            <div className="Pepole-flex-container">
              <div className="SetCoustom-drop-down">

                <div className="People-child-container-forOrganization">
                  <label htmlFor="" className="PeopleScreen-lables">
                    Organization
                  </label>
                  <span className="PeopleMandatoryfields">*</span>
                  <LabelInput
                    onChange={(e) => {
                      const inputvalue = e?.target?.value;
                      setPeopleDetails({
                        ...PeopleDetails,
                        Oraganization: inputvalue,
                      });
                    }}
                    value={PeopleDetails?.Oraganization}
                  />
                  <div className="handelEmtyData_icon" onClick={handelEmtyData}>
                    {PeopleDetails.Oraganization && (
                      <CloseIcon className='showicons-search' />
                    )}
                  </div>
                </div>
                {PeopleDetails.Oraganization && (
                  <div className={responseData && responseData.length ? "Dropdown-forPeople-screen" : ""}
                  >
                    {responseData?.length > 0 ? (
                      responseData?.map((item) => {
                        return (
                          <div className='outterAutocompletedropdown' key={item.id}>
                            <div
                              onClick={() => handelselectdata(item)} className='useralldata'
                            >
                              {item?.org_name}
                            </div>
                            <div className='separatorline'></div>
                          </div>
                        )
                      }
                      )
                    ) : (
                      <div>
                        {!showSearchdata && <div className='Not-Available-Drop-Down'>Not Available</div>}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="uploderinput">
                <label className="PeopleScreen-lables" htmlFor="">
                  Source Description
                </label>
                {/* <span className="PeopleMandatoryfields">*</span> */}
                <LabelInput
                  onChange={(e) => {
                    const inputvalue = e?.target?.value;
                    setPeopleDetails({
                      ...PeopleDetails,
                      SourceDescription: inputvalue,
                    });
                  }}
                  value={PeopleDetails?.SourceDescription}
                />
              </div>
            </div>
            {/* <div className="Pepole-flex-container">
              <div className="People-child-container">
                <label htmlFor="" className="PeopleScreen-lables">
                  Address
                </label>
                <LabelInput
                  onChange={(e) => {
                    const inputvalue = e?.target?.value;
                    setPeopleDetails({
                      ...PeopleDetails,
                      Address: inputvalue,
                    });
                  }}
                  value={PeopleDetails?.Address}
                />
              </div>
              <div className="People-child-container">
                <label className="PeopleScreen-lables" htmlFor="">
                  Street
                </label>
                <LabelInput
                  onChange={(e) => {
                    const inputvalue = e?.target?.value;
                    setPeopleDetails({
                      ...PeopleDetails,
                      Street: inputvalue,
                    });
                  }}
                  value={PeopleDetails?.Street}
                />
              </div>
            </div> */}
            <div className="Pepole-flex-container">
              <div className="People-child-container">
                <label className="PeopleScreen-lables" htmlFor="">
                  City
                </label>
                {/* <span className="PeopleMandatoryfields">*</span> */}

                <LabelInput
                  onChange={(e) => {
                    const inputvalue = e?.target?.value;
                    setPeopleDetails({
                      ...PeopleDetails,
                      City: inputvalue,
                    });
                  }}
                  value={PeopleDetails?.City}
                />
              </div>
              <div className="People-child-container">
                <label htmlFor="" className="PeopleScreen-lables">
                  State
                </label>
                <LabelInput
                  onChange={(e) => {
                    const inputvalue = e?.target?.value;
                    setPeopleDetails({
                      ...PeopleDetails,
                      State: inputvalue,
                    });
                  }}
                  value={PeopleDetails?.State}
                />
              </div>
            </div>

            <div className="Pepole-flex-container">
              <div className="People-child-container">
                <label htmlFor="" className="PeopleScreen-lables">
                  Country
                </label>
                <LabelInput
                  onChange={(e) => {
                    const inputvalue = e?.target?.value;
                    setPeopleDetails({
                      ...PeopleDetails,
                      Country: inputvalue,
                    });
                  }}
                  value={PeopleDetails?.Country}
                />
              </div>
              <div className="People-child-container">
                <label className="PeopleScreen-lables" htmlFor="">
                  zip
                </label>
                <LabelInput
                  onChange={(e) => {
                    const inputvalue = e?.target?.value;
                    setPeopleDetails({
                      ...PeopleDetails,
                      Zip: inputvalue,
                    });
                  }}
                  value={PeopleDetails?.Zip}
                />
              </div>
            </div>

            {/* <div className="Pepole-flex-container">
              <div className="People-child-container">
                <label htmlFor="" className="PeopleScreen-lables">
                  Facebook
                </label>
                <LabelInput
                  onChange={(e) => {
                    const inputvalue = e?.target?.value;
                    setPeopleDetails({
                      ...PeopleDetails,
                      Address: inputvalue,
                    });
                  }}
                  value={PeopleDetails?.Facebook}
                />
              </div>
              <div className="People-child-container">
                <label className="PeopleScreen-lables" htmlFor="">
                  Twitter
                </label>
                <LabelInput
                  onChange={(e) => {
                    const inputvalue = e?.target?.value;
                    setPeopleDetails({
                      ...PeopleDetails,
                      City: inputvalue,
                    });
                  }}
                  value={PeopleDetails?.Twitter}
                />
              </div>
            </div> */}

            <div className="Pepole-flex-container">
              <div className="People-child-container">
                <label htmlFor="" className="PeopleScreen-lables">
                  Org linkedin
                </label>
                <LabelInput
                  onChange={(e) => {
                    const inputvalue = e?.target?.value;
                    setPeopleDetails({
                      ...PeopleDetails,
                      Orglinkedin: inputvalue,
                    });
                  }}
                  value={PeopleDetails?.Orglinkedin}
                />
              </div>
              {/* <div className="People-child-container">
                <label className="PeopleScreen-lables" htmlFor="">
                  Died On
                </label>
                <LabelInput
                  onChange={(e) => {
                    const inputvalue = e?.target?.value;
                    setPeopleDetails({
                      ...PeopleDetails,
                      DiedOn: inputvalue,
                    });
                  }}
                  value={PeopleDetails?.DiedOn}
                />
              </div> */}
              <div className="People-child-container">
                <label className="PeopleScreen-lables" htmlFor="">
                  Position End date
                </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    className="Position-end-date"
                    // value={dayjs(unixTimestamp)}
                    // disabled={prefilledData?.last_funding_at_from || prefilledData}
                    onChange={dateFromHandler}
                    renderInput={(params) => (
                      <TextField placeholder="" {...params} />
                    )}
                  />
                </LocalizationProvider>
              </div>
            </div>
            <div className="Pepole-flex-container">

              {/* <div className="People-child-container">
                <label htmlFor="" className="PeopleScreen-lables">
                  Org Permalink
                </label>
                <LabelInput
                  onChange={(e) => {
                    const inputvalue = e?.target?.value;
                    setPeopleDetails({
                      ...PeopleDetails,
                      Address: inputvalue,
                    });
                  }}
                  value={PeopleDetails?.Facebook}
                />
              </div> */}
              <div className="People-child-container">
                <label className="PeopleScreen-lables" htmlFor="">
                  Status
                </label>
                <span className="PeopleMandatoryfields">*</span>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    placeholder="Select Status"
                    className="ContactUsScreen-dropdown"
                    onChange={(e) => {
                      const inputvalue = e?.target?.value;
                      setPeopleDetails({
                        ...PeopleDetails,
                        Status: inputvalue,
                      });
                    }}
                    value={PeopleDetails?.Status}
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

              <div className="People-child-container">
                <label cl htmlFor="" className="PeopleScreen-lables">
                  Comment
                </label>
                <div className="PeopleTextarea">
                  <Textarea
                    className="PeopleScreen-lables-text-field-area"
                    value={PeopleDetails?.Comments}
                    aria-label="minimum height"
                    minRows={3}
                    onChange={(e) => {
                      const inputvalue = e?.target?.value;
                      setPeopleDetails({
                        ...PeopleDetails,
                        Comments: inputvalue,
                      });
                    }}
                  />
                </div>
              </div>


            </div>

            {/* <div className="Pepole-flex-container">

              <div className="People-child-container">
                <label className="PeopleScreen-lables" htmlFor="">
                  Action
                </label>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    className="ContactUsScreen-dropdown"
                    placeholder="Select Action"
                    onChange={(e) => {
                      const inputvalue = e?.target?.value;
                      setPeopleDetails({
                        ...PeopleDetails,
                        action: inputvalue,
                      });
                    }}
                    value={PeopleDetails?.action}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem disabled value="">
                      <em className="SelectAction-css">Select Action</em>
                    </MenuItem>
                    {PeopleAction?.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
            </div> */}
            {/* <div className="Pepole-flex-container"></div>
            <div className="People-child-container">
              <label cl htmlFor="" className="PeopleScreen-lables">
                Comment
              </label>
              <div className="PeopleTextarea">
                <Textarea
                  className="PeopleScreen-lables-text-field-area"
                  value={PeopleDetails?.Comments}
                  aria-label="minimum height"
                  minRows={3}
                  onChange={(e) => {
                    const inputvalue = e?.target?.value;
                    setPeopleDetails({
                      ...PeopleDetails,
                      Comments: inputvalue,
                    });
                  }}
                />
              </div>
            </div> */}
            <div className="SUBMITbutton-div">
              {
                peopleData?.first_name ?
                  <Stack spacing={2} direction="row">
                    <Button
                      className="People-SUBMIT-button"
                      variant="contained"
                      onClick={handleEditRecords}
                    >
                      <SaveAltTwoToneIcon />
                      Update
                    </Button>
                  </Stack> : <Stack spacing={2} direction="row">
                    <Button
                      className="People-SUBMIT-button"
                      variant="contained"
                      onClick={handelApplyRecords}
                    >
                      <SaveAltTwoToneIcon />
                      SUBMIT
                    </Button>
                  </Stack>
              }
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
