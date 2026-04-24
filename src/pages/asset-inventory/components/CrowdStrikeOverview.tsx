import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, ShieldCheck, Zap, Activity, Target, Lock, Eye, AlertCircle } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { cn } from '../../../lib/utils';
import { StatsCard } from './StatsCard';

export const CrowdStrikeOverview: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col gap-12 animate-in zoom-in-95 duration-700">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#ff0000]/10 text-[#ff0000] border border-[#ff0000]/20">
            <ShieldAlert size={20} />
          </div>
          <h2 className={cn(
            "text-3xl font-heading font-bold tracking-tight",
            theme === 'dark' ? "text-white" : "text-gray-900"
          )}>CrowdStrike Falcon Insight</h2>
        </div>
        <p className={cn(
          "text-sm opacity-50 max-w-2xl mt-2",
          theme === 'dark' ? "text-white" : "text-gray-900"
        )}>
          Next-generation endpoint protection and threat intelligence. 
          Real-time detection, automated response, and adversary tracking across the entire fleet.
        </p>
      </div>

      {/* Security Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatsCard 
          title="Active Sensors"
          value="1,240"
          trend="99.8% Coverage"
          trendType="positive"
          TrendIcon={ShieldCheck}
          Icon={Eye}
          delay={0.1}
        />
        <StatsCard 
          title="Threat Encounters"
          value="0"
          trend="Clean Environment"
          trendType="positive"
          TrendIcon={ShieldCheck}
          Icon={Target}
          delay={0.2}
        />
        <StatsCard 
          title="Avg. Detection Time"
          value="1.2m"
          trend="Ultra Low"
          trendType="positive"
          TrendIcon={Zap}
          Icon={Activity}
          delay={0.3}
        />
        <StatsCard 
          title="Prevented Attacks"
          value="42"
          trend="Last 30 Days"
          trendType="neutral"
          TrendIcon={Lock}
          Icon={ShieldCheck}
          delay={0.4}
        />
      </div>

      {/* Security Fabric Visual Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={cn(
          "p-8 border flex flex-col gap-8 relative overflow-hidden",
          theme === 'dark' ? "bg-white/[0.02] border-white/[0.05]" : "bg-white border-gray-100 shadow-sm"
        )}>
          <div className="flex justify-between items-center">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#ff0000]">Live Threat Map</span>
            <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#ff0000] animate-pulse" />
                 <span className="text-[10px] font-bold opacity-60">Real-time Stream</span>
            </div>
          </div>
          
          <div className="flex-1 flex items-center justify-center min-h-[300px]">
             {/* Abstract Security Mesh UI */}
             <div className="relative w-full h-full flex items-center justify-center opacity-20">
                <div className="absolute inset-0 border border-[#ff0000]/30 rounded-full scale-100" />
                <div className="absolute inset-8 border border-[#ff0000]/20 rounded-full scale-90" />
                <div className="absolute inset-16 border border-[#ff0000]/10 rounded-full scale-75" />
                <div className="w-1 h-full bg-gradient-to-b from-transparent via-[#ff0000]/40 to-transparent absolute rotate-45" />
                <div className="w-1 h-full bg-gradient-to-b from-transparent via-[#ff0000]/40 to-transparent absolute -rotate-45" />
                <ShieldAlert className="text-[#ff0000] scale-[4] opacity-50" />
             </div>
             
             <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
                <h4 className="text-xl font-bold mb-2">No Active Threats Detected</h4>
                <p className="text-sm opacity-50 max-w-xs">CrowdStrike Falcon is continuously monitoring all 1,240 endpoints for suspicious activity.</p>
             </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
           <div className={cn(
             "p-6 border flex flex-col gap-4",
             theme === 'dark' ? "bg-white/[0.02] border-white/[0.05]" : "bg-white border-gray-100 shadow-sm"
           )}>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#ff0000]">Detection Engine Status</span>
              <div className="space-y-4">
                 {[
                   { label: 'Machine Learning (ML)', value: 100, status: 'Active' },
                   { label: 'Indicator of Attack (IOA)', value: 100, status: 'Active' },
                   { label: 'Exploit Mitigation', value: 100, status: 'Active' },
                   { label: 'Identity Protection', value: 100, status: 'Active' },
                 ].map((eng, i) => (
                   <div key={i} className="flex flex-col gap-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold">{eng.label}</span>
                        <span className="text-[10px] font-bold text-[#ff0000]">{eng.status}</span>
                      </div>
                      <div className={cn("h-1 w-full", theme === 'dark' ? "bg-white/5" : "bg-gray-100")}>
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${eng.value}%` }}
                          transition={{ delay: 0.5 + (i * 0.1), duration: 1.5 }}
                          className="h-full bg-[#ff0000]"
                        />
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className={cn(
             "p-6 border flex-1 flex flex-col gap-4 bg-gradient-to-br",
             theme === 'dark' ? "from-[#ff0000]/5 to-transparent border-white/[0.05]" : "from-[#ff0000]/5 to-transparent border-gray-100"
           )}>
              <div className="flex items-center gap-2">
                 <AlertCircle size={16} className="text-[#ff0000]" />
                 <span className="text-[10px] uppercase font-bold tracking-widest">Adversary Intelligence</span>
              </div>
              <p className="text-xs opacity-60 leading-relaxed">
                CrowdStrike intelligence has identified recent activity from **WIZARD SPIDER** targeting similar infrastructure. All Falcon sensors have been updated with latest IOAs to prevent known ransomware strains.
              </p>
              <button className="mt-auto self-start text-[10px] font-bold uppercase tracking-widest text-[#ff0000] border-b border-[#ff0000]/20 pb-0.5 hover:border-[#ff0000] transition-all">
                 View Intelligence Report
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};
