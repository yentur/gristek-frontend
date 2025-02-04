import React, { useContext, useEffect, useState } from "react";
import "./water.css";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { useApi } from "../../context/ApiProvider";
import CountUp from "react-countup";

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, error } = useApi();
  const { dailySavings, monthlyData, totalSavings } = data;

  console.log(data)

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <dialog id="my_modal_3" className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box max-w-4xl" style={{ backgroundColor: "white" }}>
        <form
          method="dialog"
          onSubmit={(e) => {
            e.preventDefault();
            closeModal();
          }}
        >
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
              <CountUp
                end={dailySavings}
                duration={2}
                separator=","
                decimals={2}
                suffix=" m³"
              />
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
                  data={monthlyData}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 14 }}
                    axisLine={false}
                  />
                  <YAxis tick={{ fontSize: 14 }} axisLine={false} />
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

            <h3>
              Bugüne Kadar <span className="font-bold">GRİSTEK</span> İle
              Yapılan Toplam Tasarruf
            </h3>
            <div className="flex justify-center items-center counter">
              <CountUp
                end={totalSavings}
                duration={2}
                separator=","
                decimals={2}
                suffix=" m³"
              />
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
