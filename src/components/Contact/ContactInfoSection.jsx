import React from "react";
import {
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";

const ContactInfoSection = () => {
  return (
    <div className="p-8 h-auto w-full ">
      <div className="title-wrapper mb-6 text-left">
        <div className="title-subtitle text-xs text-pc-200 pb-1 font-bold uppercase">
          Bize Ulaşın
        </div>
        <h4 className="text-3xl font-bold text-gray-700">
          İletişim Bilgilerimiz
        </h4>
      </div>
      <div className="text-left text-gray-700 text-lg leading-relaxed space-y-4">
        <p className="flex items-center">
          <span>
            Mazlumoğlu Sok. Gurbetçi Şahin İş Merkezi 1/9, Karakeçili Mah.,
            Çorum, Türkiye
          </span>
        </p>
        <p className="flex items-center">
          <FaWhatsapp className="text-pc-100 mr-2 text-2xl" />
          <span>
            <a
              href="https://wa.me/905067747835"
              className="text-gray-700 hover:text-pc-100"
            >
              0506 774 78 35
            </a>
          </span>
        </p>
        <p className="flex items-center">
          <FaEnvelope className="text-pc-100 mr-2 text-2xl" />
          <span>
            <a
              href="mailto:support@gristek.com"
              className="text-gray-700 hover:text-pc-100"
            >
              support@gristek.com
            </a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default ContactInfoSection;
