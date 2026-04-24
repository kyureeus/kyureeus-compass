import React, { useState } from 'react';
import { C } from './constants';
import { useTheme } from '../../../../context/ThemeContext';
import { cn } from '../../../../lib/utils';

export function VulnPriority({ vulns }: { vulns: any }) {
  const { theme } = useTheme();
  const { critical, high, medium, low } = vulns;
  const total = critical + high + medium + low;
  const textMain = theme === 'dark' ? "text-white" : "text-gray-900";
  const textSec = theme === 'dark' ? "text-gray-400" : "text-gray-500";
  const textMuted = theme === 'dark' ? "text-gray-500" : "text-gray-400";
  const surface = theme === 'dark' ? "bg-white/[0.02] border-white/[0.05]" : "bg-gray-50 border-gray-100";

  const bars = [
    { label: "Critical", val: critical, color: C.red, pct: total ? Math.round(critical / total * 100) : 0 },
    { label: "High",     val: high,     color: C.amber, pct: total ? Math.round(high / total * 100) : 0 },
    { label: "Medium",   val: medium,   color: "#f0cc00", pct: total ? Math.round(medium / total * 100) : 0 },
    { label: "Low",      val: low,      color: C.blue, pct: total ? Math.round(low / total * 100) : 0 },
  ];
  const maxVal = Math.max(critical, high, medium, low, 1);

  return (
    <div className="flex flex-col gap-2.5">
      {/* Histogram */}
      <div className="flex gap-2 items-end h-16 px-1">
        {bars.map((b, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-[3px] h-full justify-end">
            <span className="text-[10px] font-mono font-bold" style={{ color: b.color }}>{b.val}</span>
            <div 
              className="w-full transition-all duration-700 ease-out"
              style={{ 
                height: `${(b.val / maxVal) * 48}px`, 
                background: b.color, 
                borderRadius: "3px 3px 0 0", 
                opacity: b.val === 0 ? 0.2 : 1, 
                minHeight: b.val > 0 ? 4 : 2 
              }} 
            />
          </div>
        ))}
      </div>
      {/* Labels + ranked bars */}
      <div className="flex flex-col gap-1.5 mt-1">
        {bars.map((b, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className={cn("text-[10px] w-[52px] shrink-0", textSec)}>{b.label}</span>
            <div className={cn("flex-1 h-1.5 rounded-full overflow-hidden", theme === 'dark' ? "bg-white/10" : "bg-gray-200")}>
              <div className="h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${b.pct}%`, background: b.color }} />
            </div>
            <span className="text-[11px] font-mono font-bold w-7 text-right" style={{ color: b.color }}>{b.val}</span>
            <span className={cn("text-[10px] w-8 text-right", textMuted)}>{b.pct}%</span>
          </div>
        ))}
      </div>
      {/* Total + scores row */}
      <div className="flex gap-2 mt-2">
        <div className={cn("flex-1 rounded-lg p-2 text-center border", surface)}>
          <div className={cn("text-lg font-bold font-mono", textMain)}>{total}</div>
          <div className={cn("text-[9px] mt-0.5 tracking-wide uppercase", textMuted)}>Total vulns</div>
        </div>
        <div className="flex-1 rounded-lg p-2 text-center bg-red-500/10 border border-red-500/20">
          <div className="text-lg font-bold font-mono text-red-500">{vulns.acrScore}</div>
          <div className={cn("text-[9px] mt-0.5 tracking-wide uppercase", textMuted)}>ACR Score</div>
        </div>
        <div className="flex-1 rounded-lg p-2 text-center bg-amber-500/10 border border-amber-500/20">
          <div className="text-lg font-bold font-mono text-amber-500">{vulns.exposureScore}</div>
          <div className={cn("text-[9px] mt-0.5 tracking-wide uppercase", textMuted)}>Exposure</div>
        </div>
      </div>
    </div>
  );
}


