"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          data-testid="footer-content"
        >
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Jignesh D. Maru
          </div>
          <p className="text-slate-400 mb-6" data-testid="footer-subtitle">
            Web Developer & Creative Designer
          </p>
          <p className="text-slate-500 text-sm" data-testid="footer-copyright">
            © 2024 Jignesh D. Maru. Built with passion and modern web technologies.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
