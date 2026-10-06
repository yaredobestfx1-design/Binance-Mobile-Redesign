import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";
import { useQuery } from "@tanstack/react-query";
import { TrendingUp, TrendingDown } from "lucide-react";
import { NavLink } from "@/components/NavLink";

interface MarketStats {
  total_market_cap: { usd: number };
  total_volume: { usd: number };
  market_cap_percentage: { btc: number; eth: number };
}

const fetchMarketData = async (): Promise<MarketStats> => {
  const response = await fetch("https://api.coingecko.com/api/v3/global");
  if (!response.ok) throw new Error("Failed to fetch market data");
  const data = await response.json();
  return data.data;
};

const Markets = () => {
  const { data: marketData, isLoading } = useQuery({
    queryKey: ["marketData"],
    queryFn: fetchMarketData,
    refetchInterval: 60000,
  });

  return (
    <div className="mobile-page text-foreground">
      <TopBar />
      
      <main className="page-content px-4 py-5 space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-4">Markets Overview</h1>
          
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-20 bg-card rounded-lg animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-card p-4 rounded-lg border border-border">
                <div className="text-sm text-muted-foreground mb-1">Total Market Cap</div>
                <div className="text-2xl font-bold">
                  ${((marketData?.total_market_cap.usd ?? 0) / 1e12).toFixed(2)}T
                </div>
              </div>
              
              <div className="bg-card p-4 rounded-lg border border-border">
                <div className="text-sm text-muted-foreground mb-1">24h Volume</div>
                <div className="text-2xl font-bold">
                  ${((marketData?.total_volume.usd ?? 0) / 1e9).toFixed(2)}B
                </div>
              </div>
              
              <div className="bg-card p-4 rounded-lg border border-border">
                <div className="text-sm text-muted-foreground mb-3">Market Dominance</div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">BTC</span>
                    <span className="font-semibold">{marketData?.market_cap_percentage.btc.toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">ETH</span>
                    <span className="font-semibold">{marketData?.market_cap_percentage.eth.toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
          <div className="space-y-2">
            <NavLink
              to="/"
              className="flex items-center justify-between bg-card p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-positive" />
                <span className="font-medium">Top Gainers</span>
              </div>
            </NavLink>
            
            <NavLink
              to="/"
              className="flex items-center justify-between bg-card p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <TrendingDown className="h-5 w-5 text-negative" />
                <span className="font-medium">Top Losers</span>
              </div>
            </NavLink>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Markets;
