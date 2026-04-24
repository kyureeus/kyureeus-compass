import React, { useState } from 'react';
import { C, DATA } from './constants';
import { ArcGauge, ToolBadge, CheckMark } from './Charts';
import { useTheme } from '../../../../context/ThemeContext';
import { cn } from '../../../../lib/utils';

const MATRIX_ROWS = [
  {
    asset: "bnj-server-01", t: 1, n: 0, c: 0,
    sev: [
      { k: "C", color: "#ff4d4d", patched: 0, total: 5 },
      { k: "H", color: "#ff8c1a", patched: 2, total: 12 },
      { k: "M", color: "#ffd93a", patched: 1, total: 7 }
    ],
    risk: 94, last: "14d ago"
  },
  {
    asset: "sca-204005", t: 1, n: 1, c: 0,
    sev: [
      { k: "C", color: "#ff4d4d", patched: 2, total: 3 },
      { k: "H", color: "#ff8c1a", patched: 6, total: 10 },
      { k: "M", color: "#ffd93a", patched: 4, total: 11 }
    ],
    risk: 72, last: "4d ago"
  },
  {
    asset: "10.10.0.79", t: 1, n: 0, c: 0,
    sev: [
      { k: "C", color: "#ff4d4d", patched: 1, total: 4 },
      { k: "H", color: "#ff8c1a", patched: 0, total: 8 },
      { k: "M", color: "#ffd93a", patched: 1, total: 6 }
    ],
    risk: 78, last: "22d ago"
  },
  {
    asset: "adi-martinmc-l1", t: 1, n: 0, c: 1,
    sev: [
      { k: "C", color: "#ff4d4d", patched: 1, total: 2 },
      { k: "H", color: "#ff8c1a", patched: 4, total: 6 },
      { k: "M", color: "#ffd93a", patched: 4, total: 9 }
    ],
    risk: 54, last: "2d ago"
  },
  {
    asset: "ob-sanders-m402", t: 1, n: 0, c: 0,
    sev: [
      { k: "C", color: "#ff4d4d", patched: 0, total: 1 },
      { k: "H", color: "#ff8c1a", patched: 2, total: 4 },
      { k: "M", color: "#ffd93a", patched: 3, total: 8 }
    ],
    risk: 41, last: "7d ago"
  }
];

const VulnCell = ({ sev, theme }: { sev: any[], theme: string }) => {
  const total = sev.reduce((s, x) => s + x.total, 0);
  return (
    <div className="flex items-center gap-2.5">
      <span className={cn("text-lg font-medium min-w-[24px]", theme === 'dark' ? "text-white" : "text-gray-900")}>{total}</span>
      <div className="flex gap-1 flex-wrap">
        {sev.map(s => (
          <span key={s.k} style={{ color: s.color, backgroundColor: `${s.color}22` }} className="text-[10px] px-1.5 py-0.5 rounded font-semibold">
            {s.k} {s.total}
          </span>
        ))}
      </div>
    </div>
  );
};

