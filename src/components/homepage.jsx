import React from 'react';

import Header from "./Header";
import Hero from "./Hero";
import Features from "./Features";
import About from "./About";
import HowWeDoIt from "./HowWeDoIt";
import Benefits from "./Benefits";
import FiltrationSystem from "./FiltrationSystem";
import UsageAreas from "./UsageAreas";
import Footer from "./Footer";
import Modal from "./Modal"

const Homepage = () => {
  return (
    <div className="bg-white font-sans ">
      <Header />
      <div className="mt-20">
        <Hero />
        <Features />
        <About />
        <HowWeDoIt />
        <Benefits />
        <FiltrationSystem />
        <UsageAreas />
        <Footer />
        <Modal/>
      </div>
    </div>
  );
};

export default Homepage;
