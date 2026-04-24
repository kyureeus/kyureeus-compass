import React from 'react';
import { C } from './constants';
import { useTheme } from '../../../../context/ThemeContext';

// ── ArcGauge ──────────────────────────────────────────────────────────────────
export function ArcGauge({ pct, size = 140, color, label, sublabel }: {
  pct: number; size?: number; color: string; label: string; sublabel?: string;
}) {
  const { theme } = useTheme();
  const borderColor = theme === 'dark' ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const textColor = theme === 'dark' ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)";
  const mutedColor = theme === 'dark' ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.4)";
  
  const r = 50, cx = 70, cy = 78;
  const circ = Math.PI * r;
  const filled = (pct / 100) * circ;
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
      <svg width={size} height={size * 0.72} viewBox="0 0 140 100">
        <path d="M20,78 A50,50 0 0,1 120,78" fill="none" stroke={borderColor} strokeWidth="10" strokeLinecap="round" />
        <path d="M20,78 A50,50 0 0,1 120,78" fill="none" stroke={color} strokeWidth="10" strokeLinecap="round"
          strokeDasharray={`${filled} ${circ}`}
          style={{ transform:"rotate(180deg)", transformOrigin:"70px 78px" }}
        />
        <text x="70" y="72" textAnchor="middle" fill={color} fontSize="20" fontWeight="700" fontFamily="JetBrains Mono">{pct}%</text>
        <text x="70" y="88" textAnchor="middle" fill={textColor} fontSize="8" letterSpacing="1">{label}</text>
      </svg>
      {sublabel && <span style={{ fontSize:10, color:mutedColor, marginTop:-4 }}>{sublabel}</span>}
    </div>
  );
}

// ── Sparkline ─────────────────────────────────────────────────────────────────
export function Sparkline({ data, color, height = 40 }: { data: number[]; color: string; height?: number; }) {
  const w = 200, h = height;
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * (h - 4) - 2;
    return `${x},${y}`;
  }).join(" ");
  const gId = `sg-${color.replace("#","")}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width:"100%", height, display:"block" }} preserveAspectRatio="none">
      <defs>
        <linearGradient id={gId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${h} ${pts} ${w},${h}`} fill={`url(#${gId})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

// ── DonutChart ────────────────────────────────────────────────────────────────
export function DonutChart({ segments, size = 120 }: {
  segments: { label: string; value: number; color: string }[]; size?: number;
}) {
  const { theme } = useTheme();
  const surfaceColor = theme === 'dark' ? "#141416" : "#f9fafb";
  const cardColor = theme === 'dark' ? "#0D0D0D" : "#ffffff";
  const textColor = theme === 'dark' ? "#e0e0f0" : "#111827";
  const textSecColor = theme === 'dark' ? "#888899" : "#6b7280";

  const total = segments.reduce((a, s) => a + s.value, 0) || 1;
  let cumAngle = -90;
  const r = 45, cx = 60, cy = 60;
  const paths = segments.map((seg, i) => {
    const angle = (seg.value / total) * 360;
    const start = cumAngle; cumAngle += angle;
    const s = (start * Math.PI) / 180, e = ((start + angle) * Math.PI) / 180;
    const x1 = cx + r * Math.cos(s), y1 = cy + r * Math.sin(s);
    const x2 = cx + r * Math.cos(e), y2 = cy + r * Math.sin(e);
    return (
      <path key={i} d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${angle > 180 ? 1 : 0},1 ${x2},${y2} Z`}
        fill={seg.color} opacity="0.85" />
    );
  });
  const dispTotal = segments.reduce((a, s) => a + s.value, 0);
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <circle cx={cx} cy={cy} r={r} fill={surfaceColor} />
      {paths}
      <circle cx={cx} cy={cy} r={28} fill={cardColor} />
      <text x={cx} y={cy - 4} textAnchor="middle" fill={textColor} fontSize="14" fontWeight="700" fontFamily="JetBrains Mono">{dispTotal.toLocaleString()}</text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill={textSecColor} fontSize="7" letterSpacing="0.5">ASSETS</text>
    </svg>
  );
}

