import React from 'react';
import gristek_image from '../dist/images/gristek-nedir1.jpg'
const About = () => {
    return (
      <section className=" bg-cover bg-center  bg-back py-20">
        <div className="container mx-auto flex flex-col lg:flex-row items-center px-4 lg:px-0">
          <div className="lg:w-1/2 text-white">
            <h2 className="text-4xl lg:text-5xl font-bold">
              Gristek Nedir?
            </h2>
            <p className="mt-4 text-lg">
              Gristek Modül, tuvalet ve banyo lavabolarında el yıkamak için
              kullanılan suyu lavabo altlarında bulunan dolap içerisine özel
              olarak üretilmiş arıtma sistemi ile tuvalet ve yer temizliğinde
              kullanılacak hale getirir.
            </p>
            <a
              href="tel:05067747835"
              className="border-2 border-opacity-60  hover:border-white hover:text-white text-white font-medium py-2 px-6 rounded-md mt-6 inline-block"
            >
              BİZİ ARAYIN
            </a>
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0 lg:pr-16">
            <img
              src={gristek_image}
              alt="About Image"
              className="w-full h-auto rounded-lg"
            />
            {/* Add hotspot logic if needed */}
          </div>
        </div>
        <p className="text-white text-center mt-8">
          * Her su, atık su değildir.
        </p>
      </section>
    );
  };
export default About;
