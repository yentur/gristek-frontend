import React, { useState, useEffect } from 'react';

import image1 from "../dist/images/gristek-kutu1.png"
import image2 from "../dist/images/gristek-kutu3lu-1.png"

const ProductContent = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // Başlangıçta kategori seçili değil

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {

    const sampleProducts = [
      { id: 1, name: 'Gristek Modül (Tekli)', category: 'Gristek Modül', description: 'Tekli modüldür', image: 'https://gristek.com/wp-content/uploads/2023/08/gristek-kutu1-430x399.png' },
      { id: 2, name: 'Gristek Modül (Üçlü)', category: 'Gristek Modül', description: 'Üçlüdür.', image: 'https://gristek.com/wp-content/uploads/2023/01/gristek-kutu3lu-1-430x430.png' },
    ];


    setProducts(sampleProducts);
  };


  const fetchCategories = async () => {
    // Örnek veri:
    const sampleCategories = [
      { id: 1, name: 'Gristek Duş', count: 0 },
      { id: 2, name: 'Gristek Modül', count: 2 },
      { id: 3, name: 'Gristek Mutfak', count: 0 },
      { id: 4, name: 'Gristek Yedek Parçalar', count: 0 },
    ];
    setCategories(sampleCategories);
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };


  const filteredProducts = selectedCategory
    ? products.filter(product => (selectedCategory === 1 || product.category === categories.find(cat => cat.id === selectedCategory)?.name))
    : products;


  return (
    <div className='flex flex-col justify-center items-center w-full h-full '>
      <div className='flex flex-col justify-center items-center bg-cover bg-center  bg-back w-full p-10 gap-y-6'>
        <div className='font-bold text-6xl text-white'>
          <h1> Ürünler</h1>
        </div>
        <div className='flex gap-x-6'>
          {categories.map(category => (
            <div key={category.id} onClick={() => handleCategoryClick(category.id)} className='flex flex-col '>
              <div className='flex flex-col  text-xxm gap-y-1 relative group'>
                <div className="font-bold text-white group-hover:text-opacity-80">
                  <p>{category.name}</p>
                  <div className="absolute  bottom-[-2] left-0 w-0 h-[2px] bg-pc-200 group-hover:w-full transition-all duration-300"></div>
                </div>
              </div>
              <div className="text-white text-xxs text-opacity-60">
                <p>{category.count} Products</p>
              </div>
            </div>
          ))}
        </div>

      </div>
      <div className='flex flex-col md:flex-row justify-evenly items-center w-full  h-full mt-10 '>
        <div className='flex flex-col shadow-xl hover:shadow-2xl justify-center items-center w-4/5 md:w-2/5 h-96 '>
          <img src={image1} alt="" className="w-4/5 h-3/5 object-contain" />
          <div className='flex flex-col justify-center items-center text-center w-3/4 gap-1'>
            <h1 className='flex font-bold'>Gristek Modül (Tekli)</h1>
            <h1 className='flex font-bold text-gray-400 text-sm'>Gristek Modül</h1>
            <h1 className='flex font-bold text-gray-400 text-sm'>Tekli modüldür</h1>
            <a href="" className="mt-1 bg-pc-200 hover:bg-pc-100 text-white text-xxm font-medium py-2 px-2 rounded-md block">
          DEVAMINI OKU
        </a>
          </div>
        </div>
        <div className='flex flex-col shadow-xl hover:shadow-2xl justify-center items-center w-4/5 md:w-2/5 h-96'>
          <img src={image2} alt="" className="w-4/5 h-3/5 object-contain" />
          <div className='flex flex-col justify-center items-center text-center w-3/4 gap-1'>
            <h1 className='flex font-bold'>Gristek Modül (Üçlü)</h1>
            <h1 className='flex font-bold text-gray-400 text-sm'>Gristek Modül</h1>
            <h1 className='flex font-bold text-gray-400 text-sm'>Üçlü modüldür</h1>
            <a href="" className="mt-1 bg-pc-200 hover:bg-pc-100 text-white text-xxm font-medium py-2 px-2 rounded-md block">
          DEVAMINI OKU
        </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductContent;
