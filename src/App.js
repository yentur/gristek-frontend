import React from 'react';
import './main.css';
import Homepage from './components/homepage';
import ContactPage from './components/ContactPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AboutUs from './components/AboutUs';
import Products from './components/Products';
import Calculater from './components/Calculater';
import Analysis from './components/Analysis';
import IndividualLogin from './components/auth/IndividualLogin';
import DealerLogin from './components/auth/DealerLogin';
import CorporateLogin from './components/auth/CorporateLogin';
import Corporate from './components/dashboard/Corporate';
import TechnicalSupport from './components/dashboard/TechnicalSupport';
import PrivateRoute from './PrivateRoute'; 

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/iletisim" element={<ContactPage />} />
            <Route path="/hakkimizda" element={<AboutUs />} />
            <Route path="/tasarruf" element={<Calculater />} />
            <Route path="/analiz" element={<Analysis />} />
            <Route path="/urunler" element={<Products />} />
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
        </header>
      </div>
    </Router>
  );
}

export default App;