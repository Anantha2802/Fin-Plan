import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Calculator, Target, BrainCircuit, Activity } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";

const About = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">About FinPlan Pro</h1>
          <p className="text-muted-foreground text-lg">
            Your comprehensive personal financial planning application
          </p>
        </div>

        <Separator className="my-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Financial Calculator
              </CardTitle>
              <CardDescription>
                Plan your financial future with precision
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Our comprehensive financial calculator helps you plan for various financial goals:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Compound interest calculations</li>
                <li>Loan and EMI planning</li>
                <li>Retirement planning with inflation adjustments</li>
                <li>SIP investment projections</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Goals Tracker
              </CardTitle>
              <CardDescription>
                Set, track, and achieve financial milestones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                The Goals Tracker helps you visualize and stay on track with your financial objectives:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Create personalized financial goals</li>
                <li>Track progress in real-time</li>
                <li>Get notifications for milestone achievements</li>
                <li>Adjust timelines and contribution amounts</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BrainCircuit className="h-5 w-5" />
                AI Insights
              </CardTitle>
              <CardDescription>
                Intelligent financial recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Our AI-driven insights provide personalized recommendations:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Market trend analysis and investment suggestions</li>
                <li>Spending pattern optimization</li>
                <li>Risk assessment and portfolio diversification advice</li>
                <li>Interactive chatbot for financial queries</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Market Trends
              </CardTitle>
              <CardDescription>
                Stay updated with financial markets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Track and analyze current market conditions:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Real-time stock and mutual fund performance</li>
                <li>Currency exchange rate monitoring</li>
                <li>Sector-wise market analysis</li>
                <li>Economic indicator tracking</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-6" />

        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy Policy
          </h2>
          
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Data Protection Commitment</CardTitle>
              <CardDescription>How we handle your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                At FinPlan Pro, we take your privacy seriously. We are committed to protecting your personal and financial information.
              </p>
              
              <h4 className="font-semibold text-lg">Data Collection</h4>
              <p>
                We collect only the information necessary to provide you with our financial planning services, including:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Personal identification information (name, email)</li>
                <li>Financial data you input for calculations and planning</li>
                <li>Application usage patterns to improve our services</li>
              </ul>
              
              <h4 className="font-semibold text-lg">Our Promise</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>No Data Selling:</strong> We will never sell your personal or financial data to third-party financial institutions or marketing companies.
                </li>
                <li>
                  <strong>Data Security:</strong> All your information is encrypted and stored securely according to industry standards.
                </li>
                <li>
                  <strong>Local Storage Priority:</strong> Whenever possible, sensitive financial data is stored locally on your device rather than on our servers.
                </li>
                <li>
                  <strong>Transparency:</strong> We will always notify you about how your data is being used within our application.
                </li>
              </ul>
              
              <h4 className="font-semibold text-lg">Your Control</h4>
              <p>
                You maintain complete control over your data:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Access and export your data at any time</li>
                <li>Delete your account and associated data permanently</li>
                <li>Opt-out of analytical data collection</li>
              </ul>
              
              <p className="mt-4 text-sm text-muted-foreground">
                This privacy policy was last updated on April 12, 2025. We may update this policy periodically to reflect changes in our practices or for other operational, legal, or regulatory reasons.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default About;
