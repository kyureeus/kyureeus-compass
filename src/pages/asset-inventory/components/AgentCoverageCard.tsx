import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

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
      <div className="flex justify-between items-start mb-8">
        <div>
          <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">Concept 2</span>
          <h3 className="text-xl font-heading font-bold text-white mt-1 capitalize">Two-state counter with OS breakdown</h3>
          <p className="text-white/40 text-[13px] font-light mt-1">Monitored vs blind spot analysis</p>
        </div>
        <button className="px-5 py-2.5 border border-white/10 text-white text-[13px] font-bold flex items-center gap-2 hover:bg-white hover:text-black transition-all group/btn">
          Build <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* Main Dual View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
        {/* Monitored Section */}
        <div className="bg-[#101910] border border-green-500/10 p-6 flex flex-col gap-6 relative overflow-hidden">
          <div className="flex flex-col">
            <span className="text-4xl font-heading font-bold text-[#bef264] tracking-tighter">1,079</span>
            <span className="text-[13px] font-bold text-[#bef264]/60 uppercase tracking-wide mt-1">Monitored</span>
          </div>
          
          <div className="flex flex-col gap-4">
            {monitoredOS.map((os, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <span className="text-[11px] font-medium text-[#bef264]/40 w-16 uppercase">{os.name}</span>
                <div className="flex-grow h-1.5 bg-[#bef264]/5 relative rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${os.percentage}%` }}
                    transition={{ duration: 1.2, delay: idx * 0.1, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute inset-y-0 left-0 bg-[#bef264]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Blind Spot Section */}
        <div className="bg-[#1C0F0F] border border-red-500/10 p-6 flex flex-col gap-6 relative overflow-hidden">
          <div className="flex flex-col">
            <span className="text-4xl font-heading font-bold text-[#ef4444] tracking-tighter">739</span>
            <span className="text-[13px] font-bold text-[#ef4444]/60 uppercase tracking-wide mt-1">Blind spot</span>
          </div>

          <div className="flex flex-col gap-4">
             <span className="text-[11px] font-medium text-[#ef4444]/20 uppercase tracking-widest italic mb-1">Unmonitored by family</span>
            {blindSpotOS.map((os, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <span className="text-[11px] font-medium text-[#ef4444]/30 w-16 uppercase">{os.name}</span>
                <div className="flex-grow h-1.5 bg-[#ef4444]/5 relative rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${os.percentage}%` }}
                    transition={{ duration: 1.2, delay: 0.5 + (idx * 0.1), ease: [0.23, 1, 0.32, 1] }}
                    className="absolute inset-y-0 left-0 bg-[#ef4444]/40"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="mt-8 pt-6 border-t border-white/[0.05] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-[12px] text-white/30 uppercase tracking-widest font-medium">Total fleet</span>
          <span className="text-[16px] text-white font-bold tracking-tight">1,818</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[16px] text-red-500 font-bold tracking-tight">41% GAP</span>
        </div>
      </div>
    </div>
  );
};
