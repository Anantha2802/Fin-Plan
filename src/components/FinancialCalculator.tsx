
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Wallet, TrendingUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Financial calculation functions (Innovation)
const calculateCompoundInterest = (principal: number, rate: number, time: number, frequency: number) => {
  const r = rate / 100;
  const n = frequency;
  const t = time;
  const amount = principal * Math.pow(1 + r/n, n*t);
  return amount.toFixed(2);
};

const calculateSimpleInterest = (principal: number, rate: number, time: number) => {
  const interest = (principal * rate * time) / 100;
  return (principal + interest).toFixed(2);
};

const calculateRetirement = (
  currentSavings: number, 
  monthlyContribution: number, 
  timeHorizon: number, 
  expectedReturn: number,
  inflationRate: number = 0
) => {
  let total = currentSavings;
  const monthlyRate = expectedReturn / 100 / 12;
  
  for (let i = 0; i < timeHorizon * 12; i++) {
    total = total * (1 + monthlyRate) + monthlyContribution;
  }
  
  // Calculate inflation-adjusted value if inflation rate is provided
  if (inflationRate > 0) {
    const inflationAdjustment = Math.pow(1 + (inflationRate / 100), timeHorizon);
    const inflationAdjustedValue = total / inflationAdjustment;
    return {
      nominalValue: total.toFixed(2),
      inflationAdjustedValue: inflationAdjustedValue.toFixed(2)
    };
  }
  
  return {
    nominalValue: total.toFixed(2),
    inflationAdjustedValue: total.toFixed(2)
  };
};

