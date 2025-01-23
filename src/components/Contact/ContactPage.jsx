import React from "react";
import MapSection from "./MapSection";
import ContactFormSection from "./ContactFormSection";
import ContactInfoSection from "./ContactInfoSection";

const ContactPage = () => {
  return (
    <div className="w-full h-full md:mt-8 px-8">
      <div className="flex flex-col gap-6">
        {/* Map and Info Section */}
        <div className="w-full flex flex-col items-center md:flex-row gap-6">
          <div className="w-full md:w-1/2 bg-white shadow-xl rounded-lg overflow-hidden">
            <MapSection />
          </div>
          <div className="w-full md:w-1/2">
            <ContactInfoSection />
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="w-full">
          <ContactFormSection />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;