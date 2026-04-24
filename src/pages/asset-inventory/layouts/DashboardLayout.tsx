import React from 'react';
import { Sidebar } from '../components/Sidebar';
import AnimatedGradientBackground from '../../../components/ui/AnimatedGradientBackground';
import { useTheme } from '../../../context/ThemeContext';
import { cn } from '../../../lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const LayoutContent: React.FC<{ children: React.ReactNode, activeTab: string, onTabChange: (tab: string) => void }> = ({ children, activeTab, onTabChange }) => {
  const { theme } = useTheme();
  
  const darkColors = ["#050505", "#0a041a", "#1a0b3b", "#2a115e", "#3730a3", "#4f46e5", "#7777fa"];
  const lightColors = ["#F9FAFB", "#F3F4F6", "#DDD6FE", "#C4B5FD", "#A78BFA", "#8B5CF6", "#7C3AED"];

  return (
    <div className={cn(
      "relative flex min-h-screen overflow-hidden transition-colors duration-500",
      theme === 'dark' ? "bg-bg-dark text-white" : "bg-gray-50 text-gray-900"
    )}>
      {/* Persistent global background glow for the Asset Inventory SaaS */}
      <AnimatedGradientBackground 
        Breathing={true} 
        gradientColors={theme === 'dark' ? darkColors : lightColors}
        containerClassName={theme === 'dark' ? "opacity-60" : "opacity-30"}
      />

      {/* Collapsible Sidebar Navigation */}
      <Sidebar activeTab={activeTab} onTabChange={onTabChange} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative z-10 w-full h-screen">
        {children}  
      </main>
    </div>
  );
};

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, activeTab, onTabChange }) => {
  return <LayoutContent activeTab={activeTab} onTabChange={onTabChange}>{children}</LayoutContent>;
};
