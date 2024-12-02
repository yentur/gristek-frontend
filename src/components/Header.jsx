import React, { useState, useEffect } from 'react';
import logo from "../dist/images/logo2.png"
const Header = () => {
  const [scrollDirection, setScrollDirection] = useState('up');
  const [menuOpen, setMenuOpen] = useState(false);  // Menü açılma durumunu takip etmek için state

  useEffect(() => {
    let prevScrollY = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      const direction = prevScrollY > currentScrollY ? 'up' : 'down';
      setScrollDirection(direction);
      prevScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`shadow bg-white py-4 w-full z-50 transition-transform duration-500 ease-in-out fixed top-0 left-0 right-0 ${scrollDirection === 'down' ? '-translate-y-full' : ''}`}>
      <div className="container-md mx-auto flex items-center justify-center md:justify-between px-4">
        {/* Logo */}
        <a href="/" className=" flex items-center justify-center">
          <img
            src={logo}
            alt="Gristek Logo"
            className="h-8  md:h-16 md:w-auto"
          />
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8">
          <a href="/" className="text-black hover:text-pc-200 font-medium">
            Anasayfa
          </a>
          <a href="/hakkimizda/" className="text-black hover:text-pc font-medium">
            Hakkımızda
          </a>
          <a href="/tasarruf/" className="text-black hover:text-pc font-medium">
            Tasarruf Hesaplama Aracı
          </a>
          <a href="/analiz/" className="text-black hover:text-pc font-medium">
            Analiz
          </a>
          <a href="/urunler/" className="text-black hover:text-pc font-medium">
            Ürünler
          </a>
          <a href="/iletisim/" className="text-black hover:text-pc font-medium">
            İletişim
          </a>
        </nav>

        {/* Desktop Button */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="w-px h-8 bg-gray-300"></div>
          <a href="/kurumsal-giris" className="bg-pc-200 hover:bg-pc-100 text-xl text-white font-bold py-2 px-6 rounded-md">
            Giriş
          </a>
        </div>


        <button
          className="absolute left-5 md:hidden marker:md:hidden text-black focus:outline-none"
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
      <div className={`md:hidden ${menuOpen ? 'block' : 'hidden'} bg-white py-4 px-4 space-y-4`}>
        <a href="/" className="text-black hover:text-pc-200 font-medium block">
          Anasayfa
        </a>
        <a href="/hakkimizda/" className="text-black hover:text-pc font-medium block">
          Hakkımızda
        </a>
        <a href="/tasarruf/" className="text-black hover:text-pc font-medium block">
          Tasarruf Hesaplama Aracı
        </a>
        <a href="/urunler/" className="text-black hover:text-pc font-medium block">
          Ürünler
        </a>
        <a href="/iletisim/" className="text-black hover:text-pc font-medium block">
          İletişim
        </a>
        <div className="h-px w-full bg-gray-300"></div> {/* Yatay separator */}
        <a href="/kurumsal-giris" className="bg-pc-200 hover:bg-pc-100 text-white font-medium py-2 px-4 rounded-md block text-center">
          Giriş
        </a>

      </div>
    </header>
  );
};

export default Header;
