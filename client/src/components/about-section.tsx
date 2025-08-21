"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import profileImage from "@assets/IMG_20250821_211217_1755792370973.png";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 80,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.0,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  };

  return (
    <section id="about" className="py-24 bg-slate-900/50" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            data-testid="about-content"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="about-title">
                About <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Me</span>
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed" data-testid="about-description">
                I'm Jignesh D. Maru, a passionate web developer from Vadodara with a strong foundation in modern web technologies. 
                Currently pursuing my career in web development with hands-on experience in creating responsive, user-friendly applications.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-slate-400 leading-relaxed" data-testid="about-additional-info">
                With a Diploma in Computer Application and ITI certification, I bring both theoretical knowledge and practical skills to every project. 
                I love exploring new technologies and creating solutions that make a difference.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <div className="grid grid-cols-2 gap-6">
                <motion.div 
                  whileHover={{ 
                    scale: 1.08, 
                    y: -8,
                    rotateY: 5,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 hover:border-blue-500/70 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 group cursor-pointer relative overflow-hidden" data-testid="stat-experience">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <motion.h3 
                      className="text-3xl font-bold text-blue-400 mb-2 relative z-10"
                      whileHover={{ scale: 1.15, rotate: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      2+
                    </motion.h3>
                    <p className="text-slate-300 group-hover:text-slate-100 transition-colors duration-300 relative z-10 font-medium">Months Experience</p>
                    <motion.div
                      className="absolute top-0 right-0 w-8 h-8 bg-blue-400/20 rounded-full opacity-0 group-hover:opacity-100"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
                <motion.div 
                  whileHover={{ 
                    scale: 1.08, 
                    y: -8,
                    rotateY: -5,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 hover:border-purple-500/70 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 group cursor-pointer relative overflow-hidden" data-testid="stat-projects">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <motion.h3 
                      className="text-3xl font-bold text-purple-400 mb-2 relative z-10"
                      whileHover={{ scale: 1.15, rotate: -3 }}
                      transition={{ duration: 0.2 }}
                    >
                      15+
                    </motion.h3>
                    <p className="text-slate-300 group-hover:text-slate-100 transition-colors duration-300 relative z-10 font-medium">Projects Completed</p>
                    <motion.div
                      className="absolute top-0 right-0 w-8 h-8 bg-purple-400/20 rounded-full opacity-0 group-hover:opacity-100"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8">
              <h3 className="text-xl font-semibold mb-6 text-slate-200" data-testid="languages-title">Languages I Speak</h3>
              <div className="flex flex-wrap gap-3" data-testid="languages-list">
                {[
                  { name: "Gujarati (Fluent)", color: "hover:bg-blue-600/20 hover:border-blue-500/50" },
                  { name: "Hindi (Fluent)", color: "hover:bg-green-600/20 hover:border-green-500/50" },
                  { name: "English (Conversational)", color: "hover:bg-purple-600/20 hover:border-purple-500/50" },
                  { name: "Urdu (Basic)", color: "hover:bg-orange-600/20 hover:border-orange-500/50" }
                ].map((language, index) => (
                  <motion.span
                    key={language.name}
                    className={`px-4 py-2 bg-slate-800/70 border border-slate-700/50 rounded-full text-sm text-slate-300 transition-all duration-300 cursor-default ${language.color}`}
                    whileHover={{ 
                      scale: 1.05,
                      y: -2
                    }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {language.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: 10 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                scale: 1,
                rotateY: 0,
                transition: {
                  duration: 1.2,
                  delay: 0.6,
                  ease: [0.25, 0.25, 0, 1],
                },
              },
            }}
            whileHover={{ 
              scale: 1.02,
              rotateY: -2,
              transition: { duration: 0.3 }
            }}
            data-testid="about-image"
          >
            <div className="relative group">
              {/* Background overlay for better contrast */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-3xl blur-xl opacity-60"></div>
              <div className="absolute -inset-2 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/30"></div>
              
              <motion.img 
                src={profileImage} 
                alt="Jignesh D. Maru - Professional portrait" 
                className="relative rounded-2xl shadow-2xl w-full h-auto transition-transform duration-300 group-hover:shadow-3xl object-cover border-2 border-slate-600/50"
                whileHover={{ 
                  boxShadow: "0 30px 60px -10px rgba(0, 0, 0, 0.5)",
                  scale: 1.02
                }}
              />
              
              {/* Enhanced hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-slate-900/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 ring-1 ring-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
