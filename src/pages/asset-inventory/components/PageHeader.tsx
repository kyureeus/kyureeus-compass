import React from 'react';
import { Download, RotateCw, Bot } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  icon: React.ElementType;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  subtitle, 
  icon: Icon 
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.05] mb-8">
      {/* Left Side: Plain Icon & Title */}
      <div className="flex items-center gap-4">
        <Icon size={24} className="text-primary shrink-0" strokeWidth={1.5} />
        
        <div className="flex flex-col">
          <h2 className="text-xl font-heading font-bold text-white tracking-tight leading-tight">
            {title}
          </h2>
          <p className="text-white/40 text-[13px] font-light mt-0.5">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Right Side: Action Buttons */}
      <div className="flex items-center gap-2">
        <button className="group relative h-9 px-4 flex items-center justify-center gap-2 border border-white/10 hover:border-primary/50 bg-white/[0.02] hover:bg-white/[0.05] text-white/60 hover:text-white transition-all duration-300 cursor-pointer overflow-hidden text-xs font-semibold tracking-wider uppercase">
          <Bot size={14} strokeWidth={2} />
          <span>Agentic Bot</span>
          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </button>

        <button className="group relative h-9 px-4 flex items-center justify-center gap-2 border border-white/10 hover:border-primary/50 bg-white/[0.02] hover:bg-white/[0.05] text-white/60 hover:text-white transition-all duration-300 cursor-pointer overflow-hidden text-xs font-semibold tracking-wider uppercase">
          <Download size={14} strokeWidth={2} />
          <span>Export CSV</span>
          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </button>

        <button className="group relative h-9 px-4 flex items-center justify-center gap-2 border border-white/10 hover:border-primary/50 bg-white/[0.02] hover:bg-white/[0.05] text-white/60 hover:text-white transition-all duration-300 cursor-pointer overflow-hidden text-xs font-semibold tracking-wider uppercase">
          <RotateCw size={14} strokeWidth={2} className="group-hover:rotate-180 transition-transform duration-700" />
          <span>Refresh</span>
          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </button>
      </div>
    </div>
  );
};
