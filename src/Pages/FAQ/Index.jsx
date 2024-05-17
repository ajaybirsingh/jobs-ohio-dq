import React from "react";
import Layout from "../../Components/Layout/Layout";
import "./Style.css";
import Faqscreen from "../../Components/FAQ/Accordian/Accordian";
import Glossary from "../../Components/FAQ/Glossary/Glossary";
const FaqLayout = () => {
  return (
    <>
      <Layout className={"paddingSet"}>
        <div className="Faqscreen-parent">
          <Faqscreen />
          <Glossary/>
        </div>
      </Layout>
    </>
  );
};
export default FaqLayout;