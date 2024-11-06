import React from 'react';
import image1 from '../dist/images/gristek-hakkinda-1.png'

const AboutUsContent = () => {
    return (
        <div className="flex flex-wrap md:flex-nowrap  justify-center bg-white w-full h-full py-10 gap-x-20">
            <div className='w-4/5 md:w-2/5'>
                <img src={image1} alt="" />
            </div>
            <div className='flex items-center w-11/12 mt-10 md:mt-0  md:w-2/5'>
                <div className='w-full md:w-3/4 gap-y-4'>
                    <p className="text-pc-100 text-xxs mb-4"><strong>GRİSTEK</strong></p>
                    <p className="text-black text-3xl mb-4"><strong>Hakkımızda</strong></p>
                    <p className="text-gray-500  text-base md:text-sm mb-4" ><strong>MİSYON</strong></p>
                    <p className="text-gray-500  text-base md:text-sm mb-4">GRİSTEK, gri su üzerine çalışan, tamamıyla genç ve idealist mühendis kadrosuna sahiptir. Gri suyun en hızlı ve yerinde arıtılarak geri dönüşümünü hedefler. Toplumsal sorumluluk anlayışını baz alarak çevre dostu projeler üretmeyi hedef benimsemiştir. Kalitesi ve özgün tasarımlarıyla sektörde yenilikler oluşturacak bir TMG Mühendislik markasıdır.</p>
                    <p className="text-gray-500  text-base md:text-sm mb-4"><strong>VİZYON</strong></p>
                    <p className="text-gray-500  text-base md:text-sm mb-4">GRİSTEK markası çevre sorunları ile ilgilenir. Vatandaşlarımızı hem bireysel hem de toplumsal olarak, ülke bazlı tasarruf ve kalkındırma yolculuğuna davet eder. 0 atık prensipleri dahilinde, gündelik hayattaki bireysel atık kapasitesini en aza indirmeyi amaçlar. Ayrıca gri su hedefiyle, dönüşümü ve üretimi hedef almaktadır.</p>

                </div>
            </div>

        </div>
    );
};


export default AboutUsContent;
