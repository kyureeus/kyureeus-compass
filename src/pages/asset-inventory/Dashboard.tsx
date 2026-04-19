import React, { useState } from 'react';
import { Database, TriangleAlert, CircleAlert, ArrowUpRight, ShieldCheck, Activity, Clock } from 'lucide-react';
import { DashboardLayout } from './layouts/DashboardLayout';
import { PageHeader } from './components/PageHeader';
import { StatsCard } from './components/StatsCard';
import { DashboardTabs } from './components/DashboardTabs';
import { OSDistributionCard } from './components/OSDistributionCard';
import { AgentCoverageCard } from './components/AgentCoverageCard';
import { RiskScoreCard } from './components/RiskScoreCard';
import { AssetTable } from './components/AssetTable';
import { AssetInventoryHeader } from './components/AssetInventoryHeader';
import { BotSidebar } from './components/BotSidebar';

export const Dashboard: React.FC = () => {
  const [isBotOpen, setIsBotOpen] = useState(false);

  return (
    <DashboardLayout>
      <BotSidebar isOpen={isBotOpen} onClose={() => setIsBotOpen(false)} />
      {/* Sticky Layout Header */}
      <header className="h-16 border-b border-white/[0.05] bg-black/40 backdrop-blur-xl px-8 flex items-center sticky top-0 z-30">
        <div className="flex items-center gap-3 w-full max-w-7xl mx-auto">
          <Database size={18} className="text-primary hidden md:block" />
          <h1 className="text-sm font-heading font-medium tracking-widest uppercase text-white/40">Overview</h1>
        </div>
      </header>

      {/* Main Page Content */}
      <div className="p-8 md:p-12 w-full max-w-7xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-8">
          <DashboardTabs />
          
          <PageHeader 
            title="IT Assets" 
            subtitle="Enterprise computers, servers, and managed endpoints"
            icon={Database}
            onBotToggle={() => setIsBotOpen(!isBotOpen)}
          />
        </div>

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
          />
          <StatsCard 
            title="Agent Coverage"
            value="1,079"
            trend="739 WITHOUT AGENT (41%)"
            trendType="warning"
            TrendIcon={TriangleAlert}
            Icon={ShieldCheck}
            delay={0.2}
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
    </DashboardLayout>
  );
};

export default Dashboard;
