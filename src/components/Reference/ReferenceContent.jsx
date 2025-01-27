import React from "react";
import Header from "../Layouts/Header";
import Footer from "../Layouts/Footer";
import ReferenceCard from "./ReferenceCard";

const references = [
  {
    name: "Çorum Belediyesi",
    avatar:
      "https://logowik.com/content/uploads/images/corum-belediyesi9402.jpg",
    url: "https://www.corum.bel.tr",
  },
  {
    name: "Çorum Belediyesi Soyal Tesisleri",
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

const ReferenceContent = () => {
  return (
    <div className="w-full h-full container mx-auto px-4 md:py-8 mb-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-">
        Referanslarımız
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {references.map((reference, index) => (
          <ReferenceCard
            key={index}
            name={reference.name}
            avatar={reference.avatar}
            url={reference.url}
          />
        ))}
      </div>
    </div>
  );
};

export default ReferenceContent;
