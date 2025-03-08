
import { ReactNode } from "react";
import Header from "./Header";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

const PageContainer = ({ children, className = "" }: PageContainerProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-theme-black">
      <Header />
      <main className={`flex-1 ${className}`}>
        {children}
      </main>
    </div>
  );
};

export default PageContainer;
