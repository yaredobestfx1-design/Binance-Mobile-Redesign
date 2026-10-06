import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";
import { SearchBar } from "@/components/SearchBar";
import { QuickActions } from "@/components/QuickActions";
import { TradingCountdown } from "@/components/TradingCountdown";
import { ChatPreview } from "@/components/ChatPreview";
import { FeaturedCoins } from "@/components/FeaturedCoins";
import { CryptoList } from "@/components/CryptoList";
import { NewsFeed } from "@/components/NewsFeed";
import { Button } from "@/components/ui/button";
import { Eye, ChevronDown } from "lucide-react";
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
      <TopBar />
      
      <PullToRefresh onRefresh={handleRefresh}>
        <main className="page-content">
          {/* Search Bar */}
          <SearchBar />

          {/* Balance Section */}
          <div className="px-4 pt-3 pb-5 space-y-3">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                className="min-h-[44px] text-[12px] text-muted-foreground h-auto p-0 hover:bg-transparent"
                onClick={() => setShowBalance(!showBalance)}
              >
                Est. Total Value (USD)
                <Eye className="ml-1 h-4 w-4" />
              </Button>
            </div>
            
            {/* Balance Display with Add Funds */}
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="font-[Space_Grotesk] text-[32px] leading-none font-bold tracking-[-.04em]">
                  {showBalance ? `$${formatBalance(totalBalance)}` : "****"}
                </span>
                <span className="text-sm text-muted-foreground">USD</span>
              </div>
              <Button className="h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-lg px-4 text-[13px]">
                Add Funds
              </Button>
            </div>

            {/* Today's PNL */}
            <div className="flex items-center gap-2 text-[12px]">
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

          {/* Chat Preview */}
          <ChatPreview />

          {/* Featured Coins */}
          <FeaturedCoins />

          {/* Crypto List */}
          <CryptoList />

          {/* News Feed */}
          <NewsFeed />
        </main>
      </PullToRefresh>

      <BottomNav />
    </div>
  );
};

export default Index;
