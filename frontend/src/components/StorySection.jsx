import React from 'react';
import { Heart } from 'lucide-react';
import { SundaDivider, SundaCornerOrnament, SundaBatikPattern } from './SundaOrnaments';

const StorySection = ({ story, couple }) => {
  return (
    <section id="story" className="py-20 px-6 bg-white relative overflow-hidden">
      {/* Batik Pattern Background */}
      <SundaBatikPattern />
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <SundaDivider className="mb-6" />
          <h2 className="font-serif text-5xl md:text-6xl text-gray-800 mb-4">{story.title}</h2>
        </div>

        {/* Story content */}
        <div className="bg-gradient-to-br from-amber-50 to-rose-50 rounded-3xl p-12 md:p-16 shadow-xl relative overflow-hidden">
          {/* Sunda Corner Ornaments */}
          <SundaCornerOrnament position="top-left" className="opacity-30" />
          <SundaCornerOrnament position="top-right" className="opacity-30" />
          <SundaCornerOrnament position="bottom-left" className="opacity-30" />
          <SundaCornerOrnament position="bottom-right" className="opacity-30" />
          
          <div className="relative z-10">
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-light text-center">
              {story.content}
            </p>
            
            {/* Couple initials */}
            <div className="mt-12 flex justify-center items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center">
                <span className="font-serif text-2xl text-amber-600">{couple.bride[0]}</span>
              </div>
              <Heart className="w-6 h-6 text-rose-500 fill-rose-500 animate-pulse" />
              <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center">
                <span className="font-serif text-2xl text-amber-600">{couple.groom[0]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
