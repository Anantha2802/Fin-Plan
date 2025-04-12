
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useState, useEffect } from "react";

// Create sparkline data based on user income
const generateSparklineData = (baseValue: number, variation: number) => {
  return Array(8).fill(0).map((_, i) => ({
    value: Math.max(5, baseValue + (Math.random() * variation * 2 - variation))
  }));
};

export const DashboardStats = () => {
  const [userData, setUserData] = useState<any>(null);
  const [sparklineData, setSparklineData] = useState({
    savings: [] as { value: number }[],
    investments: [] as { value: number }[],
    expenses: [] as { value: number }[]
  });
  
  useEffect(() => {
    // Get user data from localStorage
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserData(parsedData);
      
      // Generate data based on user's actual values
      const monthlySavings = parseFloat(parsedData.income) - parseFloat(parsedData.monthlyExpenses) || 0;
      const currentSavings = parseFloat(parsedData.currentSavings) || 0;
      const currentInvestments = parseFloat(parsedData.currentInvestments) || 0;
      const monthlyExpenses = parseFloat(parsedData.monthlyExpenses) || 0;
      
      setSparklineData({
        savings: generateSparklineData(monthlySavings, monthlySavings * 0.2),
        investments: generateSparklineData(currentInvestments, currentInvestments * 0.25),
        expenses: generateSparklineData(monthlyExpenses, monthlyExpenses * 0.1)
      });
    }
  }, []);
  
  // If no user data is available, show empty state
  if (!userData) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Please complete the onboarding process to see your financial data.</p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Use actual values from user data
  const monthlySavings = parseFloat(userData.income) - parseFloat(userData.monthlyExpenses) || 0;
  const currentInvestments = parseFloat(userData.currentInvestments) || 0;
  const monthlyExpenses = parseFloat(userData.monthlyExpenses) || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Savings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{monthlySavings.toLocaleString()}</div>
          <div className="h-[50px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineData.savings}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#22c55e" 
                  strokeWidth={2} 
                  dot={false} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-muted-foreground flex items-center">
            <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
            Based on {userData.name}'s income and expenses
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Investments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{currentInvestments.toLocaleString()}</div>
          <div className="h-[50px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineData.investments}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  strokeWidth={2} 
                  dot={false} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-muted-foreground flex items-center">
            <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
            Based on your risk tolerance: {userData.riskTolerance}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{monthlyExpenses.toLocaleString()}</div>
          <div className="h-[50px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineData.expenses}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#ef4444" 
                  strokeWidth={2} 
                  dot={false} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-muted-foreground flex items-center">
            <ArrowDownRight className="h-3 w-3 mr-1 text-red-500" />
            Monthly spending
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
