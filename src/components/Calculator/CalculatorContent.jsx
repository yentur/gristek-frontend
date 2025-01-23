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
