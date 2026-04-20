import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../lib/utils';
import { ArrowUpRight } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

interface RiskTier {
  label: string;
  scoreRange: string;
  count: number;
  telemetry: string;
  actionLabel: string;
  fillPercentage: number;
  color: string;
  dotColor: string;
}

const riskData: RiskTier[] = [
  {
    label: 'Critical',
    scoreRange: 'score ≥ 8',
    count: 0,
    telemetry: 'maintain vigilance',
    actionLabel: 'Watch',
    fillPercentage: 100,
    color: 'bg-[#ef4444]/10',
    dotColor: 'text-[#ef4444]',
  },
  {
    label: 'High',
    scoreRange: 'score 6-7',
    count: 10,
    telemetry: '9% · patch soon',
    actionLabel: '7 days',
    fillPercentage: 90,
    color: 'bg-[#f59e0b]/10',
    dotColor: 'text-[#f59e0b]',
  },
  {
    label: 'Medium',
    scoreRange: 'score 4-5',
    count: 57,
    telemetry: '52% · monitor',
    actionLabel: '30 days',
    fillPercentage: 55,
    color: 'bg-[#bef264]/10',
    dotColor: 'text-[#bef264]',
  },
  {
    label: 'Low',
    scoreRange: 'score < 4',
    count: 13,
    telemetry: '12% · healthy',
    actionLabel: '90 days',
    fillPercentage: 35,
    color: 'bg-[#14b8a6]/10',
    dotColor: 'text-[#14b8a6]',
  },
  {
    label: 'No score',
    scoreRange: 'unassessed',
    count: 30,
    telemetry: '27% · blind spot',
    actionLabel: 'Scan now',
    fillPercentage: 27,
    color: 'bg-[#f97316]/10',
    dotColor: 'text-[#f97316]',
  }
];

export const RiskScoreCard: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={cn(
      "group relative p-6 lg:p-8 flex flex-col h-full rounded-none overflow-hidden border transition-colors duration-500",
      theme === 'dark' ? "bg-[#0D0D0D] border-white/[0.05]" : "bg-white border-gray-100 shadow-sm"
    )}>
      {/* Targeting Hover Physics (Compass Style) */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20">
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary"></div>
        <div className="absolute inset-0 border border-primary/20"></div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <span className={cn("text-[10px] uppercase tracking-[0.2em] font-bold transition-colors duration-500", theme === 'dark' ? "text-white/30" : "text-gray-400")}>Device risk levels</span>
          <h3 className={cn("text-xl font-heading font-bold mt-1 capitalize transition-colors duration-500", theme === 'dark' ? "text-white" : "text-gray-900")}>ACR Risk Score</h3>
          <p className={cn("text-[13px] font-light mt-1 transition-colors duration-500", theme === 'dark' ? "text-white/40" : "text-gray-500")}>Tiered risk analysis by asset urgency</p>
        </div>
        <button className={cn(
          "px-5 py-2.5 border text-[13px] font-bold flex items-center gap-2 transition-all group/btn",
          theme === 'dark' 
            ? "border-white/10 text-white hover:bg-white hover:text-black" 
            : "border-gray-200 text-gray-900 hover:bg-gray-900 hover:text-white"
        )}>
          View more <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* Funnel List */}
      <div className="flex flex-col gap-2 flex-grow">
        {riskData.map((tier, idx) => (
          <div 
            key={idx} 
            className={cn(
              "relative group/row flex items-center min-h-[64px] px-8 rounded-none border-b overflow-hidden shadow-inner transition-colors duration-500",
              theme === 'dark' ? tier.color : tier.color.replace('/10', '/5'),
              theme === 'dark' ? "border-white/[0.05]" : "border-gray-50"
            )}
          >
            {/* Animated Background Fill */}
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${tier.fillPercentage}%` }}
              transition={{ duration: 1.5, delay: idx * 0.1, ease: [0.23, 1, 0.32, 1] }}
              className={cn(
                "absolute inset-y-0 left-0 z-0 opacity-20 transition-colors duration-500",
                theme === 'dark' ? tier.color.replace('/10', '/35') : tier.color.replace('/10', '/40')
              )}
              style={{ backgroundColor: tier.dotColor.replace('text-', '') }}
            />

            <div className="relative z-10 w-full flex items-center justify-between">
              {/* Left: Indicator & Status */}
              <div className="flex items-center gap-4">
                <div 
                  className={cn("w-3 h-3 rounded-full shrink-0 shadow-[0_0_15px_rgba(0,0,0,0.5)] animate-pulse")} 
                  style={{ backgroundColor: tier.dotColor.replace('text-', '') }}
                />
                <div className="flex flex-col leading-tight">
                  <span className={cn("text-[15px] font-bold capitalize transition-colors duration-500")} style={{ color: theme === 'dark' ? tier.dotColor.replace('text-', '') : undefined }}>
                    <span className={cn(theme === 'dark' ? "" : "text-gray-900")}>{tier.label}</span>
                  </span>
                  <span className={cn("text-[11px] font-medium lowercase transition-colors duration-500", theme === 'dark' ? "text-white/40" : "text-gray-400")}>{tier.scoreRange}</span>
                </div>
              </div>

              {/* Center: Count & Integrated Telemetry */}
              <div className="flex flex-col items-center relative pr-[15%]">
                <span className={cn("text-[20px] font-heading font-bold transition-colors duration-500", theme === 'dark' ? "text-white" : "text-gray-900")}>{tier.count}</span>
                <span className={cn("text-[11px] font-medium lowercase absolute -bottom-3 whitespace-nowrap transition-colors duration-500", theme === 'dark' ? "text-white/40" : "text-gray-400")}>
                  {tier.telemetry}
                </span>
              </div>

              {/* Right: Action Pill */}
              <div className="min-w-[100px] flex justify-end">
                <div className={cn(
                  "px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wider transition-colors duration-500 border",
                  theme === 'dark' 
                    ? "bg-black/40 border-white/5 text-white/60" 
                    : "bg-white border-gray-200 text-gray-400"
                )}>
                  {tier.actionLabel.toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
