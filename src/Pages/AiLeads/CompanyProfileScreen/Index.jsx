import React, { useEffect, useRef, useState } from "react";
import "./Style.css";
import Layout from "../../../Components/Layout/Layout";
import CompanyProfile from "../../../Components/AiLeads/CompanyProfile/Index";
import CompanyProfileTabs from "../../../Components/AiLeads/CompanyProfileTabs/Index";
import { useLocation } from "react-router-dom/dist";
import axios from "axios";
import Loader from "../../../Components/Loader/Loader";
import { APIUrlOne } from "../../../Utils/Utils";
import PDFdatafile from "../PDFDATA/PDFdatafile";
import PDFTabs from "../PDFDATA/PDFTabs";
import generatePDF, { Resolution, Margin } from 'react-to-pdf';
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import html2pdf from 'html2pdf.js';
import CombinedPDFComponent from "../PDFDATA/CombinedData";
const AILeads = () => {
  const [isSalesForceTrigger, setIsSalesForceTrigger] = React.useState(false);
  const [isDecisionMakerExcel, setIsDecisionMakerExcel] = React.useState(false);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [isLoadInfoData, setIsLoadInfoData] = useState(false);
  const newdata = location?.state?.data;
  const [dataForInformation, setDataForInformation] = useState("");
  const informationData = () => {
    setLoading(true);
    const option = {
      method: "GET",
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json",
      },
      url: `${APIUrlOne()}/v1/get_org_description?org_id=${newdata?.org_id || newdata.id
        }`,
    };
    axios(option)
      .then((e) => {
        setLoading(false);
        if (e?.status === 200) {
          setDataForInformation(e?.data?.data[0]);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (newdata && isLoadInfoData) {
      informationData();
    } else {
      setIsLoadInfoData(true);
    }
  }, [newdata, isLoadInfoData]);
  
  const ref = useRef(null);
  const [generatePdf, setGeneratePdf] = useState(false);
  const contentRef = useRef(null);
  const handleToPDF = () => {
    setGeneratePdf(true)
    setTimeout(() => {
           
             setTimeout(() => {
               setGeneratePdf(false);
             }, 1000);
           }, 2000);
    const content = contentRef.current;
    const options = {
      filename: 'my-document.pdf',
      margin: 1,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: {
        margin: Margin.MEDIUM,
           format: 'letter',
            orientation: 'landscape',
      },
    };
    html2pdf().set(options).from(content).save();
  };
  return (
    <>
      {loading ? <Loader /> : null}
      <Layout>
        <div className="">
          <div className="child-section-of-everypage-CompanyProfileScreen">
            <CompanyProfile
              dataForInformation={dataForInformation}
              handleToPDF={handleToPDF}
              setIsDecisionMakerExcel={setIsDecisionMakerExcel}
              isSalesForceTrigger={isSalesForceTrigger}
              isDecisionMakerExcel={isDecisionMakerExcel}
              rowData={newdata}
              setIsSalesForceTrigger={setIsSalesForceTrigger} />
          </div>
          <div className="child-section-CompanyProfileTabs">
            <CompanyProfileTabs
              handleToPDF={handleToPDF}
              dataForInformation={dataForInformation}
              rowData={newdata}
              setIsDecisionMakerExcel={setIsDecisionMakerExcel}
              isDecisionMakerExcel={isDecisionMakerExcel}
              isSalesForceTrigger={isSalesForceTrigger}
            />
          </div>
        </div>
        <div style={{ display: generatePdf ? 'block' : 'none' }}>
          <div id="content-id" ref={contentRef} style={{ fontSize: '5px' }}>
          <CombinedPDFComponent style={{width:"100%"}}  dataForInformation={dataForInformation}  rowData={newdata}  />
          </div>
        </div>
      </Layout>
    </>
  );
};
export default AILeads;