// ── VennDiagram ───────────────────────────────────────────────────────────────
export function VennDiagram() {
  const { theme } = useTheme();
  const textSecColor = theme === 'dark' ? "#888899" : "#6b7280";
  const mutedColor = theme === 'dark' ? "#555566" : "#9ca3af";

  return (
    <svg viewBox="0 0 320 180" style={{ width:"100%", height:180 }}>
      <ellipse cx="110" cy="90" rx="80" ry="70" fill={C.teal} fillOpacity="0.08" stroke={C.teal} strokeWidth="1.5" strokeOpacity="0.4" />
      <ellipse cx="210" cy="90" rx="80" ry="70" fill={C.accent} fillOpacity="0.08" stroke={C.accent} strokeWidth="1.5" strokeOpacity="0.4" />
      <ellipse cx="160" cy="130" rx="80" ry="55" fill={C.red} fillOpacity="0.08" stroke={C.red} strokeWidth="1.5" strokeOpacity="0.4" />
      <text x="70" y="50" fill={C.teal} fontSize="9" fontWeight="600" textAnchor="middle">TENABLE</text>
      <text x="70" y="62" fill={C.teal} fontSize="11" fontWeight="700" fontFamily="JetBrains Mono" textAnchor="middle">3,968</text>
      <text x="248" y="50" fill={C.accent} fontSize="9" fontWeight="600" textAnchor="middle">NINJAONE</text>
      <text x="248" y="62" fill={C.accent} fontSize="11" fontWeight="700" fontFamily="JetBrains Mono" textAnchor="middle">0</text>
      <text x="160" y="168" fill={C.red} fontSize="9" fontWeight="600" textAnchor="middle">CROWDSTRIKE</text>
      <text x="160" y="155" fill={C.red} fontSize="11" fontWeight="700" fontFamily="JetBrains Mono" textAnchor="middle">0</text>
      <text x="160" y="95" fill={textSecColor} fontSize="9" textAnchor="middle">0 matched</text>
      <text x="160" y="107" fill={mutedColor} fontSize="8" textAnchor="middle">across all 3</text>
    </svg>
  );
}

// ── ToolBadge & CheckMark ─────────────────────────────────────────────────────
export function ToolBadge({ name }: { name: string }) {
  const { theme } = useTheme();
  const cfg: Record<string, { bg: string; color: string; border: string }> = {
    Tenable:    { bg: "rgba(0,212,180,0.1)", color: C.teal, border: "rgba(0,212,180,0.2)" },
    NinjaOne:   { bg: "rgba(200,240,0,0.1)", color: theme==='dark'?C.accent:"#65a30d", border: "rgba(200,240,0,0.2)" },
    CrowdStrike:{ bg: "rgba(255,77,77,0.1)", color: C.red, border: "rgba(255,77,77,0.2)" },
  };
  const t = cfg[name] || { bg: theme==='dark'?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.05)", color: theme==='dark'?"#888899":"#6b7280", border: theme==='dark'?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.1)" };
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:3, padding:"2px 8px", borderRadius:6, background:t.bg, color:t.color, fontSize:10, fontWeight:600, border:`1px solid ${t.border}` }}>
      {name}
    </span>
  );
}

export function CheckMark({ present }: { present: boolean }) {
  const { theme } = useTheme();
  return (
    <div style={{
      width:20, height:20, borderRadius:5,
      background: present ? (theme==='dark'?"rgba(200,240,0,.12)":"rgba(101,163,13,0.1)") : "rgba(255,77,77,.1)",
      border:`1px solid ${present ? (theme==='dark'?"rgba(200,240,0,.3)":"rgba(101,163,13,0.2)") : "rgba(255,77,77,.2)"}`,
      display:"flex", alignItems:"center", justifyContent:"center",
      fontSize:11, color: present ? (theme==='dark'?C.accent:"#65a30d") : C.red
    }}>
      {present ? "✓" : "✗"}
    </div>
  );
}
