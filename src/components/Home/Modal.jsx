import React, { useContext, useEffect, useState } from 'react';
import "./water.css";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useApi } from '../../context/ApiProvider';

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [counters, setCounters] = useState({
    total: 0,
    daily: 0
  });
  const { data, error } = useApi();

  useEffect(() => {
    setIsOpen(true);

    const fetchInterval = setInterval(() => {
      setCounters(prev => ({
        total: prev.total < data.totalSavings ? prev.total + 1 : data.totalSavings,
        daily: prev.daily < data.dailySavings ? prev.daily + 1 : data.dailySavings
      }));
    }, 50);

    return () => clearInterval(fetchInterval);
  }, [data]);

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
              {error ? (
                <div className="flex items-center justify-center h-[300px]">
                  <span className="text-red-500">{error}</span>
                </div>
              ) : (
                <BarChart
                  width={800}
                  height={300}
                  data={data.monthlySavings}
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
