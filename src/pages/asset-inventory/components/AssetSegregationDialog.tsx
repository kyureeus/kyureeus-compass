import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Layers, ShieldAlert, Search, Filter, Server, Laptop, Cpu, Activity, Info } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { useTheme } from '../../../context/ThemeContext';

// Import mock data
import tenableData from '../data/tenable-data.json';
import ninjaoneData from '../data/ninjaone-data.json';
import crowdstrikeData from '../data/crowdstrike-data.json';

interface AssetSegregationDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AssetSegregationDialog: React.FC<AssetSegregationDialogProps> = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSource, setFilterSource] = useState<string | null>(null);

  const sources = [
    { id: 'tenable', label: 'Tenable', count: tenableData.assets.length, color: 'text-orange-500', bgColor: 'bg-orange-500/10', icon: Shield },
    { id: 'ninjaone', label: 'NinjaOne', count: ninjaoneData.length, color: 'text-purple-500', bgColor: 'bg-purple-500/10', icon: Layers },
    { id: 'crowdstrike', label: 'CrowdStrike', count: crowdstrikeData.length, color: 'text-rose-500', bgColor: 'bg-rose-500/10', icon: ShieldAlert }
  ];

  const allAssets = [
    ...tenableData.assets.map(a => ({ 
      ...a, 
      hostname: a.hostname[0] || 'Unknown Host',
      os: a.operating_system[0] || 'Unknown OS',
      ipAddress: a.ipv4[0] || a.last_scan_target,
      riskScore: a.exposure_score,
      source: 'tenable', 
      color: 'text-orange-500' 
    })),
    ...ninjaoneData.map(a => ({ ...a, source: 'ninjaone', color: 'text-purple-500' })),
    ...crowdstrikeData.map(a => ({ ...a, source: 'crowdstrike', color: 'text-rose-500' }))
  ];

  const filteredAssets = allAssets.filter(asset => {
    const matchesSearch = asset.hostname.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterSource ? asset.source === filterSource : true;
    return matchesSearch && matchesFilter;
  });

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
              "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl border shadow-2xl z-[110] flex flex-col max-h-[90vh] overflow-hidden rounded-none transition-all duration-500",
              theme === 'dark' ? "bg-[#050505] border-white/[0.05]" : "bg-white border-gray-200"
            )}
          >
            {/* Header Area */}
            <div className={cn(
              "px-8 py-8 flex flex-col transition-colors duration-500",
              theme === 'dark' ? "bg-[#0A0A0A]/50" : "bg-gray-50/50"
            )}>
              <div className="flex justify-between items-start mb-8">
                <div className="flex flex-col">
                  <span className={cn(
                    "text-[10px] uppercase font-bold tracking-[0.3em] mb-1 opacity-40",
                    theme === 'dark' ? "text-white" : "text-gray-900"
                  )}>Asset Inventory · Unified Fleet</span>
                  <h2 className={cn(
                    "text-4xl font-heading font-bold tracking-tight",
                    theme === 'dark' ? "text-white" : "text-gray-900"
                  )}>Asset segregation</h2>
                </div>
                
                <button 
                  onClick={onClose}
                  className={cn(
                    "p-2 transition-all rounded-full",
                    theme === 'dark' ? "text-white/20 hover:text-white hover:bg-white/10" : "text-gray-400 hover:text-gray-900 hover:bg-gray-100"
                  )}
                >
                  <X size={24} />
                </button>
              </div>

              {/* Source Distribution Visualization */}
              <div className="flex gap-2 h-1.5 w-full mb-8 overflow-hidden rounded-full transition-all duration-500">
                {sources.map((s, i) => (
                  <motion.div 
                    key={s.id}
                    initial={{ width: 0 }}
                    animate={{ width: `${(s.count / allAssets.length) * 100}%` }}
                    transition={{ delay: 0.5 + (i * 0.1), duration: 0.8 }}
                    className={cn(s.color.replace('text-', 'bg-'), "h-full opacity-80")}
                  />
                ))}
              </div>

              {/* Filter & Search Controls */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input 
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by hostname..."
                    className={cn(
                      "w-full bg-white/[0.02] border border-white/[0.05] rounded-none pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all",
                      theme === 'light' && "bg-white border-gray-200 text-gray-900"
                    )}
                  />
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setFilterSource(null)}
                    className={cn(
                      "px-6 py-2 text-[11px] font-bold uppercase tracking-widest border transition-all",
                      !filterSource 
                        ? (theme === 'dark' ? "bg-white text-black border-white" : "bg-gray-900 text-white border-gray-900")
                        : (theme === 'dark' ? "bg-transparent border-white/5 opacity-40 hover:opacity-100" : "bg-transparent border-gray-200 text-gray-500 opacity-40 hover:opacity-100")
                    )}
                  >
                    All Source
                  </button>
                  {sources.map(source => (
                    <button 
                      key={source.id}
                      onClick={() => setFilterSource(source.id)}
                      className={cn(
                        "flex items-center gap-2 px-6 py-2 text-[11px] font-bold uppercase tracking-widest border transition-all",
                        filterSource === source.id
                          ? (theme === 'dark' ? "bg-white text-black border-white" : "bg-gray-900 text-white border-gray-900")
                          : (theme === 'dark' ? "bg-transparent border-white/5 opacity-40 hover:opacity-100" : "bg-transparent border-gray-200 text-gray-500 opacity-40 hover:opacity-100")
                      )}
                    >
                      <source.icon size={14} className={filterSource === source.id ? "" : source.color} />
                      {source.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* List Body */}
            <div className="flex-1 overflow-y-auto p-0 scrollbar-hide">
              <div className="grid grid-cols-1">
                {filteredAssets.length > 0 ? (
                  filteredAssets.map((asset, idx) => (
                    <motion.div
                      key={`${asset.source}-${asset.id}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + (idx * 0.02) }}
                      className={cn(
                        "group grid grid-cols-12 items-center px-8 py-5 border-b hover:bg-white/[0.02] transition-all cursor-default",
                        theme === 'dark' ? "border-white/[0.03]" : "border-gray-50 hover:bg-gray-50/50"
                      )}
                    >
                      {/* Hostname & Source */}
                      <div className="col-span-4 flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                           <div className={cn("w-2 h-2 rounded-full", asset.color.replace('text-', 'bg-'))} />
                           <span className={cn("text-[13px] font-bold", theme === 'dark' ? "text-white" : "text-gray-900")}>{asset.hostname}</span>
                        </div>
                        <span className="text-[10px] font-medium opacity-30 uppercase tracking-widest ml-5">{asset.source} · {asset.id}</span>
                      </div>

                      {/* Technical Specs */}
                      <div className="col-span-4 flex items-center gap-6">
                        <div className="flex flex-col">
                           <span className="text-[10px] uppercase font-bold opacity-20">OS Platform</span>
                           <span className="text-[11px] font-medium">{asset.os || 'FortiOS 7.x'}</span>
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[10px] uppercase font-bold opacity-20">Network IP</span>
                           <span className="text-[11px] font-mono opacity-60">{asset.ipAddress || '10.0.x.x'}</span>
                        </div>
                      </div>

                      {/* Health / Risk Indicator */}
                      <div className="col-span-3 flex justify-center">
                        {asset.source === 'tenable' && (
                          <div className={cn(
                            "flex items-center gap-2 px-3 py-1.5 border",
                            theme === 'dark' ? "bg-white/[0.02] border-white/5" : "bg-gray-50 border-gray-100 shadow-sm"
                          )}>
                             <Shield size={14} className="text-orange-500" />
                             <span className="text-[11px] font-bold">RISK: {asset.riskScore}</span>
                          </div>
                        )}
                        {asset.source === 'ninjaone' && (
                          <div className={cn(
                            "flex items-center gap-2 px-3 py-1.5 border",
                            theme === 'dark' ? "bg-white/[0.02] border-white/5" : "bg-gray-50 border-gray-100 shadow-sm"
                          )}>
                             <Activity size={14} className="text-purple-500" />
                             <span className="text-[11px] font-bold">HEALTH: {asset.healthScore}%</span>
                          </div>
                        )}
                        {asset.source === 'crowdstrike' && (
                          <div className={cn(
                            "flex items-center gap-2 px-3 py-1.5 border",
                            theme === 'dark' ? "bg-white/[0.02] border-white/5" : "bg-gray-50 border-gray-100 shadow-sm"
                          )}>
                             <ShieldAlert size={14} className="text-rose-500" />
                             <span className="text-[11px] font-bold">STATUS: {asset.protectionStatus}</span>
                          </div>
                        )}
                      </div>

                      <div className="col-span-1 flex justify-end opacity-0 group-hover:opacity-100 transition-all">
                        <button className="text-primary hover:scale-110 transition-transform">
                          <Info size={18} />
                        </button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="py-20 flex flex-col items-center justify-center text-center gap-4">
                     <Search size={48} className="opacity-10" />
                     <div className="flex flex-col">
                        <span className="font-bold text-lg">No assets found</span>
                        <span className="text-sm opacity-40">Try adjusting your search or filters.</span>
                     </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Area */}
            <div className={cn(
              "px-8 py-6 border-t flex justify-between items-center transition-colors duration-500",
              theme === 'dark' ? "border-white/[0.05] bg-white/[0.01]" : "border-gray-100 bg-gray-50/50"
            )}>
              <div className="flex items-center gap-8">
                 {sources.map(s => (
                   <div key={s.id} className="flex items-center gap-3">
                      <div className={cn("w-3 h-3 border rounded-none", s.bgColor, s.color.replace('text-', 'border-'))} />
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">{s.label} Source</span>
                   </div>
                 ))}
              </div>
              <button 
                 onClick={onClose}
                 className={cn(
                   "px-8 py-3 text-[12px] font-bold uppercase tracking-widest transition-all",
                   theme === 'dark' ? "bg-white text-black hover:bg-white/90" : "bg-gray-900 text-white hover:bg-gray-800"
                 )}
              >
                Close Inventory
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
