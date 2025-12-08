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
      <div className="fixed bottom-6 right-6 z-50 flex gap-2">
        {/* Mute/Unmute Button */}
        <button
          onClick={toggleMute}
          className={`p-2.5 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
            isMuted 
              ? 'bg-gray-400 hover:bg-gray-500' 
              : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
          }`}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-white" />
          ) : (
            <Volume2 className="w-5 h-5 text-white" />
          )}
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className={`p-2.5 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
            isPlaying 
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700' 
              : 'bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600'
          }`}
          aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
        >
          {isPlaying ? (
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>

      {/* Animated music note indicator */}
      {isPlaying && !isMuted && (
        <div className="fixed bottom-6 left-6 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-full shadow-lg">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          </div>
        </div>
      )}
    </>
  );
};

export default MusicPlayer;
