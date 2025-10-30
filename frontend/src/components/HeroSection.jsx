import React, { useEffect, useState } from 'react';

const HeroSection = ({ couple, wedding }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [countdownStatus, setCountdownStatus] = useState('counting'); // 'counting', 'finished', 'error'

  useEffect(() => {
    setIsVisible(true);

    // Calculate countdown
    const calculateTimeLeft = () => {
      try {
        // Parse wedding date more reliably
        const dateStr = wedding.date; // "December 27th, 2025"
        const timeStr = wedding.time; // "9:00 AM"

        // Convert to proper date format
        const dateParts = dateStr.replace(/th|st|nd|rd/g, '').split(' ');
        const monthNames = {
          'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
          'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
        };

        const month = monthNames[dateParts[0]];
        const day = parseInt(dateParts[1]);
        const year = parseInt(dateParts[2]);

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
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/foto/20251026_223444317.jpg')`,
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
        <div className="mb-12">
          <p className="text-xl md:text-2xl text-white font-medium tracking-wider">
            {wedding.date}
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="mb-12">
          <div className="grid grid-cols-4 gap-3 md:gap-4 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-4 md:px-6 md:py-5 border border-white/20">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1">
                {timeLeft.days}
              </div>
              <div className="text-sm md:text-base text-white/90 font-medium">
                Days
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-4 md:px-6 md:py-5 border border-white/20">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1">
                {timeLeft.hours}
              </div>
              <div className="text-sm md:text-base text-white/90 font-medium">
                Hours
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-4 md:px-6 md:py-5 border border-white/20">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1">
                {timeLeft.minutes}
              </div>
              <div className="text-sm md:text-base text-white/90 font-medium">
                Minutes
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-4 md:px-6 md:py-5 border border-white/20">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1">
                {timeLeft.seconds}
              </div>
              <div className="text-sm md:text-base text-white/90 font-medium">
                Seconds
              </div>
            </div>
          </div>

          {/* Countdown Status */}
          <div className="mt-6">
            {countdownStatus === 'counting' && (
              <p className="text-lg md:text-xl text-white/90 font-light">
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
