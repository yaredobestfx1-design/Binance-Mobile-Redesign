import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";
import { SearchBar } from "@/components/SearchBar";
import { QuickActions } from "@/components/QuickActions";
import { TradingCountdown } from "@/components/TradingCountdown";
import { ChatPreview } from "@/components/ChatPreview";
import { FeaturedCoins } from "@/components/FeaturedCoins";
import { CryptoList } from "@/components/CryptoList";
import { NewsFeed } from "@/components/NewsFeed";
import { FloatingDiamond } from "@/components/FloatingDiamond";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import PullToRefresh from "@/components/PullToRefresh";

const Index = () => {
  const [showBalance, setShowBalance] = useState(true);

  // Get balances from localStorage (synced with Assets page)
  const spotBalance = parseFloat(localStorage.getItem('spotBalance') || '20.75');
  const fundingBalance = parseFloat(localStorage.getItem('fundingBalance') || '1.28');
  const totalBalance = spotBalance + fundingBalance;

  const formatBalance = (value: number) => {
    return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="mobile-page text-foreground">
      <TopBar variant="home" />
      
      <PullToRefresh onRefresh={handleRefresh}>
        <main className="page-content">
          {/* Search Bar */}
          <SearchBar />

          {/* Balance Section */}
          <div className="space-y-0 px-3 pb-2 pt-0.5">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                className="h-auto min-h-[28px] p-0 text-[11px] text-muted-foreground hover:bg-transparent"
                onClick={() => setShowBalance(!showBalance)}
              >
                Est. Total Value(USD)
                <ChevronUp
                  className={`ml-1 h-4 w-4 transition-transform ${showBalance ? "" : "rotate-180"}`}
                />
              </Button>
            </div>
            
            {/* Balance Display with Add Funds */}
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="font-[Space_Grotesk] text-[30px] font-bold leading-none tracking-[-.04em]">
                  {showBalance ? `$${formatBalance(totalBalance)}` : "****"}
                </span>
                <span className="text-[12px] text-muted-foreground">USD</span>
              </div>
              <Button className="h-10 rounded-lg bg-primary px-4 text-[12px] font-semibold text-primary-foreground hover:bg-primary/90">
                Add Funds
              </Button>
            </div>

            {/* Today's PNL */}
            <div className="flex items-center gap-1.5 text-[11px]">
              <span className="text-muted-foreground">Today's PNL</span>
              <span className="text-[#0ECB81] font-medium">
                +$0.002016 (+2.95%)
              </span>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </div>

            {/* Quick Actions */}
            <QuickActions />
          </div>

          {/* Trading Countdown */}
          <TradingCountdown />

          {/* Crypto List */}
          <CryptoList />

          {/* News Feed */}
          <NewsFeed />

          {/* Keep the existing Chat and featured live-coin modules available below Discover. */}
          <ChatPreview />
          <FeaturedCoins />
        </main>
      </PullToRefresh>

      <FloatingDiamond />
      <BottomNav />
    </div>
  );
};

export default Index;
