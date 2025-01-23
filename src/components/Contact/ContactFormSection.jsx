import React from "react";

const ContactFormSection = () => {
  return (
    <div className="flex w-full h-auto mt-5">
      <div className="container mx-auto pb-6">
        {/* Contact Form Section */}
        <div className="bg-white shadow-xl rounded-lg p-8 lg:col-span-2">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">
            İletişim Formu
          </h2>
          <form className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Adınız
              </label>
              <input
                id="name"
                type="text"
                required
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400 bg-white"
                placeholder="Adınızı girin"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                E-posta
              </label>
              <input
                id="email"
                type="email"
                required
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400 bg-white"
                placeholder="E-posta adresinizi girin"
              />
            </div>

            <div>
              <label
                htmlFor="tel"
                className="block text-sm font-medium text-gray-700"
              >
                Telefon
              </label>
              <input
                id="tel"
                type="tel"
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400 bg-white"
                placeholder="Telefon numaranızı girin"
              />
            </div>

            <div>
              <label
                htmlFor="text"
                className="block text-sm font-medium text-gray-700"
              >
                Konu
              </label>
              <input
                id="text"
                type="text"
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400 bg-white"
                placeholder="Konuyu girin"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Mesajınız
              </label>
              <textarea
                id="message"
                rows="5"
                required
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400 bg-white"
                placeholder="Mesajınızı buraya yazın"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-pc-200 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-pc-100"
            >
              Gönder
            </button>
          </form>
        </div>

        {/* Empty space for layout adjustment (optional) */}
        <div className="hidden md:block lg:col-span-1"></div>
      </div>
    </div>
  );
};

export default ContactFormSection;
