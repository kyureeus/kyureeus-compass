import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles,
  Link2, 
  Shield, 
  Layers, 
  ShieldAlert,
  Sun,
  Moon,
  LogOut
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../../lib/utils';
import { useTheme } from '../../../context/ThemeContext';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const tabs = [
    { 
      id: 'unified', 
      label: 'Unified Asset Inventory', 
      icon: Link2, 
      activeColor: 'text-primary', 
      activeBg: theme === 'dark' ? 'bg-primary/10' : 'bg-primary/5',
    },
    { 
      id: 'tenable', 
      label: 'Tenable Classification', 
      icon: Shield, 
      activeColor: 'text-[#f97316]', 
      activeBg: theme === 'dark' ? 'bg-[#f97316]/10' : 'bg-[#f97316]/5',
    },
    { 
      id: 'ninjaone', 
      label: 'NinjaOne Classification', 
      icon: Layers, 
      activeColor: 'text-[#8b5cf6]', 
      activeBg: theme === 'dark' ? 'bg-[#8b5cf6]/10' : 'bg-[#8b5cf6]/5',
    },
    { 
      id: 'crowdstrike', 
      label: 'CrowdStrike Classification', 
      icon: ShieldAlert, 
      activeColor: 'text-[#ff0000]', 
      activeBg: theme === 'dark' ? 'bg-[#ff0000]/10' : 'bg-[#ff0000]/5',
    },
  ];

  return (
    <motion.aside
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      initial={false}
      animate={{ width: isExpanded ? 280 : 80 }}
      className={cn(
        "relative flex flex-col h-screen z-50 overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] border-r transition-colors duration-500",
        theme === 'dark' ? "bg-[#0A0A0A] border-white/5" : "bg-white border-gray-200 shadow-xl"
      )}
    >
      {/* Sidebar Header */}
      <div className="h-20 min-h-[5rem] flex items-center px-8 shrink-0">
        <Sparkles className={cn("shrink-0", theme === 'dark' ? "text-white" : "text-primary")} size={20} strokeWidth={1.5} />
        <motion.span 
          initial={false}
          animate={{ opacity: isExpanded ? 1 : 0, width: isExpanded ? 'auto' : 0 }}
          className={cn(
            "ml-4 font-heading font-semibold text-lg whitespace-nowrap overflow-hidden tracking-wide transition-colors duration-500",
            theme === 'dark' ? "text-white" : "text-gray-900"
          )}
        >
          Menu
        </motion.span>
      </div>

      {/* Navigation Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide py-4 px-4 custom-scrollbar">
        <nav className="flex flex-col gap-2 w-full">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            
            return (
              <button 
                key={tab.id} 
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "group relative flex items-center h-12 w-full rounded-none px-4 cursor-pointer transition-all duration-200 border-none",
                  active 
                    ? cn(tab.activeBg, tab.activeColor) 
                    : theme === 'dark' 
                      ? "text-white/40 hover:bg-white/5 hover:text-white/80"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                {/* Active Indicator Pillar */}
                {active && (
                   <div className={cn("absolute left-0 top-0 bottom-0 w-[2px]", tab.activeColor.replace('text-', 'bg-'))}></div>
                )}

                <tab.icon 
                  size={18} 
                  strokeWidth={1.5} 
                  className={cn(
                    "shrink-0 transition-colors duration-200", 
                    active 
                      ? tab.activeColor 
                      : theme === 'dark' ? "group-hover:text-white" : "group-hover:text-gray-900"
                  )} 
                />
                
                <motion.div 
                  initial={false}
                  animate={{ opacity: isExpanded ? 1 : 0, width: isExpanded ? 'auto' : 0 }}
                  className="ml-4 flex items-center justify-between overflow-hidden whitespace-nowrap"
                >
                  <span className="font-medium text-[14px]">{tab.label}</span>
                </motion.div>
                
                {/* Targeting Corners on Active */}
                {active && (
                  <div className={cn("absolute inset-0 border", theme === 'light' ? "border-black/5" : "border-white/5")}>
                    <div className={cn("absolute top-0 left-0 w-2 h-2 border-t border-l", theme === 'light' ? "border-black/10" : "border-white/10")}></div>
                    <div className={cn("absolute bottom-0 right-0 w-2 h-2 border-b border-r", theme === 'light' ? "border-black/10" : "border-white/10")}></div>
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Area */}
      <div className={cn(
        "p-4 border-t shrink-0 transition-colors duration-500",
        theme === 'dark' ? "border-white/[0.05] bg-black/40" : "border-gray-100 bg-gray-50/50"
      )}>
        <div className="flex flex-col gap-1">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className={cn(
              "group flex items-center h-10 px-4 transition-all rounded-none w-full",
              theme === 'dark' ? "text-white/40 hover:text-white hover:bg-white/[0.03]" : "text-gray-500 hover:text-primary hover:bg-primary/5"
            )}
          >
            {theme === 'dark' ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
            <motion.span 
              initial={false}
              animate={{ opacity: isExpanded ? 1 : 0, width: isExpanded ? 'auto' : 0 }}
              className="ml-4 font-medium text-[14px] whitespace-nowrap overflow-hidden"
            >
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </motion.span>
          </button>

          {/* Logout */}
          <Link 
            to="/logout"
            className={cn(
              "group flex items-center h-10 px-4 transition-all rounded-none",
              theme === 'dark' ? "text-white/40 hover:text-white hover:bg-white/[0.03]" : "text-gray-500 hover:text-primary hover:bg-primary/5"
            )}
          >
            <LogOut size={18} strokeWidth={1.5} className="shrink-0" />
            <motion.span 
              initial={false}
              animate={{ opacity: isExpanded ? 1 : 0, width: isExpanded ? 'auto' : 0 }}
              className="ml-4 font-medium text-[14px] whitespace-nowrap overflow-hidden"
            >
              Logout
            </motion.span>
          </Link>
        </div>
      </div>
    </motion.aside>
  );
};
