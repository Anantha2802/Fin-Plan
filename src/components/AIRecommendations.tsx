
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, BadgeCheck, AlertCircle, TrendingUp, PiggyBank, CreditCard, ArrowUpDown, MessageCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export const AIRecommendations = () => {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [userData, setUserData] = useState<any>(null);
  const [investmentSuggestions, setInvestmentSuggestions] = useState<any[]>([]);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{role: string, message: string}[]>([
    {role: "bot", message: "Hello! I'm your financial assistant. How can I help you today?"}
  ]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Function to get market conditions and provide investment recommendations
  const generateInvestmentSuggestions = (riskTolerance: string, income: number) => {
    // Simulating market data (in a real app this would come from an API)
    const marketConditions = {
      equity: {
        trend: "bullish",
        volatility: "medium",
        interest: 7.5,
      },
      debt: {
        trend: "stable",
        rates: 6.8,
        credit: "good",
      },
      commodities: {
        gold: 5.2,
        silver: 4.8,
        trend: "upward",
      },
      realEstate: {
        trend: "stable",
        returns: 8.2,
      },
      crypto: {
        trend: "volatile",
        returns: 15.6,
        risk: "very high",
      }
    };
    
    const suggestions = [];
    
    // Base suggestions on risk tolerance
    if (riskTolerance === "low") {
      suggestions.push({
        id: 1,
        title: "Fixed Deposits & Government Bonds",
        description: "Current FD rates are around 6.8%. Consider allocating 40% of your investments to fixed deposits for stability.",
        expectedReturns: "6-7% annually",
        marketSentiment: "Safe haven in current market volatility",
        icon: <PiggyBank className="h-5 w-5 text-blue-500" />,
        allocation: "40%"
      });
      
      suggestions.push({
        id: 2,
        title: "Blue-chip Stock Index Funds",
        description: "Low-risk equity exposure through index funds tracking established companies. Current market shows positive trend for blue-chips.",
        expectedReturns: "8-10% annually",
        marketSentiment: "Stable growth expected",
        icon: <TrendingUp className="h-5 w-5 text-green-500" />,
        allocation: "25%"
      });
      
      suggestions.push({
        id: 3,
        title: "Gold ETFs",
        description: "Gold prices show an upward trend of 5.2%. A good hedge against inflation in current economic conditions.",
        expectedReturns: "5-7% annually",
        marketSentiment: "Safe investment in uncertain times",
        icon: <ArrowUpDown className="h-5 w-5 text-amber-500" />,
        allocation: "20%"
      });
      
      suggestions.push({
        id: 4,
        title: "Corporate Bonds (AAA-rated)",
        description: "High-quality corporate bonds offering slightly better returns than FDs with minimal risk.",
        expectedReturns: "7-8% annually",
        marketSentiment: "Good option for income generation",
        icon: <BadgeCheck className="h-5 w-5 text-indigo-500" />,
        allocation: "15%"
      });
    } 
    else if (riskTolerance === "medium") {
      suggestions.push({
        id: 1,
        title: "Balanced Mutual Funds",
        description: "A mix of equity and debt matching your moderate risk profile. Current market conditions favor a balanced approach.",
        expectedReturns: "9-11% annually",
        marketSentiment: "Balanced growth with managed risk",
        icon: <ArrowUpDown className="h-5 w-5 text-purple-500" />,
        allocation: "35%"
      });
      
      suggestions.push({
        id: 2,
        title: "Mid-cap Stocks",
        description: "Selected mid-cap companies showing strong fundamentals and growth potential in the current market.",
        expectedReturns: "12-15% annually",
        marketSentiment: "Growth opportunity with moderate risk",
        icon: <TrendingUp className="h-5 w-5 text-green-500" />,
        allocation: "25%"
      });
      
      suggestions.push({
        id: 3,
        title: "REITs (Real Estate Investment Trusts)",
        description: "Real estate market shows stable returns of 8.2%. REITs offer good dividend income plus capital appreciation.",
        expectedReturns: "8-10% annually",
        marketSentiment: "Stable with good dividend yield",
        icon: <BadgeCheck className="h-5 w-5 text-blue-500" />,
        allocation: "20%"
      });
      
      suggestions.push({
        id: 4,
        title: "Corporate Bonds & Fixed Deposits",
        description: "Allocate some portion to debt instruments for stability and regular income.",
        expectedReturns: "6-8% annually",
        marketSentiment: "Safety net component",
        icon: <PiggyBank className="h-5 w-5 text-gray-500" />,
        allocation: "20%"
      });
    } 
    else if (riskTolerance === "high") {
      suggestions.push({
        id: 1,
        title: "Growth Stocks & Sectoral Funds",
        description: "High-potential growth stocks in technology, healthcare and emerging sectors showing strong upward trends.",
        expectedReturns: "15-20% annually",
        marketSentiment: "High growth potential with volatility",
        icon: <TrendingUp className="h-5 w-5 text-green-600" />,
        allocation: "40%"
      });
      
      suggestions.push({
        id: 2,
        title: "Small-cap Stocks",
        description: "Selected small-cap companies with strong growth prospects in current bullish equity conditions.",
        expectedReturns: "18-22% annually",
        marketSentiment: "High potential returns with high risk",
        icon: <AlertCircle className="h-5 w-5 text-red-500" />,
        allocation: "25%"
      });
      
      suggestions.push({
        id: 3,
        title: "Selected Cryptocurrencies",
        description: "Limited allocation to established cryptocurrencies. Extremely volatile with potential for high returns.",
        expectedReturns: "Highly variable (potentially 20%+ annually)",
        marketSentiment: "Speculative but potentially rewarding",
        icon: <ArrowUpDown className="h-5 w-5 text-amber-600" />,
        allocation: "10%"
      });
      
      suggestions.push({
        id: 4,
        title: "International Equity Funds",
        description: "Geographical diversification through international market exposure. Provides hedge against local market downturns.",
        expectedReturns: "12-16% annually",
        marketSentiment: "Diversification opportunity",
        icon: <BrainCircuit className="h-5 w-5 text-blue-600" />,
        allocation: "15%"
      });
      
      suggestions.push({
        id: 5,
        title: "Corporate Bonds",
        description: "Small allocation to debt instruments to provide some stability to the high-risk portfolio.",
        expectedReturns: "7-8% annually",
        marketSentiment: "Stability component",
        icon: <PiggyBank className="h-5 w-5 text-gray-500" />,
        allocation: "10%"
      });
    }
    
    return suggestions;
  };

  // Simulated AI chatbot response function
  const getAIChatResponse = (message: string) => {
    // Dictionary of common financial questions and responses
    const responses: {[key: string]: string} = {
      "investment": "Based on current market conditions, you might want to consider a diversified portfolio with both equity and debt components. For specific recommendations, check our 'Investment Model' tab.",
      "save": "To improve your savings, try the 50/30/20 rule - allocate 50% of income to needs, 30% to wants, and 20% to savings and debt repayment.",
      "budget": "Creating a zero-based budget where every rupee is assigned a purpose can help track expenses. Try using expense tracking apps for better visibility.",
      "debt": "Focus on high-interest debts first while maintaining minimum payments on others. Consider the debt avalanche or debt snowball methods based on your preference.",
      "retirement": "For retirement planning in India, consider a mix of EPF, PPF, NPS, and equity investments. The ideal savings rate is 15-20% of your income dedicated to retirement.",
      "tax": "You can save taxes through investments in ELSS funds, PPF, tax-saving FDs, and health insurance premiums under various sections of the Income Tax Act.",
      "real estate": "Current real estate market in India shows stable growth in tier-1 cities. REITs are a good alternative if you want real estate exposure without buying property.",
      "stock market": "The current market has shown volatility but with a positive bias. Focus on companies with strong fundamentals rather than following market trends.",
      "mutual funds": "SIP (Systematic Investment Plan) in mutual funds is one of the best ways to build wealth over time through disciplined investing.",
      "insurance": "Ensure you have adequate term life insurance (10-15 times your annual income) and comprehensive health insurance before focusing on investments.",
      "gold": "Gold can be a good hedge against inflation. Consider digital gold or Gold ETFs rather than physical gold for better liquidity and lower storage concerns.",
      "emergency fund": "An ideal emergency fund should cover 6 months of expenses. Keep it in a high-yield savings account or short-term FDs for easy access.",
      "sip": "SIPs help in rupee cost averaging and building wealth through the power of compounding. Start early even with small amounts."
    };
    
    // Default response if no specific keywords match
    let response = "I'm not sure about that specific financial query. Consider talking to a certified financial advisor for personalized advice. Meanwhile, I can help with basic questions about saving, investing, budgeting, or debt management.";
    
    // Check message for keywords and provide appropriate response
    const lowerMessage = message.toLowerCase();
    
    for (const [keyword, answer] of Object.entries(responses)) {
      if (lowerMessage.includes(keyword)) {
        response = answer;
        break;
      }
    }
    
    return response;
  };

  const handleChatSubmit = () => {
    if (!chatMessage.trim()) return;
    
    // Add user message to chat
    const newHistory = [...chatHistory, {role: "user", message: chatMessage}];
    setChatHistory(newHistory);
    
    // Clear input and show loading
    setChatMessage("");
    setLoading(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      const botResponse = getAIChatResponse(chatMessage);
      setChatHistory([...newHistory, {role: "bot", message: botResponse}]);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    // Get user data from localStorage
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserData(parsedData);
      
      // Generate personalized recommendations based on user data
      const personalized = [];
      const income = parseFloat(parsedData.income) || 0;
      const savingsGoal = parseFloat(parsedData.savingsGoal) || 0;
      const riskTolerance = parsedData.riskTolerance || "medium";
      
      // Generate investment suggestions
      const suggestions = generateInvestmentSuggestions(riskTolerance, income);
      setInvestmentSuggestions(suggestions);
      
      // Emergency fund recommendation based on income
      const emergencyFundTarget = income * 6; // 6 months of income
      const emergencyFundCurrent = income * 0.2; // Assuming 20% of income
      if (emergencyFundCurrent < emergencyFundTarget * 0.5) {
        personalized.push({
          id: 1,
          title: "Increase your emergency fund",
          description: `Your emergency fund should cover 3-6 months of expenses (about ₹${emergencyFundTarget.toLocaleString()}). Consider allocating more to reach this goal.`,
          priority: "high",
          icon: <AlertCircle className="h-5 w-5 text-red-500" />,
          action: "Review Budget"
        });
      }
      
      // Investment recommendation based on risk tolerance
      if (riskTolerance === "low") {
        personalized.push({
          id: 2,
          title: "Consider diversifying investments",
          description: "Your conservative risk profile suggests you might prefer stable investments. Consider a mix of bonds and dividend stocks.",
          priority: "medium",
          icon: <TrendingUp className="h-5 w-5 text-amber-500" />,
          action: "View Options"
        });
      } else if (riskTolerance === "high") {
        personalized.push({
          id: 2,
          title: "Optimize your aggressive portfolio",
          description: "With your high risk tolerance, ensure you're maximizing growth potential while maintaining some safety nets.",
          priority: "medium",
          icon: <TrendingUp className="h-5 w-5 text-amber-500" />,
          action: "View Options"
        });
      } else {
        personalized.push({
          id: 2,
          title: "Balance your investment portfolio",
          description: "Your balanced risk profile suggests a mix of growth and value investments would suit your goals.",
          priority: "medium",
          icon: <TrendingUp className="h-5 w-5 text-amber-500" />,
          action: "View Options"
        });
      }
      
      // Retirement recommendation
      personalized.push({
        id: 3,
        title: "Optimize retirement contributions",
        description: `Based on your income of ₹${income.toLocaleString()}/month, consider contributing at least ₹${Math.round(income * 0.15)} to retirement accounts.`,
        priority: "medium",
        icon: <PiggyBank className="h-5 w-5 text-amber-500" />,
        action: "Adjust Contributions"
      });
      
      // Savings goal recommendation
      if (savingsGoal > 0) {
        const monthlySavingsNeeded = savingsGoal / 24; // Over 2 years
        if (monthlySavingsNeeded > income * 0.3) {
          personalized.push({
            id: 4,
            title: "Adjust your savings goal timeline",
            description: `Your savings goal of ₹${savingsGoal.toLocaleString()} may require more time given your current income. Consider extending your timeline.`,
            priority: "high",
            icon: <CreditCard className="h-5 w-5 text-red-500" />,
            action: "Adjust Goal"
          });
        } else {
          personalized.push({
            id: 4,
            title: "You're on track with your savings goal",
            description: `To reach your ₹${savingsGoal.toLocaleString()} goal, continue saving about ₹${Math.round(monthlySavingsNeeded).toLocaleString()} monthly.`,
            priority: "low",
            icon: <BadgeCheck className="h-5 w-5 text-green-500" />,
            action: "View Details"
          });
        }
      }
      
      // Budget recommendation
      const expenses = income * 0.65; // Estimated expenses
      if (expenses > income * 0.7) {
        personalized.push({
          id: 5,
          title: "Review your monthly expenses",
          description: "Your estimated expenses are high relative to your income. Consider tracking your spending to find areas to reduce.",
          priority: "high",
          icon: <CreditCard className="h-5 w-5 text-red-500" />,
          action: "Track Expenses"
        });
      }
      
      setRecommendations(personalized);
    }
  }, []);
  
  const handleActionClick = (action: string) => {
    toast({
      title: "Action Triggered",
      description: `The "${action}" action was clicked. This feature would navigate to the relevant section in a full implementation.`,
      duration: 3000,
    });
  };

  // If no user data is available, show empty state
  if (!userData) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">Complete the onboarding process to receive personalized financial recommendations.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BrainCircuit className="h-5 w-5" />
          AI Financial Insights
        </CardTitle>
        <CardDescription>
          Personalized insights for {userData.name}'s financial health
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="recommendations" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="investments">Investment Model</TabsTrigger>
            <TabsTrigger value="chat">Financial Assistant</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recommendations">
            {recommendations.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No recommendations available yet. Check back soon.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recommendations.map((rec) => (
                  <Card key={rec.id} className={`border-l-4 ${
                    rec.priority === 'high' ? 'border-l-red-500' : 
                    rec.priority === 'medium' ? 'border-l-amber-500' : 'border-l-green-500'
                  }`}>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        {rec.icon}
                        {rec.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">{rec.description}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button variant="outline" size="sm" onClick={() => handleActionClick(rec.action)}>
                        {rec.action}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="investments">
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">
                    Investment Recommendations for {userData.name}
                  </CardTitle>
                  <CardDescription>
                    Based on your {userData.riskTolerance} risk tolerance and current market conditions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">Our AI analyzed market trends and your financial profile to create this personalized investment allocation.</p>
                </CardContent>
              </Card>
              
              {investmentSuggestions.map((suggestion) => (
                <Card key={suggestion.id}>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      {suggestion.icon}
                      {suggestion.title}
                      <span className="ml-auto text-xs font-normal text-muted-foreground">
                        {suggestion.allocation}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground mb-2">{suggestion.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="font-medium">Expected Returns:</span>
                        <p className="text-muted-foreground">{suggestion.expectedReturns}</p>
                      </div>
                      <div>
                        <span className="font-medium">Market Sentiment:</span>
                        <p className="text-muted-foreground">{suggestion.marketSentiment}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button variant="outline" size="sm" onClick={() => handleActionClick("Learn More")}>
                      Learn More
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="chat">
            <div className="flex flex-col h-96">
              <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 border rounded-md">
                {chatHistory.map((chat, index) => (
                  <div key={index} className={`flex ${chat.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] rounded-lg p-3 ${
                      chat.role === "user" 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {chat.message}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg p-3 bg-muted text-muted-foreground">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-current animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Input 
                  placeholder="Ask a financial question..." 
                  value={chatMessage} 
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleChatSubmit()}
                />
                <Button onClick={handleChatSubmit} type="submit">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
