// import * as React from "react";
// import "./Style.css";
// import PropTypes from "prop-types";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
// import { createTheme } from "@mui/material";
// import { ThemeProvider } from "@emotion/react";
// import AddIcon from "@mui/icons-material/Add";
// import LeadsProfileTable from "../LeadsProfileTable/Index";
// import ProspectProfileTable from "../ProspectProfileTable/Index";
// import { useLocation, useNavigate } from "react-router-dom";
// import Stack from "@mui/material/Stack";
// import Button from "@mui/material/Button";
// import { AI_PROSPECT_PROFILE } from "../../../Utils/Constants";
// import { AI_PROFILE_FORM_TABLE } from "../../../Utils/Constants"
// function CustomTabPanel(props) {
//   const { children, value, index, ...other } = props;
//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }
// const theme = createTheme({
//   components: {
//     MuiTabs: {
//       styleOverrides: {
//         indicator: {
//           borderBottom: "2px solid red",
//         },
//       },
//     },
//   },
// });
// CustomTabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };
// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }
// export default function TabsAiProfile({ setRefState, setRefStatenew }) {
//   const location = useLocation()
//   const navigate = useNavigate();
//   const [value, setValue] = React.useState(0);
//   const handleChange = ( newValue) => {
//     setValue(newValue);
//   };

//   React.useEffect(() => {
//     if (location.state) {
//       setValue(location.state)
//     }
//   }, [])

//   return (
//     <Box sx={{ width: "100%" }} className="main-box-tabs">
//       <Box
//         sx={{ borderBottom: 1, borderColor: "divider" }}
//         className="inner-box-tabs">
//         <ThemeProvider theme={theme}>
//           <Tabs
//             value={value}
//             onChange={handleChange}
//             aria-label="basic tabs example"
//             className="main-tabs-decision-makers"
//           >
//             <Tab label="Lead Profiles" {...a11yProps(0)} />
//             <Tab label="Prospect  Profiles" {...a11yProps(1)} />
//             <Stack className="section-new-ai-lead">
//               <Button
//                 variant="text"
//                 onClick={() => {
//                   if (value === 0) {
//                     navigate(AI_PROFILE_FORM_TABLE);
//                   } else {
//                     navigate(AI_PROSPECT_PROFILE);
//                   }
//                 }}
//                 className="new-ai-lead-button-section-button"
//               >
//                 <div className="new-ai-lead-button-section">
//                   <AddIcon />
//                   <p
//                     className="text-ai-lead-button-section"
//                     style={{ textTransform: "none" }}
//                   >
//                     {value === 0
//                       ? "New AI lead profile"
//                       : "New Prospect profile"}
//                   </p>
//                 </div>
//               </Button>
//             </Stack>
//           </Tabs>
//         </ThemeProvider>
//       </Box>
//       <CustomTabPanel value={value} index={0}>
//         <LeadsProfileTable setRefState={setRefState} />
//       </CustomTabPanel>
//       <CustomTabPanel value={value} index={1}>
//         <ProspectProfileTable setRefStatenew={setRefStatenew} />
//       </CustomTabPanel>
//     </Box>
//   );
// }
import * as React from "react";
import "./Style.css";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import AddIcon from "@mui/icons-material/Add";
import LeadsProfileTable from "../LeadsProfileTable/Index";
import ProspectProfileTable from "../ProspectProfileTable/Index";
import { useLocation, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { AI_PROSPECT_PROFILE } from "../../../Utils/Constants";
import { AI_PROFILE_FORM_TABLE } from "../../../Utils/Constants"
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
const theme = createTheme({
  components: {
    MuiTabs: {
      styleOverrides: {
        indicator: {
          borderBottom: "2px solid red",
        },
      },
    },
  },
});
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function TabsAiProfile({ setRefState, setRefStatenew }) {
  const location = useLocation()
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  React.useEffect(() => {
    if (location.state) {
      setValue(location.state)
    }
  }, [])
  return (
    <Box sx={{ width: "100%" }} className="main-box-tabs">
      <Box
        sx={{ borderBottom: 1, borderColor: "divider" }}
        className="inner-box-tabs">
        <ThemeProvider theme={theme}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            className="main-tabs-decision-makers"
          >
            <Tab label="Lead Profiles" {...a11yProps(0)} />
            <Tab label="Prospect  Profiles" {...a11yProps(1)} />
            <Stack className="section-new-ai-lead">
              <Button
                variant="text"
                onClick={() => {
                  if (value === 0) {
                    navigate(AI_PROFILE_FORM_TABLE);
                  } else {
                    navigate(AI_PROSPECT_PROFILE);
                  }
                }}
                className="new-ai-lead-button-section-button"
              >
                <div className="new-ai-lead-button-section">
                  <AddIcon />
                  <p
                    className="text-ai-lead-button-section"
                    style={{ textTransform: "none" }}
                  >
                    {value === 0
                      ? "New AI lead profile"
                      : "New Prospect profile"}
                  </p>
                </div>
              </Button>
            </Stack>
          </Tabs>
        </ThemeProvider>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <LeadsProfileTable setRefState={setRefState} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ProspectProfileTable setRefStatenew={setRefStatenew} />
      </CustomTabPanel>
    </Box>
  );
}