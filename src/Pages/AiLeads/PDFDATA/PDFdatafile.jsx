import * as React from 'react';
import "./PDFdatafile.css";
import callImg from '../../../Assets/call.svg';
import LoctionImg from '../../../Assets/loction.svg';
import userprofile from "../../../Assets/user.svg"
import GrowIcons from "../../../Assets/grow.svg"
import Companyimg from "../../../Assets/company.svg"
import GlobalImg from '../../../Assets/Globe.svg';
import IndustryImage from '../../../Assets/office-building.png';
import { Link } from 'react-router-dom/dist';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
export default function PDFdatafile({ dataForInformation }) {
    return (
        <>
            <section className='CompanyProfile-main-container'>
                <div className=' CompanyProfile-outter-container'>
                    <div className='CompanyProfile-flex-container'>
                        <div className='CompanyProfile-flex-outter-container'>
                            <div className='CompanyProfile-img'>
                                <img src={IndustryImage} style={{ width: '100%', height: '100%' }} />

                            </div>
                            <div>
                                <h3 className='Netflix-heading'>{dataForInformation?.name ? dataForInformation?.name : '-'}</h3>


                                <div className="CompanyProfile-content">
                                    <img
                                        className="CompanyProfile-icons"
                                        src={GlobalImg}
                                        alt=""
                                    />
                                    {dataForInformation?.website_url ?
                                        <Link
                                            to={dataForInformation?.website_url}
                                            target="_blank"
                                            className="clickable-link-for-website"
                                        >
                                            <p>
                                                {dataForInformation?.website_url?.split("www.")?.[1]
                                                    ? dataForInformation?.website_url?.split("www.")?.[1]
                                                    : dataForInformation?.website_url?.split("http://")?.[1]
                                                        ? dataForInformation?.website_url?.split("http://")?.[1] : dataForInformation?.website_url?.split("https://")?.[1]
                                                            ? dataForInformation?.website_url?.split("https://")?.[1] : dataForInformation?.website_url
                                                }
                                            </p>
                                        </Link> : <p>Not Available</p>}
                                </div>
                                <div className='CompanyProfile-content'>
                                    <img className='CompanyProfile-icons' src={callImg} alt="" />
                                    <p>{dataForInformation?.phone_number ? dataForInformation?.phone_number : 'Not Available'}</p>
                                </div>
                                <div className='CompanyProfile-content'>
                                    <img className='CompanyProfile-icons' src={LoctionImg} alt="" />
                                    <p>{`${dataForInformation?.street ? dataForInformation?.street + `,` : dataForInformation?.street === null ? '' : dataForInformation?.street} ${dataForInformation?.location_identifiers ? dataForInformation?.location_identifiers + `,` : dataForInformation?.location_identifiers === null ? '' : dataForInformation?.location_identifiers} ${dataForInformation?.postalcode ? dataForInformation?.postalcode + `,` : dataForInformation?.postalcode === null ? '' : dataForInformation?.postalcode} ${dataForInformation?.country ? dataForInformation?.country : dataForInformation?.country === null ? '' : dataForInformation?.country}`}</p>
                                </div>
                            </div>
                        </div>
                        <div className='CompanyProfile-cont-rightside'>
                            <div className='CompanyProfile-content'>
                                <img className='CompanyProfile-icons' src={userprofile} alt="" />
                                <p>Prospects  - {dataForInformation?.num_employees ? dataForInformation?.num_employees : 'Not Available'}</p>
                            </div>
                            <div className='CompanyProfile-content'>
                                <img className='CompanyProfile-icons' src={GrowIcons} alt="" />
                                <p>Annual revenue - {dataForInformation?.revenue_range ? dataForInformation?.revenue_range : 'Not Available'}</p>
                            </div>
                            <div className='CompanyProfile-content'>
                                <img className='CompanyProfile-icons' src={Companyimg} alt="" />
                                <p className='industry-mentions'>Industry/ Sector - {dataForInformation?.categories}</p>
                            </div>
                        </div>
                    </div>
                    <div className='CompanyProfile-infomation-main'>
                        <div>
                            <Accordion defaultExpanded>
                                <AccordionSummary
                                    expandIcon={<KeyboardArrowDownIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <Typography>Company Bio</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography className="CompanyProfile-infomation">
                                        <p className="industry-mentions">
                                            {dataForInformation?.description
                                                ? dataForInformation.description.replace(
                                                    /(^|\.\s+)([a-z])/g,
                                                    (match) => match.toUpperCase()
                                                )
                                                : "Not Available"}
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