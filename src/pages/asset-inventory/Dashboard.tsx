import React, { useState } from 'react';
import { Database, TriangleAlert, CircleAlert, ArrowUpRight, ShieldCheck, Activity, Clock } from 'lucide-react';
import { DashboardLayout } from './layouts/DashboardLayout';
import { PageHeader } from './components/PageHeader';
import { StatsCard } from './components/StatsCard';
import { OSDistributionCard } from './components/OSDistributionCard';
import { AgentCoverageCard } from './components/AgentCoverageCard';
import { RiskScoreCard } from './components/RiskScoreCard';
import { AssetTable } from './components/AssetTable';
import { AssetInventoryHeader } from './components/AssetInventoryHeader';
import { BotSidebar } from './components/BotSidebar';
import { AssetDistributionDialog } from './components/AssetDistributionDialog';
import { AgentCoverageDialog } from './components/AgentCoverageDialog';
import { AssetSegregationDialog } from './components/AssetSegregationDialog';
import { UnifiedOverview } from './components/UnifiedOverview';
import { NinjaOneOverview } from './components/NinjaOneOverview';
import { CrowdStrikeOverview } from './components/CrowdStrikeOverview';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../lib/utils';

export const Dashboard: React.FC = () => {
  const { theme } = useTheme();
  const [isBotOpen, setIsBotOpen] = useState(false);
  const [isDistributionOpen, setIsDistributionOpen] = useState(false);
  const [isAgentCoverageOpen, setIsAgentCoverageOpen] = useState(false);
  const [isSegregationOpen, setIsSegregationOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('unified');
  const [unifiedView, setUnifiedView] = useState<'simplified' | 'analyst'>('simplified');

  const tabLabels: Record<string, string> = {
    unified: 'Unified Asset Inventory',
    tenable: 'Tenable Classification',
    ninjaone: 'NinjaOne Classification',
    crowdstrike: 'CrowdStrike Classification'
  };

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <BotSidebar isOpen={isBotOpen} onClose={() => setIsBotOpen(false)} />
      <AssetDistributionDialog isOpen={isDistributionOpen} onClose={() => setIsDistributionOpen(false)} />
      <AgentCoverageDialog isOpen={isAgentCoverageOpen} onClose={() => setIsAgentCoverageOpen(false)} />
      <AssetSegregationDialog isOpen={isSegregationOpen} onClose={() => setIsSegregationOpen(false)} />
      
      {/* Sticky Layout Header */}
      <header className={cn(
        "h-16 border-b transition-all duration-500 backdrop-blur-xl px-8 flex items-center sticky top-0 z-30 justify-between",
        theme === 'dark' 
          ? "border-white/[0.05] bg-black/40" 
          : "border-gray-100 bg-white/60 shadow-sm"
      )}>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Database size={18} className="text-primary hidden md:block" />
            <h1 className={cn(
              "text-sm font-heading font-medium tracking-widest uppercase transition-colors duration-500",
              theme === 'dark' ? "text-white/40" : "text-gray-400"
            )}>Overview</h1>
          </div>
          
          {/* SIMPLIFIED / ANALYST Toggle */}
          {activeTab === 'unified' && (
            <div className={cn(
              "flex p-1 rounded-full border",
              theme === 'dark' ? "bg-black/60 border-white/10" : "bg-gray-100 border-gray-200"
            )}>
              <button 
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all",
                  unifiedView === 'simplified' 
                    ? "bg-primary text-black shadow-sm" 
                    : theme === 'dark' ? "text-white/50 hover:text-white" : "text-gray-500 hover:text-gray-900"
                )}
                onClick={() => setUnifiedView('simplified')}
              >
                SIMPLIFIED
              </button>
              <button 
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all",
                  unifiedView === 'analyst' 
                    ? "bg-primary text-black shadow-sm" 
                    : theme === 'dark' ? "text-white/50 hover:text-white" : "text-gray-500 hover:text-gray-900"
                )}
                onClick={() => setUnifiedView('analyst')}
              >
                ANALYST
              </button>
            </div>
          )}
        </div>
      </header>
      {/* Tabs & Actions Bar */}
      <div className={cn(
        "border-b transition-colors duration-500 px-8 flex flex-col md:flex-row md:items-center justify-between sticky top-16 z-20",
        theme === 'dark' ? "border-white/[0.05] bg-bg-dark/80 backdrop-blur-md" : "border-gray-100 bg-gray-50/80 backdrop-blur-md"
      )}>
        <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-4 pt-4 md:pt-0">
          <div className="flex flex-col">
            <h2 className={cn(
              "text-lg font-heading font-bold tracking-tight transition-colors duration-500",
              theme === 'dark' ? "text-white" : "text-gray-900"
            )}>
              {tabLabels[activeTab]}
            </h2>
            <span className={cn(
              "text-xs font-semibold uppercase tracking-widest",
              theme === 'dark' ? "text-primary/70" : "text-primary"
            )}>
              Current View
            </span>
          </div>
          <div className="pb-4 md:pb-0">
            <PageHeader 
              onBotToggle={() => setIsBotOpen(!isBotOpen)}
              isBotOpen={isBotOpen}
            />
          </div>
        </div>
      </div>

      {/* Main Page Content */}
      <div className="p-8 md:p-12 w-full flex flex-col gap-12">


        {/* Tab Conditional Rendering */}
        {activeTab === 'unified' && (
          <UnifiedOverview 
            onTabSelection={setActiveTab} 
            onTotalAssetsClick={() => setIsSegregationOpen(true)}
            view={unifiedView}
          />
        )}
        
        {activeTab === 'ninjaone' && <NinjaOneOverview />}

        {activeTab === 'crowdstrike' && <CrowdStrikeOverview />}

        {activeTab === 'tenable' && (
          <div className="flex flex-col gap-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Dashboard Statistics Grid (4-Column Layout) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <StatsCard 
                title="Total Assets"
                value="1,818"
                trend="↑ 42"
                trendLabel="unmanaged"
                trendType="negative"
                TrendIcon={ArrowUpRight}
                Icon={Database}
                delay={0.1}
                onClick={() => setIsDistributionOpen(true)}
              />
              <StatsCard 
                title="Agent Coverage"
                value="1,079"
                trend="739 WITHOUT AGENT (41%)"
                trendType="warning"
                TrendIcon={TriangleAlert}
                Icon={ShieldCheck}
                delay={0.2}
                onClick={() => setIsAgentCoverageOpen(true)}
              />
              <StatsCard 
                title="Active Assets (24H)"
                value="896"
                trend="922 INACTIVE (51%)"
                trendType="warning"
                TrendIcon={TriangleAlert}
                Icon={Activity}
                delay={0.3}
              />
              <StatsCard 
                title="Stale (30D)"
                value="35"
                trend="30+ DAYS INACTIVE"
                trendType="negative"
                TrendIcon={CircleAlert}
                Icon={Clock}
                delay={0.4}
              />
            </div>

            {/* Analytics Section: Split Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              {/* Left Side: OS Distribution (Full Height) */}
              <OSDistributionCard />
              
              {/* Right Side: Stacked Analytics (Two High-Fidelity Cards) */}
              <div className="flex flex-col gap-6">
                <AgentCoverageCard />
                <RiskScoreCard />
              </div>
            </div>

            {/* Data Grid Section */}
            <div className="flex flex-col">
              <AssetInventoryHeader />
              <AssetTable />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
