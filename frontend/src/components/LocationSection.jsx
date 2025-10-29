import React from 'react';
import { Heart } from 'lucide-react';
import { SundaDivider, SundaFlowerOrnament, SundaBatikPattern } from './SundaOrnaments';

const LocationSection = ({ couple }) => {
  return (
    <section id="location" className="py-20 px-6 bg-gradient-to-br from-amber-50 via-white to-rose-50 relative overflow-hidden">
      {/* Batik Pattern Background */}
      <SundaBatikPattern />
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <SundaDivider className="mb-6" />
          <div className="inline-flex items-center justify-center gap-3 mb-6">
            <Heart className="w-12 h-12 text-rose-500 fill-rose-500" />
          </div>
          <h2 className="font-serif text-5xl md:text-6xl text-gray-800 mb-4">Terima Kasih</h2>
          <p className="text-lg text-gray-600 font-light">Thank You</p>
        </div>

        {/* Thank You Card */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-amber-200 relative overflow-hidden">
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-24 h-24 opacity-30">
            <SundaFlowerOrnament className="w-full h-full text-amber-400" />
          </div>
          <div className="absolute top-0 right-0 w-24 h-24 opacity-30">
            <SundaFlowerOrnament className="w-full h-full text-rose-400" />
          </div>
          
          <div className="relative z-10">
            {/* Couple Photo */}
            <div className="flex justify-center mb-8">
              <div className="relative group">
                {/* Decorative ring */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-rose-400 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300 scale-110"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-amber-300 to-rose-300 rounded-full opacity-10 animate-pulse"></div>
                
                {/* Photo */}
                <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                  <img 
                    src="/foto/foto-cover.jpg" 
                    alt={`${couple.bride} & ${couple.groom}`}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Flower ornament on top */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <SundaFlowerOrnament className="w-12 h-12 text-amber-500" />
                </div>
              </div>
            </div>

            {/* Thank You Message */}
            <div className="text-center space-y-6">
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-light italic">
                "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila 
                Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami."
              </p>
              
              <div className="pt-6 border-t border-amber-200">
                <p className="text-lg text-gray-600 mb-4">Atas kehadiran dan doa restu dari Bapak/Ibu/Saudara/i,</p>
                <p className="text-lg text-gray-600 mb-6">kami mengucapkan terima kasih.</p>
                
                {/* Couple Names */}
                <div className="space-y-2">
                  <p className="font-serif text-3xl md:text-4xl text-gray-800">
                    {couple.bride} & {couple.groom}
                  </p>
                  <div className="flex items-center justify-center gap-3 mt-4">
                    <div className="w-16 h-px bg-gradient-to-r from-transparent to-amber-400"></div>
                    <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
                    <div className="w-16 h-px bg-gradient-to-l from-transparent to-amber-400"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative bottom corners */}
          <div className="absolute bottom-0 left-0 w-24 h-24 opacity-30">
            <SundaFlowerOrnament className="w-full h-full text-rose-400" />
          </div>
          <div className="absolute bottom-0 right-0 w-24 h-24 opacity-30">
            <SundaFlowerOrnament className="w-full h-full text-amber-400" />
          </div>
        </div>

        {/* Divider Bottom */}
        <div className="mt-16">
          <SundaDivider />
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
