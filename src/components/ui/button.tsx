import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'velocity' | 'outline' | 'ghost' | 'glass';
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'icon-sm';
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', children, ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
    
    const variants = {
      default: "bg-surface-elevated text-text-primary border border-border hover:bg-surface",
      velocity: "bg-gradient-primary text-white shadow-medium hover:shadow-strong hover:scale-105",
      outline: "border border-border text-text-primary hover:bg-surface-elevated",
      ghost: "text-text-secondary hover:text-text-primary hover:bg-surface-elevated",
      glass: "bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm"
    };
    
    const sizes = {
      default: "px-4 py-2 text-sm",
      sm: "px-3 py-1.5 text-xs",
      lg: "px-6 py-3 text-base",
      icon: "p-2",
      'icon-sm': "p-1.5"
    };
    
    return (
      <button 
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button }; 