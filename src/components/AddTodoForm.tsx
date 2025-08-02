import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus, Sparkles } from 'lucide-react';
import { Todo } from './TodoCard';

interface AddTodoFormProps {
  onAdd: (todo: Omit<Todo, 'id' | 'completed' | 'createdAt'>) => void;
}

export const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      priority,
      category: category.trim() || undefined,
    });

    setTitle('');
    setCategory('');
    setPriority('medium');
  };

  const getPriorityLabel = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'High Priority';
      case 'medium': return 'Medium Priority';
      case 'low': return 'Low Priority';
      default: return 'Medium Priority';
    }
  };

  return (
    <div className="velocity-glass rounded-xl p-6 border border-border-elevated shadow-medium">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-velocity-purple" />
        <h2 className="text-lg font-semibold text-text-primary">Add New Task</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Input
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="velocity-surface text-text-primary placeholder:text-text-muted border-border-elevated"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-text-secondary">Priority</label>
            <Select value={getPriorityLabel(priority)} onValueChange={(value: string) => {
              if (value === 'High Priority') setPriority('high');
              else if (value === 'Medium Priority') setPriority('medium');
              else if (value === 'Low Priority') setPriority('low');
            }}>
              <SelectTrigger className="velocity-surface text-text-primary border-border-elevated">
                <SelectValue>{getPriorityLabel(priority)}</SelectValue>
              </SelectTrigger>
              <SelectContent className="velocity-surface border-border-elevated">
                <SelectItem value="High Priority" className="text-priority-high">High Priority</SelectItem>
                <SelectItem value="Medium Priority" className="text-priority-medium">Medium Priority</SelectItem>
                <SelectItem value="Low Priority" className="text-priority-low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-text-secondary">Category (Optional)</label>
            <Input
              placeholder="e.g., Work, Personal, Shopping"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="velocity-surface text-text-primary placeholder:text-text-muted border-border-elevated"
            />
          </div>
        </div>
        
        <Button
          type="submit"
          variant="velocity"
          className="w-full"
          disabled={!title.trim()}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </form>
    </div>
  );
}; 