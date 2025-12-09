import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import CoverPage from '../components/CoverPage';
import HeroSection from '../components/HeroSection';
import StorySection from '../components/StorySection';
import BrideGroom from '../components/BrideGroom';
import EventTimeline from '../components/EventTimeline';
import Gallery from '../components/Gallery';
import RsvpForm from '../components/RsvpForm';
import LocationSection from '../components/LocationSection';
import GuestBook from '../components/GuestBook';
import GuestManager from '../components/GuestManager';
import MusicPlayer from '../components/MusicPlayer';
import { Toaster } from '../components/ui/sonner';
import { weddingData } from '../mock';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isInvitationOpened, setIsInvitationOpened] = useState(false);
  const [guestName, setGuestName] = useState('Tamu Undangan');
  const [isAdminMode, setIsAdminMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get guest name and admin mode from URL parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const guestParam = urlParams.get('to');
    const adminParam = urlParams.get('admin');
    
    if (guestParam) {
      // Decode URL-encoded name and replace underscores with spaces
      const decodedName = decodeURIComponent(guestParam).replace(/_/g, ' ');
      setGuestName(decodedName);
    }

    if (adminParam === 'true') {
      setIsAdminMode(true);
    }
  }, []);

  const handleOpenInvitation = () => {
    setIsInvitationOpened(true);
  };

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Our Story', href: '#story' },
    { label: 'Bride & Groom', href: '#bride-groom' },
    { label: 'Events', href: '#events' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Gift', href: '#rsvp' },
    { label: 'Guest Book', href: '#guestbook' },
    { label: 'Thank You', href: '#location' }
  ];

  const handleNavClick = (href) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      {isAdminMode ? (
        /* Admin Mode - Guest Manager */
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
          <GuestManager />
        </div>
      ) : (
        <>
          {/* Cover Page */}
          {!isInvitationOpened && (
            <CoverPage 
              couple={weddingData.couple} 
              onOpen={handleOpenInvitation}
              guestName={guestName}
            />
          )}

          {/* Navigation - Desktop Top Bar */}
          <nav className={`hidden md:block fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
            isScrolled 
              ? 'bg-white/95 backdrop-blur-md shadow-lg' 
              : 'bg-transparent'
          }`}>
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                {/* Logo/Brand */}
                <a
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#home');
                  }}
                  className="font-serif text-2xl md:text-3xl text-gray-800 hover:text-blue-600 transition-colors duration-300"
                >
                  {weddingData.couple.bride} & {weddingData.couple.groom}
                </a>

                {/* Desktop Navigation */}
                <div className="flex items-center gap-8">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                      className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Navigation - Mobile Bottom Bar */}
          {isInvitationOpened && (
            <nav className="fixed bottom-0 left-0 right-0 md:hidden z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl">
              <div className="grid grid-cols-4 gap-1 px-2 py-2">
                {navItems.slice(0, 4).map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className="px-2 py-2 text-xs text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded font-medium transition-colors duration-200 text-center"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </nav>
          )}

          {/* Main Content */}
          <main className="pb-20 md:pb-0">
            <HeroSection couple={weddingData.couple} wedding={weddingData.wedding} />
            <StorySection story={weddingData.story} couple={weddingData.couple} />
            <BrideGroom couple={weddingData.couple} />
            <EventTimeline events={weddingData.events} />
            <Gallery gallery={weddingData.gallery} />
            <RsvpForm />
            <GuestBook />
            <LocationSection couple={weddingData.couple} />
          </main>

          {/* Music Player */}
          {isInvitationOpened && <MusicPlayer autoPlay={true} />}

          {/* Toast notifications */}
          <Toaster />
        </>
      )}
    </div>
  );
};

export default Home;
