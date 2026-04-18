import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedGradientBackground from '../components/ui/AnimatedGradientBackground';
import { ProductHighlight } from '../components/sections/ProductHighlight';

export const LandingPage: React.FC = () => {
  return (
    <div className="relative min-h-screen">
      {/* Premium Animated Background Layer */}
      <AnimatedGradientBackground 
        Breathing={true} 
        animationSpeed={0.01} 
        breathingRange={10} 
      />

      {/* Navigation Layer - Pill Style with Glow Button */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl px-4">
        <div className="h-16 flex items-center justify-between px-8 rounded-full border border-white/10 bg-black/40 backdrop-blur-3xl shadow-2xl">
          <Link to="/" className="flex items-center gap-2 no-underline text-white">
            {/* Logo from reference: 4-dot diamond */}
            <div className="grid grid-cols-2 gap-0.5">
              <div className="w-2 h-2 rounded-full bg-white"></div>
              <div className="w-2 h-2 rounded-full bg-white/40 shadow-[0_0_8px_white]"></div>
              <div className="w-2 h-2 rounded-full bg-white/40"></div>
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>
            <h2 className="text-xl font-heading mb-0 hidden md:block">Compass</h2>
          </Link>

          <div className="hidden md:flex gap-4">
            <Link to="/" className="nav-pill">Products</Link>
            <Link to="/" className="nav-pill">Stories</Link>
            <Link to="/" className="nav-pill">Pricing</Link>
            <Link to="/" className="nav-pill">Docs</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/" className="hidden sm:block text-white/70 hover:text-white no-underline text-sm font-medium">Contact</Link>
            <button className="btn-glow text-sm py-2 px-6">Get Started</button>
          </div>
        </div>
      </nav>

      <main className="pt-24">
        <ProductHighlight />
      </main>

      <footer className="py-16 border-t border-white/5 text-center text-text-muted">
        <p>© 2026 Kyureeus Compass. Elevating digital ventures with precision.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
