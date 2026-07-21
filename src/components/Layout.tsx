import { ReactNode } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { FAQSection } from "./FAQSection";

interface LayoutProps {
  children: ReactNode;
  showFAQ?: boolean;
}

const Layout = ({ children, showFAQ = true }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden bg-background text-foreground">
      <Navigation />
      <main className="flex-1 w-full flex flex-col items-stretch pt-20">
        {children}
        {showFAQ && <FAQSection />}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
