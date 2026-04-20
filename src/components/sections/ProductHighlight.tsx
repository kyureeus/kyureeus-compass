import React from 'react';
import { Card } from '../ui/Card';
import { 
  Database,
  ShieldCheck,
  LineChart,
  ScrollText,
  Cloud,
  Lock
} from 'lucide-react';
import { motion } from 'framer-motion';

export const ProductHighlight: React.FC = () => {
  return (
    <section className="py-32 relative">
      <div className="flex flex-col items-center w-full">
        {/* Centered Minimalist Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 max-w-3xl px-6"
        >
          <h2 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-white tracking-tight">
            Compass Product
          </h2>
          <p className="text-xl md:text-2xl text-white/40 leading-relaxed font-light">
            Compass provides a unified experience for managing your entire digital ecosystem. 
            Experience absolute control.
          </p>
        </motion.div>

        {/* 3-Column Grid Layout with Seamless Internal Borders - Edge to Edge */}
        <div className="w-full relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-white/[0.08] border-y border-white/[0.08] overflow-hidden">
            <Card 
              title="Asset Inventory" 
              description="A high-performance repository to track and manage all your digital assets."
              meta="v2.4 Core"
              Icon={Database}
              delay={0.1}
              linkTo="/asset-inventory"
            />
            <Card 
              title="Identity Actions" 
              description="Unify and secure user authentication and permissions across all tools."
              meta="Access"
              Icon={ShieldCheck}
              delay={0.2}
            />
            <Card 
              title="Cost Analytics" 
              description="Deep financial insights to optimize your cloud infrastructure burn rate."
              meta="Finance"
              Icon={LineChart}
              delay={0.3}
            />
            <Card 
              title="Audit Logging" 
              description="Immutable enterprise compliance and security event trailing."
              meta="Compliance"
              Icon={ScrollText}
              delay={0.4}
            />
            <Card 
              title="Cloud Orchestrator" 
              description="Deploy and scale microservices through an intuitive visual interface."
              meta="Infra"
              Icon={Cloud}
              delay={0.5}
            />
            <Card 
              title="Security Posture" 
              description="Continuous misconfiguration scanning for zero-trust environments."
              meta="Zero Trust"
              Icon={Lock}
              delay={0.6}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
