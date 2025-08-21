"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { GraduationCap, Award, Briefcase, Factory, Tag } from "lucide-react";

const educationData = [
  {
    year: "2024",
    title: "Diploma in Computer Application",
    institution: "Santmegh Computer Education",
    grade: "70%",
    icon: GraduationCap,
    color: "blue",
  },
  {
    year: "2024",
    title: "ITI - Computer Operator & Programming",
    institution: "Tarsali ITI",
    grade: "80%",
    icon: Award,
    color: "purple",
  },
  {
    year: "2023",
    title: "Course on Computer Concepts",
    institution: "Santmegh Computer Education",
    grade: "Certified",
    icon: Tag,
    color: "green",
  },
];

const experienceData = [
  {
    year: "2024 • 2 Months",
    title: "Computer Operator",
    institution: "Janseva Private, Karjan",
    description: "Data entry, MS Office tools, and customer handling",
    icon: Briefcase,
    color: "cyan",
  },
  {
    year: "2024 • 15 Days",
    title: "Industrial Training",
    institution: "ASER Company (ITI Training)",
    description: "Office workflow, computer handling, and professional environment exposure",
    icon: Factory,
    color: "orange",
  },
];

const certificationData = {
  title: "Web Development",
  institution: "Skill India",
  grade: "Participation Tag",
  color: "yellow",
};

