import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline';
  children: React.ReactNode;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: "bg-velocity-purple/20 text-velocity-purple border-velocity-purple/30",
      secondary: "bg-text-secondary/20 text-text-secondary border-text-secondary/30",
      outline: "bg-transparent text-text-secondary border-border"
    };
    
    return (
      <div
        className={cn(
          "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border",
          variants[variant],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge }; 