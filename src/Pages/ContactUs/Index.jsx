import React from "react";
import Layout from "../../Components/Layout/Layout";
import ContactUsScreen from "../../Components/ContactUs/ContactUs";
import "./Style.css";


const ContactUs = () => {

  return (
    <>
      <Layout className={"paddingSet"}>
        <div className="ContactUsScreen-parent">
          <ContactUsScreen />
        </div>
      </Layout>
    </>
  );
};
export default ContactUs;