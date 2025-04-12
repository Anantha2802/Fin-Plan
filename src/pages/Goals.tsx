
import { FinancialGoals } from "@/components/FinancialGoals";
import { PageLayout } from "@/components/PageLayout";

const Goals = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Goals Tracker</h1>
          <p className="text-muted-foreground">
            Set, track, and achieve your financial milestones with our comprehensive goals tracker.
          </p>
        </div>
        
        <FinancialGoals />
      </div>
    </PageLayout>
  );
};

export default Goals;
