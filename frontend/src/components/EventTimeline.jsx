import React from 'react';
import { Clock, MapPin, Heart, Navigation } from 'lucide-react';
import { SundaDivider, SundaBatikPattern, SundaFlowerOrnament } from './SundaOrnaments';

const EventTimeline = ({ events }) => {
  // Filter hanya untuk Akad dan Resepsi
  const akad = events.find(e => e.title.toLowerCase().includes('akad') || e.title.toLowerCase().includes('ceremony'));
  const resepsi = events.find(e => e.title.toLowerCase().includes('resepsi') || e.title.toLowerCase().includes('reception'));

  return (
    <section id="events" className="py-20 px-6 bg-gradient-to-br from-amber-50 via-white to-rose-50 relative overflow-hidden">
      {/* Batik Pattern Background */}
      <SundaBatikPattern />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <SundaDivider className="mb-6" />
          <h2 className="font-serif text-5xl md:text-6xl text-gray-800 mb-4">Wedding Day</h2>
          <p className="text-lg text-gray-600 font-light">Join us in celebrating our special day</p>
        </div>

        {/* Events Grid - Kiri Kanan */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
          {/* Akad Nikah - Kiri */}
          {akad && (
            <div className="relative">
              {/* Flower Ornament */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <SundaFlowerOrnament className="w-16 h-16 opacity-50" />
              </div>
              
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-amber-200 relative overflow-hidden">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-amber-100 to-transparent rounded-bl-full opacity-50"></div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                    <Heart className="w-8 h-8 text-white fill-white" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-serif text-3xl md:text-4xl text-gray-800 mb-6 text-center">
                    {akad.title}
                  </h3>
                  
                  {/* Details */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-center gap-3 text-amber-700">
                      <Clock className="w-5 h-5" />
                      <span className="font-semibold text-lg">{akad.time}</span>
                    </div>
                    <div className="flex items-start justify-center gap-3 text-gray-700">
                      <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span className="text-center">{akad.location}</span>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-center leading-relaxed mb-6">
                    {akad.description}
                  </p>
                  
                  {/* Google Maps Button */}
                  <div className="flex justify-center">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(akad.location)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
                    >
                      <Navigation className="w-5 h-5" />
                      <span>Google Maps</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Resepsi - Kanan */}
          {resepsi && (
            <div className="relative">
              {/* Flower Ornament */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <SundaFlowerOrnament className="w-16 h-16 opacity-50" />
              </div>
              
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-rose-200 relative overflow-hidden">
                {/* Decorative corner */}
                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-rose-100 to-transparent rounded-br-full opacity-50"></div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-rose-400 to-rose-600 rounded-full flex items-center justify-center shadow-lg">
                    <Heart className="w-8 h-8 text-white fill-white" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-serif text-3xl md:text-4xl text-gray-800 mb-6 text-center">
                    {resepsi.title}
                  </h3>
                  
                  {/* Details */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-center gap-3 text-rose-700">
                      <Clock className="w-5 h-5" />
                      <span className="font-semibold text-lg">{resepsi.time}</span>
                    </div>
                    <div className="flex items-start justify-center gap-3 text-gray-700">
                      <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span className="text-center">{resepsi.location}</span>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-center leading-relaxed mb-6">
                    {resepsi.description}
                  </p>
                  
                  {/* Google Maps Button */}
                  <div className="flex justify-center">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(resepsi.location)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
                    >
                      <Navigation className="w-5 h-5" />
                      <span>Google Maps</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Divider Bottom */}
        <div className="mt-16">
          <SundaDivider />
        </div>
      </div>
    </section>
  );
};

export default EventTimeline;
