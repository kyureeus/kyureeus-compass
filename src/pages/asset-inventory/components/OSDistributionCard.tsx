import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../lib/utils';

interface OSDetail {
  name: string;
  percentage: number;
  color: string;
}

interface OSCategory {
  name: string;
  percentage: number;
  assetsCount: number;
  color: string;
  details: OSDetail[];
}

const osData: OSCategory[] = [
  {
    name: 'Windows',
    percentage: 50,
    assetsCount: 898,
    color: 'bg-[#bef264]',
    details: [
      { name: 'Win 11 Enterprise', percentage: 35, color: 'bg-[#3b82f6]' },
      { name: 'Win 10 LTSC', percentage: 8, color: 'bg-[#3b82f6]' },
      { name: 'Win 11 Pro', percentage: 4, color: 'bg-[#3b82f6]' },
    ]
  },
  {
    name: 'Network devices',
    percentage: 17,
    assetsCount: 303,
    color: 'bg-[#14b8a6]',
    details: [
      { name: 'HP Ethernet', percentage: 9, color: 'bg-[#14b8a6]' },
      { name: 'Cisco / Check Point', percentage: 8, color: 'bg-[#14b8a6]' },
    ]
  },
  {
    name: 'Linux / Unix',
    percentage: 15,
    assetsCount: 261,
    color: 'bg-[#f97316]',
    details: [
      { name: 'Red Hat Enterprise', percentage: 10, color: 'bg-[#f97316/80]' },
      { name: 'Linux Kernel 2.6', percentage: 5, color: 'bg-[#f97316/80]' },
    ]
  }
];

export const OSDistributionCard: React.FC = () => {
  return (
    <div className="group relative bg-[#0D0D0D] border border-white/[0.05] p-6 lg:p-8 flex flex-col h-full rounded-none overflow-hidden">
      {/* Targeting Hover Physics (Compass Style) */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20">
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary"></div>
        <div className="absolute inset-0 border border-primary/20"></div>
      </div>

      {/* Header */}
      <div className="mb-8">
        <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">Concept B</span>
        <h3 className="text-xl font-heading font-bold text-white mt-1">OS Distribution</h3>
        <p className="text-white/40 text-[13px] font-light mt-1">Grouped ranked bars with nested OS rows</p>
      </div>

      {/* Categories Grid */}
      <div className="flex flex-col gap-10">
        {osData.map((category, idx) => (
          <div key={idx} className="flex flex-col gap-4">
            {/* Category Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn("w-3 h-3 rounded-sm", category.color)}></div>
                <span className={cn("text-[16px] font-bold tracking-tight", category.color.replace('bg-', 'text-'))}>
                  {category.name}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[12px] font-medium text-white/40 uppercase tracking-wider">
                <span>{category.percentage}%</span>
                <span className="text-white/10">•</span>
                <span>{category.assetsCount} assets</span>
              </div>
            </div>

            {/* Category Main Bar */}
            <div className="h-1.5 w-full bg-white/[0.03] relative overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${category.percentage}%` }}
                transition={{ duration: 1, delay: idx * 0.2, ease: [0.23, 1, 0.32, 1] }}
                className={cn("absolute inset-y-0 left-0", category.color)}
              />
            </div>

            {/* Nested Sub-items */}
            <div className="flex flex-col gap-4 mt-2 px-6">
              {category.details.map((detail, dIdx) => (
                <div key={dIdx} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-medium text-white/40 uppercase tracking-wide">
                      {detail.name}
                    </span>
                    <span className={cn("text-[13px] font-bold", detail.color.replace('bg-', 'text-'))}>
                      {detail.percentage}%
                    </span>
                  </div>
                  <div className="h-[1px] w-full bg-white/[0.03] relative overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${detail.percentage}%` }}
                      transition={{ duration: 1, delay: idx * 0.2 + (dIdx * 0.1), ease: [0.23, 1, 0.32, 1] }}
                      className={cn("absolute inset-y-0 left-0", detail.color)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
