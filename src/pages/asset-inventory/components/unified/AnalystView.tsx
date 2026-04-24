import React, { useState } from 'react';
import { C, DATA } from './constants';
import { ArcGauge, Sparkline, DonutChart, CheckMark } from './Charts';
import { useTheme } from '../../../../context/ThemeContext';
import { cn } from '../../../../lib/utils';
import { useNavigate } from 'react-router-dom';

const TOOLS = [
  {
    name:"Tenable", icon:"⬡", color:C.teal, dimBg:C.tealDim, borderCol:`${C.teal}44`,
    status:"Active", statusColor:C.teal, coveragePct:100, totalAssets:3968,
    assetClasses:[
      { label:"IT", value:2098, color:C.teal }, { label:"OT", value:489, color:C.amber },
      { label:"Network", value:213, color:C.blue }, { label:"IoT", value:127, color:C.purple },
    ],
    riskRows:[
      { label:"Critical", value:38, pct:2, color:C.red }, { label:"High", value:142, pct:6, color:C.amber },
      { label:"Medium", value:890, pct:38, color:C.accent }, { label:"Low", value:1298, pct:55, color:C.teal },
    ],
    stats:[{ label:"Total scanned", val:"3,968" }, { label:"Last scan", val:"2h ago" }, { label:"Total findings", val:"2,368" }],
    note:null,
  },
  {
    name:"NinjaOne", icon:"⚙", color:C.accent, dimBg:C.accentDim, borderCol:`${C.accent}44`,
    status:"Not enrolled", statusColor:C.amber, coveragePct:0, totalAssets:0,
    assetClasses:[
      { label:"IT", value:0, color:C.teal }, { label:"OT", value:0, color:C.amber },
      { label:"Network", value:0, color:C.blue }, { label:"IoT", value:0, color:C.purple },
    ],
    riskRows:[
      { label:"Patched", value:0, pct:0, color:C.accent }, { label:"Overdue", value:0, pct:0, color:C.amber },
      { label:"Never patched", value:0, pct:0, color:C.red }, { label:"Unknown", value:0, pct:0, color:C.muted },
    ],
    stats:[{ label:"Enrolled", val:"0" }, { label:"Patched (30d)", val:"0" }, { label:"Overdue", val:"0" }],
    note:"Deploy NinjaOne to 3,968 assets",
  },
  {
    name:"CrowdStrike", icon:"🛡", color:C.red, dimBg:C.redDim, borderCol:`${C.red}44`,
    status:"Not deployed", statusColor:C.red, coveragePct:0, totalAssets:0,
    assetClasses:[
      { label:"IT", value:0, color:C.teal }, { label:"OT", value:0, color:C.amber },
      { label:"Network", value:0, color:C.blue }, { label:"IoT", value:0, color:C.purple },
    ],
    riskRows:[
      { label:"Critical", value:0, pct:0, color:C.red }, { label:"High", value:0, pct:0, color:C.amber },
      { label:"Medium", value:0, pct:0, color:C.accent }, { label:"Low", value:0, pct:0, color:C.teal },
    ],
    stats:[{ label:"Devices enrolled", val:"0" }, { label:"Detections (24h)", val:"0" }, { label:"Matched assets", val:"0" }],
    note:"Deploy CrowdStrike Falcon to fleet",
  },
];

