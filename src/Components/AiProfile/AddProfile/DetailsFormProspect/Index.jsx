import React, { useEffect } from "react";
import "./Style.css";
import PropTypes from "prop-types";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import reloardform from "../../../../Assets/reloardform.svg";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FormControlProfile from "../../../FormControlProfile/Index";
import { InputBase, Paper } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
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
export default function DetailsFormProspect({
  setDecisionMakerData,
  decisionMakerData,
  setTableShowResult,
  tableShowResult,
  toggleResult,
  ResponseJobData,
  handelselectjobtitle,
  ShowAutocomplete,
  setShowAutocomplete,
  handlesearch,
  handelselectdata,
  ResponseDatanew, ShowAutocompleteprimary,
  prefilledData, isFilterRetrieve,
  setShowAutocompleteprimary
}) {
  useEffect(() => {
    const handleClick = () => {
      setShowAutocompleteprimary(false);
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
  useEffect(() => {
    const handleClick = () => {
      setShowAutocomplete(false);
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
  const emtySearchdata = () => {
    setDecisionMakerData({ ...decisionMakerData, primaryOrganization: '', primaryJobTitle: '' });
  }
  const EmptyInputs = () => {
    setDecisionMakerData({
      decisionmaker: "",
      primaryOrganization: "",
      sample: "",
      primaryJobTitle: "",
      sampleTwo: "",
      country: "",
      state: "",
      josfStatus: "",
      strengthScore: "",
      addedName: "",
    })
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
                      <p>AI Prospect details</p>
                    </div>
                    <div className="question-markimage">
                    </div>
                  </div>
                  <div className="reloardformimages">
                    {prefilledData ? "" : <img onClick={EmptyInputs} src={reloardform} alt="" />}
                  </div>
                </div>
                <div className="label-form-prospect-div-head">
                  <label htmlFor="" className="label-floating">
                    Decision Maker
                  </label>
                  <FormControlProfile
                    value={decisionMakerData?.decisionmaker}
                    disabled={prefilledData?.decisionmaker || prefilledData}
                    handleChange={(e) => setDecisionMakerData({ ...decisionMakerData, decisionmaker: e?.target?.value })}
                    dataList={isFilterRetrieve?.data?.decision_maker}
                  />
                </div>
                <div className="label-form-prospect-div-head">
                  <label htmlFor="" className="label-floating">
                    Primary Organization
                  </label>
                  <Paper className='full-searchbar-ai-profile'
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                  >
                    <InputBase
                      value={decisionMakerData?.primaryOrganization}
                      disabled={prefilledData?.primary_organization || prefilledData}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        setDecisionMakerData({ ...decisionMakerData, primaryOrganization: inputValue });
                        if (e.target.value.length >= 3) {
                          setTimeout(() => {
                            handlesearch(inputValue);
                          }, 1000);
                        }
                      }}
                      className='search-inner-textai-profile'
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="Search"
                      inputProps={{ 'aria-label': 'Search google maps' }}
                      autocomplete="off"
                    />
                    {prefilledData?.primary_organization ? "" : <div onClick={emtySearchdata} className="cross-icon-prospect">
                      {decisionMakerData.primaryOrganization && (
                        <CloseIcon className='showicons' />
                      )}            </div>}
                    <div className="PrimaryOrganizationoutter">
                      {ShowAutocompleteprimary && (
                        <div className='PrimaryOrganization-data'>
                          <div className={ResponseDatanew === "" || ResponseDatanew?.length > 0 ? '-aiprofile ' : "sethjgcghjiohgh"}>
                            {ResponseDatanew && ResponseDatanew.length > 0 ? (
                              ResponseDatanew?.map((item) => {
                                return (
                                  <>
                                    <div className='innerAutocomplete' onClick={() => handelselectdata(item)} key={item.id}>
                                      {item?.org_name}
                                    </div>
                                    <div className='separatorline'></div>
                                  </>
                                )
                              })
                            ) : (
                              <div className={ResponseDatanew?.length === 0 ? 'nodatafound' : "degtyrrf"}>
                                {ResponseDatanew.primaryOrganization?.length || ResponseDatanew?.length === 0 ? "Not available" : ""}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </Paper>
                </div>
                <div className="label-form-prospect-div-head">
                  <label htmlFor="" className="label-floating">
                    Primary Job Title
                  </label>
                  <Paper className='full-searchbar-ai-profile'
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                  >
                    <InputBase
                      value={decisionMakerData?.primaryJobTitle}
                      disabled={prefilledData?.primary_organization || prefilledData}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        setDecisionMakerData({ ...decisionMakerData, primaryJobTitle: inputValue });
                      }}
                      className='search-inner-textai-profile'
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="Search"
                      inputProps={{ 'aria-label': 'Search google maps' }}
                      autocomplete="off"
                    />
                    {prefilledData?.primary_job_title ? "" : <div onClick={emtySearchdata} className="cross-icon-prospect">
                      {decisionMakerData.primaryJobTitle && (
                        <CloseIcon className='showicons' />
                      )}            </div>}
                    {ShowAutocomplete && (
                      <div className='setpositionaitable'>
                        <div className={ResponseJobData === "" || ResponseJobData?.length > 0 ? 'Autocompletedropdowna-aiprofile ' : "sethjgcghjiohgh"}>
                          {ResponseJobData && ResponseJobData.length > 0 ? (
                            ResponseJobData?.map((item) => {
                              return (
                                <>
                                  <div className='innerAutocomplete' onClick={() => handelselectjobtitle(item)} key={item.id}>
                                    {item?.primary_job_title}
                                  </div>
                                  <div className='separatorline'></div>
                                </>
                              )
                            })
                          ) : (
                            <div className={ResponseJobData?.length === 0 ? 'nodatafound' : "degtyrrf"}>
                              {decisionMakerData.primaryJobTitle?.length || ResponseJobData?.length === 0 ? "Not available" : ""}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </Paper>
                </div>
                <div className="label-form-prospect-div-head">
                  <label htmlFor="" className="label-floating">
                    Country
                  </label>
                  <FormControlProfile
                    value={decisionMakerData?.country}
                    disabled={prefilledData?.country || prefilledData}
                    handleChange={(e) => setDecisionMakerData({ ...decisionMakerData, country: e?.target?.value })}
                    dataList={isFilterRetrieve?.data?.country}
                  />
                </div>
                <div className="label-form-prospect-div-head">
                  <label htmlFor="" className="label-floating">
                    State
                  </label>
                  <FormControlProfile
                    value={decisionMakerData?.state}
                    disabled={prefilledData?.state || prefilledData}
                    handleChange={(e) => setDecisionMakerData({ ...decisionMakerData, state: e?.target?.value })}
                    dataList={decisionMakerData?.country === "United States" ? isFilterRetrieve?.data?.state : isFilterRetrieve?.data?.ca_states}
                  />
                </div>
                <div className="label-form-prospect-div-head">
                  <label htmlFor="" className="label-floating">
                    JOSF Status
                  </label>
                  <FormControlProfile
                    value={decisionMakerData?.josfStatus}
                    disabled={prefilledData?.josf_status || prefilledData}
                    handleChange={(e) => setDecisionMakerData({ ...decisionMakerData, josfStatus: e?.target?.value })}
                    dataList={isFilterRetrieve?.data?.josf_status}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            {prefilledData?.id ? null : tableShowResult ?
              <Stack className="stack-form-button">
                <Button
                  variant="contained"
                  className="Show-result-button-form"
                  style={{ textTransform: "none" }}
                  onClick={() => setTableShowResult(false)}
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
                  {"Show Result"}
                </Button>
              </Stack>
            }
          </div>
        </div>
      </FormControl>
    </div>
  );
}