import React from 'react';
import { Heart } from 'lucide-react';

const Footer = ({ couple, wedding }) => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Decorative element */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-amber-400"></div>
          <Heart className="w-6 h-6 text-rose-400 fill-rose-400" />
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-amber-400"></div>
        </div>

        {/* Couple names */}
        <h3 className="font-serif text-4xl mb-2">
          {couple.bride} & {couple.groom}
        </h3>
        
        {/* Wedding date */}
        <p className="text-amber-300 font-light text-lg mb-8">{wedding.date}</p>

        {/* Quote */}
        <p className="text-gray-300 italic mb-8 max-w-2xl mx-auto">
          "Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day."
        </p>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6">
          <p className="text-gray-400 text-sm">
            © 2025 {couple.bride} & {couple.groom}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
