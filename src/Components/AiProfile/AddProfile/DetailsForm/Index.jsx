import React, { useEffect } from "react";
import "./Style.css";
import PropTypes from "prop-types";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import reloardform from "../../../../Assets/reloardform.svg";
import FormControl from "@mui/material/FormControl";
import { TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import FormControlProfile from "../../../FormControlProfile/Index";
import moment from "moment";
import dayjs from "dayjs";
function Row({ row }) {
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row" className="juihy">
          {row.calories}
        </TableCell>
        <TableCell align="left">
          <h3 className="company-name-country">Aon Benfield Inc. - Chicago</h3>
          <p className="after-company-name-country">Lansing, Illinois</p>
        </TableCell>
        <TableCell align="left">
          <h3 className="prospects-table">324</h3>
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
export default function DetailsForm({
  prefilledData,
  setTableShowResult,
  tableShowResult,
  detailsFormData,
  setDetailsFormData,
  toggleResult,
  isFilterRetrieve,
  setResultRetrieve,
  setSkip
}) {
  useEffect(() => {
    if (prefilledData?.id) {
      setDetailsFormData({
        industry: prefilledData?.categories,
        ravenue: prefilledData?.revenue_range,
        noOfEmployee: prefilledData?.num_employees,
        country: prefilledData?.country,
        state: prefilledData?.state,
        ipoStatus: prefilledData?.ipo_status,
        lastFundingType: prefilledData?.last_funding_type,
        minFundingRounds: prefilledData?.num_funding_rounds_min,
        maxFundingRounds: prefilledData?.num_funding_rounds_max,
        fundingTotal: prefilledData?.last_funding_total,
        Jscore: prefilledData?.j_score
      });
    }
  }, [prefilledData])
  const dateFromHandler = (date) => {
    const formattedDate = date.format("YYYY-MM-DD");
    setDetailsFormData({
      ...detailsFormData,
      fundingDate: formattedDate
    });
  };
  const dateToHandler = (date) => {
    const formattedDate = date.format("YYYY-MM-DD");
    setDetailsFormData({
      ...detailsFormData,
      fundingDateAt: formattedDate,
    })
  }
  const EmptyInputs = () => {
    setResultRetrieve([]);
    setTableShowResult(false);
    setSkip(0);
    setDetailsFormData({
      industry: "",
      ravenue: "",
      state: "",
      noOfEmployee: "",
      country: "",
      ipoStatus: "",
      lastFundingType: "",
      fundingTotal: "",
      fundingRounds: "",
      fundingDate: "",
      fundingDateAt: "",
      minFundingRounds: "",
      maxFundingRounds: "",
      Jscore: "",
      addedName: "",
    });
  }
  const formatDate = moment(prefilledData?.last_funding_at_from).format('MM-DD-YYYY');
  const formatDateTwo = moment(prefilledData?.last_funding_at_to).format('MM-DD-YYYY');
  const unixTimestamp = moment(formatDate, 'MM-DD-YYYY').unix() * 1000;
  const unixTimeStampTwo = moment(formatDateTwo, 'MM-DD-YYYY').unix() * 1000;


  const hideResult = () => {
    setSkip(0);
    setTableShowResult(false)
  }
  return (
    <div className="ai-profile-form">
      <FormControl
        fullWidth
        sx={{ m: 1 }}
        variant="standard"
        className="ai-profile-form-main"
      >
        <div className="form-data-typeable">
          <div className="inner-form-data">
            <div>
              <div className="ai-prospect-details-form">
                <div className="heading-of-prospect-details">
                  <div className="prospect-text-and-questionmark">
                    <div className="details-perposal-text">
                      <p>AI Leads Details</p>
                    </div>
                    <div className="question-markimage">
                    </div>
                  </div>
                  <div className="EmptyInputsImage">
                    {prefilledData ? "" : <img onClick={EmptyInputs} src={reloardform} alt="" />}
                  </div>
                </div>
                <div className="inner-main-object-select">
                  <label htmlFor="" className="label-floating">
                    Industry  {prefilledData ? null : <span className="mandatoryainputs">*</span>}
                  </label>
                  <FormControlProfile
                    value={detailsFormData?.industry}
                    disabled={prefilledData?.categories || prefilledData}
                    handleChange={(e) => setDetailsFormData({ ...detailsFormData, industry: e?.target?.value })}
                    dataList={isFilterRetrieve?.categories}
                  />
                </div>
                <div className="inner-main-object-select">
                  <label htmlFor="" className="label-floating">
                    Revenue Range
                  </label>
                  <FormControlProfile
                    value={detailsFormData?.ravenue}
                    disabled={prefilledData?.revenue_range || prefilledData}
                    handleChange={(e) => setDetailsFormData({ ...detailsFormData, ravenue: e?.target?.value })}
                    dataList={isFilterRetrieve?.revenue_range}
                    isRevenue={true}
                  />
                </div>
                <div className="inner-main-object-select">
                  <label htmlFor="" className="label-floating">
                    Number of Employees
                  </label>
                  <FormControlProfile
                    value={detailsFormData?.noOfEmployee}
                    disabled={prefilledData?.num_employees || prefilledData}
                    handleChange={(e) => setDetailsFormData({ ...detailsFormData, noOfEmployee: e?.target?.value })}
                    dataList={isFilterRetrieve?.num_employees}
                  />
                </div>
                <div className="inner-main-object-select">
                  <label htmlFor="" className="label-floating">
                    Country
                  </label>
                  <FormControlProfile
                    value={detailsFormData?.country}
                    disabled={prefilledData?.country || prefilledData}
                    handleChange={(e) => setDetailsFormData({ ...detailsFormData, country: e?.target?.value })}
                    dataList={isFilterRetrieve?.country}
                  />
                </div>
                <div className="inner-main-object-select">
                  <label htmlFor="" className="label-floating"> State </label>
                  <FormControlProfile
                    value={detailsFormData?.state}
                    disabled={prefilledData?.state || prefilledData}
                    handleChange={(e) => setDetailsFormData({ ...detailsFormData, state: e?.target?.value })}
                    dataList={detailsFormData?.country === "United States" ? isFilterRetrieve?.state : isFilterRetrieve?.ca_states}
                  />
                </div>
                <div className="inner-main-object-select">
                  <label htmlFor="" className="label-floating">
                    IPO Status
                  </label>
                  <FormControlProfile
                    value={detailsFormData?.ipoStatus}
                    disabled={prefilledData?.ipo_status || prefilledData}
                    handleChange={(e) => setDetailsFormData({ ...detailsFormData, ipoStatus: e?.target?.value })}
                    dataList={isFilterRetrieve?.ipo_status}
                  />
                </div>
                <div className="inner-main-object-select">
                  <label htmlFor="" className="label-floating">
                    Last Funding Type
                  </label>
                  <FormControlProfile
                    value={detailsFormData?.lastFundingType}
                    disabled={prefilledData?.last_funding_type || prefilledData}
                    handleChange={(e) => setDetailsFormData({ ...detailsFormData, lastFundingType: e?.target?.value })}
                    dataList={isFilterRetrieve?.last_equity_funding_type?.sort()}
                  />
                </div>
                <div className="inner-main-object-select">
                  <label htmlFor="" className="label-floating">
                    Last funding date from
                  </label>
                  <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        className="form-date-picker"
                        value={dayjs(unixTimestamp)}
                        disabled={prefilledData?.last_funding_at_from || prefilledData}
                        onChange={dateFromHandler}
                        renderInput={(params) => (
                          <TextField placeholder="" {...params} />
                        )}
                      />
                    </LocalizationProvider>
                  </div>
                </div>
                <div className="inner-main-object-select">
                  <label htmlFor="" className="label-floating">
                    Last funding date to
                  </label>
                  <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        className="form-date-picker"
                        value={dayjs(unixTimeStampTwo)}
                        disabled={prefilledData?.last_funding_at_to || prefilledData}
                        onChange={dateToHandler}
                        renderInput={(params) => (
                          <TextField placeholder="" {...params} />
                        )}
                      />
                    </LocalizationProvider>
                  </div>
                </div>
                <div className="inner-main-object-select">
                  <label htmlFor="" className="label-floating">
                    Min No. Of Funding Rounds
                  </label>
                  <FormControlProfile
                    value={detailsFormData?.minFundingRounds}
                    disabled={prefilledData?.num_funding_rounds_min || prefilledData}
                    handleChange={(e) => setDetailsFormData({ ...detailsFormData, minFundingRounds: e?.target?.value })}
                    dataList={["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"]}
                  />
                </div>
                <div className="inner-main-object-select">
                  <label htmlFor="" className="label-floating">
                    Max No. Of Funding Rounds
                  </label>
                  <FormControlProfile
                    value={detailsFormData?.maxFundingRounds}
                    disabled={prefilledData?.num_funding_rounds_max || prefilledData}
                    handleChange={(e) => setDetailsFormData({ ...detailsFormData, maxFundingRounds: e?.target?.value })}
                    dataList={["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"]}
                  />
                </div>
                <div className="inner-main-object-select">
                  <label htmlFor="" className="label-floating">
                    Last Funding Total
                  </label>
                  <FormControlProfile
                    value={detailsFormData?.fundingTotal}
                    disabled={prefilledData?.last_funding_total || prefilledData}
                    handleChange={(e) => setDetailsFormData({ ...detailsFormData, fundingTotal: e?.target?.value })}
                    dataList={isFilterRetrieve?.last_funding_total}
                  />
                </div>
                <div className="inner-main-object-select">
                  <label htmlFor="" className="label-floating">
                    JOI Score
                  </label>
                  <FormControlProfile
                    value={detailsFormData?.Jscore}
                    disabled={prefilledData?.j_score || prefilledData}
                    handleChange={(e) => setDetailsFormData({ ...detailsFormData, Jscore: e?.target?.value })}
                    dataList={isFilterRetrieve?.j_score}
                    isRevenue={false}
                  />
                </div>
              </div>
            </div>
            <div>
              {prefilledData?.id ? null :
                tableShowResult ? <Stack className="stack-form-button">
                  <Button
                    variant="contained"
                    className="Show-result-button-form"
                    style={{ textTransform: "none" }}
                    onClick={hideResult}
                  >
                    {"Hide result"}
                  </Button>
                </Stack> :
                  <Stack className="stack-form-button">
                    <Button
                      variant="contained"
                      className="Show-result-button-form"
                      style={{ textTransform: "none" }}
                      onClick={toggleResult}
                    >
                      {"Show result"}
                    </Button>
                  </Stack>
              }
            </div>
          </div>
        </div>
      </FormControl>
    </div>
  );
}