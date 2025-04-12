
import { useState, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { FinancialSidebar } from "@/components/FinancialSidebar";
import { FinancialHeader } from "@/components/FinancialHeader";
import { DashboardStats } from "@/components/DashboardStats";
import { FinancialChart } from "@/components/FinancialChart";
import { Separator } from "@/components/ui/separator";
import { OnboardingForm } from "@/components/OnboardingForm";
import { Calculator, Target, BrainCircuit, Activity } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const { user } = useAuth();
  const [isOnboardingComplete, setIsOnboardingComplete] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Check if user has completed onboarding
    const onboardingStatus = localStorage.getItem("onboardingComplete");
    setIsOnboardingComplete(onboardingStatus === "true");
  }, []);
  
  const handleOnboardingComplete = () => {
    setIsOnboardingComplete(true);
  };
  
  // Show loading state while checking localStorage
  if (isOnboardingComplete === null) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  // Show onboarding form if not completed
  if (!isOnboardingComplete) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <OnboardingForm onComplete={handleOnboardingComplete} />
      </div>
    );
  }
  
  // Show dashboard if onboarding is complete
  return (
    <div className="min-h-screen flex w-full bg-gray-50 dark:bg-gray-900">
      <FinancialSidebar />
      <div className="flex-1 flex flex-col">
        <FinancialHeader />
        <SidebarTrigger className="fixed left-4 top-4 z-50 sm:hidden" />
        
        <main className="flex-1 container mx-auto px-4 py-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome, {user?.name || "User"}
            </h1>
            <p className="text-muted-foreground">
              Welcome to your personal financial advisor. Track, analyze, and plan your financial future.
            </p>
          </div>
          
          <DashboardStats />
          
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight mb-4">Financial Overview</h2>
            <FinancialChart />
          </div>
          
          <Separator className="my-6" />
          
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <a href="/calculator" className="p-6 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Calculator className="h-8 w-8 mb-2 text-blue-500" />
                <h3 className="font-medium">Financial Calculator</h3>
              </a>
              <a href="/goals" className="p-6 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Target className="h-8 w-8 mb-2 text-green-500" />
                <h3 className="font-medium">Goals Tracker</h3>
              </a>
              <a href="/insights" className="p-6 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <BrainCircuit className="h-8 w-8 mb-2 text-purple-500" />
                <h3 className="font-medium">AI Insights</h3>
              </a>
              <a href="/trends" className="p-6 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Activity className="h-8 w-8 mb-2 text-red-500" />
                <h3 className="font-medium">Market Trends</h3>
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
