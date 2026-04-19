import React from 'react';
import { Database, TriangleAlert, CircleAlert, ArrowUpRight, ShieldCheck, Activity, Clock } from 'lucide-react';
import { DashboardLayout } from './layouts/DashboardLayout';
import { PageHeader } from './components/PageHeader';
import { StatsCard } from './components/StatsCard';
import { DashboardTabs } from './components/DashboardTabs';
import { OSDistributionCard } from './components/OSDistributionCard';

export const Dashboard: React.FC = () => {
  return (
    <DashboardLayout>
      {/* Sticky Layout Header */}
      <header className="h-16 border-b border-white/[0.05] bg-black/40 backdrop-blur-xl px-8 flex items-center sticky top-0 z-30">
        <div className="flex items-center gap-3 w-full max-w-7xl mx-auto">
          <Database size={18} className="text-primary hidden md:block" />
          <h1 className="text-sm font-heading font-medium tracking-widest uppercase text-white/40">Overview</h1>
        </div>
      </header>

      {/* Main Page Content */}
      <div className="p-8 md:p-12 w-full max-w-7xl mx-auto">
        <DashboardTabs />
        
        <PageHeader 
          title="IT Assets" 
          subtitle="Enterprise computers, servers, and managed endpoints"
          icon={Database}
        />

        {/* Dashboard Statistics Grid (4-Column Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {/* ... existing StatsCards remain but updated icons ... */}
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
            showUnderline={true}
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

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-12 xl:col-span-8">
            <OSDistributionCard />
          </div>
          
          {/* Reserved for future right-side analytics cards */}
          <div className="lg:col-span-12 xl:col-span-4 flex flex-col gap-6">
            <div className="h-full min-h-[400px] border border-dashed border-white/10 flex items-center justify-center text-white/10 uppercase tracking-widest text-xs font-bold">
               Vulnerability Feed Placeholder
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
