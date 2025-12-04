import React, { useEffect, useState } from 'react';

const HeroSection = ({ couple, wedding }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [countdownStatus, setCountdownStatus] = useState('counting'); // 'counting', 'finished', 'error'

  // Preload image
  useEffect(() => {
    const img = new Image();
    img.src = '/foto/20251026_223444317.jpg';
    img.onload = () => {
      setImageLoaded(true);
    };
    img.onerror = () => {
      // Fallback to black background if image fails to load
      setImageLoaded(true);
    };
  }, []);

  useEffect(() => {
    setIsVisible(true);

    // Calculate countdown
    const calculateTimeLeft = () => {
      try {
        // Parse wedding date more reliably
        const dateStr = wedding.date; // "Minggu, 21 Desember 2025"
        const timeStr = wedding.time; // "9:00 AM"

        // Convert Indonesian date format to English format
        const monthNamesIndo = {
          'Januari': 'January', 'Februari': 'February', 'Maret': 'March', 'April': 'April', 'Mei': 'May', 'Juni': 'June',
          'Juli': 'July', 'Agustus': 'August', 'September': 'September', 'Oktober': 'October', 'November': 'November', 'Desember': 'December'
        };

        // Extract day and month from format "Minggu, 21 Desember 2025"
        const parts = dateStr.split(', ');
        const dateInfo = parts[1]; // "21 Desember 2025"
        const dateParts = dateInfo.split(' ');
        
        const day = parseInt(dateParts[0]);
        const monthIndo = dateParts[1];
        const year = parseInt(dateParts[2]);
        const monthEnglish = monthNamesIndo[monthIndo] || monthIndo;

        const monthNames = {
          'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
          'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
        };

        const month = monthNames[monthEnglish];

        // Parse time
        const timeParts = timeStr.split(' ');
        const timeNumbers = timeParts[0].split(':');
        let hours = parseInt(timeNumbers[0]);
        const minutes = parseInt(timeNumbers[1]);

        // Convert to 24-hour format
        if (timeParts[1] === 'PM' && hours !== 12) {
          hours += 12;
        } else if (timeParts[1] === 'AM' && hours === 12) {
          hours = 0;
        }

        const weddingDate = new Date(year, month, day, hours, minutes, 0, 0);
        const now = new Date();
        const difference = weddingDate - now;

        if (difference > 0) {
          setTimeLeft({
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
          });
          setCountdownStatus('counting');
        } else {
          // Wedding has passed
          setTimeLeft({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
          });
          setCountdownStatus('finished');
        }
      } catch (error) {
        console.error('Error calculating countdown:', error);
        setCountdownStatus('error');
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [wedding.date, wedding.time]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Skeleton/Placeholder Background */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse"></div>
      )}
      
      {/* Background Image */}
      <div 
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: `url('/foto/20251026_223444317.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className={`relative z-10 text-center px-6 max-w-4xl mx-auto transition-all duration-1500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Wedding Announcement */}
        <div className="mb-8">
          <p className="text-xl md:text-2xl text-white font-light mb-6 tracking-widest">
            The Wedding of
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight">
            {couple.bride}
            <span className="block text-4xl md:text-5xl lg:text-6xl my-4">
              &
            </span>
            {couple.groom}
          </h1>
        </div>

        {/* Wedding Date */}
        <div className="mb-8">
          <p className="text-xl md:text-2xl text-white font-medium tracking-wider">
            {wedding.date}
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="mb-20">
          <div className="grid grid-cols-4 gap-2 md:gap-3 max-w-xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-lg px-2 py-3 md:px-4 md:py-4 border border-white/20">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1">
                {timeLeft.days}
              </div>
              <div className="text-xs md:text-sm text-white/90 font-medium">
                Days
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg px-2 py-3 md:px-4 md:py-4 border border-white/20">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1">
                {timeLeft.hours}
              </div>
              <div className="text-xs md:text-sm text-white/90 font-medium">
                Hours
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg px-2 py-3 md:px-4 md:py-4 border border-white/20">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1">
                {timeLeft.minutes}
              </div>
              <div className="text-xs md:text-sm text-white/90 font-medium">
                Minutes
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg px-2 py-3 md:px-4 md:py-4 border border-white/20">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1">
                {timeLeft.seconds}
              </div>
              <div className="text-xs md:text-sm text-white/90 font-medium">
                Seconds
              </div>
            </div>
          </div>

          {/* Countdown Status */}
          <div className="mt-4">
            {countdownStatus === 'counting' && (
              <p className="text-base md:text-lg text-white/80 font-light">
                Until our special day
              </p>
            )}
            {countdownStatus === 'finished' && (
              <p className="text-lg md:text-xl text-amber-300 font-medium">
                🎉 Our wedding day has arrived! 🎉
              </p>
            )}
            {countdownStatus === 'error' && (
              <p className="text-lg md:text-xl text-red-300 font-medium">
                Unable to calculate countdown
              </p>
            )}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="animate-bounce mt-16">
          <div className="w-6 h-10 border-2 border-white/60 rounded-full mx-auto flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
