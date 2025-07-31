import React from 'react';
import { AlertTriangle, CheckCircle, XCircle, TrendingDown, TrendingUp, BarChart3, Shield, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

export interface RiskAssessmentResponse {
  default_probability: number;
  risk_tier: string;
  confidence_score: number;
  explanation_card: string;
  structured_explanation?: {
    meta_model: {
      formula: string;
      intercept: number;
      coefficients: Record<string, number>;
    };
    base_models: Array<{
      model_name: string;
      base_value: number;
      final_prediction: number;
      positive_contributors: Array<{
        feature: string;
        value: number;
        shap_value: number;
      }>;
      negative_contributors: Array<{
        feature: string;
        value: number;
        shap_value: number;
      }>;
    }>;
  };
}

interface RiskAssessmentResultProps {
  result: RiskAssessmentResponse;
  onNewAssessment: () => void;
}

export const RiskAssessmentResult: React.FC<RiskAssessmentResultProps> = ({ 
  result, 
  onNewAssessment 
}) => {
  const { default_probability, risk_tier, confidence_score, explanation_card, structured_explanation } = result;
  
  const getRiskIcon = () => {
    if (default_probability < 0.3) return <CheckCircle className="w-8 h-8 text-success" />;
    if (default_probability < 0.6) return <AlertCircle className="w-8 h-8 text-warning" />;
    return <XCircle className="w-8 h-8 text-danger" />;
  };

  const getRiskColor = () => {
    if (default_probability < 0.3) return 'success';
    if (default_probability < 0.6) return 'warning';
    return 'danger';
  };

  const getRiskGradient = () => {
    if (default_probability < 0.3) return 'bg-gradient-success';
    if (default_probability < 0.6) return 'bg-gradient-warning';
    return 'bg-gradient-danger';
  };

  const formatPercentage = (value: number) => `${(value * 100).toFixed(1)}%`;

  const formatFeatureName = (feature: string) => {
    return feature
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6 animate-fade-in">
      
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-4 mb-6">
          {getRiskIcon()}
          <h1 className="text-3xl font-bold">Risk Assessment Complete</h1>
        </div>
      </div>

      {/* Main Risk Summary */}
      <Card className={cn("shadow-elegant border-0", getRiskGradient())}>
        <CardHeader className="text-center text-white">
          <CardTitle className="text-2xl font-bold">
            {risk_tier}
          </CardTitle>
          <CardDescription className="text-white/90 text-lg">
            Default Probability: {formatPercentage(default_probability)}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-white space-y-6">
          
          {/* Risk Probability Bar */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm font-medium">
              <span>Risk Level</span>
              <span>{formatPercentage(default_probability)}</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div 
                className="bg-white h-3 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${default_probability * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-white/80">
              <span>Low Risk</span>
              <span>Medium Risk</span>
              <span>High Risk</span>
            </div>
          </div>

          {/* Confidence Score */}
          <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5" />
              <span className="font-medium">Confidence Score</span>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white">
              {formatPercentage(confidence_score)}
            </Badge>
          </div>

        </CardContent>
      </Card>

      {/* Model Predictions Breakdown */}
      {structured_explanation && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Individual Model Scores */}
          {structured_explanation.base_models.map((model, index) => (
            <Card key={index} className="shadow-card border-0 bg-gradient-subtle">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <BarChart3 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{model.model_name}</CardTitle>
                    <CardDescription>
                      Prediction: {formatPercentage(model.final_prediction)}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                
                {/* Progress Bar for Model */}
                <div className="space-y-2">
                  <Progress 
                    value={model.final_prediction * 100} 
                    className="h-2"
                  />
                </div>

                {/* Top Risk Factors */}
                {model.positive_contributors.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-danger flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Risk Increasing
                    </h4>
                    {model.positive_contributors.slice(0, 3).map((factor, idx) => (
                      <div key={idx} className="flex justify-between text-xs">
                        <span className="text-muted-foreground truncate">
                          {formatFeatureName(factor.feature)}
                        </span>
                        <span className="text-danger font-medium">
                          +{factor.shap_value.toFixed(3)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Top Protective Factors */}
                {model.negative_contributors.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-success flex items-center gap-2">
                      <TrendingDown className="w-4 h-4" />
                      Risk Reducing
                    </h4>
                    {model.negative_contributors.slice(0, 3).map((factor, idx) => (
                      <div key={idx} className="flex justify-between text-xs">
                        <span className="text-muted-foreground truncate">
                          {formatFeatureName(factor.feature)}
                        </span>
                        <span className="text-success font-medium">
                          {factor.shap_value.toFixed(3)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

              </CardContent>
            </Card>
          ))}

        </div>
      )}

      {/* Meta-Model Explanation */}
      {structured_explanation?.meta_model && (
        <Card className="shadow-card border-0 bg-gradient-subtle">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              Ensemble Model Weights
            </CardTitle>
            <CardDescription>
              How the final decision combines all model predictions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-3">Decision Formula:</p>
              <code className="text-xs bg-background p-2 rounded border block">
                {structured_explanation.meta_model.formula}
              </code>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(structured_explanation.meta_model.coefficients).map(([model, weight]) => (
                <div key={model} className="text-center p-3 border rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground">{model}</div>
                  <div className={cn(
                    "text-lg font-bold",
                    weight > 0 ? "text-primary" : "text-muted-foreground"
                  )}>
                    {weight.toFixed(3)}
                  </div>
                </div>
              ))}
            </div>

          </CardContent>
        </Card>
      )}

      {/* Detailed Explanation Card */}
      <Card className="shadow-card border-0 bg-gradient-subtle">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <AlertTriangle className="w-5 h-5 text-primary" />
            </div>
            Detailed Analysis Report
          </CardTitle>
          <CardDescription>
            Comprehensive breakdown of the risk assessment factors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="whitespace-pre-wrap text-sm text-muted-foreground bg-muted/30 p-4 rounded-lg border overflow-x-auto">
            {explanation_card}
          </pre>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 pt-6">
        <button
          onClick={onNewAssessment}
          className="px-8 py-3 bg-gradient-primary text-primary-foreground rounded-lg shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105 font-semibold"
        >
          New Assessment
        </button>
      </div>

    </div>
  );
};