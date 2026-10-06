import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight } from "lucide-react";

const Trade = () => {
  return (
    <div className="mobile-page text-foreground">
      <TopBar />
      
      <main className="page-content px-4 py-6 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-primary"><ArrowLeftRight className="h-8 w-8" /></div>
          <h1 className="text-2xl font-bold">Trade</h1>
          <p className="text-muted-foreground max-w-sm">
            Trading interface coming soon. Start trading your favorite cryptocurrencies.
          </p>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Get Started
          </Button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Trade;
