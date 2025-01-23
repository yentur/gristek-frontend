import React, { useState } from "react";
import TurkeyMap from "turkey-map-react";
import Header from "./Header";
import Footer from "./Footer";
import waterBG from "../dist/images/water.jpeg";

const _data = {
  totalModules: 0, // Başlangıçta 0
  totalSavings: 0, // Başlangıçta 0
  cities: {
    Ankara: {
      name: "Ankara",
      modules: 0, // Başlangıçta 0
      savings: 259863,
      pricePerTon: {
        kamu: 36.29, // Kamu için ton başına fiyat
        isyeri: 92.46, // İş yeri için ton başına fiyat
        osb: 92.46, // OSB için ton başına fiyat
      },
      usage: { kamu: 80, isyeri: 10, osb: 10 },
    },
    İstanbul: {
      name: "İstanbul",
      modules: 0, // Başlangıçta 0
      savings: 675832,
      pricePerTon: {
        kamu: 36.72,
        isyeri: 109.35,
        osb: 109.35,
      },
      usage: { kamu: 60, isyeri: 20, osb: 20 },
    },
  },
};

const calculateData = (data) => {
  let totalModules = 0;
  let totalSavings = 0;

  const updatedCities = Object.entries(data.cities).reduce(
    (acc, [cityName, cityData]) => {
      // usage değerlerinden modules hesapla
      const calculatedModules =
        cityData.usage.kamu + cityData.usage.isyeri + cityData.usage.osb;

      // savings'i toplama ekle
      totalSavings += cityData.savings;

      // modules'i toplama ekle
      totalModules += calculatedModules;

      // Şehir verisini güncelle
      acc[cityName] = {
        ...cityData,
        modules: calculatedModules,
      };

      return acc;
    },
    {}
  );

  return {
    ...data,
    totalModules,
    totalSavings,
    cities: updatedCities,
  };
};

const data = calculateData(_data);

const calculateEconomicImpact = () => {
  let totalGrossImpact = 0;

  Object.entries(_data.cities).forEach(([_, cityData]) => {
    // Kamu tasarrufu: Ton başına fiyat * kullanılan kamu modülleri
    const kamuSavingsInTons = cityData.usage.kamu; // Kamu kullanım miktarı zaten ton
    const kamuImpact = kamuSavingsInTons * cityData.pricePerTon.kamu;

    // İş yeri tasarrufu
    const isyeriSavingsInTons = cityData.usage.isyeri; // İş yeri kullanım miktarı
    const isyeriImpact = isyeriSavingsInTons * cityData.pricePerTon.isyeri;

    // OSB tasarrufu
    const osbSavingsInTons = cityData.usage.osb; // OSB kullanım miktarı
    const osbImpact = osbSavingsInTons * cityData.pricePerTon.osb;

    // Şehir bazlı toplam etkiyi ekle
    totalGrossImpact += kamuImpact + isyeriImpact + osbImpact;
  });

  // Toplam kazançtan %3 düş
  const netImpact = totalGrossImpact * 0.97;
  return netImpact.toFixed(2); // İki ondalık basamak
};

const getTopSavingCity = () => {
  // Verileri şehirlerin tasarruf miktarına göre sıralar
  const sortedCities = Object.entries(data.cities).sort(
    ([, a], [, b]) => b.savings - a.savings
  );

  // En fazla tasarruf yapan ilk şehri alır
  const [cityName, cityData] = sortedCities[0];
  return { cityName, savings: cityData.savings };
};

const Analysis = () => {
  const [hoveredCity, setHoveredCity] = useState("");
  const [hoveredCityData, setHoveredCityData] = useState(null);
  const [modalData, setModalData] = useState(null);

  const handleHover = (city) => {
    setHoveredCity(city.name);
    setHoveredCityData(data.cities[city.name] || null);
  };

  const handleHoverLeave = () => {
    setHoveredCity("");
    setHoveredCityData(null);
  };

  const handleCityClick = (city) => {
    if (!data.cities[city.name]) return;

    setModalData(data.cities[city.name] || null);
  };

  const closeModal = () => {
    setModalData(null);
  };

  const economicImpact = calculateEconomicImpact();
  const { cityName: topCity, savings: topSavings } = getTopSavingCity();

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
          className="bg-gradient-to-br from-pc-100 to-pc-200 text-white text-center p-8 rounded-xl shadow-lg mb-10 animate-gradient-move"
          style={{
            backgroundSize: "200% 200%",
            animation: "gradient-move 6s infinite",
          }}
        >
          <h2
            className="text-2xl font-extrabold"
            style={{ textShadow: "2px 2px 6px rgba(0, 0, 0, 0.6)" }}
          >
            Ülke Ekonomisine Katkı
          </h2>
          <p
            className="text-4xl font-bold mt-4"
            style={{ textShadow: "3px 3px 10px rgba(0, 0, 0, 0.7)" }}
          >
            {economicImpact} ₺
          </p>
          <p
            className="text-md mt-4"
            style={{ textShadow: "1px 1px 4px rgba(0, 0, 0, 0.5)" }}
          >
            Su tasarrufu ile Türkiye genelinde yapılan toplam ekonomik katkı.
          </p>
        </div>

        {/* Üst Kartlar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Toplam Modül Sayısı */}
          <div
            className="bg-gray-700 text-white p-6 rounded-xl shadow-lg transform transition duration-500 hover:scale-105"
            style={{
              backgroundImage: `url(${waterBG})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundBlendMode: "overlay",
            }}
          >
            <h2 className="text-lg font-semibold mb-4">
              Toplam GRİSTEK Modül Sayısı
            </h2>
            <p className="text-4xl font-extrabold">{data.totalModules}</p>
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
              backgroundPosition: "center",
              backgroundBlendMode: "overlay",
            }}
          >
            <h2 className="text-lg font-semibold mb-4">Toplam Su Tasarrufu</h2>
            <p className="text-4xl font-extrabold">
              {(data.totalSavings / 1000).toLocaleString()} m³
            </p>
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
              backgroundPosition: "center",
              backgroundBlendMode: "overlay",
            }}
          >
            <h2 className="text-lg font-semibold mb-4">
              En Çok Tasarruf Yapan İl
            </h2>
            <p className="text-4xl font-extrabold">{topCity}</p>
            <div className="mt-4 text-sm opacity-75">
              {topCity}, {topSavings.toLocaleString()} litre su tasarrufu ile
              lider.
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
                hoverColor: "#4f46e5",
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
              <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">
                    Toplam Modüller
                  </span>
                  <span className="text-2xl font-bold text-gray-900">
                    {modalData.modules}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">
                    Tasarruf Miktarı
                  </span>
                  <span className="text-2xl font-bold text-green-500">
                    {modalData.savings.toLocaleString()} Litre
                  </span>
                </div>
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-3">
                    Kullanım Dağılımı
                  </h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <span className="block text-2xl font-bold text-gray-900">
                        {modalData.usage.kamu}
                      </span>
                      <span className="text-xs text-gray-500">Kamu</span>
                    </div>
                    <div>
                      <span className="block text-2xl font-bold text-gray-900">
                        {modalData.usage.isyeri}
                      </span>
                      <span className="text-xs text-gray-500">İşyeri</span>
                    </div>
                    <div>
                      <span className="block text-2xl font-bold text-gray-900">
                        {modalData.usage.osb}
                      </span>
                      <span className="text-xs text-gray-500">OSB</span>
                    </div>
                  </div>
                </div>
              </div>
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

export default Analysis;
