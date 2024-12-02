import React, { useState } from "react";
import {
    FiHome,
    FiHeadphones,
    FiLogOut,
    FiAlertCircle,
    FiCheckCircle,
    FiMenu,
} from "react-icons/fi";
import logo from "../../dist/images/logo2.png";

const Sidebar = ({ activePage, setActivePage, hasIssue, handleReport, isReported }) => {
    const [isOpen, setIsOpen] = useState(false); // Sidebar aç/kapa durumu

    return (
        <>
            {/* Mobil Menü */}
            <button
                className="md:hidden fixed top-4 left-4 z-20 text-gray-800 bg-white p-2 rounded-full shadow-lg"
                onClick={() => setIsOpen(!isOpen)}
            >
                <FiMenu className="text-2xl" />
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed h-screen z-20 inset-y-0 left-0 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0 md:relative w-72 bg-white shadow-lg transition-transform duration-300 ease-in-out overflow-hidden`}
            >
                {/* Logo */}
                <div className="p-6 border-b border-gray-200">
                    <img
                        src={logo}
                        alt="Gristek Logo"
                        className="h-10 w-auto object-contain"
                    />
                </div>

                {/* Navigation */}
                <nav className="h-screen flex-1 p-4 space-y-2">
                    {/* Anasayfa */}
                    <a
                        href="#"
                        onClick={() => setActivePage("home")}
                        className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${activePage === "home"
                            ? "bg-blue-500 text-white shadow-md"
                            : "text-gray-700 hover:text-blue-500 hover:bg-gray-100"
                            }`}
                    >
                        <FiHome className="mr-3 text-lg" />
                        Anasayfa
                    </a>

                    {/* Arıza Durumu */}
                    <div
                        className={`flex items-center px-4 py-3 rounded-lg shadow-lg transition-all duration-200 ${hasIssue
                            ? "bg-gradient-to-r from-red-500 to-red-600 text-white"
                            : "bg-gradient-to-r from-green-500 to-green-600 text-white"
                            }`}
                    >
                        {hasIssue ? (
                            <FiAlertCircle className="mr-3 text-2xl text-red-200" />
                        ) : (
                            <FiCheckCircle className="mr-3 text-2xl text-green-200" />
                        )}
                        <span className="font-medium text-lg">
                            {hasIssue ? "Arıza Var" : "Arıza Yok"}
                        </span>
                        {hasIssue && (
                            <button
                                onClick={handleReport}
                                disabled={isReported}
                                className={`ml-auto px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${isReported
                                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                                    : "bg-white text-red-600 hover:bg-gray-100"
                                    }`}
                            >
                                {isReported ? "Bildirim Gönderildi" : "Arıza Bildir"}
                            </button>
                        )}
                    </div>

                    {/* Teknik Destek */}
                    <a
                        href="#"
                        onClick={() => setActivePage("support")}
                        className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${activePage === "support"
                            ? "bg-blue-500 text-white shadow-md"
                            : "text-gray-700 hover:text-blue-500 hover:bg-gray-100"
                            }`}
                    >
                        <FiHeadphones className="mr-3 text-lg" />
                        Teknik Destek
                    </a>
                     {/* Logout */}
                <div className="p-4 border-t border-gray-200 mt-auto">
                    <a
                        href="#"
                        className="flex items-center text-gray-700 hover:text-red-500 hover:bg-gray-100 px-4 py-3 rounded-lg transition-all duration-200"
                    >
                        <FiLogOut className="mr-3 text-lg" />
                        Çıkış Yap
                    </a>
                </div>
                </nav>
            </aside>

            {/* Mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default Sidebar;
