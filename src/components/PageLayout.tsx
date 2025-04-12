
import { ReactNode } from "react";
import { FinancialSidebar } from "@/components/FinancialSidebar";
import { FinancialHeader } from "@/components/FinancialHeader";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen flex w-full bg-gray-50 dark:bg-gray-900">
      <FinancialSidebar />
      <div className="flex-1 flex flex-col">
        <FinancialHeader />
        <SidebarTrigger className="fixed left-4 top-4 z-50 sm:hidden" />
        
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
