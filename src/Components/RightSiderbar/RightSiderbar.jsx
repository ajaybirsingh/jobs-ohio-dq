import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import "../RightSiderbar/RightSiderbar.css";
import CloseIcon from "@mui/icons-material/Close";
import LinkedINImage from "../../Assets/linkedin.svg";
import massageicon from "../../Assets/FrameDiff.svg";
import Siderbardeleteicon from "../../Assets/Delete.svg";
import company from '../../Assets/people-logo.png';
import education from '../../Assets/cap-logo.png';
import experience from '../../Assets/jobcompany.png';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import reddoticon from "../../Assets/reddoticon.svg";
import { toast } from "react-toastify";
import axios from "axios";
import { APIUrlTwo, GetUserId } from "../../Utils/Utils";
import Loader from "../Loader/Loader";
import { Tooltip } from "@mui/material";
import { AI_LEADS } from "../../Utils/Constants";
export default function RightSidebar({ openSidebar, dataShortestPath, setVisibleData, userDetails, handleRightsidebar,
  rowid , row }) {
  const initialNodes = dataShortestPath;
  const loggedInUserId = GetUserId();
  const [loading, setLoading] = React.useState(false);
  const [buttonVisible, setButtonVisible] = React.useState(false);
  const [alternativePath, setAlternativePath] = React.useState([])
  const [state, setState] = React.useState({
    right: false,
  });
  function combineNodesAndEdges(nodes, edges) {
    const combinedArray = [];
    edges?.forEach(edge => {
      const sourceNode = nodes?.find(node => node.uid === edge.source);
      const targetNode = nodes?.find(node => node.uid === edge.target);
      if (sourceNode && targetNode) {
        combinedArray?.push({
          ...sourceNode,
          ...edge,
          target: targetNode.uid
        });
      }
    });
    const lastNode = nodes?.find(node => !edges.some(edge => edge.source === node.uid));
    if (lastNode) {
      combinedArray.push(lastNode);
    }
    return combinedArray;
  }


  // AlternativePath
  let addingAlternate = [];
  alternativePath?.forEach((item) => {
    const upcomingAlternate = combineNodesAndEdges(
      item?.bestPathInfor?.nodes,
      item?.bestPathInfor?.edges
    );
    let updatedAlternate = [];
    let newAlternate = [];
    upcomingAlternate?.forEach((item, index) => {
      updatedAlternate?.push(item);
      if ((index + 1) % 4 === 0 || index === upcomingAlternate?.length - 1) {
        newAlternate?.push(updatedAlternate);
        updatedAlternate = [];
      }
    });
    addingAlternate.push(newAlternate);
  });



  // Best path
  const BestPathNodes = combineNodesAndEdges(initialNodes?.[0]?.bestPathInfor?.nodes, initialNodes?.[0]?.bestPathInfor?.edges);
  const bestPathinnodes = [];
  let tempArray = [];
  BestPathNodes?.forEach((item, index) => {
    tempArray?.push(item);
    if ((index + 1) % 4 === 0 || index === BestPathNodes?.length - 1) {
      bestPathinnodes?.push(tempArray);
      tempArray = [];
    }
  });
  //Shortesr path
  const ShortPathNodes = combineNodesAndEdges(initialNodes?.[0]?.shortestPath?.nodes, initialNodes?.[0]?.shortestPath?.edges);
  const shortPathinnodes = [];
  let tempArray2 = [];
  ShortPathNodes?.forEach((item, index) => {
    tempArray2?.push(item);
    if ((index + 1) % 4 === 0 || index === ShortPathNodes?.length - 1) {
      shortPathinnodes?.push(tempArray2);
      tempArray2 = [];
    }
  });
  const handleDeleteNode = (item) => {
    setLoading(true);
    const data = {};
    data.source_uid = Number(loggedInUserId);
    data.target_uid = dataShortestPath[0]?.target;
    const arr = [item?.uid];
    data.nodes_uid = arr;
    const option = {
      method: "POST",
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json",
      },
      url: `${APIUrlTwo()}/v1/remove_node`,
      data: JSON.stringify(data),
    };
    axios(option)
      .then((response) => {
        setLoading(false);
        setButtonVisible(!buttonVisible);
        if (response?.data[0] === "No Path Found") {
          toast.error("No path found");
        }
        if (alternativePath?.length > 0) {
          setAlternativePath([...alternativePath, response.data?.[0]]);
        } else {
          alternativePath.push(response.data?.[0]);
        }
        if (response?.status === 200) {
          toast.success(response?.data?.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error?.response?.data?.message);
      });
  };



  const [buttonVisiblenew, setbuttonVisiblenew] = React.useState(null);
  const toggleButtonVisibility = () => {
    setButtonVisible(!buttonVisible);
    setbuttonVisiblenew(!buttonVisiblenew);
  };
  // const toggleDrawer = (anchor, open) => (event) => {
  //   if (rowid?.strengthData?.strength === 0 || rowid?.strengthData?.strength === "-") { return };

  //   if (
  //     event.type === "keydown" &&
  //     (event.key === "Tab" || event.key === "Shift")
  //   ) {
  //     return;
  //   }
  //   setState({ ...state, [anchor]: open });
  //   if (open) {
  //     handleRightsidebar(rowid)
  //   }
  // };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      rowid?.strengthData?.strength === 0 ||
      rowid?.strengthData?.strength === "-"||
      row ?.strengthData?.strength === 0 ||
      row?.strengthData?.strength === "-"
    ) {
      return;
    }
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
    if (open) {
      handleRightsidebar(rowid ||row);
    }
  };
  
  const list = (anchor) => (
    <Box
      className="right-siderbar-data"
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}>

      <div className="siderbar-right-siderbar-lits-data">
        <div className="Siderbar--inner-container">
          <h3>{userDetails?.first_name}  {userDetails?.last_name}</h3>
          <p>Path To AI {window?.location?.pathname === AI_LEADS ? "Leads" : "Prospects"}</p>
        </div>
        <div className="right-siderbar-button">
          <button onClick={() => toggleButtonVisibility()}>
            {buttonVisible
              ? "Disable Alternate Paths"
              : "Enable Alternate Paths"}
          </button>


          {/* {buttonVisible ? (
            <>
              <button   onClick={() => toggleButtonVisibility()}>
                Disable Alternate Paths
              </button>
            </>
          ) : (
            <button onClick={() => toggleButtonVisibility()}>
              Enable Alternate Paths
            </button>
          )} */}
          <CloseIcon
            onClick={toggleDrawer(anchor, false)}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
      <Divider className="divider-for-seperator-section-sidebar" />
      <List>

        <div className="both-paths-bar">
          {/* Alternate path  */}
          {/* {addingAlternate?.map((myItem, value) => {
            return (
              <>
                {myItem?.length ? (
                  <>
                    <div className="AllAIOuttercontainer-sidebar">
                      <div className="AllAi-paths-heading">
                        <h3 className="path-heading-sidebar">Alternate Path {value === 0 ? "" : value}</h3>
                      </div>
                      <div className="AllAi-paths-list">
                        {myItem?.map((item, index) => (
                          <>
                            <div className="siderbar-row">
                              {item?.map((i, idx) => (
                                <div
                                  style={{ display: "flex" }}
                                  className="innerData_ai_cont"
                                >
                                  <div
                                    key={idx}
                                    className="remove-username-container2"
                                    style={{ display: "flex" }}
                                  >
                                    <div className="delete-contaoner2">
                                      <div className="delete-button-down2">
                                        <Tooltip title={<span dangerouslySetInnerHTML={{ __html: `${i.company ? i.company : ""}<br>${i.email ? i.email : ""}` }} />}>
                                          <div
                                            className={`sider-var-list-data-button-sidebar`}
                                          >
                                            <img
                                              src={reddoticon}
                                              alt=""
                                              className="red-doticon-image-sidebar"
                                            />
                                            <p className="identity-name">{i.name}</p>
                                          </div>
                                        </Tooltip>
                                      </div>
                                      {buttonVisible &&
                                        !(index === 0 && idx === 0) &&
                                        !(
                                          index ===
                                          myItem?.length - 1 &&
                                          idx === item?.length - 1
                                        ) && (
                                          <div className="setthedeletebutton2">
                                            <button
                                              className="DeleteButtonVisible"
                                              onClick={() =>
                                                handleDeleteNode(i)
                                              }
                                            >
                                              <img
                                                src={Siderbardeleteicon}
                                                alt=""
                                              />
                                              Remove
                                            </button>
                                          </div>
                                        )}
                                    </div>
                                  </div>
                                  {i?.relation && (
                                    <div className="relation_ai_path_cont">
                                      <hr className="horizontal-line-in-aipath" />
                                      <div className="siderbar-image-container">
                                        <div className="Siderbar-lits-images">
                                          <Tooltip
                                            title={
                                              "Weighted Connection Strength"
                                            }
                                          >
                                            <div className="weight-between-nodes">
                                              {i?.weight}
                                            </div>
                                          </Tooltip>
                                          <Tooltip title={"Email Exchanged"}>
                                            {i?.relation?.includes(
                                              "Email"
                                            ) && (
                                                <img
                                                  src={massageicon}
                                                  alt=""
                                                  className="siderbar-modal-img"
                                                />
                                              )}
                                          </Tooltip>
                                          <Tooltip
                                            title={"LinkedIn Connection"}
                                          >
                                            {i?.relation?.includes(
                                              "LinkedIn"
                                            ) && (
                                                <img
                                                  src={LinkedINImage}
                                                  alt=""
                                                  className="siderbar-modal-img"
                                                />
                                              )}
                                          </Tooltip>
                                          <Tooltip
                                            title={"Working in Same Company"}
                                          >
                                            {i?.relation?.includes(
                                              "Company"
                                            ) && (
                                                <img
                                                  src={company}
                                                  alt=""
                                                  className="siderbar-modal-img"
                                                />
                                              )}
                                          </Tooltip>
                                          <Tooltip
                                            title={"Attended Same College"}
                                          >
                                            {i?.relation?.includes(
                                              "Education"
                                            ) && (
                                                <img
                                                  src={education}
                                                  alt=""
                                                  className="siderbar-modal-img"
                                                />
                                              )}
                                          </Tooltip>
                                          <Tooltip
                                            title={
                                              "Previously Worked in Same Company"
                                            }
                                          >
                                            {i?.relation?.includes(
                                              "Experience"
                                            ) && (
                                                <img
                                                  src={experience}
                                                  alt=""
                                                  className="siderbar-modal-img"
                                                />
                                              )}
                                          </Tooltip>
                                        </div>
                                      </div>
                                      <div className="connecting-line"></div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                            {index < myItem?.length - 1 && (
                              <div className="container-of-joint-line-of-node2-sidebar">
                                <p className="top-line-of-nodes2"></p>
                                <div className="main-for-nodes-line2"></div>
                                <p className="bottom-line-of-nodes2"></p>
                              </div>
                            )}
                          </>
                        ))}
                      </div>
                    </div>
                    <Divider className="divider-for-seperator-section-sidebar" />
                  </>
                ) : null}
              </>
            );
          })} */}

          {addingAlternate.slice().reverse().map((myItem, index) => {
            return myItem.length ? (
              <>

                <div className="AllAIOuttercontainer-sidebar" key={index}>
                  <div className="AllAi-paths-heading">
                    {/* <h3 className="path-heading-sidebar">Alternate Path {value === 0 ? "" : value}</h3> */}
                    <h3 className="path-heading-sidebar">Alternate Path {addingAlternate.length - index}</h3>
                  </div>
                  <div className="AllAi-paths-list">
                    {myItem?.map((item, index) => (
                      <>
                        <div className="siderbar-row">
                          {item?.map((i, idx) => (
                            <div
                              style={{ display: "flex" }}
                              className="innerData_ai_cont"
                            >
                              <div
                                key={idx}
                                className="remove-username-container2"
                                style={{ display: "flex" }}
                              >
                                <div className="delete-contaoner2">
                                  <div className="delete-button-down2">
                                    <Tooltip title={<span dangerouslySetInnerHTML={{ __html: `${i.company ? i.company : ""}<br>${i.email ? i.email : ""}` }} />}>
                                      <div
                                        className={`sider-var-list-data-button-sidebar`}
                                      >
                                        <img
                                          src={reddoticon}
                                          alt=""
                                          className="red-doticon-image-sidebar"
                                        />
                                        <p className="identity-name">{i.name}</p>
                                      </div>
                                    </Tooltip>
                                  </div>
                                  {buttonVisible &&
                                    !(index === 0 && idx === 0) &&
                                    !(
                                      index ===
                                      myItem?.length - 1 &&
                                      idx === item?.length - 1
                                    ) && (
                                      <div className="setthedeletebutton2">
                                        <button
                                          className="DeleteButtonVisible"
                                          onClick={() =>
                                            handleDeleteNode(i)
                                          }
                                        >
                                          <img
                                            src={Siderbardeleteicon}
                                            alt=""
                                          />
                                          Remove
                                        </button>
                                      </div>
                                    )}
                                </div>
                              </div>
                              {i?.relation && (
                                <div className="relation_ai_path_cont">
                                  <hr className="horizontal-line-in-aipath" />
                                  <div className="siderbar-image-container">
                                    <div className="Siderbar-lits-images">
                                      <Tooltip
                                        title={
                                          "Weighted Connection Strength"
                                        }
                                      >
                                        <div className="weight-between-nodes">
                                          {i?.weight}
                                        </div>
                                      </Tooltip>
                                      <Tooltip title={"Email Exchanged"}>
                                        {i?.relation?.includes(
                                          "Email"
                                        ) && (
                                            <img
                                              src={massageicon}
                                              alt=""
                                              className="siderbar-modal-img"
                                            />
                                          )}
                                      </Tooltip>
                                      <Tooltip
                                        title={"LinkedIn Connection"}
                                      >
                                        {i?.relation?.includes(
                                          "LinkedIn"
                                        ) && (
                                            <img
                                              src={LinkedINImage}
                                              alt=""
                                              className="siderbar-modal-img"
                                            />
                                          )}
                                      </Tooltip>
                                      <Tooltip
                                        title={"Working in Same Company"}
                                      >
                                        {i?.relation?.includes(
                                          "Company"
                                        ) && (
                                            <img
                                              src={company}
                                              alt=""
                                              className="siderbar-modal-img"
                                            />
                                          )}
                                      </Tooltip>
                                      <Tooltip
                                        title={"Attended Same College"}
                                      >
                                        {i?.relation?.includes(
                                          "Education"
                                        ) && (
                                            <img
                                              src={education}
                                              alt=""
                                              className="siderbar-modal-img"
                                            />
                                          )}
                                      </Tooltip>
                                      <Tooltip
                                        title={
                                          "Previously Worked in Same Company"
                                        }
                                      >
                                        {i?.relation?.includes(
                                          "Experience"
                                        ) && (
                                            <img
                                              src={experience}
                                              alt=""
                                              className="siderbar-modal-img"
                                            />
                                          )}
                                      </Tooltip>
                                    </div>
                                  </div>
                                  <div className="connecting-line"></div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        {index < myItem?.length - 1 && (
                          <div className="container-of-joint-line-of-node2-sidebar">
                            <p className="top-line-of-nodes2"></p>
                            <div className="main-for-nodes-line2"></div>
                            <p className="bottom-line-of-nodes2"></p>
                          </div>
                        )}
                      </>
                    ))}
                  </div>
                </div>
                <Divider className="divider-for-seperator-section-sidebar" />
              </>
            ) : null;
          })}
          {/* Weighted Path  */}
          <div className="AllAIOuttercontainer-sidebar">
            <div className="AllAi-paths-heading">
              <h3 className="path-heading-sidebar">Weighted Path</h3>
            </div>
            <div className="AllAi-paths-list">
              {bestPathinnodes?.map((item, index) => (
                <>
                  <div className="siderbar-row">
                    {
                      item?.map((i, idx) => (
                        <div style={{ display: 'flex' }} className="innerData_ai_cont">
                          <div key={idx} className="remove-username-container2" style={{ display: 'flex' }}>
                            <div className="delete-contaoner2">
                              <div className="delete-button-down2">
                                <Tooltip title={<span dangerouslySetInnerHTML={{ __html: `${i.company ? i.company : ""}<br>${i.email ? i.email : ""}` }} />}>

                                  <div className={`sider-var-list-data-button-sidebar`}>
                                    <img src={reddoticon} alt="" className="red-doticon-image-sidebar" />

                                    <p className="identity-name">{i.name}</p>

                                  </div>
                                </Tooltip>
                              </div>
                              {buttonVisible && !(index === 0 && idx === 0) && !(index === bestPathinnodes?.length - 1 && idx === item?.length - 1) && (
                                <div className="setthedeletebutton2">
                                  <button className="DeleteButtonVisible" onClick={() => handleDeleteNode(i)}>
                                    <img src={Siderbardeleteicon} alt="" />
                                    Remove
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                          {
                            i?.relation && <div className="relation_ai_path_cont">
                              <hr className="horizontal-line-in-aipath" />
                              <div className="siderbar-image-container">
                                <div className="Siderbar-lits-images">
                                  <Tooltip title={"Weighted Connection Strength"}> <div className="weight-between-nodes" >{i?.weight}</div></Tooltip>
                                  <Tooltip title={"Email Exchanged"}>{i?.relation?.includes("Email") && <img src={massageicon} alt="" className="siderbar-modal-img" />}</Tooltip>
                                  <Tooltip title={"LinkedIn Connection"}>{i?.relation?.includes("LinkedIn") && <img src={LinkedINImage} alt="" className="siderbar-modal-img" />}</Tooltip>
                                  <Tooltip title={"Working in Same Company"}>{i?.relation?.includes("Company") && <img src={company} alt="" className="siderbar-modal-img" />}</Tooltip>
                                  <Tooltip title={"Attended Same College"}>{i?.relation?.includes("Education") && <img src={education} alt="" className="siderbar-modal-img" />}</Tooltip>
                                  <Tooltip title={"Previously Worked in Same Company"}> {i?.relation?.includes("Experience") && <img src={experience} alt="" className="siderbar-modal-img" />}</Tooltip>
                                </div>
                              </div>
                              <div className="connecting-line"></div>
                            </div>
                          }
                        </div>
                      ))
                    }
                  </div>
                  {
                    index < bestPathinnodes?.length - 1 && <div className="container-of-joint-line-of-node2" >
                      <p className="top-line-of-nodes2"></p>
                      <div className="main-for-nodes-line2"></div>
                      <p className="bottom-line-of-nodes2"></p>
                    </div>
                  }
                </>
              ))}
            </div>
          </div>

          <Divider className="divider-for-seperator-section-sidebar" />
          {/* Basic Path  */}
          <div className="AllAIOuttercontainer-sidebar">
            <div className="AllAi-paths-heading">
              <h3 className="path-heading-sidebar">Simple Path</h3>
            </div>
            <div className="AllAi-paths-list">
              {shortPathinnodes?.map((item, index) => (
                <>
                  <div className="siderbar-row">
                    {
                      item?.map((i, idx) => (
                        <div style={{ display: 'flex' }} className="innerData_ai_cont">
                          <div key={idx} className="remove-username-container2" style={{ display: 'flex' }}>
                            <div className="delete-contaoner2">
                              <div className="delete-button-down2">
                                <Tooltip title={<span dangerouslySetInnerHTML={{ __html: `${i.company ? i.company : ""}<br>${i.email ? i.email : ""}` }} />}>
                                  <div className={`sider-var-list-data-button-sidebar`}>
                                    <img src={reddoticon} alt="" className="red-doticon-image" />

                                    <p className="identity-name">{i.name}</p>
                                  </div>
                                </Tooltip>

                              </div>
                              {buttonVisible && !(index === 0 && idx === 0) && !(index === shortPathinnodes?.length - 1 && idx === item?.length - 1) && (
                                <div className="setthedeletebutton2">
                                  <button className="DeleteButtonVisible" onClick={() => handleDeleteNode(i)}>
                                    <img src={Siderbardeleteicon} alt="" />
                                    Remove
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                          {
                            i?.relation && <div className="relation_ai_path_cont">
                              <hr className="horizontal-line-in-aipath" />
                              <div className="siderbar-image-container">
                                <div className="Siderbar-lits-images">
                                  <Tooltip title={"Weighted Connection Strength"}> <div className="weight-between-nodes" >{i?.weight}</div></Tooltip>
                                  <Tooltip title={"Email Exchanged"}>{i?.relation?.includes("Email") && <img src={massageicon} alt="" className="siderbar-modal-img" />}</Tooltip>
                                  <Tooltip title={"LinkedIn Connection"}>{i?.relation?.includes("LinkedIn") && <img src={LinkedINImage} alt="" className="siderbar-modal-img" />}</Tooltip>
                                  <Tooltip title={"Working in Same Company"}>{i?.relation?.includes("Company") && <img src={company} alt="" className="siderbar-modal-img" />}</Tooltip>
                                  <Tooltip title={"Attended Same College"}>{i?.relation?.includes("Education") && <img src={education} alt="" className="siderbar-modal-img" />}</Tooltip>
                                  <Tooltip title={"Previously Worked in Same Company"}> {i?.relation?.includes("Experience") && <img src={experience} alt="" className="siderbar-modal-img" />}</Tooltip>
                                </div>
                              </div>
                              <div className="connecting-line"></div>
                            </div>
                          }
                        </div>
                      ))
                    }
                  </div>
                  {
                    index < shortPathinnodes?.length - 1 && <div className="container-of-joint-line-of-node2" >
                      <p className="top-line-of-nodes2"></p>
                      <div className="main-for-nodes-line2"></div>
                      <p className="bottom-line-of-nodes2"></p>
                    </div>
                  }
                </>
              ))}
            </div>
          </div>
        </div>
      </List>
    </Box>
  );
  return (
<>
      {loading ? <Loader /> : null}
      <div className="RightSiderbar-main">
        <div>
          {["right"].map((anchor) => (
            <React.Fragment key={anchor}>
              {rowid?.strengthData?.strength === 0 ||
              rowid?.strengthData?.strength === "-" ||
              row?.strengthData?.strength === 0 ||
              row?.strengthData?.strength === "-" ? (
                <>
                  <Button
                    onClick={toggleDrawer(anchor, true)}
                    className={
                      rowid?.strengthData?.strength === "-"
                        ? "arrow-button-forward-sidebar"
                        : "arrow-button-forward-sidebar-disabled"
                    }
                  >
                    <ArrowForwardIosRoundedIcon className="side-arrow-in-inner-table-aileads" />
                  </Button>
                </>
              ) : (
                <>
                  <Tooltip
                    className="dfvbvfe2wefvfe2wefvwfv"
                    title={"View AI Path"}
                  >
                    <Button
                      onClick={toggleDrawer(anchor, true)}
                      className="arrow-button-forward-sidebar"
                    >
                      <ArrowForwardIosRoundedIcon className="side-arrow-in-inner-table-aileads" />
                    </Button>
                  </Tooltip>
                </>
              )}
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}
        </div>
      </div>
      {/* <div className="RightSiderbar-main">
        <div>
          {["right"].map((anchor) => (
            <React.Fragment key={anchor}>
              <Button
                onClick={toggleDrawer(anchor, true)}
                className="arrow-button-forward-sidebar"
              >
                <ArrowForwardIosRoundedIcon className="side-arrow-in-inner-table-aileads" />
              </Button>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}
        </div>
      </div> */}
    </>
  );
}