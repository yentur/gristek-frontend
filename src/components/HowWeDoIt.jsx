import React from 'react';
import image from "../dist/images/nasil-yapiyoruz1-1.png"
const HowWeDoIt = () => {
    return (
      <section className="py-20">
        <div className="container mx-auto text-center px-4 lg:px-0 w-full md:w-7/12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Nasıl Yapıyoruz?
          </h2>
          <p className="text-sm mb-8 font-bold text-gray-400">
            Tatlı su kaynaklarını korumak amacıyla geliştirdiğimiz Gristek
            Modül ürünümüz ile lavabolarımızdan akan kullanılmış evsel atık
            suyun geri dönüşümünü sağlıyoruz.
          </p>
          <img
            src={image}
            alt="How We Do It Image"
            className="w-full h-auto mx-auto"
          />
        </div>
      </section>
    );
  };

export default HowWeDoIt;