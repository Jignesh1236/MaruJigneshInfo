"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Github, Mail, Phone } from "lucide-react";
import { SiReact, SiJavascript, SiHtml5, SiCss3, SiNodedotjs, SiTailwindcss } from "react-icons/si";
import TypingAnimation from "./typing-animation";
import { useSoundEffects } from "../hooks/use-sound-effects";

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const { playHover, playClick } = useSoundEffects();
  
  // Parallax transforms based on scroll
  const textY = useTransform(scrollY, [0, 500], [0, -150]);
  const imageY = useTransform(scrollY, [0, 500], [0, -100]);
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleScrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Animated Background Blobs with Scroll Parallax */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ y: backgroundY }}
      >
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl"
          animate={{
            y: [0, 20, 0],
            scale: [1, 0.9, 1],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: -2,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: -4,
          }}
        />
      </motion.div>

      <motion.div 
        className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10"
        style={{ opacity }}
      >
        <motion.div 
          className="space-y-8"
          style={{ y: textY }}
        >
          {/* Hero Text with Enhanced Parallax */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.25, 0, 1] }}
            style={{
              transform: `translateY(${mousePosition.y * 0.01}px)`,
            }}
            data-testid="hero-title"
          >
            <h1 className="text-5xl lg:text-7xl font-black leading-tight">
              <TypingAnimation
                texts={["Web Developer", "Creative Designer", "Problem Solver", "Tech Enthusiast"]}
                className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent"
                speed={150}
                deleteSpeed={100}
                delayBetweenTexts={3000}
              />
            </h1>
            <h2 className="text-2xl lg:text-4xl font-light text-slate-300 mt-4">
              Building Digital Experiences
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.25, 0, 1] }}
            style={{
              transform: `translateY(${mousePosition.y * 0.02}px)`,
            }}
            data-testid="hero-description"
          >
            <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
              Passionate about creating modern web experiences with clean code and beautiful design. 
              Specializing in React, JavaScript, and creative problem-solving.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.25, 0.25, 0, 1] }}
            style={{
              transform: `translateY(${mousePosition.y * 0.03}px)`,
            }}
            data-testid="hero-buttons"
          >
            <motion.button
              onClick={() => {
                playClick();
                handleScrollToSection("#contact");
              }}
              onMouseEnter={playHover}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/25 relative overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.4), 0 10px 10px -5px rgba(59, 130, 246, 0.04)",
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              data-testid="button-get-in-touch"
            >
              <motion.span
                className="relative z-10"
                whileHover={{ scale: 1.05 }}
              >
                Get In Touch
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0"
                whileHover={{ opacity: 0.2 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
            <motion.button
              onClick={() => {
                playClick();
                handleScrollToSection("#about");
              }}
              onMouseEnter={playHover}
              className="border-2 border-slate-600 hover:border-blue-500 px-8 py-4 rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm hover:bg-blue-500/10 relative overflow-hidden group"
              whileHover={{ 
                scale: 1.05,
                borderColor: "#3B82F6",
                boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.1)",
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              data-testid="button-learn-more"
            >
              <motion.span
                className="relative z-10 group-hover:text-blue-300 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
              >
                Learn More
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>

          <motion.div
            className="flex space-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.0, ease: [0.25, 0.25, 0, 1] }}
            style={{
              transform: `translateY(${mousePosition.y * 0.04}px)`,
            }}
            data-testid="hero-social-links"
          >
            <motion.a
              href="https://github.com/Jignesh1236"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-400 transition-colors duration-300 p-3 rounded-xl hover:bg-blue-500/10 border border-transparent hover:border-blue-500/30 group relative overflow-hidden"
              whileHover={{ 
                scale: 1.15,
                rotate: 5,
                y: -3,
                boxShadow: "0 10px 20px -5px rgba(59, 130, 246, 0.3)"
              }}
              whileTap={{ scale: 0.9 }}
              data-testid="link-github"
            >
              <Github size={24} className="relative z-10 group-hover:scale-110 transition-transform duration-300" />
              <motion.div
                className="absolute inset-0 bg-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            <motion.a
              href="mailto:jigneshmaru690@gmail.com"
              className="text-slate-400 hover:text-purple-400 transition-colors duration-300 p-3 rounded-xl hover:bg-purple-500/10 border border-transparent hover:border-purple-500/30 group relative overflow-hidden"
              whileHover={{ 
                scale: 1.15,
                rotate: -5,
                y: -3,
                boxShadow: "0 10px 20px -5px rgba(168, 85, 247, 0.3)"
              }}
              whileTap={{ scale: 0.9 }}
              data-testid="link-email"
            >
              <Mail size={24} className="relative z-10 group-hover:scale-110 transition-transform duration-300" />
              <motion.div
                className="absolute inset-0 bg-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            
          </motion.div>
        </motion.div>

        {/* Hero Image with Enhanced Parallax */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.5, delay: 0.6, ease: [0.25, 0.25, 0, 1] }}
          style={{
            y: imageY,
            transform: `translateY(${mousePosition.y * -0.02}px)`,
          }}
          data-testid="hero-image-container"
        >
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.img 
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Developer workspace with modern coding setup" 
              className="rounded-2xl shadow-2xl w-full h-auto object-cover"
              whileHover={{ 
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
                scale: 1.02,
                rotate: 1
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent rounded-2xl" />
          </motion.div>

          {/* Enhanced Floating Tech Icons */}
          <motion.div
            className="absolute -top-6 -left-6 bg-slate-800/80 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-slate-700/50"
            animate={{ 
              y: [0, -12, 0],
              rotate: [0, 5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.1, rotate: 10 }}
            data-testid="floating-icon-react"
          >
            <SiReact className="w-6 h-6 text-cyan-400" />
          </motion.div>
          
          <motion.div
            className="absolute -bottom-6 -right-6 bg-slate-800/80 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-slate-700/50"
            animate={{ 
              y: [0, 12, 0],
              rotate: [0, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: -1 }}
            whileHover={{ scale: 1.1, rotate: -10 }}
            data-testid="floating-icon-js"
          >
            <SiJavascript className="w-6 h-6 text-yellow-400" />
          </motion.div>
          
          <motion.div
            className="absolute top-1/2 -right-4 bg-slate-800/80 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-slate-700/50"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 8, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: -2 }}
            whileHover={{ scale: 1.15, rotate: 15 }}
            data-testid="floating-icon-html"
          >
            <SiHtml5 className="w-5 h-5 text-orange-500" />
          </motion.div>
          
          <motion.div
            className="absolute top-1/4 -right-8 bg-slate-800/80 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-slate-700/50"
            animate={{ 
              y: [0, 8, 0],
              rotate: [0, -6, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: -3 }}
            whileHover={{ scale: 1.15, rotate: -12 }}
            data-testid="floating-icon-css"
          >
            <SiCss3 className="w-5 h-5 text-blue-400" />
          </motion.div>
          
          <motion.div
            className="absolute bottom-1/4 -left-8 bg-slate-800/80 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-slate-700/50"
            animate={{ 
              y: [0, -8, 0],
              rotate: [0, 7, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: -1.5 }}
            whileHover={{ scale: 1.15, rotate: 14 }}
            data-testid="floating-icon-node"
          >
            <SiNodedotjs className="w-5 h-5 text-green-500" />
          </motion.div>
          
          <motion.div
            className="absolute top-3/4 left-1/4 bg-slate-800/80 backdrop-blur-sm p-2 rounded-xl shadow-lg border border-slate-700/50"
            animate={{ 
              y: [0, 6, 0],
              rotate: [0, -4, 0],
              scale: [1, 1.08, 1]
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: -0.5 }}
            whileHover={{ scale: 1.2, rotate: -8 }}
            data-testid="floating-icon-tailwind"
          >
            <SiTailwindcss className="w-4 h-4 text-cyan-300" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        animate={{ 
          y: [0, 12, 0],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.2 }}
        onClick={() => handleScrollToSection("#about")}
        data-testid="scroll-indicator"
      >
        <motion.div
          className="flex flex-col items-center space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <span className="text-slate-400 text-sm font-medium">Scroll Down</span>
          <ChevronDown className="text-slate-400 text-xl" />
        </motion.div>
      </motion.div>
    </section>
  );
}
