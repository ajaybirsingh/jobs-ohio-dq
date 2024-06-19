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
import { AI_DECISION_MAKER, ORG_DETAILS } from "../../Utils/Constants";
import moment from "moment/moment";
import dayjs from "dayjs";
import country from "../../Components/Json/Location/Locations.json";
import statesData from "../../Components/Json/Location/AllStates.json"
export default function PeopleScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const peopleData = location?.state?.data;
  const AllstatesData = statesData;
  const countryData = country;
  const PrefilledData = location?.state?.data;
  const isOrgDetails = location?.state?.isOrganizationScreen;
  const [showSearchdata, setshowSearchdata] = React.useState(false);
  const [responseData, setResponseData] = React.useState(null);
  const [selectedOrganization, setSelectedOrganization] = React.useState('');
  const [actionData, setActionData] = React.useState([]);
  const [FilteredData,setFilteredData]=React.useState([])



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
    uuid: "",
    Permalink: ""
  });
  React.useEffect(() => {
    const filter = AllstatesData?.find((item) => item?.Name === PeopleDetails.Country);
    setFilteredData(filter?.stateName);
  }, [AllstatesData, PeopleDetails.Country]);

  
  const [dropDownData, setDropDownData] = React.useState([]);
  const formatedDate = moment(peopleData?.position_end_date).format("YYYY-MM-DD");
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
        Status: peopleData?.validation_status,
        uuid: peopleData?.uuid,
        Permalink: peopleData?.org_permalink
      })
    }
  }, [peopleData])


  React.useEffect(() => {
    if (PrefilledData?.first_name) {
      setPeopleDetails({
        firstName: PrefilledData?.first_name,
        lastName: PrefilledData?.last_name,
        email: PrefilledData?.email,
        PhoneNo: PrefilledData?.phone_no,
        Linkedin: PrefilledData?.linkedin,
        JobTitle: PrefilledData?.primary_job_title,
        Oraganization: PrefilledData?.primary_organization,
        SourceDescription: PrefilledData?.source_description,
        City: PrefilledData?.city,
        State: PrefilledData?.state,
        Country: PrefilledData?.country,
        Zip: PrefilledData?.zip_code,
        Orglinkedin: PrefilledData?.organization_linkedin_username,
        PositionEndDate: formatedDate,
        Comments: PrefilledData?.comments,
        Status: PrefilledData?.validation_status,
        uuid: PrefilledData?.uuid,
        Permalink: peopleData?.org_permalink
      })
    }
  }, [peopleData])

  // need to share this useEffect
  React.useEffect(() => {
    if (peopleData?.orgDetails === true) {
      setPeopleDetails({
        Oraganization: peopleData?.name || peopleData?.name,
        Orglinkedin: peopleData?.linkedin,
        uuid: peopleData?.uuid,
        Permalink: peopleData?.permalink
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
    if (!selectedOrganization?.org_name && !PeopleDetails?.Oraganization) {
      toast.error("Please Select Organization");
      return false;
    }
    if (!PeopleDetails.Orglinkedin) {
      toast.error("Please Enter Orglinkedin");
      return false;
    }
    if (!PeopleDetails?.Status) {
      toast.error("Please Select Status");
      return false
    }
    return true;
  };
  const removeQuotes = (str) => {
    if (str.startsWith('"') && str.endsWith('"')) {
      return str.slice(1, -1);
    }
    return str;
  };
  const userId = GetUserId();
  const userIdWithoutQuotes = removeQuotes(userId);

  const handelApplyRecords = () => {
    if (!validateFields()) return;
    setLoading(true);
    const data =
    {
      records: [
        {
          uuid: null,
          first_name: PeopleDetails?.firstName,
          last_name: PeopleDetails?.lastName,
          linkedin: PeopleDetails?.Linkedin,
          primary_job_title: PeopleDetails?.JobTitle,
          primary_organization: selectedOrganization?.org_name || PeopleDetails?.Oraganization,
          organization_linkedin_username: PeopleDetails?.Orglinkedin ? PeopleDetails?.Orglinkedin : null,
          person_id: null,
          org_permalink: PeopleDetails?.Permalink ? PeopleDetails?.Permalink : null,
          middle_name: null,
          email: PeopleDetails?.email ? PeopleDetails?.email : null,
          phone_no: PeopleDetails?.PhoneNo ? PeopleDetails?.PhoneNo : null,
          city: PeopleDetails?.City ? PeopleDetails?.City : null, 
          state: PeopleDetails?.State ? PeopleDetails?.State : null,
          country: PeopleDetails?.Country ? PeopleDetails?.Country : null,
          zip_code: PeopleDetails?.Zip ? PeopleDetails?.Zip : null,
          position_end_date: PeopleDetails?.PositionEndDate ? PeopleDetails?.PositionEndDate : null,
          comments: PeopleDetails?.Comments ? PeopleDetails?.Comments : null,
          source: null,
          source_description: PeopleDetails?.SourceDescription ? PeopleDetails?.SourceDescription : null,
          validation_status: PeopleDetails?.Status ? PeopleDetails?.Status : null,
          action: "",
          user_id: userIdWithoutQuotes,
          updated_at: new Date().toISOString().slice(0, 10),
          position_start_date: null
        }
      ]
    }

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
    const data =
    {
      records: [
        {
          uuid: PeopleDetails?.uuid,
          first_name: PeopleDetails?.firstName,
          last_name: PeopleDetails?.lastName,
          linkedin: PeopleDetails?.Linkedin,
          primary_job_title: PeopleDetails?.JobTitle,
          primary_organization: PeopleDetails?.Oraganization,
          organization_linkedin_username: PeopleDetails?.Orglinkedin ? PeopleDetails?.Orglinkedin : "",
          person_id: peopleData?.person_id,
          org_permalink: PeopleDetails?.Permalink ? PeopleDetails?.Permalink : null,
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
          user_id: userIdWithoutQuotes,
          updated_at: new Date().toISOString().slice(0, 10),
          position_start_date: null
        }
      ]
    }
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
          if (isOrgDetails) {
            navigate(ORG_DETAILS, { state: PrefilledData?.orgData })
          } else {
            navigate(AI_DECISION_MAKER);
          }
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

  const OrgSearch = () => {
    setLoading(true)
    const data = { org_name: PeopleDetails.Oraganization };
    axios
      .post(`${APIUrlFour()}/v1/org_search`, data, {
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
        setshowSearchdata(false);
        toast.error(error.response.data.message);
      });
  };
  React.useEffect(() => {
    setshowSearchdata(false);
    let timer;
  
    if (PeopleDetails?.Oraganization?.length > 2 && responseData === null) {
      timer = setTimeout(() => {
        OrgSearch();
      }, 800);
      setshowSearchdata(false)
    }
    if (PeopleDetails?.Oraganization?.length === 0) {
      setResponseData(null);
   }
    return () => clearTimeout(timer);
  }, [PeopleDetails.Oraganization]);
  // React.useEffect(() => {
  //   setshowSearchdata(false);
  //   let timer;
  //   if (PeopleDetails.Oraganization?.length > 2) {
  //     timer = setTimeout(() => {
  //       OrgSearch();
  //     }, 1000);
  //     setshowSearchdata(false)
  //   }
  //   return () => clearTimeout(timer);
  // }, [PeopleDetails.Oraganization]);
  // const handelselectdata = (item) => {
  //   setSelectedOrganization(item);
  //   setshowSearchdata(false)
  //   setPeopleDetails(prevState => ({
  //     ...prevState,
  //     Oraganization: item?.org_name || ""
  //   }));
  //   setshowSearchdata(false)
  // };
  const handelselectdata = (item) => {
    setSelectedOrganization(item);
    setPeopleDetails(prevState => ({
      ...prevState,
      Oraganization: item?.org_name || ""
    }));
    setshowSearchdata(false);
    // setIsSelected(true);s
  }
  // React.useEffect(() => {
  //   if (responseData?.length <= 1 || PrefilledData) {
  //     setshowSearchdata(false);
  //   } if (responseData?.length > 1) {
  //     setshowSearchdata(true)
  //   }
  // }, [responseData])

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
  React.useEffect(() => {
    DropDownsData();
  }, [])
  const states = PeopleDetails?.Country === 'United States' ? dropDownData?.state : dropDownData?.ca_states;
  return (
    <>
      {loading ? <Loader /> : null}
      <section className="PeopleScreen-main-container">
        <div className="Peoplescreen-heading">
          <h3>People Records </h3>
          {/* <p>You are welcome to People Records the JOI AI Team</p> */}
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
            <div className="Pepole-flex-container">
              {/* <div className="SetCoustom-drop-down">

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
              </div> */}
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
                {showSearchdata && (
                  <div className={responseData && responseData?.length ? "Dropdown-forPeople-screen" : ""}
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
                        {showSearchdata && <div className='Not-Available-Drop-Down'>Not Available</div>}
                      </div>
                    )}
                  </div>
                )}

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
            </div>

            <div className="Pepole-flex-container">

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
                      setPeopleDetails({
                        ...PeopleDetails,
                        Country: inputvalue,
                      });
                    }}
                    value={PeopleDetails.Country}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem disabled value="" className="disable-menu-action">
                      <em className="SelectAction-css"> Select Country</em>
                    </MenuItem>
                    {countryData?.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item?.name}>
                          {item?.name}
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
                      setPeopleDetails({
                        ...PeopleDetails,
                        State: inputvalue,
                      });
                    }}
                    value={PeopleDetails?.State}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem disabled value="" className="disable-menu-action">
                      <em className="SelectAction-css"> Select State</em>
                    </MenuItem>

         
                    {FilteredData?.map((item, index) => {
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

            <div className="Pepole-flex-container">
              <div className="People-child-container">
                <label className="PeopleScreen-lables" htmlFor="">
                  City
                </label>

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
            <div className="Pepole-flex-container">
              <div className="People-child-container">
                <label htmlFor="" className="PeopleScreen-lables">
                  Org linkedin
                </label>
                <span className="PeopleMandatoryfields">*</span>
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

              <div className="People-child-container">
                <label className="PeopleScreen-lables" htmlFor="">
                  Position End date
                </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    className="Position-end-date"

                    onChange={dateFromHandler}
                    value={PeopleDetails?.PositionEndDate ? dayjs(PeopleDetails?.PositionEndDate) : ''}
                    renderInput={(params) => (
                      <TextField placeholder="" {...params} />
                    )}
                  />
                </LocalizationProvider>


              </div>
            </div>
            <div className="Pepole-flex-container">
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
