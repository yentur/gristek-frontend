import React, { useState } from "react";
import TurkeyMap from "turkey-map-react";
import waterBG from "../../dist/images/water.jpeg";
import { useApi } from "../../context/ApiProvider";

const AnalysisContent = () => {
  const { data, error } = useApi();
  const {
    citiesOverview,
    totalSavings,
    totalModules,
    economicImpact,
    topSavingCity,
  } = data;

  const [hoveredCity, setHoveredCity] = useState("");
  const [hoveredCityData, setHoveredCityData] = useState(null);
  const [modalData, setModalData] = useState(null);

  const handleHover = (city) => {
    setHoveredCity(city.name);
    setHoveredCityData(citiesOverview[city.name] || null);
  };

  const handleHoverLeave = () => {
    setHoveredCity("");
    setHoveredCityData(null);
  };

  const handleCityClick = (city) => {
    if (!citiesOverview[city.name]) return;
    setModalData(citiesOverview[city.name] || null);
  };

  const closeModal = () => {
    setModalData(null);
  };

  const priceFormatter = (price) => {
    return price.toLocaleString("tr-TR", {
      style: "currency",
      currency: "TRY",
    });
  }

  return (
    <div className="w-full h-full">
      <div className="container mx-auto md:py-12 px-4">
        {/* Sayfa Başlığı ve Açıklama */}
        <div className="text-start mb-10">
          <h1 className="text-3xl font-bold text-gray-800">
            Su Tasarrufu Analizi
          </h1>
          <p className="text-md text-gray-600 mt-4">
            Türkiye genelinde su tasarrufu ve ekonomik katkı bilgileri.
          </p>
        </div>

        {/* Ekonomik Katkı */}
        <div
          className="bg-gradient-to-br from-pc-100 to-pc-200 text-white text-center p-8 rounded-xl shadow-lg mb-6 animate-gradient-move"
          style={{
            backgroundSize: "200% 200%",
            animation: "gradient-move 6s infinite",
          }}
        >
          <h2 className="text-xl font-extrabold">Ülke Ekonomisine Katkı</h2>
          <p className="text-4xl font-bold mt-4">{priceFormatter(economicImpact)} ₺</p>
          <p className="text-sm mt-4">
            Su tasarrufu ile Türkiye genelinde yapılan toplam ekonomik katkı.
          </p>
        </div>

        {/* Üst Kartlar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Toplam Modül Sayısı */}
          <div
            className="bg-gray-700 text-white p-6 rounded-xl shadow-lg transform transition duration-500 hover:scale-105"
            style={{
              backgroundImage: `url(${waterBG})`,
              backgroundSize: "cover",
              backgroundBlendMode: "overlay",
            }}
          >
            <h2 className="text-lg font-semibold mb-4">
              Toplam GRİSTEK Modül Sayısı
            </h2>
            <p className="text-4xl font-extrabold">{totalModules}</p>
            <div className="mt-4 text-sm opacity-75">
              Türkiye genelinde kullanılan modüller.
            </div>
          </div>

          {/* Toplam Su Tasarrufu */}
          <div
            className="bg-green-700 text-white p-6 rounded-xl shadow-lg transform transition duration-500 hover:scale-105"
            style={{
              backgroundImage: `url(${waterBG})`,
              backgroundSize: "cover",
              backgroundBlendMode: "overlay",
            }}
          >
            <h2 className="text-lg font-semibold mb-4">Toplam Su Tasarrufu</h2>
            <p className="text-4xl font-extrabold">{totalSavings / 1000} m³</p>
            <div className="mt-4 text-sm opacity-75">
              Tüm modüllerle sağlanan toplam tasarruf.
            </div>
          </div>

          {/* En Çok Tasarruf Yapan İl */}
          <div
            className="bg-gray-700 text-white p-6 rounded-xl shadow-lg transform transition duration-500 hover:scale-105"
            style={{
              backgroundImage: `url(${waterBG})`,
              backgroundSize: "cover",
              backgroundBlendMode: "overlay",
            }}
          >
            <h2 className="text-lg font-semibold mb-4">
              En Çok Tasarruf Yapan İl
            </h2>
            <p className="text-4xl font-extrabold">{topSavingCity.Name}</p>
            <div className="mt-4 text-sm opacity-75">
              {topSavingCity.Name}, {topSavingCity.Savings} litre su tasarrufu
              ile lider.
            </div>
          </div>
        </div>

        {/* Harita ve İl Bilgileri */}
        <div className="hidden md:block bg-white p-6 mt-12 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            İl Bazlı Tasarruf Bilgileri
          </h2>
          <div className="relative">
            <TurkeyMap
              customStyle={{
                idleColor: "#cbd5e1",
                hoverColor: "#5f56c6",
                textColor: "#374151",
              }}
              hoverable
              onHover={handleHover}
              onHoverLeave={handleHoverLeave}
              onClick={handleCityClick}
            />
            {hoveredCity && hoveredCityData && (
              <div
                className="absolute bg-white text-gray-800 p-4 rounded-lg shadow-xl border border-gray-200"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <h3 className="text-lg font-bold">{hoveredCity}</h3>
                <p className="text-sm">
                  Tasarruf: {hoveredCityData.savings.toLocaleString()} Litre
                </p>
                <p className="text-sm">Modüller: {hoveredCityData.modules}</p>
              </div>
            )}
          </div>
        </div>

        {/* Modal */}
        {modalData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
              {/* Modal Header */}
              <div className="flex justify-between items-center border-b border-gray-200 p-4">
                <h3 className="text-2xl font-semibold text-gray-900">
                  {modalData.name}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-red-500 transition-transform transform hover:scale-110"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Modal İçerik */}
              <div className="p-6 space-y-6">
                {/* Modül Sayısı */}
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">
                    Toplam <b>GRİSTEK</b> Modül Sayısı
                  </span>
                  <span className="text-2xl font-bold text-gray-900">
                    {modalData.modules}
                  </span>
                </div>

                {/* Tasarruf Miktarı */}
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">
                    Tasarruf Miktarı
                  </span>
                  <span className="text-2xl font-bold text-green-500">
                    {modalData.savings} Litre
                  </span>
                </div>

                {/* Kullanım Dağılımı */}
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-3">
                    Modül Kullanım Dağılımı
                  </h4>
                  <div className="grid grid-cols-4 gap-4 text-center">
                    {Object.entries(modalData.usage).map(([key, value]) => (
                      <div key={key}>
                        <span className="block text-2xl font-bold text-gray-900">
                          {value}
                        </span>
                        <span className="text-xs text-gray-500">
                          {key.toUpperCase()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dağıtılmış Tasarruf */}
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-3">
                    Tasarruf Dağılımı (Litre)
                  </h4>
                  <div className="grid grid-cols-4 gap-4 text-center">
                    {Object.entries(modalData.distributedSavings).map(
                      ([key, value]) => (
                        <div key={key}>
                          <span className="block text-2xl font-bold text-gray-900">
                            {value.toLocaleString()}
                          </span>
                          <span className="text-xs text-gray-500">
                            {key.toUpperCase()}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Kapat Butonu */}
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full sm:w-auto inline-flex justify-center rounded-lg shadow-lg px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-base font-medium text-white hover:from-red-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transform hover:scale-105 transition-transform"
                  onClick={closeModal}
                >
                  Kapat
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisContent;
