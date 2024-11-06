import React, { useState, useEffect } from 'react';
import cityData from '../data/city_data.json';
import calcultedData from '../data/calculater_data.json';

const CalculaterContent = () => {
  const cities = [
    "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin",
    "Aydın", "Balıkesir", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale",
    "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum",
    "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Isparta", "Mersin",
    "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir", "Kocaeli",
    "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş",
    "Nevşehir", "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas",
    "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak",
    "Aksaray", "Bayburt", "Karaman", "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan",
    "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce"
  ];

  const [selectedCity, setSelectedCity] = useState('');
  const [selectedHomeType, setSelectedHomeType] = useState('');
  const [selectedHours, setSelectedHours] = useState('');
  const [selectedDays, setSelectedDays] = useState('');
  const [selectedWorkers, setSelectedWorkers] = useState('');
  const [selectedWC, setSelectedWC] = useState('');
  const [selectedWCL, setSelectedWCL] = useState('');
  const [cost, setCost] = useState(null);
  const [results, setResults] = useState({});
  const generateOptions = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, i) => (
      <option key={i + start} value={i + start}>{i + start}</option>
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

    const setupCost = calcultedData['modul'] * selectedWC + calcultedData['modul_ek'] * selectedWCL;
    const savingsAmount = selectedDays * selectedWorkers * selectedHours * 4;
    const savingsValue = (cost * selectedDays * selectedWorkers * selectedHours * 4) / 1000;
    const filterCost = calcultedData['filter'] * selectedWCL;
    const electricityCost = calcultedData['electric'] * selectedWCL;
    const netProfit = savingsValue - (electricityCost + filterCost);
    const paybackPeriod = netProfit > 0 ? Math.ceil(setupCost / netProfit) : 0;

    setResults({
      setupCost,
      savingsAmount,
      savingsValue,
      filterCost,
      electricityCost,
      netProfit,
      paybackPeriod,
    });
  };
  return (
    <div className="flex flex-col md:flex-row w-full h-full justify-center items-center md:items-start gap-10 mx-auto mt-10">
      <div className="bg-white p-6 rounded-lg shadow-3xl w-4/5 md:w-2/5">
        <h1 className="text-xl font-semibold mb-4">Bilgileri Doldurun!</h1>

        <div className="mb-4">
          <label htmlFor="city" className="block text-gray-700 font-bold mb-2">Şehir seçiniz</label>
          <select
            id="city"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option>Seçiniz</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="homeType" className="block text-gray-700 font-bold mb-2">Hane Türü seçiniz</label>
          <select
            id="homeType"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setSelectedHomeType(e.target.value)}
          >
            <option>Seçiniz</option>
            <option value="Devlet Dairesi">Devlet Dairesi</option>
            <option value="İşyeri">İşyeri</option>
            <option value="OBS">OBS</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="openDays" className="block text-gray-700 font-bold mb-2">Ayda Kaç Gün Açık?</label>
          <select id="openDays" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setSelectedDays(e.target.value)}>
            <option>Seçiniz</option>
            {generateOptions(20, 31)}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="openHours" className="block text-gray-700 font-bold mb-2">Günde Kaç Saat?</label>
          <select id="openHours" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setSelectedHours(e.target.value)}>
            <option>Seçiniz</option>
            {generateOptions(0, 24)}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="personnel" className="block text-gray-700 font-bold mb-2">Kaç Personel?</label>
          <input
            type="number"
            id="personnel"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setSelectedWorkers(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="toilets" className="block text-gray-700 font-bold mb-2">Kaç Adet Tuvalet Mevcut?</label>
          <select id="toilets" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setSelectedWC(e.target.value)}>
            <option>Seçiniz</option>
            {generateOptions(1, 25)}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="lavabos" className="block text-gray-700 font-bold mb-2">Tuvaletteki Lavabolar Kaçlı?</label>
          <select id="lavabos" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setSelectedWCL(e.target.value)}>
            <option>Seçiniz</option>
            {generateOptions(1, 20)}
          </select>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={calculateResults} >
          Hesapla!
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-3xl w-4/5 md:w-2/5 text-center">
        <h1 className='font-bold text-4xl mb-6'>KAZANCINIZ!</h1>

        <h1 className='font-bold text-xl mb-2'>Kurulum Maliyeti</h1>
        <h1 className='font-bold text-sm mb-4'>{results.setupCost} TL</h1>

        <h1 className='font-bold text-xl mb-2'>Tasarruf Miktarı</h1>
        <h1 className='font-bold text-sm mb-4'>
          Aylık: {results.savingsAmount} Litre
          <br />
          Yılık: {results.savingsAmount * 12} Litre
        </h1>

        <h1 className='font-bold text-xl mb-2'>Tasarruf Tutarı</h1>
        <h1 className='font-bold text-sm mb-4'>
          Aylık: {results.savingsValue} TL
          <br />
          Yılık: {results.savingsValue * 12} TL
        </h1>

        <h1 className='font-bold text-xl mb-2'>Filtre Maliyeti</h1>
        <h1 className='font-bold text-sm mb-4'>
          Aylık: {results.filterCost} TL
          <br />
          Yılık: {results.filterCost*12} TL
        </h1>

        <h1 className='font-bold text-xl mb-2'>Elektrik Maliyeti</h1>
        <h1 className='font-bold text-sm mb-4'>
          Aylık: {results.electricityCost} TL
          <br />
          Yılık: {results.electricityCost*12} TL
        </h1>

        <h1 className='font-bold text-xl mb-2'>Net Kazanç Tutarı</h1>
        <h1 className='font-bold text-sm mb-4'>Aylık: {results.netProfit} TL <br /> Yılık: {results.netProfit*12} TL  </h1>

        <h1 className='font-bold text-xl mb-2'>Amorti Süresi</h1>
        <h1 className='font-bold text-sm'>{results.paybackPeriod} Ay <br /> {results.paybackPeriod/12} yıl </h1>
      </div>
    </div>
  );
};

export default CalculaterContent;
