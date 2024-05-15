import * as React from "react";
import "./Style.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import StarIcon from "@mui/icons-material/Star";
import { AI_PROFILE_FORM_TABLE, AI_PROSPECT_PROFILE } from "../../Utils/Constants";
import { useNavigate } from "react-router-dom";
export default function DefaultProfile({ leadsProfileData, decisionMakerData }) {
  const [filterLeadData, setFilterLeadData] = React.useState([]);
  const [filterDecisionMaker, setFilterDecisionMaker] = React.useState([]);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (leadsProfileData || decisionMakerData) {
      const dataFilter = leadsProfileData?.filter((item) => item?.default === true);
      setFilterLeadData(dataFilter);
      const dataFilterDecision = decisionMakerData?.filter((item) => item?.default === true);
      setFilterDecisionMaker(dataFilterDecision);
    }
  }, [leadsProfileData, decisionMakerData])

  return (
    <>
      {
        filterLeadData?.length || filterDecisionMaker?.length ?
          <div className="main-sidebar-pages-and-addsearch-data">
            <div className="default-profile-star-functionality">
              <div className="text-for-start-functionality-icon">
                <p className="default-profile-text-sidebar">Default profiles</p>
                <p className="shortcut-profile-text-sidebar">
                  Shortcut to your saved AI profiles
                </p>
              </div>
              <div className="lists-of-add-search-star">
                {filterLeadData.map((item, index) => (
                  <List key={index} className="list-sidebar-leads-prospect">
                    <ListItem className="list-main-for-add-star-item">
                      <ListItemButton className="star-funciton-list-item-button" onClick={() => navigate(AI_PROFILE_FORM_TABLE, { state: item })}>
                        <ListItemIcon className="start-function-icon">
                          <StarIcon />
                        </ListItemIcon>
                        <ListItemText>
                          <p className="star-functionality-text">{item.name}</p>
                        </ListItemText>
                      </ListItemButton>
                    </ListItem>
                  </List>
                ))}
                {filterDecisionMaker?.map((item, index) => (
                  <List className="list-sidebar-leads-prospect">
                    <ListItem className="list-main-for-add-star-item">
                      <ListItemButton className="star-funciton-list-item-button" onClick={() => navigate(AI_PROSPECT_PROFILE, { state: item })}>
                        <ListItemIcon className="start-function-icon">
                          <StarIcon />
                        </ListItemIcon>
                        <ListItemText>
                          <p className="star-functionality-text">{item?.name}</p>
                        </ListItemText>
                      </ListItemButton>
                    </ListItem>
                  </List>
                ))}
              </div>
            </div>
          </div> : null
      }
    </>
  );
}