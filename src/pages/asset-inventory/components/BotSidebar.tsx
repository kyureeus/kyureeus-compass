import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Sparkles, MessageSquare } from 'lucide-react';

interface BotSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BotSidebar: React.FC<BotSidebarProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />

          {/* Sidebar Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-[380px] md:w-[420px] bg-[#0A0A0A] border-l border-white/[0.05] shadow-2xl z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.01]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-none bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Bot size={18} className="text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-heading font-bold text-white tracking-tight leading-tight">Agentic AI Assistant</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-white/20 hover:text-white hover:bg-white/5 transition-all rounded-none"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Feed Placeholder */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-primary/60">
                  <Sparkles size={14} />
                  <span className="text-[10px] uppercase font-bold tracking-widest">System Initialization</span>
                </div>
                <div className="bg-white/[0.03] border border-white/[0.05] p-4 rounded-none">
                  <p className="text-sm text-white/60 leading-relaxed font-light">
                    Hello! I am your <span className="text-primary/80 font-medium italic">Agentic Asset Intelligence</span>. I can help you analyze vulnerabilities, track monitored agents, and optimize your inventory policy. How can I assist you today?
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 items-end">
                <div className="bg-primary/5 border border-primary/20 p-4 rounded-none max-w-[85%]">
                  <p className="text-sm text-primary/80 leading-relaxed font-medium">
                    Show me the high-risk linux servers in the DMZ.
                  </p>
                </div>
                <span className="text-[10px] text-white/20 uppercase font-bold tracking-widest">16:34 PM</span>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-primary/60 font-medium">
                  <MessageSquare size={14} />
                  <span className="text-[10px] uppercase font-bold tracking-widest">Agentic Response</span>
                </div>
                <div className="bg-white/[0.03] border border-white/[0.05] p-4 rounded-none">
                  <p className="text-sm text-white/60 leading-relaxed font-light">
                    Querying asset telemetry... Found <span className="text-red-500 font-bold">12 Critical</span> Linux servers with unpatched CVEs. I have highlighted them in your main inventory table.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer / Message Input */}
            <div className="p-6 border-t border-white/[0.05] bg-white/[0.01]">
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Bot size={16} className="text-white/20 group-focus-within:text-primary transition-colors" />
                </div>
                <input 
                  type="text" 
                  placeholder="Ask Agentic AI..." 
                  className="w-full bg-white/[0.02] border border-white/5 rounded-none py-3.5 pl-12 pr-12 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:bg-white/[0.04] transition-all"
                />
                <button className="absolute inset-y-0 right-2 flex items-center px-3 text-white/20 hover:text-primary transition-colors">
                  <Send size={18} />
                </button>
              </div>
              <p className="text-[9px] text-center mt-3 text-white/10 uppercase tracking-[0.2em] font-bold">
                Agentic Bot can analyze telemetry and execute automated scans
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
