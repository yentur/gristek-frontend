import React, { useEffect, useState } from 'react';
import "./water.css";
import WaterDrop from './WaterDrop';

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

  // Fetch savings data
  useEffect(() => {
    const fetchSavingsData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/tasarruf');
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
      <div className="modal-box max-w-3xl h-full">
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
            <WaterDrop />
          <div className="middle-modal flex flex-col items-center">
            <h1 className="mb-2">Toplam Yaptığımız Tasarruf</h1>
            <div className="flex justify-center items-center">
              {formatNumber(counters.total)}
              <h2 className="ml-2">M³</h2>
            </div>
            
            <h1 className="font-bold mt-4 mb-2">Günlük Tasarruf Miktarı</h1>
            <div className="flex justify-center items-center">
              {formatNumber(counters.daily)}
              <h2 className="ml-2">M³</h2>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;