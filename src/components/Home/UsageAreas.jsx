import React from 'react';

const UsageAreas = () => {
    return (
      <section className="py-20">
        <div className="container mx-auto text-center lg:px-0">
          <h2 className="text-5xl font-bold mb-8">Kullanım Alanları</h2>
          <div className="flex flex-wrap justify-center">
            {[
              {
                title: 'Devlet Daireleri',
                description:'Kamu kurumlarında (okul, hastane, belediye binaları vb.) bulunan umuma açık tuvaletlerde Gristek Modül kullanılabilir.',
                description2:'Gristek Modül\'ün kullanılması ile yılda %40 ila %50 arasında tasarruf sağlanabilir.',
              },
              {
                title: 'Özel Sektör',
                description:'Özel sektöre ait iş yerlerinde toplu kullanılan tuvaletlerde Gristek Modül kullanılabilir.',
                description2:'Gristek Modül\'ün kullanılması ile yılda %30 ila %40 arasında tasarruf sağlanabilir.',
              },
              {
                title: 'Hanelerde',
                description:
                  'Evlerde bulunan tuvaletlerde Gristek Modül kullanılabilir.',
                description2:'Gristek Modül\'ün kullanılması ile yılda %20 ila %30 arasında tasarruf sağlanabilir.',
              },
            ].map(({ title, description,description2}, index) => (
              <div
                key={index}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 mb-0 md:mb-8"
              >
                <div className="bg-white p-6">
                  <h3 className="text-2xl font-bold mb-4">{title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{description}</p>
                  <p className="text-sm text-gray-500 font-bold">{description2}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
export default UsageAreas;