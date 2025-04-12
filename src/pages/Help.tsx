import { PageLayout } from "@/components/PageLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, FileQuestion, Lightbulb, BookOpen } from "lucide-react";

const Help = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
          <p className="text-muted-foreground">
            Find answers to your questions and get assistance with using the application.
          </p>
        </div>
        
        <Tabs defaultValue="faq" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="faq" className="flex items-center gap-2">
              <FileQuestion className="h-4 w-4" />
              <span className="hidden sm:inline">FAQ</span>
            </TabsTrigger>
            <TabsTrigger value="guides" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Guides</span>
            </TabsTrigger>
            <TabsTrigger value="tips" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              <span className="hidden sm:inline">Tips</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Contact</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="faq" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>
                  Find answers to common questions about FinPlan Pro.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do I reset my password?</AccordionTrigger>
                    <AccordionContent>
                      To reset your password, go to the login page and click on "Forgot Password". 
                      Enter your email address, and we'll send you a link to reset your password.
                      Follow the instructions in the email to create a new password.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Is my financial data secure?</AccordionTrigger>
                    <AccordionContent>
                      Yes, we take security very seriously. All your data is encrypted both in transit 
                      and at rest. We use industry-standard security protocols and never share your 
                      financial information with third parties without your explicit consent.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Can I export my financial data?</AccordionTrigger>
                    <AccordionContent>
                      Yes, you can export your data in various formats including CSV, PDF, and Excel. 
                      Go to Settings &gt; Data Management &gt; Export Data to download your information.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger>How accurate are the AI recommendations?</AccordionTrigger>
                    <AccordionContent>
                      Our AI recommendations are based on your financial data, market trends, and 
                      established financial principles. While we strive for high accuracy, they should 
                      be considered as suggestions rather than financial advice. We recommend consulting 
                      with a financial advisor for major financial decisions.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5">
                    <AccordionTrigger>Is there a mobile app available?</AccordionTrigger>
                    <AccordionContent>
                      Yes, FinPlan Pro is available as a mobile app for both iOS and Android devices. 
                      You can download it from the App Store or Google Play Store. The mobile app 
                      syncs with your web account, so you can access your financial information on the go.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="guides" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>User Guides</CardTitle>
                <CardDescription>
                  Step-by-step instructions for using FinPlan Pro features.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="border shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Getting Started</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Setting up your account</li>
                        <li>Completing your financial profile</li>
                        <li>Navigating the dashboard</li>
                        <li>Understanding key metrics</li>
                      </ul>
                      <a href="#" className="text-blue-500 hover:underline block mt-2">Read guide →</a>
                    </CardContent>
                  </Card>
                  
                  <Card className="border shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Financial Calculator</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Using the compound interest calculator</li>
                        <li>Planning loan repayments</li>
                        <li>Retirement planning calculations</li>
                        <li>SIP investment projections</li>
                      </ul>
                      <a href="#" className="text-blue-500 hover:underline block mt-2">Read guide →</a>
                    </CardContent>
                  </Card>
                  
                  <Card className="border shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Goals Tracker</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Creating financial goals</li>
                        <li>Setting realistic timelines</li>
                        <li>Tracking progress effectively</li>
                        <li>Adjusting goals as needed</li>
                      </ul>
                      <a href="#" className="text-blue-500 hover:underline block mt-2">Read guide →</a>
                    </CardContent>
                  </Card>
                  
                  <Card className="border shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">AI Insights</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Understanding AI recommendations</li>
                        <li>Interacting with the financial assistant</li>
                        <li>Customizing insight preferences</li>
                        <li>Implementing suggested actions</li>
                      </ul>
                      <a href="#" className="text-blue-500 hover:underline block mt-2">Read guide →</a>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tips" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Financial Tips & Tricks</CardTitle>
                <CardDescription>
                  Helpful advice to make the most of your financial planning.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium text-lg mb-2">The 50/30/20 Budget Rule</h3>
                    <p>Allocate 50% of your income to needs, 30% to wants, and 20% to savings and debt repayment. 
                      This simple rule can help you maintain financial balance and ensure you're saving adequately.</p>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium text-lg mb-2">Emergency Fund Essentials</h3>
                    <p>Aim to save 3-6 months of essential expenses in an easily accessible account. 
                      This provides a financial buffer for unexpected situations like medical emergencies or job loss.</p>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium text-lg mb-2">Power of Compound Interest</h3>
                    <p>Start investing early, even with small amounts. Thanks to compound interest, 
                      time in the market is often more important than timing the market.</p>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium text-lg mb-2">Debt Reduction Strategy</h3>
                    <p>Consider using either the avalanche method (paying off highest interest debt first) 
                      or the snowball method (paying off smallest debts first) to systematically reduce your debts.</p>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium text-lg mb-2">Automate Your Finances</h3>
                    <p>Set up automatic transfers to your savings and investment accounts on payday. 
                      This "pay yourself first" approach ensures consistent saving before you have a chance to spend.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="contact" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
                <CardDescription>
                  Get in touch with our support team for personalized assistance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium text-lg mb-2">Email Support</h3>
                      <p className="mb-2">Our support team typically responds within 24 hours.</p>
                      <a href="mailto:support@finplanpro.com" className="text-blue-500 hover:underline">
                        support@finplanpro.com
                      </a>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium text-lg mb-2">Live Chat</h3>
                      <p className="mb-2">Available Monday to Friday, 9 AM to 6 PM EST.</p>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                        Start Chat
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium text-lg mb-2">Phone Support</h3>
                      <p className="mb-2">For premium users, direct phone support is available.</p>
                      <p className="font-medium">+1 (800) 555-1234</p>
                      <p className="text-sm text-muted-foreground">Monday to Friday, 9 AM to 5 PM EST</p>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium text-lg mb-2">Community Forum</h3>
                      <p className="mb-2">Connect with other users and share tips and experiences.</p>
                      <a href="#" className="text-blue-500 hover:underline">
                        Visit the FinPlan Pro Community →
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Help;
