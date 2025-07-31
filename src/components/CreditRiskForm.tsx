import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, Loader2, CreditCard, User, Building, DollarSign, Brain, Sparkles, Cpu, Zap } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  date_of_birth: z.date({
    required_error: "Date of birth is required.",
  }),
  gender: z.enum(["Male", "Female"], {
    required_error: "Please select a gender.",
  }),
  marital_status: z.enum(["Married", "Single", "Divorced"], {
    required_error: "Please select marital status.",
  }),
  dependent_count: z.number().min(0, "Cannot be negative").max(10, "Maximum 10 dependents"),
  nationality: z.string().min(1, "Nationality is required"),
  profession: z.enum(["Salaried", "Business", "Self-Employed", "Student", "Unemployed"], {
    required_error: "Please select a profession.",
  }),
  current_job_yrs: z.number().min(0, "Cannot be negative").max(50, "Maximum 50 years"),
  income: z.number().min(1, "Income must be greater than 0"),
  loan_amount: z.number().min(1, "Loan amount must be greater than 0"),
  purpose_of_loan: z.string().min(1, "Purpose of loan is required"),
  total_monthly_emi: z.number().min(0, "Cannot be negative"),
  house_ownership: z.enum(["Rented", "Owned", "Mortgaged"], {
    required_error: "Please select house ownership.",
  }),
  car_ownership: z.boolean(),
  education: z.string().min(1, "Education is required"),
  device_type: z.enum(["Android", "iOS", "Other"], {
    required_error: "Please select device type.",
  }),
});

type FormData = z.infer<typeof formSchema>;

export interface CreditRiskFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  isLoading: boolean;
}

