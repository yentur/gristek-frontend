import React, { useState, useEffect } from "react";
import logo from "../../dist/images/gristek_logo_new.png";

const Header = () => {
  const [scrollDirection, setScrollDirection] = useState("up");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePath, setActivePath] = useState("");

  useEffect(() => {
    let prevScrollY = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      const direction = prevScrollY > currentScrollY ? "up" : "down";
      setScrollDirection(direction);
      prevScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    // Aktif yolu ayarla
    setActivePath(window.location.pathname);

    // Check login status on component mount
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Anasayfa", path: "/" },
    { name: "Hakkımızda", path: "/hakkimizda/" },
    { name: "Tasarruf Hesaplama Aracı", path: "/tasarruf/" },
    { name: "Analiz", path: "/analiz/" },
    { name: "Ürünler", path: "/urunler/" },
    { name: "Referanslar", path: "/referanslar/" },
    { name: "İletişim", path: "/iletisim/" },
  ];

  return (
    <header
      className={`shadow bg-white py-4 w-full z-50 transition-transform duration-500 ease-in-out fixed top-0 left-0 right-0 ${
        scrollDirection === "down" ? "-translate-y-full" : ""
      }`}
    >
      <div className="container-md mx-auto flex items-center justify-center md:justify-between px-4">
        {/* Logo */}
        <a href="/" className="flex items-center justify-center">
          <img src={logo} alt="Logo" className="h-8 md:h-16 md:w-auto" />
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8">
          {menuItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className={`text-black font-medium ${
                activePath === item.path ? "text-pc-200 font-bold" : "hover:text-pc"
              }`}
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Desktop Button */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="w-px h-8 bg-gray-300"></div>
          {isLoggedIn ? (
            <a
              href="/kurumsal"
              className="bg-pc-200 hover:bg-pc-100 text-xl text-white font-bold py-2 px-6 rounded-md"
            >
              Dashboard
            </a>
          ) : (
            <a
              href="/kurumsal-giris"
              className="bg-pc-200 hover:bg-pc-100 text-xl text-white font-bold py-2 px-6 rounded-md"
            >
              Giriş
            </a>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="absolute left-5 md:hidden text-black focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${
          menuOpen ? "block" : "hidden"
        } bg-white py-4 px-4 space-y-4`}
      >
        {menuItems.map((item) => (
          <a
            key={item.path}
            href={item.path}
            className={`block font-medium ${
              activePath === item.path
                ? "text-pc-200 font-bold"
                : "text-black hover:text-pc"
            }`}
          >
            {item.name}
          </a>
        ))}
        <div className="h-px w-full bg-gray-300"></div>
        {isLoggedIn ? (
          <a
            href="/kurumsal"
            className="bg-pc-200 hover:bg-pc-100 text-white font-medium py-2 px-4 rounded-md block text-center"
          >
            Dashboard
          </a>
        ) : (
          <a
            href="/kurumsal-giris"
            className="bg-pc-200 hover:bg-pc-100 text-white font-medium py-2 px-4 rounded-md block text-center"
          >
            Giriş
          </a>
        )}
      </div>
    </header>
  );
};

export default Header;