const PatchCell = ({ sev, theme }: { sev: any[], theme: string }) => {
  const totalPatched = sev.reduce((s, x) => s + x.patched, 0);
  const totalAll = sev.reduce((s, x) => s + x.total, 0);
  const pctFixed = Math.round((totalPatched / totalAll) * 100);
  return (
    <div>
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-[11px]">
          <span className="font-semibold text-primary">{totalPatched}</span>
          <span className={theme === 'dark' ? "text-gray-500" : "text-gray-400"}> / {totalAll}</span>
        </span>
        <span className={cn("text-[9px] tracking-wide", theme === 'dark' ? "text-gray-500" : "text-gray-400")}>{pctFixed}% FIXED</span>
      </div>
      {sev.map(s => {
        const pct = s.total ? (s.patched / s.total) * 100 : 0;
        const untouched = s.patched === 0 && s.total > 0;
        return (
          <div key={s.k} className="grid grid-cols-[10px_1fr_42px] gap-1.5 items-center py-0.5">
            <span style={{ color: s.color }} className="text-[9px] font-bold font-mono">{s.k}</span>
            <div className={cn("h-1 rounded-full overflow-hidden flex", theme === 'dark' ? "bg-white/10" : "bg-gray-200")}>
              <div style={{ width: `${pct}%`, background: s.color }} />
              <div style={{ flex: 1, background: `${s.color}28` }} />
            </div>
            <span className={cn("text-[9px] font-mono text-right", theme === 'dark' ? "text-gray-500" : "text-gray-400")}>
              <span style={{ color: untouched ? C.red : s.color }}>{s.patched}</span>
              <span className={theme === 'dark' ? "text-gray-600" : "text-gray-300"}>/</span>
              {s.total}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const RiskCell = ({ score, theme }: { score: number, theme: string }) => {
  const color = score >= 80 ? C.red : score >= 60 ? C.amber : score >= 40 ? C.accent : C.teal;
  const label = score >= 80 ? 'CRIT' : score >= 60 ? 'HIGH' : score >= 40 ? 'MED' : 'LOW';
  return (
    <div className="min-w-[100px]">
      <div className="flex items-baseline gap-1.5 mb-1.5">
        <span style={{ color }} className="text-lg font-semibold">{score}</span>
        <span style={{ color, backgroundColor: `${color}22` }} className="text-[9px] tracking-wide px-1.5 py-0.5 rounded font-semibold">{label}</span>
      </div>
      <div className={cn("h-1 rounded-full overflow-hidden", theme === 'dark' ? "bg-white/10" : "bg-gray-200")}>
        <div style={{ width: `${score}%`, height: "100%", background: color }} />
      </div>
    </div>
  );
};


export function SimplifiedView() {
  const [activeGapView, setActiveGapView] = useState(0);
  const { theme } = useTheme();

  const cardClasses = cn("flex flex-col rounded-none border transition-all duration-500", theme === 'dark' ? "bg-[#0D0D0D] border-white/[0.05]" : "bg-white border-gray-100 shadow-sm hover:shadow-md");
  const textMain = theme === 'dark' ? "text-white" : "text-gray-900";
  const textSec = theme === 'dark' ? "text-gray-400" : "text-gray-500";
  const textMuted = theme === 'dark' ? "text-gray-500" : "text-gray-400";
  const surfaceClasses = theme === 'dark' ? "bg-white/[0.02] border-white/[0.05]" : "bg-gray-50 border-gray-200";

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Alert Strip */}
      <div className="bg-red-500/10 border border-red-500/20 p-4 flex items-center gap-4">
        <div className="w-8 h-8 bg-red-500/10 border border-red-500/30 flex items-center justify-center text-sm shrink-0">⚠</div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-red-500">Critical Coverage Gap Detected</div>
          <div className={cn("text-xs mt-0.5", textSec)}>3,968 assets exist in Tenable but have zero cross-hub coverage with NinjaOne or CrowdStrike</div>
        </div>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold tracking-wide bg-red-500/10 text-red-500 border border-red-500/20 uppercase">Action Required</span>
      </div>

      {/* Hero Row */}
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_220px] gap-4">
        {/* Fleet Health */}
        <div className={cn(cardClasses, "items-center justify-center p-6")}>
          <div className={cn("text-[11px] tracking-widest uppercase mb-4", textSec)}>Fleet Health Score</div>
          <ArcGauge pct={0} size={160} color={C.red} label="Coverage" sublabel="0 of 3,968 assets fully covered" />
          <div className="mt-4"><span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold tracking-wide bg-red-500/10 text-red-500 border border-red-500/20">Critical — No cross-hub coverage</span></div>
        </div>

        {/* Coverage States */}
        <div className={cn(cardClasses, "p-5 gap-3")}>
          <div className={cn("text-[10px] font-semibold tracking-[1.5px] uppercase flex items-center gap-1.5", textSec)}><div className="w-1.5 h-1.5 bg-[#00d4b4]" />Asset Coverage States</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1">
            {[
              { label:"Fully Covered", sub:"All 3 tools active", val:0, pct:0, color:C.accent, dimBg:C.accentDim, borderCol:"rgba(200,240,0,.2)", icon:"✓", status:"Target state", action:null },
              { label:"Partially Covered", sub:"1–2 tools only", val:0, pct:0, color:C.amber, dimBg:C.amberDim, borderCol:"rgba(240,165,0,.2)", icon:"◑", status:"Needs completion", action:null },
              { label:"Blind Spot", sub:"Tenable only — no mgmt", val:3968, pct:100, color:C.red, dimBg:C.redDim, borderCol:"rgba(255,77,77,.2)", icon:"⚠", status:"Action required", action:"Deploy NinjaOne + CrowdStrike" },
            ].map((s, i) => (
              <div key={i} className={cn("relative overflow-hidden flex flex-col p-4 border h-full", theme === 'dark' ? "bg-white/[0.02]" : "bg-gray-50")} style={{ borderColor: s.borderCol }}>
                <div style={{ backgroundColor: s.color }} className="absolute top-0 left-0 right-0 h-0.5" />
                
                <div className="flex items-center justify-between mb-3">
                  <div style={{ color: s.color, backgroundColor: s.dimBg, borderColor: s.borderCol }} className="w-8 h-8 flex items-center justify-center text-sm border font-bold">{s.icon}</div>
                  <span style={{ color: s.color, backgroundColor: s.dimBg, borderColor: s.borderCol }} className="text-[9px] px-2 py-0.5 border font-semibold">{s.status}</span>
                </div>
                <div style={{ color: s.color }} className="text-3xl font-bold font-mono leading-none mb-1">{s.val.toLocaleString()}</div>
                <div style={{ color: s.color }} className="text-xs font-semibold mb-0.5">{s.label}</div>
                <div className={cn("text-[10px] mb-3", textMuted)}>{s.sub}</div>
                
                <div className="mt-auto">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className={cn("text-[10px]", textMuted)}>Share of fleet</span>
                    <span style={{ color: s.color }} className="text-[11px] font-mono font-bold">{s.pct}%</span>
                  </div>
                  <div className={cn("h-1.5 rounded-full overflow-hidden", theme === 'dark' ? "bg-white/10" : "bg-gray-200")}>
                    <div style={{ width: `${s.pct}%`, backgroundColor: s.color }} className="h-full rounded-full" />
                  </div>
                  {s.action && (
                    <div className="mt-3 text-[10px] text-amber-500 py-1.5 px-2 bg-amber-500/10 border border-amber-500/20">→ {s.action}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Threat Status */}
        <div className={cn(cardClasses, "p-5 gap-3")}>
          <div className={cn("text-[10px] font-semibold tracking-[1.5px] uppercase flex items-center gap-1.5", textSec)}><div className="w-1.5 h-1.5 bg-red-500" />Live Threat Status</div>
          <div className="flex flex-col items-center py-2">
            <div className="relative w-[90px] h-[90px] flex items-center justify-center">
              <div className="absolute w-[90px] h-[90px] rounded-full bg-red-500/5 animate-pulse" />
              <div className="absolute w-[70px] h-[70px] rounded-full bg-red-500/10 animate-pulse delay-300" />
              <div className="w-[50px] h-[50px] rounded-full bg-red-500/20 border-2 border-red-500/40 flex items-center justify-center text-xl z-10">🛡</div>
            </div>
            <div className={cn("mt-2.5 text-[13px] font-semibold", textMain)}>CrowdStrike Offline</div>
            <div className={cn("text-[11px] mt-1 text-center", textSec)}>No endpoint protection active<br />0 devices enrolled</div>
          </div>
          <div className={cn("pt-2.5 border-t", theme === 'dark' ? "border-white/[0.05]" : "border-gray-100")}>
            {[
              { label:"Active Detections", val:"0", color:C.textSec, note:"agent not deployed" },
              { label:"High-Risk Unpatched", val:"47", color:C.red },
              { label:"Crown Jewel Gaps", val:"12", color:C.amber },
            ].map((row, i) => (
              <div key={i} className={cn("flex items-center justify-between py-1.5", i < 2 && (theme === 'dark' ? "border-b border-white/[0.05]" : "border-b border-gray-100"))}>
                <span className={cn("text-[11px]", textSec)}>{row.label}</span>
                <div className="flex items-center gap-1.5">
                  {"note" in row && <span className={cn("text-[10px]", textMuted)}>{(row as any).note}</span>}
                  <span style={{ color: row.color }} className="text-[13px] font-bold font-mono">{row.val}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top 5 Gaps */}
      <div className={cn(cardClasses, "p-5")}>
        <div className="flex items-center justify-between mb-1.5">
          <div className={cn("text-[13px] font-semibold flex items-center gap-2", textMain)}><span className="text-primary text-sm">⚡</span>Top 5 Assets Requiring Immediate Action</div>
          <div className="flex gap-1.5">
            {["List", "Matrix"].map((v, i) => (
              <div key={i} className={cn(
                "border px-2 py-0.5 text-[10px] flex items-center gap-1 cursor-pointer transition-all uppercase tracking-wider font-semibold",
                activeGapView === i 
                  ? (theme === 'dark' ? "border-primary text-primary bg-primary/10" : "border-[#a3cc00] text-[#a3cc00] bg-[#a3cc00]/10") 
                  : (theme === 'dark' ? "border-white/10 text-gray-500 hover:text-gray-400 hover:border-white/20 bg-transparent" : "border-gray-200 text-gray-500 hover:text-gray-700 bg-transparent")
              )} onClick={() => setActiveGapView(i)}>◈ {v}</div>
            ))}
          </div>
        </div>

        <div className={cn("text-[11px] mb-5", textMuted)}>5 assets · 134 open vulnerabilities · 15 critical unpatched</div>

        {activeGapView === 0 ? (
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr>
                {['Hostname', 'IP', 'Class', 'Risk Score', 'Missing Tools', 'Priority'].map(h => (
                  <th key={h} className={cn("text-left px-3 py-2 text-[10px] tracking-wide uppercase font-medium border-b", theme === 'dark' ? "text-gray-500 border-white/10" : "text-gray-400 border-gray-200")}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DATA.topGaps.map((g, i) => (
                <tr key={i} className={theme === 'dark' ? "hover:bg-white/[0.02]" : "hover:bg-gray-50"}>
                  <td className={cn("px-3 py-2 border-b font-mono text-xs", theme === 'dark' ? "border-white/[0.02] text-white" : "border-gray-100 text-gray-900")}>{g.host}</td>
                  <td className={cn("px-3 py-2 border-b font-mono text-[11px]", theme === 'dark' ? "border-white/[0.02] text-gray-400" : "border-gray-100 text-gray-500")}>{g.ip}</td>
                  <td className={cn("px-3 py-2 border-b", theme === 'dark' ? "border-white/[0.02]" : "border-gray-100")}>
                    <span className={cn("inline-flex items-center px-2 py-0.5 text-[10px] font-semibold tracking-wide border", g.class === "OT" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : g.class === "Network" ? "bg-blue-500/10 text-blue-500 border-blue-500/20" : "bg-teal-500/10 text-teal-500 border-teal-500/20")}>{g.class}</span>
                  </td>
                  <td className={cn("px-3 py-2 border-b", theme === 'dark' ? "border-white/[0.02]" : "border-gray-100")}>
                    <div className="flex items-center gap-2">
                      <div className={cn("flex-1 h-1 rounded-full overflow-hidden", theme === 'dark' ? "bg-white/10" : "bg-gray-200")}><div className="h-full rounded-full" style={{ width: `${g.risk * 10}%`, background: g.risk >= 9 ? C.red : g.risk >= 8 ? C.amber : C.accent }} /></div>
                      <span style={{ color: g.risk >= 9 ? C.red : C.amber }} className="text-[11px] font-mono min-w-[28px] font-bold">{g.risk}</span>
                    </div>
                  </td>
                  <td className={cn("px-3 py-2 border-b", theme === 'dark' ? "border-white/[0.02]" : "border-gray-100")}><div className="flex gap-1 flex-wrap">{g.missing.map(m => <ToolBadge key={m} name={m} />)}</div></td>
                  <td className={cn("px-3 py-2 border-b", theme === 'dark' ? "border-white/[0.02]" : "border-gray-100")}><span className="inline-flex items-center px-2 py-0.5 text-[10px] font-semibold tracking-wide bg-red-500/10 text-red-500 border border-red-500/20">P{i + 1}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[13px] table-fixed min-w-[1000px]">
              <colgroup>
                <col className="w-[15%]" />
                <col className="w-[5%]" /><col className="w-[5%]" /><col className="w-[5%]" />
                <col className="w-[18%]" />
                <col className="w-[22%]" />
                <col className="w-[15%]" />
                <col className="w-[8%]" />
                <col className="w-[10%]" />
              </colgroup>
              <thead>
                <tr className={cn("text-[10px] tracking-[1.2px] text-left", textMuted)}>
                  <th className={cn("p-3 font-medium border-b", theme === 'dark' ? "border-white/10" : "border-gray-200")}>ASSET</th>
                  <th className={cn("py-3 px-1 font-medium text-center border-b", theme === 'dark' ? "border-white/10" : "border-gray-200")}>TEN</th>
                  <th className={cn("py-3 px-1 font-medium text-center border-b", theme === 'dark' ? "border-white/10" : "border-gray-200")}>NINJA</th>
                  <th className={cn("py-3 px-1 font-medium text-center border-b", theme === 'dark' ? "border-white/10" : "border-gray-200")}>CRWD</th>
                  <th className={cn("p-3 font-medium border-b", theme === 'dark' ? "border-white/10" : "border-gray-200")}>VULNERABILITIES</th>
                  <th className={cn("p-3 font-medium border-b", theme === 'dark' ? "border-white/10" : "border-gray-200")}>PATCH PROGRESS</th>
                  <th className={cn("p-3 font-medium border-b", theme === 'dark' ? "border-white/10" : "border-gray-200")}>RISK</th>
                  <th className={cn("p-3 font-medium border-b", theme === 'dark' ? "border-white/10" : "border-gray-200")}>LAST PATCH</th>
                  <th className={cn("p-3 font-medium text-right border-b", theme === 'dark' ? "border-white/10" : "border-gray-200")}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {MATRIX_ROWS.map((r, i) => (
                  <tr key={i} className={theme === 'dark' ? "hover:bg-primary/5" : "hover:bg-primary/5"}>
                    <td className={cn("px-2.5 py-4 border-b font-mono text-xs align-middle", theme === 'dark' ? "border-white/[0.05] text-white" : "border-gray-100 text-gray-900")}>{r.asset}</td>
                    <td className={cn("px-1 py-4 text-center border-b align-middle", theme === 'dark' ? "border-white/[0.05]" : "border-gray-100")}><CheckMark present={r.t === 1} /></td>
                    <td className={cn("px-1 py-4 text-center border-b align-middle", theme === 'dark' ? "border-white/[0.05]" : "border-gray-100")}><CheckMark present={r.n === 1} /></td>
                    <td className={cn("px-1 py-4 text-center border-b align-middle", theme === 'dark' ? "border-white/[0.05]" : "border-gray-100")}><CheckMark present={r.c === 1} /></td>
                    <td className={cn("px-2.5 py-4 border-b align-middle", theme === 'dark' ? "border-white/[0.05]" : "border-gray-100")}><VulnCell sev={r.sev} theme={theme} /></td>
                    <td className={cn("px-2.5 py-3.5 border-b align-middle", theme === 'dark' ? "border-white/[0.05]" : "border-gray-100")}><PatchCell sev={r.sev} theme={theme} /></td>
                    <td className={cn("px-2.5 py-4 border-b align-middle", theme === 'dark' ? "border-white/[0.05]" : "border-gray-100")}><RiskCell score={r.risk} theme={theme} /></td>
                    <td className={cn("px-2.5 py-4 border-b text-[11px] align-middle", theme === 'dark' ? "border-white/[0.05] text-gray-400" : "border-gray-100 text-gray-500")}>{r.last}</td>
                    <td className={cn("px-2.5 py-4 text-right border-b align-middle", theme === 'dark' ? "border-white/[0.05]" : "border-gray-100")}>
                      {r.risk >= 60 ? (
                        <button className="bg-primary text-black border-none px-3 py-1.5 font-bold text-[11px] cursor-pointer whitespace-nowrap">Patch now</button>
                      ) : (
                        <button className={cn("bg-transparent border px-3 py-1.5 text-[11px] cursor-pointer whitespace-nowrap", theme === 'dark' ? "text-gray-400 border-white/20" : "text-gray-600 border-gray-300")}>View</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className={cn("flex gap-4 mt-4 pt-3.5 border-t text-[10px] flex-wrap items-center", theme === 'dark' ? "border-white/10 text-gray-500" : "border-gray-200 text-gray-400")}>
              <span className="tracking-widest font-semibold">LEGEND</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-red-500" />Critical</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-amber-500" />High</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-[#ffd93a]" />Medium</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-1 bg-red-500" /><span className="w-2.5 h-1 bg-red-500/20" />Patched / Open</span>
              <span className="ml-auto font-mono">Risk = (C×10 + H×5 + M×2) · vulnerability-weight</span>
            </div>
          </div>
        )}
      </div>

      {/* Summary Bar */}
      <div className={cn("border p-4 flex items-center gap-6 flex-wrap rounded-none", surfaceClasses)}>
        <div className={cn("text-[11px] tracking-widest uppercase", textMuted)}>Summary</div>
        {[
          { label:"Total Assets", val:"3,968", color:textMain },
          { label:"Cross-Hub Coverage", val:"0%", color:theme === 'dark' ? C.red : "#ef4444" },
          { label:"NinjaOne Enrolled", val:"0", color:theme === 'dark' ? C.amber : "#f59e0b" },
          { label:"CrowdStrike Active", val:"0", color:theme === 'dark' ? C.red : "#ef4444" },
          { label:"High-Risk Unpatched", val:"47", color:theme === 'dark' ? C.amber : "#f59e0b" },
          { label:"Last Scan", val:"2h ago", color:textSec },
        ].map((s, i) => (
          <div key={i} className="flex flex-col gap-0.5">
            <span className={cn("text-[10px] tracking-wide", textMuted)}>{s.label}</span>
            <span style={s.color.startsWith('#') || s.color.startsWith('rgb') ? { color: s.color } : undefined} className={cn("text-base font-bold font-mono", !s.color.startsWith('#') && s.color)}>{s.val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
