import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./ComingSoon.css";
import Layout from "../Layout/Layout";
import { useNavigate } from "react-router-dom";
export default function Comingsoon(props) {
  const navigate = useNavigate();
  const renderContent = () => (
    <div>
      <div className="ComingSoon-outerr-container">
        <div className="ComingSoon-inner">
          <div className="ComingSoon-inner-heading">
            <h3>Coming soon</h3>
            <p className="ComingSoon-scheduled">in JOI 2.0 and JOI 2.1 versions scheduled for FY 2025</p>
            <p className="ComingSoonleftside"> (Between July 2024 and June 2025)</p>
            {
              url === '/comingSoon' ? null :
                <Stack className="BacktoDashbaordbuttonstack" spacing={2} direction="row">
                  <Button className="BacktoDashbaordbutton" variant="outlined" onClick={() => navigate('/dashboard')}>Back to Dashbaord</Button>
                </Stack>
            }
          </div>
        </div>
      </div>
    </div>
  )
  const url = window?.location?.pathname
  if (props?.withoutLayout) {
    return renderContent()
  } else {
    return (
      <>
        <Layout>
          {renderContent()}
        </Layout>
      </>
    );
  }
}