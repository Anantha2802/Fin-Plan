
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

export const FinancialGoals = () => {
  const [goals, setGoals] = useState<any[]>([]);
  const [newGoal, setNewGoal] = useState({
    name: "",
    target: "",
    current: "",
    timeline: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Get user data from localStorage
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserData(parsedData);
      
      // Get existing goals from localStorage or create initial goal based on user's savings goal
      const storedGoals = localStorage.getItem("financialGoals");
      if (storedGoals) {
        setGoals(JSON.parse(storedGoals));
      } else if (parsedData.savingsGoal) {
        // Create initial goal based on user input
        const initialGoal = {
          id: 1,
          name: "Savings Target",
          target: parseFloat(parsedData.savingsGoal),
          current: parseFloat(parsedData.currentSavings || 0),
          timeline: `${parsedData.timeframe} months`,
        };
        setGoals([initialGoal]);
        localStorage.setItem("financialGoals", JSON.stringify([initialGoal]));
      }
    }
  }, []);

  const handleAddGoal = () => {
    if (!newGoal.name || !newGoal.target || !newGoal.current || !newGoal.timeline) {
      toast({
        title: "Missing Information",
        description: "Please fill out all fields to create a new goal",
        variant: "destructive",
      });
      return;
    }

    const goal = {
      id: Math.random().toString(36).substr(2, 9),
      name: newGoal.name,
      target: parseFloat(newGoal.target),
      current: parseFloat(newGoal.current),
      timeline: newGoal.timeline,
    };

    const updatedGoals = [...goals, goal];
    setGoals(updatedGoals);
    
    // Store updated goals in localStorage
    localStorage.setItem("financialGoals", JSON.stringify(updatedGoals));
    
    setNewGoal({
      name: "",
      target: "",
      current: "",
      timeline: "",
    });
    setIsDialogOpen(false);
    
    toast({
      title: "Goal Added",
      description: `Your ${goal.name} goal has been created`,
    });
  };

  const calculatePercentage = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  // If no user data is available, show empty state
  if (!userData) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">Please complete the onboarding process to set your financial goals.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Financial Goals
          </CardTitle>
          <CardDescription>
            Track progress towards your financial objectives
          </CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="h-8 gap-1">
              <Plus className="h-4 w-4" />
              <span>Add Goal</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Financial Goal</DialogTitle>
              <DialogDescription>
                Create a new goal to track your financial progress
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="goal-name" className="text-right">
                  Goal
                </Label>
                <Input
                  id="goal-name"
                  placeholder="e.g. New Car"
                  className="col-span-3"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="goal-target" className="text-right">
                  Target (₹)
                </Label>
                <Input
                  id="goal-target"
                  type="number"
                  placeholder="25000"
                  className="col-span-3"
                  value={newGoal.target}
                  onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="goal-current" className="text-right">
                  Current (₹)
                </Label>
                <Input
                  id="goal-current"
                  type="number"
                  placeholder="5000"
                  className="col-span-3"
                  value={newGoal.current}
                  onChange={(e) => setNewGoal({ ...newGoal, current: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="goal-timeline" className="text-right">
                  Timeline
                </Label>
                <Input
                  id="goal-timeline"
                  placeholder="12 months"
                  className="col-span-3"
                  value={newGoal.timeline}
                  onChange={(e) => setNewGoal({ ...newGoal, timeline: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddGoal}>Add Goal</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {goals.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">You haven't set any financial goals yet.</p>
            <Button onClick={() => setIsDialogOpen(true)}>Add Your First Goal</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {goals.map((goal) => (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{goal.name}</h3>
                  <span className="text-sm text-muted-foreground">
                    Target: ₹{goal.target.toLocaleString()} by {goal.timeline}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={calculatePercentage(goal.current, goal.target)} className="h-2" />
                  <span className="text-sm min-w-[45px] text-right">
                    {calculatePercentage(goal.current, goal.target)}%
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>₹{goal.current.toLocaleString()} saved</span>
                  <span>₹{(goal.target - goal.current).toLocaleString()} to go</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
