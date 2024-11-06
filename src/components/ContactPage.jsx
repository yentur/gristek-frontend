import React from 'react';
import Header from "./Header"
import MapSection from "./MapSection"
import ContactInfoSection from "./ContactInfoSection"
import Footer from "./Footer"

const ContactPage = () => {
  return (
      <div className="bg-white w-full h-full">
        <Header />
        <div className="flex flex-col w-full h-full justify-center items-start mt-24 gap-y-14">
          <MapSection />
          <ContactInfoSection />
          <Footer />
        </div>
      </div>
  );
};


export default ContactPage;
