import React from "react";
import image from "../../dist/images/1-1.png";
import CountUp from "react-countup";
import ClipLoader from "react-spinners/ClipLoader";
import { useApi } from "../../context/ApiProvider";

const Hero = () => {
  const { data, error } = useApi();
  const { totalSavings, dailySavings } = data;

  return (
    <section className="bg-white from-blue-500 to-purple-500 md:py-20 py-4">
      <div className="container mx-auto flex flex-col lg:flex-row items-center px-4 lg:px-0">
        <div className="lg:w-1/2">
          <img src={image} alt="Water Conservation" className="w-full h-auto" />
        </div>
        <div className="lg:w-1/2 mt-8 lg:mt-0 lg:pl-16 text-black">
          <h1 className="text-4xl lg:text-5xl font-bold">
            Kuraklığa Karşı Geliyoruz!
          </h1>
          <p className="mt-4 text-lg text-gray-500 mb-10">
            Gristek ile su tasarrufuna öncülük ediyoruz.
          </p>
          <div className="flex flex-col justify-center items-center">
            <div className="middle text-center">
              <h1 className="text-2xl font-bold">Toplam Yaptığımız Tasarruf</h1>
              <h2 className="text-2xl font-bold text-blue-500 mt-2">
                {error ? (
                  <div className="text-red-500 text-center text-sm mb-4">{error}</div>
                ) : totalSavings && totalSavings !== null ? (
                  <CountUp
                    end={totalSavings}
                    duration={2}
                    separator=","
                    decimals={2}
                    suffix=" m³"
                  />
                ) : (
                  <ClipLoader size={30} color="#3B82F6" />
                )}
              </h2>
            </div>

            <div className="middle text-center mt-8">
              <h1 className="text-2xl font-bold">Günlük Tasarruf Miktarı</h1>
              <h2 className="text-2xl font-bold text-blue-500 mt-2">
                {error ? (
                  <div className="text-red-500 text-center text-sm mb-4">{error}</div>
                ) : dailySavings && dailySavings !== null ? (
                  <CountUp
                    end={dailySavings}
                    duration={3}
                    separator=","
                    decimals={2}
                    suffix=" m³"
                  />
                ) : (
                  <ClipLoader size={30} color="#3B82F6" />
                )}
              </h2>
            </div>

            <a
              href="/tasarruf"
              className="bg-pc-200 hover:bg-pc-100 text-white font-medium py-3 px-6 rounded-md mt-6 inline-block"
            >
              Tasarruf Hesaplama Aracı
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
