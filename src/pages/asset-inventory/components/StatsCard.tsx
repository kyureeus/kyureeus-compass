import React from 'react';
import { motion } from 'framer-motion';
import { type LucideIcon, ArrowUpRight } from 'lucide-react';
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
}

export const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  trend, 
  trendLabel, 
  trendType = 'neutral', 
  TrendIcon,
  Icon, 
  delay = 0 
}) => {
  const trendColor = {
    neutral: 'text-white/40',
    positive: 'text-red-500',
    negative: 'text-red-500',
    warning: 'text-amber-500',
  }[trendType];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.23, 1, 0.32, 1] }}
      className="group relative bg-[#0D0D0D] border border-white/[0.05] p-6 flex flex-col justify-between overflow-hidden min-h-[160px] rounded-none"
    >
      {/* Targeting Hover Physics (Compass Style) */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20">
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary"></div>
        <div className="absolute inset-0 border border-primary/20"></div>
      </div>

      {/* Top Section: Title & Icon */}
      <div className="flex justify-between items-start">
        <span className="text-white/40 text-[13px] font-medium tracking-wide capitalize">{title}</span>
        <div className="text-white/60 shrink-0">
          <Icon size={20} strokeWidth={1.5} />
        </div>
      </div>

      {/* Middle Section: Value & Trend */}
      <div className="flex flex-col gap-1 mt-auto">
        <div className="relative inline-block w-fit">
          <span className="text-4xl font-heading font-medium text-white tracking-tight leading-none lowercase">
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
              <span className="text-white/40 text-[9px] font-medium tracking-normal lowercase">
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
