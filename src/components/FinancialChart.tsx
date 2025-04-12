
import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { TrendingUp, PieChart as PieChartIcon, BarChart as BarChartIcon } from "lucide-react";

// Colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#83a6ed', '#8dd1e1'];

export const FinancialChart = () => {
  const [chartType, setChartType] = useState<string>("income-expense");
  const [userData, setUserData] = useState<any>(null);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [expensesData, setExpensesData] = useState<any[]>([]);
  const [investmentsData, setInvestmentsData] = useState<any[]>([]);

  useEffect(() => {
    // Get user data from localStorage
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserData(parsedData);
      
      // Use actual user income data
      const income = parseFloat(parsedData.income) || 5000;
      const expenses = parseFloat(parsedData.monthlyExpenses) || 3000;
      const savings = income - expenses;
      
      // Generate 12 months of data
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const generatedMonthlyData = months.map((month, index) => {
        // Create some variation in monthly data
        const monthIncome = income * (0.9 + Math.random() * 0.2);
        const monthExpenses = expenses * (0.9 + Math.random() * 0.2);
        const monthSavings = monthIncome - monthExpenses;
        
        return {
          name: month,
          income: Math.round(monthIncome),
          expenses: Math.round(monthExpenses),
          savings: Math.round(monthSavings)
        };
      });
      
      setMonthlyData(generatedMonthlyData);
      
      // Generate expense breakdown based on actual expenses
      setExpensesData([
        { name: "Housing", value: Math.round(expenses * 0.35) },
        { name: "Food", value: Math.round(expenses * 0.2) },
        { name: "Transportation", value: Math.round(expenses * 0.15) },
        { name: "Utilities", value: Math.round(expenses * 0.1) },
        { name: "Entertainment", value: Math.round(expenses * 0.08) },
        { name: "Healthcare", value: Math.round(expenses * 0.07) },
        { name: "Other", value: Math.round(expenses * 0.05) }
      ]);
      
      // Generate investment allocation based on risk tolerance
      const riskTolerance = parsedData.riskTolerance || "medium";
      
      if (riskTolerance === "low") {
        setInvestmentsData([
          { name: "Bonds", value: 50 },
          { name: "Stocks", value: 30 },
          { name: "Real Estate", value: 10 },
          { name: "Cash", value: 10 }
        ]);
      } else if (riskTolerance === "medium") {
        setInvestmentsData([
          { name: "Stocks", value: 45 },
          { name: "Bonds", value: 30 },
          { name: "Real Estate", value: 20 },
          { name: "Cash", value: 5 }
        ]);
      } else { // high
        setInvestmentsData([
          { name: "Stocks", value: 70 },
          { name: "Real Estate", value: 20 },
          { name: "Bonds", value: 5 },
          { name: "Cash", value: 5 }
        ]);
      }
    }
  }, []);

  // If no user data is available, show empty state
  if (!userData) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">Please complete the onboarding process to see your financial charts.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Financial Visualization
        </CardTitle>
        <CardDescription>
          Personalized financial charts based on your data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="income-expense" onValueChange={setChartType}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="income-expense" className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Income & Expenses</span>
            </TabsTrigger>
            <TabsTrigger value="expense-breakdown" className="flex items-center gap-1">
              <PieChartIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Expense Breakdown</span>
            </TabsTrigger>
            <TabsTrigger value="investments" className="flex items-center gap-1">
              <BarChartIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Investments</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="income-expense" className="h-[350px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`₹${value}`, undefined]}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="income" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="savings" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="expense-breakdown" className="h-[350px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expensesData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expensesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`₹${value}`, name]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="investments" className="h-[350px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={investmentsData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, "Allocation"]} />
                <Legend />
                <Bar dataKey="value" fill="#8884d8">
                  {investmentsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
