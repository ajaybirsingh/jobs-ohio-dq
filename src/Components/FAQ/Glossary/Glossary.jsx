import * as React from "react";
import "./Glossary.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function Glossary() {
  const [ShowMoreData, SetShowMoreData] = React.useState(false);

  const HandelshowMore = () => {
    SetShowMoreData(true);
    setButtonHidden(true);
  };
  const [buttonHidden, setButtonHidden] = React.useState(false);

  return (
    <>
      <div>
        <div className="Glossary-heading">
          <h3>Glossary</h3>
        </div>
        <div className="Glossary-card-outter">
          <div className="Glossary-card-Flex-container">
            <div className="Glossary-card-heading">
              <h1>A</h1>
            </div>
            <div className="Glossary-card-sub-heading">
              <h3>Accuracy</h3>
            </div>
            <div className="Glossary-card-last">
              <p>
                Shows how often a classification ML model is correct overall
              </p>
            </div>
          </div>
          <div className="Glossary-underline"></div>

          <div className="Glossary-card-Flex-container">
            <div className="Glossary-card-heading">
              <h1>B</h1>
            </div>
            <div className="Glossary-card-sub-heading">
              <h3>BRE</h3>
            </div>
            <div className="Glossary-card-last">
              <p> Business Retention and Expansion </p>
            </div>
          </div>
          <div className="Glossary-underline"></div>
                  <div className="Glossary-card-Flex-containerNEW">
            <div className="Glossary-card-heading">
              <h1>C</h1>
            </div>
            <div className="main-div">
              <div className="flex-alldaata">
                <div className="Glossary-card--heading">
                  <h3>Connection</h3>
                </div>
                <div className="JOI-Score-css">
                  <p>
                    A relationship in which a person at JobsOhio is linked or
                    associated with another person at a potential client
                    company, either directly or indirectly.
                  </p>
                </div>
                <div className="lastheadingdata">
                  <p>a.k.a. Network Graph</p>
                </div>
              </div>
              <div className="flex-alldaata">
                <div className="Glossary-card--heading"></div>
                <div className="JOI-Score-css">
                  <h4>JOI provides several connection types, including:</h4>
                  <p>
                    Company Connection <br />
                    Education Connection <br />
                    Email Connection <br />
                    Experience Connection <br />
                    LinkedIn <br /> Connection
                  </p>
                </div>
              </div>
              <div className="flex-alldaata">
                <div className="Glossary-card--heading">
                  <h3>
                    Company <br /> Connection
                  </h3>
                </div>
                <div className="JOI-Score-css">
                  <p>
                    A connection between two people who are currently employed
                    by the company
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="Glossary-underline"></div>

      

          <div className="Glossary-card-Flex-containerNEW">
            <div className="Glossary-card-heading">
              <h1>D</h1>
            </div>
            <div className="main-div">
              <div className="flex-alldaata">
                <div className="Glossary-card--heading">
                  <h3>Data Enrichment</h3>
                </div>
                <div className="JOI-Score-css">
                  <p>
                    The process of combining first party data from internal
                    sources with third party data from external sources
                  </p>
                </div>
              </div>
              <div className="flex-alldaata">
                <div className="Glossary-card--heading">
                  <h3>Data Lake</h3>
                </div>
                <div className="JOI-Score-css">
                  <p>
                    A centralized repository designed to store, process, and
                    secure large amounts of structured, semi-structured, and
                    unstructured data
                  </p>
                </div>
              </div>
              <div className="flex-alldaata">
                <div className="Glossary-card--heading">
                  <h3>Decision-maker</h3>
                </div>
                <div className="JOI-Score-css">
                  <p>
                    Key employees in target companies (Leads) who work to
                    determine the best solutions for their company to aid growth
                    and overall success
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="Glossary-underline"></div>

            <div className="Glossary-card-Flex-containerNEW">
            <div className="Glossary-card-heading">
              <h1>E</h1>
            </div>
            <div className="main-div">
              <div className="flex-alldaata">
                <div className="Glossary-card--heading">
                  <h3>Education</h3>
                </div>
                <div className="JOI-Score-css">
                  <p>
                  A connection between two people who attended the same college or
                university
                  </p>
                </div>
              </div>
              <div className="flex-alldaata">
                <div className="Glossary-card--heading">
                  <h3>Email Connection</h3>
                </div>
                <div className="JOI-Score-css">
                  <p>
                  A connection on LinkedIn between an employee at JobsOhio and
                another person via email
                  </p>
                </div>
              </div>
              <div className="flex-alldaata">
                <div className="Glossary-card--heading">
                  <h3>  Experience <br />
                Connection</h3>
                </div>
                <div className="JOI-Score-css">
                  <p>
                  A connection between two people who were previously employed by
                the same company at the same time
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="Glossary-underline"></div>

    
          <div className="Glossary-card-Flex-containerNEW">
            
            <div className="Glossary-card-heading">
              
              <h1>F</h1>
            </div>
            <div className="Glossary-card-lastf1data">
              
              <div className="Glossary-inner-F1-score-flex">
                
                <div className="Glossary-inner-F1-heading">
                  
                  <h3>F1 Score</h3>
                </div>
                <div className="Glossary-inner-F1-innerdata">
                  
                  <p>
                    Machine learning evaluation metric that measures a model's
                    accuracy.  Integrates precision and recall into a single
                    metric to gain a better understanding of model performance
                  </p>
                </div>
              </div>
              <div className="Glossary-inner-F1-score-flex">
                
                <div className="Glossary-inner-F1-heading">
                  
                  <h3>Funding</h3>
                </div>
                <div className="Glossary-inner-F1-innerdata">
                  <p>
                    Funding is the money that a company raises or receives from
                    various investors during defined funding stages (pre-seed,
                    seed and venture capital)
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="Glossary-underline"></div>

          <div className="Glossary-card-Flex-container">
            <div className="Glossary-card-heading">
              <h1>G</h1>
            </div>
            <div className="Glossary-card-sub-heading">
              <h3>Graph</h3>
            </div>
            <div className="Glossary-card-last">
              <p>
                A graph is a collection of nodes (vertices) and edges. The edges
                connect pairs of nodes, representing relationships or
                connections between them.
              </p>
            </div>
            <div className="lastConnection">
              <p>a.k.a. Connection or Network Connection or Network Graph</p>
            </div>
          </div>
          <div className="Glossary-underline"></div>

          <div className="Glossary-card-Flex-container">
            <div className="Glossary-card-heading">
              <h1>H</h1>
            </div>
            <div className="Glossary-card-sub-heading">
              <h3>Accuracy</h3>
            </div>
            <div className="Glossary-card-last">
              <p>
                Industry A branch of an economy that produces a closely related
                set of raw materials, goods, or services
              </p>
            </div>
          </div>
          <div className="Glossary-underline"></div>

      

          <div className="Glossary-card-Flex-containerNEW">
     
            <div className="Glossary-card-heading">
         
              <h1>I</h1>
            </div>
            <div className="Glossary-card-lastf1data">
     
              <div className="Glossary-inner-F1-score-flex">
             
                <div className="Glossary-inner-F1-heading">
          
                  <h3>Industry</h3>
                </div>
                <div className="Glossary-inner-F1-innerdata">
                  
                  <p>
                  A branch of an economy   that produces a closely related set of raw materials, goods, or services
                  </p>
                </div>
              </div>
              <div className="Glossary-inner-F1-score-flex">
                
                <div className="Glossary-inner-F1-heading">
                  
                  <h3>IPO Status</h3>
                </div>
                <div className="Glossary-inner-F1-innerdata">
                  
                  <p>
                  Describes the position of a company's initial public offering (IPO) with respect to how many committed investors it has before the actual IPO.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="Glossary-underline"></div>

          <div className="Glossary-card-Flex-containerNEW">
            <div className="Glossary-card-heading">
              <h1>J</h1>
            </div>
            <div className="main-div">
              <div className="flex-alldaata">
                <div className="Glossary-card--heading">
                  <h3>JOI-Score</h3>
                </div>
                <div className="JOI-Score-css">
                  <p>
                    The JOI-Score is a measure of suitability, ranging from 0 to
                    100, that provides users with information on whether a
                    company is positioned for growth. This score is determined
                    by triggers identified by the BD NA team. A higher JOI-Score
                    indicates that the company is prepared to expand and
                    fulfills the criteria for growth
                  </p>
                </div>
              </div>
              <div className="flex-alldaata">
                <div className="Glossary-card--heading">
                  <h3>JOI-Strength</h3>
                </div>
                <div className="JOI-Score-css">
                  <p>
                    The JOI-Strength Score is a quantifiable measure developed
                    to assess the strength of connection between two
                    individuals, leveraging a sophisticated AI model. This model
                    intricately analyzes various dimensions of interpersonal
                    connections and provides a strength score between 0-100. The
                    higher the score, the stronger the connection.
                  </p>
                </div>
              </div>
              <div className="flex-alldaata">
                <div className="Glossary-card--heading">
                  <h3>JOSF</h3>
                </div>
                <div className="JOI-Score-css">
                  <p>JobsOhio Salesforce </p>
                </div>
              </div>
            </div>
          </div>

          <div className="Glossary-underline"></div>

          <div className="Glossary-card-Flex-container">
            <div className="Glossary-card-heading">
              <h1>K</h1>
            </div>
            <div className="Glossary-card-sub-heading">
              <h3></h3>
            </div>
            <div className="Glossary-card-last">
              <p> </p>
            </div>
          </div>

          <div className="Glossary-underline"></div>

          <div className="Glossary-card-Flex-containerNEW">
            <div className="Glossary-card-heading">
              <h1>L</h1>
            </div>
            <div className="main-div">
              <div className="flex-alldaata">
                <div className="Glossary-card--heading">
                  <h3>
                    Last Funding <br /> Date
                  </h3>
                </div>
                <div className="JOI-Score-css">
                  <p>The date of the last funding round</p>
                </div>
              </div>
              <div className="flex-alldaata">
                <div className="Glossary-card--heading">
                  <h3>
                    Last Funding <br /> Total
                  </h3>
                </div>
                <div className="JOI-Score-css">
                  <p>
                    The total value of the last funding round, expressed in USD
                  </p>
                </div>
              </div>
              <div className="flex-alldaata">
                <div className="Glossary-card--heading">
                  <h3>
                    Last Funding <br />
                    Type
                  </h3>
                </div>
                <div className="JOI-Score-css">
                  <p>
                    The last funding type is indicative of where the company is
                    in the funding process, which is divided into a series of
                    phases. This begins with the pre-seed and seed phases,
                    followed by the venture capital phase (series A funding
                    onwards).
                  </p>
                </div>
              </div>

              <div className="flex-alldaata">
                <div className="Glossary-card--heading">
                  <h3>Lead </h3>
                </div>
                <div className="JOI-Score-css">
                  <p>
                    Potential client companies that have been identified as
                    having the highest chance of success based on JOI algorithms
                  </p>
                </div>
                <div className="JOI-suspect">
                  <p>a.k.a., suspect, prospect, target</p>
                </div>
              </div>

              <div className="flex-alldaata">
                <div className="Glossary-card--heading">
                  <h3>LinkedIn Connection</h3>
                </div>
                <div className="JOI-Score-css">
                  <p>
                    A connection between an employee at JobsOhio and another
                    person via LinkedIn
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="Glossary-underline"></div>

          {ShowMoreData && (
            <>
              <div className="Glossary-card-Flex-container">
                <div className="Glossary-card-heading">
                  <h1>M</h1>
                </div>
                <div className="Glossary-card-sub-heading">
                </div>
                <div className="Glossary-card-last">
                </div>
              </div>
              <div className="Glossary-underline"></div>

              <div className="Glossary-card-Flex-container">
                <div className="Glossary-card-heading">
                  <h1>N</h1>
                </div>
                <div className="Glossary-card-sub-heading">
                  <h3>Node</h3>
                </div>
                <div className="Glossary-card-last">
                  <p>
                    A node, also known as a vertex, is a fundamental unit in a
                    graph
                  </p>
              
                </div>
              </div>
              <div className="Glossary-underline"></div>

              <div className="Glossary-card-Flex-container">
                <div className="Glossary-card-heading">
                  <h1>O</h1>
                </div>
                <div className="Glossary-card-sub-heading">
                  <h3></h3>
                </div>
                <div className="Glossary-card-last">
                  <p> </p>
                </div>
              </div>
              <div className="Glossary-underline"></div>

              <div className="Glossary-card-Flex-containerNEW">
                
                <div className="Glossary-card-heading">
                  <h1>P</h1>
                </div>
                <div className="Glossary-card-lastf1data">
                  <div className="Glossary-inner-F1-score-flex">
                    <div className="Glossary-inner-F1-heading">
                      <h3>Path</h3>
                    </div>
                    <div className="Glossary-inner-F1-innerdata">
                      <p>
                        The best connection between decision-makers in these
                        companies via JobsOhio
                      </p>
                    </div>
                  </div>
                  <div className="Glossary-inner-F1-score-flex">
                    <div className="Glossary-inner-F1-heading">
                      <h3>Precision</h3>
                    </div>
                    <div className="Glossary-inner-F1-innerdata">
                      
                      <p>
                        Precision answers the question “How often are the
                        positive predictions made by the model correct?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="Glossary-underline"></div>

              <div className="Glossary-card-Flex-container">
                <div className="Glossary-card-heading">
                  <h1>Q</h1>
                </div>
                <div className="Glossary-card-sub-heading">
                  <h3></h3>
                </div>
                <div className="Glossary-card-last">
                  <p> </p>
                </div>
              </div>
              <div className="Glossary-underline"></div>

              <div className="Glossary-card-Flex-containerNEW">
                
                <div className="Glossary-card-heading">
                  <h1>R</h1>
                </div>
                <div className="Glossary-card-lastf1data">
                  <div className="Glossary-inner-F1-score-flex">
                    <div className="Glossary-inner-F1-heading">
                      <h3>Recall</h3>
                    </div>
                    <div className="Glossary-inner-F1-innerdata">
                      <p>
                        Recall tells us how effective the model is at
                        identifying positive classifications
                      </p>
                    </div>
                  </div>
                  <div className="Glossary-inner-F1-score-flex">
                    <div className="Glossary-inner-F1-heading">
                      <h3>Revenue Range</h3>
                    </div>
                    <div className="Glossary-inner-F1-innerdata">
                      
                      <p>
                        Revenue is the amount of money generated from normal
                        business operations. Revenue ranges are used to
                        categorize the revenue of companies into specific high
                        and low ranges.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="Glossary-underline"></div>

              <div className="Glossary-card-Flex-containerNEW">
                <div className="Glossary-card-heading">
                  <h1>S</h1>
                </div>
                <div className="main-div">
                  <div className="flex-alldaata">
                    <div className="Glossary-card--heading">
                      <h3>Salesforce Status</h3>
                    </div>
                    <div className="JOI-Score-css">
                      <p>
                        
                        Represents the current stage of a prospect's journey in
                        the Salesforce platform, providing valuable insights
                        into their buyer's lifecycle.
                      </p>
                    </div>
                  </div>
                  <div className="flex-alldaata">
                    <div className="Glossary-card--heading">
                      <h3>Sector </h3>
                    </div>
                    <div className="JOI-Score-css">
                      <p>
                        A general segment of the economy that contains similar
                        industries
                      </p>
                    </div>
                  </div>
                  <div className="flex-alldaata">
                    <div className="Glossary-card--heading">
                      <h3>Specificity</h3>
                    </div>
                    <div className="JOI-Score-css">
                      <p>
                        <p>
                          Specificity tells us how effective the model is at
                          identifying negative classifications
                        </p>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="Glossary-underline"></div>

              <div className="Glossary-card-Flex-container">
                <div className="Glossary-card-heading">
                  <h1>T</h1>
                </div>
                <div className="Glossary-card-sub-heading">
                  <h3>Trigger</h3>
                </div>
                <div className="Glossary-card-last">
                  <p>
                    
                    A "trigger" in a lead generation system is a predefined
                    criterion that helps identify potential leads by evaluating
                    key characteristics of companies. Triggers enable targeted
                    and efficient lead identification by signaling which
                    companies match the ideal customer profile or show readiness
                    for engagement.
                  </p>
                </div>
              </div>
              <div className="Glossary-underline"></div>

              <div className="Glossary-card-Flex-container">
                <div className="Glossary-card-heading">
                  <h1>U</h1>
                </div>
                <div className="Glossary-card-sub-heading">
                  <h3></h3>
                </div>
                <div className="Glossary-card-last">
                  <p> </p>
                </div>
              </div>
              <div className="Glossary-underline"></div>

              <div className="Glossary-card-Flex-container">
                <div className="Glossary-card-heading">
                  <h1>V</h1>
                </div>
                <div className="Glossary-card-sub-heading">
                  <h3></h3>
                </div>
                <div className="Glossary-card-last">
                  <p> </p>
                </div>
              </div>
              <div className="Glossary-underline"></div>

              <div className="Glossary-card-Flex-container">
                <div className="Glossary-card-heading">
                  <h1>W</h1>
                </div>
                <div className="Glossary-card-sub-heading">
                  <h3></h3>
                </div>
                <div className="Glossary-card-last">
                  <p> </p>
                </div>
              </div>
              <div className="Glossary-underline"></div>

              <div className="Glossary-card-Flex-container">
                <div className="Glossary-card-heading">
                  <h1>X</h1>
                </div>
                <div className="Glossary-card-sub-heading">
                  <h3></h3>
                </div>
                <div className="Glossary-card-last">
                  <p> </p>
                </div>
              </div>
              <div className="Glossary-underline"></div>

              <div className="Glossary-card-Flex-container">
                <div className="Glossary-card-heading">
                  <h1>Y</h1>
                </div>
                <div className="Glossary-card-sub-heading">
                  <h3></h3>
                </div>
                <div className="Glossary-card-last">
                  <p> </p>
                </div>
              </div>
              <div className="Glossary-underline"></div>

              <div className="Glossary-card-Flex-container">
                <div className="Glossary-card-heading">
                  <h1>Z</h1>
                </div>
                <div className="Glossary-card-sub-heading">
                  <h3></h3>
                </div>
                <div className="Glossary-card-last">
                  <p> </p>
                </div>
              </div>
            </>
          )}

          <div className="Glossary-underline"></div>
          <div className="Glossary-button-container">
            {!buttonHidden && (
              <Stack spacing={2} direction="row">
                <Button onClick={HandelshowMore} variant="outlined">
                  Load More
                </Button>
              </Stack>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
