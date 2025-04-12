
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { 
  Calculator, 
  LayoutDashboard, 
  Target, 
  BrainCircuit, 
  Activity, 
  User, 
  Settings, 
  HelpCircle,
  Info
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const FinancialSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Menu items for clarity
  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      url: "/",
      isActive: currentPath === "/",
    },
    {
      title: "Financial Calculator",
      icon: Calculator,
      url: "/calculator",
      isActive: currentPath === "/calculator",
    },
    {
      title: "Goals Tracker",
      icon: Target,
      url: "/goals",
      isActive: currentPath === "/goals",
    },
    {
      title: "AI Insights",
      icon: BrainCircuit,
      url: "/insights",
      isActive: currentPath === "/insights",
    },
    {
      title: "Market Trends",
      icon: Activity,
      url: "/trends",
      isActive: currentPath === "/trends",
    },
  ];

  const accountItems = [
    {
      title: "Profile",
      icon: User,
      url: "/profile",
      isActive: currentPath === "/profile",
    },
    {
      title: "Settings",
      icon: Settings,
      url: "/settings",
      isActive: currentPath === "/settings",
    },
    {
      title: "Help & Support",
      icon: HelpCircle,
      url: "/help",
      isActive: currentPath === "/help",
    },
    {
      title: "About",
      icon: Info,
      url: "/about",
      isActive: currentPath === "/about",
    },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-4">
          <h2 className="text-xl font-bold">FinPlan Pro</h2>
          <p className="text-xs text-muted-foreground">Financial Planning Made Easy</p>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild data-state={item.isActive ? "active" : "inactive"}>
                    <Link to={item.url} className="flex items-center">
                      <item.icon className="mr-2 h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild data-state={item.isActive ? "active" : "inactive"}>
                    <Link to={item.url} className="flex items-center">
                      <item.icon className="mr-2 h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
