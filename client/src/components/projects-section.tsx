"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Code, Users, GraduationCap, FileText, X, Calendar, Star } from "lucide-react";
import santmeghImg from "@assets/screencapture-santmegh-onrender-2025-08-21-22_34_53_1755796574718.png";
import jansevaImg from "@assets/screencapture-jansevakendraprivate-onrender-2025-08-21-22_36_53_1755796572621.png";
import Card3D from "./card-3d";
import { ProjectSkeleton } from "@/components/loading-skeleton";
import { FadeIn, StaggerContainer, StaggerItem, HoverScale } from "@/components/enhanced-animations";

const projectsData = [
  {
    title: "Santmegh Computer Education",
    description: "ISO 9001:2015 certified computer education institute featuring comprehensive student management system, fee management, inquiry processing, and performance analytics dashboard.",
    category: "Education Management",
    technologies: ["Student Portal", "Fee Management", "Analytics Dashboard", "Inquiry System"],
    liveUrl: "https://santmegh.onrender.com",
    githubUrl: "#",
    image: santmeghImg,
    color: "blue",
    icon: GraduationCap,
    detailedDescription: "Santmegh Computer Education is an ISO 9001:2015 certified institute that revolutionizes computer education through modern learning solutions. The platform features a comprehensive student management system with real-time tracking, automated fee management with multiple payment options, and an advanced analytics dashboard providing insights into student performance and institutional growth.",
    features: ["Student Registration & Management", "Fee Payment & Tracking", "Course Management", "Performance Analytics", "Inquiry System", "Admin Dashboard"],
    stats: { students: "500+", courses: "25+", success: "96%" },
    year: "2024"
  },
  {
    title: "Janseva Kendra Private",
    description: "Complete digital transformation platform with 'From Documents to Digital - We Make it Easy!' approach. Comprehensive online tools portal offering various digital services and document processing solutions.",
    category: "Digital Services",
    technologies: ["Document Processing", "Online Tools", "Service Portal", "Digital Transformation"],
    liveUrl: "https://jansevakendraprivate.onrender.com",
    githubUrl: "#",
    image: jansevaImg,
    color: "green",
    icon: FileText,
    detailedDescription: "Janseva Kendra Private transforms traditional paperwork into seamless digital experiences. Our platform offers comprehensive online tools for document processing, government service applications, and private service management, making bureaucratic processes effortless and efficient for citizens.",
    features: ["Document Digitization", "Government Service Portal", "Online Form Processing", "Service Tracking", "Multi-language Support", "Mobile Responsive"],
    stats: { services: "50+", users: "1000+", efficiency: "85%" },
    year: "2024"
  },
  {
    title: "Wonderland Discord Community",
    description: "Gaming community platform with dedicated channels for text chat, music, and various games. A welcoming space for gamers to connect and play together with organized server structure.",
    category: "Gaming Community",
    technologies: ["Discord Bot", "Community Management", "Gaming Platform", "Server Organization"],
    liveUrl: "https://sites.google.com/view/wonderland-tm",
    githubUrl: "#",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
    color: "purple",
    icon: Users,
    detailedDescription: "Wonderland is a thriving gaming community that brings together players from around the world. With organized channels for different games, music bots for entertainment, and a welcoming atmosphere, it's the perfect place for gamers to connect, compete, and have fun together.",
    features: ["Text & Voice Channels", "Music Bots", "Game-specific Channels", "Community Events", "Moderation System", "Member Roles"],
    stats: { members: "250+", games: "15+", active: "90%" },
    year: "2024"
  },
];

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

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
        duration: 0.8,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  };

  return (
    <section id="projects" className="py-24 bg-slate-900/30" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6 },
            },
          }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="projects-title">
            Featured <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto" data-testid="projects-description">
            A showcase of my web development work, featuring educational platforms, service portals, and community applications.
          </p>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-3 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          data-testid="projects-grid"
        >
          {projectsData.map((project, index) => (
            <Card3D key={index} intensity={15} perspective={1200}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={controls}
                variants={{
                  visible: {
                    opacity: 1,
                    y: clickedIndex === index ? 0 : -10,
                    transition: { duration: 0.6, delay: index * 0.2 },
                  },
                }}
                whileHover={{
                  y: clickedIndex === index ? 0 : -10,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className={`group relative cursor-pointer ${index === 1 ? '-mt-24' : ''}`}
                data-testid={`project-card-${index}`}
                onClick={() => {
                  setClickedIndex(index);
                  setTimeout(() => setSelectedProject(project), 300);
                }}
              >
                <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden backdrop-blur-sm hover:border-slate-600/50 transition-all duration-300 hover:shadow-2xl hover:shadow-black/20">
                  {/* Project Image */}
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      whileHover={{ scale: 1.1 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Category Badge */}
                    <div className={`absolute top-4 left-4 px-3 py-1 bg-${project.color}-500/20 backdrop-blur-sm rounded-full border border-${project.color}-500/30`}>
                      <span className={`text-xs font-semibold text-${project.color}-300`}>
                        {project.category}
                      </span>
                    </div>

                    {/* Project Icon */}
                    <div className={`absolute top-4 right-4 p-2 bg-slate-800/80 rounded-lg backdrop-blur-sm border border-slate-700/50`}>
                      <project.icon className={`w-5 h-5 text-${project.color}-400`} />
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-200 mb-3 group-hover:text-white transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className="text-slate-400 text-sm leading-relaxed mb-4 group-hover:text-slate-300 transition-colors duration-300">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={tech}
                          className={`px-3 py-1 bg-slate-700/50 text-xs text-slate-300 rounded-full border border-slate-600/50 hover:border-${project.color}-500/50 hover:bg-${project.color}-500/10 transition-all duration-300`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 flex items-center justify-center px-4 py-2 bg-${project.color}-500/10 text-${project.color}-400 rounded-lg border border-${project.color}-500/30 hover:bg-${project.color}-500/20 hover:border-${project.color}-500/50 transition-all duration-300 text-sm font-medium group/btn`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        data-testid={`project-live-${index}`}
                      >
                        <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform duration-300" />
                        Live Demo
                      </motion.a>

                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center p-2 bg-slate-700/50 text-slate-400 rounded-lg border border-slate-600/50 hover:bg-slate-600/50 hover:border-slate-500/50 hover:text-slate-300 transition-all duration-300 group/btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        data-testid={`project-github-${index}`}
                      >
                        <Github className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                      </motion.a>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-${project.color}-500/5 via-transparent to-${project.color}-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                </div>
              </motion.div>
            </Card3D>
          ))}
        </motion.div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setSelectedProject(null);
                setClickedIndex(null);
              }}
            >
              {/* Blur Overlay */}
              <motion.div
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              {/* Modal Content */}
              <motion.div
                className="relative max-w-5xl w-full max-h-[90vh] overflow-y-auto bg-slate-800/95 backdrop-blur-sm rounded-3xl border border-slate-700/50 shadow-2xl"
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    setClickedIndex(null);
                  }}
                  className="absolute top-6 right-6 z-10 p-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-full transition-colors duration-300"
                >
                  <X className="w-5 h-5 text-slate-300" />
                </button>

                {/* Project Image */}
                <div className="relative h-64 sm:h-80 overflow-hidden rounded-t-3xl">
                  <motion.img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

                  {/* Project Icon */}
                  <div className="absolute bottom-6 left-6">
                    <div className={`p-4 bg-${selectedProject.color}-500/20 backdrop-blur-sm rounded-2xl border border-${selectedProject.color}-500/30`}>
                      <selectedProject.icon className={`w-8 h-8 text-${selectedProject.color}-400`} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`px-3 py-1 bg-${selectedProject.color}-500/20 text-${selectedProject.color}-400 rounded-full text-sm font-semibold border border-${selectedProject.color}-500/30`}>
                          {selectedProject.category}
                        </span>
                        <div className="flex items-center text-slate-400 text-sm">
                          <Calendar className="w-4 h-4 mr-1" />
                          {selectedProject.year}
                        </div>
                      </div>
                      <h2 className="text-3xl font-bold text-slate-200 mb-2">
                        {selectedProject.title}
                      </h2>
                      <p className="text-slate-400 text-lg leading-relaxed">
                        {selectedProject.detailedDescription}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-8 p-6 bg-slate-700/30 rounded-2xl border border-slate-600/50">
                    {Object.entries(selectedProject.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className={`text-2xl font-bold text-${selectedProject.color}-400 mb-1`}>
                          {String(value)}
                        </div>
                        <div className="text-slate-400 text-sm capitalize">
                          {key}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-slate-200 mb-4 flex items-center">
                      <Star className={`w-5 h-5 mr-2 text-${selectedProject.color}-400`} />
                      Key Features
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {selectedProject.features.map((feature: string, index: number) => (
                        <motion.div
                          key={feature}
                          className="flex items-center p-3 bg-slate-700/30 rounded-xl border border-slate-600/50"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className={`w-2 h-2 bg-${selectedProject.color}-400 rounded-full mr-3`} />
                          <span className="text-slate-300 text-sm">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-slate-200 mb-4">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech: string) => (
                        <span
                          key={tech}
                          className={`px-4 py-2 bg-slate-700/50 text-slate-300 rounded-full text-sm border border-slate-600/50 hover:border-${selectedProject.color}-500/50 hover:bg-${selectedProject.color}-500/10 transition-all duration-300`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 flex items-center justify-center px-6 py-4 bg-${selectedProject.color}-500/20 text-${selectedProject.color}-400 rounded-xl border border-${selectedProject.color}-500/30 hover:bg-${selectedProject.color}-500/30 hover:border-${selectedProject.color}-500/50 transition-all duration-300 font-semibold group`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ExternalLink className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                      Visit Live Site
                    </motion.a>

                    <motion.a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center px-6 py-4 bg-slate-700/50 text-slate-300 rounded-xl border border-slate-600/50 hover:bg-slate-600/50 hover:border-slate-500/50 hover:text-white transition-all duration-300 font-semibold group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Github className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                      View Source
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View More Projects Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, delay: 0.8 },
            },
          }}
        >
          <motion.a
            href="https://github.com/Jignesh1236"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-slate-800/50 text-slate-300 rounded-xl border border-slate-700/50 hover:bg-slate-700/50 hover:border-slate-600/50 hover:text-white transition-all duration-300 font-medium group"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            data-testid="view-more-projects"
          >
            <Code className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
            View More Projects on GitHub
            <motion.div
              className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ x: -10 }}
              animate={{ x: 0 }}
            >
              →
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}