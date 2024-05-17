import * as React from "react";
import "./Accordian.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
export default function Faqscreen() {
  return (
    <>
      <div>
        <div className="Faqscreen-main-heading">
          <h3>JobsOhio Intelligence (JOI) Tool’s Data FAQ</h3>
        </div>
        <div>
          <div className="FaqscreenAccordion-outter"> 
            <Accordion className="defaultExpandedAccordion" defaultExpanded>
              <AccordionSummary
                className="AccordionSummary-innerheading-and-icon"
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <span className="AccordionRedDot"></span>
                <h4>What is JOI?</h4>
              </AccordionSummary>
              <AccordionDetails>
                <div className="defaultAccordionline"></div>
                <div className="defaultAccordionRed-Line"></div>
                <div className="AccordionDetailsalldata">
                  <p>
                    JobsOhio Intelligence, or JOI, is comprised of three
                    inter-related projects within a single initiative to deliver
                    maximum convenience and value to JO employees. This
                    initiative is known as “The Three Pillars” with each pillar
                    representing a project. Please see the corresponding
                    question and diagram below for more information about each
                    of the pillars.
                  </p>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion className="defaultExpandedAccordion">
              <AccordionSummary
                className="AccordionSummary-innerheading-and-icon"
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <span className="AccordionRedDot"></span>
                <h4>What data sources are used in the pilot version of JOI?</h4>
              </AccordionSummary>
              <AccordionDetails>
                <div className="defaultAccordionline"></div>
                <div className="defaultAccordionRed-Line"></div>
                <div className="AccordionDetailsalldata">
                  <table>
                    <tr>
                      <th className="text-glossary">
                        Transactional Applications
                      </th>
                      <th className="text-glossary">
                        Third-Party Commercial Datasets
                      </th>
                      <th className="text-glossary"> Marketing Analytics</th>
                    </tr>
                    <tr>
                      <td className="text-glossary">Salesforce</td>
                      <td className="text-glossary">
                        Salesforce Crunchbase (Primary Source) Clearbit
                      </td>
                      <td className="text-glossary">Clearbit</td>
                    </tr>
                    <tr>
                      <td className="text-glossary">Pardot</td>
                      <td className="text-glossary">
                        Pardot Gazelle.ai (Limited Data Source)
                      </td>
                      <td className="text-glossary"></td>
                    </tr>
                    <tr>
                      <td className="text-glossary"></td>
                      <td className="text-glossary">
                        
                        D&B Hoovers (Limited Data Source)
                      </td>
                      <td className="text-glossary"></td>
                    </tr>
                    <tr>
                      <td className="text-glossary"></td>
                      <td className="text-glossary">
                        
                        ZoomInfo (Limited Data Source)
                      </td>
                      <td className="text-glossary"></td>
                    </tr>
                  </table>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion className="defaultExpandedAccordion">
              <AccordionSummary
                className="AccordionSummary-innerheading-and-icon"
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <span className="AccordionRedDot"></span>
                <h4>What is a data policy and is there one currently?</h4>
              </AccordionSummary>
              <AccordionDetails>
                <div className="defaultAccordionline"></div>
                <div className="defaultAccordionRed-Line"></div>
                <div className="AccordionDetailsalldata">
                  <p>
                    A data policy describes how a business handles personal
                    data. It will highlight how the data is secure and the steps
                    taken to keep the information private. The data policy for
                    JobsOhio will be provided by Legal.
                  </p>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion className="defaultExpandedAccordion">
              <AccordionSummary
                className="AccordionSummary-innerheading-and-icon"
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <span className="AccordionRedDot"></span>
                <h4>Is this information secure and protected?</h4>
              </AccordionSummary>
              <AccordionDetails>
                <div className="defaultAccordionline"></div>
                <div className="defaultAccordionRed-Line"></div>
                <div className="AccordionDetailsalldata">
                  <p>
                    There are MFA (multifactor authentication) methods to keep
                    data secure and protected via applications, such as company
                    VPN and OKTA.
                  </p>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion className="defaultExpandedAccordion">
              <AccordionSummary
                className="AccordionSummary-innerheading-and-icon"
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <span className="AccordionRedDot"></span>
                <h4>
                  Can JOI access personal information such as email content /
                  private messages?
                </h4>
              </AccordionSummary>
              <AccordionDetails>
                <div className="defaultAccordionline"></div>
                <div className="defaultAccordionRed-Line"></div>
                <div className="AccordionDetailsalldata">
                  <p>
                    JOI does not have access to personal information such as
                    this; as it is only collecting metadata (which includes the
                    connection path, not the content).
                  </p>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion className="defaultExpandedAccordion">
              <AccordionSummary
                className="AccordionSummary-innerheading-and-icon"
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <span className="AccordionRedDot"></span>
                <h4>
                  What about spam accounts? Will they affect the tool’s outcome?
                </h4>
              </AccordionSummary>
              <AccordionDetails>
                <div className="defaultAccordionline"></div>
                <div className="defaultAccordionRed-Line"></div>
                <div className="AccordionDetailsalldata">
                  <p>
                    JOI performs data quality checks to ensure that spam
                    accounts are filtered out. It will provide results based on
                    weight triggers. If you are not in frequent contact with a
                    spam account, nothing should be negatively affected;
                    regardless, spam accounts will be filtered out.
                  </p>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion className="defaultExpandedAccordion">
              <AccordionSummary
                className="AccordionSummary-innerheading-and-icon"
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <span className="AccordionRedDot"></span>
                <h4>How do I create and select a default profile?</h4>
              </AccordionSummary>
              <AccordionDetails>
                <div className="defaultAccordionline"></div>
                <div className="defaultAccordionRed-Line"></div>
                <div className="AccordionDetailsalldata">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion className="defaultExpandedAccordion">
              <AccordionSummary
                className="AccordionSummary-innerheading-and-icon"
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <span className="AccordionRedDot"></span>
                <h4>How do I upload a file?</h4>
              </AccordionSummary>
              <AccordionDetails>
                <div className="defaultAccordionline"></div>
                <div className="defaultAccordionRed-Line"></div>
                <div className="AccordionDetailsalldata">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion className="defaultExpandedAccordion">
              <AccordionSummary
                className="AccordionSummary-innerheading-and-icon"
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <span className="AccordionRedDot"></span>
                <h4>How do I push a lead to Salesforce?</h4>
              </AccordionSummary>
              <AccordionDetails>
                <div className="defaultAccordionline"></div>
                <div className="defaultAccordionRed-Line"></div>
                <div className="AccordionDetailsalldata">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion className="defaultExpandedAccordion">
              <AccordionSummary
                className="AccordionSummary-innerheading-and-icon"
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <span className="AccordionRedDot"></span>
                <h4>Where can I find training on how to use JOI?</h4>
              </AccordionSummary>
              <AccordionDetails>
                <div className="defaultAccordionline"></div>
                <div className="defaultAccordionRed-Line"></div>
                <div className="AccordionDetailsalldata">
                  <p>
                    Link to Glossary Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion className="defaultExpandedAccordion">
              <AccordionSummary
                className="AccordionSummary-innerheading-and-icon"
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <span className="AccordionRedDot"></span>
                <h4>Where can I learn more about the terms used in JOI</h4>
              </AccordionSummary>
              <AccordionDetails>
                <div className="defaultAccordionline"></div>
                <div className="defaultAccordionRed-seclast"></div>
                <div className="AccordionDetailsalldata">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion className="defaultExpandedAccordion">
              <AccordionSummary
                className="AccordionSummary-innerheading-and-icon"
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <span className="AccordionRedDot"></span>
                <h4>
                  Who can be contacted if there are any additional questions to
                  be asked regarding personal data or JOI?
                </h4>
              </AccordionSummary>
              <AccordionDetails>
                <div className="defaultAccordionline"></div>
                <div className="defaultAccordionRed-Line-last"></div>
                <div className="AccordionDetailsalldata">
                  <p>
                    Please feel free to contact our email:
                    Enterprisedata@jobsohio.com
                  </p>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
}