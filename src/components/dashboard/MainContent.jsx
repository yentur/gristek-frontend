import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FaTint, FaBox, FaCoins, FaWrench, FaChartBar } from "react-icons/fa";
import DashboardModal from "./DashboardModal";
import { motion } from "framer-motion";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BASE_URL = process.env.REACT_APP_API_URL;

const MainContent = () => {
  const [timeRange, setTimeRange] = useState("gün");
  const [dashboardData, setDashboardData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [earnings, setEarnings] = useState(0);
  const [cost, setCost] = useState(0);
  const [kwhPrice, setKwhPrice] = useState(4.78);
  const [filterPrice, setFilterPrice] = useState(500);
  const [mergedDevices, setMergedDevices] = useState([]);

  const fetchAllData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/user/device-data`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setDashboardData(response.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const calculateEarnings = () => {
    if (
      !dashboardData ||
      !dashboardData.device_data ||
      !dashboardData.device_water_prices
    ) {
      return setEarnings(0);
    }

    let totalEarnings = 0;

    dashboardData.device_data.forEach((device) => {
      const waterPrice =
        dashboardData.device_water_prices?.[device.DeviceID] || 0;
      totalEarnings += ((device.Savings || 0) / 1000) * waterPrice;
    });

    setEarnings(totalEarnings);
  };

  const calculateCost = () => {
    if (!dashboardData?.total_savings) return 0;

    const totalSavingsM3 = (dashboardData.total_savings || 0) / 1000;
    const electricityCost = totalSavingsM3 * 0.225 * (kwhPrice || 0);
    const filterCost = (totalSavingsM3 / 100) * (filterPrice || 0);

    setCost(electricityCost + filterCost);
  };

  useEffect(() => {
    fetchAllData();
    const interval = setInterval(fetchAllData, 300000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    calculateEarnings();
    calculateCost();
    if (dashboardData?.devices && dashboardData?.device_savings) {
      const merged = dashboardData.devices.map((device) => ({
        ...device,
        Savings: dashboardData.device_savings[device.ID] || 0,
      }));
      setMergedDevices(merged);
    }
  }, [dashboardData]);

  const formatNumber = (number) => {
    return Number.isNaN(number)
      ? "0"
      : new Intl.NumberFormat("tr-TR").format(number);
  };

  const formatPrice = (price) => {
    return Number.isNaN(price)
      ? "₺0,00"
      : new Intl.NumberFormat("tr-TR", {
          style: "currency",
          currency: "TRY",
        }).format(price);
  };

  const labels = {
    gün: dashboardData?.daily_savings?.map((item) => item.label) || [],
    hafta: dashboardData?.weekly_savings?.map((item) => item.label) || [],
    ay: dashboardData?.monthly_savings?.map((item) => item.label) || [],
    yıl: dashboardData?.yearly_savings?.map((item) => item.label) || [],
  };

  const values = {
    gün: dashboardData?.daily_savings?.map((item) => item.value) || [],
    hafta: dashboardData?.weekly_savings?.map((item) => item.value) || [],
    ay: dashboardData?.monthly_savings?.map((item) => item.value) || [],
    yıl: dashboardData?.yearly_savings?.map((item) => item.value) || [],
  };

  const data = {
    labels: labels[timeRange],
    datasets: [
      {
        label: "Su Tasarrufu (m³)",
        data: values[timeRange],
        backgroundColor: "#3b82f6",
        borderColor: "#2563eb",
        borderWidth: 1,
        borderRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const timeRanges = ["gün", "hafta", "ay", "yıl"];

  return (
    <main className="flex-1 p-6 overflow-y-auto bg-gray-50 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex justify-center space-x-4"
      >
        {timeRanges.map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
              timeRange === range
                ? "bg-blue-500 text-white shadow-lg transform scale-105"
                : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {range.charAt(0).toUpperCase() + range.slice(1)}
          </button>
        ))}
      </motion.div>

      {/* Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 mb-8 w-full h-[31.25rem]"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
          <FaChartBar className="text-blue-500 mr-3" />
          Tasarruf Miktarı
        </h2>
        <div className="w-full h-[25.625rem]">
          <Bar data={data} options={options} />
        </div>
      </motion.div>

      {/* Metrics */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Total Devices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
              <FaBox className="text-blue-500 mr-3 text-3xl" />
              Toplam Cihaz Sayısı
            </h2>
          </div>
          <p className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            {dashboardData?.devices?.length || 0}
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Kurumda aktif toplam cihaz sayısı.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 transform hover:-translate-y-1"
          >
            Detaylı Bilgi
          </button>

          {isModalOpen && (
            <DashboardModal
              title="Cihaz Detayları"
              devices={mergedDevices}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </motion.div>

        {/* Total Water Savings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg rounded-2xl p-6 text-white"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h2 className="text-xl font-bold flex items-center mb-4 md:mb-0">
              <FaTint className="mr-3 text-3xl" />
              Toplam Su Tasarrufu
            </h2>
            <div className="bg-white text-blue-700 px-4 py-2 rounded-full shadow-md font-bold text-lg">
              {formatNumber(dashboardData?.total_savings / 1000) || 0} m³
            </div>
          </div>
          <p className="mt-6 text-blue-100">
            Bu ay toplam su tasarrufunuz. Daha fazla bilgi için cihaz
            detaylarına göz atabilirsiniz.
          </p>
        </motion.div>

        {/* Reserved Water */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center mb-4 md:mb-0">
              <FaTint className="text-blue-500 mr-3 text-3xl" />
              Rezervde Duran Su
            </h2>
            <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full shadow-md font-bold text-lg">
              {formatNumber(dashboardData?.reserve_water?.total_clean)} L
            </div>
          </div>
          <p className="mt-6 text-gray-600 dark:text-gray-400">
            Şu anda rezervde bulunan toplam su miktarı.
          </p>
        </motion.div>

        {/* Total Earnings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center mb-4 md:mb-0">
              <FaCoins className="text-yellow-500 mr-3 text-3xl" />
              Toplam Kazanç
            </h2>
            <div className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full shadow-md font-bold text-lg">
              {formatPrice(earnings)}
            </div>
          </div>
          <p className="mt-6 text-gray-600 dark:text-gray-400">
            Bu ay su tasarrufu sayesinde elde edilen toplam kazanç.
          </p>
        </motion.div>

        {/* Total Operating Costs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center mb-4 md:mb-0">
              <FaWrench className="text-red-500 mr-3 text-3xl" />
              Toplam İşletme Gideri
            </h2>
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded-full shadow-md font-bold text-lg">
              {formatPrice(cost)}
            </div>
          </div>
          <p className="mt-6 text-gray-600 dark:text-gray-400">
            Bu ayki toplam işletme giderleri, elektrik ve filtre masraflarını
            içerir.
          </p>
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 space-y-2">
            <div className="flex justify-between">
              <span>Elektrik Maliyeti:</span>
              <span>
                {formatPrice(
                  (dashboardData?.total_savings / 1000) * 0.225 * kwhPrice
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Filtre Maliyeti:</span>
              <span>
                {formatPrice(
                  (dashboardData?.total_savings / 1000 / 100) * filterPrice
                )}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Total Profit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center mb-4 md:mb-0">
              <FaCoins className="text-green-500 mr-3 text-3xl" />
              Toplam Kâr
            </h2>
            <div
              className={`bg-${
                earnings - cost >= 0 ? "green" : "red"
              }-100 text-${
                earnings - cost >= 0 ? "green" : "red"
              }-700 px-4 py-2 rounded-full shadow-md font-bold text-lg`}
            >
              {formatPrice(earnings - cost)}
            </div>
          </div>
          <p className="mt-6 text-gray-600 dark:text-gray-400">
            Bu ayki su tasarrufu sayesinde elde edilen toplam kâr.
          </p>
        </motion.div>
      </div>
    </main>
  );
};

export default MainContent;
