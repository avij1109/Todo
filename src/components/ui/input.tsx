import React from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={cn(
          "velocity-surface text-text-primary placeholder:text-text-muted border-border-elevated w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-velocity-purple/50 focus:border-velocity-purple",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input }; 