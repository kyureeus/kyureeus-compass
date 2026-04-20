import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Laptop, Monitor, MonitorSmartphone, Settings, Cpu, Router as RouterIcon, Server, Camera, Activity, Info } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { useTheme } from '../../../context/ThemeContext';

interface SubCategory {
  name: string;
  count: string;
  percentage: number;
  Icon: any;
}

interface AgentCategory {
  name: string;
  totalAssets: number;
  coveredAssets: number;
  percentage: number;
  color: string;
  subCategories: SubCategory[];
}

const categories: AgentCategory[] = [
  {
    name: 'IT',
    totalAssets: 1200,
    coveredAssets: 800,
    percentage: 67,
    color: 'text-blue-500',
    subCategories: [
      { name: 'Laptops', count: '574 / 820', percentage: 70, Icon: Laptop },
      { name: 'Desktops', count: '136 / 210', percentage: 65, Icon: Monitor },
      { name: 'Workstations', count: '90 / 170', percentage: 53, Icon: MonitorSmartphone }
    ]
  },
  {
    name: 'OT',
    totalAssets: 320,
    coveredAssets: 150,
    percentage: 47,
    color: 'text-orange-500',
    subCategories: [
      { name: 'PLC Devices', count: '99 / 180', percentage: 55, Icon: Settings },
      { name: 'SCADA Systems', count: '51 / 140', percentage: 36, Icon: Cpu }
    ]
  },
  {
    name: 'Network',
    totalAssets: 180,
    coveredAssets: 90,
    percentage: 50,
    color: 'text-teal-500',
    subCategories: [
      { name: 'Routers', count: '60 / 110', percentage: 55, Icon: RouterIcon },
      { name: 'Switches', count: '30 / 70', percentage: 43, Icon: Server }
    ]
  },
  {
    name: 'IoT',
    totalAssets: 118,
    coveredAssets: 39,
    percentage: 33,
    color: 'text-purple-500',
    subCategories: [
      { name: 'Cameras', count: '24 / 59', percentage: 41, Icon: Camera },
      { name: 'Sensors', count: '15 / 59', percentage: 25, Icon: Activity }
    ]
  }
];

interface AgentCoverageDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AgentCoverageDialog: React.FC<AgentCoverageDialogProps> = ({ isOpen, onClose }) => {
  const { theme } = useTheme();

