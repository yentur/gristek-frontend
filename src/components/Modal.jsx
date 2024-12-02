import React, { useEffect, useState } from 'react';
import "./water.css";
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
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSavingsData = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/tasarruf/`);
      if (!response.ok) {
        throw new Error('Tasarruf verisi alınamadı');
      }
      const data = await response.json();
      setSavingsData({
        totalSavings: data.totalSavings || 0,
        dailySavings: data.dailySavings || 0
      });
      setCounters(prev => ({
        total: data.totalSavings || prev.total,
        daily: data.dailySavings || prev.daily
      }));
    } catch (error) {
      console.error('Tasarruf verisi çekme hatası:', error);
      setError('Tasarruf verisi alınamadı');
    }
  };

  const fetchMonthlyData = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/aylik-tasarruf`);
      if (!response.ok) {
        throw new Error('Aylık veri alınamadı');
      }
      const result = await response.json();
      setChartData(result.data);
    } catch (error) {
      console.error('Aylık veri çekme hatası:', error);
      setError('Aylık veriler alınamadı');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsOpen(true);

    const fetchInitialData = async () => {
      await Promise.all([
        fetchSavingsData(),
        fetchMonthlyData()
      ]);
    };

    fetchInitialData();

    const fetchInterval = setInterval(() => {
      fetchSavingsData();
    }, 1000);

    const monthlyInterval = setInterval(() => {
      fetchMonthlyData();
    }, 300000);
    return () => {
      clearInterval(fetchInterval);
      clearInterval(monthlyInterval);
    };
  }, []);

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setCounters(prev => ({
        total: prev.total < savingsData.totalSavings
          ? prev.total + 1
          : savingsData.totalSavings,
        daily: prev.daily < savingsData.dailySavings
          ? prev.daily + 1
          : savingsData.dailySavings
      }));
    }, 50);

    return () => clearInterval(animationInterval);
  }, [savingsData]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const formatNumber = (number) => {
    return String(Math.floor(number)).padStart(6, '0')
      .split('')
      .map((digit, index) => (
        <h1 key={`digit-${index}-${number}`} className="digit font-bold">
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
          <div className="middle-modal flex flex-col items-center">
            <h3>Günlük Tasarruf</h3>

            <div className="flex justify-center items-center counter">
              {formatNumber(counters.daily)}
              <h2 className="ml-2">m³</h2>
            </div>

            <div className="chart">
              {loading ? (
                <div className="flex items-center justify-center h-[300px]">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              ) : (
                <BarChart
                  width={800}
                  height={300}
                  data={chartData}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 14 }}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 14 }}
                    axisLine={false}
                  />
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
              )}
            </div>

            <h3>Bugüne Kadar <span className='font-bold'>GRİSTEK</span> İle Yapılan Toplam Tasarruf</h3>
            <div className="flex justify-center items-center counter">
              {formatNumber(counters.total)}
              <h2 className="ml-2">m³</h2>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;