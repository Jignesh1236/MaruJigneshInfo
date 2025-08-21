import { motion } from "framer-motion";
import { Download, Mail, Github, Linkedin, Twitter, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TypingAnimation from "./typing-animation";
import { Card } from "@/components/ui/card";
// import VideoBackground from "@/components/video-background";
import { FadeIn, FloatingElement, GlowEffect } from "@/components/enhanced-animations";

export default function EnhancedHeroSection() {
  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-purple-900/20" />

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Text Content */}
          <FadeIn direction="left" delay={0.2}>
            <div className="text-center lg:text-left space-y-6">
              
              {/* Greeting Badge */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="inline-block"
              >
                <Badge variant="outline" className="px-4 py-2 text-sm bg-white/10 backdrop-blur-sm border-white/20">
                  👋 Hello, I'm
                </Badge>
              </motion.div>

              {/* Name */}
              <div className="space-y-2">
                <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                  <motion.span
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="block"
                  >
                    Jignesh
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                  >
                    D. Maru
                  </motion.span>
                </h1>
              </div>

              {/* Animated Title */}
              <div className="text-xl lg:text-2xl text-blue-200">
                <TypingAnimation
                  texts={["Web Developer & Digital Creator"]}
                  className="font-medium"
                />
              </div>

              {/* Description */}
              <FadeIn delay={1}>
                <p className="text-lg text-gray-300 max-w-lg leading-relaxed">
                  Passionate web developer from Vadodara specializing in React, JavaScript, 
                  and modern web technologies. Creating amazing digital experiences with 
                  cutting-edge design and development skills.
                </p>
              </FadeIn>

              {/* Skills Tags */}
              <FadeIn delay={1.2}>
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  {["React", "JavaScript", "Node.js", "TypeScript", "Tailwind CSS"].map((skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.4 + index * 0.1 }}
                      className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white border border-white/20"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </FadeIn>

              {/* CTA Buttons */}
              <FadeIn delay={1.6}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <GlowEffect color="blue">
                    <Button 
                      size="lg" 
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium"
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      Get In Touch
                    </Button>
                  </GlowEffect>
                  
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-full font-medium"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download CV
                  </Button>
                </div>
              </FadeIn>

              {/* Social Links */}
              <FadeIn delay={1.8}>
                <div className="flex gap-4 justify-center lg:justify-start">
                  {[
                    { icon: Github, href: "#", label: "GitHub" },
                    { icon: Linkedin, href: "#", label: "LinkedIn" },
                    { icon: Twitter, href: "#", label: "Twitter" }
                  ].map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </FadeIn>
            </div>
          </FadeIn>

          {/* Right Column - Profile Card */}
          <FadeIn direction="right" delay={0.4}>
            <div className="flex justify-center">
              <FloatingElement intensity={15} speed={4}>
                <GlowEffect color="purple">
                  <Card className="p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl max-w-md">
                    <div className="text-center space-y-6">
                      
                      {/* Profile Image Placeholder */}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative mx-auto w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1"
                      >
                        <div className="w-full h-full rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl font-bold text-white">
                          JM
                        </div>
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                          className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-75 blur-sm"
                        />
                      </motion.div>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { label: "Projects", value: "50+" },
                          { label: "Experience", value: "3+ Yrs" },
                          { label: "Clients", value: "25+" }
                        ].map((stat, index) => (
                          <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2 + index * 0.1 }}
                            className="text-center"
                          >
                            <div className="text-xl font-bold text-white">{stat.value}</div>
                            <div className="text-sm text-gray-300">{stat.label}</div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Status Badge */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.5 }}
                        className="flex items-center justify-center gap-2 text-green-400"
                      >
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-3 h-3 bg-green-400 rounded-full"
                        />
                        <span className="text-sm font-medium">Available for work</span>
                      </motion.div>
                    </div>
                  </Card>
                </GlowEffect>
              </FloatingElement>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <span className="text-sm mb-2">Scroll to explore</span>
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}