
import { FinancialCalculator } from "@/components/FinancialCalculator";
import { PageLayout } from "@/components/PageLayout";

const Calculator = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Financial Calculator</h1>
          <p className="text-muted-foreground">
            Plan your financial future with precision using our comprehensive calculator suite.
          </p>
        </div>
        
        <FinancialCalculator />
      </div>
    </PageLayout>
  );
};

export default Calculator;
