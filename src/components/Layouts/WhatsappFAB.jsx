import React from "react";

const WhatsAppFAB = () => {
  const whatsappUrl = "https://wa.me/905067747835"; // WhatsApp numarası
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 bg-green-500 rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-green-600 transition duration-300"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
        className="w-8 h-8"
      />
    </a>
  );
};

export default WhatsAppFAB;
