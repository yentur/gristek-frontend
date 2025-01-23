import React from "react";

const CalculationForm = ({
  cities,
  generateOptions,
  setSelectedCity,
  setSelectedHomeType,
  setSelectedDays,
  setSelectedHours,
  setSelectedWorkers,
  setSelectedWC,
  setSelectedWCL,
  calculateResults,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full lg:w-2/3">
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
        className="mt-6 w-full bg-pc-200 hover:bg-pc-100 text-white font-medium py-3 px-4 rounded-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        onClick={calculateResults}
      >
        Hesapla
      </button>
    </div>
  );
};

export default CalculationForm;
