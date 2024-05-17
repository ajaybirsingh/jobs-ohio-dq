import * as React from 'react';
import "./Style.css"
import { Button, Divider } from '@mui/material';
import LabelInput from '../../LabelInputFields/Index';
import CloseIcon from '@mui/icons-material/Close';
export default function SearchAiPath({
    setToinput, Toinput,
    showAutocompletenew,
    setShowAutocompletenew,
    Fromalldata,
    setFromalldata,
     showAutocomplete, setShowAutocomplete,
    ResponseData, ResponseDatanew
    , handelselectdata, handelselectdatanew, handleRightsidebar }) {
    const hnadelClearnew = () => {
        setFromalldata("")
    }
    const hnadelClear = () => {
        setToinput("")
    }
    return (
        <>
            <div className='main-for-search-ai-path'>
                <div className='inner-main-for-search-ai-path'>
                    <div><p className='search-ai-path-head'>Search AI Paths</p></div>
                    <div className='inputs-button-search-ai-path'>
                        <div className='inner-boxs-serch-path'>
                            <label htmlFor="" className='label-search-aipath-component'>From</label>
                            <div className='inputs-in-search-ai-path'>
                                <LabelInput
                            placeholder="e.g.,John Smith"
                                    value={Fromalldata}
                                    onChange={(e) => {
                                        const inputValue = e.target.value;
                                        setFromalldata(inputValue);
                                        setShowAutocomplete(true);
                                     
                                    }}
                                />
                                <div onClick={hnadelClearnew} className='close-icns'>
                                    {Fromalldata && (
                                        <CloseIcon />
                                    )}
                                </div>
                            </div>
                            {showAutocomplete && (
                                <div className='setposition'>
                                    <div className={ResponseData === "" || ResponseData?.length > 0 ? 'Autocompleteaipath' : "sethjgcghjiohgh"}>
                                        {ResponseData && ResponseData.length > 0 ? (
                                            ResponseData?.map((item) => {
                                                return (
                                                    <>
                                                        <div className='innerAutocomplete' onClick={() => handelselectdata(item)} key={item.id}>
                                                            {item.first_name}&nbsp;{item.last_name},&nbsp;
                                                            {item.primary_job_title},&nbsp;
                                                            {item.primary_organization}
                                                        </div>
                                                        <div className='separatorline'></div>
                                                    </>
                                                )
                                            })
                                        ) : (
                                            <div className={ResponseData?.length === 0 ? 'notAvailable' :  "degtyrrf"}>
                                                { Fromalldata?.length || ResponseData?.length === 0 ?  "Not available" : ""}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='inner-boxs-serch-path'><label htmlFor="" className='label-search-aipath-component'>To</label>
                            <div className='inputs-in-search-ai-path' >
                                <LabelInput
                            placeholder="e.g.,Bob Smith"

                                    value={Toinput}
                                    onChange={(e) => {
                                        const inputValue = e.target.value;
                                        setToinput(inputValue);
                                        setShowAutocompletenew(true);
                                    }} />
                                <div onClick={hnadelClear} className='close-icns'>
                                    {Toinput && (
                                        <CloseIcon />
                                    )}
                                </div>
                            </div>
                            {showAutocompletenew && (
                                <div className='setposition'>
                                    <div className={ResponseDatanew === "" || ResponseDatanew?.length > 0 ? 'Autocompleteaipath' : null}>
                                        {ResponseDatanew && ResponseDatanew.length > 0 ? (
                                            ResponseDatanew?.map(item => (
                                                <>
                                                    <div className='innerAutocomplete' onClick={() => handelselectdatanew(item)} key={item.id}>
                                                        {item.first_name}&nbsp; {item.last_name}, &nbsp;{item.primary_job_title}&nbsp; {item.primary_organization}
                                                    </div>
                                                    <div className='separatorline'></div>
                                                </>
                                            ))
                                        ) : (
                                            <div className={ResponseDatanew?.length === 0 ? 'notAvailable' :  "degtyrrf"}
                                            >
                                                { Toinput?.length || ResponseDatanew?.length === 0 ?  "Not available" : ResponseDatanew}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='inner-boxs-serch-path'>
                            <Button style={{ textTransform: 'none' }} className='search-aipath-button-component' onClick={handleRightsidebar}>Search AI Path</Button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}