import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../lib/utils';
import { useTheme } from '../../../context/ThemeContext';
import { ArrowUpRight } from 'lucide-react';

interface OSItem {
  name: string;
  percentage: number;
  color: string;
}

interface OSGroup {
  category: string;
  count: number;
  percentage: number;
  color: string;
  items: OSItem[];
}

export const OSDistributionCard: React.FC = () => {
  const { theme } = useTheme();

  const data: OSGroup[] = [
    {
      category: 'Windows',
      count: 898,
      percentage: 50,
      color: '#bef264', // Lime
      items: [
        { name: 'Win 11 Enterprise', percentage: 35, color: '#3b82f6' },
        { name: 'Win 10 LTSC', percentage: 8, color: '#3b82f6' },
        { name: 'Win 11 Pro', percentage: 4, color: '#3b82f6' },
      ]
    },
    {
      category: 'Network devices',
      count: 303,
      percentage: 17,
      color: '#10b981', // Teal
      items: [
        { name: 'HP Ethernet', percentage: 9, color: '#10b981' },
        { name: 'Cisco / Check Point', percentage: 8, color: '#10b981' },
      ]
    },
    {
      category: 'Linux / Unix',
      count: 261,
      percentage: 15,
      color: '#f59e0b', // Orange
      items: [
        { name: 'Red Hat Enterprise', percentage: 10, color: '#f59e0b' },
        { name: 'Linux Kernel 2.6', percentage: 5, color: '#f59e0b' },
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "flex-1 flex flex-col p-8 border transition-all duration-500 rounded-2xl overflow-hidden",
        theme === 'dark' 
          ? "bg-[#0D0D0D] border-white/[0.05]" 
          : "bg-white border-gray-100 shadow-sm"
      )}
    >
      {/* Header Section from Image */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <span className={cn(
            "text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-500",
            theme === 'dark' ? "text-white/20" : "text-gray-400"
          )}>CONCEPT B</span>
          <h3 className={cn(
            "text-xl font-heading font-bold mt-1 transition-colors duration-500",
            theme === 'dark' ? "text-white" : "text-gray-900"
          )}>Grouped ranked bars</h3>
          <p className={cn(
            "text-[13px] font-light mt-1 max-w-[280px] transition-colors duration-500",
            theme === 'dark' ? "text-white/40" : "text-gray-500"
          )}> Family headers with subtotal bars. Individual OS rows nested below. Best for analysts.</p>
        </div>
        <button className={cn(
          "px-5 py-2.5 border text-[13px] font-bold flex items-center gap-2 transition-all group/btn",
          theme === 'dark' 
            ? "border-white/10 text-white hover:bg-white hover:text-black" 
            : "border-gray-200 text-gray-900 hover:bg-gray-900 hover:text-white"
        )}>
          Build this <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* Content Area */}
      <div className="flex flex-col gap-10">
        {data.map((group, groupIdx) => (
          <div key={groupIdx} className="flex flex-col gap-4">
            {/* Category Header */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-[2px]" 
                    style={{ backgroundColor: group.color }}
                  />
                  <span className="text-[14px] font-bold" style={{ color: group.color }}>
                    {group.category}
                  </span>
                </div>
                <span className={cn(
                  "text-[12px] font-mono",
                  theme === 'dark' ? "text-white/40" : "text-gray-400"
                )}>
                  {group.percentage}% · <span className="opacity-60">{group.count} assets</span>
                </span>
              </div>
              
              {/* Thick Main Bar */}
              <div className={cn(
                "h-[4px] w-full relative",
                theme === 'dark' ? "bg-white/[0.03]" : "bg-gray-100"
              )}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${group.percentage}%` }}
                  transition={{ duration: 1.2, delay: groupIdx * 0.2, ease: [0.23, 1, 0.32, 1] }}
                  className="absolute inset-y-0 left-0"
                  style={{ backgroundColor: group.color }}
                />
              </div>
            </div>

            {/* Nested Items */}
            <div className="flex flex-col gap-4 pl-6">
              {group.items.map((item, itemIdx) => (
                <div key={itemIdx} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-end">
                    <span className={cn(
                      "text-[12px] font-medium",
                      theme === 'dark' ? "text-white/50" : "text-gray-600"
                    )}>
                      {item.name}
                    </span>
                    <span className="text-[12px] font-bold font-mono" style={{ color: item.color }}>
                      {item.percentage}%
                    </span>
                  </div>
                  
                  {/* Thin Sub Bar */}
                  <div className={cn(
                    "h-[2px] w-full relative",
                    theme === 'dark' ? "bg-white/[0.03]" : "bg-gray-100"
                  )}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ 
                        duration: 1, 
                        delay: 0.5 + (groupIdx * 0.2) + (itemIdx * 0.1),
                        ease: [0.23, 1, 0.32, 1] 
                      }}
                      className="absolute inset-y-0 left-0"
                      style={{ backgroundColor: item.color, opacity: theme === 'dark' ? 0.6 : 1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer from original card (optional, but good for context) */}
      <div className={cn(
        "mt-auto pt-8 border-t flex items-center justify-between transition-colors duration-500",
        theme === 'dark' ? "border-white/[0.05]" : "border-gray-50"
      )}>
        <span className={cn(
          "text-[10px] font-medium transition-colors duration-500",
          theme === 'dark' ? "text-white/20" : "text-gray-300"
        )}>last updated: just now</span>
        <button className={cn(
          "text-[10px] font-bold uppercase tracking-widest hover:text-primary transition-colors",
          theme === 'dark' ? "text-white/40" : "text-gray-400"
        )}>View Full Report</button>
      </div>
    </motion.div>
  );
};
