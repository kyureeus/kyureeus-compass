import React from 'react';
import { motion } from 'framer-motion';
import { 
  MoreHorizontal, 
  Monitor, 
  Terminal, 
  Globe, 
  ArrowUpDown
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import { useTheme } from '../../../context/ThemeContext';

interface Asset {
  id: string;
  name: string;
  os: 'windows' | 'linux' | 'network';
  status: 'active' | 'stale' | 'warning';
  ip: string;
  mac: string;
  lastSeen: string;
  risk: 'critical' | 'high' | 'medium' | 'low' | 'none';
}

const mockAssets: Asset[] = [
  {
    id: '1',
    name: 'WKST-PRO-204',
    os: 'windows',
    status: 'active',
    ip: '10.0.42.105',
    mac: '00:DE:AD:BE:EF:01',
    lastSeen: '2 minutes ago',
    risk: 'low'
  },
  {
    id: '2',
    name: 'SRV-REDHAT-SEC',
    os: 'linux',
    status: 'warning',
    ip: '10.0.50.22',
    mac: '00:DE:AD:BE:EF:02',
    lastSeen: '14 hours ago',
    risk: 'critical'
  },
  {
    id: '3',
    name: 'SWITCH-CORE-01',
    os: 'network',
    status: 'active',
    ip: '192.168.1.1',
    mac: '00:DE:AD:BE:EF:03',
    lastSeen: '刚刚',
    risk: 'medium'
  },
  {
    id: '4',
    name: 'WKST-DEV-012',
    os: 'windows',
    status: 'stale',
    ip: '10.0.42.88',
    mac: '00:DE:AD:BE:EF:04',
    lastSeen: '35 days ago',
    risk: 'high'
  },
  {
    id: '5',
    name: 'LAPTOP-M1-MAX',
    os: 'windows',
    status: 'active',
    ip: '10.0.42.12',
    mac: '00:DE:AD:BE:EF:05',
    lastSeen: '1 hour ago',
    risk: 'none'
  }
];

const OSIcon = ({ type }: { type: Asset['os'] }) => {
  switch (type) {
    case 'windows': return <Monitor size={14} className="text-blue-400" />;
    case 'linux': return <Terminal size={14} className="text-orange-400" />;
    case 'network': return <Globe size={14} className="text-teal-400" />;
  }
};

const RiskTag = ({ level }: { level: Asset['risk'] }) => {
  const { theme } = useTheme();
  const styles = {
    critical: 'bg-red-500/10 text-red-500 border-red-500/20',
    high: 'bg-amber-600/10 text-amber-500 border-amber-500/20',
    medium: 'bg-lime-600/10 text-lime-500 border-lime-500/20',
    low: 'bg-teal-500/10 text-teal-500 border-teal-500/20',
    none: theme === 'dark' 
      ? 'bg-white/5 text-white/40 border-white/10' 
      : 'bg-gray-100 text-gray-400 border-gray-200'
  }[level];

  return (
    <span className={cn("px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border", styles)}>
      {level}
    </span>
  );
};

export const AssetTable: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={cn(
      "border transition-all duration-500 rounded-xl overflow-hidden",
      theme === 'dark' ? "bg-[#0A0A0A] border-white/[0.05]" : "bg-white border-gray-200 shadow-sm"
    )}>

      {/* Main Table Body */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className={cn(
              "border-b transition-colors duration-500",
              theme === 'dark' ? "border-white/[0.05] bg-white/[0.01]" : "border-gray-100 bg-gray-50/50"
            )}>
              <th className={cn("px-8 py-4 text-[11px] font-bold uppercase tracking-[0.15em]", theme === 'dark' ? "text-white/30" : "text-gray-400")}>
                <div className="flex items-center gap-2 cursor-pointer hover:opacity-70 transition-colors">
                   Asset Name <ArrowUpDown size={10} />
                </div>
              </th>
              <th className={cn("px-6 py-4 text-[11px] font-bold uppercase tracking-[0.15em]", theme === 'dark' ? "text-white/30" : "text-gray-400")}>Status</th>
              <th className={cn("px-6 py-4 text-[11px] font-bold uppercase tracking-[0.15em]", theme === 'dark' ? "text-white/30" : "text-gray-400")}>Networking</th>
              <th className={cn("px-6 py-4 text-[11px] font-bold uppercase tracking-[0.15em]", theme === 'dark' ? "text-white/30" : "text-gray-400")}>OS Platform</th>
              <th className={cn("px-6 py-4 text-[11px] font-bold uppercase tracking-[0.15em]", theme === 'dark' ? "text-white/30" : "text-gray-400")}>Risk Score</th>
              <th className={cn("px-6 py-4 text-[11px] font-bold uppercase tracking-[0.15em]", theme === 'dark' ? "text-white/30" : "text-gray-400")}>Last Seen</th>
              <th className="px-8 py-4 text-right"></th>
            </tr>
          </thead>
          <tbody className={cn("transition-colors duration-500", theme === 'dark' ? "divide-y divide-white/[0.05]" : "divide-y divide-gray-100")}>
            {mockAssets.map((asset, idx) => (
              <motion.tr 
                key={asset.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={cn(
                  "group transition-all duration-300 cursor-pointer border-b",
                  theme === 'dark' ? "border-white/[0.03] hover:bg-white/[0.02]" : "border-gray-50 hover:bg-primary/5 shadow-sm hover:shadow-md"
                )}
              >
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-none flex items-center justify-center border transition-colors duration-500",
                      theme === 'dark' ? "bg-white/[0.03] border-white/10" : "bg-gray-50 border-gray-100 group-hover:bg-primary/10 group-hover:border-primary/30"
                    )}>
                      <OSIcon type={asset.os} />
                    </div>
                    <div className="flex flex-col">
                      <span className={cn(
                        "text-[14px] font-bold transition-colors duration-500",
                        theme === 'dark' ? "text-white group-hover:text-primary" : "text-gray-700 group-hover:text-primary"
                      )}>{asset.name}</span>
                      <span className={cn(
                        "text-[11px] lowercase tracking-tight transition-colors duration-500",
                        theme === 'dark' ? "text-white/20" : "text-gray-400"
                      )}>UID: {asset.id}992384</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      asset.status === 'active' ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" : 
                      asset.status === 'warning' ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]" :
                      "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]"
                    )} />
                    <span className={cn(
                      "text-[13px] font-medium lowercase transition-colors duration-500",
                      theme === 'dark' ? "text-white/60" : "text-gray-500"
                    )}>{asset.status}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-col">
                    <span className={cn(
                      "text-[13px] font-mono tracking-tight transition-colors duration-500",
                      theme === 'dark' ? "text-white/60" : "text-gray-600"
                    )}>{asset.ip}</span>
                    <span className={cn(
                      "text-[10px] font-mono italic transition-colors duration-500",
                      theme === 'dark' ? "text-white/20" : "text-gray-300"
                    )}>{asset.mac}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                     <span className={cn(
                       "text-[13px] capitalize font-medium transition-colors duration-500",
                       theme === 'dark' ? "text-white/60" : "text-gray-700 font-semibold"
                     )}>{asset.os}</span>
                     <span className={cn(
                       "text-[10px] tracking-wider transition-colors duration-500",
                       theme === 'dark' ? "text-white/20" : "text-gray-300"
                     )}>v11.0.4</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <RiskTag level={asset.risk} />
                </td>
                <td className="px-6 py-5">
                  <span className={cn(
                    "text-[13px] font-medium lowercase tracking-wide transition-colors duration-500",
                    theme === 'dark' ? "text-white/40" : "text-gray-400"
                  )}>{asset.lastSeen}</span>
                </td>
                <td className="px-8 py-5 text-right">
                  <button className={cn(
                    "p-2 transition-colors",
                    theme === 'dark' ? "text-white/20 hover:text-white" : "text-gray-300 hover:text-primary"
                  )}>
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer / Pagination Placeholder */}
      <div className={cn(
        "px-8 py-5 border-t flex items-center justify-between transition-colors duration-500",
        theme === 'dark' ? "border-white/[0.05] bg-white/[0.01]" : "border-gray-50 bg-gray-50/50"
      )}>
        <span className={cn(
          "text-[12px] font-medium transition-colors duration-500",
          theme === 'dark' ? "text-white/20" : "text-gray-400"
        )}>Showing <span className={theme === 'dark' ? "text-white/40" : "text-gray-600"}>5</span> of <span className={theme === 'dark' ? "text-white/40" : "text-gray-600"}>1,818</span> assets</span>
        <div className="flex items-center gap-4">
          <button className={cn(
            "text-[12px] font-bold transition-colors uppercase tracking-widest disabled:opacity-30",
            theme === 'dark' ? "text-white/20 hover:text-white" : "text-gray-300 hover:text-primary"
          )} disabled>Previous</button>
          <div className={cn("h-4 w-[1px]", theme === 'dark' ? "bg-white/10" : "bg-gray-100")} />
          <button className={cn(
            "text-[12px] font-bold hover:opacity-80 transition-colors uppercase tracking-widest",
            "text-primary"
          )}>Next Page</button>
        </div>
      </div>
    </div>
  );
};
