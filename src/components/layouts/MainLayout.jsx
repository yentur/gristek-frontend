import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import WhatsAppFAB from "../WhatsappFAB";
import Header from "../Header";
import Footer from "../Footer";

const MainLayout = () => {
  const location = useLocation();

  // Layout kullanılmayacak rotalar
  const excludedPaths = [
    "/",
    "/kurumsal-giris",
    "/bireysel-giris",
    "/bayi-giris",
    "/kurumsal",
    "/teknik-destek",
  ];

  const shouldShowLayout = !excludedPaths.includes(location.pathname);

  console.log(location.pathname);

  return (
    <div className="bg-white w-full h-full overflow-y-auto">
      {shouldShowLayout && <Header />}
      <div
        className={`flex flex-col w-full h-full justify-center items-start gap-y-14 ${
          location.pathname.startsWith('/urunler') ? "md:mt-24 mt-12" : "mt-24"
        }`}
      >
        <Outlet />
      </div>
      {shouldShowLayout && <Footer />}
      {shouldShowLayout && <WhatsAppFAB />}
    </div>
  );
};

export default MainLayout;
