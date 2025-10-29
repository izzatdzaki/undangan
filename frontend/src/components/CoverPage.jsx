import React from 'react';
import { Mail } from 'lucide-react';
import { SundaBatikPattern, SundaCornerOrnament, SundaFlowerOrnament } from './SundaOrnaments';

const CoverPage = ({ couple, onOpen, guestName = "Tamu Undangan" }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/foto/20251026_223444317.jpg')`,
          backgroundPosition: 'center 40%',
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto text-white">
        {/* Sunda Ornaments */}
        <div className="relative">
          <SundaCornerOrnament position="top-left" className="opacity-40" />
          <SundaCornerOrnament position="top-right" className="opacity-40" />
          
          {/* Flower ornament top */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <SundaFlowerOrnament className="w-16 h-16 opacity-60" />
          </div>
        </div>

        {/* Small title */}
        <p className="text-lg md:text-xl font-light mb-4 tracking-widest opacity-90">
          The Wedding of
        </p>

        {/* Couple Names */}
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight">
          {couple.bride}
          <span className="block text-4xl md:text-5xl lg:text-6xl my-4 opacity-90">
            &
          </span>
          {couple.groom}
        </h1>

        {/* Guest Name */}
        <div className="mb-8">
          <p className="text-lg md:text-xl font-light mb-2 opacity-90">Dear,</p>
          <p className="text-xl md:text-2xl font-medium">{guestName}</p>
        </div>

        {/* Open Invitation Button */}
        <button
          onClick={onOpen}
          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full shadow-2xl hover:bg-white hover:scale-105 transition-all duration-300 font-medium"
        >
          <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-base md:text-lg">OPEN INVITATION</span>
        </button>

        {/* Disclaimer */}
        <p className="mt-8 text-sm md:text-base text-white/80 font-light">
          Mohon maaf apabila ada kesalahan pada penulisan nama & gelar
        </p>

        {/* Bottom ornaments */}
        <div className="relative mt-8">
          <SundaCornerOrnament position="bottom-left" className="opacity-40" />
          <SundaCornerOrnament position="bottom-right" className="opacity-40" />
        </div>
      </div>

      {/* Batik Pattern Overlay */}
      <SundaBatikPattern />

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent"></div>
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/30 to-transparent"></div>
    </div>
  );
};

export default CoverPage;
