import React, { createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import Home from "./components/Home/Home";
import ContactPage from "./components/ContactPage";
import AboutUs from "./components/AboutUs";
import Products from "./components/Products";
import Calculater from "./components/Calculator";
import Analysis from "./components/Analysis";
import IndividualLogin from "./components/auth/IndividualLogin";
import DealerLogin from "./components/auth/DealerLogin";
import CorporateLogin from "./components/auth/CorporateLogin";
import Corporate from "./components/dashboard/Corporate";
import TechnicalSupport from "./components/dashboard/TechnicalSupport";
import PrivateRoute from "./PrivateRoute";
import Reference from "./components/Reference/Reference";
import ProductDetail from "./components/ProductDetail";
import { ApiProvider } from "./context/ApiProvider";

function App() {
  return (
    <ApiProvider>
      <Router>
        <Routes>
          {/* Layout Kullanılan Rotalar */}
          <Route element={<MainLayout />}>
            <Route path="/hakkimizda" element={<AboutUs />} />
            <Route path="/tasarruf" element={<Calculater />} />
            <Route path="/analiz" element={<Analysis />} />
            <Route path="/urunler" element={<Products />} />
            <Route path="/urunler/:id" element={<ProductDetail />} />
            <Route path="/referanslar" element={<Reference />} />
            <Route path="/iletisim" element={<ContactPage />} />
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
