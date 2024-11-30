import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
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
import gristek_kutu from "../../dist/images/gristek-kutu1.png"
import { FaTint, FaBox, FaCoins, FaWrench } from "react-icons/fa";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MainContent = () => {
    const [timeRange, setTimeRange] = useState("gün");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [savingWaterTon, setSavingWaterTon] = useState(10000);
    const [waterTonPrice, setWaterTonPrice] = useState(14.03);
    const [kwhPrice, setKwhPrice] = useState(2.22);
    const [filterPrice, setFilterPrice] = useState(1000);
    const [reserveWater, setReserveWater] = useState(5000);

    const formatPrice = (price) => {
        return new Intl.NumberFormat("tr-TR", {
            style: "currency",
            currency: "TRY",
        }).format(price);
    };

    const formatNumber = (number) => {
        return new Intl.NumberFormat("tr-TR").format(number);
    };

    const devices = [
        { id: 1, name: "Cihaz 1", status: "Aktif", saving: "15 m³", details: "Cihaz 1 açıklaması.", location: "Kat 1 - Erkek Lavabosu", image: gristek_kutu },
        { id: 2, name: "Cihaz 2", status: "Beklemede", saving: "8 m³", details: "Cihaz 2 açıklaması.", location: "Kat 1 - Erkek Lavabosu", image: gristek_kutu },
        { id: 3, name: "Cihaz 3", status: "Arızalı", saving: "0 m³", details: "Cihaz 3 açıklaması.", location: "Kat 2 - Kadın Lavabosu", image: gristek_kutu },
        { id: 4, name: "Cihaz 4", status: "Aktif", saving: "20 m³", details: "Cihaz 4 açıklaması.", location: "Kat 2 - Kadın Lavabosu", image: gristek_kutu },
        { id: 5, name: "Cihaz 5", status: "Aktif", saving: "12 m³", details: "Cihaz 5 açıklaması.", location: "Kat 3 - Ortak Lavabo", image: gristek_kutu },
        { id: 6, name: "Cihaz 6", status: "Beklemede", saving: "7 m³", details: "Cihaz 6 açıklaması.", location: "Kat 3 - Ortak Lavabo", image: gristek_kutu },
        { id: 7, name: "Cihaz 7", status: "Aktif", saving: "18 m³", details: "Cihaz 7 açıklaması.", location: "Zemin Kat - Engelli Tuvaleti", image: gristek_kutu },
        { id: 8, name: "Cihaz 8", status: "Arızalı", saving: "0 m³", details: "Cihaz 8 açıklaması.", location: "Zemin Kat - Engelli Tuvaleti", image: gristek_kutu },
        { id: 9, name: "Cihaz 9", status: "Beklemede", saving: "10 m³", details: "Cihaz 9 açıklaması.", location: "Kat 1 - Erkek Lavabosu", image: gristek_kutu },
        { id: 10, name: "Cihaz 10", status: "Aktif", saving: "22 m³", details: "Cihaz 10 açıklaması.", location: "Kat 2 - Kadın Lavabosu", image: gristek_kutu },
    ];

    const groupedDevices = devices.reduce((acc, device) => {
        if (!acc[device.location]) {
            acc[device.location] = [];
        }
        acc[device.location].push(device);
        return acc;
    }, {});

    const generateHourlyLabels = () => {
        const labels = [];
        for (let hour = 0; hour < 24; hour++) {
            labels.push(`${hour.toString().padStart(2, '0')}:00`);
        }
        return labels;
    };

    const generateYearlyLabels = () => {
        const currentYear = new Date().getFullYear();
        return Array.from({ length: 5 }, (_, i) => `${currentYear - i}`).reverse();
    };

    const generateData = () => {
        switch (timeRange) {
            case "gün":
                return Array.from({ length: 24 }, () => Math.floor(Math.random() * 100));
            case "hafta":
                return Array.from({ length: 7 }, () => Math.floor(Math.random() * 100));
            case "ay":
                return Array.from({ length: 12 }, () => Math.floor(Math.random() * 100));
            case "yıl":
                return Array.from({ length: 5 }, () => Math.floor(Math.random() * 100));
            default:
                return [];
        }
    };

    const data = {
        labels: timeRange === "gün"
            ? generateHourlyLabels()
            : timeRange === "hafta"
                ? ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"]
                : timeRange === "ay"
                    ? ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"]
                    : generateYearlyLabels(),
        datasets: [
            {
                label: "Su Tasarrufu (m³)",
                data: generateData(),
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
                <div className="w-full h-full">
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
                    <p className="text-2xl md:text-3xl font-bold text-gray-800">{devices.length}</p>
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

export default MainContent;
