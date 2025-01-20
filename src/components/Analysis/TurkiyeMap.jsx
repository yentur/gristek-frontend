import React, { useState } from "react";
import TurkeyMap from "turkey-map-react";

const TurkiyeMap = () => {
  const [hoveredCity, setHoveredCity] = useState("");

  const handleHover = (city) => {
    setHoveredCity(city.plate); // Hover edilen şehri belirle
  };

  const handleHoverLeave = () => {
    setHoveredCity(""); // Hover sona erdiğinde sıfırla
  };

  return (
    <div className="turkey-map-container">
      {/* Türkiye Haritası */}
      <TurkeyMap
        customStyle={{
          idleColor: "#6f9c76", // Normal durum rengi
          hoverColor: "#2563eb", // Hover rengi
          textColor: "#000", // İl isimlerinin rengi
        }}
        hoverable
        onHover={handleHover}
        onHoverLeave={handleHoverLeave}
      />

      {/* CSS */}
      <style jsx>{`
        .turkey-map-container {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          position: relative;
        }

        /* Varsayılan şehir stili */
        path {
          fill: #6f9c76;
          transition: transform 0.3s ease, fill 0.3s ease, filter 0.3s ease;
          transform-origin: center bottom; /* Yükselme tabandan başlasın */
        }

        /* Hover edilen şehir */
        path:hover,
        path[data-id="${hoveredCity}"] {
          fill: #2563eb; /* Hover rengi */
          cursor: pointer;
          transform: translateY(-20px) scaleY(1.5); /* Yukarı çıkar ve dikey olarak büyür */
          filter: drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.3)); /* Gölge */
          transition: transform 0.3s ease-in-out, filter 0.3s ease-in-out;
        }

        /* Perspective eklemek için SVG'nin kapsayıcısına 3D özellik */
        .turkey-map-container {
          perspective: 1000px; /* 3D derinlik efekti */
        }
      `}</style>
    </div>
  );
};

export default TurkiyeMap;
