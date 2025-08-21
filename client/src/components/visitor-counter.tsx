import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Eye, UserCheck } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface AnalyticsStats {
  totalVisitors: number;
  todayVisitors: number;
  onlineNow: number;
}

export default function VisitorCounter() {
  const [visitorId, setVisitorId] = useState<string>('');

  // Generate unique visitor ID and track visit
  useEffect(() => {
    const generateVisitorId = () => {
      let id = localStorage.getItem('visitorId');
      if (!id) {
        // Use crypto.randomUUID if available, otherwise fallback to a simple UUID generator
        if (crypto && crypto.randomUUID) {
          id = crypto.randomUUID();
        } else {
          id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
        }
        localStorage.setItem('visitorId', id);
      }
      setVisitorId(id);
      return id;
    };

    const trackVisit = async () => {
      const id = generateVisitorId();
      try {
        const response = await fetch('/api/analytics/visit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            visitorId: id,
            sessionDuration: '0',
            pageViews: '1',
          }),
        });
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error tracking visit:', error);
      }
    };

    trackVisit();
  }, []);

  // Fetch analytics stats
  const { data: stats, isLoading, error } = useQuery<AnalyticsStats>({
    queryKey: ['/api/analytics/stats'],
    refetchInterval: 30000, // Refresh every 30 seconds
    retry: 3,
    retryDelay: 1000,
  });

  if (isLoading || !stats) {
    return (
      <div className="fixed top-4 left-4 z-50">
        <div className="bg-black/20 backdrop-blur-sm rounded-lg p-3 border border-white/10">
          <div className="flex items-center gap-2 text-white/60">
            <Users className="w-4 h-4" />
            <span className="text-sm">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 left-4 z-50"
    >
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-lg p-4 border border-white/10 shadow-lg">
        <div className="grid grid-cols-3 gap-4 text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center"
          >
            <Users className="w-5 h-5 text-blue-400 mb-1" />
            <motion.span
              key={stats.totalVisitors}
              initial={{ scale: 1.2, color: '#60A5FA' }}
              animate={{ scale: 1, color: '#FFFFFF' }}
              className="text-lg font-bold text-white"
            >
              {stats.totalVisitors}
            </motion.span>
            <span className="text-xs text-white/60">Total</span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center"
          >
            <Eye className="w-5 h-5 text-green-400 mb-1" />
            <motion.span
              key={stats.todayVisitors}
              initial={{ scale: 1.2, color: '#4ADE80' }}
              animate={{ scale: 1, color: '#FFFFFF' }}
              className="text-lg font-bold text-white"
            >
              {stats.todayVisitors}
            </motion.span>
            <span className="text-xs text-white/60">Today</span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center"
          >
            <div className="relative">
              <UserCheck className="w-5 h-5 text-purple-400 mb-1" />
              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full"
              />
            </div>
            <motion.span
              key={stats.onlineNow}
              initial={{ scale: 1.2, color: '#C084FC' }}
              animate={{ scale: 1, color: '#FFFFFF' }}
              className="text-lg font-bold text-white"
            >
              {stats.onlineNow}
            </motion.span>
            <span className="text-xs text-white/60">Online</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}