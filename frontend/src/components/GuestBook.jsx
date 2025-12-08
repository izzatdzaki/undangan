import React, { useState } from 'react';
import { Heart, User, Plus, Send, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { useToast } from '../hooks/use-toast';
import { SundaDivider, SundaBatikPattern } from './SundaOrnaments';

const GuestBook = () => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    message: ''
  });
  const messagesPerPage = 3;

  // Konfigurasi masa berlaku data (dalam hari)
  // Ubah nilai ini untuk mengatur berapa lama data disimpan
  // 0 = selamanya, 7 = 7 hari, 30 = 30 hari, dst
  const DATA_EXPIRATION_DAYS = 0; // 0 = permanent (selamanya)

  // Load guest messages from localStorage on mount
  const defaultMessages = [
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

  const [guestMessages, setGuestMessages] = useState(() => {
    try {
      const stored = localStorage.getItem('guestBookMessages');
      let messages = stored ? JSON.parse(stored) : defaultMessages;

      // Jika ada expiration date, filter pesan yang sudah expired
      if (DATA_EXPIRATION_DAYS > 0) {
        messages = messages.filter(msg => {
          // Pesan default tidak pernah expired
          const isDefaultMessage = defaultMessages.some(dm => dm.id === msg.id);
          if (isDefaultMessage) return true;

          // Check jika pesan user sudah melewati batas waktu
          const messageDate = new Date(msg.date);
          const expirationDate = new Date(messageDate.getTime() + (DATA_EXPIRATION_DAYS * 24 * 60 * 60 * 1000));
          return new Date() < expirationDate;
        });

        // Update localStorage dengan pesan yang tidak expired
        localStorage.setItem('guestBookMessages', JSON.stringify(messages));
      }

      return messages;
    } catch (error) {
      console.error('Error loading messages:', error);
      return defaultMessages;
    }
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.message.trim()) {
      toast({
        title: "Error",
        description: "Mohon lengkapi nama dan pesan Anda.",
        variant: "destructive",
      });
      return;
    }

    // Create new message object
    const newMessage = {
      id: Date.now(),
      name: formData.name,
      message: formData.message,
      avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSI4IiByPSI0IiBmaWxsPSIjOWNhM2FmIi8+CjxwYXRoIGQ9Ik0yMCAyMWE4IDggMCAwIDAtMTYtMCIgZmlsbD0iIzlhYTNmZiIvPgo8L3N2Zz4=',
      date: new Date().toISOString().split('T')[0]
    };

    // Add new message to the beginning
    const updatedMessages = [newMessage, ...guestMessages];
    setGuestMessages(updatedMessages);

    // Save to localStorage
    localStorage.setItem('guestBookMessages', JSON.stringify(updatedMessages));

    toast({
      title: "Pesan Terkirim! 🎉",
      description: "Terima kasih atas ucapan dan doa restu Anda.",
    });

    // Reset form
    setFormData({
      name: '',
      message: ''
    });
    setIsModalOpen(false);
  };

  const totalPages = Math.ceil(guestMessages.length / messagesPerPage);
  const startIndex = (currentPage - 1) * messagesPerPage;
  const currentMessages = guestMessages.slice(startIndex, startIndex + messagesPerPage);

  return (
    <section id="guestbook" className="py-20 px-6 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Batik Pattern Background */}
      <SundaBatikPattern />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <SundaDivider className="mb-6" />
          <div className="inline-flex items-center justify-center gap-3 mb-6">
            <Heart className="w-12 h-12 text-blue-500 fill-blue-500" />
          </div>
          <h2 className="font-serif text-5xl md:text-6xl text-gray-800 mb-4">Guest Book</h2>
          <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
            Share your wishes and blessings for our beautiful journey ahead
          </p>
        </div>

        {/* Messages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {currentMessages.map((message) => (
            <div key={message.id} className="bg-white rounded-2xl p-5 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-blue-200 flex-shrink-0">
                  <img
                    src={message.avatar}
                    alt={message.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSI4IiByPSI0IiBmaWxsPSIjOWNhM2FmIi8+CjxwYXRoIGQ9Ik0yMCAyMWE4IDggMCAwIDAtMTYtMCIgZmlsbD0iIzlhYTNmZiIvPgo8L3N2Zz4=';
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-800 truncate">{message.name}</h4>
                  <p className="text-xs text-gray-500">{message.date}</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed italic text-sm line-clamp-3">"{message.message}"</p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white rounded-lg shadow border border-blue-200 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
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
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 border-blue-200 hover:bg-blue-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-white rounded-lg shadow border border-blue-200 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
            >
              Next
            </button>
          </div>
        )}

        {/* Add Message Button */}
        <div className="text-center mt-12">
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                <Plus className="w-6 h-6 mr-2" />
                Tulis Ucapan
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-md mx-4 bg-white rounded-3xl border-0 shadow-2xl">
              <DialogHeader className="text-center pb-6">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center shadow-lg">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                </div>
                <DialogTitle className="font-serif text-2xl md:text-3xl text-gray-800">
                  Tulis Ucapan Anda
                </DialogTitle>
                <p className="text-gray-600 mt-2">
                  Bagikan doa dan harapan untuk Putri & Fajar
                </p>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border-gray-300 focus:border-blue-400 focus:ring-blue-400 rounded-xl"
                    placeholder="Masukkan nama Anda"
                  />
                </div>

                {/* Message Input */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Ucapan & Doa *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    className="border-gray-300 focus:border-blue-400 focus:ring-blue-400 rounded-xl min-h-32 resize-none"
                    placeholder="Tulis ucapan, doa, dan harapan untuk kedua mempelai..."
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-4 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Kirim Ucapan
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Divider Bottom */}
        <div className="mt-16">
          <SundaDivider />
        </div>
      </div>
    </section>
  );
};

export default GuestBook;