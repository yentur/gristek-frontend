import React from 'react';
import Header from "./Header"
import Footer from "./Footer"
import ProductContent from "./ProductContent"

const Products = () => {
  return (
      <div className="bg-white w-full h-full">
        <Header />
        <div className="flex flex-col w-full h-full justify-center items-start mt-24 gap-y-14">
        <ProductContent></ProductContent>
        <Footer />
        </div>
      </div>
  );
};


export default Products;
