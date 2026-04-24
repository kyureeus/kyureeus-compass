export const DATA = {
  totalAssets: 3968,
  matched: 0,
  unmanaged: 3968,
  unscanned: 0,
  highRiskUnpatched: 47,
  crownJewelGaps: 12,
  coveragePct: 0,
  tenable: { it: 2098, ot: 489, network: 213, iot: 127, critical: 38, high: 142, medium: 890, low: 1298 },
  ninja: { it: 0, ot: 0, crownJewels: 0, gaps: 0, patched: 0, overdue: 0, neverPatched: 0 },
  crowdstrike: { devices: 0, matched: 0, detections: 0, vulns: 0 },
  topGaps: [
    { 
      host: "bnj-server-01", ip: "10.80.15.147", class: "OT", risk: 9.2, missing: ["NinjaOne", "CrowdStrike"],
      detail: {
        fqdn: "bnj-server-01.prod.local", mac: "00:1A:2B:3C:4D:5E", os: "Oracle Linux 8.10",
        domain: "PROD", org: "Manufacturing", make: "Dell PowerEdge R740",
        lastSeen: "21/04/2026, 08:22:11", lastBoot: "14/04/2026, 02:00:00", loggedUser: "svc-bnj",
        tenableAgent: true, ninjaAgent: false, csAgent: false,
        hardware: { cpu: "Intel Xeon Gold 6230", ram: "128 GB", arch: "x64", serial: "CN-0R3G7Y-74261" },
        software: { total: 142, commercial: 38, prohibited: 0, missing_patches: 15 },
        disk: { total: 2000, used: 1680, free: 320 },
        vulns: { critical: 5, high: 12, medium: 7, low: 2, acrScore: 9.2, exposureScore: 8.8 },
        patches: { overdue: 15, action: "Deploy NinjaOne agent" },
        vulnList: [
          { id: "CVE-2024-21111", name: "Oracle Linux Unauthenticated RCE", severity: "Critical", cvss: 9.8, plugin: "189422" },
          { id: "CVE-2023-48795", name: "SSH Prefix Truncation Vulnerability", severity: "High", cvss: 7.5, plugin: "187219" },
        ],
        ninja: null,
        cs: null
      }
    },
    { 
      host: "sca-204005", ip: "10.25.11.12", class: "IT", risk: 8.7, missing: ["CrowdStrike"],
      detail: {
        fqdn: "sca-204005.corp.local", mac: "00:50:56:AB:CD:EF", os: "Windows Server 2022",
        domain: "CORP", org: "IT", make: "VMware Virtual Platform",
        lastSeen: "23/04/2026, 11:45:00", lastBoot: "20/04/2026, 03:15:00", loggedUser: "admin",
        tenableAgent: true, ninjaAgent: true, csAgent: false,
        hardware: { cpu: "Intel Xeon Platinum 8370C", ram: "64 GB", arch: "x64", serial: "VMW-42-1C-5A" },
        software: { total: 85, commercial: 12, prohibited: 0, missing_patches: 3 },
        disk: { total: 500, used: 320, free: 180 },
        vulns: { critical: 2, high: 6, medium: 4, low: 1, acrScore: 8.7, exposureScore: 8.5 },
        patches: { overdue: 3, action: "Patch available in NinjaOne" },
        vulnList: [
          { id: "CVE-2024-21338", name: "Windows Kernel Privilege Escalation", severity: "High", cvss: 7.8, plugin: "189100" },
        ],
        ninja: { status: "Online", agent: "5.3.102", platform: "Windows", patchPolicy: "Standard Server", lastPatch: "15/04/2026", compliance: 95 },
        cs: null
      }
    },
    { 
      host: "10.10.0.79", ip: "10.10.0.79", class: "Network", risk: 8.1, missing: ["NinjaOne", "CrowdStrike"],
      detail: {
        fqdn: "switch-core-01", mac: "AA:BB:CC:DD:EE:FF", os: "Cisco NX-OS",
        domain: "N/A", org: "Networking", make: "Cisco Nexus 9000",
        lastSeen: "24/04/2026, 09:12:33", lastBoot: "01/01/2026, 00:00:00", loggedUser: "N/A",
        tenableAgent: false, ninjaAgent: false, csAgent: false,
        hardware: { cpu: "N/A", ram: "16 GB", arch: "N/A", serial: "JAF1234567" },
        software: { total: 1, commercial: 1, prohibited: 0, missing_patches: 1 },
        disk: { total: 0, used: 0, free: 0 },
        vulns: { critical: 1, high: 4, medium: 2, low: 0, acrScore: 8.1, exposureScore: 8.0 },
        patches: { overdue: 1, action: "Manual update required" },
        vulnList: [
          { id: "CVE-2023-20198", name: "Cisco IOS XE Web UI Privilege Escalation", severity: "Critical", cvss: 10.0, plugin: "185001" },
        ],
        ninja: null,
        cs: null
      }
    },
    { 
      host: "adi-martinmc-l1", ip: "10.253.156.42", class: "IT", risk: 7.9, missing: ["NinjaOne"],
      detail: {
        fqdn: "adi-martinmc-l1.corp.local", mac: "FC:AA:14:55:66:77", os: "Windows 11 Pro",
        domain: "CORP", org: "Sales", make: "Lenovo ThinkPad T14",
        lastSeen: "24/04/2026, 12:00:00", lastBoot: "24/04/2026, 08:30:00", loggedUser: "martin.mc",
        tenableAgent: true, ninjaAgent: false, csAgent: true,
        hardware: { cpu: "Intel Core i7-1260P", ram: "16 GB", arch: "x64", serial: "PF123456" },
        software: { total: 120, commercial: 45, prohibited: 1, missing_patches: 5 },
        disk: { total: 512, used: 400, free: 112 },
        vulns: { critical: 1, high: 5, medium: 8, low: 10, acrScore: 7.9, exposureScore: 7.5 },
        patches: { overdue: 5, action: "Install missing patches" },
        vulnList: [
          { id: "CVE-2024-0001", name: "Adobe Reader RCE", severity: "Critical", cvss: 9.8, plugin: "190001" },
        ],
        ninja: null,
        cs: { status: "normal", agent: "7.11.185", platform: "Windows", externalIp: "203.0.113.42", prevention: "Enabled", detections: 0, vulns: 2, lastSeen: "24/04/2026, 12:00:00" }
      }
    },
    { 
      host: "ob-sanders-m402", ip: "10.30.10.156", class: "Network", risk: 7.4, missing: ["NinjaOne", "CrowdStrike"],
      detail: {
        fqdn: "ob-sanders-m402.corp.local", mac: "00:11:22:33:44:55", os: "Linux",
        domain: "CORP", org: "Development", make: "Generic PC",
        lastSeen: "22/04/2026, 15:20:00", lastBoot: "10/04/2026, 09:00:00", loggedUser: "sanders",
        tenableAgent: true, ninjaAgent: false, csAgent: false,
        hardware: { cpu: "AMD Ryzen 5 3600", ram: "32 GB", arch: "x64", serial: "N/A" },
        software: { total: 200, commercial: 10, prohibited: 0, missing_patches: 2 },
        disk: { total: 1000, used: 850, free: 150 },
        vulns: { critical: 0, high: 3, medium: 12, low: 5, acrScore: 7.4, exposureScore: 7.2 },
        patches: { overdue: 2, action: "Update packages" },
        vulnList: [
          { id: "CVE-2023-38408", name: "OpenSSH Forwarded Agent RCE", severity: "High", cvss: 8.1, plugin: "179001" },
        ],
        ninja: null,
        cs: null
      }
    },
  ],
  timeline: [12,8,15,22,9,31,18,5,27,14,20,11,33,16,8,24,19,7,28,13,21,10,35,17],
  weeklyDetections: [4,7,2,11,6,3,8,5,12,4,9,3,15,7,4,10,6,2,8,4,11,5,13,6],
};

export const C = {
  bg: "#0d0d0f",
  surface: "#141416",
  card: "#1a1a1e",
  border: "#2a2a32",
  accent: "#c8f000",
  accentDim: "rgba(200,240,0,0.12)",
  teal: "#00d4b4",
  tealDim: "rgba(0,212,180,0.12)",
  amber: "#f0a500",
  amberDim: "rgba(240,165,0,0.12)",
  red: "#ff4d4d",
  redDim: "rgba(255,77,77,0.12)",
  blue: "#4d9fff",
  blueDim: "rgba(77,159,255,0.12)",
  purple: "#a78bfa",
  purpleDim: "rgba(167,139,250,0.12)",
  muted: "#555566",
  text: "#e0e0f0",
  textSec: "#888899",
};


