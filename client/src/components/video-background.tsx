import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoBackgroundProps {
  src: string;
  fallbackImage?: string;
  className?: string;
  overlay?: boolean;
  controls?: boolean;
}

export default function VideoBackground({ 
  src, 
  fallbackImage, 
  className = "", 
  overlay = true, 
  controls = false 
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('loadeddata', () => setIsLoading(false));
      video.addEventListener('error', () => {
        setHasError(true);
        setIsLoading(false);
      });

      // Auto play with retry
      const playVideo = async () => {
        try {
          await video.play();
          setIsPlaying(true);
        } catch (error) {
          console.error('Auto-play failed:', error);
          setIsPlaying(false);
        }
      };

      if (video.readyState >= 2) {
        setIsLoading(false);
        playVideo();
      }
    }
  }, []);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (video) {
      try {
        if (isPlaying) {
          video.pause();
          setIsPlaying(false);
        } else {
          await video.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.error('Play/pause failed:', error);
      }
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  if (hasError && fallbackImage) {
    return (
      <div className={`relative ${className}`}>
        <img 
          src={fallbackImage} 
          alt="Background"
          className="w-full h-full object-cover"
        />
        {overlay && (
          <div className="absolute inset-0 bg-black/40" />
        )}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading State */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900 flex items-center justify-center z-10"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
              />
              <p className="text-white/70">Loading video...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        muted={isMuted}
        loop
        playsInline
        preload="metadata"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/50" />
      )}

      {/* Controls */}
      {controls && !isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-4 right-4 flex gap-2 z-20"
        >
          <Button
            variant="secondary"
            size="sm"
            onClick={togglePlay}
            className="bg-black/50 hover:bg-black/70 text-white border-white/20"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </Button>
          
          <Button
            variant="secondary"
            size="sm"
            onClick={toggleMute}
            className="bg-black/50 hover:bg-black/70 text-white border-white/20"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </Button>
        </motion.div>
      )}

      {/* Subtle Animated Overlay Patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          className="w-full h-full opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 2px, transparent 2px)`,
            backgroundSize: "100px 100px",
          }}
        />
      </div>
    </div>
  );
}

// Preset video backgrounds
export const VideoBackgrounds = {
  // Coding/Tech themed
  matrix: "/assets/videos/matrix-code.mp4",
  circuit: "/assets/videos/circuit-board.mp4",
  particles: "/assets/videos/tech-particles.mp4",
  
  // Abstract
  gradient: "/assets/videos/gradient-flow.mp4",
  waves: "/assets/videos/abstract-waves.mp4",
  
  // Space/Cosmic
  stars: "/assets/videos/starfield.mp4",
  nebula: "/assets/videos/nebula.mp4",
};