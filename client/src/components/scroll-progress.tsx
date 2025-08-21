"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener("scroll", updateScrollProgress);
    updateScrollProgress();

    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return (
    <>
      {/* Main Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 w-full h-1 z-50 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 shadow-lg"
        style={{
          scaleX,
          transformOrigin: "left",
        }}
        initial={{ scaleX: 0 }}
        data-testid="scroll-progress"
      />
      
      {/* Side Progress Indicator */}
      <motion.div
        className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: scrollProgress > 0.05 ? 1 : 0, x: scrollProgress > 0.05 ? 0 : 20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative">
          <div className="w-1 h-32 bg-slate-700/50 rounded-full">
            <motion.div
              className="w-full bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"
              style={{
                height: `${scrollProgress * 100}%`,
              }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <motion.div
            className="absolute -right-3 bg-slate-800/90 backdrop-blur-sm border border-slate-600/50 rounded-lg px-2 py-1 text-xs text-slate-300 font-mono"
            style={{
              top: `${Math.max(0, Math.min(88, scrollProgress * 88))}%`,
            }}
            transition={{ duration: 0.1 }}
          >
            {Math.round(scrollProgress * 100)}%
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
