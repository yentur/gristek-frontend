import './main.css';
import Homepage from './components/homepage';
import ContactPage from './components/ContactPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AboutUs from './components/AboutUs';
import Products from './components/Products';
import Calculater from './components/Calculater';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header ">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/iletisim" element={<ContactPage />} />
            <Route path="/hakkimizda" element={<AboutUs />} />
            <Route path="/tasarruf" element={<Calculater/>} />
            <Route path="/urunler" element={<Products/>} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
