import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useApi } from "../../context/ApiProvider";

const OurReferences = () => {
  const { data, error } = useApi();
  const { references } = data;
  
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
                  src={ref.image}
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
