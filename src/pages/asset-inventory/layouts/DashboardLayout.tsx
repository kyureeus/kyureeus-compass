import React from 'react';
import { Sidebar } from '../components/Sidebar';
import AnimatedGradientBackground from '../../../components/ui/AnimatedGradientBackground';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="relative flex min-h-screen bg-bg-dark text-white overflow-hidden">
      {/* Persistent global background glow for the Asset Inventory SaaS */}
      <AnimatedGradientBackground Breathing={false} />

      {/* Collapsible Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative z-10 w-full h-screen">
        {children}  
      </main>
    </div>
  );
};
