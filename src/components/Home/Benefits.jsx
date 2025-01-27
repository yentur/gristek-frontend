import React from 'react';
import gristek_image from '../../dist/images/gristek-fayda1.jpg'
const Benefits = () => {
    return (
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto flex flex-col lg:flex-row items-center px-4 lg:px-0">
          <div className="lg:w-1/2">
            <img
              src={gristek_image}
              alt="Benefits"
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0 lg:pl-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Gristek'in
              <br />
              Faydaları
            </h2>
            <ul className="list-[square] list-inside text-sm mt-6 text-gray-600 space-y-4">
              <li>
                Evsel atık suyu geri dönüştürür ve belirli alanlarda
                kullanıma hazır hale getirir.
              </li>
              <li>
                Su geri dönüşümünü sağlayarak gereksiz tatlı su
                kullanımının önüne geçer.
              </li>
              <li>
                Şebeke suyunun birden fazla kez kullanımını sağlar. Bu
                sayede su faturasından tasarruf edilir.
              </li>
              <li>
                Mevcutta kullanılan diğer su geri dönüşümü sistemlerine göre
                daha portatiftir. Aynı zamanda elektrik tüketimi bakımından
                da daha ekonomiktir.
              </li>
            </ul>
          </div>
        </div>
      </section>
    );
  };
export default Benefits;