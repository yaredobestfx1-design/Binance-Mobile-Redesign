import { TrendingUp, TrendingDown } from "lucide-react";
import { useEffect, useState } from "react";

interface FeaturedCoin {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  color: string;
  image: string;
  sparkline: number[];
}

const COIN_IDS = ["binancecoin", "solana"];
const COIN_META: Record<string, { symbol: string; name: string; color: string }> = {
  binancecoin: { symbol: "BNB", name: "BNB", color: "#F0B90B" },
  solana: { symbol: "SOL", name: "SOL", color: "#9945FF" },
};

const Sparkline = ({ data, color }: { data: number[]; color: string }) => {
  if (!data || data.length === 0) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const width = 100;
  const height = 40;
  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-10" preserveAspectRatio="none">
      <polyline fill="none" stroke={color} strokeWidth="2" points={points} />
      <polygon points={`0,${height} ${points} 100,${height}`} fill={color} opacity="0.1" />
    </svg>
  );
};

export const FeaturedCoins = () => {
  const [coins, setCoins] = useState<FeaturedCoin[]>([]);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${COIN_IDS.join(",")}&sparkline=true&price_change_percentage=24h`
        );
        const data = await res.json();
        const mapped: FeaturedCoin[] = COIN_IDS.map((id) => {
          const c = data.find((x: any) => x.id === id);
          const meta = COIN_META[id];
          return {
            id,
            symbol: meta.symbol,
            name: meta.name,
            color: meta.color,
            price: c?.current_price ?? 0,
            change: c?.price_change_percentage_24h ?? 0,
            image: c?.image ?? "",
            sparkline: c?.sparkline_in_7d?.price?.slice(-24) ?? [],
          };
        });
        setCoins(mapped);
      } catch (e) {
        console.error("Failed to fetch featured coins", e);
      }
    };
    fetchCoins();
    const interval = setInterval(fetchCoins, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-4 py-2">
      <div className="grid grid-cols-2 gap-3">
        {coins.map((coin) => {
          const isUp = coin.change >= 0;
          return (
            <div key={coin.id} className="bg-card rounded-2xl p-4 border border-border">
              <div className="flex items-center gap-2 mb-3">
                {coin.image ? (
                  <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                ) : (
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: coin.color }}
                  >
                    {coin.symbol[0]}
                  </div>
                )}
                <span className="font-semibold text-sm">{coin.name}</span>
              </div>

              <div className="text-xl font-bold mb-1">
                {coin.price.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>

              <div
                className={`flex items-center gap-1 text-sm mb-3 ${
                  isUp ? "text-[#0ECB81]" : "text-[#F6465D]"
                }`}
              >
                {isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                <span>
                  {isUp ? "+" : ""}
                  {coin.change.toFixed(2)}%
                </span>
              </div>

              <Sparkline data={coin.sparkline} color={coin.color} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
