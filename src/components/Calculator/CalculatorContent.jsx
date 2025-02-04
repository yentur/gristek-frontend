import React, { useState, useEffect } from "react";
import cityData from "../../data/city_data.json";
import calcultedData from "../../data/calculater_data.json";
import CalculationForm from "./CalculationForm";
import CalculationResults from "./CalculationResults";

const CalculatorContent = () => {
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
  const [selectedDays, setSelectedDays] = useState("");
  const [selectedHours, setSelectedHours] = useState("");
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

  const calculateElectricityCost = (savingsAmount, selectedWC) => {
    const electricityPrice = 2.5; // kWh başına 2.5 TL

    // Motor Gücü (Pompa)
    const motorPowerW = (120 + 156) / 2; // Ortalama 138 W
    const motorPowerKWh = motorPowerW / 1000; // 0.138 kWh

    const flowRatePerMin = (25 + 19) / 2; // Ortalama 22 L/dak
    const flowRatePerHour = flowRatePerMin * 60; // 1320 L/saat

    const motorHoursPerMonth = savingsAmount / flowRatePerHour; // Motorun kaç saat çalışacağı
    const motorMonthlyCost =
      motorPowerKWh * motorHoursPerMonth * electricityPrice;

    // UV Işık Tüketimi
    const uvPowerW = 5; // Ortalama 5W
    const uvPowerKWh = (uvPowerW * 24 * 30) / 1000; // Aylık tüketim
    const uvMonthlyCost = uvPowerKWh * electricityPrice;

    // Bilinmeyen Ek Harcamalar (~%15 ek maliyet)
    const unknownCostFactor = 1.15;

    // **Toplam Elektrik Maliyeti**
    const totalElectricityCost =
      (motorMonthlyCost + uvMonthlyCost) * unknownCostFactor;

    return totalElectricityCost;
  };

  const calculateResults = () => {
    if (!cost || !selectedDays || !selectedWorkers || !selectedHours) return;

    const savingsAmount = selectedDays * selectedWorkers * selectedHours * 4;
    const savingsValue = (cost * selectedDays * selectedWorkers * selectedHours * 4) / 1000;
    const filterCost = Math.ceil(savingsAmount / 100000) * 500 * selectedWC;
    const electricityCost = calculateElectricityCost(savingsAmount, selectedWC);
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
      <CalculationForm
        cities={cities}
        generateOptions={generateOptions}
        setSelectedCity={setSelectedCity}
        setSelectedHomeType={setSelectedHomeType}
        setSelectedDays={setSelectedDays}
        setSelectedHours={setSelectedHours}
        setSelectedWorkers={setSelectedWorkers}
        setSelectedWC={setSelectedWC}
        setSelectedWCL={setSelectedWCL}
        calculateResults={calculateResults}
      />
      {showResults && <CalculationResults results={results} />}
    </div>
  );
};

export default CalculatorContent;
