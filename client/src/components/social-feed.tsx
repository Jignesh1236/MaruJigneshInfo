
"use client";

import { motion } from "framer-motion";
import { ExternalLink, Users, MessageCircle, Heart } from "lucide-react";
import { SiDiscord, SiInstagram, SiReddit } from "react-icons/si";

const socialLinks = [
  {
    platform: "Discord",
    url: "https://discord.gg/rYHX8cfbYT",
    icon: SiDiscord,
    color: "from-indigo-500 to-purple-600",
    description: "Join our Discord community for real-time discussions and collaboration",
    stats: { members: "500+", activity: "Daily" }
  },
  {
    platform: "Instagram",
    url: "https://www.instagram.com/jigneshmaru_",
    icon: SiInstagram,
    color: "from-pink-500 to-rose-500",
    description: "Follow my journey, behind-the-scenes content, and creative projects",
    stats: { followers: "1.2K", posts: "120+" }
  },
  {
    platform: "Reddit",
    url: "https://www.reddit.com/r/WonderlandTM/",
    icon: SiReddit,
    color: "from-orange-500 to-red-500",
    description: "Explore WonderlandTM community discussions and project updates",
    stats: { members: "200+", posts: "50+" }
  }
];

export default function SocialFeed() {
  return (
    <section id="social" className="py-24 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Connect & <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Follow</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Stay updated with my latest projects and join our growing community across different platforms
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {socialLinks.map((social, index) => {
            const IconComponent = social.icon;
            return (
              <motion.div
                key={social.platform}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <motion.a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative overflow-hidden bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-6 h-full transition-all duration-300 group-hover:border-slate-700/50"
                  whileHover={{ 
                    y: -8,
                    boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.3)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`} />
                  
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${social.color} shadow-lg`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-200 group-hover:text-white transition-colors">
                        {social.platform}
                      </h3>
                    </div>
                    <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-slate-300 transition-colors" />
                  </div>

                  {/* Description */}
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed group-hover:text-slate-300 transition-colors">
                    {social.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-slate-500" />
                      <span className="text-sm font-medium text-slate-400">
                        {social.stats.members || social.stats.followers}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {social.platform === "Discord" ? (
                        <MessageCircle className="w-4 h-4 text-slate-500" />
                      ) : (
                        <Heart className="w-4 h-4 text-slate-500" />
                      )}
                      <span className="text-sm font-medium text-slate-400">
                        {social.stats.activity || social.stats.posts}
                      </span>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(to right, ${social.color.replace('from-', '').replace('to-', ', ')})` }}
                  />
                </motion.a>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-slate-400 mb-4">
            Let's build something amazing together!
          </p>
          <motion.div
            className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-sm font-medium">Join the community</span>
            <ExternalLink className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
