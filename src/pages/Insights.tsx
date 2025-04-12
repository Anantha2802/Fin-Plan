
import { AIRecommendations } from "@/components/AIRecommendations";
import { PageLayout } from "@/components/PageLayout";

const Insights = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">AI Insights</h1>
          <p className="text-muted-foreground">
            Get personalized financial recommendations and interact with our AI assistant.
          </p>
        </div>
        
        <AIRecommendations />
      </div>
    </PageLayout>
  );
};

export default Insights;
