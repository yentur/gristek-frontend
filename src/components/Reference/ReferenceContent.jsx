import React from "react";
import Header from "../Layouts/Header";
import Footer from "../Layouts/Footer";
import ReferenceCard from "./ReferenceCard";
import { useApi } from "../../context/ApiProvider";

const ReferenceContent = () => {
  const { data, error } = useApi();
  const { references } = data;

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
            avatar={reference.image}
            url={reference.url}
          />
        ))}
      </div>
    </div>
  );
};

export default ReferenceContent;
