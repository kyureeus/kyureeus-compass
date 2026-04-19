import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { cn } from '../../../lib/utils';

export const AssetInventoryHeader: React.FC = () => {

  return (
    <div className="flex flex-col gap-4 mb-8">
      {/* High-Fidelity Activity Timeline Card */}
      <div className="bg-[#111111]/90 border border-white/[0.05] rounded-none p-6 md:p-8 relative overflow-hidden group">
         {/* Top Time Labels */}
         <div className="flex justify-between items-end mb-4 px-1">
            <span className="text-[12px] font-bold text-white/20 uppercase tracking-widest">today</span>
            <span className="text-[12px] font-bold text-white/20 uppercase tracking-widest">7 days ago</span>
            <span className="text-[12px] font-bold text-white/20 uppercase tracking-widest">30+ days</span>
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
                  className={cn("flex-1 rounded-full", color)}
                />
              );
            })}
         </div>

         {/* Detailed Telemetry Legend */}
         <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-6 px-1">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-sm bg-[#a3e635]" />
              <span className="text-[11px] font-bold text-white/40 tracking-wider">Last 24h · <span className="text-white/70">896 (49%)</span></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-sm bg-[#14b8a6]" />
              <span className="text-[11px] font-bold text-white/40 tracking-wider">1-7 days · <span className="text-white/70">835 (46%)</span></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-sm bg-[#f59e0b]" />
              <span className="text-[11px] font-bold text-white/40 tracking-wider">
                7-30 days · <span className="text-white/70">52 (3%)</span> · <span className="text-[#f59e0b] uppercase font-black">monitor</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-sm bg-[#ef4444]" />
              <span className="text-[11px] font-bold text-white/40 tracking-wider">
                Over 30d · <span className="text-white/70">35 (2%)</span> · <span className="text-[#ef4444] uppercase font-black">act now</span>
              </span>
            </div>
         </div>

         {/* Metric Grid: 4 Dynamic Cards */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Card 1: Today */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/[0.02] border border-white/[0.05] p-5 flex flex-col items-center justify-center gap-1 group/card hover:bg-white/[0.04] transition-all cursor-pointer"
            >
              <span className="text-3xl font-heading font-black text-[#a3e635]">896</span>
              <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">Last 24h</span>
            </motion.div>

            {/* Card 2: 1-7 Days */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/[0.02] border border-white/[0.05] p-5 flex flex-col items-center justify-center gap-1 group/card hover:bg-white/[0.04] transition-all cursor-pointer"
            >
              <span className="text-3xl font-heading font-black text-[#14b8a6]">835</span>
              <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">1-7 days</span>
            </motion.div>

            {/* Card 3: 7-30 Days */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/[0.02] border border-white/[0.05] p-5 flex flex-col items-center justify-center gap-1 group/card hover:bg-white/[0.04] transition-all cursor-pointer"
            >
              <span className="text-3xl font-heading font-black text-[#f59e0b]">52</span>
              <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">7-30 days</span>
            </motion.div>

            {/* Card 4: Over 30 Days (Risk) */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-[#ef4444]/5 border border-[#ef4444]/20 p-5 flex flex-col items-center justify-center gap-1 group/card hover:bg-[#ef4444]/10 transition-all cursor-pointer relative"
            >
              <span className="text-3xl font-heading font-black text-[#ef4444]">35</span>
              <span className="text-[10px] font-bold text-[#ef4444]/40 uppercase tracking-[0.2em]">Over 30d</span>
              {/* Corner Pulsing Dot */}
              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#ef4444] animate-pulse" />
            </motion.div>
         </div>
      </div>

      {/* Standalone Search Bar */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
          <Search size={18} className="text-white/20 group-focus-within:text-primary transition-colors" />
        </div>
        <input 
          type="text" 
          placeholder="Search it assets..." 
          className="w-full bg-[#1A1A1A]/50 border border-white/[0.05] rounded-xl py-4 pl-14 pr-32 text-[14px] text-white placeholder:text-white/20 focus:outline-none focus:border-primary/30 focus:bg-[#1A1A1A]/80 transition-all font-medium"
        />
        <div className="absolute inset-y-0 right-6 flex items-center pointer-events-none">
          <span className="text-[11px] font-bold text-white/20 tracking-widest uppercase">
            2,072 of 2,072
          </span>
        </div>
      </div>
    </div>
  );
};
