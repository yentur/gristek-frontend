import React, { useState, useEffect } from 'react';
import "./water.css";

const Hero = () => {
  const [totalSavings, setTotalSavings] = useState(null);
  const [dailySavings, setDailySavings] = useState(null);


  useEffect(() => {
    const fetchSavingsData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/tasarruf');
        const data = await response.json();

        setTotalSavings(data.totalSavings);
        setDailySavings(data.dailySavings);
      } catch (error) {
        console.error('API çağrısı sırasında bir hata oluştu:', error);
      }
    };


    fetchSavingsData();
  }, []); 

  return (
    <section className="bg-white from-blue-500 to-purple-500 py-20">
      <div className="container mx-auto flex flex-col lg:flex-row items-center px-4 lg:px-0">
        <div className="lg:w-1/2">
          <img
            src="https://gristek.com/wp-content/uploads/2023/08/1-1.png"
            alt="Water Conservation"
            className="w-full h-auto"
          />
        </div>
        <div className="lg:w-1/2 mt-8 lg:mt-0 lg:pl-16 text-black">
          <h1 className="text-4xl lg:text-5xl font-bold">
            Kuraklığa Karşı Geliyoruz!
          </h1>
          <p className="mt-4 text-lg text-gray-500 mb-10">
            Gristek ile su tasarrufuna öncülük ediyoruz.
          </p>
          <div className="flex flex-col justify-center items-center">
            <div className="middle">
              <h1>Toplam Yaptığımız Tasarruf</h1>
            </div>
            <div className="middle">
              <h2>{totalSavings ? `${totalSavings} m³` : 'Yükleniyor...'}</h2>
            </div>

            <div className="middle">
              <h1>Günlük Tasarruf Miktarı</h1>
            </div>
            <div className="middle">
              <h2>{dailySavings ? `${dailySavings} m³` : 'Yükleniyor...'}</h2>
            </div>

            <a
              href="http://tasarruf.gristek.com/"
              className="bg-pc-200 hover:bg-pc-100 text-white font-medium py-3 px-6 rounded-md mt-6 inline-block"
            >
              Tasarruf Hesaplama Aracı
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
