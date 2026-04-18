import React from 'react';
import { Database } from 'lucide-react';
import { DashboardLayout } from './layouts/DashboardLayout';

export const Dashboard: React.FC = () => {
  return (
    <DashboardLayout>
      {/* Top action bar specific to the Dashboard overview */}
      <header className="h-16 border-b border-white/10 bg-black/20 backdrop-blur-md px-8 flex items-center sticky top-0 z-30">
        <div className="flex items-center gap-3 w-full max-w-7xl mx-auto">
          <Database size={20} className="text-primary hidden md:block" />
          <h1 className="text-lg font-heading font-medium tracking-wide">Overview</h1>
        </div>
      </header>

      {/* Main Page Content */}
      <div className="p-6 md:p-12 w-full max-w-7xl mx-auto">
        <div className="p-8 border border-white/10 bg-white/[0.02] backdrop-blur-sm rounded-2xl relative overflow-hidden group">
          {/* Subtle targeting corners for the content box as well */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <h2 className="text-3xl font-heading font-bold mb-4">Core Insights</h2>
          <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
            Your centralized view for all digital assets. Metrics and active scanning modules will mount here when deployed.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
