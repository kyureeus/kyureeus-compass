import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles,
  LayoutDashboard, 
  MessageSquareWarning, 
  Plug, 
  Server, 
  Folder, 
  Users, 
  Compass,
  FolderOpen
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../../lib/utils';

type SubItem = {
  icon: React.ElementType;
  activeIcon?: React.ElementType;
  label: string;
  path: string;
};

type MenuItem = {
  icon: React.ElementType;
  label: string;
  path: string;
  badge?: string;
  subItems?: SubItem[];
};

type MenuSection = {
  divider?: boolean;
  items: MenuItem[];
};

const menuSections: MenuSection[] = [
  {
    items: [
      { icon: LayoutDashboard, label: 'Overview', path: '/asset-inventory' },
      { icon: MessageSquareWarning, label: 'Alerts', path: '/asset-inventory/alerts', badge: '2' },
      { icon: Plug, label: 'Integrations', path: '/asset-inventory/integrations' },
    ]
  },
  {
    divider: true,
    items: [
      {
         icon: Server,
         label: 'Asset Classes',
         path: '/asset-inventory/cloud',
         subItems: [
           { icon: Folder, activeIcon: FolderOpen, label: 'Servers & Compute', path: '/asset-inventory/cloud/servers' },
           { icon: Folder, activeIcon: FolderOpen, label: 'Network Devices', path: '/asset-inventory/cloud/network' },
           { icon: Folder, activeIcon: FolderOpen, label: 'Storage Arrays', path: '/asset-inventory/cloud/storage' },
         ]
      }
    ]
  },
  {
    divider: true,
    items: [
      { icon: Users, label: 'Contacts', path: '/asset-inventory/contacts' },
      { icon: Compass, label: 'Explore', path: '/asset-inventory/explore' },
    ]
  }
];

export const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  // Helper to check if a parent is technically active because a child is active
  const isItemActive = (path: string) => location.pathname === path;
  const isGroupActive = (item: MenuItem) => 
    isItemActive(item.path) || (item.subItems ? item.subItems.some(s => isItemActive(s.path)) : false);

  return (
    <motion.aside
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      initial={false}
      animate={{ width: isExpanded ? 280 : 80 }}
      className="relative flex flex-col h-screen bg-[#0A0A0A]/90 backdrop-blur-2xl border-r border-white/5 z-50 overflow-x-hidden overflow-y-auto transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
    >
      {/* Header aligned with reference (Sparkles + Menu) */}
      <div className="h-20 min-h-[5rem] flex items-center px-8 shrink-0">
        <Sparkles className="text-white shrink-0" size={24} strokeWidth={1.5} />
        <motion.span 
          initial={false}
          animate={{ opacity: isExpanded ? 1 : 0, width: isExpanded ? 'auto' : 0 }}
          className="ml-4 font-heading font-semibold text-lg text-white whitespace-nowrap overflow-hidden tracking-wide"
        >
          Menu
        </motion.span>
      </div>

      <nav className="flex-1 py-4 flex flex-col gap-6 px-4">
        {menuSections.map((section, sIdx) => (
          <div key={sIdx} className="flex flex-col gap-1 w-full">
            {section.divider && (
              <div className="w-full h-px bg-white/[0.05] mb-5 mt-4"></div>
            )}
            
            {section.items.map((item) => {
              const active = isGroupActive(item);
              
              return (
                <div key={item.path} className="flex flex-col w-full">
                  {/* Parent Link */}
                  <Link 
                    to={item.path}
                    className={cn(
                      "group relative flex items-center h-12 rounded-none px-4 cursor-pointer transition-colors duration-200",
                      active ? "bg-white/10 text-white" : "text-white/50 hover:bg-white/[0.03] hover:text-white"
                    )}
                  >
                    <item.icon 
                      size={20} 
                      strokeWidth={1.5} 
                      className={cn("shrink-0 transition-colors duration-200", active ? "text-white" : "group-hover:text-white/80")} 
                    />
                    
                    <motion.div 
                      initial={false}
                      animate={{ opacity: isExpanded ? 1 : 0, width: isExpanded ? '100%' : 0 }}
                      className="ml-4 flex items-center justify-between overflow-hidden whitespace-nowrap"
                    >
                      <span className="font-medium text-[15px]">{item.label}</span>
                      
                      {/* Optional Badge */}
                      {item.badge && (
                        <span className="bg-black text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full mr-2">
                          {item.badge}
                        </span>
                      )}
                    </motion.div>
                  </Link>

                  {/* Sub Items Dropdown block (only visible if sidebar is expanded and parent is active, or if we just want it persistently open when expanded) */}
                  <AnimatePresence>
                    {item.subItems && isExpanded && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        {/* Wrapper for the tracking line and items */}
                        <div className="ml-6 pl-5 mt-2 flex flex-col gap-1 border-l border-white/[0.07]">
                          {item.subItems.map((subItem) => {
                            const isSubActive = isItemActive(subItem.path);
                            const IconToUse = isSubActive && subItem.activeIcon ? subItem.activeIcon : subItem.icon;
                            
                            return (
                              <Link 
                                key={subItem.path}
                                to={subItem.path}
                                className={cn(
                                  "group flex items-center h-10 px-3 cursor-pointer rounded-none transition-colors duration-200 whitespace-nowrap",
                                  isSubActive ? "bg-white/10 text-white" : "text-white/50 hover:bg-white/[0.03] hover:text-white"
                                )}
                              >
                                <IconToUse size={16} strokeWidth={1.5} className="shrink-0" />
                                <span className="ml-3 font-medium text-sm">{subItem.label}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        ))}
      </nav>
    </motion.aside>
  );
};
