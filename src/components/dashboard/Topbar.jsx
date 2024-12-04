import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import user_logo from "../../dist/images/user.png"

const Topbar = ({ organizationName, toggleSidebar }) => {
    const [userName, setUserName] = useState("Kullanıcı Adı");
    const [userRole, setUserRole] = useState("Yönetici");
    const [userAvatar, setUserAvatar] = useState(user_logo);

    return (
        <header className="bg-white shadow-md h-16 flex items-center px-4 md:px-8 text-gray-800">
            <h1 className="text-lg md:text-2xl font-semibold flex-1 text-center md:text-left">
                {organizationName}
            </h1>

            <div className="flex items-center space-x-4 md:space-x-6">
                <div className="hidden md:block relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                        <FaSearch />
                    </span>
                    <input
                        type="text"
                        placeholder="Arama yap..."
                        className="w-32 lg:w-64 px-10 py-2 bg-gray-100 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Kullanıcı Bilgisi */}
                <div className="flex items-center space-x-2">
                    <img
                        src={userAvatar}
                        alt={userName}
                        className="w-8 h-8 md:w-12 md:h-12 rounded-full border-2 border-gray-300 shadow-md"
                    />
                    <div className="hidden md:block">
                        <p className="font-semibold truncate text-gray-800">{userName}</p>
                        <p className="text-sm text-gray-500">{userRole}</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Topbar;