export default function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const leftVariants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const rightVariants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const centerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="experience" className="py-24 bg-slate-900/50" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl lg:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            variants={centerVariants}
            data-testid="experience-title"
          >
            My <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Journey</span>
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
            data-testid="experience-description"
          >
            Education, experience, and continuous learning milestones
          </motion.p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Education Timeline */}
          <div className="mb-16">
            <motion.h3
              className="text-2xl font-semibold mb-8 text-center text-slate-200"
              initial={{ opacity: 0 }}
              animate={controls}
              variants={centerVariants}
              data-testid="education-section-title"
            >
              Education
            </motion.h3>

            {educationData.map((item, index) => (
              <div key={item.title} className="flex flex-col md:flex-row items-center mb-12">
                {index % 2 === 0 ? (
                  <>
                    <motion.div
                      className="md:w-1/2 md:pr-8"
                      initial="hidden"
                      animate={controls}
                      variants={{
                        visible: {
                          ...leftVariants.visible,
                          transition: {
                            ...leftVariants.visible.transition,
                            delay: index * 0.2,
                          },
                        },
                      }}
                      data-testid={`education-item-${index}-left`}
                    >
                      <motion.div
                        className={`bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 hover:border-${item.color}-500/50 transition-all duration-300 group cursor-pointer`}
                        whileHover={{
                          scale: 1.03,
                          y: -5,
                          boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
                        }}
                        onHoverStart={() => {}}
                        onHoverEnd={() => {}}
                      >
                        <div className="flex items-center mb-3">
                          <div className={`w-3 h-3 bg-${item.color}-500 rounded-full mr-3`} />
                          <span className="text-sm text-slate-400">{item.year}</span>
                        </div>
                        <h4 className="text-xl font-semibold text-slate-200 mb-2">{item.title}</h4>
                        <p className="text-slate-300 mb-2">{item.institution}</p>
                        <p className={`text-${item.color}-400 font-semibold`}>{item.grade}</p>
                      </motion.div>
                    </motion.div>
                    <motion.div
                      className={`hidden md:flex w-8 h-8 bg-${item.color}-500 rounded-full items-center justify-center relative z-10 cursor-pointer group-hover:scale-125 transition-transform duration-300`}
                      whileHover={{
                        scale: 1.3,
                        boxShadow: `0 0 20px rgba(59, 130, 246, 0.5)`
                      }}
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        scale: { duration: 2, repeat: Infinity, delay: index * 0.5 }
                      }}
                    >
                      <item.icon className="text-white text-sm" size={16} />

                      {/* Pulse Ring */}
                      <motion.div
                        className={`absolute inset-0 rounded-full border-2 border-${item.color}-400`}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [1, 0, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.5,
                        }}
                      />
                    </motion.div>
                    <div className="md:w-1/2 md:pl-8" />
                  </>
                ) : (
                  <>
                    <div className="md:w-1/2 md:pr-8" />
                    <motion.div
                      className={`hidden md:flex w-8 h-8 bg-${item.color}-500 rounded-full items-center justify-center relative z-10 cursor-pointer group-hover:scale-125 transition-transform duration-300`}
                      whileHover={{
                        scale: 1.3,
                        boxShadow: `0 0 20px rgba(59, 130, 246, 0.5)`
                      }}
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        scale: { duration: 2, repeat: Infinity, delay: index * 0.2 }
                      }}
                    >
                      <item.icon className="text-white text-sm" size={16} />

                      {/* Pulse Ring */}
                      <motion.div
                        className={`absolute inset-0 rounded-full border-2 border-${item.color}-400`}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [1, 0, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.2,
                        }}
                      />
                    </motion.div>
                    <motion.div
                      className="md:w-1/2 md:pl-8"
                      initial="hidden"
                      animate={controls}
                      variants={{
                        visible: {
                          ...rightVariants.visible,
                          transition: {
                            ...rightVariants.visible.transition,
                            delay: index * 0.2,
                          },
                        },
                      }}
                      data-testid={`education-item-${index}-right`}
                    >
                      <motion.div
                        className={`bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 hover:border-${item.color}-500/50 transition-all duration-300 group cursor-pointer`}
                        whileHover={{
                          scale: 1.03,
                          y: -5,
                          boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
                        }}
                        onHoverStart={() => {}}
                        onHoverEnd={() => {}}
                      >
                        <div className="flex items-center mb-3">
                          <div className={`w-3 h-3 bg-${item.color}-500 rounded-full mr-3`} />
                          <span className="text-sm text-slate-400">{item.year}</span>
                        </div>
                        <h4 className="text-xl font-semibold text-slate-200 mb-2">{item.title}</h4>
                        <p className="text-slate-300 mb-2">{item.institution}</p>
                        <p className={`text-${item.color}-400 font-semibold`}>{item.grade}</p>
                      </motion.div>
                    </motion.div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Experience Timeline */}
          <div className="mb-16">
            <motion.h3
              className="text-2xl font-semibold mb-8 text-center text-slate-200"
              initial={{ opacity: 0 }}
              animate={controls}
              variants={centerVariants}
              data-testid="experience-section-title"
            >
              Experience
            </motion.h3>

            {experienceData.map((item, index) => (
              <div key={item.title} className="flex flex-col md:flex-row items-center mb-12">
                {index % 2 === 1 ? (
                  <>
                    <motion.div
                      className="md:w-1/2 md:pr-8"
                      initial="hidden"
                      animate={controls}
                      variants={{
                        visible: {
                          ...leftVariants.visible,
                          transition: {
                            ...leftVariants.visible.transition,
                            delay: (index + educationData.length) * 0.2,
                          },
                        },
                      }}
                      data-testid={`experience-item-${index}-left`}
                    >
                      <motion.div
                        className={`bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 hover:border-${item.color}-500/50 transition-all duration-300 group cursor-pointer`}
                        whileHover={{
                          scale: 1.03,
                          y: -5,
                          boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
                        }}
                      >
                        <div className="flex items-center mb-3">
                          <div className={`w-3 h-3 bg-${item.color}-500 rounded-full mr-3`} />
                          <span className="text-sm text-slate-400">{item.year}</span>
                        </div>
                        <h4 className="text-xl font-semibold text-slate-200 mb-2">{item.title}</h4>
                        <p className="text-slate-300 mb-3">{item.institution}</p>
                        <p className="text-slate-400 text-sm">{item.description}</p>
                      </motion.div>
                    </motion.div>
                    <motion.div
                      className={`hidden md:flex w-8 h-8 bg-${item.color}-500 rounded-full items-center justify-center relative z-10 cursor-pointer`}
                      whileHover={{
                        scale: 1.3,
                        boxShadow: `0 0 20px rgba(249, 115, 22, 0.5)`
                      }}
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        scale: { duration: 2, repeat: Infinity, delay: (index + educationData.length) * 0.5 }
                      }}
                    >
                      <item.icon className="text-white text-sm" size={16} />

                      {/* Pulse Ring */}
                      <motion.div
                        className={`absolute inset-0 rounded-full border-2 border-${item.color}-400`}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [1, 0, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: (index + educationData.length) * 0.5,
                        }}
                      />
                    </motion.div>
                    <div className="md:w-1/2 md:pl-8" />
                  </>
                ) : (
                  <>
                    <div className="md:w-1/2 md:pr-8" />
                    <motion.div
                      className={`hidden md:flex w-8 h-8 bg-${item.color}-500 rounded-full items-center justify-center relative z-10 cursor-pointer`}
                      whileHover={{
                        scale: 1.3,
                        boxShadow: `0 0 20px rgba(59, 130, 246, 0.5)`
                      }}
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        scale: { duration: 2, repeat: Infinity, delay: (index + educationData.length) * 0.2 }
                      }}
                    >
                      <item.icon className="text-white text-sm" size={16} />

                      {/* Pulse Ring */}
                      <motion.div
                        className={`absolute inset-0 rounded-full border-2 border-${item.color}-400`}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [1, 0, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: (index + educationData.length) * 0.2,
                        }}
                      />
                    </motion.div>
                    <motion.div
                      className="md:w-1/2 md:pl-8"
                      initial="hidden"
                      animate={controls}
                      variants={{
                        visible: {
                          ...rightVariants.visible,
                          transition: {
                            ...rightVariants.visible.transition,
                            delay: (index + educationData.length) * 0.2,
                          },
                        },
                      }}
                      data-testid={`experience-item-${index}-right`}
                    >
                      <motion.div
                        className={`bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 hover:border-${item.color}-500/50 transition-all duration-300 group cursor-pointer`}
                        whileHover={{
                          scale: 1.03,
                          y: -5,
                          boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
                        }}
                      >
                        <div className="flex items-center mb-3">
                          <div className={`w-3 h-3 bg-${item.color}-500 rounded-full mr-3`} />
                          <span className="text-sm text-slate-400">{item.year}</span>
                        </div>
                        <h4 className="text-xl font-semibold text-slate-200 mb-2">{item.title}</h4>
                        <p className="text-slate-300 mb-3">{item.institution}</p>
                        <p className="text-slate-400 text-sm">{item.description}</p>
                      </motion.div>
                    </motion.div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Certifications */}
          <motion.div
            className="text-center"
            initial="hidden"
            animate={controls}
            variants={{
              visible: {
                ...centerVariants.visible,
                transition: {
                  ...centerVariants.visible.transition,
                  delay: (experienceData.length + educationData.length) * 0.2,
                },
              },
            }}
            data-testid="certification-section"
          >
            <h3 className="text-2xl font-semibold mb-8 text-slate-200">Certifications</h3>
            <motion.div
              className={`bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 hover:border-${certificationData.color}-500/50 transition-all duration-300 group cursor-pointer`}
              whileHover={{
                scale: 1.03,
                y: -5,
                boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
              }}
              onHoverStart={() => {}}
              onHoverEnd={() => {}}
            >
              <div className="flex items-center justify-center mb-3">
                <div className={`w-3 h-3 bg-${certificationData.color}-500 rounded-full mr-3`} />
                <span className="text-sm text-slate-400">{certificationData.institution}</span>
              </div>
              <h4 className="text-xl font-semibold text-slate-200 mb-2">{certificationData.title}</h4>
              <p className={`text-${certificationData.color}-400 font-semibold`}>{certificationData.grade}</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}