import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { Button } from './ui/button';

const LocationSection = ({ venue }) => {
  const handleDirections = () => {
    const address = encodeURIComponent(venue.address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
  };

  return (
    <section id="location" className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl md:text-6xl text-gray-800 mb-4">Location</h2>
          <p className="text-lg text-gray-600 font-light">Where we'll celebrate</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Venue details */}
          <div className="bg-gradient-to-br from-amber-50 to-rose-50 rounded-3xl p-8 md:p-10 shadow-xl">
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-3xl text-gray-800 mb-4">{venue.name}</h3>
                <div className="flex items-start gap-3 text-gray-600 mb-6">
                  <MapPin className="w-5 h-5 mt-1 text-amber-600" />
                  <p className="leading-relaxed">{venue.address}</p>
                </div>
              </div>

              <div className="space-y-4 border-t border-amber-200 pt-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Ceremony</h4>
                  <p className="text-gray-600">{venue.ceremony}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Reception</h4>
                  <p className="text-gray-600">{venue.reception}</p>
                </div>
              </div>

              <Button
                onClick={handleDirections}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mt-6"
              >
                <Navigation className="w-5 h-5 mr-2" />
                Get Directions
              </Button>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="bg-gray-100 rounded-3xl overflow-hidden shadow-xl h-96 md:h-auto relative group">
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-amber-100 to-rose-100">
              <div className="text-center p-8">
                <MapPin className="w-16 h-16 text-amber-600 mx-auto mb-4" />
                <p className="text-gray-700 font-medium mb-2">{venue.name}</p>
                <p className="text-sm text-gray-600">{venue.address}</p>
              </div>
            </div>
            {/* Decorative overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
