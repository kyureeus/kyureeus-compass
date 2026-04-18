import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Database } from 'lucide-react';
import AnimatedGradientBackground from '../components/ui/AnimatedGradientBackground';

export const AssetInventoryDashboard: React.FC = () => {
  return (
    <div className="relative min-h-screen text-white bg-bg-dark">
      <AnimatedGradientBackground Breathing={false} />
      
      {/* Simple Header */}
      <header className="fixed top-0 left-0 right-0 h-16 border-b border-white/10 bg-black/40 backdrop-blur-md z-40 px-6 flex items-center gap-4">
        <Link to="/" className="text-white/50 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div className="flex items-center gap-2">
          <Database size={20} className="text-primary" />
          <h1 className="text-lg font-heading font-medium">Asset Inventory Dashboard</h1>
        </div>
      </header>

      {/* Main Content Placeholder */}
      <main className="pt-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="p-8 border border-white/10 bg-white/[0.02] backdrop-blur-sm rounded-none md:rounded-2xl">
          <h2 className="text-3xl font-heading font-bold mb-4">Welcome to Asset Inventory</h2>
          <p className="text-white/50 text-lg">
            This is the dedicated dashboard for tracking and managing all your digital assets. 
            Real-time synchronization and discovery modules will load here.
          </p>
        </div>
      </main>
    </div>
  );
};

export default AssetInventoryDashboard;
