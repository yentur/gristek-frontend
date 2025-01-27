import React from "react";
import {
  FaLeaf,
  FaChartLine,
  FaTools,
  FaBolt,
  FaMoneyBillWave,
} from "react-icons/fa";

const CalculationResults = ({ results }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg transition-all duration-500 ease-in-out w-full lg:w-1/3 mt-6 lg:mt-0">
      <h1 className="font-bold text-xl lg:text-2xl text-pc-200 mb-4 lg:mb-6">
        KAZANCINIZ!
      </h1>
      <div className="space-y-4 lg:space-y-6">
        <div className="flex items-center gap-4">
          <FaLeaf className="text-green-500 text-3xl" />
          <div>
            <h2 className="font-semibold text-lg text-gray-800">
              Tasarruf Miktarı
            </h2>
            <p className="text-gray-600 text-base">
              Aylık: {results.savingsAmount.toFixed(2)} Litre <br />
              Yıllık: {(results.savingsAmount * 12).toFixed(2)} Litre
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <FaChartLine className="text-gray-500 text-3xl" />
          <div>
            <h2 className="font-semibold text-lg text-gray-800">
              Tasarruf Tutarı
            </h2>
            <p className="text-gray-600 text-base">
              Aylık: {results.savingsValue.toFixed(2)} ₺ <br />
              Yıllık: {(results.savingsValue * 12).toFixed(2)} ₺
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <FaTools className="text-red-500 text-3xl" />
          <div>
            <h2 className="font-semibold text-lg text-gray-800">
              Filtre Maliyeti
            </h2>
            <p className="text-gray-600 text-base">
              Aylık: {results.filterCost.toFixed(2)} ₺ <br />
              Yıllık: {(results.filterCost * 12).toFixed(2)} ₺
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <FaBolt className="text-indigo-500 text-3xl" />
          <div>
            <h2 className="font-semibold text-lg text-gray-800">
              Elektrik Maliyeti
            </h2>
            <p className="text-gray-600 text-base">
              Aylık: {results.electricityCost.toFixed(2)} ₺ <br />
              Yıllık: {(results.electricityCost * 12).toFixed(2)} ₺
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <FaMoneyBillWave className="text-green-600 text-3xl" />
          <div>
            <h2 className="font-semibold text-lg text-gray-800">
              Net Kazanç Tutarı
            </h2>
            <p className="text-gray-600 text-base">
              Aylık: {results.netProfit.toFixed(2)} ₺ <br />
              Yıllık: {(results.netProfit * 12).toFixed(2)} ₺
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculationResults;
