import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DATA, C } from './components/unified/constants';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../lib/utils';
import { VulnPriority } from './components/unified/AssetDetailDrawer';

export function AssetDetailsPage() {
  const { assetId } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Find the asset
  const asset = DATA.topGaps.find(a => a.host === assetId);

  // If asset is not found or detail is missing, render error state
  if (!asset || !asset.detail) {
    return (
      <div className={cn("min-h-screen p-8 flex flex-col items-center justify-center", theme === 'dark' ? "bg-[#0d0d0f] text-white" : "bg-white text-gray-900")}>
        <div className="w-16 h-16 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl flex items-center justify-center text-2xl mb-4">
          ⚠
        </div>
        <h2 className="text-xl font-bold mb-2">Asset Not Found</h2>
        <p className={cn("text-sm mb-6", theme === 'dark' ? "text-gray-400" : "text-gray-500")}>
          The asset details for "{assetId}" could not be located in our mock database.
        </p>
        <button 
          onClick={() => navigate(-1)}
          className={cn("px-4 py-2 border rounded-md text-sm font-semibold transition-colors", 
            theme === 'dark' ? "border-white/20 hover:bg-white/5" : "border-gray-200 hover:bg-gray-50"
          )}
        >
          ← Go Back
        </button>
      </div>
    );
  }

  const d = asset.detail;
  
  const textMain = theme === 'dark' ? "text-white" : "text-gray-900";
  const textSec = theme === 'dark' ? "text-gray-400" : "text-gray-500";
  const textMuted = theme === 'dark' ? "text-gray-500" : "text-gray-400";
  const bgMain = theme === 'dark' ? "bg-[#0d0d0f]" : "bg-[#f8f9fa]";
  const surface = theme === 'dark' ? "bg-white/[0.02] border-white/[0.05]" : "bg-white border-gray-100 shadow-sm";
  const subHdr = cn("text-[11px] font-semibold tracking-[1.5px] uppercase pb-2.5 mb-3 flex items-center gap-2 border-b", theme === 'dark' ? "text-gray-400 border-white/[0.05]" : "text-gray-500 border-gray-100");
  const infoRow = cn("flex py-2 border-b last:border-0", theme === 'dark' ? "border-white/[0.04]" : "border-gray-50");

  const sevColor: Record<string, string> = { Critical: C.red, High: C.amber, Medium: "#f0cc00", Low: C.blue };

  const infoSections = [
    {
      title: "Asset Identity",
      rows: [
        ["Hostname", asset.host], ["IP Address", asset.ip], ["FQDN", d.fqdn],
        ["MAC", d.mac], ["OS", d.os], ["Domain", d.domain],
        ["Organization", d.org], ["Class", asset.class], ["Make / Model", d.make],
      ]
    },
    {
      title: "Hardware",
      rows: [
        ["CPU", d.hardware.cpu], ["Memory", d.hardware.ram],
        ["Architecture", d.hardware.arch], ["Serial", d.hardware.serial],
        ["Last Boot", d.lastBoot], ["Logged User", d.loggedUser],
      ]
    },
    {
      title: "Software Inventory",
      rows: [
        ["Total Software", d.software.total], ["Commercial", d.software.commercial],
        ["Prohibited", d.software.prohibited], ["Missing Patches", d.software.missing_patches],
      ]
    },
  ];

  const agentStatus = [
    { label: "Tenable", active: d.tenableAgent, color: C.teal },
    { label: "NinjaOne", active: d.ninjaAgent, color: C.accent },
    { label: "CrowdStrike", active: d.csAgent, color: C.red },
  ];

  return (
    <div className={cn("min-h-screen pb-16 animate-in fade-in duration-500", bgMain)}>
      {/* Top Header */}
      <div className={cn("sticky top-0 z-50 border-b backdrop-blur-md", theme === 'dark' ? "border-white/[0.05] bg-[#0d0d0f]/80" : "border-gray-200 bg-white/80")}>
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className={cn("w-8 h-8 flex items-center justify-center border rounded-md transition-colors", 
                theme === 'dark' ? "border-white/10 hover:bg-white/10 text-gray-400" : "border-gray-200 hover:bg-gray-100 text-gray-600"
              )}
            >
              ←
            </button>
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0 border"
              style={{
                background: asset.risk >= 9 ? "rgba(255,77,77,.12)" : "rgba(240,165,0,.12)",
                borderColor: asset.risk >= 9 ? "rgba(255,77,77,.3)" : "rgba(240,165,0,.3)",
              }}
            >
              {asset.class === "OT" ? "⚙" : asset.class === "Network" ? "🌐" : "💻"}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className={cn("text-xl font-bold font-mono tracking-tight", textMain)}>{asset.host}</h1>
                <span className={cn("inline-flex items-center px-2 py-0.5 text-[10px] font-semibold tracking-wide border rounded-md", asset.class === "OT" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : asset.class === "Network" ? "bg-blue-500/10 text-blue-500 border-blue-500/20" : "bg-teal-500/10 text-teal-500 border-teal-500/20")}>
                  {asset.class}
                </span>
                <span 
                  className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md border"
                  style={{
                    background: asset.risk >= 9 ? "rgba(255,77,77,.12)" : "rgba(240,165,0,.12)",
                    color: asset.risk >= 9 ? C.red : C.amber,
                    borderColor: asset.risk >= 9 ? "rgba(255,77,77,.3)" : "rgba(240,165,0,.2)",
                  }}
                >
                  Risk Score {asset.risk}
                </span>
              </div>
              <div className={cn("text-[12px] mt-1 flex items-center gap-2", textMuted)}>
                <span>IP: {asset.ip}</span>
                <span>•</span>
                <span>Last seen: {d.lastSeen}</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button className={cn("px-4 py-2 border rounded-md text-xs font-semibold transition-colors", theme === 'dark' ? "border-white/10 hover:bg-white/5 text-white" : "border-gray-200 hover:bg-gray-50 text-gray-900")}>Run Full Scan</button>
            <button className="bg-primary text-black px-4 py-2 border-none rounded-md text-xs font-bold transition-colors hover:brightness-110">Patch Asset</button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 mt-6 grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6">
        
        {/* Left Column (Main Specs) */}
        <div className="flex flex-col gap-6">
          
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={cn("p-5 border rounded-none flex flex-col justify-center", surface)}>
              <span className={cn("text-[10px] uppercase tracking-widest font-semibold mb-2", textSec)}>Agent Coverage</span>
              <div className="flex gap-1.5 flex-wrap">
                {agentStatus.map((a, i) => (
                  <div 
                    key={i} 
                    className="flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg text-[10px] font-medium border"
                    style={{ 
                      background: a.active ? (a.color === C.teal ? "rgba(0,212,180,.1)" : a.color === C.accent ? "rgba(200,240,0,.1)" : "rgba(255,77,77,.1)") : "rgba(255,77,77,.12)",
                      borderColor: a.active ? `${a.color}44` : "rgba(255,77,77,.25)",
                      color: a.active ? (theme==='dark'?a.color:(a.color===C.accent?"#84a600":(a.color===C.teal?"#0d9488":a.color))) : C.red,
                    }}
                  >
                    <span className="text-[12px] leading-none">{a.active ? "✓" : "✗"}</span>
                    <span>{a.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={cn("p-5 border rounded-none flex items-center gap-5", surface)}>
               <div className="relative shrink-0 w-16 h-16">
                  <svg width="64" height="64" viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r="28" fill="none" stroke={theme === 'dark' ? "#2a2a32" : "#e5e7eb"} strokeWidth="6" />
                    <circle cx="32" cy="32" r="28" fill="none" stroke={theme === 'dark' ? C.teal : "#0d9488"} strokeWidth="6"
                      strokeLinecap="round" strokeDasharray={`${(d.disk.total > 0 ? d.disk.used / d.disk.total : 0) * 175} 175`}
                      transform="rotate(-90 32 32)" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={cn("text-[13px] font-bold", theme === 'dark' ? "text-[#00d4b4]" : "text-[#0d9488]")}>{d.disk.total > 0 ? Math.round(d.disk.used / d.disk.total * 100) : 0}%</span>
                  </div>
                </div>
                <div>
                  <span className={cn("text-[10px] uppercase tracking-widest font-semibold block mb-1", textSec)}>Storage Utilization</span>
                  <div className={cn("text-xl font-mono font-bold", textMain)}>{d.disk.used} GB <span className={cn("text-sm font-normal", textMuted)}>used of {d.disk.total} GB</span></div>
                </div>
            </div>

            <div className={cn("p-5 border rounded-none flex flex-col justify-center gap-1", surface)}>
              <span className={cn("text-[10px] uppercase tracking-widest font-semibold mb-1", textSec)}>Patch Compliance</span>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-mono font-bold" style={{ color: d.software.missing_patches > 0 ? C.amber : (theme === 'dark' ? C.accent : "#84a600") }}>
                  {d.software.total > 0 ? Math.round(((d.software.total - d.software.missing_patches) / d.software.total) * 100) : 0}%
                </span>
                <div className="flex flex-col">
                   <span className={cn("text-xs font-semibold", textMain)}>{d.software.missing_patches} Missing Patches</span>
                   <span className={cn("text-[10px]", textMuted)}>From NinjaOne</span>
                </div>
              </div>
            </div>
          </div>

          {/* System Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {infoSections.map((sec, si) => (
                <div key={si} className={cn("p-5 border rounded-none", surface)}>
                  <div className={subHdr}>{sec.title}</div>
                  <div className="grid grid-cols-1">
                    {sec.rows.map(([label, val], ri) => (
                      <div key={ri} className={infoRow}>
                        <span className={cn("text-[11px] w-[110px] shrink-0 flex items-center", textSec)}>{label}</span>
                        <span className={cn("text-[12px] font-mono break-all", val === "—" || val === null ? textMuted : textMain)}>{val ?? "—"}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>

          {/* Integrations Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* NINJA ONE */}
             <div className={cn("p-6 border rounded-none", surface)}>
                <div className={subHdr}>NinjaOne Integration</div>
                {d.ninja ? (
                  <div className="flex flex-col mt-4">
                    {[
                      ["Status", d.ninja.status, d.ninja.status === "Online" ? (theme === 'dark' ? C.accent : "#84a600") : C.red],
                      ["Agent version", d.ninja.agent, textMain],
                      ["Platform", d.ninja.platform, textMain],
                      ["Patch policy", d.ninja.patchPolicy, C.blue],
                      ["Last patch", d.ninja.lastPatch, textMain],
                    ].map(([l, v, c]) => (
                      <div key={l} className={infoRow}><span className={cn("text-[11px] w-32 shrink-0", textSec)}>{l}</span><span className="text-[12px]" style={c && typeof c === 'string' && c.startsWith('#') ? { color: c } : {}} className={cn("text-[12px]", typeof c === 'string' && !c.startsWith('#') ? c : "")}>{v}</span></div>
                    ))}
                  </div>
                ) : (
                  <div className="py-6 flex flex-col items-center justify-center text-center">
                     <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-full flex items-center justify-center text-xl mb-3">⚙</div>
                     <span className="text-sm font-semibold text-amber-500 mb-1">NinjaOne Not Deployed</span>
                     <span className={cn("text-[11px] max-w-xs", textMuted)}>Patch management, software inventory, and remote access are unavailable.</span>
                  </div>
                )}
             </div>

             {/* CROWDSTRIKE */}
             <div className={cn("p-6 border rounded-none", surface)}>
                <div className={subHdr}>CrowdStrike Integration</div>
                {d.cs ? (
                  <div className="flex flex-col mt-4">
                    {[
                      ["Status", d.cs.status, d.cs.status === "normal" ? (theme === 'dark' ? C.accent : "#84a600") : C.red],
                      ["Agent version", d.cs.agent, textMain],
                      ["Prevention mode", d.cs.prevention, C.teal],
                      ["External IP", d.cs.externalIp, C.blue],
                      ["Last seen", d.cs.lastSeen, textMain],
                    ].map(([l, v, c]) => (
                      <div key={l} className={infoRow}><span className={cn("text-[11px] w-32 shrink-0", textSec)}>{l}</span><span className="text-[12px]" style={c && typeof c === 'string' && c.startsWith('#') ? { color: c } : {}} className={cn("text-[12px]", typeof c === 'string' && !c.startsWith('#') ? c : "")}>{v}</span></div>
                    ))}
                  </div>
                ) : (
                  <div className="py-6 flex flex-col items-center justify-center text-center">
                     <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 text-red-500 rounded-full flex items-center justify-center text-xl mb-3">🛡</div>
                     <span className="text-sm font-semibold text-red-500 mb-1">CrowdStrike Not Deployed</span>
                     <span className={cn("text-[11px] max-w-xs", textMuted)}>No Falcon sensor detected. Threat detection, EDR, and prevention are unavailable.</span>
                  </div>
                )}
             </div>
          </div>
        </div>

        {/* Right Column (Vulns) */}
        <div className="flex flex-col gap-6">
          <div className={cn("p-6 border rounded-none sticky top-24", surface)}>
            <div className={subHdr}>Vulnerability Snapshot</div>
            <div className="mt-4">
              <VulnPriority vulns={d.vulns} />
            </div>

            <div className={cn("mt-8 pt-6 border-t", theme === 'dark' ? "border-white/[0.05]" : "border-gray-100")}>
               <div className={subHdr}>Top Findings (CVSS Sorted)</div>
               <div className="flex flex-col gap-3 mt-4">
                 {d.vulnList.map((v: any, i: number) => (
                   <div key={i} className={cn("p-3 border rounded-lg", theme === 'dark' ? "bg-black/20 border-white/5" : "bg-gray-50 border-gray-100")}>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[11px] font-mono text-blue-500 font-bold">{v.id}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold" style={{ background: sevColor[v.severity] + "20", color: sevColor[v.severity] }}>
                          {v.severity}
                        </span>
                      </div>
                      <div className={cn("text-[12px] font-medium leading-snug mb-3", textMain)}>{v.name}</div>
                      <div className="flex justify-between items-center">
                        <span className={cn("text-[10px] font-mono", textMuted)}>Plugin: {v.plugin}</span>
                        <span className={cn("text-[11px] font-mono font-bold", v.cvss >= 9 ? "text-red-500" : v.cvss >= 7 ? "text-amber-500" : textMain)}>CVSS {v.cvss}</span>
                      </div>
                   </div>
                 ))}
               </div>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
