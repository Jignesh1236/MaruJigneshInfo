
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Code, Copy, Check } from "lucide-react";

const codeSnippets = [
  {
    title: "React Component with Hooks",
    language: "typescript",
    code: `const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue] as const;
};`,
    description: "Custom React hook for local storage management"
  },
  {
    title: "Dynamic API Handler",
    language: "javascript",
    code: `const createApiHandler = (baseURL) => {
  const cache = new Map();
  
  return {
    async get(endpoint, options = {}) {
      const cacheKey = \`\${endpoint}\${JSON.stringify(options)}\`;
      
      if (cache.has(cacheKey) && !options.fresh) {
        return cache.get(cacheKey);
      }
      
      try {
        const response = await fetch(\`\${baseURL}\${endpoint}\`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          ...options
        });
        
        const data = await response.json();
        cache.set(cacheKey, data);
        return data;
      } catch (error) {
        throw new Error(\`API Error: \${error.message}\`);
      }
    },
    
    clearCache: () => cache.clear()
  };
};`,
    description: "Reusable API handler with caching functionality"
  },
  {
    title: "Animation Utility",
    language: "css",
    code: `.animate-bounce-in {
  animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3) translateY(-50px);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05) translateY(-25px);
  }
  70% {
    transform: scale(0.9) translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}`,
    description: "Custom CSS animations and glass morphism effects"
  }
];

export default function CodeShowcase() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = async (code: string, index: number) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <section id="code-showcase" className="py-24 bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Code <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Snippets</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Explore some of my favorite code examples and reusable utilities
          </p>
        </motion.div>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {codeSnippets.map((snippet, index) => (
            <motion.div
              key={index}
              className="bg-slate-900/50 rounded-2xl border border-slate-800/50 overflow-hidden group hover:border-blue-500/30 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, boxShadow: "0 20px 40px -10px rgba(59, 130, 246, 0.3)" }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Code className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-semibold text-slate-200">{snippet.title}</h3>
                  </div>
                  <motion.button
                    onClick={() => copyToClipboard(snippet.code, index)}
                    className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {copiedIndex === index ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-slate-400" />
                    )}
                  </motion.button>
                </div>
                
                <p className="text-sm text-slate-400 mb-4">{snippet.description}</p>
                
                <div className="bg-slate-950/80 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-slate-300">
                    <code className={`language-${snippet.language}`}>{snippet.code}</code>
                  </pre>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
