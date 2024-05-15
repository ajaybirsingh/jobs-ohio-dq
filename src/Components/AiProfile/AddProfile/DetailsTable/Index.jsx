import React from "react";
import "./Style.css";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import emptyfile from "../../../../Assets/emptyfile.svg";
import InfiniteScroll from "react-infinite-scroll-component";
function Row({ row }) {
  const getColor = (aiScore) => {
    if (aiScore > 80) {
      return "green";
    } else if (aiScore >= 50 && aiScore <= 80) {
      return "yellow";
    } else {
      return "red";
    }
  };
  const color = getColor(row.ai_score);
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell align="left">
          <h3 className="company-name-country">{row?.name ? row?.name : "-"}</h3>
          <p className="after-company-name-country">{row?.location_identifiers ? row?.location_identifiers : "-"}</p>
        </TableCell>
        <TableCell component="th" scope="row" className="juihy">
          <div className="ai-score-background-main">
            <div
              className="ai-score-background"
              style={{
                background:
                  color === "red"
                    ? "#DA291C"
                    : color === "yellow"
                      ? "#EAB121"
                      : color === "green"
                        ? "#0EB93E"
                        : null,
              }}
            >
              {/* {row?.ai_score ? row?.ai_score : "-"} */}
              {row?.ai_score !== null && row?.ai_score !== undefined
                ? row?.ai_score
                : "NA"}

            </div>
          </div>
        </TableCell>
        <TableCell align="left">
          <p className="employee-count">{row?.people_count ? row?.people_count : "-"}</p>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};
const rows = [1, 1, 1, 1, 1];
export default function DetailsTable({ tableShowResult, resultRetrieve, hasMore, fetchMoreData, }) {
  return (
    <div className="ai-profile-table-main">
      {tableShowResult ? (
        <>
          <InfiniteScroll
            dataLength={resultRetrieve?.length}
            next={() => fetchMoreData()}
            hasMore={hasMore}
            scrollableTarget="aiprofile-table-container"
          >
            <TableContainer component={Paper} className="aiprofile-table-container">
              <Table aria-label="collapsible table" className="ai-leads-table">
                <TableHead>
                  <TableRow className="table-row-ai-leads">
                    <TableCell align="left" className="company-row-table">
                      Company & location
                    </TableCell>
                    <TableCell className="score-row-table">JScore</TableCell>
                    <TableCell align="left" className="prospects-row-table">
                      Prospects
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {resultRetrieve?.map((row, index) => (
                    <React.Fragment key={index}>
                      <Row
                        key={row.name}
                        row={row}
                      />
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </InfiniteScroll>
        </>
      ) : (
        <TableContainer component={Paper} className="aiprofile-table-container">
          <Table
            aria-label="collapsible table"
            className="ai-leads-table-empty"
          >
            <TableHead>
              <TableRow className="table-row-ai-leads"></TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell className="tCell-table-outer-main">
                  <div className="empty-container-div-main">
                    <div className="icon-and-backgroundimage">
                      <div className="empty-icon-div"></div>
                      <div>
                        <img
                          src={emptyfile}
                          alt=""
                          className="empty-icon-image"
                        />
                      </div>
                    </div>
                    <p className="no-result-found-empty">No result for now</p>
                    <p className="add-filter-empty">
                      Please add filters to view results
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}