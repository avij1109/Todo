import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { CheckCircle, Circle, TrendingUp, Zap } from 'lucide-react';
import { Todo } from './TodoCard';

interface TodoStatsProps {
  todos: Todo[];
}

export const TodoStats: React.FC<TodoStatsProps> = ({ todos }) => {
  const completed = todos.filter(todo => todo.completed).length;
  const total = todos.length;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
  const pending = total - completed;
  
  const priorityBreakdown = {
    high: todos.filter(todo => !todo.completed && todo.priority === 'high').length,
    medium: todos.filter(todo => !todo.completed && todo.priority === 'medium').length,
    low: todos.filter(todo => !todo.completed && todo.priority === 'low').length,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="velocity-glass border-border-elevated p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-velocity-purple/20">
            <TrendingUp className="w-5 h-5 text-velocity-purple" />
          </div>
          <div>
            <p className="text-text-muted text-sm">Completion Rate</p>
            <p className="text-2xl font-bold text-text-primary">{completionRate}%</p>
          </div>
        </div>
      </Card>
      
      <Card className="velocity-glass border-border-elevated p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-status-success/20">
            <CheckCircle className="w-5 h-5 text-status-success" />
          </div>
          <div>
            <p className="text-text-muted text-sm">Completed</p>
            <p className="text-2xl font-bold text-text-primary">{completed}</p>
          </div>
        </div>
      </Card>
      
      <Card className="velocity-glass border-border-elevated p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-velocity-orange/20">
            <Circle className="w-5 h-5 text-velocity-orange" />
          </div>
          <div>
            <p className="text-text-muted text-sm">Pending</p>
            <p className="text-2xl font-bold text-text-primary">{pending}</p>
          </div>
        </div>
      </Card>
      
      <Card className="velocity-glass border-border-elevated p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-priority-high/20">
            <Zap className="w-5 h-5 text-priority-high" />
          </div>
          <div>
            <p className="text-text-muted text-sm">High Priority</p>
            <p className="text-2xl font-bold text-text-primary">{priorityBreakdown.high}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}; 