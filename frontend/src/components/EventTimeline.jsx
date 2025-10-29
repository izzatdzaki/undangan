import React from 'react';
import { Clock, MapPin } from 'lucide-react';

const EventTimeline = ({ events }) => {
  return (
    <section id="events" className="py-20 px-6 bg-gradient-to-br from-rose-50 via-white to-amber-50">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl md:text-6xl text-gray-800 mb-4">Wedding Day</h2>
          <p className="text-lg text-gray-600 font-light">The celebration timeline</p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-amber-300 via-rose-300 to-amber-300"></div>

          {/* Events */}
          <div className="space-y-12">
            {events.map((event, index) => (
              <div key={event.id} className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Content */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-amber-100">
                    <h3 className="font-serif text-3xl text-gray-800 mb-3">{event.title}</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-amber-600 justify-start md:justify-end">
                        <Clock className="w-4 h-4" />
                        <span className="font-medium">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 justify-start md:justify-end">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{event.description}</p>
                  </div>
                </div>

                {/* Timeline dot */}
                <div className="relative flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-rose-400 shadow-lg ring-4 ring-white"></div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventTimeline;
