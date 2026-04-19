import React from 'react';
import { motion } from 'framer-motion';
import { Link2, ShieldCheck, Layers } from 'lucide-react';
import { cn } from '../../../lib/utils';

const tabs = [
  { id: 'unified', label: 'Unified Asset Inventory', icon: Link2 },
  { id: 'tenable', label: 'Tenable Classification', icon: ShieldCheck },
  { id: 'ninjaone', label: 'NinjaOne Classification', icon: Layers },
];

export const DashboardTabs: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('unified');

  return (
    <div className="flex flex-wrap items-center gap-2 mb-8 p-1 bg-white/[0.02] border border-white/[0.05] w-fit">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "group relative flex items-center gap-3 px-5 py-2.5 cursor-pointer transition-all duration-300 rounded-none",
              isActive 
                ? "bg-primary/10 text-primary border border-primary/30" 
                : "text-white/40 hover:text-white/70 border border-transparent hover:border-white/10 hover:bg-white/[0.03]"
            )}
          >
            <tab.icon size={16} strokeWidth={isActive ? 2 : 1.5} className="shrink-0" />
            <span className="text-[12px] font-bold tracking-widest uppercase">
              {tab.label}
            </span>
            
            {/* Selection Indicator on Active */}
            {isActive && (
              <motion.div 
                layoutId="active-tab-bg"
                className="absolute inset-x-0 -bottom-[1px] h-[2px] bg-primary z-10"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};
