import React from 'react';
import { motion } from 'framer-motion';
import { Link2, Shield, Layers } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { useTheme } from '../../../context/ThemeContext';

export const DashboardTabs: React.FC = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = React.useState('tenable');

  const tabs = [
    { id: 'unified', label: 'Unified Asset Inventory', icon: Link2 },
    { id: 'tenable', label: 'Tenable Classification', icon: Shield, activeColor: 'text-[#f97316]', activeBorder: 'bg-[#f97316]' },
    { id: 'ninjaone', label: 'NinjaOne Classification', icon: Layers },
  ];

  return (
    <div className={cn(
      "flex items-center gap-2 border-b mb-8 transition-colors duration-500",
      theme === 'dark' ? "border-white/[0.05]" : "border-gray-100"
    )}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;
        
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "relative px-6 py-4 transition-all duration-300 group flex items-center gap-3",
              isActive 
                ? tab.activeColor || (theme === 'dark' ? "text-white" : "text-gray-900")
                : theme === 'dark' ? "text-white/30 hover:text-white/60" : "text-gray-400 hover:text-gray-600"
            )}
          >
            <Icon size={18} strokeWidth={isActive ? 2 : 1.5} className="shrink-0" />
            <span className="text-[14px] font-bold tracking-tight whitespace-nowrap">{tab.label}</span>

            {/* Technical Solid Underline Indicator */}
            {isActive && (
              <div className="absolute bottom-[-1px] left-0 right-0 h-[3px]">
                <motion.div
                  layoutId="activeTabUnderline"
                  className={cn("h-[2px] w-full", tab.activeBorder || "bg-primary")}
                />
                {/* Secondary Decorative Strike Line */}
                <motion.div
                  layoutId="activeTabUnderlineStrike"
                  className={cn("h-[1px] w-full mt-[1px] opacity-30", tab.activeBorder || "bg-primary")}
                />
              </div>
            )}

            {/* Background Glow for Active (matching image) */}
            {isActive && tab.id === 'tenable' && (
              <motion.div 
                layoutId="activeTabGlow"
                className="absolute inset-0 bg-[#f97316]/5 -z-10 blur-sm pointer-events-none"
              />
            )}
            
            {/* Darker background for active Tenable (inset feel from image) */}
            {isActive && tab.id === 'tenable' && theme === 'dark' && (
              <motion.div 
                layoutId="activeTabInset"
                className="absolute inset-x-2 inset-y-2 bg-black/40 rounded-lg -z-20 border border-white/5"
              />
            )}
          </button>
        );
      })}
    </div>
  );
};
