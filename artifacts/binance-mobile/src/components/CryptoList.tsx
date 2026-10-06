import { useQuery } from "@tanstack/react-query";
import { Flame } from "lucide-react";
import { useState } from "react";

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

const marketTabs = ["Favorites", "Hot", "TradFi", "Alpha", "New", "Gainers", "Losers", "24h"];

const fetchCryptoData = async (): Promise<CryptoData[]> => {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false"
  );
  if (!response.ok) throw new Error("Failed to fetch crypto data");
  return response.json();
};

export const CryptoList = () => {
  const [activeMarketTab, setActiveMarketTab] = useState("Hot");
  const [activeCategory, setActiveCategory] = useState("Crypto");
  const [showAll, setShowAll] = useState(false);
  const { data: cryptos, isLoading } = useQuery({
    queryKey: ["cryptoList"],
    queryFn: fetchCryptoData,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const visibleCryptos = showAll ? cryptos : cryptos?.slice(0, 5);

  return (
    <section
      aria-label="Hot crypto pairs"
      className="market-section mx-3 overflow-hidden rounded-xl border border-border/60 bg-card"
    >
      <div className="flex gap-5 overflow-x-auto px-3 pb-1 pt-2">
        {marketTabs.map((tab) => (
          <button
            type="button"
            key={tab}
            onClick={() => setActiveMarketTab(tab)}
            className={`relative min-h-[44px] shrink-0 whitespace-nowrap text-[13px] font-medium ${
              activeMarketTab === tab ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {tab}
            {activeMarketTab === tab && <span className="absolute bottom-0 left-1/2 h-[3px] w-3 -translate-x-1/2 rounded-full bg-primary" />}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4 px-3 pb-2 pt-0.5">
        {["Crypto", "Futures", "Stocks"].map((category) => (
          <button
            type="button"
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`min-h-[44px] text-[11px] font-semibold ${
              activeCategory === category ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_minmax(76px,88px)_68px] gap-1 border-b border-border/70 px-3 py-1.5 text-[10px] text-muted-foreground">
        <span>Name</span>
        <span className="text-right">Last Price</span>
        <span className="text-center">24h chg%</span>
      </div>

      <div className="divide-y divide-border/70">
        {isLoading ? (
          [...Array(5)].map((_, index) => (
            <div key={index} className="grid min-h-[42px] grid-cols-[minmax(0,1fr)_minmax(76px,88px)_68px] items-center gap-1 px-3 py-1">
              <div className="h-7 w-28 animate-pulse rounded bg-muted" />
              <div className="ml-auto h-7 w-16 animate-pulse rounded bg-muted" />
              <div className="h-7 w-16 animate-pulse rounded bg-muted" />
            </div>
          ))
        ) : (
          visibleCryptos?.map((crypto) => {
          const priceChange = crypto.price_change_percentage_24h ?? 0;
          const isPositive = priceChange > 0;
          const bgColor = isPositive ? "bg-[#0ECB81]" : "bg-[#F6465D]";
          
          return (
            <div
              key={crypto.id}
              className="grid min-h-[42px] grid-cols-[minmax(0,1fr)_minmax(76px,88px)_68px] items-center gap-1 px-3 py-1 transition-colors hover:bg-muted/30"
            >
              <div className="flex min-w-0 items-center gap-2">
                {crypto.image ? (
                  <img src={crypto.image} alt="" className="h-5 w-5 shrink-0 rounded-full bg-secondary" />
                ) : (
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary text-[11px] font-bold text-primary">
                    {crypto.symbol.slice(0, 1).toUpperCase()}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="truncate text-[13px] font-semibold uppercase">{crypto.symbol}</span>
                    {["bitcoin", "ethereum", "binancecoin"].includes(crypto.id) && <Flame className="h-3 w-3 shrink-0 text-primary" />}
                  </div>
                  <div className="truncate text-[10px] text-muted-foreground">{crypto.name}</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-[12px] font-semibold">
                  {crypto.current_price.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
                <div className="text-[10px] text-muted-foreground">
                  ${crypto.current_price.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
              </div>
              
              <div
                className={`${bgColor} min-w-[64px] rounded px-1 py-1.5 text-center text-[10px] font-semibold text-white`}
              >
                {isPositive ? "+" : ""}
                {priceChange.toFixed(2)}%
              </div>
            </div>
          );
          })
        )}
      </div>
      {!isLoading && (cryptos?.length ?? 0) > 5 && (
        <button
          type="button"
          onClick={() => setShowAll((value) => !value)}
          className="min-h-[44px] w-full text-[11px] text-muted-foreground"
        >
          {showAll ? "Show Less" : "View More"}
        </button>
      )}
    </section>
  );
};
