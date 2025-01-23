import React, { useState, useEffect } from "react";

import image1 from "../dist/images/gristek-kutu1.png";
import image2 from "../dist/images/gristek-kutu3lu-1.png";
import defaultProduct from "../dist/images/default_product.png";
import { motion } from "framer-motion";
import { Link, Navigate } from "react-router-dom";

const ProductContent = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Aktif sayfa
  const itemsPerPage = 15; // Her sayfada gösterilecek ürün sayısı

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const sampleProducts = [
      {
        id: 1,
        name: "Gristek Modül (Tekli)",
        category: "Gristek Modül",
        description: "Ana modüldür. Toplam depo kapasitesi: 48 litre.",
        image: image1,
      },
      {
        id: 2,
        name: "Gristek Modül (Üçlü)",
        category: "Gristek Modül",
        description:
          "Ana modül + 2 yan modül içerir. Toplam kapasite: 208 litre.",
        image: image2,
      },
    ];

    setProducts(sampleProducts);
  };

  const fetchCategories = async () => {
    const sampleCategories = [
      { id: 1, name: "Gristek Modüla", count: 2 },
      { id: 2, name: "Gristek Modülb", count: 2 },
      { id: 3, name: "Gristek Modülc", count: 2 },
      { id: 4, name: "Gristek Modüld", count: 2 },
    ];
    setCategories(sampleCategories);
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
    setCurrentPage(1); // Kategori değiştiğinde ilk sayfaya dön
  };

  const filteredProducts = selectedCategory
    ? products.filter(
        (product) =>
          product.category ===
          categories.find((cat) => cat.id === selectedCategory)?.name
      )
    : products;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDetailClick = (productId) => {
    window.location.href = `/urunler/${productId}`;
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen">
      <div
        className="flex flex-col justify-center items-center bg-back w-full p-10 gap-y-6 animate-gradient"
        style={{
          backgroundSize: "200% 200%",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-bold text-4xl md:text-6xl text-white mb-6"
        >
          Ürünler
        </motion.h1>
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex flex-col items-center cursor-pointer ${
                selectedCategory === category.id
                  ? "bg-white text-blue-800 border-2 border-white"
                  : "bg-pc-200 text-white border-2 border-opacity-50 border-white"
              } px-6 py-3 rounded-full hover:bg-opacity-90 transition duration-300 shadow-lg`}
            >
              <p className="font-bold">{category.name}</p>
              <span className="text-sm opacity-75">{category.count} Ürün</span>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="container w-full  flex justify-center items-center  px-4 py-16">
        {currentProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center text-gray-500"
          >
            <p className="text-xl font-semibold">
              Bu kategoriye ait ürün bulunamadı.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center gap-8"
          >
            {currentProducts.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl"
              >
                <div className="relative overflow-hidden group">
                  <img
                    src={product.image || `${defaultProduct}`}
                    alt={product.name}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      className="px-6 py-2 bg-white text-gray-900 font-semibold rounded-full transform transition-transform duration-300 hover:scale-105"
                      onClick={() => handleDetailClick(product.id)}
                    >
                      Ürünü İncele
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <Link
                    to={`/urunler/${product.id}`}
                    className="inline-block bg-pc-200 text-white font-semibold px-6 py-2 rounded-full transition-colors duration-300 hover:bg-blue-600"
                  >
                    Daha Fazla Bilgi Al
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Pagination Kontrolleri */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded-full ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductContent;
