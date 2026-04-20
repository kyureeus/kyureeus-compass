import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { useTheme } from '../../../context/ThemeContext';

export const AssetInventoryHeader: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col gap-4 mb-8">
      {/* High-Fidelity Activity Timeline Card */}
      <div className={cn(
        "border transition-all duration-500 rounded-none p-6 md:p-8 relative overflow-hidden group",
        theme === 'dark' 
          ? "bg-[#111111]/90 border-white/[0.05]" 
          : "bg-white border-gray-100 shadow-sm"
      )}>
         {/* Top Time Labels */}
         <div className="flex justify-between items-end mb-4 px-1">
            <span className={cn(
              "text-[12px] font-bold uppercase tracking-widest transition-colors duration-500",
              theme === 'dark' ? "text-white/20" : "text-gray-400"
            )}>today</span>
            <span className={cn(
              "text-[12px] font-bold uppercase tracking-widest transition-colors duration-500",
              theme === 'dark' ? "text-white/20" : "text-gray-400"
            )}>7 days ago</span>
            <span className={cn(
              "text-[12px] font-bold uppercase tracking-widest transition-colors duration-500",
              theme === 'dark' ? "text-white/20" : "text-gray-400"
            )}>30+ days</span>
         </div>

         {/* Segmented Pill Bar */}
         <div className="flex gap-[3px] mb-8">
            {Array.from({ length: 52 }).map((_, i) => {
              let color = "bg-[#a3e635]"; // Today (Lime)
              if (i > 10) color = "bg-[#14b8a6]"; // 7 days ago (Teal)
              if (i > 20) color = "bg-[#713f12]"; // Late (Brown)
              if (i > 30) color = "bg-[#ef4444]/60"; // Late Red
              if (i > 36) color = "bg-[#ef4444]"; // 30+ days (Bright Red)
              
              return (
                <motion.div
                  key={i}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 54, opacity: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.01 }}
                  className={cn("flex-1 rounded-full", color, theme === 'light' && "opacity-80")}
                />
              );
            })}
         </div>

         {/* Detailed Telemetry Legend */}
         <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-6 px-1">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-sm bg-[#a3e635]" />
              <span className={cn(
                "text-[11px] font-bold tracking-wider transition-colors duration-500",
                theme === 'dark' ? "text-white/40" : "text-gray-400"
              )}>Last 24h · <span className={theme === 'dark' ? "text-white/70" : "text-gray-700"}>896 (49%)</span></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-sm bg-[#14b8a6]" />
              <span className={cn(
                "text-[11px] font-bold tracking-wider transition-colors duration-500",
                theme === 'dark' ? "text-white/40" : "text-gray-400"
              )}>1-7 days · <span className={theme === 'dark' ? "text-white/70" : "text-gray-700"}>835 (46%)</span></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-sm bg-[#f59e0b]" />
              <span className={cn(
                "text-[11px] font-bold tracking-wider transition-colors duration-500",
                theme === 'dark' ? "text-white/40" : "text-gray-400"
              )}>
                7-30 days · <span className={theme === 'dark' ? "text-white/70" : "text-gray-700"}>52 (3%)</span> · <span className="text-[#f59e0b] uppercase font-black">monitor</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-sm bg-[#ef4444]" />
              <span className={cn(
                "text-[11px] font-bold tracking-wider transition-colors duration-500",
                theme === 'dark' ? "text-white/40" : "text-gray-400"
              )}>
                Over 30d · <span className={theme === 'dark' ? "text-white/70" : "text-gray-700"}>35 (2%)</span> · <span className="text-[#ef4444] uppercase font-black">act now</span>
              </span>
            </div>
         </div>

         {/* Metric Grid: 4 Dynamic Cards */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Cards 1-4 with theme-aware classes */}
            {[
              { label: 'Last 24h', val: '896', col: '#a3e635', delay: 0.1 },
              { label: '1-7 days', val: '835', col: '#14b8a6', delay: 0.2 },
              { label: '7-30 days', val: '52', col: '#f59e0b', delay: 0.3 },
              { label: 'Over 30d', val: '35', col: '#ef4444', delay: 0.4, risk: true },
            ].map((card, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: card.delay }}
                className={cn(
                  "p-5 flex flex-col items-center justify-center gap-1 group/card transition-all cursor-pointer relative border",
                  theme === 'dark' 
                    ? cn("bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.04]", card.risk && "bg-[#ef4444]/5 border-[#ef4444]/20 hover:bg-[#ef4444]/10")
                    : cn("bg-gray-50 border-gray-100 hover:bg-gray-100/50 hover:shadow-sm", card.risk && "bg-red-50 border-red-100 hover:bg-red-100/50")
                )}
              >
                <span className={cn("text-3xl font-heading font-black")} style={{ color: card.col }}>{card.val}</span>
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-500",
                  theme === 'dark' ? "text-white/20" : "text-gray-400",
                  card.risk && theme === 'light' && "text-red-400"
                )}>{card.label}</span>
                {card.risk && (
                  <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#ef4444] animate-pulse" />
                )}
              </motion.div>
            ))}
         </div>
      </div>

      {/* Standalone Search Bar */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
          <Search size={18} className={cn(
            "transition-colors",
            theme === 'dark' ? "text-white/20 group-focus-within:text-primary" : "text-gray-300 group-focus-within:text-primary"
          )} />
        </div>
        <input 
          type="text" 
          placeholder="Search it assets..." 
          className={cn(
            "w-full rounded-none py-4 pl-14 pr-32 text-[14px] transition-all font-medium focus:outline-none focus:border-primary/30 border transition-all duration-500",
            theme === 'dark' 
              ? "bg-[#1A1A1A]/50 border-white/[0.05] text-white placeholder:text-white/20 focus:bg-[#1A1A1A]/80" 
              : "bg-white border-gray-100 text-gray-900 placeholder:text-gray-300 focus:bg-white shadow-sm"
          )}
        />
        <div className="absolute inset-y-0 right-6 flex items-center pointer-events-none">
          <span className={cn(
            "text-[11px] font-bold tracking-widest uppercase transition-colors duration-500",
            theme === 'dark' ? "text-white/20" : "text-gray-300"
          )}>
            2,072 of 2,072
          </span>
        </div>
      </div>
    </div>
  );
};
