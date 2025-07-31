import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/Header';
import { AIStatusBar } from '@/components/AIStatusBar';
import { CreditRiskForm } from '@/components/CreditRiskForm';
import { RiskAssessmentResult, RiskAssessmentResponse } from '@/components/RiskAssessmentResult';

interface FormData {
  date_of_birth: Date;
  gender: "Male" | "Female";
  marital_status: "Married" | "Single" | "Divorced";
  dependent_count: number;
  nationality: string;
  profession: "Salaried" | "Business" | "Self-Employed" | "Student" | "Unemployed";
  current_job_yrs: number;
  income: number;
  loan_amount: number;
  purpose_of_loan: string;
  total_monthly_emi: number;
  house_ownership: "Rented" | "Owned" | "Mortgaged";
  car_ownership: boolean;
  education: string;
  device_type: "Android" | "iOS" | "Other";
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<RiskAssessmentResponse | null>(null);
  const { toast } = useToast();

  const handleFormSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    try {
      // Transform the data to match the API format
      const apiData = {
        ...data,
        date_of_birth: data.date_of_birth.toISOString().split('T')[0], // Convert Date to YYYY-MM-DD string
        car_ownership: data.car_ownership ? 1 : 0, // Convert boolean to 1/0
      };

      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const riskResult: RiskAssessmentResponse = await response.json();
      setResult(riskResult);
      
      toast({
        title: "Assessment Complete",
        description: `Risk Level: ${riskResult.risk_tier}`,
        variant: riskResult.default_probability < 0.3 ? "default" : "destructive",
      });

    } catch (error) {
      console.error('API Error:', error);
      toast({
        title: "Assessment Failed",
        description: error instanceof Error ? error.message : "Failed to connect to the risk assessment service. Please ensure the backend is running.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewAssessment = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      {!result && <AIStatusBar />}
      
      <div className="container mx-auto py-8">
        {!result ? (
          <CreditRiskForm 
            onSubmit={handleFormSubmit} 
            isLoading={isLoading} 
          />
        ) : (
          <RiskAssessmentResult 
            result={result} 
            onNewAssessment={handleNewAssessment} 
          />
        )}
      </div>
    </div>
  );
};

export default Index;
