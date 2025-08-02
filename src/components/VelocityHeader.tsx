import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Zap, Settings, User } from 'lucide-react';
import velocityHero from '../assets/velocity-hero.webp';

interface VelocityHeaderProps {
  completedToday: number;
  totalToday: number;
}

export const VelocityHeader: React.FC<VelocityHeaderProps> = ({ completedToday, totalToday }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl velocity-glass border border-border-elevated shadow-strong mb-8">
      {/* Background Image */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${velocityHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-primary opacity-80" />
      
      {/* Content */}
      <div className="relative p-8">
        <div className="flex items-center justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white">Velocity</h1>
                <p className="text-white/80 text-lg">Move forward with purpose</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge className="bg-white/20 text-white border-white/30">
                Today: {completedToday}/{totalToday}
              </Badge>
              <Badge className="bg-status-success/20 text-white border-status-success/30">
                {totalToday > 0 ? Math.round((completedToday / totalToday) * 100) : 0}% Complete
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="glass" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
            <Button variant="glass" size="icon">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}; 