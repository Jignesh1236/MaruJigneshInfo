"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Code, Palette, Briefcase, Settings, Bot, Brush } from "lucide-react";

const skills = [
  {
    icon: Code,
    title: "Web Development",
    description: "Database Management & Web Coding",
    technologies: [
      { name: "HTML", level: 85 },
      { name: "CSS", level: 80 },
      { name: "JavaScript", level: 75 }
    ],
    gradient: "from-blue-500 to-cyan-500",
    hoverColor: "hover:border-blue-500/50 hover:shadow-blue-500/10",
  },
  {
    icon: Palette,
    title: "Design Tools",
    description: "Creative Design & Video Editing",
    technologies: [
      { name: "Photoshop", level: 70 },
      { name: "Premiere Pro", level: 65 },
      { name: "Canva", level: 90 }
    ],
    gradient: "from-purple-500 to-pink-500",
    hoverColor: "hover:border-purple-500/50 hover:shadow-purple-500/10",
  },
  {
    icon: Briefcase,
    title: "Office Tools",
    description: "Data Management & Analysis",
    technologies: [
      { name: "MS Office", level: 85 },
      { name: "Excel", level: 80 },
      { name: "Tally", level: 70 }
    ],
    gradient: "from-green-500 to-emerald-500",
    hoverColor: "hover:border-green-500/50 hover:shadow-green-500/10",
  },
  {
    icon: Settings,
    title: "Technical Expertise",
    description: "System Management & Setup",
    technologies: [
      { name: "Windows", level: 90 },
      { name: "PC Assembly", level: 85 },
      { name: "OBS Studio", level: 75 }
    ],
    gradient: "from-orange-500 to-red-500",
    hoverColor: "hover:border-orange-500/50 hover:shadow-orange-500/10",
  },
  {
    icon: Bot,
    title: "AI & Development",
    description: "AI Models & Bot Development",
    technologies: [
      { name: "AI Tools", level: 70 },
      { name: "Shapes.inc API", level: 65 },
      { name: "Discord Bots", level: 60 }
    ],
    gradient: "from-cyan-500 to-blue-500",
    hoverColor: "hover:border-cyan-500/50 hover:shadow-cyan-500/10",
  },
  {
    icon: Brush,
    title: "Creative Skills",
    description: "Visual Content Creation",
    technologies: [
      { name: "Poster Design", level: 80 },
      { name: "Video Editing", level: 75 },
      { name: "Creative Design", level: 85 }
    ],
    gradient: "from-pink-500 to-purple-500",
    hoverColor: "hover:border-pink-500/50 hover:shadow-pink-500/10",
  },
];

export default function SkillsSection() {
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
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 80,
      scale: 0.8,
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
    <section id="skills" className="py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl lg:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6 },
              },
            }}
            data-testid="skills-title"
          >
            My <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Skills</span>
          </motion.h2>
          <motion.p
            className="text-lg text-slate-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, delay: 0.2 },
              },
            }}
            data-testid="skills-description"
          >
            Here are the technologies and tools I work with to bring ideas to life
          </motion.p>
        </div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          data-testid="skills-grid"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                y: -10,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              whileTap={{ scale: 0.95 }}
              data-testid={`skill-card-${index}`}
            >
              <div className={`bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 ${skill.hoverColor} transition-all duration-500 hover:shadow-2xl hover:shadow-slate-900/50 group backdrop-blur-sm`}>
                <motion.div
                  className={`w-16 h-16 bg-gradient-to-r ${skill.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}
                  whileHover={{ 
                    scale: 1.15,
                    rotate: 5,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)"
                  }}
                  data-testid={`skill-icon-${index}`}
                >
                  <skill.icon className="text-white text-2xl drop-shadow-md" size={24} />
                </motion.div>
                <motion.h3 
                  className="text-xl font-semibold mb-4 text-slate-200 group-hover:text-white transition-colors duration-300" 
                  data-testid={`skill-title-${index}`}
                  whileHover={{ x: 5 }}
                >
                  {skill.title}
                </motion.h3>
                <div className="space-y-4">
                  <div className="space-y-3" data-testid={`skill-technologies-${index}`}>
                    {skill.technologies.map((tech, techIndex) => (
                      <motion.div
                        key={tech.name}
                        className="space-y-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: techIndex * 0.1 }}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-slate-300">{tech.name}</span>
                          <span className="text-xs text-slate-400">{tech.level}%</span>
                        </div>
                        <div className="w-full bg-slate-700/50 rounded-full h-2">
                          <motion.div
                            className={`h-2 rounded-full bg-gradient-to-r ${skill.gradient}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${tech.level}%` }}
                            transition={{ 
                              duration: 1.5, 
                              delay: (index * 0.1) + (techIndex * 0.2),
                              ease: "easeOut"
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors duration-300" data-testid={`skill-description-${index}`}>
                    {skill.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
