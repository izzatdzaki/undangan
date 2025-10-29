import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const MusicPlayer = ({ autoPlay = true }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      // Try to autoplay when component mounts
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(error => {
            // Autoplay was prevented, user needs to click to play
            console.log('Autoplay prevented:', error);
            setIsPlaying(false);
          });
      }
    }
  }, [autoPlay]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      {/* Audio element */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        <source src="/backgroundmusic.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Floating music control button */}
      <div className="fixed bottom-8 right-8 z-50 flex gap-3">
        {/* Mute/Unmute Button */}
        <button
          onClick={toggleMute}
          className={`p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 ${
            isMuted 
              ? 'bg-gray-400 hover:bg-gray-500' 
              : 'bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600'
          }`}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <VolumeX className="w-6 h-6 text-white" />
          ) : (
            <Volume2 className="w-6 h-6 text-white" />
          )}
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className={`p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 ${
            isPlaying 
              ? 'bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600' 
              : 'bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600'
          }`}
          aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
        >
          {isPlaying ? (
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>

      {/* Animated music note indicator */}
      {isPlaying && !isMuted && (
        <div className="fixed bottom-8 left-8 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-amber-500 to-rose-500 p-3 rounded-full shadow-2xl">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          </div>
        </div>
      )}
    </>
  );
};

export default MusicPlayer;
