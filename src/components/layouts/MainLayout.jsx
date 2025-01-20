import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import WhatsAppFAB from "../WhatsappFAB";
import Header from "../Header";
import Footer from "../Footer";

const MainLayout = () => {
  const location = useLocation();

  // Layout kullanılmayacak rotalar
  const excludedPaths = [
    "/kurumsal-giris",
    "/bireysel-giris",
    "/bayi-giris",
    "/kurumsal",
    "/teknik-destek",
  ];

  const shouldShowLayout = !excludedPaths.includes(location.pathname);

  return (
    <div className="bg-white w-full h-full overflow-y-auto">
      {shouldShowLayout && <Header />}
      <div className="flex flex-col w-full h-full justify-center items-start mt-24 gap-y-14">
        <Outlet />
      </div>
      {shouldShowLayout && <Footer />}
      {shouldShowLayout && <WhatsAppFAB />}
    </div>
  );
};

export default MainLayout;