export function AnalystView() {
  const [toolView, setToolView] = useState(0);
  const [coverageView, setCoverageView] = useState(0);
  const { theme } = useTheme();
  const navigate = useNavigate();

  const cardClasses = cn("flex flex-col rounded-none border transition-all duration-500 p-5", theme === 'dark' ? "bg-[#0D0D0D] border-white/[0.05]" : "bg-white border-gray-100 shadow-sm hover:shadow-md");
  const textMain = theme === 'dark' ? "text-white" : "text-gray-900";
  const textSec = theme === 'dark' ? "text-gray-400" : "text-gray-500";
  const textMuted = theme === 'dark' ? "text-gray-500" : "text-gray-400";

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* Coverage Analysis */}
      <div className={cardClasses}>
        <div className="flex items-center justify-between mb-4">
          <div className={cn("text-[13px] font-semibold flex items-center gap-2", textMain)}>
            <span style={{ color:C.teal }}>◈</span>
            Cross-Hub Coverage Analysis
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide bg-red-500/10 text-red-500 border border-red-500/20">0% Matched</span>
          </div>
          <div className="flex gap-1.5">
            {["Gauge","Segmented Bar"].map((v, i) => (
              <div key={i} className={cn(
                "border px-2 py-0.5 text-[10px] flex items-center gap-1 cursor-pointer transition-all uppercase tracking-wider font-semibold",
                coverageView === i 
                  ? (theme === 'dark' ? "border-primary text-primary bg-primary/10" : "border-[#a3cc00] text-[#a3cc00] bg-[#a3cc00]/10") 
                  : (theme === 'dark' ? "border-white/10 text-gray-500 hover:text-gray-400 hover:border-white/20 bg-transparent" : "border-gray-200 text-gray-500 hover:text-gray-700 bg-transparent")
              )} onClick={() => setCoverageView(i)}>◈ {v}</div>
            ))}
          </div>
        </div>

        {coverageView === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="flex justify-center">
              <ArcGauge pct={0} size={180} color={C.red} label="Cross-Hub Match" sublabel="0 of 3,968 assets" />
            </div>
            <div className="flex flex-col gap-3.5">
              {[
                { label:"Tenable Only", val:3968, pct:100, color:C.teal },
                { label:"NinjaOne Only", val:0, pct:0, color:C.accent },
                { label:"CrowdStrike Only", val:0, pct:0, color:C.red },
                { label:"All Three", val:0, pct:0, color:C.purple },
              ].map((row, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1.5 text-[11px]">
                    <span className={textSec}>{row.label}</span>
                    <span style={{ color:row.color }} className="font-mono font-bold">{row.val.toLocaleString()}</span>
                  </div>
                  <div className={cn("h-1.5 rounded-full overflow-hidden", theme === 'dark' ? "bg-white/10" : "bg-gray-200")}><div className="h-full rounded-full transition-all duration-700" style={{ width:`${row.pct}%`, background:row.color }} /></div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2.5">
              {[
                { tool:"Tenable", assets:3968, color:C.teal, icon:"⬡", status:"Active" },
                { tool:"NinjaOne", assets:0, color:C.accent, icon:"⚙", status:"Not enrolled" },
                { tool:"CrowdStrike", assets:0, color:C.red, icon:"🛡", status:"Not deployed" },
              ].map((t, i) => (
                <div key={i} className={cn("border rounded-none p-3 flex items-center gap-3.5", theme === 'dark' ? "bg-white/[0.02] border-white/[0.05]" : "bg-gray-50 border-gray-100")}>
                  <div style={{ backgroundColor:`${t.color}18`, borderColor:`${t.color}44`, color: t.color }} className="w-10 h-10 border flex items-center justify-center text-lg shrink-0">{t.icon}</div>
                  <div className="flex-1">
                    <div style={{ color:t.color }} className="text-xs font-semibold">{t.tool}</div>
                    <div className={cn("text-[10px]", textMuted)}>{t.status}</div>
                  </div>
                  <div style={{ color:t.color }} className="text-xl font-bold font-mono">{t.assets.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {coverageView === 1 && (
          <div className="flex flex-col gap-4">
            {[
              { label:"IT (2,098 assets)", data:[100,0,0] },
              { label:"OT (489 assets)", data:[100,0,0] },
              { label:"Network (213 assets)", data:[100,0,0] },
              { label:"IoT (127 assets)", data:[100,0,0] },
            ].map((row, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2 text-[11px]">
                  <span className={cn("font-medium", textMain)}>{row.label}</span>
                  <div className={cn("flex gap-3 text-[10px]", textSec)}>
                    <span style={{ color:C.teal }}>■ Tenable: {row.data[0]}%</span>
                    <span style={{ color:C.accent }}>■ NinjaOne: {row.data[1]}%</span>
                    <span style={{ color:C.red }}>■ CrowdStrike: {row.data[2]}%</span>
                  </div>
                </div>
                <div className="flex h-3 overflow-hidden gap-0.5">
                  <div style={{ flex:row.data[0], background:C.teal, opacity:0.8 }} />
                  <div style={{ flex:row.data[1] || 0.01, background:C.accent, opacity:0.4 }} />
                  <div style={{ flex:row.data[2] || 0.01, background:C.red, opacity:0.4 }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Six Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { val:"3,968", label:"Total Assets",        sub:"across all classes",   color:theme==='dark'?C.teal:"#0d9488",  icon:"◈" },
          { val:"0",     label:"Matched",              sub:"cross-hub verified",   color:theme==='dark'?C.amber:"#d97706", icon:"⚡" },
          { val:"3,968", label:"Unmanaged",            sub:"no NinjaOne record",   color:theme==='dark'?C.red:"#dc2626",   icon:"⚠" },
          { val:"0",     label:"Unscanned",            sub:"no Tenable scan",      color:theme==='dark'?C.accent:"#65a30d", icon:"✓" },
          { val:"47",    label:"High-Risk Unpatched",  sub:"action needed",        color:theme==='dark'?C.red:"#dc2626",   icon:"🔴" },
          { val:"12",    label:"Crown Jewel Gaps",     sub:"critical blind spots", color:theme==='dark'?C.amber:"#d97706", icon:"👑" },
        ].map((m, i) => (
          <div key={i} className={cn("flex flex-col relative overflow-hidden p-4 border", theme === 'dark' ? "bg-[#0D0D0D] border-white/[0.05]" : "bg-white border-gray-100 shadow-sm hover:shadow-md")}>
            <div style={{ backgroundColor: m.color }} className="absolute top-0 left-0 right-0 h-0.5" />
            <div className="text-sm mb-1">{m.icon}</div>
            <div style={{ color: m.color }} className="text-3xl font-bold font-mono leading-none my-1">{m.val}</div>
            <div className={cn("text-[10px] tracking-wide uppercase mt-1", textSec)}>{m.label}</div>
            <div className={cn("text-[10px] mt-0.5", textMuted)}>{m.sub}</div>
          </div>
        ))}
      </div>

      {/* Tool Classification */}
      <div className={cardClasses}>
        <div className="flex items-center justify-between mb-5">
          <div className={cn("text-[13px] font-semibold flex items-center gap-2", textMain)}><span style={{ color:C.teal }}>◈</span>Tool Classification</div>
          <div className="flex gap-1.5">
            {["Asset Breakdown","Risk Profile","Coverage Gauge"].map((v, i) => (
              <div key={i} className={cn(
                "border px-2 py-0.5 text-[10px] flex items-center gap-1 cursor-pointer transition-all uppercase tracking-wider font-semibold",
                toolView === i 
                  ? (theme === 'dark' ? "border-primary text-primary bg-primary/10" : "border-[#a3cc00] text-[#a3cc00] bg-[#a3cc00]/10") 
                  : (theme === 'dark' ? "border-white/10 text-gray-500 hover:text-gray-400 hover:border-white/20 bg-transparent" : "border-gray-200 text-gray-500 hover:text-gray-700 bg-transparent")
              )} onClick={() => setToolView(i)}>◈ {v}</div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TOOLS.map((tool, ti) => (
            <div key={ti} className={cn("relative overflow-hidden flex flex-col gap-4 p-4 border", theme === 'dark' ? "bg-white/[0.02]" : "bg-gray-50")} style={{ borderColor: tool.borderCol }}>
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background:tool.color }} />
              <div className="flex items-center gap-3 mt-1.5">
                <div style={{ backgroundColor: tool.dimBg, borderColor: tool.borderCol, color: tool.color }} className="w-10 h-10 border flex items-center justify-center text-lg shrink-0">{tool.icon}</div>
                <div className="flex-1">
                  <div style={{ color: tool.color }} className="text-sm font-semibold">{tool.name}</div>
                  <div className={cn("text-[10px] mt-0.5", textMuted)}>{tool.totalAssets.toLocaleString()} assets</div>
                </div>
                <span style={{ color: tool.statusColor, backgroundColor: tool.dimBg, borderColor: tool.borderCol }} className="text-[10px] px-2 py-0.5 border font-semibold tracking-wide uppercase">{tool.status}</span>
              </div>

              {toolView === 0 && (
                <div className="flex flex-col gap-3">
                  <div className="flex justify-center py-2"><DonutChart segments={tool.assetClasses} size={120} /></div>
                  <div className="flex flex-col gap-2">
                    {tool.assetClasses.map((s, i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <div className="w-2 h-2 shrink-0" style={{ backgroundColor: s.color }} />
                        <span className={cn("text-[11px] flex-1", textSec)}>{s.label}</span>
                        <span style={{ color: s.color }} className="text-[11px] font-mono font-bold">{s.value.toLocaleString()}</span>
                        <span className={cn("text-[10px] w-8 text-right", textMuted)}>{tool.totalAssets > 0 ? `${Math.round(s.value / tool.totalAssets * 100)}%` : "—"}</span>
                      </div>
                    ))}
                  </div>
                  {tool.totalAssets === 0 && <div className={cn("text-center text-[11px] py-1", textMuted)}>No data — tool not deployed</div>}
                </div>
              )}

              {toolView === 1 && (
                <div className="flex flex-col gap-3.5">
                  {tool.riskRows.map((r, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className={cn("text-[11px]", textSec)}>{r.label}</span>
                        <div className="flex items-center gap-2">
                          <span style={{ color: r.color }} className="text-xs font-mono font-bold">{r.value.toLocaleString()}</span>
                          <span className={cn("text-[10px] w-8 text-right", textMuted)}>{r.pct}%</span>
                        </div>
                      </div>
                      <div className={cn("h-1.5 rounded-full overflow-hidden", theme === 'dark' ? "bg-white/10" : "bg-gray-200")}>
                        <div className="h-full transition-all duration-700" style={{ width:`${r.pct}%`, background:r.color }} />
                      </div>
                    </div>
                  ))}
                  {tool.totalAssets === 0 && tool.note && (
                    <div style={{ backgroundColor: tool.dimBg, borderColor: tool.borderCol, color: tool.color }} className="px-3 py-2 border text-[11px] mt-2 font-medium">→ {tool.note}</div>
                  )}
                </div>
              )}

              {toolView === 2 && (
                <div className="flex flex-col items-center gap-4 py-2">
                  <ArcGauge pct={tool.coveragePct} size={140} color={tool.color} label="Coverage" />
                  <div className="w-full flex flex-col pt-2">
                    {tool.stats.map((s, i) => (
                      <div key={i} className={cn("flex justify-between items-center py-2", i < tool.stats.length - 1 && (theme === 'dark' ? "border-b border-white/[0.05]" : "border-b border-gray-100"))}>
                        <span className={cn("text-[11px]", textSec)}>{s.label}</span>
                        <span style={{ color: tool.color }} className="text-[13px] font-mono font-bold">{s.val}</span>
                      </div>
                    ))}
                  </div>
                  {tool.note && <div style={{ backgroundColor: tool.dimBg, borderColor: tool.borderCol, color: tool.color }} className="w-full px-3 py-2 border text-[11px] mt-2 font-medium">→ {tool.note}</div>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Asset Gap Table */}
      <div className={cardClasses}>
        <div className="flex items-center justify-between mb-4">
          <div className={cn("text-[13px] font-semibold flex items-center gap-2", textMain)}><span className="text-amber-500">⚡</span>Asset Gap Analysis</div>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide bg-red-500/10 text-red-500 border border-red-500/20">{DATA.topGaps.length} critical</span>
        </div>
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr>
              {['Hostname / IP', 'Class', 'Risk', 'Tenable', 'Ninja', 'CS', ''].map(h => (
                 <th key={h} className={cn("text-left px-3 py-2 text-[10px] tracking-wide uppercase font-medium border-b", theme === 'dark' ? "text-gray-500 border-white/10" : "text-gray-400 border-gray-200")}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DATA.topGaps.map((g, i) => (
              <tr key={i} className={cn("cursor-pointer transition-colors", theme === 'dark' ? "hover:bg-white/[0.04]" : "hover:bg-gray-100")} onClick={() => navigate(`/asset-inventory/${g.host}`)}>
                <td className={cn("px-3 py-3 border-b align-middle", theme === 'dark' ? "border-white/[0.02]" : "border-gray-100")}>
                  <div className={cn("text-[11px] font-mono", textMain)}>{g.host}</div>
                  <div className={cn("text-[10px] font-mono mt-0.5", textMuted)}>{g.ip}</div>
                </td>
                <td className={cn("px-3 py-3 border-b align-middle", theme === 'dark' ? "border-white/[0.02]" : "border-gray-100")}><span className={cn("inline-flex items-center px-2 py-0.5 text-[10px] font-semibold tracking-wide border rounded-md", g.class === "OT" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : g.class === "Network" ? "bg-blue-500/10 text-blue-500 border-blue-500/20" : "bg-teal-500/10 text-teal-500 border-teal-500/20")}>{g.class}</span></td>
                <td className={cn("px-3 py-3 border-b align-middle", theme === 'dark' ? "border-white/[0.02]" : "border-gray-100")}><span style={{ color: g.risk >= 9 ? C.red : C.amber }} className="text-[13px] font-bold font-mono">{g.risk}</span></td>
                <td className={cn("px-3 py-3 border-b align-middle", theme === 'dark' ? "border-white/[0.02]" : "border-gray-100")}><CheckMark present={true} /></td>
                <td className={cn("px-3 py-3 border-b align-middle", theme === 'dark' ? "border-white/[0.02]" : "border-gray-100")}><CheckMark present={!g.missing.includes("NinjaOne")} /></td>
                <td className={cn("px-3 py-3 border-b align-middle", theme === 'dark' ? "border-white/[0.02]" : "border-gray-100")}><CheckMark present={!g.missing.includes("CrowdStrike")} /></td>
                <td className={cn("px-3 py-3 border-b align-middle text-right", theme === 'dark' ? "border-white/[0.02]" : "border-gray-100")}>
                  <button 
                    className={cn("text-[10px] font-semibold px-2.5 py-1 rounded-md border transition-colors", theme === 'dark' ? "bg-[#c8f000]/10 text-[#c8f000] border-[#c8f000]/20 hover:bg-[#c8f000]/20" : "bg-[#a3cc00]/10 text-[#a3cc00] border-[#a3cc00]/20 hover:bg-[#a3cc00]/20")}
                    onClick={e => { e.stopPropagation(); navigate(`/asset-inventory/${g.host}`); }}
                  >
                    View more →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 px-3.5 py-2.5 bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-500 font-medium">
          → 3,968 total assets missing NinjaOne · 3,968 missing CrowdStrike
        </div>
      </div>

      {/* Detection Timeline */}
      <div className={cardClasses}>
        <div className="flex items-center justify-between mb-4">
          <div className={cn("text-[13px] font-semibold flex items-center gap-2", textMain)}><span style={{ color:C.teal }}>📈</span>Tenable Vulnerability Discovery — 24h Timeline</div>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide bg-teal-500/10 text-teal-500 border border-teal-500/20">Live data</span>
        </div>
        <Sparkline data={DATA.timeline} color={C.teal} height={80} />
        <div className={cn("flex justify-between text-[9px] mt-1.5", textMuted)}>
          <span>24h ago</span>
          {Array.from({ length:6 }, (_, i) => <span key={i}>{20 - i * 4}h ago</span>)}
          <span>Now</span>
        </div>
        <div className="mt-5 flex gap-8 flex-wrap">
          {[
            { label:"Peak (last 24h)", val:Math.max(...DATA.timeline), color:theme==='dark'?C.red:"#dc2626" },
            { label:"Average", val:Math.round(DATA.timeline.reduce((a, v) => a + v, 0) / DATA.timeline.length), color:theme==='dark'?C.amber:"#d97706" },
            { label:"Current", val:DATA.timeline[DATA.timeline.length - 1], color:theme==='dark'?C.teal:"#0d9488" },
            { label:"Total findings", val:DATA.timeline.reduce((a, v) => a + v, 0), color:textMain },
          ].map((s, i) => (
            <div key={i} className="flex flex-col gap-1">
              <div className={cn("text-[10px]", textMuted)}>{s.label}</div>
              <div style={{ color:s.color }} className="text-xl font-bold font-mono">{s.val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
