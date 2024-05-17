import React, { useEffect, useState } from "react";
import "./Style.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import Delete from "../../../Assets/Delete.svg";
import selectedstar from "../../../Assets/star.svg";
import unselectedstar from "../../../Assets/unselectedstar.svg";
import { APIUrlOne, GetUserId } from "../../../Utils/Utils";
import { AI_PROSPECT_PROFILE } from "../../../Utils/Constants";
import axios from "axios";
import Loader from "../../Loader/Loader";
import moment from "moment";
import { toast } from "react-toastify";
export default function ProspectProfileTable({ setRefStatenew }) {
  const navigate = useNavigate();
  const [selectedStar, setSelectedStar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isMakerProfile, setIsMakerProfile] = useState(false);
  const [decisionMakerData, setDecisionMakerData] = useState([]);
  const userId = GetUserId();
  const handleStarClick = (item) => {
    setLoading(true);
    const option = {
      method: "POST",
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json",
      },
      url: `${APIUrlOne()}/v1/set_default_people_filter?name=${item.name}&user_id=${userId}`,
    };
    axios(option)
      .then((response) => {
        setLoading(false);
        if (response?.status === 200) {
          setRefStatenew(true)
          setSelectedStar(item?.key === selectedStar ? null : item?.key);
          toast.success(response?.data?.message);
          decisionMakerProfile();
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error?.response?.data?.message);
      });
  }
  const handleDelete = (item) => {
    setLoading(true);
    const option = {
      method: "POST",
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json",
      },
      url: `${APIUrlOne()}/v1/delete_people_filter?name=${item.name}&user_id=${userId}`,
    };
    axios(option)
      .then((response) => {
        setLoading(false);
        if (response?.status === 200) {
          setRefStatenew(true)
          decisionMakerProfile();
          toast.success(response?.data?.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error?.response?.data?.message);
      });
  }
  const decisionMakerProfile = () => {
    setLoading(true);
    const option = {
      method: "GET",
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json",
      },
      url: `${APIUrlOne()}/v1/get_filter_people?user_id=${userId}`,
    };
    axios(option)
      .then((e) => {
        setLoading(false);
        if (e?.status === 200) {
          setDecisionMakerData(e?.data?.data);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  }
  useEffect(() => {
    if (userId && isMakerProfile) {
     decisionMakerProfile();
    } else{
      setIsMakerProfile(true)
    }
  }, [userId,isMakerProfile]);
  return (
<>
  {loading ? <Loader /> : null}
  {decisionMakerData && decisionMakerData.length > 0 ? (
    <TableContainer component={Paper} className="leads-profile-table-main">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className="leads-profilethead">
          <TableRow>
            <TableCell className="cell-profile-name">Profile Name</TableCell>
            <TableCell align="left" className="cell-created-on">
              Created on
            </TableCell>
            <TableCell align="left" className="cell-status"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="leads-profile-tablebody">
          {decisionMakerData.map((item, index) => (
            <React.Fragment key={index}>
              <TableRow
                className="table-row-leadsprofile"
                key={item.key}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  onClick={() => navigate(AI_PROSPECT_PROFILE, { state: item })}
                >
                  {item?.name ? item?.name : "-"}
                </TableCell>
                <TableCell
                  align="left"
                  onClick={() => navigate(AI_PROSPECT_PROFILE, { state: item })}
                >
                  {moment(item?.created_at).format("YYYY-MM-DD")}
                </TableCell>
                <TableCell align="right" className="three-dot-cell">
                  <div className="threeDotIcon-table-profile" onClick={() => handleDelete(item)}>
                    <img src={Delete} alt="" />
                  </div>
                  <div className="threeDotIcon-table-profile" onClick={() => handleStarClick(item)}>
                    {item?.default ? <img src={selectedstar} alt="" /> : <img src={unselectedstar} alt="" />}
                  </div>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <div className="ai-leads-table-main">
      <div className="ai-leads-no-data-available-outter">
        <div className="ai-leads-no-data-available">No Data Available</div>
      </div>
    </div>
  )}
</>
  );
}