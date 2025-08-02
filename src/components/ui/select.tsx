import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { ChevronDown } from 'lucide-react';

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

interface SelectTriggerProps {
  children: React.ReactNode;
  className?: string;
}

interface SelectContentProps {
  children: React.ReactNode;
  className?: string;
}

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const Select = ({ value, onValueChange, children, className }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cn("relative", className)}>
      <div ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
        <div className="velocity-surface text-text-primary border-border-elevated w-full p-3 rounded-lg flex items-center justify-between cursor-pointer hover:bg-surface-elevated">
          <span>{value}</span>
          <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 velocity-surface border border-border-elevated rounded-lg shadow-medium z-50">
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child) && child.type === SelectItem) {
              return (
                <div
                  key={child.props.value}
                  className="p-3 cursor-pointer hover:bg-surface-elevated transition-colors"
                  onClick={() => {
                    onValueChange(child.props.value);
                    setIsOpen(false);
                  }}
                >
                  {child.props.children}
                </div>
              );
            }
            return child;
          })}
        </div>
      )}
    </div>
  );
};

const SelectTrigger = ({ children, className }: SelectTriggerProps) => {
  return <div className={className}>{children}</div>;
};

const SelectContent = ({ children, className }: SelectContentProps) => {
  return <div className={className}>{children}</div>;
};

const SelectItem = ({ children, className }: SelectItemProps) => {
  return <div className={className}>{children}</div>;
};

const SelectValue = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export { Select, SelectTrigger, SelectContent, SelectItem, SelectValue }; 