import React from "react";
// Carousel bileşenini ve stillerini import ediyoruz
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Örnek referans verisi:
const references = [
  {
    name: "Çorum Belediyesi",
    avatar:
      "https://logowik.com/content/uploads/images/corum-belediyesi9402.jpg",
    url: "https://www.corum.bel.tr",
  },
  {
    name: "Çorum Belediyesi Sosyal Tesisleri",
    avatar:
      "https://scontent.fszf1-1.fna.fbcdn.net/v/t1.6435-9/67839729_105104177512489_2163973182795546624_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=X1Q6ZxMdvOoQ7kNvgECQlNO&_nc_oc=Adj9xc_9sgm0meWocf5bb89hfsWclgfWjPBFDilLMFEG26jlFPjGtc8Fqj0UYrksigg&_nc_zt=23&_nc_ht=scontent.fszf1-1.fna&_nc_gid=A1BBpIUj9f1Wb7PxG8xqT2N&oh=00_AYBEDOuyI4TUjZPhrlz4ra90zBTPqfyfltHZOZ2xAnRjNQ&oe=67BEED5E",
    url: "https://www.corumbeltur.com.tr",
  },
  {
    name: "İSTAÇ A.Ş.",
    avatar:
      "https://yt3.googleusercontent.com/Oay2Dzbg23llfPESqmIZft0gOrGzwAMuSQAcrng5NzV_Zv1diaBXfkRkgW-_Cy3blSvSEdok=s900-c-k-c0x00ffffff-no-rj",
    url: "https://www.istac.istanbul",
  },
  // Daha fazla logo ekleyebilirsiniz...
];

const OurReferences = () => {
  const extendedReferences = [...references, ...references, ...references];
  
  return (
    <section className="md:py-20 py-10 relative border-t-2 border-b-2 border-gray-200">
      <div className="mx-auto text-center">
      <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Referanslarımız
          </h2>

        {/* Carousel ayarlarımız */}
        <Carousel
          showThumbs={false}       // Alttaki küçük önizlemeleri gizler
          showStatus={false}       // Üstteki sayfa numarasını gizler
          infiniteLoop={true}      // Sonsuz döngü
          autoPlay={true}          // Otomatik geçiş
          interval={3000}          // Her 3 saniyede bir geçiş
          transitionTime={600}     // Geçiş süresi (ms cinsinden)
          stopOnHover={true}       // Fareyle üzerine gelince dur
          centerMode={true}        // Orta odaklı görünüm
          centerSlidePercentage={33} // Ekranın kaçta kaçını kaplasın (%)
          emulateTouch={true}      // Mobilde dokunmatik kaydırma
          swipeable={false}        // Fare/Parmakla sürükleme
          showIndicators={false}   // Nokta göstergelerini gizler
        >
          {extendedReferences.map((ref, index) => (
            <div key={index} className="px-2">
              <div
                className="bg-white flex items-center justify-center"
                style={{ height: 200 }} // Logo kartınızın yüksekliğini ayarlayın
              >
                <img
                  src={ref.avatar}
                  alt={ref.name}
                  className="h-full object-contain p-2"
                />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default OurReferences;
