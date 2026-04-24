import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Monitor, HardDrive, ShieldCheck, Activity, Search, Filter, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { cn } from '../../../lib/utils';
import { StatsCard } from './StatsCard';

export const NinjaOneOverview: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col gap-12 animate-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#8b5cf6]/10 text-[#8b5cf6] border border-[#8b5cf6]/20">
            <Layers size={20} />
          </div>
          <h2 className={cn(
            "text-3xl font-heading font-bold tracking-tight",
            theme === 'dark' ? "text-white" : "text-gray-900"
          )}>NinjaOne Managed Endpoints</h2>
        </div>
        <p className={cn(
          "text-sm opacity-50 max-w-2xl mt-2",
          theme === 'dark' ? "text-white" : "text-gray-900"
        )}>
          Complete visibility into your RMM ecosystem. Monitoring health, patches, and management 
          status across all distributed endpoints.
        </p>
      </div>

      {/* Managed Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatsCard 
          title="Managed Endpoints"
          value="584"
          trend="↓ 2"
          trendLabel="decommissioned"
          trendType="neutral"
          TrendIcon={Activity}
          Icon={Monitor}
          delay={0.1}
        />
        <StatsCard 
          title="Pending Patches"
          value="12"
          trend="Critical Updates"
          trendType="warning"
          TrendIcon={Activity}
          Icon={HardDrive}
          delay={0.2}
        />
        <StatsCard 
          title="Online Now"
          value="492"
          trend="84% Activity"
          trendType="positive"
          TrendIcon={ShieldCheck}
          Icon={Activity}
          delay={0.3}
        />
        <StatsCard 
          title="Alerts (Last 1H)"
          value="3"
          trend="Managed"
          trendType="positive"
          TrendIcon={ShieldCheck}
          Icon={Activity}
          delay={0.4}
        />
      </div>

      {/* Placeholder Data View */}
      <div className={cn(
        "border p-12 flex flex-col items-center justify-center text-center gap-6 min-h-[400px] border-dashed transition-all duration-500",
        theme === 'dark' ? "bg-white/[0.01] border-white/10" : "bg-gray-50/50 border-gray-200"
      )}>
         <div className="w-16 h-16 rounded-full bg-[#8b5cf6]/10 flex items-center justify-center text-[#8b5cf6] mb-2">
           <Search size={32} strokeWidth={1} />
         </div>
         <div className="flex flex-col gap-2 max-w-md">
           <h3 className="text-xl font-bold">Synchronizing NinjaOne Data</h3>
           <p className="text-sm opacity-50">
             We are currently mapping your NinjaOne RMM assets to the unified inventory. 
             Advanced management metrics and detailed endpoint views will be available shortly.
           </p>
         </div>
         <div className="flex gap-4 mt-4">
            <button className={cn(
              "px-6 py-2 text-[12px] font-bold uppercase tracking-widest border transition-all",
              theme === 'dark' ? "bg-white text-black hover:bg-white/90" : "bg-gray-900 text-white hover:bg-gray-800"
            )}>
              Request Full Sync
            </button>
            <button className={cn(
              "px-6 py-2 text-[12px] font-bold uppercase tracking-widest border transition-all",
              theme === 'dark' ? "bg-transparent border-white/10 hover:bg-white/5" : "bg-transparent border-gray-200 hover:bg-gray-50"
            )}>
              View API Status
            </button>
         </div>
      </div>
    </div>
  );
};
