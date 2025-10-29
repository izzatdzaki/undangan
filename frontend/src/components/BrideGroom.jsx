import React from 'react';
import { Heart, Instagram } from 'lucide-react';
import { SundaDivider, SundaFlowerOrnament, SundaBatikPattern } from './SundaOrnaments';

const BrideGroom = ({ couple }) => {
  return (
    <section id="bride-groom" className="py-20 px-6 bg-gradient-to-br from-rose-50 via-white to-amber-50 relative overflow-hidden">
      {/* Batik Pattern Background */}
      <SundaBatikPattern />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <SundaDivider className="mb-6" />
          <h2 className="font-serif text-5xl md:text-6xl text-gray-800 mb-4">The Bride & Groom</h2>
          <p className="text-lg text-gray-600 font-light">Two hearts, one love</p>
        </div>

        {/* Bride & Groom Grid */}
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* The Bride */}
          <div className="text-center">
            <div className="relative inline-block mb-6">
              {/* Sunda Flower Ornament */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <SundaFlowerOrnament className="w-12 h-12 opacity-60" />
              </div>
              
              {/* Photo */}
              <div className="w-64 h-64 md:w-72 md:h-72 mx-auto rounded-full overflow-hidden border-8 border-white shadow-2xl">
                <img
                  src="/foto/20251027_101948015.jpg"
                  alt={couple.fullNames.bride}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative ring */}
              <div className="absolute -inset-4 border-2 border-rose-300 rounded-full opacity-30"></div>
            </div>

            {/* Name & Details */}
            <div className="mb-6">
              <h3 className="font-serif text-4xl md:text-5xl text-gray-800 mb-2">
                {couple.bride}
              </h3>
              <p className="text-lg text-gray-600 font-light mb-1">The Bride</p>
              <p className="text-base text-gray-500">{couple.fullNames.bride}</p>
            </div>

            {/* Instagram Button */}
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Instagram className="w-5 h-5" />
              <span className="font-medium">Follow Instagram</span>
            </a>
          </div>

          {/* The Groom */}
          <div className="text-center">
            <div className="relative inline-block mb-6">
              {/* Sunda Flower Ornament */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <SundaFlowerOrnament className="w-12 h-12 opacity-60" />
              </div>
              
              {/* Photo */}
              <div className="w-64 h-64 md:w-72 md:h-72 mx-auto rounded-full overflow-hidden border-8 border-white shadow-2xl">
                <img
                  src="/foto/20251026_214415008.jpg"
                  alt={couple.fullNames.groom}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative ring */}
              <div className="absolute -inset-4 border-2 border-amber-300 rounded-full opacity-30"></div>
            </div>

            {/* Name & Details */}
            <div className="mb-6">
              <h3 className="font-serif text-4xl md:text-5xl text-gray-800 mb-2">
                {couple.groom}
              </h3>
              <p className="text-lg text-gray-600 font-light mb-1">The Groom</p>
              <p className="text-base text-gray-500">{couple.fullNames.groom}</p>
            </div>

            {/* Instagram Button */}
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Instagram className="w-5 h-5" />
              <span className="font-medium">Follow Instagram</span>
            </a>
          </div>
        </div>

        {/* Love Quote */}
        <div className="text-center mt-16 max-w-2xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-100">
            <Heart className="w-8 h-8 text-rose-500 fill-rose-500 mx-auto mb-4" />
            <p className="text-gray-700 italic text-lg leading-relaxed">
              "Mugia rumahtanggana sing langgeng, pinuh ku kabagjaan jeung kaharmonisan."
            </p>
            <p className="text-gray-500 mt-2">- love</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrideGroom;
