import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import StorySection from '../components/StorySection';
import EventTimeline from '../components/EventTimeline';
import Gallery from '../components/Gallery';
import RsvpForm from '../components/RsvpForm';
import LocationSection from '../components/LocationSection';
import Footer from '../components/Footer';
import { Toaster } from '../components/ui/sonner';
import { weddingData } from '../mock';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Our Story', href: '#story' },
    { label: 'Events', href: '#events' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'RSVP', href: '#rsvp' },
    { label: 'Location', href: '#location' }
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
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
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
              className="font-serif text-2xl md:text-3xl text-gray-800 hover:text-amber-600 transition-colors duration-300"
            >
              {weddingData.couple.bride} & {weddingData.couple.groom}
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="text-gray-700 hover:text-amber-600 font-medium transition-colors duration-300"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-800 hover:text-amber-600 transition-colors duration-300"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3 animate-in fade-in slide-in-from-top-5 duration-300">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="block text-gray-700 hover:text-amber-600 font-medium py-2 transition-colors duration-300"
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <HeroSection couple={weddingData.couple} wedding={weddingData.wedding} />
        <StorySection story={weddingData.story} couple={weddingData.couple} />
        <EventTimeline events={weddingData.events} />
        <Gallery gallery={weddingData.gallery} />
        <RsvpForm />
        <LocationSection venue={weddingData.wedding.venue} />
      </main>

      {/* Footer */}
      <Footer couple={weddingData.couple} wedding={weddingData.wedding} />

      {/* Toast notifications */}
      <Toaster />
    </div>
  );
};

export default Home;
