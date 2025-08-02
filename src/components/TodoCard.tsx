import React from 'react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Trash2, Clock, Flag } from 'lucide-react';
import { cn } from '../lib/utils';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  category?: string;
  createdAt: Date;
}

interface TodoCardProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const priorityConfig = {
  high: { color: 'priority-high', label: 'High', icon: Flag },
  medium: { color: 'priority-medium', label: 'Medium', icon: Clock },
  low: { color: 'priority-low', label: 'Low', icon: Clock },
};

export const TodoCard: React.FC<TodoCardProps> = ({ todo, onToggle, onDelete }) => {
  const PriorityIcon = priorityConfig[todo.priority].icon;
  
  return (
    <div 
      className={cn(
        "velocity-glass rounded-xl p-4 velocity-transition velocity-hover",
        "border border-border-elevated shadow-medium",
        todo.completed && "opacity-75",
        `priority-${todo.priority}`
      )}
    >
      <div className="flex items-center gap-4">
        <Checkbox
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="h-5 w-5"
        />
        
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <h3 
              className={cn(
                "text-text-primary font-medium velocity-transition",
                todo.completed && "line-through text-text-muted"
              )}
            >
              {todo.title}
            </h3>
            
            <Badge variant="outline" className="text-xs">
              <PriorityIcon className="w-3 h-3 mr-1" />
              {priorityConfig[todo.priority].label}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2 text-text-muted text-xs">
            <Clock className="w-3 h-3" />
            <span>Created {todo.createdAt.toLocaleDateString()}</span>
            {todo.category && (
              <Badge variant="secondary" className="text-xs">
                {todo.category}
              </Badge>
            )}
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => onDelete(todo.id)}
          className="text-status-error hover:text-white hover:bg-status-error"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}; 