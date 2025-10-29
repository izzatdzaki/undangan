import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

const HeroSection = ({ couple, wedding }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50 via-white to-rose-50">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className={`relative z-10 text-center px-6 transition-all duration-1500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Save the date */}
        <div className="mb-8 inline-flex items-center gap-2 px-6 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-amber-200 shadow-sm">
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
          <span className="text-sm font-medium text-gray-700">Save The Date</span>
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
        </div>

        {/* Couple names */}
        <div className="mb-8">
          <h1 className="font-serif text-7xl md:text-8xl lg:text-9xl text-gray-800 mb-4">
            {couple.bride}
            <span className="block text-6xl md:text-7xl lg:text-8xl text-amber-600 my-4">&</span>
            {couple.groom}
          </h1>
        </div>

        {/* Wedding date */}
        <div className="mb-12">
          <div className="inline-block">
            <p className="text-2xl md:text-3xl text-gray-700 font-light tracking-wider mb-2">
              {wedding.date}
            </p>
            <div className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
          </div>
        </div>

        {/* Venue */}
        <p className="text-lg md:text-xl text-gray-600 font-light mb-12">
          {wedding.venue.name}
        </p>

        {/* Scroll indicator */}
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full mx-auto flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
