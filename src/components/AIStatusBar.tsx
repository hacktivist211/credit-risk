import React from 'react';
import { Brain, Cpu, Database, Zap, Shield, TrendingUp, BarChart3 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const AIStatusBar: React.FC = () => {
  const models = [
    { name: 'CatBoost', status: 'active', accuracy: '94.2%', icon: Brain },
    { name: 'XGBoost', status: 'active', accuracy: '93.8%', icon: Zap },
    { name: 'HistGBoost', status: 'active', accuracy: '94.1%', icon: TrendingUp },
  ];

  const metrics = [
    { label: 'Predictions Today', value: '2,847', icon: BarChart3 },
    { label: 'Avg Response Time', value: '142ms', icon: Cpu },
    { label: 'Accuracy Score', value: '94.2%', icon: Shield },
    { label: 'Data Points', value: '500K+', icon: Database },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      
      {/* AI Models Status */}
      <Card className="mb-6 bg-gradient-ai border-0 text-white shadow-ai">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/10">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">AI Ensemble Status</h3>
                <p className="text-white/80 text-sm">Real-time model monitoring</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">All Systems Operational</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {models.map((model, index) => (
              <div key={index} className="p-4 rounded-lg bg-white/10 backdrop-blur">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <model.icon className="w-4 h-4" />
                    <span className="font-medium">{model.name}</span>
                  </div>
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                </div>
                <div className="text-sm text-white/80">
                  Accuracy: <span className="font-semibold text-white">{model.accuracy}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index} className="shadow-card border-0 bg-gradient-subtle">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <metric.icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="text-2xl font-bold text-primary mb-1">{metric.value}</div>
              <div className="text-xs text-muted-foreground">{metric.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};