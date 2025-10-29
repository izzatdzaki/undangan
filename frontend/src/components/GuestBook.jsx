import React, { useState } from 'react';
import { Heart, User } from 'lucide-react';

const GuestBook = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 3;

  const guestMessages = [
    {
      id: 1,
      name: "Citra Saraswati",
      message: "Barakallah untuk pernikahan ini! Semoga kalian diberikan keturunan yang saleh dan keluarga yang harmonis. Bahagia selalu hingga akhir hayat.",
      avatar: "/foto/DSCF0087.jpg",
      date: "2025-10-25"
    },
    {
      id: 2,
      name: "Steven William",
      message: "This marriage is a beautiful blessing. May love and prayers accompany your steps forward. Keep loving and appreciating each other.",
      avatar: "/foto/DSCF0107.jpg",
      date: "2025-10-24"
    },
    {
      id: 3,
      name: "Arzi Firmadi",
      message: "Happy starting a new chapter of life! May your household always be surrounded by love, laughter and happiness. Best wishes for our long journey together.",
      avatar: "/foto/DSCF0111.jpg",
      date: "2025-10-23"
    },
    {
      id: 4,
      name: "Maya Sari",
      message: "Congratulations on your beautiful wedding! May your love story continue to inspire others and may you always find joy in each other's company.",
      avatar: "/foto/20251026_214415008.jpg",
      date: "2025-10-22"
    },
    {
      id: 5,
      name: "Rizky Pratama",
      message: "Semoga rumah tangga kalian penuh dengan kebahagiaan, kasih sayang, dan keberkahan. Selamat menempuh hidup baru!",
      avatar: "/foto/20251026_215444301.jpg",
      date: "2025-10-21"
    },
    {
      id: 6,
      name: "Diana Putri",
      message: "Your wedding is absolutely stunning! Wishing you both a lifetime of love, laughter, and happily ever after.",
      avatar: "/foto/20251026_220704211.jpg",
      date: "2025-10-20"
    }
  ];

  const totalPages = Math.ceil(guestMessages.length / messagesPerPage);
  const startIndex = (currentPage - 1) * messagesPerPage;
  const currentMessages = guestMessages.slice(startIndex, startIndex + messagesPerPage);

  return (
    <section id="guestbook" className="py-20 px-6 bg-gradient-to-br from-slate-50 via-white to-rose-50">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-400"></div>
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-400"></div>
          </div>
          <h2 className="font-serif text-5xl md:text-6xl text-gray-800 mb-4">Guest Book</h2>
          <p className="text-lg text-gray-600 font-light">Share your wishes and blessings</p>
        </div>

        {/* Messages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentMessages.map((message) => (
            <div key={message.id} className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-200">
                  <img
                    src={message.avatar}
                    alt={message.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSI4IiByPSI0IiBmaWxsPSIjOWNhM2FmIi8+CjxwYXRoIGQ9Ik0yMCAyMWE4IDggMCAwIDAtMTYtMCIgZmlsbD0iIzlhYTNmZiIvPgo8L3N2Zz4=';
                    }}
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{message.name}</h4>
                  <p className="text-sm text-gray-500">{message.date}</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed italic">"{message.message}"</p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white rounded-lg shadow border border-amber-200 hover:bg-amber-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
            >
              Previous
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded-lg border transition-colors duration-300 ${
                    currentPage === page
                      ? 'bg-amber-500 text-white border-amber-500'
                      : 'bg-white text-gray-700 border-amber-200 hover:bg-amber-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-white rounded-lg shadow border border-amber-200 hover:bg-amber-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
            >
              Next
            </button>
          </div>
        )}

        {/* Add Message Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <Heart className="w-5 h-5" />
            Add Your Message
          </button>
        </div>
      </div>
    </section>
  );
};

export default GuestBook;