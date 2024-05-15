import React from "react";
import "./Style.css";
import Layout from "../../Components/Layout/Layout";
import TabsAiProfile from "../../Components/AiProfile/TabsAiProfile/Index";
const AiProfile = () => {
  const [refState, setRefState] = React.useState(false)
  const [refStatenew, setRefStatenew] = React.useState(false);
  return (
    <>
      <Layout className={"paddingSet"} setRefState={setRefState} refStatenew={refStatenew} setRefStatenew={setRefStatenew} refState={refState}>
        <div>
          <TabsAiProfile setRefStatenew={setRefStatenew} setRefState={setRefState} />
        </div>
        <div className="childed-section-of-everypage set-tabs-ai-section">
        </div>
      </Layout>
    </>
  );
};
export default AiProfile;