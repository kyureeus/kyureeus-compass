import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { useTheme } from '../../../context/ThemeContext';

interface OSMetric {
  name: string;
  percentage: number;
}

const monitoredOS: OSMetric[] = [
  { name: 'Windows', percentage: 75 },
  { name: 'Linux', percentage: 40 },
  { name: 'Network', percentage: 30 },
];

const blindSpotOS: OSMetric[] = [
  { name: 'Windows', percentage: 60 },
  { name: 'Network', percentage: 45 },
  { name: 'Linux', percentage: 25 },
];

export const AgentCoverageCard: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={cn(
      "group relative p-6 lg:p-8 flex flex-col h-full rounded-none overflow-hidden border transition-all duration-500",
      theme === 'dark' ? "bg-[#0D0D0D] border-white/[0.05]" : "bg-white border-gray-100 shadow-sm"
    )}>
      {/* Targeting Hover Physics (Compass Style) */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20",
        theme === 'light' && "ring-1 ring-primary/10"
      )}>
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary"></div>
        <div className={cn("absolute inset-0 border border-primary/20", theme === 'light' && "border-primary/10")}></div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <span className={cn(
            "text-[10px] uppercase tracking-[0.2em] font-bold transition-colors duration-500",
            theme === 'dark' ? "text-white/30" : "text-gray-400"
          )}>Monitoring coverage</span>
          <h3 className={cn(
            "text-xl font-heading font-bold mt-1 capitalize transition-colors duration-500",
            theme === 'dark' ? "text-white" : "text-gray-900"
          )}>Agent Coverage</h3>
          <p className={cn(
            "text-[13px] font-light mt-1 transition-colors duration-500",
            theme === 'dark' ? "text-white/40" : "text-gray-500"
          )}>Monitored vs blind spot analysis</p>
        </div>
        <button className={cn(
          "px-5 py-2.5 border text-[13px] font-bold flex items-center gap-2 transition-all group/btn",
          theme === 'dark' ? "border-white/10 text-white hover:bg-white hover:text-black" : "border-gray-200 text-gray-900 hover:bg-gray-900 hover:text-white"
        )}>
          View <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* Main Dual View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
        {/* Monitored Section */}
        <div className={cn(
          "p-6 flex flex-col gap-6 relative overflow-hidden border transition-colors duration-500",
          theme === 'dark' ? "bg-[#101910] border-green-500/10" : "bg-green-50 border-green-100"
        )}>
          <div className="flex flex-col">
            <span className={cn(
              "text-4xl font-heading font-bold tracking-tighter transition-colors duration-500 leading-none",
              theme === 'dark' ? "text-[#bef264]" : "text-green-600"
            )}>1,079</span>
            <span className={cn(
              "text-[13px] font-bold uppercase tracking-wide mt-1 transition-colors duration-500",
              theme === 'dark' ? "text-[#bef264]/60" : "text-green-600/70"
            )}>Monitored</span>
          </div>
          
          <div className="flex flex-col gap-4">
            {monitoredOS.map((os, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <span className={cn(
                  "text-[11px] font-medium w-16 uppercase transition-colors duration-500",
                  theme === 'dark' ? "text-[#bef264]/40" : "text-green-600/50"
                )}>{os.name}</span>
                <div className={cn(
                  "flex-grow h-1.5 relative rounded-full overflow-hidden transition-colors duration-500",
                  theme === 'dark' ? "bg-[#bef264]/5" : "bg-green-200/50"
                )}>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${os.percentage}%` }}
                    transition={{ duration: 1.2, delay: idx * 0.1, ease: [0.23, 1, 0.32, 1] }}
                    className={cn("absolute inset-y-0 left-0", theme === 'dark' ? "bg-[#bef264]" : "bg-green-500")}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Blind Spot Section */}
        <div className={cn(
          "p-6 flex flex-col gap-6 relative overflow-hidden border transition-colors duration-500",
          theme === 'dark' ? "bg-[#1C0F0F] border-red-500/10" : "bg-red-50 border-red-100"
        )}>
          <div className="flex flex-col">
            <span className={cn(
              "text-4xl font-heading font-bold tracking-tighter transition-colors duration-500 leading-none",
              theme === 'dark' ? "text-[#ef4444]" : "text-red-600"
            )}>739</span>
            <span className={cn(
              "text-[13px] font-bold uppercase tracking-wide mt-1 transition-colors duration-500",
              theme === 'dark' ? "text-[#ef4444]/60" : "text-red-600/70"
            )}>Blind spot</span>
          </div>

          <div className="flex flex-col gap-4">
             <span className={cn(
               "text-[11px] font-medium uppercase tracking-widest italic mb-1 transition-colors duration-500",
               theme === 'dark' ? "text-[#ef4444]/20" : "text-red-300"
             )}>Unmonitored by family</span>
            {blindSpotOS.map((os, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <span className={cn(
                  "text-[11px] font-medium w-16 uppercase transition-colors duration-500",
                  theme === 'dark' ? "text-[#ef4444]/30" : "text-red-600/40"
                )}>{os.name}</span>
                <div className={cn(
                  "flex-grow h-1.5 relative rounded-full overflow-hidden transition-colors duration-500",
                  theme === 'dark' ? "bg-[#ef4444]/5" : "bg-red-200/50"
                )}>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${os.percentage}%` }}
                    transition={{ duration: 1.2, delay: 0.5 + (idx * 0.1), ease: [0.23, 1, 0.32, 1] }}
                    className={cn("absolute inset-y-0 left-0", theme === 'dark' ? "bg-[#ef4444]/40" : "bg-red-400")}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <div className={cn(
        "mt-8 pt-6 border-t flex items-center justify-between transition-colors duration-500",
        theme === 'dark' ? "border-white/[0.05]" : "border-gray-100"
      )}>
        <div className="flex items-center gap-4">
          <span className={cn(
            "text-[12px] uppercase tracking-widest font-medium transition-colors duration-500",
            theme === 'dark' ? "text-white/30" : "text-gray-400"
          )}>Total fleet</span>
          <span className={cn(
            "text-[16px] font-bold tracking-tight transition-colors duration-500",
            theme === 'dark' ? "text-white" : "text-gray-900"
          )}>1,818</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[16px] text-red-500 font-bold tracking-tight">41% GAP</span>
        </div>
      </div>
    </div>
  );
};
