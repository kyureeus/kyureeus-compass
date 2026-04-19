import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles,
  LayoutGrid, 
  Cpu, 
  Shield, 
  Box, 
  Database,
  Sun,
  LogOut
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../../lib/utils';

type MenuItem = {
  icon: React.ElementType;
  label: string;
  path: string;
  badge?: string;
};

type MenuSection = {
  title?: string;
  divider?: boolean;
  items: MenuItem[];
};

const menuSections: MenuSection[] = [
  {
    title: "Tenable Assets",
    items: [
      { icon: LayoutGrid, label: 'IT Assets', path: '/asset-inventory/it-assets' },
      { icon: Cpu, label: 'OT Assets', path: '/asset-inventory/ot-assets' },
      { icon: Shield, label: 'Network', path: '/asset-inventory/network' },
      { icon: Box, label: 'IoT / Peripherals', path: '/asset-inventory/iot' },
      { icon: Database, label: 'Unclassified', path: '/asset-inventory/unclassified' },
    ]
  },
  {
    title: "NinjaOne Assets",
    divider: true,
    items: [
      { icon: LayoutGrid, label: 'Managed Endpoints', path: '/asset-inventory/endpoints' },
      { icon: Shield, label: 'Security Compliance', path: '/asset-inventory/compliance' },
    ]
  }
];

const footerItems = [
  // { icon: ArrowLeftCircle, label: 'Back to Hub', path: '/' },
  { icon: Sun, label: 'Light Mode', path: '#', onClick: () => console.log('Toggle Light Mode') },
  { icon: LogOut, label: 'Logout', path: '/logout' },
];

export const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  const isItemActive = (path: string) => location.pathname === path;

  // Compass Global primary color (Purple)
  const activeColor = "text-primary";
  const activeBg = "bg-primary/10";

  return (
    <motion.aside
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      initial={false}
      animate={{ width: isExpanded ? 280 : 80 }}
      className="relative flex flex-col h-screen bg-[#0A0A0A] border-r border-white/5 z-50 overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
    >
      {/* Sidebar Header */}
      <div className="h-20 min-h-[5rem] flex items-center px-8 shrink-0">
        <Sparkles className="text-white shrink-0" size={20} strokeWidth={1.5} />
        <motion.span 
          initial={false}
          animate={{ opacity: isExpanded ? 1 : 0, width: isExpanded ? 'auto' : 0 }}
          className="ml-4 font-heading font-semibold text-lg text-white whitespace-nowrap overflow-hidden tracking-wide"
        >
          Menu
        </motion.span>
      </div>

      {/* Navigation Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide py-4 px-4 custom-scrollbar">
        <nav className="flex flex-col gap-8">
          {menuSections.map((section, sIdx) => (
            <div key={sIdx} className="flex flex-col gap-1 w-full">
              {/* Section Title */}
              <AnimatePresence>
                {isExpanded && section.title && (
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2 whitespace-nowrap"
                  >
                    {section.title}
                  </motion.span>
                )}
              </AnimatePresence>

              {section.items.map((item) => {
                const active = isItemActive(item.path);
                
                return (
                  <Link 
                    key={item.path} 
                    to={item.path}
                    className={cn(
                      "group relative flex items-center h-10 rounded-none px-4 cursor-pointer transition-all duration-200",
                      active 
                        ? cn(activeBg, activeColor) 
                        : "text-white/40 hover:bg-primary/5 hover:text-primary/80"
                    )}
                  >
                    {/* Active Indicator Pillar (Compass Style - Sharp) */}
                    {active && (
                       <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary"></div>
                    )}

                    <item.icon 
                      size={18} 
                      strokeWidth={1.5} 
                      className={cn("shrink-0 transition-colors duration-200", active ? activeColor : "group-hover:text-white")} 
                    />
                    
                    <motion.div 
                      initial={false}
                      animate={{ opacity: isExpanded ? 1 : 0, width: isExpanded ? 'auto' : 0 }}
                      className="ml-4 flex items-center justify-between overflow-hidden whitespace-nowrap"
                    >
                      <span className="font-medium text-[14px]">{item.label}</span>
                    </motion.div>
                    
                    {/* Targeting Corners on Active */}
                    {active && (
                      <div className={cn("absolute inset-0 border border-primary/20")}>
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/40"></div>
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/40"></div>
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </div>

      {/* Footer Area */}
      <div className="p-4 border-t border-white/[0.05] shrink-0 bg-black/40">
        <div className="flex flex-col gap-1">
          {footerItems.map((item) => (
            <Link 
              key={item.label}
              to={item.path}
              onClick={item.onClick}
              className="group flex items-center h-10 px-4 text-white/40 hover:text-white hover:bg-white/[0.03] transition-all rounded-none"
            >
              <item.icon size={18} strokeWidth={1.5} className="shrink-0" />
              <motion.span 
                initial={false}
                animate={{ opacity: isExpanded ? 1 : 0, width: isExpanded ? 'auto' : 0 }}
                className="ml-4 font-medium text-[14px] whitespace-nowrap overflow-hidden"
              >
                {item.label}
              </motion.span>
            </Link>
          ))}
        </div>
      </div>
    </motion.aside>
  );
};
