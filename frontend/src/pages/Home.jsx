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
import ExcelImporter from '../components/ExcelImporter';
import MusicPlayer from '../components/MusicPlayer';
import { Toaster } from '../components/ui/sonner';
import { weddingData } from '../mock';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isInvitationOpened, setIsInvitationOpened] = useState(false);
  const [guestName, setGuestName] = useState('Tamu Undangan');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isImporterMode, setIsImporterMode] = useState(false);

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
    // Support both 'to' and 'guest' parameters
    const guestParam = urlParams.get('to') || urlParams.get('guest');
    const adminParam = urlParams.get('admin');
    const importerParam = urlParams.get('importer');
    
    if (guestParam) {
      // Decode URL-encoded name and replace dashes/underscores with spaces
      const decodedName = decodeURIComponent(guestParam)
        .replace(/-/g, ' ')
        .replace(/_/g, ' ')
        .replace(/\s+/g, ' ') // Multiple spaces to single space
        .trim();
      
      setGuestName(decodedName);
    }

    if (adminParam === 'true') {
      setIsAdminMode(true);
    }

    if (importerParam === 'true') {
      setIsImporterMode(true);
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
      {isImporterMode ? (
        /* Importer Mode - Excel Importer */
        <ExcelImporter />
      ) : isAdminMode ? (
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

          {/* Main Content */}
          <main>
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
