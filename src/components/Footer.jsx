import React from 'react';
import logo from "../dist/images/gristek_logo_new_white.png";

const Footer = () => {
  const menuItems = [
    { name: "Anasayfa", path: "/" },
    { name: "Hakkımızda", path: "/hakkimizda/" },
    { name: "Tasarruf Hesaplama Aracı", path: "http://tasarruf.gristek.com/" },
    { name: "Analiz", path: "/analiz/" },
    { name: "Ürünler", path: "/urunler/" },
    { name: "Referanslar", path: "/referanslar/" },
    { name: "İletişim", path: "/iletisim/" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-10 w-full">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center px-6 lg:px-0 space-y-8 lg:space-y-0">
        {/* Logo and Description */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <img src={logo} alt="Gristek Logo" className="h-14 w-auto mb-4" />
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col lg:flex-row justify-center lg:justify-start gap-4 lg:gap-6">
          {menuItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className="text-gray-300 hover:text-white text-sm font-medium transition"
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6">
        <div className="container mx-auto text-center text-gray-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Gristek. Tüm hakları saklıdır. |
            <a
              href="https://gristek.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white font-medium ml-1"
            >
              GRİSTEK
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
