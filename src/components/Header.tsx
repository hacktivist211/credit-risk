import React from 'react';
import { Brain, Shield, Zap, TrendingUp, Award, Lock } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { Badge } from '@/components/ui/badge';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="p-2 rounded-xl bg-gradient-ai shadow-ai">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -top-1 -right-1">
              <div className="w-3 h-3 bg-ai-accent rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              CrediSense AI
            </h1>
            <p className="text-xs text-muted-foreground font-mono">
              Enterprise Risk Assessment
            </p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="gap-1">
              <Shield className="w-3 h-3" />
              ISO 27001
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <Lock className="w-3 h-3" />
              SOC 2 Type II
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <Award className="w-3 h-3" />
              99.9% SLA
            </Badge>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="font-mono">AI Models Online</span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};