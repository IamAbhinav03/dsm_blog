import React, { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface CollapsibleProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  variant?: 'default' | 'technical';
}

export function Collapsible({ title, icon, children, variant = 'default' }: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(false);

  const bgClass = variant === 'technical'
    ? 'bg-primary/[0.03] border-primary/10 hover:border-primary/20'
    : 'bg-white border-primary/10 hover:border-primary/20';

  return (
    <div className={`border ${bgClass} transition-colors duration-300 mb-6`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left cursor-pointer group"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          {icon && <span className="text-primary/60">{icon}</span>}
          <span className="font-mono text-xs font-bold text-primary/70 uppercase tracking-widest">
            {title}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-primary/40 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className="collapsible-content"
        data-open={isOpen ? 'true' : 'false'}
      >
        <div className="px-5 pb-5 border-t border-primary/5 pt-4">
          {children}
        </div>
      </div>
    </div>
  );
}
