import React from "react";
import image1 from "../../dist/images/gristek-hakkinda-1.png";

const AboutUsContent = () => {
  return (
    <div className="w-full min-h-screen">
      <div className="flex flex-wrap md:flex-nowrap justify-center items-center bg-white w-full h-full py-8 md:py-16 px-4 md:px-6 gap-y-10 md:gap-x-16">
        {/* Image Section */}
        <div className="w-full md:w-2/5 flex justify-center">
          <img
            src={image1}
            alt="GRİSTEK Hakkında"
            className="w-full max-w-sm md:max-w-full object-contain"
          />
        </div>

        {/* Content Section */}
        <div className="flex items-center w-full md:w-3/5">
          <div className="w-full md:w-4/5 space-y-6 text-center md:text-left">
            <h1 className="text-pc-100 text-sm font-bold uppercase tracking-wider mb-4">
              GRİSTEK
            </h1>
            <h2 className="text-black text-3xl md:text-4xl font-extrabold mb-6">
              Hakkımızda
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-gray-700 text-lg font-bold mb-2">Misyon</h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  GRİSTEK, gri su üzerine çalışan, tamamıyla genç ve idealist
                  mühendis kadrosuna sahiptir. Gri suyun en hızlı ve yerinde
                  arıtılarak geri dönüşümünü hedefler. Toplumsal sorumluluk
                  anlayışını baz alarak çevre dostu projeler üretmeyi hedef
                  benimsemiştir. Kalitesi ve özgün tasarımlarıyla sektörde
                  yenilikler oluşturacak bir TMG Mühendislik markasıdır.
                </p>
              </div>
              <div>
                <h3 className="text-gray-700 text-lg font-bold mb-2">Vizyon</h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  GRİSTEK markası çevre sorunları ile ilgilenir.
                  Vatandaşlarımızı hem bireysel hem de toplumsal olarak, ülke
                  bazlı tasarruf ve kalkındırma yolculuğuna davet eder. 0 atık
                  prensipleri dahilinde, gündelik hayattaki bireysel atık
                  kapasitesini en aza indirmeyi amaçlar. Ayrıca gri su
                  hedefiyle, dönüşümü ve üretimi hedef almaktadır.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsContent;
