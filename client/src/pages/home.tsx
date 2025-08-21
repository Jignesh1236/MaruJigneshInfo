import { useEffect } from "react";
import ScrollProgress from "@/components/scroll-progress";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import SkillsSection from "@/components/skills-section";
import ProjectsSection from "@/components/projects-section";
import ExperienceSection from "@/components/experience-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import LoadingScreen from "@/components/loading-screen";
import CodeShowcase from "../components/code-showcase";
import ParticleBackground from "../components/particle-background";
import SocialFeed from "../components/social-feed";
import Chatbot from "@/components/chatbot";
import { Background3D } from "@/components/three-scene";

export default function Home() {
  useEffect(() => {
    document.title = "Jignesh D. Maru - Web Developer Portfolio";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Passionate web developer from Vadodara specializing in React, JavaScript, and modern web technologies. Explore my portfolio showcasing creative design and development skills.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Passionate web developer from Vadodara specializing in React, JavaScript, and modern web technologies. Explore my portfolio showcasing creative design and development skills.';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <>
      <LoadingScreen />
      <ParticleBackground />
      <Background3D variant="cubes" className="opacity-30" />
      <ScrollProgress />
      <Navigation />
      <div className="bg-slate-950 text-white min-h-screen relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <CodeShowcase />
        <ExperienceSection />
        <SocialFeed />
        <ContactSection />
        <Footer />
      </div>
      <Chatbot />
    </>
  );
}