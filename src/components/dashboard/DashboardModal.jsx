import React from "react";
import { FaCheckCircle, FaExclamationTriangle, FaPauseCircle } from "react-icons/fa";

const DashboardModal = ({ title, groupedDevices, onClose }) => {
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md md:max-w-2xl lg:max-w-4xl h-auto p-4 sm:p-6 relative overflow-y-auto">
                {/* Başlık ve Kapatma Düğmesi */}
                <div className="flex justify-between items-center border-b pb-4">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-800">{title}</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-gray-800 transition"
                    >
                        ✕
                    </button>
                </div>

                {/* İçerik */}
                <div className="mt-4 mb-4 max-h-[70vh] overflow-y-auto space-y-6">
                    {Object.keys(groupedDevices).map((location) => {
                        const devices = groupedDevices[location];
                        const activeDevices = devices.filter((d) => d.status === "Aktif").length;
                        const pendingDevices = devices.filter((d) => d.status === "Beklemede").length;
                        const faultyDevices = devices.filter((d) => d.status === "Arızalı").length;

                        return (
                            <details key={location} className="p-4 bg-gray-100 rounded-md">
                                <summary className="flex justify-between items-center cursor-pointer">
                                    <div>
                                        <h4 className="text-sm md:text-lg font-semibold text-gray-800">
                                            {location}
                                        </h4>
                                        <p className="text-xs md:text-sm text-gray-600">
                                            Toplam: {devices.length} cihaz
                                        </p>
                                    </div>
                                    <div className="flex space-x-2 md:space-x-4">
                                        {/* Aktif Cihazlar */}
                                        <div className="flex items-center space-x-1 md:space-x-2">
                                            <FaCheckCircle className="text-green-500 text-sm md:text-lg" />
                                            <span className="text-xs md:text-sm text-gray-600">
                                                {activeDevices}
                                            </span>
                                        </div>
                                        {/* Beklemede Cihazlar */}
                                        <div className="flex items-center space-x-1 md:space-x-2">
                                            <FaPauseCircle className="text-yellow-500 text-sm md:text-lg" />
                                            <span className="text-xs md:text-sm text-gray-600">
                                                {pendingDevices}
                                            </span>
                                        </div>
                                        {/* Arızalı Cihazlar */}
                                        <div className="flex items-center space-x-1 md:space-x-2">
                                            <FaExclamationTriangle className="text-red-500 text-sm md:text-lg" />
                                            <span className="text-xs md:text-sm text-gray-600">
                                                {faultyDevices}
                                            </span>
                                        </div>
                                    </div>
                                </summary>

                                {/* Cihaz Detayları */}
                                <div className="mt-4 space-y-4">
                                    {devices.map((device) => (
                                        <div
                                            key={device.id}
                                            className="flex flex-col md:flex-row items-start bg-white p-4 rounded-md border border-gray-200"
                                        >
                                            <img
                                                src={device.image}
                                                alt={device.name}
                                                className="w-16 h-16 rounded-md mb-4 md:mb-0 md:mr-4 object-cover"
                                            />
                                            <div>
                                                <h5 className="text-sm md:text-md font-medium text-gray-800">
                                                    {device.name} ({device.status})
                                                </h5>
                                                <p className="text-xs md:text-sm text-gray-600">
                                                    Tasarruf Miktarı: {device.saving}
                                                </p>
                                                <p className="text-xs md:text-sm text-gray-600">
                                                    {device.details}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </details>
                        );
                    })}
                </div>

                {/* Kapatma Düğmesi */}
                <div className="flex justify-end pt-4 border-t">
                    <button
                        onClick={onClose}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                    >
                        Kapat
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardModal;
