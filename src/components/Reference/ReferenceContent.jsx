import React from "react";
import Header from "../Layouts/Header";
import Footer from "../Layouts/Footer";
import ReferenceCard from "./ReferenceCard";

const references = [
  {
    name: "Ahmet Yılmaz",
    company: "Tech Innovations Ltd.",
    position: "CTO",
    content:
      "Bu ekip ile çalışmak gerçekten harika bir deneyimdi. Projemizi zamanında ve bütçe dahilinde tamamladılar.",
    avatar: "https://placehold.co/40",
  },
  {
    name: "Ayşe Kaya",
    company: "Global Solutions Inc.",
    position: "Proje Yöneticisi",
    content:
      "Profesyonel yaklaşımları ve teknik uzmanlıkları ile beklentilerimizin ötesine geçtiler.",
    avatar: "https://placehold.co/40",
  },
  {
    name: "Mehmet Demir",
    company: "Startup Ventures",
    position: "Kurucu Ortak",
    content:
      "Yaratıcı çözümleri ve müşteri odaklı yaklaşımları ile projemize büyük değer kattılar.",
    avatar: "https://placehold.co/40",
  },
  {
    name: "Zeynep Şahin",
    company: "E-commerce Giants",
    position: "Pazarlama Direktörü",
    content:
      "Dijital dönüşüm sürecimizde bize rehberlik ettiler. Sonuçlar beklediğimizden çok daha iyi oldu.",
    avatar: "https://placehold.co/40",
  },
  {
    name: "Can Özturk",
    company: "FinTech Solutions",
    position: "Ürün Yöneticisi",
    content:
      "Teknik bilgileri ve sektör tecrübeleri ile ürünümüzü bir üst seviyeye taşıdılar.",
    avatar: "https://placehold.co/40",
  },
  {
    name: "Elif Yıldız",
    company: "Health & Tech Co.",
    position: "İK Direktörü",
    content:
      "Ekip çalışmaları ve iletişim becerileri mükemmeldi. Kesinlikle tekrar çalışmak isteriz.",
    avatar: "https://placehold.co/40",
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
            customerName={reference.name}
            feedback={reference.content}
            avatar={reference.avatar}
            position={reference.position}
            company={reference.company}
          />
        ))}
      </div>
    </div>
  );
};

export default ReferenceContent;