export const CreditRiskForm: React.FC<CreditRiskFormProps> = ({ onSubmit, isLoading }) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dependent_count: 0,
      current_job_yrs: 0,
      total_monthly_emi: 0,
      car_ownership: false,
      nationality: "Indian",
      purpose_of_loan: "Personal Loan",
      education: "Graduate",
    },
  });

  const handleSubmit = async (data: FormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/[^\d]/g, '');
    if (numericValue === '') return '';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(parseInt(numericValue));
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 space-y-8">
      
      {/* Futuristic AI Hero Section */}
      <div className="relative text-center space-y-6 mb-12">
        <div className="absolute inset-0 -z-10">
          <div className="w-full h-full bg-gradient-ai opacity-5 rounded-3xl blur-3xl"></div>
        </div>
        
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="relative">
            <div className="p-4 rounded-2xl bg-gradient-ai shadow-ai">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-1 -right-1">
              <Sparkles className="w-5 h-5 text-ai-accent animate-pulse" />
            </div>
          </div>
          <div className="text-left">
            <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              AI Credit Assessment
            </h1>
            <p className="text-sm text-muted-foreground font-mono flex items-center gap-1">
              <Cpu className="w-3 h-3" />
              Powered by Advanced Machine Learning
            </p>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Complete the secure form below to receive an instant, AI-powered credit risk evaluation 
            using our proprietary ensemble of <span className="font-semibold text-primary">CatBoost</span>, 
            <span className="font-semibold text-primary"> XGBoost</span>, and 
            <span className="font-semibold text-primary"> HistGradientBoosting</span> models.
          </p>
          
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-warning" />
              <span>Real-time Analysis</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span>99.9% Uptime</span>
            </div>
            <div className="flex items-center gap-1">
              <CreditCard className="w-4 h-4 text-primary" />
              <span>Bank-Grade Security</span>
            </div>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          
          {/* Personal Information Section */}
          <Card className="shadow-card border-0 bg-gradient-subtle">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">Personal Information</CardTitle>
                  <CardDescription>Basic personal and demographic details</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <FormField
                control={form.control}
                name="date_of_birth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of Birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1940-01-01")
                          }
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="marital_status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marital Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Single">Single</SelectItem>
                        <SelectItem value="Married">Married</SelectItem>
                        <SelectItem value="Divorced">Divorced</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dependent_count"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Dependents</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        max="10"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nationality</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Indian" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="education"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Education Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select education" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="High School">High School</SelectItem>
                        <SelectItem value="Graduate">Graduate</SelectItem>
                        <SelectItem value="Post Graduate">Post Graduate</SelectItem>
                        <SelectItem value="Professional">Professional</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </CardContent>
          </Card>

          {/* Professional Information Section */}
          <Card className="shadow-card border-0 bg-gradient-subtle">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Building className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">Professional Information</CardTitle>
                  <CardDescription>Employment and career details</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <FormField
                control={form.control}
                name="profession"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profession</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select profession" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Salaried">Salaried</SelectItem>
                        <SelectItem value="Business">Business Owner</SelectItem>
                        <SelectItem value="Self-Employed">Self-Employed</SelectItem>
                        <SelectItem value="Student">Student</SelectItem>
                        <SelectItem value="Unemployed">Unemployed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="current_job_yrs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Years in Current Job</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        max="50"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="device_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Device Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select device" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Android">Android</SelectItem>
                        <SelectItem value="iOS">iOS</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </CardContent>
          </Card>

          {/* Financial Information Section */}
          <Card className="shadow-card border-0 bg-gradient-subtle">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">Financial Information</CardTitle>
                  <CardDescription>Income, loan details, and financial commitments</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <FormField
                control={form.control}
                name="income"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Annual Income (INR)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        placeholder="1200000"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormDescription>Your gross annual income</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="loan_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loan Amount Requested (INR)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        placeholder="500000"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormDescription>Amount you wish to borrow</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="purpose_of_loan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purpose of Loan</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select purpose" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Personal Loan">Personal Loan</SelectItem>
                        <SelectItem value="Home Loan">Home Loan</SelectItem>
                        <SelectItem value="Car Loan">Car Loan</SelectItem>
                        <SelectItem value="Education Loan">Education Loan</SelectItem>
                        <SelectItem value="Business Loan">Business Loan</SelectItem>
                        <SelectItem value="Medical Emergency">Medical Emergency</SelectItem>
                        <SelectItem value="Wedding">Wedding</SelectItem>
                        <SelectItem value="Travel">Travel</SelectItem>
                        <SelectItem value="Debt Consolidation">Debt Consolidation</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="total_monthly_emi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Monthly EMIs (INR)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        placeholder="15000"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormDescription>Sum of all existing EMIs</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="house_ownership"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>House Ownership</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select ownership" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Owned">Owned</SelectItem>
                        <SelectItem value="Rented">Rented</SelectItem>
                        <SelectItem value="Mortgaged">Mortgaged</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="car_ownership"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Car Ownership</FormLabel>
                      <FormDescription>Do you own a car?</FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

            </CardContent>
          </Card>

          {/* AI-Powered Submit Section */}
          <div className="relative flex flex-col items-center pt-8 space-y-4">
            <div className="absolute inset-0 -z-10">
              <div className="w-full h-full bg-gradient-ai opacity-10 rounded-3xl blur-2xl"></div>
            </div>
            
            <div className="text-center space-y-2 mb-4">
              <p className="text-sm text-muted-foreground font-mono">
                Ready to deploy AI models for analysis
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></div>
                <span>CatBoost</span>
                <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></div>
                <span>XGBoost</span>
                <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></div>
                <span>HistGradientBoosting</span>
              </div>
            </div>

            <Button
              type="submit"
              variant="submit"
              size="lg"
              disabled={isLoading}
              className="relative min-w-64 h-14 text-lg font-semibold bg-gradient-ai shadow-ai hover:shadow-glow hover:scale-105 transition-all duration-300"
            >
              {isLoading ? (
                <>
                  <Brain className="w-6 h-6 animate-pulse mr-3" />
                  <span className="mr-3">AI Models Processing</span>
                  <Loader2 className="w-5 h-5 animate-spin" />
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-3" />
                  Launch AI Risk Assessment
                  <Zap className="w-5 h-5 ml-3" />
                </>
              )}
            </Button>
          </div>

        </form>
      </Form>
    </div>
  );
};