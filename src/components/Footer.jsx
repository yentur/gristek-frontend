import React from 'react';

const Footer = () => {
    return (
      <footer className="bg-gray-800 py-8 w-full ">
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center px-4 lg:px-0">
          <div className="mb-4 lg:mb-0">
            <img
              src="https://gristek.com/wp-content/uploads/elementor/thumbs/gristek-logo2-white-q0yyabw0ghilxlt3e8nqo3i309hdsg0pj4gyhteikw.png"
              alt="Gristek Logo"
              className="h-12 w-auto"
            />
          </div>
          <nav className="text-white space-x-8">
            <a href="/" className="text-white hover:text-gray-300 font-medium">
              Anasayfa
            </a>
            <a href="/hakkimizda/" className="text-white hover:text-gray-300 font-medium">
              Hakkımızda
            </a>
            <a href="http://tasarruf.gristek.com/" className="text-white hover:text-gray-300 font-medium">
              Tasarruf Hesaplama Aracı
            </a>
            <a href="/magaza/" className="text-white hover:text-gray-300 font-medium">
              Mağaza
            </a>
            <a href="/iletisim/" className="text-white hover:text-gray-300 font-medium">
              İletişim
            </a>
          </nav>
        </div>
        <div className="container mx-auto mt-8 px-4 lg:px-0">
          <div className="flex flex-col sm:flex-row justify-between items-center text-white">
            <p>
              <a
                href="https://perforans.com"
                target="_blank"
                rel="noopener"
                className="font-bold"
              >
                PERFORANS
              </a>{' '}
              | Dijital Performans Ajansı
            </p>
            {/* Add payment icons if needed */}
          </div>
        </div>
      </footer>
    );
  };
export default Footer;