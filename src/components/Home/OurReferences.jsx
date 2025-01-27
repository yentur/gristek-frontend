import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

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
];

const OurReferences = () => {
  const extendedReferences = [...references, ...references, ...references];

  return (
    <section className="md:py-20 py-10 relative border-t-2 border-b-2 border-gray-200">
      <div className="mx-auto text-center">
        <h2 className="text-4xl lg:text-5xl font-bold mb-4">Referanslarımız</h2>

        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={3000}
          transitionTime={600}
          stopOnHover={true}
          centerMode={true}
          centerSlidePercentage={33}
          emulateTouch={true}
          swipeable={false}
          showIndicators={false}
        >
          {extendedReferences.map((ref, index) => (
            <div key={index} className="px-2">
              <div
                className="bg-white flex items-center justify-center"
                style={{ height: 200 }}
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
