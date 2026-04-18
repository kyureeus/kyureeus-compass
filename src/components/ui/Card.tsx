import React from 'react';
import { motion } from 'framer-motion';
import { type LucideIcon, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';

interface CardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  meta: string;
  className?: string;
  delay?: number;
  linkTo?: string;
}

export const Card: React.FC<CardProps> = ({ 
  title, 
  description,
  Icon, 
  meta,
  className = "",
  delay = 0,
  linkTo
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (linkTo) {
      navigate(linkTo);
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.45, 0.32, 0.9] }}
      className={cn(
        "group relative w-full aspect-square md:aspect-auto md:min-h-[400px] overflow-hidden",
        "bg-[#050505]", // solid dark background to create grid lines against the container
        "flex flex-col justify-between p-8 md:p-10",
        linkTo && "cursor-pointer",
        className
      )}
    >
      {/* Background Hover Effect: Purple Half-Fill */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none z-0"></div>

      {/* Target Crosshairs / Corner Borders (Visible on Hover) */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20">
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary"></div>
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary"></div>
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary"></div>
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary"></div>
        
        {/* Full Inner Border Highlight */}
        <div className="absolute inset-0 border border-primary/30"></div>
      </div>

      {/* Top Row: Meta & Action */}
      <div className="relative z-10 flex justify-between items-start w-full">
        {/* Left: Icon and Meta text */}
        <div className="flex items-center gap-3 text-white/50 group-hover:text-white/80 transition-colors duration-300">
          <Icon size={18} strokeWidth={2} />
          <span className="text-sm font-semibold tracking-wide uppercase">{meta}</span>
        </div>

        {/* Right: Interaction Arrow */}
        <div className="shrink-0">
          <ArrowUpRight 
            size={24} 
            strokeWidth={2} 
            className="text-white/0 group-hover:text-white transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" 
          />
        </div>
      </div>

      {/* Bottom Content: Title & Description Reveal */}
      <div className="relative z-10 mt-auto flex flex-col justify-end">
        <div className="transform transition-transform duration-500 ease-out group-hover:-translate-y-2">
          <h3 className="text-3xl md:text-4xl font-heading font-medium text-white/90 group-hover:text-white tracking-tight leading-tight transition-colors duration-300">
            {title}
          </h3>
        </div>

        {/* Expandable Description */}
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
          <div className="min-h-0 overflow-hidden">
            <p className="pt-2 text-base md:text-lg text-white/60 font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
              {description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
