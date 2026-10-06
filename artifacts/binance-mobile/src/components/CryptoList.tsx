import { useQuery } from "@tanstack/react-query";
import { Flame } from "lucide-react";

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
}

const fetchCryptoData = async (): Promise<CryptoData[]> => {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false"
  );
  if (!response.ok) throw new Error("Failed to fetch crypto data");
  return response.json();
};

export const CryptoList = () => {
  const { data: cryptos, isLoading } = useQuery({
    queryKey: ["cryptoList"],
    queryFn: fetchCryptoData,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  if (isLoading) {
    return (
      <div className="space-y-3 px-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center justify-between py-3">
            <div className="h-10 w-20 bg-muted rounded animate-pulse" />
            <div className="h-10 w-24 bg-muted rounded animate-pulse" />
            <div className="h-8 w-16 bg-muted rounded animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="pb-20">
      <div className="grid grid-cols-[minmax(0,1fr)_76px_68px] gap-2 px-4 py-3 text-[10px] text-muted-foreground border-b border-border">
        <span>Name</span>
        <span>Last Price</span>
        <span>24h chg%</span>
      </div>
      
      <div className="divide-y divide-border">
        {cryptos?.map((crypto) => {
          const priceChange = crypto.price_change_percentage_24h ?? 0;
          const isPositive = priceChange > 0;
          const bgColor = isPositive ? "bg-[#0ECB81]" : "bg-[#F6465D]";
          
          return (
            <div
              key={crypto.id}
              className="grid grid-cols-[minmax(0,1fr)_76px_68px] gap-2 px-4 py-3 items-center hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="truncate text-[13px] font-semibold uppercase">
                  {crypto.symbol}
                </span>
                <Flame className="h-4 w-4 text-primary" />
              </div>
              
              <div className="text-right">
                <div className="text-base font-semibold">
                  {crypto.current_price.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
                <div className="text-xs text-muted-foreground">
                  ${crypto.current_price.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
              </div>
              
              <div
                className={`${bgColor} text-white px-1 py-1 rounded text-[11px] font-semibold min-w-[68px] text-center`}
              >
                {isPositive ? "+" : ""}
                {priceChange.toFixed(2)}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
