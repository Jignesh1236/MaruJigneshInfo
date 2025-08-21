import { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
// We'll create a simple 3D-like effect without Three.js for now

// CSS-based 3D floating cubes
function FloatingCubes() {
  const cubes = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 20 + Math.random() * 40,
      duration: 10 + Math.random() * 20,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {cubes.map((cube) => (
        <motion.div
          key={cube.id}
          className="absolute bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10"
          style={{
            left: `${cube.left}%`,
            top: `${cube.top}%`,
            width: cube.size,
            height: cube.size,
            transform: 'perspective(1000px) rotateX(45deg) rotateY(45deg)',
          }}
          animate={{
            y: [-20, 20, -20],
            rotateX: [0, 360, 0],
            rotateY: [0, 360, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: cube.duration,
            delay: cube.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// CSS-based animated sphere with particles
function AnimatedSphere() {
  const particles = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => ({
      id: i,
      angle: (i / 100) * Math.PI * 2,
      radius: 100 + Math.random() * 200,
      duration: 15 + Math.random() * 10,
      delay: Math.random() * 3,
    }));
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Central sphere */}
      <motion.div
        className="w-32 h-32 rounded-full border-2 border-blue-500/30 bg-gradient-to-r from-blue-500/10 to-purple-500/10"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Orbiting particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 bg-blue-400 rounded-full"
          style={{
            left: '50%',
            top: '50%',
          }}
          animate={{
            x: [
              Math.cos(particle.angle) * particle.radius,
              Math.cos(particle.angle + Math.PI) * particle.radius,
              Math.cos(particle.angle + Math.PI * 2) * particle.radius,
            ],
            y: [
              Math.sin(particle.angle) * particle.radius,
              Math.sin(particle.angle + Math.PI) * particle.radius,
              Math.sin(particle.angle + Math.PI * 2) * particle.radius,
            ],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

// CSS-based DNA Helix Animation
function DNAHelix() {
  const helixPoints = useMemo(() => {
    const points = [];
    const segments = 50;
    const height = 400;
    const radius = 80;

    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 4;
      const y = (i / segments) * height;
      
      points.push({
        id: i,
        x1: Math.cos(angle) * radius + 50,
        y1: y,
        x2: Math.cos(angle + Math.PI) * radius + 50,
        y2: y,
        delay: i * 0.1,
      });
    }
    return points;
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <motion.div
        className="relative"
        animate={{ rotateY: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {helixPoints.map((point) => (
          <div key={point.id}>
            {/* DNA base pairs */}
            <motion.div
              className="absolute w-3 h-3 bg-green-400 rounded-full"
              style={{
                left: point.x1,
                top: point.y1,
                transform: 'translateZ(50px)',
              }}
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                delay: point.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute w-3 h-3 bg-orange-400 rounded-full"
              style={{
                left: point.x2,
                top: point.y2,
                transform: 'translateZ(-50px)',
              }}
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                delay: point.delay + 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* Connection lines */}
            <div
              className="absolute h-0.5 bg-gradient-to-r from-green-400 to-orange-400 opacity-30"
              style={{
                left: Math.min(point.x1, point.x2),
                top: point.y1,
                width: Math.abs(point.x2 - point.x1),
                transform: 'translateZ(0px)',
              }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// Main 3D Scene Component
interface ThreeSceneProps {
  variant?: 'cubes' | 'sphere' | 'dna';
  className?: string;
}

export default function ThreeScene({ variant = 'cubes', className = '' }: ThreeSceneProps) {
  const SceneContent = () => {
    switch (variant) {
      case 'sphere':
        return <AnimatedSphere />;
      case 'dna':
        return <DNAHelix />;
      default:
        return <FloatingCubes />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={`relative w-full h-full ${className}`}
    >
      <SceneContent />
    </motion.div>
  );
}

// Utility component for easy integration
export function Background3D({ variant, className }: ThreeSceneProps) {
  return (
    <div className={`fixed inset-0 pointer-events-none z-0 ${className}`}>
      <ThreeScene variant={variant} />
    </div>
  );
}