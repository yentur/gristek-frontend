import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Topbar = ({ organizationName }) => {
    const [userName, setUserName] = useState("Kullanıcı Adı");
    const [userRole, setUserRole] = useState("Yönetici");
    const [userAvatar, setUserAvatar] = useState("https://via.placeholder.com/40");

    const updateUser = (name, role, avatar) => {
        setUserName(name);
        setUserRole(role);
        setUserAvatar(avatar);
    };

    return (
        <header className="bg-white shadow-md h-20 flex items-center justify-between px-8 text-gray-800">
            <h1 className="text-2xl font-semibold">
                {organizationName}
            </h1>
            <div className="flex items-center space-x-6">
                {/* Arama Kutusu */}
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                        <FaSearch />
                    </span>
                    <input
                        type="text"
                        placeholder="Arama yap..."
                        className="w-64 px-10 py-3 bg-gray-100 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                {/* Kullanıcı Bilgisi */}
                <div className="flex items-center space-x-4">
                    <img
                        src={userAvatar}
                        alt={userName}
                        className="w-12 h-12 rounded-full border-2 border-gray-300 shadow-md"
                    />
                    <div>
                        <p className="font-semibold">{userName}</p>
                        <p className="text-sm text-gray-500">{userRole}</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Topbar;
