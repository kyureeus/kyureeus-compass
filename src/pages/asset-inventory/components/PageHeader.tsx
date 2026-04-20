import { Download, RotateCw, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';
import { cn } from '../../../lib/utils';

interface PageHeaderProps {
  title: string;
  onBotToggle?: () => void;
  isBotOpen?: boolean;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  onBotToggle,
  isBotOpen
}) => {
  const { theme } = useTheme();

  return (
    <div className={cn(
      "flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b mb-8 transition-colors duration-500",
      theme === 'dark' ? "border-white/[0.05]" : "border-gray-100"
    )}>
      {/* Left Side: Breadcrumbs & Title */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 overflow-hidden">
          <Link to="/" className={cn(
            "text-[11px] font-bold uppercase tracking-[0.1em] transition-colors",
            theme === 'dark' ? "text-white/20 hover:text-white/60" : "text-gray-400 hover:text-primary"
          )}>Main Hub</Link>
          <ChevronRight size={10} className={theme === 'dark' ? "text-white/10" : "text-gray-300"} />
          <span className={cn(
            "text-[11px] font-bold uppercase tracking-[0.1em] transition-colors",
            theme === 'dark' ? "text-white/40" : "text-primary"
          )}>{title}</span>
        </div>
        
        <h1 className={cn(
          "text-2xl font-heading font-black tracking-tighter transition-colors duration-500",
          theme === 'dark' ? "text-white" : "text-gray-900"
        )}>
          {title}
        </h1>
      </div>
 
      {/* Right Side: Action Buttons */}
      <div className="flex items-center gap-2">
        <button 
          onClick={onBotToggle}
          className={cn(
            "flex items-center gap-2 px-4 h-9 transition-all duration-300 font-bold text-[11px] border relative group overflow-hidden",
            isBotOpen 
              ? "bg-primary text-black border-primary" 
              : theme === 'dark'
                ? "bg-white/[0.03] text-white/60 border-white/10 hover:border-primary/50 hover:text-white"
                : "bg-gray-900 text-white border-gray-900 hover:bg-gray-800"
          )}
        >
          {isBotOpen ? (
            <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
               <span className="uppercase tracking-widest">Bot active</span>
            </div>
          ) : (
            <>
              <Sparkles size={14} className="group-hover:rotate-12 transition-transform" />
              <span className="uppercase tracking-widest">Agentic Bot</span>
            </>
          )}
        </button>

        <button className={cn(
          "group relative h-9 px-4 flex items-center justify-center gap-2 border transition-all duration-300 cursor-pointer overflow-hidden text-xs font-semibold tracking-wider uppercase",
          theme === 'dark' 
            ? "border-white/10 bg-white/[0.02] text-white/60 hover:border-primary/50 hover:text-white hover:bg-white/[0.05]"
            : "border-gray-200 bg-gray-50 text-gray-500 hover:border-primary/30 hover:text-primary hover:bg-primary/5"
        )}>
          <Download size={14} strokeWidth={2} />
          <span>Export CSV</span>
          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </button>

        <button className={cn(
          "group relative h-9 px-4 flex items-center justify-center gap-2 border transition-all duration-300 cursor-pointer overflow-hidden text-xs font-semibold tracking-wider uppercase",
          theme === 'dark' 
            ? "border-white/10 bg-white/[0.02] text-white/60 hover:border-primary/50 hover:text-white hover:bg-white/[0.05]"
            : "border-gray-200 bg-gray-50 text-gray-500 hover:border-primary/30 hover:text-primary hover:bg-primary/5"
        )}>
          <RotateCw size={14} strokeWidth={2} className="group-hover:rotate-180 transition-transform duration-700" />
          <span>Refresh</span>
          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </button>
      </div>
    </div>
  );
};
