import { ArrowUpRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import React from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { motion } from 'framer-motion';
import { cn } from '../../../lib/utils';  

interface StatsCardProps {
  title: string;
  value: string;
  trend?: string;
  trendLabel?: string;
  trendType?: 'neutral' | 'positive' | 'negative' | 'warning';
  TrendIcon?: LucideIcon;
  Icon: LucideIcon;
  showUnderline?: boolean;
  delay?: number;
  onClick?: () => void;
}

export const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  trend, 
  trendLabel, 
  trendType = 'neutral', 
  TrendIcon,
  Icon, 
  delay = 0,
  onClick
}) => {
  const { theme } = useTheme();

  const trendColor = {
    neutral: theme === 'dark' ? 'text-white/40' : 'text-gray-400',
    positive: 'text-red-500',
    negative: 'text-red-500',
    warning: 'text-amber-500',
  }[trendType];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.23, 1, 0.32, 1] }}
      onClick={onClick}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden min-h-[160px] rounded-none border transition-all duration-500 p-6",
        theme === 'dark' 
          ? "bg-[#0D0D0D] border-white/[0.05]" 
          : "bg-white border-gray-100 shadow-sm hover:shadow-md",
        onClick && "cursor-pointer active:scale-[0.98]"
      )}
    >
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

      {/* Top Section: Title & Icon */}
      <div className="flex justify-between items-start">
        <span className={cn(
          "text-[13px] font-medium tracking-wide capitalize transition-colors duration-500",
          theme === 'dark' ? "text-white/40" : "text-gray-400"
        )}>{title}</span>
        <div className={cn(
          "shrink-0 transition-colors duration-500",
          theme === 'dark' ? "text-white/60" : "text-gray-300 group-hover:text-primary/70"
        )}>
          <Icon size={20} strokeWidth={1.5} />
        </div>
      </div>

      {/* Middle Section: Value & Trend */}
      <div className="flex flex-col gap-1 mt-auto">
        <div className="relative inline-block w-fit">
          <span className={cn(
            "text-4xl font-heading font-medium tracking-tight leading-none lowercase transition-colors duration-500",
            theme === 'dark' ? "text-white" : "text-gray-900"
          )}>
            {value}
          </span>
        </div>
        
        <div className="flex items-center gap-1.5 mt-2 leading-none">
           {TrendIcon && <TrendIcon size={10} className={trendColor} strokeWidth={2.5} />}
           <div className="flex items-center gap-1">
             {trend && (
              <span className={cn("text-[9px] font-bold tracking-normal lowercase", trendColor)}>{trend}</span>
            )}
            {trendLabel && (
              <span className={cn(
                "text-[9px] font-medium tracking-normal lowercase transition-colors duration-500",
                theme === 'dark' ? "text-white/40" : "text-gray-400"
              )}>
                {trendLabel}
              </span>
            )}
           </div>
        </div>
      </div>

      {/* Bottom Section: Action (Hover Only) */}
      <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 text-white/40 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 flex items-center gap-1">
        <span className="text-[9px] text-primary capitalize font-medium">view details</span>
        <ArrowUpRight className=' text-primary' size={10} />
      </div>
    </motion.div>
  );
};
