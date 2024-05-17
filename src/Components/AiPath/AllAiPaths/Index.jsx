import React, { useState } from "react";
import { Divider, Tooltip } from "@mui/material";
import axios from "axios";
import { APIUrlTwo, GetUserId } from "../../../Utils/Utils";
import { toast } from "react-toastify";
import Loader from "../../Loader/Loader";
import reddoticon from "../../../Assets/reddoticon.svg";
import LinkedINImage from "../../../Assets/linkedin.svg";
import massageicon from "../../../Assets/FrameDiff.svg";
import company from "../../../Assets/people-logo.png";
import education from "../../../Assets/cap-logo.png";
import experience from "../../../Assets/jobcompany.png";
import Siderbardeleteicon from "../../../Assets/Delete.svg";
import "./Style.css";
export default function AllAiPaths({ dataShortestPath }) {
  const initialNodes = dataShortestPath;
  const [buttonVisible, setButtonVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonVisiblenew, setbuttonVisiblenew] = useState(false);
  const loggedInUserId = GetUserId();
  const [alternativePath, setAlternativePath] = React.useState([]);
  const toggleButtonVisibility = () => {
    setButtonVisible(!buttonVisible);
    setbuttonVisiblenew(!buttonVisiblenew);
  };
  const handleDeleteNode = (item) => {
    setLoading(true);
    const data = {};
    data.source_uid = dataShortestPath[0]?.source;
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

  function combineNodesAndEdges(nodes, edges) {
    const combinedArray = [];
    edges?.forEach((edge) => {
      const sourceNode = nodes?.find((node) => node.uid === edge.source);
      const targetNode = nodes?.find((node) => node.uid === edge.target);
      if (sourceNode && targetNode) {
        combinedArray?.push({
          ...sourceNode,
          ...edge,
          target: targetNode.uid,
        });
      }
    });
    const lastNode = nodes?.find(
      (node) => !edges.some((edge) => edge.source === node.uid)
    );
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

  // best path
  const BestPathNodes = combineNodesAndEdges(
    initialNodes?.[0]?.bestPathInfor?.nodes,
    initialNodes?.[0]?.bestPathInfor?.edges
  );
  const bestPathinnodes = [];
  let tempArray = [];
  BestPathNodes?.forEach((item, index) => {
    tempArray?.push(item);
    if ((index + 1) % 4 === 0 || index === BestPathNodes?.length - 1) {
      bestPathinnodes?.push(tempArray);
      tempArray = [];
    }
  });
  //shortpath
  const ShortPathNodes = combineNodesAndEdges(
    initialNodes?.[0]?.shortestPath?.nodes,
    initialNodes?.[0]?.shortestPath?.edges
  );
  const shortPathinnodes = [];
  let tempArray2 = [];
  ShortPathNodes?.forEach((item, index) => {
    tempArray2?.push(item);
    if ((index + 1) % 4 === 0 || index === ShortPathNodes?.length - 1) {
      shortPathinnodes?.push(tempArray2);
      tempArray2 = [];
    }
  });
  return (
    <>
      {loading && <Loader />}
      {initialNodes?.length ? (
        <div className="main-container-ofAll-ai-Paths">
          <div className="submain-container">
            <div className="outer-container-of-ai-paths">
              <div className="Siderbar--inner-container">
                <h3>All AI Paths</h3>
              </div>
              <div className="AllAi-paths-button">
                <button onClick={toggleButtonVisibility}>
                  {buttonVisible
                    ? "Disable Alternate Paths"
                    : "Enable Alternate Paths"}
                </button>
              </div>
            </div>

            {/* Alternate path  */}
            {/* {addingAlternate?.map((myItem, value) => {
              return (
                <>
                  {myItem?.length ? (
                    <>
                      <div className="AllAIOuttercontainer-sidebar-aipath">
                        <div className="AllAi-paths-heading">
                          <h3>Alternate Path {value === 0 ? "" : value}</h3>
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
                                          <Tooltip title={<span dangerouslySetInnerHTML={{ __html: `${i.company}<br>${i.email}` }} />}>
                                            <div
                                              className={`sider-var-list-data-button`}
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
                                              {" "}
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
                                              {" "}
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
                                <div className="container-of-joint-line-of-node2">
                                  <p className="top-line-of-nodes2"></p>
                                  <div className="main-for-nodes-line2"></div>
                                  <p className="bottom-line-of-nodes2"></p>
                                </div>
                              )}
                            </>
                          ))}
                        </div>
                      </div>{" "}
                      <Divider className="divider-for-seperator-section" />
                    </>
                  ) : null}
                </>
              );
            })} */}
            {/* Alternate path  */}
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
            {/* Weighted path */}
            <div className="AllAIOuttercontainer">
              <div className="AllAi-paths-heading">
                <h3> Weighted Path</h3>
              </div>
              <div className="AllAi-paths-list">
                {bestPathinnodes?.map((item, index) => (
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
                                <Tooltip title={<span dangerouslySetInnerHTML={{ __html: `${i.company}<br>${i.email}` }} />}>

                                  <div className={`sider-var-list-data-button`}>
                                    <img
                                      src={reddoticon}
                                      alt=""
                                      className="red-doticon-image"
                                    />
                                    <p className="identity-name">{i.name}</p>
                                  </div>
                                </Tooltip>
                              </div>
                              {buttonVisible &&
                                !(index === 0 && idx === 0) &&
                                !(
                                  index === bestPathinnodes?.length - 1 &&
                                  idx === item?.length - 1
                                ) && (
                                  <div className="setthedeletebutton2">
                                    <button
                                      className="DeleteButtonVisible"
                                      onClick={() => handleDeleteNode(i)}
                                    >
                                      <img src={Siderbardeleteicon} alt="" />
                                      Remove
                                    </button>
                                  </div>
                                )}
                            </div>
                          </div>
                          {i?.relation && (
                            <div className="relation_ai_path_cont">
                              <div>
                                {" "}
                                <hr className="horizontal-line-in-aipath" />
                              </div>
                              <div className="siderbar-image-container">
                                <div className="Siderbar-lits-images">
                                  <Tooltip
                                    title={"Weighted Connection Strength"}
                                  >
                                    {" "}
                                    <div className="weight-between-nodes">
                                      {i?.weight}
                                    </div>
                                  </Tooltip>
                                  <Tooltip title={"Email Exchanged"}>
                                    {i?.relation?.includes("Email") && (
                                      <img
                                        src={massageicon}
                                        alt=""
                                        className="siderbar-modal-img"
                                      />
                                    )}
                                  </Tooltip>
                                  <Tooltip title={"LinkedIn Connection"}>
                                    {i?.relation?.includes("LinkedIn") && (
                                      <img
                                        src={LinkedINImage}
                                        alt=""
                                        className="siderbar-modal-img"
                                      />
                                    )}
                                  </Tooltip>
                                  <Tooltip title={"Working in Same Company"}>
                                    {i?.relation?.includes("Company") && (
                                      <img
                                        src={company}
                                        alt=""
                                        className="siderbar-modal-img"
                                      />
                                    )}
                                  </Tooltip>
                                  <Tooltip title={"Attended Same College"}>
                                    {i?.relation?.includes("Education") && (
                                      <img
                                        src={education}
                                        alt=""
                                        className="siderbar-modal-img"
                                      />
                                    )}
                                  </Tooltip>
                                  <Tooltip
                                    title={"Previously Worked in Same Company"}
                                  >
                                    {" "}
                                    {i?.relation?.includes("Experience") && (
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
                    {index < bestPathinnodes?.length - 1 && (
                      <div className="container-of-joint-line-of-node2">
                        <p className="top-line-of-nodes2"></p>
                        <div className="main-for-nodes-line2"></div>
                        <p className="bottom-line-of-nodes2"></p>
                      </div>
                    )}
                  </>
                ))}
              </div>
            </div>
            <Divider className="divider-for-seperator-section" />

            {/* Shortest path */}
            <div className="AllAIOuttercontainer">
              <div className="AllAi-paths-heading">
                <h3>Simple Path</h3>
              </div>
              <div className="AllAi-paths-list">
                {shortPathinnodes?.map((item, index) => (
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
                                <Tooltip title={<span dangerouslySetInnerHTML={{ __html: `${i.company}<br>${i.email}` }} />}>

                                  <div className={`sider-var-list-data-button`}>
                                    <img
                                      src={reddoticon}
                                      alt=""
                                      className="red-doticon-image"
                                    />
                                    <p className="identity-name">{i.name}</p>
                                  </div>
                                </Tooltip>
                              </div>
                              {buttonVisible &&
                                !(index === 0 && idx === 0) &&
                                !(
                                  index === shortPathinnodes?.length - 1 &&
                                  idx === item?.length - 1
                                ) && (
                                  <div className="setthedeletebutton2">
                                    <button
                                      className="DeleteButtonVisible"
                                      onClick={() => handleDeleteNode(i)}
                                    >
                                      <img src={Siderbardeleteicon} alt="" />
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
                                    title={"Weighted Connection Strength"}
                                  >
                                    {" "}
                                    <div className="weight-between-nodes">
                                      {i?.weight}
                                    </div>
                                  </Tooltip>
                                  <Tooltip title={"Email Exchanged"}>
                                    {i?.relation?.includes("Email") && (
                                      <img
                                        src={massageicon}
                                        alt=""
                                        className="siderbar-modal-img"
                                      />
                                    )}
                                  </Tooltip>
                                  <Tooltip title={"LinkedIn Connection"}>
                                    {i?.relation?.includes("LinkedIn") && (
                                      <img
                                        src={LinkedINImage}
                                        alt=""
                                        className="siderbar-modal-img"
                                      />
                                    )}
                                  </Tooltip>
                                  <Tooltip title={"Working in Same Company"}>
                                    {i?.relation?.includes("Company") && (
                                      <img
                                        src={company}
                                        alt=""
                                        className="siderbar-modal-img"
                                      />
                                    )}
                                  </Tooltip>
                                  <Tooltip title={"Attended Same College"}>
                                    {i?.relation?.includes("Education") && (
                                      <img
                                        src={education}
                                        alt=""
                                        className="siderbar-modal-img"
                                      />
                                    )}
                                  </Tooltip>
                                  <Tooltip
                                    title={"Previously Worked in Same Company"}
                                  >
                                    {" "}
                                    {i?.relation?.includes("Experience") && (
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
                    {index < shortPathinnodes?.length - 1 && (
                      <div className="container-of-joint-line-of-node2">
                        <p className="top-line-of-nodes2"></p>
                        <div className="main-for-nodes-line2"></div>
                        <p className="bottom-line-of-nodes2"></p>
                      </div>
                    )}
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

