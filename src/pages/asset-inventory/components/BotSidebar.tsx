import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Sparkles, MessageSquare, Loader2, Volume2, VolumeX } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { useTheme } from '../../../context/ThemeContext';

interface BotSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const FadeInText: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 5 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

export const BotSidebar: React.FC<BotSidebarProps> = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnalyzing(true);
      const timer = setTimeout(() => {
        setIsAnalyzing(false);
      }, 5000); // 5 seconds loading
      return () => {
        clearTimeout(timer);
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      };
    } else {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isOpen]);

  const handleSpeak = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const textToSpeak = `I have compiled an executive summary of your current telemetry based on the active dashboard. 
      First, OS Distribution. Your environment is primarily driven by Windows at 50 percent. Network devices make up a significant portion at 17 percent, and Linux represents 15 percent. Note that Linux Kernel 2.6 is still present and may require upgrading. 
      Second, Agent Coverage. We currently have 1,079 assets actively monitored. However, there is a critical 41 percent gap operating without agents, representing a substantial blind spot in the network. 
      Third, Risk Funnel. Good news: there are currently zero Critical assets. However, we have identified 10 High-Risk assets that require patching within 7 days, and 30 assets that are completely unassessed.
      Suggested Action: Would you like me to initiate a targeted scan on the unmonitored assets?`;

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      
      // Attempt to find a high-quality smooth voice
      const voices = window.speechSynthesis.getVoices();
      const preferredVoices = ['Samantha', 'Daniel', 'Karen', 'Google US English', 'Microsoft Zira'];
      
      let selectedVoice = null;
      for (const pref of preferredVoices) {
        selectedVoice = voices.find(v => v.name.includes(pref));
        if (selectedVoice) break;
      }
      
      // Fallback to default English voice
      if (!selectedVoice) {
        selectedVoice = voices.find(v => v.lang.startsWith('en')) || null;
      }
      
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.rate = 0.95; // Slightly slower for smoother articulation
      utterance.pitch = 1.02; // A tiny bit higher pitch for clarity
      
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

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
            className={cn(
              "fixed top-0 right-0 h-full w-[380px] md:w-[450px] border-l shadow-2xl z-[70] flex flex-col transition-colors duration-500",
              theme === 'dark' ? "bg-[#0A0A0A] border-white/[0.05]" : "bg-white border-gray-100"
            )}
          >
            {/* Header */}
            <div className={cn(
              "px-6 py-5 border-b flex items-center justify-between transition-colors duration-500",
              theme === 'dark' ? "border-white/[0.05] bg-white/[0.01]" : "border-gray-50 bg-gray-50/50"
            )}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-none bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Bot size={18} className="text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className={cn(
                    "text-sm font-heading font-bold tracking-tight leading-tight transition-colors duration-500",
                    theme === 'dark' ? "text-white" : "text-gray-900"
                  )}>Agentic AI Assistant</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className={cn(
                      "text-[10px] uppercase tracking-widest font-bold transition-colors duration-500",
                      theme === 'dark' ? "text-white/30" : "text-gray-400"
                    )}>Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={onClose}
                className={cn(
                  "p-2 transition-all rounded-none",
                  theme === 'dark' ? "text-white/20 hover:text-white hover:bg-white/5" : "text-gray-300 hover:text-gray-600 hover:bg-gray-100"
                )}
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Feed */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {/* Initial Greeting */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-primary/60">
                  <Sparkles size={14} />
                  <span className="text-[10px] uppercase font-bold tracking-widest">System Initialization</span>
                </div>
                <div className={cn(
                  "border p-4 rounded-none transition-colors duration-500",
                  theme === 'dark' ? "bg-white/[0.03] border-white/[0.05]" : "bg-gray-50 border-gray-100"
                )}>
                  <p className={cn(
                    "text-sm leading-relaxed font-light transition-colors duration-500",
                    theme === 'dark' ? "text-white/60" : "text-gray-600"
                  )}>
                    Hello! I am your <span className="text-primary/80 font-medium italic">Agentic Asset Intelligence</span>. I am running a deep scan of your entire dashboard telemetry...
                  </p>
                </div>
              </div>

              {/* Loading or Response */}
              {isAnalyzing ? (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3 text-primary/80 mt-4 p-4 border border-primary/20 bg-primary/5 rounded-none"
                >
                  <Loader2 className="animate-spin" size={18} />
                  <span className="text-sm font-medium tracking-wide">Analyzing 1,818 assets across IT, OT, and Network...</span>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-primary/60 font-medium">
                      <MessageSquare size={14} />
                      <span className="text-[10px] uppercase font-bold tracking-widest">Dashboard Analysis Complete</span>
                    </div>
                    {/* Text to Speech Button */}
                    <button 
                      onClick={handleSpeak}
                      className={cn(
                        "group flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 border",
                        isSpeaking 
                          ? "bg-primary/10 text-primary border-primary/30 shadow-[0_0_15px_rgba(79,70,229,0.2)]" 
                          : theme === 'dark'
                            ? "bg-white/[0.03] text-white/60 border-white/10 hover:text-white hover:bg-white/[0.06] hover:border-white/30"
                            : "bg-white text-gray-500 border-gray-200 hover:text-primary hover:bg-primary/5 hover:border-primary/30 shadow-sm"
                      )}
                      title={isSpeaking ? "Stop speaking" : "Listen to analysis"}
                    >
                      <div className={cn("relative flex items-center justify-center", isSpeaking && "animate-pulse")}>
                        {isSpeaking ? <VolumeX size={14} /> : <Volume2 size={14} />}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:block">
                        {isSpeaking ? "Stop Audio" : "Play Audio"}
                      </span>
                    </button>
                  </div>
                  <div className={cn(
                    "border p-5 rounded-none flex flex-col gap-4 transition-colors duration-500",
                    theme === 'dark' ? "bg-white/[0.03] border-white/[0.05]" : "bg-gray-50 border-gray-100"
                  )}>
                    <FadeInText delay={0.1}>
                      <p className={cn("text-sm leading-relaxed", theme === 'dark' ? "text-white/80" : "text-gray-800")}>
                        I have compiled an executive summary of your current telemetry based on the active dashboard. Here are the key takeaways:
                      </p>
                    </FadeInText>

                    <div className="flex flex-col gap-3">
                      <FadeInText delay={0.8}>
                        <div className="flex gap-3">
                          <span className="text-primary font-bold">1.</span>
                          <p className={cn("text-sm font-light leading-relaxed", theme === 'dark' ? "text-white/60" : "text-gray-600")}>
                            <strong className={theme === 'dark' ? "text-white/90" : "text-gray-900"}>OS Distribution:</strong> Your environment is primarily driven by <span className="text-[#bef264] font-medium">Windows (50%)</span>. Network devices make up a significant portion at 17%, and Linux/Unix represents 15%. Note that Linux Kernel 2.6 is still present and may require upgrading.
                          </p>
                        </div>
                      </FadeInText>

                      <FadeInText delay={2.5}>
                        <div className="flex gap-3">
                          <span className="text-primary font-bold">2.</span>
                          <p className={cn("text-sm font-light leading-relaxed", theme === 'dark' ? "text-white/60" : "text-gray-600")}>
                            <strong className={theme === 'dark' ? "text-white/90" : "text-gray-900"}>Agent Coverage:</strong> We currently have <span className="text-green-500 font-medium">1,079 assets actively monitored</span>. However, there is a critical <span className="text-red-500 font-bold italic">41% GAP (739 assets)</span> operating without agents, representing a substantial blind spot in the network.
                          </p>
                        </div>
                      </FadeInText>

                      <FadeInText delay={4.5}>
                        <div className="flex gap-3">
                          <span className="text-primary font-bold">3.</span>
                          <p className={cn("text-sm font-light leading-relaxed", theme === 'dark' ? "text-white/60" : "text-gray-600")}>
                            <strong className={theme === 'dark' ? "text-white/90" : "text-gray-900"}>Risk Funnel:</strong> Good news—there are currently <span className="text-teal-400 font-medium">0 Critical</span> assets. However, we have identified <span className="text-orange-400 font-medium">10 High-Risk assets</span> that require patching within 7 days, and 30 assets that are completely unassessed.
                          </p>
                        </div>
                      </FadeInText>
                    </div>

                    <FadeInText delay={6.5}>
                      <div className="mt-2 pt-4 border-t border-primary/20">
                        <p className={cn("text-xs font-semibold uppercase tracking-widest text-primary/80")}>
                          Suggested Action:
                        </p>
                        <p className={cn("text-sm mt-1 leading-relaxed italic", theme === 'dark' ? "text-white/50" : "text-gray-500")}>
                          Would you like me to initiate a targeted scan on the 739 unmonitored assets?
                        </p>
                      </div>
                    </FadeInText>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer / Message Input */}
            <div className={cn(
              "p-6 border-t transition-colors duration-500 mt-auto",
              theme === 'dark' ? "border-white/[0.05] bg-white/[0.01]" : "border-gray-100 bg-gray-50/50"
            )}>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Bot size={16} className={cn(
                    "transition-colors",
                    theme === 'dark' ? "text-white/20 group-focus-within:text-primary" : "text-gray-300 group-focus-within:text-primary"
                  )} />
                </div>
                <input 
                  type="text" 
                  placeholder="Ask Agentic AI..." 
                  disabled={isAnalyzing}
                  className={cn(
                    "w-full border rounded-none py-3.5 pl-12 pr-12 text-sm transition-all focus:outline-none focus:border-primary/50 transition-colors duration-500",
                    theme === 'dark' 
                      ? "bg-white/[0.02] border-white/5 text-white placeholder:text-white/20 focus:bg-white/[0.04] disabled:opacity-50" 
                      : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:bg-white disabled:opacity-50"
                  )}
                />
                <button 
                  disabled={isAnalyzing}
                  className={cn(
                    "absolute inset-y-0 right-2 flex items-center px-3 transition-colors disabled:opacity-50",
                    theme === 'dark' ? "text-white/20 hover:text-primary" : "text-gray-300 hover:text-primary"
                  )}
                >
                  <Send size={18} />
                </button>
              </div>
              <p className={cn(
                "text-[9px] text-center mt-3 uppercase tracking-[0.2em] font-bold transition-colors duration-500",
                theme === 'dark' ? "text-white/10" : "text-gray-300"
              )}>
                Agentic Bot can analyze telemetry and execute automated scans
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
