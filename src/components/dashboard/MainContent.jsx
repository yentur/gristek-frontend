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
import DashboardModal from "./DashboardModal";
import { FaTint, FaBox, FaCoins, FaWrench } from "react-icons/fa";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BASE_URL = "http://localhost:8000/api";  // Update with your backend URL

// Utility functions
const formatNumber = (num) => num.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const formatPrice = (num) => num.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY', minimumFractionDigits: 2, maximumFractionDigits: 2 });

const MainContent = () => {
    const [timeRange, setTimeRange] = useState("gün");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // State for metrics
    const [savingsData, setSavingsData] = useState({
        totalSavings: 0,
        dailySavings: 0
    });
    const [deviceSummary, setDeviceSummary] = useState({
        totalDevices: 0,
        activeDevices: 0,
        reserveWater: 0
    });
    const [costAnalysis, setCostAnalysis] = useState({
        totalRevenue: 0,
        electricityCost: 0,
        filterCost: 0,
        totalOperatingCost: 0,
        totalProfit: 0
    });
    const [monthlyData, setMonthlyData] = useState([]);
    const [hourlyData, setHourlyData] = useState([]);

    // Constants for calculations
    const waterTonPrice = 14.03;
    const kwhPrice = 2.22;
    const filterPrice = 1000;

    // Fetch data function
    const fetchAllData = async () => {
        try {
            const [
                savingsResponse,
                deviceSummaryResponse, 
                costAnalysisResponse,
                monthlyResponse,
                hourlyResponse
            ] = await Promise.all([
                axios.get(`${BASE_URL}/tasarruf`),
                axios.get(`${BASE_URL}/device-summary`),
                axios.get(`${BASE_URL}/cost-analysis`),
                axios.get(`${BASE_URL}/aylik-tasarruf`),
                axios.get(`${BASE_URL}/hourly-savings`)
            ]);

            setSavingsData(savingsResponse.data);
            setDeviceSummary(deviceSummaryResponse.data.data);
            setCostAnalysis(costAnalysisResponse.data.data);
            setMonthlyData(monthlyResponse.data.data);
            setHourlyData(hourlyResponse.data.data.hourly_savings);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        }
    };

    useEffect(() => {
        fetchAllData();
        const interval = setInterval(fetchAllData,  1000);  // Refresh every 5 minutes
        return () => clearInterval(interval);  // Clean up on unmount
    }, []);

    // Generate yearly labels function
    const generateYearlyLabels = () => {
        const currentYear = new Date().getFullYear();
        return Array.from({ length: 12 }, (_, i) => `${currentYear}-${i + 1}`);
    };

    const data = {
        labels: timeRange === "gün"
            ? generateHourlyLabels(hourlyData)
            : timeRange === "hafta"
                ? ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"]
                : timeRange === "ay"
                    ? ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"]
                    : generateYearlyLabels(),
        datasets: [
            {
                label: "Su Tasarrufu (m³)",
                data: processDataForTimeRange(timeRange, hourlyData, monthlyData),
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

    const devices = deviceSummary.totalDevices || 0;
    const groupedDevices = [
        { type: "Cihaz Tipi 1", count: Math.floor(devices / 2) },
        { type: "Cihaz Tipi 2", count: Math.ceil(devices / 2) }
    ];

    const savingWaterTon = savingsData.totalSavings || 0;
    const reserveWater = deviceSummary.reserveWater || 0;

    return (
        <main className="flex-1 p-6 overflow-y-auto">
            <div className="mb-6 flex justify-center space-x-4">
                {timeRanges.map((range) => (
                    <button
                        key={range}
                        onClick={() => setTimeRange(range)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition ${timeRange === range
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                    >
                        {range.charAt(0).toUpperCase() + range.slice(1)}
                    </button>
                ))}
            </div>

            {/* Çubuk Grafik */}
            <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 w-full h-64 sm:h-80 md:h-[400px] lg:h-[500px]">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-4">Tasarruf Miktarı</h2>
                <div className="w-full h-full p-6">
                    <Bar data={data} options={options} />
                </div>
            </div>

            {/* Metrikler */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Toplam Kurumdaki Cihaz Sayısı */}
                <div className="bg-white shadow-md rounded-lg p-4 md:p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-800 flex items-center">
                            <FaBox className="text-blue-500 mr-3 text-2xl md:text-3xl" />
                            Toplam Kurumdaki Cihaz Sayısı
                        </h2>
                    </div>
                    <p className="text-2xl md:text-3xl font-bold text-gray-800">{devices}</p>
                    <p className="mt-2 text-sm md:text-base text-gray-600">
                        Kurumda aktif toplam cihaz sayısı. Daha fazla detay için aşağıya tıklayın.
                    </p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="mt-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 md:px-5 md:py-2 rounded-full shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform transform hover:-translate-y-1"
                    >
                        Detaylı Bilgi
                    </button>

                    {isModalOpen && (
                        <DashboardModal
                            title="Cihaz Detayları"
                            groupedDevices={groupedDevices}
                            onClose={() => setIsModalOpen(false)}
                        />
                    )}
                </div>

                {/* Toplam Su Tasarrufu */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg rounded-lg p-4 md:p-6 text-white">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <h2 className="text-lg md:text-xl font-semibold flex items-center">
                            <FaTint className="text-white mr-3 text-2xl md:text-3xl" />
                            Toplam Su Tasarrufu
                        </h2>
                        <div className="mt-3 md:mt-0 bg-white text-blue-700 px-3 py-2 md:px-4 md:py-2 rounded-full shadow-md font-semibold text-base md:text-lg text-center">
                            {formatNumber(savingWaterTon)} m³
                        </div>
                    </div>
                    <p className="mt-4 text-sm md:text-base text-blue-200">
                        Bu ay toplam su tasarrufunuz. Daha fazla bilgi için cihaz detaylarına göz atabilirsiniz.
                    </p>
                </div>

                {/* Rezervde Duran Su Miktarı */}
                <div className="bg-white shadow-md rounded-lg p-4 md:p-6 border border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-800 flex items-center">
                            <FaTint className="text-blue-500 mr-3 text-2xl md:text-3xl" />
                            Rezervde Duran Su Miktarı
                        </h2>
                        <div className="mt-3 md:mt-0 bg-blue-100 text-blue-700 px-3 py-2 md:px-4 md:py-2 rounded-full shadow-sm font-bold text-base md:text-lg text-center">
                            {formatNumber(reserveWater)} m³
                        </div>
                    </div>
                    <p className="mt-4 text-sm md:text-base text-gray-600">
                        Şu anda rezervde bulunan toplam su miktarı.
                    </p>
                </div>

                {/* Toplam Kazanç */}
                <div className="bg-white shadow-md rounded-lg p-4 md:p-6 border border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-800 flex items-center">
                            <FaCoins className="text-yellow-500 mr-3 text-2xl md:text-3xl" />
                            Toplam Kazanç
                        </h2>
                        <div className="mt-3 md:mt-0 bg-yellow-100 text-yellow-700 px-3 py-2 md:px-4 md:py-2 rounded-full shadow-sm font-bold text-base md:text-lg text-center">
                            {formatPrice(savingWaterTon * waterTonPrice)}
                        </div>
                    </div>
                    <p className="mt-4 text-sm md:text-base text-gray-600">
                        Bu ay su tasarrufu sayesinde elde edilen toplam kazanç.
                    </p>
                </div>

                {/* Toplam İşletme Gideri */}
                <div className="bg-white shadow-md rounded-lg p-4 md:p-6 border border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-800 flex items-center">
                            <FaWrench className="text-red-500 mr-3 text-2xl md:text-3xl" />
                            Toplam İşletme Gideri
                        </h2>
                        <div className="mt-3 md:mt-0 bg-red-100 text-red-700 px-3 py-2 md:px-4 md:py-2 rounded-full shadow-sm font-bold text-base md:text-lg text-center">
                            {formatPrice((savingWaterTon * 0.25 * kwhPrice) + ((savingWaterTon / 100) * filterPrice))}
                        </div>
                    </div>
                    <p className="mt-4 text-sm md:text-base text-gray-600">
                        Bu ayki toplam işletme giderleri, elektrik ve filtre masraflarını içerir.
                    </p>
                    <div className="mt-4 text-xs md:text-sm text-gray-400 space-y-1">
                        <div className="flex justify-between">
                            <span>Elektrik Maliyeti:</span>
                            <span>{formatPrice(savingWaterTon * 0.25 * kwhPrice)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Filtre Maliyeti:</span>
                            <span>{formatPrice((savingWaterTon / 100) * filterPrice)}</span>
                        </div>
                    </div>
                </div>

                {/* Toplam Kâr */}
                <div className="bg-white shadow-md rounded-lg p-4 md:p-6 border border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-800 flex items-center">
                            <FaCoins className="text-green-500 mr-3 text-2xl md:text-3xl" />
                            Toplam Kâr
                        </h2>
                        <div
                            className={`mt-3 md:mt-0 px-3 py-2 md:px-4 md:py-2 rounded-full shadow-sm font-bold text-base md:text-lg text-center ${(savingWaterTon * waterTonPrice) - ((savingWaterTon * 0.25 * kwhPrice) + (savingWaterTon / 100) * filterPrice) >= 0
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                                }`}
                        >
                            {formatPrice(
                                (savingWaterTon * waterTonPrice) - ((savingWaterTon * 0.25 * kwhPrice) + (savingWaterTon / 100) * filterPrice)
                            )}
                        </div>
                    </div>
                    <p className="mt-4 text-sm md:text-base text-gray-600">
                        Bu ayki su tasarrufu sayesinde elde edilen toplam kâr.
                    </p>
                </div>
            </div>
        </main>
    );
};

// Utility functions
function generateHourlyLabels(hourlyData) {
    return hourlyData?.map(item => item.hour) || [];
}

function processDataForTimeRange(timeRange, hourlyData, monthlyData) {
    switch(timeRange) {
        case 'gün': 
            return hourlyData?.map(item => item.savings) || [];
        case 'hafta':
            return [];
        case 'ay':
            return monthlyData?.map(item => item.value) || [];
        case 'yıl':
            return [];
        default:
            return [];
    }
}

export default MainContent;