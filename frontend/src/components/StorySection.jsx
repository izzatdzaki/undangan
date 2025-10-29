import React from 'react';
import { Heart } from 'lucide-react';

const StorySection = ({ story, couple }) => {
  return (
    <section id="story" className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-400"></div>
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-400"></div>
          </div>
          <h2 className="font-serif text-5xl md:text-6xl text-gray-800 mb-4">{story.title}</h2>
        </div>

        {/* Story content */}
        <div className="bg-gradient-to-br from-amber-50 to-rose-50 rounded-3xl p-12 md:p-16 shadow-xl relative overflow-hidden">
          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-200/30 to-transparent rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-rose-200/30 to-transparent rounded-tr-full"></div>
          
          <div className="relative">
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
