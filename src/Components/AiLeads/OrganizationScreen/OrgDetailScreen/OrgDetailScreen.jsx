import * as React from "react";
import "./Style.css";
import callImg from "../../../../Assets/call.svg";
import LoctionImg from "../../../../Assets/loction.svg";
import userprofile from "../../../../Assets/user.svg";
import GrowIcons from "../../../../Assets/grow.svg";
import Companyimg from "../../../../Assets/company.svg";
import GlobalImg from "../../../../Assets/Globe.svg";
import IndustryImage from "../../../../Assets/office-building.png";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LinkOffIcon from '@mui/icons-material/LinkOff';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import SourceIcon from '@mui/icons-material/Source';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
export default function OrgDetailsScreen({
}) {
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
 
  return (
    <>
     
      <section className="OrgDetail-main-container">
        <div className=" CompanyProfile-outter-container">
          <div className="OrgDetailsScreen-flex-container">
            <div className="OrgDetailsScreen-flex-outter-container">
              <div className="CompanyProfile-img">
                <img
                  src={IndustryImage}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <div>
             <h3 className="OrgDetails-username"> Bright PowerNew</h3>
             <div className="CompanyProfile-content">
              <img
                    className="CompanyProfile-icons"
                    src={GlobalImg}
                    alt=""
                  />                <p className="industry-mentions">
                website url -  
                http://www.zygo.com
                </p>
              </div>
                <div className="CompanyProfile-content">
            <PersonIcon className="SetMui-icons"/>
               <p>Legal Name -</p>
               <p>Bright PowerNew</p>
                </div>
                <div className="CompanyProfile-content">
                  <img className="CompanyProfile-icons" src={callImg} alt="" />
                  <p> Phone No -</p>
                  <p>64884597254</p>
                </div>
                <div className="CompanyProfile-content">
                  <img
                    className="CompanyProfile-icons"
                    src={LoctionImg}
                    alt=""
                  />
                  <p>Location -</p>
                <p>india, chandigarh , chandigarh</p>
                </div>
                <div className="CompanyProfile-content">
                <LinkOffIcon  className="SetMui-icons"/>
                <p>permalink -</p>
                <p>zygo-corporation</p>
                </div>
                <div className="CompanyProfile-content">
                <WorkHistoryIcon className="SetMui-icons"/>
                <p>validation status -</p>
                <p>zygo-corporation</p>
                </div>
              
              </div>
            </div>
            <div className="">
            <div className="CompanyProfile-content">
                <CategoryRoundedIcon  className="SetMui-icons"/>
                <p>categories -</p>
                <p>information services </p>
                </div>
              <div className="CompanyProfile-content">
                {/* <img className="CompanyProfile-icons" src={callImg} alt="" /> */}
                <LinkedInIcon className="CompanyProfile-icons ai-score-icon" />
                <p>
                Linkedin - {""}
                www.linkedin.com
                </p>
              </div>
              <div className="CompanyProfile-content">
                <img
                  className="CompanyProfile-icons"
                  src={userprofile}
                  alt=""
                />
                <p>
                num employees-{" "}
                10K+
                </p>
              </div>
              <div className="CompanyProfile-content">
                <img className="CompanyProfile-icons" src={GrowIcons} alt="" />
                <p>
                revenue_range -{" "}
                10M
                </p>
              </div>
              <div className="CompanyProfile-content">
            <SourceIcon className="SetMui-icons"/>
                <p className="industry-mentions">
                source -  
                crunchbase
                </p>
              </div>
          
              
              <div className="CompanyProfile-content">
                <DescriptionIcon  className="SetMui-icons"/>
                <p>source description -</p>
                <p>Lorem ipsum dolor sit amet. </p>
                </div>
                <div className="CompanyProfile-content">
                <InsertCommentIcon  className="SetMui-icons"/>
                <p>comments -</p>
                <p>Lorem ipsum dolor sit amet. </p>
                </div>
            </div>
          </div>
          <div className="Orgdetail-infomation-main">
            <div>
              <Accordion defaultExpanded>
                <AccordionSummary
                  expandIcon={<KeyboardArrowDownIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  <Typography>description</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="CompanyProfile-infomation">
                    <p className="industry-mentions">
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti eum dolorem facere incidunt voluptates in quibusdam quia ea architecto est minus a vero excepturi sequi ducimus, omnis deserunt fugiat accusamus.
                    </p>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}