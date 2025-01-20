import React, { useState, useEffect } from "react";
import cityData from "../data/city_data.json";
import calcultedData from "../data/calculater_data.json";
import { FaLeaf, FaChartLine, FaTools, FaBolt, FaMoneyBillWave } from "react-icons/fa";

const CalculaterContent = () => {
  const cities = [
    "Adana",
    "Adıyaman",
    "Afyonkarahisar",
    "Ağrı",
    "Amasya",
    "Ankara",
    "Antalya",
    "Artvin",
    "Aydın",
    "Balıkesir",
    "Bilecik",
    "Bingöl",
    "Bitlis",
    "Bolu",
    "Burdur",
    "Bursa",
    "Çanakkale",
    "Çankırı",
    "Çorum",
    "Denizli",
    "Diyarbakır",
    "Edirne",
    "Elazığ",
    "Erzincan",
    "Erzurum",
    "Eskişehir",
    "Gaziantep",
    "Giresun",
    "Gümüşhane",
    "Hakkari",
    "Hatay",
    "Isparta",
    "Mersin",
    "İstanbul",
    "İzmir",
    "Kars",
    "Kastamonu",
    "Kayseri",
    "Kırklareli",
    "Kırşehir",
    "Kocaeli",
    "Konya",
    "Kütahya",
    "Malatya",
    "Manisa",
    "Kahramanmaraş",
    "Mardin",
    "Muğla",
    "Muş",
    "Nevşehir",
    "Niğde",
    "Ordu",
    "Rize",
    "Sakarya",
    "Samsun",
    "Siirt",
    "Sinop",
    "Sivas",
    "Tekirdağ",
    "Tokat",
    "Trabzon",
    "Tunceli",
    "Şanlıurfa",
    "Uşak",
    "Van",
    "Yozgat",
    "Zonguldak",
    "Aksaray",
    "Bayburt",
    "Karaman",
    "Kırıkkale",
    "Batman",
    "Şırnak",
    "Bartın",
    "Ardahan",
    "Iğdır",
    "Yalova",
    "Karabük",
    "Kilis",
    "Osmaniye",
    "Düzce",
  ];

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedHomeType, setSelectedHomeType] = useState("");
  const [selectedHours, setSelectedHours] = useState("");
  const [selectedDays, setSelectedDays] = useState("");
  const [selectedWorkers, setSelectedWorkers] = useState("");
  const [selectedWC, setSelectedWC] = useState("");
  const [selectedWCL, setSelectedWCL] = useState("");
  const [cost, setCost] = useState(null);
  const [results, setResults] = useState({});
  const [showResults, setShowResults] = useState(false);

  const generateOptions = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, i) => (
      <option key={i + start} value={i + start}>
        {i + start}
      </option>
    ));
  };

  useEffect(() => {
    if (selectedCity && selectedHomeType) {
      setCost(cityData[selectedHomeType][selectedCity]);
    } else {
      setCost(null);
    }
  }, [selectedCity, selectedHomeType]);

  const calculateResults = () => {
    if (!cost || !selectedDays || !selectedWorkers || !selectedHours) return;

    const savingsAmount = selectedDays * selectedWorkers * selectedHours * 4;
    const savingsValue =
      (cost * selectedDays * selectedWorkers * selectedHours * 4) / 1000;
    const filterCost = calcultedData["filter"] * selectedWCL;
    const electricityCost = calcultedData["electric"] * selectedWCL;
    const netProfit = savingsValue - (electricityCost + filterCost);

    setResults({
      savingsAmount,
      savingsValue,
      filterCost,
      electricityCost,
      netProfit,
    });

    setShowResults(true);
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-start w-full h-full justify-center lg:gap-8 p-4 lg:p-10">
      {/* Form Bölümü */}
      <div
        className={`bg-white p-6 rounded-lg shadow-lg transition-all duration-500 ease-in-out w-full lg:w-2/3`}
      >
        <h1 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 text-center lg:text-left">
          Tasarruf Hesaplama Aracı
        </h1>
        <h2 className="text-sm lg:text-lg font-medium text-gray-600 mb-6 text-center lg:text-left">
          Lütfen bilgileri eksiksiz doldurunuz.
        </h2>

        <div className="space-y-4 lg:space-y-6">
          {/* Şehir Seçimi */}
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Şehir Seçiniz
            </label>
            <select
              id="city"
              className="block w-full rounded-lg border-gray-300 bg-gray-100 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-3 px-4"
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="">Seçiniz</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Hane Türü */}
          <div>
            <label
              htmlFor="homeType"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Hane Türü Seçiniz
            </label>
            <select
              id="homeType"
              className="block w-full rounded-lg border-gray-300 bg-gray-100 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-3 px-4"
              onChange={(e) => setSelectedHomeType(e.target.value)}
            >
              <option value="">Seçiniz</option>
              <option value="Devlet Dairesi">Devlet Dairesi</option>
              <option value="İşyeri">İşyeri</option>
              <option value="OBS">OSB</option>
            </select>
          </div>

          {/* Ayda Kaç Gün Açık */}
          <div>
            <label
              htmlFor="openDays"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Ayda Kaç Gün Açık?
            </label>
            <select
              id="openDays"
              className="block w-full rounded-lg border-gray-300 bg-gray-100 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-3 px-4"
              onChange={(e) => setSelectedDays(e.target.value)}
            >
              <option value="">Seçiniz</option>
              {generateOptions(20, 31)}
            </select>
          </div>

          {/* Günde Kaç Saat */}
          <div>
            <label
              htmlFor="openHours"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Günde Kaç Saat?
            </label>
            <select
              id="openHours"
              className="block w-full rounded-lg border-gray-300 bg-gray-100 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-3 px-4"
              onChange={(e) => setSelectedHours(e.target.value)}
            >
              <option value="">Seçiniz</option>
              {generateOptions(0, 24)}
            </select>
          </div>

          {/* Kaç Personel */}
          <div>
            <label
              htmlFor="personnel"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Kaç Personel?
            </label>
            <input
              type="number"
              placeholder="Personel Sayısı"
              id="personnel"
              className="block w-full rounded-lg border-gray-300 bg-gray-100 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-3 px-4"
              onChange={(e) => setSelectedWorkers(e.target.value)}
            />
          </div>

          {/* Kaç Adet Tuvalet */}
          <div>
            <label
              htmlFor="toilets"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Kaç Adet Tuvalet Mevcut?
            </label>
            <select
              id="toilets"
              className="block w-full rounded-lg border-gray-300 bg-gray-100 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-3 px-4"
              onChange={(e) => setSelectedWC(e.target.value)}
            >
              <option value="">Seçiniz</option>
              {generateOptions(1, 25)}
            </select>
          </div>

          {/* Tuvaletteki Lavabolar Kaçlı */}
          <div>
            <label
              htmlFor="lavabos"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Tuvaletteki Lavabolar Kaçlı?
            </label>
            <select
              id="lavabos"
              className="block w-full rounded-lg border-gray-300 bg-gray-100 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-3 px-4"
              onChange={(e) => setSelectedWCL(e.target.value)}
            >
              <option value="">Seçiniz</option>
              {generateOptions(1, 20)}
            </select>
          </div>
        </div>

        <button
          className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          onClick={calculateResults}
        >
          Hesapla
        </button>
      </div>

      {showResults && (
        <div className="bg-white p-6 rounded-lg shadow-lg transition-all duration-500 ease-in-out w-full lg:w-1/3 mt-6 lg:mt-0">
          <h1 className="font-bold text-xl lg:text-2xl text-blue-600 mb-4 lg:mb-6">
            🎉 KAZANCINIZ!
          </h1>
          <div className="space-y-4 lg:space-y-6">
            <div className="flex items-center gap-4">
              <FaLeaf className="text-green-500 text-3xl" />
              <div>
                <h2 className="font-semibold text-lg text-gray-800">
                  Tasarruf Miktarı
                </h2>
                <p className="text-gray-600 text-base">
                  Aylık: {results.savingsAmount.toFixed(2)} Litre <br />
                  Yıllık: {(results.savingsAmount * 12).toFixed(2)} Litre
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FaChartLine className="text-yellow-500 text-3xl" />
              <div>
                <h2 className="font-semibold text-lg text-gray-800">
                  Tasarruf Tutarı
                </h2>
                <p className="text-gray-600 text-base">
                  Aylık: {results.savingsValue.toFixed(2)} ₺ <br />
                  Yıllık: {(results.savingsValue * 12).toFixed(2)} ₺
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FaTools className="text-red-500 text-3xl" />
              <div>
                <h2 className="font-semibold text-lg text-gray-800">
                  Filtre Maliyeti
                </h2>
                <p className="text-gray-600 text-base">
                  Aylık: {results.filterCost.toFixed(2)} ₺ <br />
                  Yıllık: {(results.filterCost * 12).toFixed(2)} ₺
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FaBolt className="text-indigo-500 text-3xl" />
              <div>
                <h2 className="font-semibold text-lg text-gray-800">
                  Elektrik Maliyeti
                </h2>
                <p className="text-gray-600 text-base">
                  Aylık: {results.electricityCost.toFixed(2)} ₺ <br />
                  Yıllık: {(results.electricityCost * 12).toFixed(2)} ₺
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FaMoneyBillWave className="text-green-600 text-3xl" />
              <div>
                <h2 className="font-semibold text-lg text-gray-800">
                  Net Kazanç Tutarı
                </h2>
                <p className="text-gray-600 text-base">
                  Aylık: {results.netProfit.toFixed(2)} ₺ <br />
                  Yıllık: {(results.netProfit * 12).toFixed(2)} ₺
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalculaterContent;
