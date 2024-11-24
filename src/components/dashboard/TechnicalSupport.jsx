import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const TechnicalSupport = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
            {/* Sayfa Başlığı */}
            <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
                Teknik Destek
            </h1>

            {/* İçerik */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-7xl">
                {/* İletişim Bilgileri */}
                <div className="bg-white shadow-xl rounded-lg p-8 flex flex-col justify-between">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">İletişim Bilgileri</h2>
                    <ul className="space-y-6">
                        <li className="flex items-center">
                            <FaPhone className="text-blue-600 mr-4 text-2xl" />
                            <span className="text-gray-700 text-lg">+90 5067747835</span>
                        </li>
                        <li className="flex items-center">
                            <FaEnvelope className="text-blue-600 mr-4 text-2xl" />
                            <span className="text-gray-700 text-lg">support@gristek.com</span>
                        </li>
                        <li className="flex items-center">
                            <FaMapMarkerAlt className="text-blue-600 mr-4 text-2xl" />
                            <span className="text-gray-700 text-lg">
                                Mazlumoğlu Sok. Gurbetçi Şahin İş Merkezi 1/9, Karakeçili Mah., Çorum, Türkiye
                            </span>
                        </li>
                    </ul>
                    <p className="text-sm text-gray-500 mt-6">
                        Teknik destek ekibimiz, 7/24 hizmetinizdedir.
                    </p>
                </div>

                {/* İletişim Formu */}
                <div className="bg-white shadow-xl rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">İletişim Formu</h2>
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Adınız
                            </label>
                            <input
                                id="name"
                                type="text"
                                required
                                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400 bg-white"
                                placeholder="Adınızı girin"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                E-posta
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400 bg-white"
                                placeholder="E-posta adresinizi girin"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                Mesajınız
                            </label>
                            <textarea
                                id="message"
                                rows="5"
                                required
                                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400 bg-white"
                                placeholder="Mesajınızı buraya yazın"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-6 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 transition"
                        >
                            Gönder
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TechnicalSupport;
