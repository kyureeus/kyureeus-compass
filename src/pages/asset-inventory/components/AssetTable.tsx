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
  const styles = {
    critical: 'bg-red-500/10 text-red-500 border-red-500/20',
    high: 'bg-amber-600/10 text-amber-500 border-amber-500/20',
    medium: 'bg-lime-600/10 text-lime-500 border-lime-500/20',
    low: 'bg-teal-500/10 text-teal-500 border-teal-500/20',
    none: 'bg-white/5 text-white/40 border-white/10'
  }[level];

  return (
    <span className={cn("px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border", styles)}>
      {level}
    </span>
  );
};

export const AssetTable: React.FC = () => {
  return (
    <div className="bg-[#0A0A0A] border border-white/[0.05] flex flex-col overflow-hidden rounded-xl">

      {/* Main Table Body */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/[0.05] bg-white/[0.01]">
              <th className="px-8 py-4 text-[11px] font-bold text-white/30 uppercase tracking-[0.15em]">
                <div className="flex items-center gap-2 cursor-pointer hover:text-white/60 transition-colors">
                  Asset Name <ArrowUpDown size={10} />
                </div>
              </th>
              <th className="px-6 py-4 text-[11px] font-bold text-white/30 uppercase tracking-[0.15em]">Status</th>
              <th className="px-6 py-4 text-[11px] font-bold text-white/30 uppercase tracking-[0.15em]">Networking</th>
              <th className="px-6 py-4 text-[11px] font-bold text-white/30 uppercase tracking-[0.15em]">OS Platform</th>
              <th className="px-6 py-4 text-[11px] font-bold text-white/30 uppercase tracking-[0.15em]">Risk Score</th>
              <th className="px-6 py-4 text-[11px] font-bold text-white/30 uppercase tracking-[0.15em]">Last Seen</th>
              <th className="px-8 py-4 text-right"></th>
            </tr>
          </thead>
          <tbody>
            {mockAssets.map((asset, idx) => (
              <motion.tr 
                key={asset.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="group border-b border-white/[0.03] hover:bg-white/[0.02] transition-all cursor-pointer"
              >
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-none bg-white/[0.03] flex items-center justify-center border border-white/10 group-hover:border-primary/50 transition-colors">
                      <OSIcon type={asset.os} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-white group-hover:text-primary transition-colors">{asset.name}</span>
                      <span className="text-[11px] text-white/20 lowercase tracking-tight">UID: {asset.id}992384</span>
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
                    <span className="text-[13px] font-medium text-white/60 lowercase">{asset.status}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-col">
                    <span className="text-[13px] text-white/60 font-mono tracking-tight">{asset.ip}</span>
                    <span className="text-[10px] text-white/20 font-mono italic">{asset.mac}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                     <span className="text-[13px] text-white/60 capitalize font-medium">{asset.os}</span>
                     <span className="text-[10px] text-white/20 tracking-wider">v11.0.4</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <RiskTag level={asset.risk} />
                </td>
                <td className="px-6 py-5">
                  <span className="text-[13px] text-white/40 font-medium lowercase tracking-wide">{asset.lastSeen}</span>
                </td>
                <td className="px-8 py-5 text-right">
                  <button className="p-2 text-white/20 hover:text-white transition-colors">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer / Pagination Placeholder */}
      <div className="px-8 py-5 border-t border-white/[0.05] flex items-center justify-between bg-white/[0.01]">
        <span className="text-[12px] text-white/20 font-medium">Showing <span className="text-white/40">5</span> of <span className="text-white/40">1,818</span> assets</span>
        <div className="flex items-center gap-4">
          <button className="text-[12px] font-bold text-white/20 hover:text-white transition-colors uppercase tracking-widest disabled:opacity-30" disabled>Previous</button>
          <div className="h-4 w-[1px] bg-white/10" />
          <button className="text-[12px] font-bold text-primary hover:opacity-80 transition-colors uppercase tracking-widest">Next Page</button>
        </div>
      </div>
    </div>
  );
};
