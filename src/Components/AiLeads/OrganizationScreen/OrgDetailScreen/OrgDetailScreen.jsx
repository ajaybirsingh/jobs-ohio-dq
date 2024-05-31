import * as React from "react";
import "./Style.css";
import callImg from "../../../../Assets/call.svg";
import LoctionImg from "../../../../Assets/loction.svg";
import userprofile from "../../../../Assets/user.svg";
import GrowIcons from "../../../../Assets/grow.svg";
import GlobalImg from "../../../../Assets/Globe.svg";
import IndustryImage from "../../../../Assets/office-building.png";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import SourceIcon from "@mui/icons-material/Source";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import { useLocation, useNavigate } from "react-router-dom";
import ApprovalIcon from "@mui/icons-material/Approval";
import AssignmentIcon from "@mui/icons-material/Assignment";
import NoteIcon from "@mui/icons-material/Note";
import FilterIcon from '@mui/icons-material/Filter';
import EmailIcon from '@mui/icons-material/Email';
import MarkunreadSharpIcon from '@mui/icons-material/MarkunreadSharp';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { ORGANIZATION_RECORDS } from "../../../../Utils/Constants";
export default function OrgDetailsScreen({ organizationData }) {
  const location = useLocation();
  const navigate = useNavigate();
  const orgData = organizationData || location?.state;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const formattedOrgCount = new Intl.NumberFormat().format(orgData?.last_funding_total);
  const EditOrg = (orgData) => {
    navigate(ORGANIZATION_RECORDS, { state: {data: orgData, isOrgDetails: window.location.pathname === '/OrgDetails' }})
  }
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
                <h3 className="OrgDetails-username">
                  {orgData?.name ? orgData?.name : "-"}
                </h3>
                <div className="CompanyProfile-content">
                  <img
                    className="CompanyProfile-icons"
                    src={GlobalImg}
                    alt=""
                  />{" "}
                  <p className="industry-mentions">
                    website url -{" "}
                    <a
                      href={orgData?.website_url}
                      target="_blank"
                      className="website-url-link"
                    >
                      {orgData?.website_url}
                    </a>
                  </p>
                </div>
                <div className="CompanyProfile-content">
                  <PersonIcon className="SetMui-icons" />
                  <p>Legal Name -</p>
                  <p>{orgData?.legal_name ? orgData?.legal_name : "-"}</p>
                </div>
                <div className="CompanyProfile-content">
                  <img className="CompanyProfile-icons" src={callImg} alt="" />
                  <p> Phone No -</p>
                  <p>{orgData?.phone_number ? orgData?.phone_number : "-"}</p>
                </div>
                <div className="CompanyProfile-content">
                  <MarkunreadSharpIcon className="SetMui-icons" />
                  <p>  Email -</p>
                  <p>{orgData?.contact_email ? orgData?.contact_email : "-"}</p>
                </div>
                <div className="CompanyProfile-content">
                  <img
                    className="CompanyProfile-icons"
                    src={LoctionImg}
                    alt=""
                  />
                  <p>Location -</p>
                  <p>
                    {orgData?.city ? orgData?.city : null},
                    {orgData?.street ? orgData?.street : null},{" "}
                    {orgData?.state ? orgData?.state : null},{" "}
                    {orgData?.country ? orgData?.country : null}
                  </p>
                </div>
                <div className="CompanyProfile-content">
                  <LinkOffIcon className="SetMui-icons" />
                  <p>permalink -</p>
                  <p>{orgData?.permalink ? orgData?.permalink : "-"}</p>
                </div>
                <div className="CompanyProfile-content">
                  <WorkHistoryIcon className="SetMui-icons" />
                  <p>validation status -</p>
                  <p>
                    {orgData?.validation_status
                      ? orgData?.validation_status
                      : "-"}
                  </p>
                </div>
                <div className="CompanyProfile-content">
                  <ApprovalIcon className="SetMui-icons" />
                  <p>Funding Stage -</p>
                  <p>{orgData?.funding_stage ? orgData?.funding_stage : "-"}</p>
                </div>
                <div className="CompanyProfile-content">
                  <SourceIcon className="SetMui-icons" />
                  <p className="industry-mentions">
                    source - {orgData?.source ? orgData?.source : "-"}
                  </p>
                </div>
                <div className="CompanyProfile-content">
                  <DescriptionIcon className="SetMui-icons" />
                  <p>source description -</p>
                  <p>
                    {orgData?.source_description
                      ? orgData?.source_description
                      : "-"}
                  </p>
                </div>
              </div>
            </div>
            <div className="">
              <div className="CompanyProfile-content">
                <CategoryRoundedIcon className="SetMui-icons" />
                <p>categories -</p>
                <p>{orgData?.categories ? orgData?.categories : "-"}</p>
              </div>
              <div className="CompanyProfile-content">
                <AssignmentIcon className="SetMui-icons" />
                <p>Ipo Status -</p>
                <p>{orgData?.ipo_status ? orgData?.ipo_status : "-"}</p>
              </div>
              <div className="CompanyProfile-content">
                <LinkedInIcon className="SetMui-icons" />
                <p>
                  Linkedin - {""}
                  <a
                    href={orgData?.linkedin}
                    target="_blank"
                    className="website-url-link"
                  >
                    {orgData?.linkedin}
                  </a>
                </p>
              </div>

              <div className="CompanyProfile-content">
                <NoteIcon className="SetMui-icons" />
                <p>Last Funding Type -</p>
                <p>{orgData?.last_funding_type ? orgData?.last_funding_type : "-"}</p>
              </div>

              <div className="CompanyProfile-content">
                <FilterIcon className="SetMui-icons" />
                <p>Last Funding Total -</p>
                <p>{formattedOrgCount ? formattedOrgCount : "-"}</p>
              </div>

              <div className="CompanyProfile-content">
                <EmailIcon className="SetMui-icons" />
                <p>Postal Code  -</p>
                <p>{orgData?.postalcode ? orgData?.postalcode : "-"}</p>
              </div>
              <div className="CompanyProfile-content">
                <img
                  className="CompanyProfile-icons"
                  src={userprofile}
                  alt=""
                />
                <p>
                  num employees-{" "}
                  {orgData?.num_employees ? orgData?.num_employees : null}
                </p>
              </div>
              <div className="CompanyProfile-content">
                <img className="CompanyProfile-icons" src={GrowIcons} alt="" />
                <p>
                  revenue_range -{" "}
                  {orgData?.revenue_range ? orgData?.revenue_range : "-"}
                </p>
              </div>
              <div className="CompanyProfile-content">
                <InsertCommentIcon className="SetMui-icons" />
                <p>Operating Status -</p>
                <p>{orgData?.operating_status ? orgData?.operating_status : "-"}</p>
              </div>
              <div className="CompanyProfile-content">
                <InsertCommentIcon className="SetMui-icons" />
                <p>comments -</p>
                <p>{orgData?.comments ? orgData?.comments : "-"}</p>
              </div>
            </div>
            <Stack spacing={2} direction="row">
              <Button className="Edit-Button-for-OrgDetail-screen" variant="contained" onClick={() => EditOrg(orgData)}>Edit <EditIcon className="Edit-icon-forOrg-Detail-screen" /> </Button>
            </Stack>
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
                      {orgData?.description ? orgData?.description : "-"}
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