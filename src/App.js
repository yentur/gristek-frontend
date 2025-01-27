import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/Layouts/MainLayout";
import PrivateRoute from "./PrivateRoute";
import { ApiProvider } from "./context/ApiProvider";

import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Calculator from "./pages/Calculator";
import Analysis from "./pages/Analysis";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Reference from "./pages/Reference";
import Contact from "./pages/Contact";

import IndividualLogin from "./components/auth/IndividualLogin";
import DealerLogin from "./components/auth/DealerLogin";
import CorporateLogin from "./components/auth/CorporateLogin";
import Corporate from "./components/dashboard/Corporate";
import TechnicalSupport from "./components/dashboard/TechnicalSupport";

function App() {
  return (
    <ApiProvider>
      <Router>
        <Routes>
          {/* Layout Kullanılan Rotalar */}
          <Route element={<MainLayout />}>
            <Route path="/hakkimizda" element={<AboutUs />} />
            <Route path="/tasarruf" element={<Calculator />} />
            <Route path="/analiz" element={<Analysis />} />
            <Route path="/urunler" element={<Products />} />
            <Route path="/urunler/:id" element={<ProductDetail />} />
            <Route path="/referanslar" element={<Reference />} />
            <Route path="/iletisim" element={<Contact />} />
          </Route>

          {/* Layout Kullanılmayan Rotalar */}
          <Route path="/" element={<Home />} />
          <Route path="/bireysel-giris" element={<IndividualLogin />} />
          <Route path="/bayi-giris" element={<DealerLogin />} />
          <Route path="/kurumsal-giris" element={<CorporateLogin />} />
          <Route
            path="/kurumsal"
            element={
              <PrivateRoute>
                <Corporate />
              </PrivateRoute>
            }
          />
          <Route path="/teknik-destek" element={<TechnicalSupport />} />
        </Routes>
      </Router>
    </ApiProvider>
  );
}

export default App;
