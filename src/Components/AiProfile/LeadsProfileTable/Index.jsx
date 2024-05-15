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
import { AI_PROFILE_FORM_TABLE } from "../../../Utils/Constants";
import axios from "axios";
import Loader from "../../Loader/Loader";
import { toast } from "react-toastify";
import moment from "moment";
export default function LeadsProfileTable({ setRefState }) {
  const navigate = useNavigate();
  const loggedInUserId = GetUserId();
  const [selectedStar, setSelectedStar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [leadsProfileData, setLeadsProfileData] = useState([]);
  const [isLeadProfile, setIsLeadProfile] = useState(false);
  const userId = GetUserId();
  const handleStarClick = (item) => {
    setLoading(true);
    const option = {
      method: "POST",
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json",
      },
      url: `${APIUrlOne()}/v1/set_default_org_filter?name=${item.name}&user_id=${loggedInUserId}`,
    };
    axios(option)
      .then((response) => {
        setLoading(false);
        if (response?.status === 200) {
          setRefState(true)
          setSelectedStar(item?.key === selectedStar ? null : item?.key);
          toast.success(response?.data?.message);
          LeadsProfile();
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
      url: `${APIUrlOne()}/v1/delete_org_filter?name=${item.name}&user_id=${loggedInUserId}`,
    };
    axios(option)
      .then((response) => {
        setLoading(false);
        if (response?.status === 200) {
          setRefState(true)
          LeadsProfile();
          toast.success(response?.data?.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error?.response?.data?.message);
      });
  }
  const LeadsProfile = () => {
    setLoading(true);
    const option = {
      method: "GET",
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json",
      },
      url: `${APIUrlOne()}/v1/get_filter_org?user_id=${userId}`,
    };
    axios(option)
      .then((e) => {
        setLoading(false);
        if (e?.status === 200) {
          setLeadsProfileData(e?.data?.data);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  }
  useEffect(() => {
    
    if (userId && isLeadProfile) {
      LeadsProfile();
    }else
    setIsLeadProfile(true)
  }, [userId,isLeadProfile])
  return (
<>
  {loading ? <Loader /> : null}
  {leadsProfileData.length > 0 ? (
    <TableContainer component={Paper} className="leads-profile-table-main">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className="leads-profilethead">
          <TableRow>
            <TableCell className="cell-profile-name">Profile Name</TableCell>
            <TableCell align="left" className="cell-created-on">
              Created On
            </TableCell>
            <TableCell align="left" className="cell-status"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="leads-profile-tablebody">
          {leadsProfileData.map((item, index) => (
            <TableRow
              className="table-row-leadsprofile"
              key={item.key}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                onClick={() => navigate(AI_PROFILE_FORM_TABLE, { state: item })}
              >
                {item.name ? item.name : "-"}
              </TableCell>
              <TableCell
                align="left"
                onClick={() => navigate(AI_PROFILE_FORM_TABLE, { state: item })}
              >
                {moment(item?.created_at).format("YYYY-MM-DD")}
              </TableCell>
              <TableCell align="right" className="three-dot-cell">
                <span className="threeDotIcon-table-profile" onClick={() => handleDelete(item)}>
                  <img src={Delete} alt="" />
                </span>
                <span className="threeDotIcon-table-profile" onClick={() => handleStarClick(item)}>
                  {item?.default ? <img src={selectedstar} alt="" /> : <img src={unselectedstar} alt="" />}
                </span>
              </TableCell>
            </TableRow>
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