import React from 'react';

const MapSection = () => {
    return (
      <section className="w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3034.7897084674505!2d34.8536421153979!3d40.47991707935792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4080d605a403d143%3A0xcefb41a389677986!2s%C3%87orum%20Teknopark!5e0!3m2!1str!2str!4v1674199806275!5m2!1str!2str"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Gristek Location"
            />
      </section>
    );
  };
  
  
export default MapSection;