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
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { Link, useLocation, useNavigate } from "react-router-dom";
import HeaderSearch from "../Header/Search/Search";
import AIIcon from "../../Assets/AIIcon.svg";
import AlleadsSelected from "../../Assets/AlleadsSelected.svg";
import backarrow from "../../Assets/backarrow.svg";
import { alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import JobsLogo from "../../Assets/JobsOhioLogo.jpeg";
import {
  AI_DECISION_MAKER,
  AI_PATH,
  AI_PROFILE,
  AI_PROFILE_FORM_TABLE,
  AI_PROSPECT_PROFILE,
  COMING_SOON,
  COMPANY_PROFILE_SCREEN,
  CONTACT_US,
  FAQ_SCREEN,
  JOI_TRAINING,
  ORGANIZATION,
  ORG_DETAILS,
  PEOPLE_RECORDS,
} from "../../Utils/Constants";
import { useOktaAuth } from "@okta/okta-react";
import { APIUrlFour, APIUrlOne, GetOktaAuthData, GetUserId } from "../../Utils/Utils";
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
  setRefStatenew,
}) {
  const navigate = useNavigate();
  const getAuthData = GetOktaAuthData();
  const location = useLocation();
  const stateData = location?.state?.data;
  const checkOrgDetails = location?.state?.data?.orgDetails;
  const [open, setOpen] = React.useState(true);
  const { oktaAuth } = useOktaAuth();
  const [headerSearchData, setheaderSearchData] = React.useState("");
  const [responseData, setResponseData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const removeQuotes = (str) => {
    if (str.startsWith('"') && str.endsWith('"')) {
      return str.slice(1, -1);
    }
    return str;
  };
  const userId = GetUserId();
  const userIdWithoutQuotes = removeQuotes(userId);
  const [leadsProfileData, setLeadsProfileData] = React.useState([]);
  const [decisionMakerData, setDecisionMakerData] = React.useState([]);
  const [showSearchdata, setshowSearchdata] = React.useState(false);
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

  const handlesearch = () => {
    setLoading(true);
    const data = {
      org_name: headerSearchData,
    };

    axios
      .post(`${APIUrlFour()}/v1/org_search`, data, {
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

  const logoutHandler = () => {
    localStorage.clear();
    navigate('/')
  }
  const ClickToBack = () => {
    if (checkOrgDetails) {
      navigate(ORG_DETAILS, { state: stateData })
    }
    else {
      navigate(ORGANIZATION)
    }
  }
  return (
    <>
      <CssBaseline />
      {loading ? <Loader /> : null}

      <AppBar position="fixed" open={open} className={open ? "main-header" : "main-headernew"}>
        <Toolbar className="toolbar-header">
          {open ? (

            <DrawerHeader className="header-main">
              {window.location.pathname === ORG_DETAILS ? (
                <div>
                  <List>
                    <ListItem className="arrowbutton-item-list">
                      <ListItemButton
                        className="backarrow-list-button"
                        onClick={() => navigate(ORGANIZATION)}
                      >
                        <div className="backarrow-header-main">
                          <img src={backarrow} alt="" />
                        </div>
                      </ListItemButton>
                    </ListItem>
                  </List>
                </div>
              ) : window.location.pathname === PEOPLE_RECORDS ?
                <div>
                  <List>
                    <ListItem className="arrowbutton-item-list">
                      <ListItemButton
                        className="backarrow-list-button"
                        // onClick={() => navigate(ORGANIZATION)}
                        onClick={() => ClickToBack()}
                      >
                        <div className="backarrow-header-main">
                          <img src={backarrow} alt="" />
                        </div>
                      </ListItemButton>
                    </ListItem>
                  </List>
                </div> : null}

              <HeaderSearch
                showSearchdata={showSearchdata}
                headerSearchData={headerSearchData}
                setheaderSearchData={setheaderSearchData}
                responseData={responseData}
                handlesearch={handlesearch}
              />
            </DrawerHeader>

          ) : (
            <DrawerHeader className="header-main">
              {window.location.pathname === ORG_DETAILS ? (
                <div>
                  <List>
                    <ListItem className="arrowbutton-item-list">
                      <ListItemButton
                        className="backarrow-list-button"
                        onClick={() => navigate(ORGANIZATION)}
                      >
                        <div className="backarrow-header-main">
                          <img src={backarrow} alt="" />
                        </div>
                      </ListItemButton>
                    </ListItem>
                  </List>
                </div>
              ) : window.location.pathname === PEOPLE_RECORDS ?
                <div>
                  <List>
                    <ListItem className="arrowbutton-item-list">
                      <ListItemButton
                        className="backarrow-list-button"
                        // onClick={() => navigate(ORGANIZATION)}
                        onClick={() => ClickToBack()}
                      >
                        <div className="backarrow-header-main">
                          <img src={backarrow} alt="" />
                        </div>
                      </ListItemButton>
                    </ListItem>
                  </List>
                </div> : null}

              <HeaderSearch
                showSearchdata={showSearchdata}
                headerSearchData={headerSearchData}
                setheaderSearchData={setheaderSearchData}
                responseData={responseData}
                handlesearch={handlesearch}
              />



            </DrawerHeader>



          )}
          {/* <div className="bellicon-profileimage">
            <div className="image-and-information">
              <img src={userprofile} alt="logo" className="userprofile-image" />
              <div className="username-and-role">
                <p className="user-name-header">
                  {getAuthData?.user?.profile?.firstName}{" "}
                  {getAuthData?.user?.profile?.lastName}
                </p>
              </div>
            </div>
          </div> */}

          <IconButton
            className="Siderbarresponsivebutton"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          {
            userIdWithoutQuotes ? <button className="logout-button" onClick={() => logoutHandler()}>Logout</button> : null
          }

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
            <Link to={ORGANIZATION}>
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
            <List>
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                className="links-sidebar"
              >
                <ListItemButton
                  component={Link}
                  to={ORGANIZATION}
                  selected={window.location.pathname === ORGANIZATION}
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
                    {window.location.pathname === ORGANIZATION ? (
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
            </List>
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
          </div>
        </div>
      </Drawer>
    </>
  );
}