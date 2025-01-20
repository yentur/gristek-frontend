import React from 'react';

const ContactInfoSection = () => {
    return (
      <div className='flex w-full h-full mt-5'>
      <section className="wd-negative-gap w-full">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="title-wrapper mb-4 text-left">
                <div className="title-subtitle text-xs text-gray-400 pb-1 font-bold">Bize Ulaşın</div>
                <h4 className="text-2xl font-bold">İLETİŞİM BİLGİLERİMİZ</h4>
              </div>
              <div className="text-left text-gray-400 text-xl">
                <strong >Adresimiz:</strong> Pınarçay OSB / Çorum Teknokent -
                Merkez ÇORUM
                <br />
                <br />
                <a href='https://wa.me/905067747835' className='text-blue-500'>Whatsapp:</a> 0506 774 78 35
                <br />
                <br />
                <strong>E-Posta:</strong> info@gristek.com
              </div>
            </div>
            <div>
              <div className="title-wrapper mb-4 text-left">
                <div className="title-subtitle text-xs font-bold pb-1 text-gray-400">Bize Yazın</div>
                <h4 className="text-2xl font-bold">İLETİŞİM FORMU</h4>
              </div>
              <form
                action="#"
                className="w-full"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div >
                    <label htmlFor="your-name" >Adınız</label>
                    <input
                      type="text"
                      id="your-name"
                      name="your-name"
                      required
                      className="w-full mt-2 border-2 border-gray-200 px-3 py-2 rounded-md focus:outline-none focus:ring-1" 
                    />
                  </div>
                  <div>
                    <label htmlFor="your-email">E-Posta</label>
                    <input
                      type="email"
                      id="your-email"
                      name="your-email"
                      required
                      className="w-full mt-2 border-2 border-gray-200 px-3 py-2 rounded-md focus:outline-none focus:ring-1"
                    />
                  </div>
                  <div>
                    <label htmlFor="tel-767">Telefon</label>
                    <input
                      type="tel"
                      id="tel-767"
                      name="tel-767"
                      className="w-full mt-2  border-2 border-gray-200 px-3 py-2 rounded-md focus:outline-none focus:ring-1"
                    />
                  </div>
                  <div>
                    <label htmlFor="text-1">Konu</label>
                    <input
                      type="text"
                      id="text-1"
                      name="text-1"
                      className="w-full mt-2  border-2 border-gray-200 px-3 py-2 rounded-md focus:outline-none focus:ring-1"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="your-message">Mesajınız</label>
                  <textarea
                    id="your-message"
                    name="your-message"
                    rows="5"
                    className="w-full mt-2 border-2 border-gray-200 px-3 py-2 rounded-md focus:outline-none focus:ring-1"
                  ></textarea>
                </div>
                <div className="mt-4">
                  <button
                    type="submit"
                    className="bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 "
                  >
                    GÖNDER
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      </div>
    );
  };
  
export default ContactInfoSection;