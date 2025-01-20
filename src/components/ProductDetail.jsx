import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import image1 from "../dist/images/gristek-kutu1.png";
import image2 from "../dist/images/gristek-kutu3lu-1.png";
import { ArrowRight, Star, Check } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams(); // URL'deki id'yi alır
  // Örnek veri, API veya state üzerinden veri çekebilirsiniz
  const sampleProducts = [
    {
      id: 1,
      name: "Gristek Modül (Tekli)",
      description: `Ana modüldür. Depo bilgileri:
        - Temiz depo: 30x40x25 cm (30 litre)
        - Kirli depo: 30x40x15 cm (18 litre)
        Toplam depo kapasitesi: 48 litre.`,
      features: [
        "Kolay temizlenebilir tasarım",
        "Kompakt boyut, her alana uyum sağlar",
        "30 litre temiz su kapasitesi",
        "18 litre kirli su kapasitesi",
      ],
      specs: {
        weight: "15 kg",
        dimensions: "30x40x25 cm",
        material: "ABS Plastik",
        warranty: "2 yıl",
      },
      image: image1,
    },
    {
      id: 2,
      name: "Gristek Modül (Üçlü)",
      description: `Ana modül + 2 yan modül içerir. Depo bilgileri:
        - Ana modül temiz depo: 30x40x25 cm (30 litre)
        - Ana modül kirli depo: 30x40x15 cm (18 litre)
        - Yan modül temiz depo (her biri): 25x50x40 cm (50 litre)
        - Yan modül kirli depo (her biri): 15x50x40 cm (30 litre)
        Toplam depo kapasitesi: 208 litre.`,
      features: [
        "Ana modül + 2 yan modül",
        "208 litre toplam kapasite",
        "Yan modüllerde ekstra dayanıklılık",
        "Endüstriyel ve evsel kullanım için uygundur",
      ],
      specs: {
        weight: "45 kg",
        dimensions: "30x40x25 cm + Yan Modüller",
        material: "ABS Plastik + Metal Destek",
        warranty: "2 yıl",
      },
      image: image2,
    },
  ];

  const product = sampleProducts.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-2xl font-semibold text-gray-600">
          Ürün bulunamadı.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          <div className="space-y-6">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Gristek Ürünü
            </div>
            <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
            <div className="flex items-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-gray-600">
                {product.rating} ({product.reviews} değerlendirme)
              </span>
            </div>
            <img
              className="w-full h-auto object-cover rounded-lg shadow-md"
              src={product.image || "/placeholder.svg"}
              alt={product.name}
            />
          </div>
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Ürün Açıklaması
              </h2>
              <p className="text-gray-600 whitespace-pre-line">
                {product.description}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Özellikler
              </h2>
              <ul className="grid grid-cols-2 gap-4">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Teknik Özellikler
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <span className="text-sm text-gray-500 capitalize">
                      {key}
                    </span>
                    <span className="font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex space-x-4">
              <button className="flex-1 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out">
                Sipariş Ver
              </button>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Neden Gristek?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-indigo-100 rounded-full p-4 mb-4">
                <ArrowRight className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Kolay Kurulum</h3>
              <p className="text-gray-600">
                Hızlı ve basit kurulum süreci ile zaman kazanın.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-indigo-100 rounded-full p-4 mb-4">
                <ArrowRight className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Enerji Tasarrufu</h3>
              <p className="text-gray-600">
                Düşük enerji tüketimi ile faturalarınızı azaltın.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-indigo-100 rounded-full p-4 mb-4">
                <ArrowRight className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Çevre Dostu</h3>
              <p className="text-gray-600">
                Sürdürülebilir teknoloji ile çevreyi koruyun.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetail;
