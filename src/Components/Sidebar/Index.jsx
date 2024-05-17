import * as React from "react";
import "./Sidebar.css";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";
import HeaderSearch from "../Header/Search/Search";
import userprofile from "../../Assets/userIconPlaceholder.jpg";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import AIIcon from "../../Assets/AIIcon.svg";
import AlleadsSelected from "../../Assets/AlleadsSelected.svg";
import DefaultProfile from "../DefaultProfile/Index";
import backarrow from "../../Assets/backarrow.svg";
import pathai from "../../Assets/pathAi.svg";
import activeAipath from "../../Assets/activeAipath.svg";
import questionmarkicon from "../../../src/Assets/questionmarkicon.svg";
import bellalert from "../../../src/Assets/bellalert.svg";
import cellphone from "../../../src/Assets/cellphone.svg";
import cellphoneWhite from "../../../src/Assets/cellphone-white.svg";
import Button from "@mui/material/Button";
import { alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import bellalertwhite from "../../../src/Assets/bellalertwhite.svg";
import questionmarkiconwhite from "../../../src/Assets/questionmarkiconwhite.svg";
import JobsLogo from "../../Assets/JobsOhioLogo.jpeg"
import trainingCapRed from "../../Assets/graduation-cap-red.png";
import trainingCapWhite from "../../Assets/graduation-cap-white.png";
import {
  AI_DECISION_MAKER,
  AI_LEADS,
  AI_PATH,
  AI_PROFILE,
  AI_PROFILE_FORM_TABLE,
  AI_PROSPECT_PROFILE,
  COMING_SOON,
  COMPANY_PROFILE_SCREEN,
  CONTACT_US,
  FAQ_SCREEN,
  JOI_TRAINING,
} from "../../Utils/Constants";
import { useOktaAuth } from "@okta/okta-react";
import { APIUrlOne, GetOktaAuthData, GetUserId } from "../../Utils/Utils";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../Loader/Loader";

const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});
const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

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
export default function Sidebar({
  setRefState,
  refState,
  setRefStatenew,
  refStatenew,
}) {
  const navigate = useNavigate();
  const getAuthData = GetOktaAuthData();
  const [open, setOpen] = React.useState(true);
  const { oktaAuth } = useOktaAuth();
  const [headerSearchData, setheaderSearchData] = React.useState("");
  const [responseData, setResponseData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const userId = GetUserId();
  const [leadsProfileData, setLeadsProfileData] = React.useState([]);
  const [decisionMakerData, setDecisionMakerData] = React.useState([]);
  const [showSearchdata, setshowSearchdata] = React.useState(false);
  const [isLoadProfile, setIsLoadProfile] = React.useState(false);
  const [isStateNew, setIsStateNew] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(!open);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openLogout = Boolean(anchorEl);

  React.useEffect(() => {
    const handleClick = () => {
      setshowSearchdata(false);
      setheaderSearchData("");
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handlesearch = () => {
    setLoading(true);
    const data = {
      org_name: headerSearchData,
    };

    axios
      .post(`${APIUrlOne()}/v1/org_search`, data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setLoading(false);
          setshowSearchdata(true);
          setResponseData(response.data);
          toast.success(response.data.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.message);
      });
  };
  const LeadsProfile = () => {
    setLoading(true);
    const option = {
      method: "GET",
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json",
      },
      url: `${APIUrlOne()}/v1/get_filter_org?user_id=${userId}`,
    };
    axios(option)
      .then((e) => {
        setLoading(false);
        setLeadsProfileData(e?.data?.data);
        setRefState(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  // React.useEffect(() => {
  //   if (isLoadProfile) {
  //     if (userId || refState) {
  //       LeadsProfile();
  //     }
  //   } else {
  //     setIsLoadProfile(true);
  //   }

  // }, [userId, refState, isLoadProfile]);
  const decisionMakerProfile = () => {
    setLoading(true);
    const option = {
      method: "GET",
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json",
      },
      url: `${APIUrlOne()}/v1/get_filter_people?user_id=${userId}`,
    };
    axios(option)
      .then((e) => {
        setLoading(false);
        setDecisionMakerData(e?.data?.data);
        setRefStatenew(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  // React.useEffect(() => {
  //   if (isStateNew) {
  //     if (userId || refStatenew) {
  //       decisionMakerProfile();
  //     }
  //   } else {
  //     setIsStateNew(true);
  //   }
  // }, [userId, refStatenew, isStateNew]);

  const loggingOut = async () => {
    await oktaAuth.signOut({
      postLogoutRedirectUri: window.location.origin + "/",
      clearTokensBeforeRedirect: true,
    });
    localStorage.clear();
    sessionStorage.clear();
  };

  React.useEffect(() => {
    let timer;
    if (headerSearchData?.length > 2) {
      timer = setTimeout(() => {
        handlesearch();
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [headerSearchData]);

  return (
    <>
      <CssBaseline />
      {loading ? <Loader /> : null}

      <AppBar position="fixed" open={open} className={open ? "main-header" : "main-headernew"}>
        <Toolbar className="toolbar-header">
          {open ? (

            <DrawerHeader className="header-main">
              {window.location.pathname === AI_PROFILE_FORM_TABLE ||
                window.location.pathname === AI_PROSPECT_PROFILE ||
                window.location.pathname === COMPANY_PROFILE_SCREEN ? (
                <div>
                  <List>
                    <ListItem className="arrowbutton-item-list">
                      <ListItemButton
                        className="backarrow-list-button"
                        onClick={() => {
                          if (
                            window.location.pathname === COMPANY_PROFILE_SCREEN
                          ) {
                            navigate(AI_LEADS);
                          } else {
                            navigate(AI_PROFILE);
                          }
                        }}
                      >
                        <div className="backarrow-header-main">
                          <img src={backarrow} alt="" />
                        </div>
                      </ListItemButton>
                    </ListItem>
                  </List>
                </div>
              ) : null}

              <HeaderSearch
                showSearchdata={showSearchdata}
                headerSearchData={headerSearchData}
                setheaderSearchData={setheaderSearchData}
                responseData={responseData}
                handlesearch={handlesearch}
              />
            </DrawerHeader>

          ) : (<DrawerHeader className="header-main">
            {window.location.pathname === AI_PROFILE_FORM_TABLE ||
              window.location.pathname === AI_PROSPECT_PROFILE ||
              window.location.pathname === COMPANY_PROFILE_SCREEN ? (
              <div>
                <List>
                  <ListItem className="arrowbutton-item-list">
                    <ListItemButton
                      className="backarrow-list-button"
                      onClick={() => {
                        if (
                          window.location.pathname === COMPANY_PROFILE_SCREEN
                        ) {
                          navigate(AI_LEADS);
                        } else {
                          navigate(AI_PROFILE);
                        }
                      }}
                    >
                      <div className="backarrow-header-main">
                        <img src={backarrow} alt="" />
                      </div>
                    </ListItemButton>
                  </ListItem>
                </List>
              </div>
            ) : null}

            <HeaderSearch
              showSearchdata={showSearchdata}
              headerSearchData={headerSearchData}
              setheaderSearchData={setheaderSearchData}
              responseData={responseData}
              handlesearch={handlesearch}
            />
          </DrawerHeader>



          )}
          <div className="bellicon-profileimage">
            <div className="image-and-information">
              <img src={userprofile} alt="logo" className="userprofile-image" />
              <div className="username-and-role">
                <p className="user-name-header">
                  {getAuthData?.user?.profile?.firstName}{" "}
                  {getAuthData?.user?.profile?.lastName}
                </p>
              </div>
            </div>
            <div className="Leades-filter-inner-container-header">
              <Button
                style={{ textTransform: "none" }}
                id="action-button"
                aria-controls={openLogout ? "action-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openLogout ? "true" : undefined}
                variant="contained"
                disableElevation
                onClick={handleMenuClick}
                endIcon={
                  <ExpandMoreOutlinedIcon className="down-arrow-header" />
                }
              ></Button>
              <StyledMenu
                className="custom-menu"
                id="action-menu"
                MenuListProps={{
                  "aria-labelledby": "action-button",
                }}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <div>
                  <MenuItem
                    className="AI-Leads-button-drop-down-up-header"
                    onClick={handleMenuClose}
                    disableRipple
                  >

                    <p
                      className="push-to-slaesforce-in-button"
                      onClick={() => loggingOut()}
                    >
                      {" "}
                      Logout{" "}
                    </p>
                  </MenuItem>
                </div>
              </StyledMenu>
            </div>
          </div>

          <IconButton
            className="Siderbarresponsivebutton"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>

      </AppBar>
      <Drawer className={open ? "mobileresponsiveMaincsss" : "mobileresponsiveMaincsssnew"} variant="permanent" open={open}>
        <DrawerHeader className={`${open ? "header-section-sidebar" : ""}`}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link to={'/dashboard'}>
              <img
                src={JobsLogo}
                alt="logo"
                className="logo-image-of-the-project"
              />
            </Link>
          </div>

        </DrawerHeader>
        <Divider />
        <div className="main-sidebar-pages-and-addsearch-data">
          <div
            className={`all-sidebar-listitems ${leadsProfileData?.filter((item) => item?.default == true)
              .length ||
              decisionMakerData?.filter((item) => item?.default == true).length
              ? "all-sidebar-listitems sidebar-scrolling"
              : null
              }`}
          >
            {/* <List>
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                className="links-sidebar"
              >
                <ListItemButton
                  component={Link}
                  to="/dashboard"
                  selected={window.location.pathname === "/dashboard"}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <ExploreOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Dashboard"}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </List> */}
            {/* <List>
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                className="links-sidebar"
              >
                <ListItemButton
                  component={Link}
                  to={AI_LEADS}
                  selected={window.location.pathname === AI_LEADS}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {window.location.pathname === AI_LEADS ? (
                      <img src={AlleadsSelected} alt="" />
                    ) : (
                      <img src={AIIcon} alt="" />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={"Organization"}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </List> */}
            <List>
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                className="links-sidebar"
              >
                <ListItemButton
                  component={Link}
                  to={AI_DECISION_MAKER}
                  selected={window.location.pathname === AI_DECISION_MAKER}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <PeopleAltOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={"People"}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
            {/* <List>
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                className="links-sidebar"
              >
                <ListItemButton
                  component={Link}
                  to={AI_PATH}
                  selected={window.location.pathname === AI_PATH}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {window.location.pathname === AI_PATH ? (
                      <img src={activeAipath} alt="" />
                    ) : (
                      <img src={pathai} alt="" />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={"AI Path"}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </List>

            <List>
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                className="links-sidebar"
              >
                <ListItemButton
                  component={Link}
                  to={AI_PROFILE}
                  selected={window.location.pathname === AI_PROFILE}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <AccountCircleOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={"AI Profile"}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
            <List>
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                className="links-sidebar"
              >
                <ListItemButton
                  component={Link}
                  to={FAQ_SCREEN}
                  selected={window.location.pathname === FAQ_SCREEN}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {window.location.pathname === FAQ_SCREEN ? (
                      <img src={questionmarkiconwhite} alt="" />
                    ) : (
                      <img src={questionmarkicon} alt="" />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={"FAQ / Glossary"}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </List>

            <List>
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                className="links-sidebar"
              >
                <ListItemButton
                  component={Link}
                  to={JOI_TRAINING}
                  selected={window.location.pathname === JOI_TRAINING}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {window.location.pathname === JOI_TRAINING ? (
                      <img src={trainingCapWhite} alt="" className="training-cap-icon" />
                    ) : (
                      <img src={trainingCapRed} alt="" className="training-cap-icon" />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={"JOI Training"}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </List>


            <List>
              <ListItem
                disablePadding
                to
                sx={{ display: "block" }}
                className="links-sidebar"
              >
                <ListItemButton
                  to={COMING_SOON}
                  component={Link}
                  selected={window.location.pathname === COMING_SOON}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {window.location.pathname === COMING_SOON ? (
                      <img src={bellalertwhite} alt="" />
                    ) : (
                      <img src={bellalert} alt="" />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={"Special Request"}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
            <List>
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                className="links-sidebar"
              >
                <ListItemButton
                  component={Link}
                  to={CONTACT_US}
                  selected={window.location.pathname === CONTACT_US}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {window.location.pathname === CONTACT_US ? (
                      <img src={cellphoneWhite} alt="" />
                    ) : (
                      <img src={cellphone} alt="" />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={"Contact Us"}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </List> */}
          </div>
          {/* <div className="default-profile-box">
            {leadsProfileData || decisionMakerData ? (
              <DefaultProfile
                leadsProfileData={leadsProfileData}
                decisionMakerData={decisionMakerData}
                refState={refState}
                setRefState={setRefState}
                setRefStatenew={setRefStatenew}
                refStatenew={refStatenew}
              />
            ) : null}
          </div> */}
        </div>
      </Drawer>
    </>
  );
}