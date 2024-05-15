import * as React from "react";
import graphup from "../../Assets/Graphup.svg";
import GraphDown from "../../Assets/GraphDown.svg";
import "../../Components/InfoDashboard/InfoDashboard.css";
import axios from "axios";
import moment from "moment";
import { APIUrlOne, GetOktaAuthData, setStatsData } from "../../Utils/Utils";
export default function AiLeadsTable() {
  const [cardsData, setCardsData] = React.useState();
  const userData = GetOktaAuthData();
  const userProfileData = userData?.user?.profile;

  const dashboardCards = () => {
    const today = new Date();
    const formattedDate = moment(today).format("YYYY-MM-DD");
    const option = {
      method: "GET",
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json",
      },
      url: `${APIUrlOne()}/v1/get_stats?date=${formattedDate}`,
    };
    axios(option)
      .then((e) => {
        const data = e?.data?.data[0];
        setCardsData(data);
        if (data) {
          setStatsData('statsData', data)
        }

      })
      .catch(() => {
      });
  };
  React.useEffect(() => {
    dashboardCards();
  }, []);
  return (
    <React.Fragment>
      <div className="first-box">
        <div className="inner-main-container-first-box">
          <div className="agent-name">
            <p className="hi-dash-name">Hi, {`${userProfileData?.firstName} ${userProfileData?.lastName}`}</p>
            <p className="past-information">Here are your 30 day insights</p>
          </div>
          <div className="outer-cards-container">
            <React.Fragment>
              <div className="inner-cards-container">
                <div className="card-one-Total-AI-leads">
                  <p className="card-heading-main">Total Organizations</p>
                  <p className="number-in-card">{cardsData?.org_count ? cardsData?.org_count?.toLocaleString() : '-'}</p>
                  {
                    cardsData?.org_count_delta > 0 ?
                      <div className="graphup-and-line">

                        <img src={graphup} alt="" />
                        <p className="graph-ratio"> {cardsData?.org_count_delta}%</p>
                        <p className="with-graph-ratio-and-info">
                          Up from last month
                        </p>
                      </div> :
                      cardsData?.org_count_delta < 0 ?
                        <div className="graphup-and-line">
                          <img src={GraphDown} alt="" />
                          <p className="graph-ratio-down">{cardsData?.org_count_delta}%</p>
                          <p className="with-graph-ratio-and-info">
                            Down from last month
                          </p>
                        </div> :
                        cardsData?.org_count_delta === 0 ?
                          <div className="graphup-and-line">
                            <p className="with-graph-ratio-and-info">
                              Data not available
                            </p>
                          </div> : null
                  }

                </div>
                <div className="card-one-Total-AI-leads">
                  <p className="card-heading-main">Total People</p>
                  <p className="number-in-card">{cardsData?.people_count ? cardsData?.people_count?.toLocaleString() : '-'}</p>
                  {
                    cardsData?.people_count_delta > 0 ?
                      <div className="graphup-and-line">

                        <img src={graphup} alt="" />
                        <p className="graph-ratio"> {cardsData?.people_count_delta}%</p>
                        <p className="with-graph-ratio-and-info">
                          Up from last month
                        </p>
                      </div> :
                      cardsData?.people_count_delta < 0 ?
                        <div className="graphup-and-line">
                          <img src={GraphDown} alt="" />
                          <p className="graph-ratio-down">{cardsData?.people_count_delta}%</p>
                          <p className="with-graph-ratio-and-info">
                            Down from last month
                          </p>
                        </div> :
                        cardsData?.people_count_delta === 0 ?
                          <div className="graphup-and-line">
                            <p className="with-graph-ratio-and-info">
                              Data not available
                            </p>
                          </div> : null
                  }
                </div>
                <div className="card-one-Total-AI-leads">
                  <p className="card-heading-main">AI Leads</p>
                  <p className="number-in-card">{cardsData?.generated_leads ? cardsData?.generated_leads?.toLocaleString() : '-'}</p>
                  {
                    cardsData?.generated_leads_delta > 0 ?
                      <div className="graphup-and-line">

                        <img src={graphup} alt="" />
                        <p className="graph-ratio"> {cardsData?.generated_leads_delta}%</p>
                        <p className="with-graph-ratio-and-info">
                          Up from last month
                        </p>
                      </div> :
                      cardsData?.generated_leads_delta < 0 ?
                        <div className="graphup-and-line">
                          <img src={GraphDown} alt="" />
                          <p className="graph-ratio-down">{cardsData?.generated_leads_delta}%</p>
                          <p className="with-graph-ratio-and-info">
                            Down from last month
                          </p>
                        </div> :
                        cardsData?.generated_leads_delta === 0 ?
                          <div className="graphup-and-line">
                            <p className="with-graph-ratio-and-info">
                              Data not available
                            </p>
                          </div> : null
                  }
                </div>
                <div className="card-one-Total-AI-leads">
                  <p className="card-heading-main">AI Prospects</p>
                  <p className="number-in-card">{cardsData?.decisionmaker_count ? cardsData?.decisionmaker_count?.toLocaleString() : '-'}</p>
                  {
                    cardsData?.decisionmaker_count_delta > 0 ?
                      <div className="graphup-and-line">

                        <img src={graphup} alt="" />
                        <p className="graph-ratio"> {cardsData?.decisionmaker_count_delta}%</p>
                        <p className="with-graph-ratio-and-info">
                          Up from last month
                        </p>
                      </div> :
                      cardsData?.decisionmaker_count_delta < 0 ?
                        <div className="graphup-and-line">
                          <img src={GraphDown} alt="" />
                          <p className="graph-ratio-down">{cardsData?.decisionmaker_count_delta}%</p>
                          <p className="with-graph-ratio-and-info">
                            Down from last month
                          </p>
                        </div> :
                        cardsData?.decisionmaker_count_delta === 0 ?
                          <div className="graphup-and-line">
                            <p className="with-graph-ratio-and-info">
                              Data not available
                            </p>
                          </div> : null
                  }
                </div>
                <div className="card-five-Total-AI-leads">
                  <p className="card-heading-main">
                    Suspects pushed to Salesforce
                  </p>
                  <p className="number-in-card-last">
                    {cardsData?.suspect_to_sf !== undefined && cardsData?.suspect_to_sf !== null ? (cardsData?.suspect_to_sf > 0 ? cardsData?.suspect_to_sf.toLocaleString() : cardsData?.suspect_to_sf) : "-"}
                  </p>
                  {
                    cardsData?.suspect_to_sf_delta > 0 ?
                      <div className="graphup-and-line">

                        <img src={graphup} alt="" />
                        <p className="graph-ratio"> {cardsData?.suspect_to_sf_delta}%</p>
                        <p className="with-graph-ratio-and-info">
                          Up from last month
                        </p>
                      </div> :
                      cardsData?.suspect_to_sf_delta < 0 ?
                        <div className="graphup-and-line">
                          <img src={GraphDown} alt="" />
                          <p className="graph-ratio-down">{cardsData?.suspect_to_sf_delta}%</p>
                          <p className="with-graph-ratio-and-info">
                            Down from last month
                          </p>
                        </div> :
                        cardsData?.suspect_to_sf_delta === 0 ?
                          <div className="graphup-and-line">
                            <p className="with-graph-ratio-and-info">
                              Data not available
                            </p>
                          </div> : null
                  }
                </div>
              </div>
            </React.Fragment>
          </div>
        </div>
      </div >
    </React.Fragment >
  );
}