  const getStatusColor = (percentage: number) => {
    if (percentage >= 65) return 'bg-emerald-500';
    if (percentage >= 45) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  const getStatusTextColor = (percentage: number) => {
    if (percentage >= 65) return 'text-emerald-500';
    if (percentage >= 45) return 'text-amber-500';
    return 'text-rose-500';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
          />

          {/* Dialog Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={cn(
              "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl border shadow-2xl z-[110] flex flex-col max-h-[90vh] overflow-hidden rounded-none transition-all duration-500",
              theme === 'dark' ? "bg-[#050505] border-white/[0.05]" : "bg-white border-gray-200"
            )}
          >
            {/* Header Area */}
            <div className={cn(
              "px-8 pt-8 pb-4 flex flex-col transition-colors duration-500",
            )}>
              <div className="flex justify-between items-start mb-6">
                <div className="flex flex-col">
                  <span className={cn(
                    "text-[10px] uppercase font-bold tracking-[0.3em] mb-1 opacity-40",
                    theme === 'dark' ? "text-white" : "text-gray-900"
                  )}>Cybersecurity · Agent Coverage</span>
                  <h2 className={cn(
                    "text-4xl font-heading font-bold tracking-tight",
                    theme === 'dark' ? "text-white" : "text-gray-900"
                  )}>Agent coverage</h2>
                </div>
                
                <div className="flex gap-4">
                  <div className={cn(
                    "px-4 py-3 border flex flex-col gap-0.5 min-w-[120px]",
                    theme === 'dark' ? "bg-white/[0.02] border-white/[0.05]" : "bg-gray-50 border-gray-100"
                  )}>
                    <span className="text-[10px] uppercase font-bold opacity-40">Overall</span>
                    <div className="flex items-baseline gap-2">
                       <span className="text-xl font-bold">54%</span>
                       <span className="text-[10px] opacity-40">1,079 / 1,818</span>
                    </div>
                  </div>
                  
                  <div className={cn(
                    "px-4 py-3 border flex flex-col gap-0.5 min-w-[120px]",
                    theme === 'dark' ? "bg-white/[0.02] border-white/[0.05]" : "bg-gray-50 border-gray-100"
                  )}>
                    <span className="text-[10px] uppercase font-bold opacity-40">Unprotected</span>
                    <div className="flex items-baseline gap-2">
                       <span className="text-xl font-bold text-rose-500">739</span>
                       <span className="text-[10px] opacity-40">assets at risk</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={onClose}
                    className={cn(
                      "p-2 self-start transition-all",
                      theme === 'dark' ? "text-white/20 hover:text-white" : "text-gray-400 hover:text-gray-900"
                    )}
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Top Selector Tabs (Mockup style) */}
              <div className="flex gap-1 mb-8">
                {categories.map((cat, idx) => (
                  <div 
                    key={idx}
                    className={cn(
                      "flex-1 p-4 border flex flex-col gap-1 transition-all duration-300",
                      theme === 'dark' ? "bg-white/[0.02] border-white/[0.05]" : "bg-gray-50 border-gray-100 hover:bg-gray-100",
                      idx === 0 && (theme === 'dark' ? "bg-blue-900/20 border-blue-500/30" : "bg-blue-50 border-blue-200")
                    )}
                  >
                    <span className={cn("text-[10px] font-bold uppercase", cat.color)}>{cat.name}</span>
                    <span className="text-2xl font-bold leading-none">{cat.percentage}%</span>
                    <span className="text-[10px] opacity-40 font-medium">{cat.totalAssets.toLocaleString()} assets</span>
                    <div className={cn("h-1 w-full mt-2", theme === 'dark' ? "bg-white/5" : "bg-gray-200")}>
                      <div className={cn("h-full", cat.color.replace('text-', 'bg-'))} style={{ width: `${cat.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Legend & Filter Bar */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-4">
                   <button className={cn("px-4 py-2 text-[11px] font-bold uppercase border", theme === 'dark' ? "bg-white/5 border-white/10" : "bg-white border-gray-200")}>Coverage %</button>
                   <button className={cn("px-4 py-2 text-[11px] font-bold uppercase border", theme === 'dark' ? "bg-transparent border-white/5 opacity-40 hover:opacity-100" : "bg-transparent border-gray-100 opacity-40")}>Covered</button>
                   <button className={cn("px-4 py-2 text-[11px] font-bold uppercase border", theme === 'dark' ? "bg-transparent border-white/5 opacity-40 hover:opacity-100" : "bg-transparent border-gray-100 opacity-40")}>Critical gap</button>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[11px] font-medium opacity-60">≥ 65% Healthy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="text-[11px] font-medium opacity-60">45–64% Monitor</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-rose-500" />
                    <span className="text-[11px] font-medium opacity-60">{"< 45% Critical"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-8 pt-0">
               <div className="grid grid-cols-2 gap-6">
                  {categories.map((cat, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + idx * 0.1 }}
                      className={cn(
                        "p-6 border transition-all duration-500 relative overflow-hidden group",
                        theme === 'dark' ? "bg-white/[0.01] border-white/[0.05]" : "bg-white border-gray-100 shadow-sm"
                      )}
                    >
                      {/* Category Title & Summary */}
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className={cn("text-lg font-bold", theme === 'dark' ? "text-white" : "text-gray-900")}>{cat.name}</h3>
                          <span className="text-[11px] opacity-40 font-medium">{cat.totalAssets.toLocaleString()} total assets</span>
                        </div>
                        <div className="text-right">
                          <span className={cn("text-2xl font-black block leading-none", getStatusTextColor(cat.percentage))}>{cat.percentage}%</span>
                          <span className={cn("text-[10px] font-bold block mt-1", getStatusTextColor(cat.percentage))}>{cat.coveredAssets} of {cat.totalAssets} covered</span>
                        </div>
                      </div>

                      {/* Main Category Progress Bar */}
                      <div className={cn("h-1.5 w-full rounded-full overflow-hidden mb-8", theme === 'dark' ? "bg-white/5" : "bg-gray-100")}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${cat.percentage}%` }}
                          transition={{ duration: 1, delay: 0.4 + idx * 0.1 }}
                          className={cn("h-full", getStatusColor(cat.percentage))}
                        />
                      </div>

                      {/* Sub-categories */}
                      <div className="flex flex-col gap-6">
                        {cat.subCategories.map((sub, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-4">
                            <div className={cn(
                              "w-10 h-10 flex items-center justify-center border",
                              theme === 'dark' ? "bg-white/[0.03] border-white/[0.05]" : "bg-gray-50 border-gray-100"
                            )}>
                              <sub.Icon size={18} className="opacity-60" />
                            </div>
                            <div className="flex-1 flex flex-col gap-1.5">
                              <div className="flex items-center justify-between">
                                <span className={cn("text-[13px] font-medium", theme === 'dark' ? "text-white" : "text-gray-900")}>{sub.name}</span>
                                <div className="flex flex-col items-end">
                                  <span className={cn("text-[13px] font-bold px-1.5 py-0.5 rounded-sm", 
                                    sub.percentage >= 65 ? "bg-emerald-500/10 text-emerald-500" : 
                                    sub.percentage >= 45 ? "bg-amber-500/10 text-amber-500" : 
                                    "bg-rose-500/10 text-rose-500")}>
                                    {sub.percentage}%
                                  </span>
                                  <span className="text-[10px] opacity-40 font-mono mt-1">{sub.count}</span>
                                </div>
                              </div>
                              <div className={cn("h-1 w-full rounded-full overflow-hidden", theme === 'dark' ? "bg-white/5" : "bg-gray-100")}>
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${sub.percentage}%` }}
                                  transition={{ duration: 0.8, delay: 0.6 + (idx * 0.1) + (sIdx * 0.1) }}
                                  className={cn("h-full", getStatusColor(sub.percentage))}
                                />
                                <div className="w-[40%] h-full bg-white/5 invisible" /> {/* Spacer for UI fidelity */}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
               </div>
            </div>

            {/* Footer */}
            <div className={cn(
              "px-8 py-6 border-t flex justify-between items-center transition-colors duration-500",
              theme === 'dark' ? "border-white/[0.05] bg-white/[0.01]" : "border-gray-50 bg-gray-50/50"
            )}>
              <div className="flex items-center gap-2">
                 <Info size={14} className="opacity-40" />
                 <span className="text-[10px] font-medium opacity-40">Agent coverage reflects assets with Kyureeus Sensor active and reporting within the last 24 hours.</span>
              </div>
              <button 
                 onClick={onClose}
                 className={cn(
                   "px-8 py-2.5 text-[12px] font-bold uppercase tracking-widest transition-all",
                   theme === 'dark' ? "bg-white text-black hover:bg-white/90" : "bg-gray-900 text-white hover:bg-gray-800"
                 )}
              >
                Close View
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