export const FinancialCalculator = () => {
  // Compound Interest state
  const [principal, setPrincipal] = useState<string>("10000");
  const [rate, setRate] = useState<string>("5");
  const [time, setTime] = useState<string>("10");
  const [frequency, setFrequency] = useState<string>("12");
  const [compoundResult, setCompoundResult] = useState<string>("");
  
  // Simple Interest state
  const [simplePrincipal, setSimplePrincipal] = useState<string>("10000");
  const [simpleRate, setSimpleRate] = useState<string>("5");
  const [simpleTime, setSimpleTime] = useState<string>("10");
  const [simpleResult, setSimpleResult] = useState<string>("");
  
  // Retirement state
  const [currentSavings, setCurrentSavings] = useState<string>("50000");
  const [monthlyContribution, setMonthlyContribution] = useState<string>("500");
  const [timeHorizon, setTimeHorizon] = useState<string>("30");
  const [expectedReturn, setExpectedReturn] = useState<string>("7");
  const [inflationRate, setInflationRate] = useState<string>("5");
  const [retirementNominalResult, setRetirementNominalResult] = useState<string>("");
  const [retirementAdjustedResult, setRetirementAdjustedResult] = useState<string>("");

  const calculateCompound = () => {
    try {
      const result = calculateCompoundInterest(
        parseFloat(principal), 
        parseFloat(rate), 
        parseFloat(time), 
        parseFloat(frequency)
      );
      setCompoundResult(result);
      toast({
        title: "Calculation Complete",
        description: `Your investment will grow to ₹${result}`,
      });
    } catch (error) {
      toast({
        title: "Calculation Error",
        description: "Please check your inputs and try again",
        variant: "destructive",
      });
    }
  };

  const calculateSimple = () => {
    try {
      const result = calculateSimpleInterest(
        parseFloat(simplePrincipal), 
        parseFloat(simpleRate), 
        parseFloat(simpleTime)
      );
      setSimpleResult(result);
      toast({
        title: "Calculation Complete",
        description: `Your investment will grow to ₹${result}`,
      });
    } catch (error) {
      toast({
        title: "Calculation Error",
        description: "Please check your inputs and try again",
        variant: "destructive",
      });
    }
  };

  const calculateRetirementNest = () => {
    try {
      const result = calculateRetirement(
        parseFloat(currentSavings),
        parseFloat(monthlyContribution),
        parseFloat(timeHorizon),
        parseFloat(expectedReturn),
        parseFloat(inflationRate)
      );
      
      setRetirementNominalResult(result.nominalValue);
      setRetirementAdjustedResult(result.inflationAdjustedValue);
      
      toast({
        title: "Retirement Projection Complete",
        description: `Your nominal retirement nest egg could be ₹${result.nominalValue}`,
      });
    } catch (error) {
      toast({
        title: "Calculation Error",
        description: "Please check your inputs and try again",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Financial Calculator
        </CardTitle>
        <CardDescription>
          Calculate different financial scenarios to plan your future
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="compound">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="compound">Compound Interest</TabsTrigger>
            <TabsTrigger value="simple">Simple Interest</TabsTrigger>
            <TabsTrigger value="retirement">Retirement</TabsTrigger>
          </TabsList>
          
          <TabsContent value="compound" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="principal">Initial Investment (₹)</Label>
                <Input 
                  id="principal"
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rate">Annual Interest Rate (%)</Label>
                <Input 
                  id="rate"
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time Period (years)</Label>
                <Input 
                  id="time"
                  type="number"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="frequency">Compounding Frequency (per year)</Label>
                <Input 
                  id="frequency"
                  type="number"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                />
              </div>
            </div>
            <Button onClick={calculateCompound} className="w-full">Calculate</Button>
            
            {compoundResult && (
              <div className="mt-4 p-4 border rounded-md bg-muted">
                <p className="font-semibold">Future Value:</p>
                <p className="text-2xl font-bold">₹{compoundResult}</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="simple" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="simplePrincipal">Principal Amount (₹)</Label>
                <Input 
                  id="simplePrincipal"
                  type="number"
                  value={simplePrincipal}
                  onChange={(e) => setSimplePrincipal(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="simpleRate">Interest Rate (%)</Label>
                <Input 
                  id="simpleRate"
                  type="number"
                  value={simpleRate}
                  onChange={(e) => setSimpleRate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="simpleTime">Time Period (years)</Label>
                <Input 
                  id="simpleTime"
                  type="number"
                  value={simpleTime}
                  onChange={(e) => setSimpleTime(e.target.value)}
                />
              </div>
            </div>
            <Button onClick={calculateSimple} className="w-full">Calculate</Button>
            
            {simpleResult && (
              <div className="mt-4 p-4 border rounded-md bg-muted">
                <p className="font-semibold">Future Value:</p>
                <p className="text-2xl font-bold">₹{simpleResult}</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="retirement" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currentSavings">Current Savings (₹)</Label>
                <Input 
                  id="currentSavings"
                  type="number"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthlyContribution">Monthly Contribution (₹)</Label>
                <Input 
                  id="monthlyContribution"
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeHorizon">Years Until Retirement</Label>
                <Input 
                  id="timeHorizon"
                  type="number"
                  value={timeHorizon}
                  onChange={(e) => setTimeHorizon(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expectedReturn">Expected Annual Return (%)</Label>
                <Input 
                  id="expectedReturn"
                  type="number"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="inflationRate">Expected Inflation Rate (%)</Label>
                <Input 
                  id="inflationRate"
                  type="number"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(e.target.value)}
                />
              </div>
            </div>
            <Button onClick={calculateRetirementNest} className="w-full">Calculate</Button>
            
            {retirementNominalResult && (
              <div className="mt-4 space-y-4">
                <div className="p-4 border rounded-md bg-muted">
                  <p className="font-semibold">Nominal Future Value:</p>
                  <p className="text-2xl font-bold">₹{retirementNominalResult}</p>
                  <p className="text-sm text-muted-foreground">Before adjusting for inflation</p>
                </div>
                
                <div className="p-4 border rounded-md bg-muted">
                  <p className="font-semibold">Inflation-Adjusted Value:</p>
                  <p className="text-2xl font-bold">₹{retirementAdjustedResult}</p>
                  <p className="text-sm text-muted-foreground">In today's purchasing power</p>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
