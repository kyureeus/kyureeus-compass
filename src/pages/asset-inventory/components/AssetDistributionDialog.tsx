import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { useTheme } from '../../../context/ThemeContext';

interface SubCategory {
  name: string;
  count: number;
  percentage: number;
}

interface Category {
  name: string;
  percentage: number;
  totalAssets: number;
  color: string;
  subCategories: SubCategory[];
}

const categories: Category[] = [
  {
    name: 'IT',
    percentage: 66,
    totalAssets: 1200,
    color: 'bg-blue-500',
    subCategories: [
      { name: 'Laptops', count: 820, percentage: 45 },
      { name: 'Desktops', count: 210, percentage: 12 },
      { name: 'Workstations', count: 170, percentage: 9 }
    ]
  },
  {
    name: 'OT',
    percentage: 18,
    totalAssets: 320,
    color: 'bg-orange-500',
    subCategories: [
      { name: 'PLC devices', count: 180, percentage: 10 },
      { name: 'SCADA systems', count: 140, percentage: 8 }
    ]
  },
  {
    name: 'Network',
    percentage: 10,
    totalAssets: 180,
    color: 'bg-teal-500',
    subCategories: [
      { name: 'Routers', count: 110, percentage: 6 },
      { name: 'Switches', count: 70, percentage: 4 }
    ]
  },
  {
    name: 'IoT',
    percentage: 6,
    totalAssets: 118,
    color: 'bg-purple-500',
    subCategories: [
      { name: 'Cameras', count: 59, percentage: 3 },
      { name: 'Sensors', count: 59, percentage: 3 }
    ]
  }
];

interface AssetDistributionDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AssetDistributionDialog: React.FC<AssetDistributionDialogProps> = ({ isOpen, onClose }) => {
  const { theme } = useTheme();

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
            className="fixed inset-0 bg-black/60 backdrop-blur-xl z-[100]"
          />

          {/* Dialog Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={cn(
              "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl border shadow-2xl z-[110] flex flex-col max-h-[90vh] overflow-hidden rounded-none transition-all duration-500",
              theme === 'dark' ? "bg-[#0A0A0A] border-white/[0.05]" : "bg-white border-gray-200"
            )}
          >
            {/* Header */}
            <div className={cn(
              "px-8 py-6 border-b flex items-center justify-between transition-colors duration-500",
              theme === 'dark' ? "border-white/[0.05]" : "border-gray-100"
            )}>
              <div className="flex flex-col">
                <span className={cn(
                  "text-[10px] uppercase font-bold tracking-[0.2em] mb-1 transition-colors duration-500",
                  theme === 'dark' ? "text-white/20" : "text-gray-400"
                )}>Asset Distribution</span>
                <h2 className={cn(
                  "text-2xl font-heading font-black tracking-tight transition-colors duration-500",
                  theme === 'dark' ? "text-white" : "text-gray-900"
                )}>Asset distribution</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className={cn(
                    "text-[12px] font-medium transition-colors duration-500",
                    theme === 'dark' ? "text-white/40" : "text-gray-500"
                  )}>1,818 total assets across 4 categories</span>
                </div>
              </div>
              <button 
                onClick={onClose}
                className={cn(
                  "p-2 transition-all",
                  theme === 'dark' ? "text-white/20 hover:text-white hover:bg-white/5" : "text-gray-400 hover:text-gray-900 hover:bg-gray-100"
                )}
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-8">
              {/* Primary distribution bar */}
              <div className={cn(
                "h-12 w-full flex gap-1 rounded-none overflow-hidden mb-12 shadow-inner ring-1 transition-all duration-500",
                theme === 'dark' ? "ring-white/5" : "ring-gray-100 bg-gray-50"
              )}>
                {categories.map((cat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.percentage}%` }}
                    transition={{ duration: 1, delay: idx * 0.1, ease: 'circOut' }}
                    className={cn(cat.color, "h-full flex items-center p-4 relative group")}
                  >
                    <div className="flex flex-col gap-0.5 pointer-events-none">
                      <span className="text-[10px] uppercase font-black text-white/90 leading-none">{cat.name}</span>
                      <span className="text-sm font-black text-white leading-none">{cat.percentage}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Detailed Breakdown Grid */}
              <div className="flex flex-col gap-10">
                {categories.map((cat, idx) => (
                  <div key={idx} className="flex flex-col gap-4">
                    {/* Category Header */}
                    <div className="flex items-center justify-between">
                      <h3 className={cn("text-[13px] font-black uppercase tracking-widest", cat.name === 'IT' ? 'text-blue-500' : cat.name === 'OT' ? 'text-orange-500' : cat.name === 'Network' ? 'text-teal-500' : 'text-purple-500')}>
                        {cat.name}
                      </h3>
                      <span className={cn(
                        "text-[11px] font-bold tracking-wider transition-colors duration-500",
                        theme === 'dark' ? "text-white/40" : "text-gray-400"
                      )}>
                        {cat.percentage}% · {cat.totalAssets} assets
                      </span>
                    </div>

                    {/* Progress Fill Line */}
                    <div className={cn(
                      "h-[2px] w-full transition-colors duration-500",
                      theme === 'dark' ? "bg-white/[0.05]" : "bg-gray-100"
                    )}>
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${cat.percentage}%` }}
                        transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                        className={cn("h-full", cat.color, theme === 'light' && "opacity-80")}
                      />
                    </div>

                    {/* Subcategories */}
                    <div className={cn(
                      "flex flex-col gap-6 pl-4 border-l mt-2 transition-colors duration-500",
                      theme === 'dark' ? "border-white/[0.03]" : "border-gray-100"
                    )}>
                      {cat.subCategories.map((sub, sIdx) => (
                        <div key={sIdx} className="flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <span className={cn(
                              "text-[12px] font-medium transition-colors duration-500",
                              theme === 'dark' ? "text-white/40" : "text-gray-500"
                            )}>{sub.name}</span>
                            <span className={cn(
                              "text-[11px] font-bold font-mono italic transition-colors duration-500",
                              theme === 'dark' ? "text-white/60" : "text-gray-400"
                            )}>
                              {sub.count} · {sub.percentage}%
                            </span>
                          </div>
                          <div className={cn(
                            "h-[2px] w-full flex relative overflow-hidden transition-colors duration-500",
                            theme === 'dark' ? "bg-white/[0.02]" : "bg-gray-50"
                          )}>
                            <div className="absolute inset-0 bg-white/[0.01]" />
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${sub.percentage}%` }}
                              transition={{ duration: 0.8, delay: 1 + (idx * 0.2) + (sIdx * 0.1) }}
                              className={cn("h-full", cat.color, theme === 'dark' ? "opacity-60" : "opacity-80")}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className={cn(
              "px-8 py-6 border-t flex justify-between items-center transition-colors duration-500",
              theme === 'dark' ? "border-white/[0.05] bg-white/[0.01]" : "border-gray-50 bg-gray-50/50"
            )}>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                   <span className={cn(
                     "text-[10px] font-bold uppercase tracking-widest transition-colors duration-500",
                     theme === 'dark' ? "text-white/20" : "text-gray-400"
                   )}>Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                   <span className={cn(
                     "text-[10px] font-bold uppercase tracking-widest transition-colors duration-500",
                     theme === 'dark' ? "text-white/20" : "text-gray-400"
                   )}>Outliers</span>
                </div>
              </div>
              <button 
                 onClick={onClose}
                 className={cn(
                   "px-6 py-2 text-[11px] font-black uppercase tracking-widest transition-all",
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
