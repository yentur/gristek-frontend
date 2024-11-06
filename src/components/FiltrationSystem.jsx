import React from 'react';

const FiltrationSystem = () => {
    return (
      <section className="bg-cover bg-center  bg-back py-20">
        <div className="container mx-auto flex flex-col lg:flex-row items-center px-4 lg:px-0">
          <div className="lg:w-1/2">
            <img
              src="https://gristek.com/wp-content/uploads/2023/08/gristek-kutu1.png"
              alt="Filtration System"
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0 lg:pl-16 text-white">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Filtrasyon Sistemi
            </h2>
            <ul className="list-[square] list-inside  text-base   space-y-4">
              <li>
                <b>Fiziksel Filtrasyon:</b> Gristek modül kullanılarak
                arıtılan evsel atık sular ilk olarak fiziksel filtrasyon
                ile sudaki katı kirlerden arınır.
              </li>
              <li>
                <b>Kimyasal Filtrasyon:</b> Fiziksel filtrasyon sonrası
                arıtılan su, kimyasal filtrasyondan geçerek içerisinde
                bulunan zararlı mikro organizmalardan ve bakterilerden
                arındırılır.
              </li>
              <li>
                <b>Ultraviyole Işıkları:</b> Ultraviyole ışıklar
                sayesinde arıtılan suyun içinde bakteri üremesinin önüne
                geçilir.
              </li>
            </ul>
          </div>
        </div>
      </section>
    );
  };
export default FiltrationSystem;