import React, { useState, useEffect } from "react";
import Header from "../components/Layouts/Header";
import Hero from "../components/Home/Hero";
import Features from "../components/Home/Features";
import About from "../components/Home/About";
import HowWeDoIt from "../components/Home/HowWeDoIt";
import Benefits from "../components/Home/Benefits";
import FiltrationSystem from "../components/Home/FiltrationSystem";
import UsageAreas from "../components/Home/UsageAreas";
import Footer from "../components/Layouts/Footer";
import Modal from "../components/Home/Modal";
import WhatsAppFAB from "../components/Layouts/WhatsappFAB";

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const isModalShown = sessionStorage.getItem("isModalShown");

    if (!isModalShown) {
      setShowModal(true); 
      sessionStorage.setItem("isModalShown", "true"); 
    }
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-white font-sans overflow-y-auto">
      <Header />
      <div className="mt-20">
        <Hero />
        <Features />
        <About />
        <HowWeDoIt />
        <Benefits />
        <FiltrationSystem />
        <UsageAreas />
        <WhatsAppFAB />
        <Footer />
        {showModal && <Modal onClose={closeModal} />}
      </div>
    </div>
  );
};

export default Home;
