import React, { useEffect, useState } from 'react';
import "./water.css";
import WaterDrop from './WaterDrop';
import config from '../config.json';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [savingsData, setSavingsData] = useState({
    totalSavings: 0,
    dailySavings: 0
  });
  const [counters, setCounters] = useState({
    total: 0,
    daily: 0
  });

  const data = [
    { name: "Oca", value: 300 },
    { name: "Şub", value: 400 },
    { name: "Mar", value: 400 },
    { name: "Nis", value: 800 },
    { name: "May", value: 600 },
    { name: "Haz", value: 1000 },
    { name: "Tem", value: 900 },
    { name: "Ağu", value: 700 },
    { name: "Eyl", value: 1100 },
    { name: "Eki", value: 1200 },
    { name: "Kas", value: 900 },
    { name: "Ara", value: 1300 },
  ];

  // Fetch savings data
  useEffect(() => {
    const fetchSavingsData = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/tasarruf/`);
        const data = await response.json();
        setSavingsData({
          totalSavings: data.totalSavings || 0,
          dailySavings: data.dailySavings || 0
        });
        setCounters({
          total: data.totalSavings || 0,
          daily: data.dailySavings || 0
        });
      } catch (error) {
        console.error('API çağrısı sırasında bir hata oluştu:', error);
      }
    };

    fetchSavingsData();
    setIsOpen(true);
  }, []);


  useEffect(() => {
    const totalInterval = setInterval(() => {
      setCounters(prev => ({
        ...prev,
        total: true
          ? prev.total + 1
          : savingsData.totalSavings
      }));
    }, 1500);

    const dailyInterval = setInterval(() => {
      setCounters(prev => ({
        ...prev,
        daily: prev.daily < savingsData.dailySavings
          ? prev.daily + 1
          : savingsData.dailySavings
      }));
    }, 1500);

    return () => {
      clearInterval(totalInterval);
      clearInterval(dailyInterval);
    };
  }, [savingsData]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const formatNumber = (number) => {
    return String(Math.floor(number)).padStart(6, '0')
      .split('')
      .map((digit, index) => (
        <h1 key={index} className="digit font-bold">
          {digit}
        </h1>
      ));
  };

  return (
    <dialog id="my_modal_3" className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box max-w-4xl" style={{ backgroundColor: 'white' }}>
        <form method="dialog" onSubmit={(e) => { e.preventDefault(); closeModal(); }}>
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={closeModal}
          >
            ✕
          </button>
        </form>

        <div className="flex flex-col items-center h-full w-full">
          {/* <WaterDrop /> */}
          <div className="middle-modal flex flex-col items-center">
            <h3>Günlük Tasarruf</h3>

            <div className="flex justify-center items-center counter">
              {formatNumber(counters.total)}
              <h2 className="ml-2">m³</h2>
            </div>

            <div className="chart">
              <BarChart
                width={800}
                height={300}
                data={data}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 14 }} axisLine={false} />
                <YAxis dataKey="value" tick={{ fontSize: 14 }} axisLine={false} />
                <Bar
                  dataKey="value"
                  fill="#FF4267"
                  radius={[50, 50, 50, 50]}
                  barSize={16}
                  animationBegin={0}
                  animationDuration={1500}
                  animationEasing="ease-in-out"
                />
              </BarChart>

            </div>

            <h3>Bugüne Kadar <span className='font-bold'>GRİSTEK</span> İle Yapılan Toplam Tasarruf</h3>
            <div className="flex justify-center items-center counter">
              {formatNumber(counters.daily)}
              <h2 className="ml-2">m³</h2>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;