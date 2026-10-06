import { useState } from "react";
import { Search } from "lucide-react";

export const SearchBar = () => {
  const [activeTab, setActiveTab] = useState<"exchange" | "wallet">("exchange");

  return (
    <div className="px-4 pt-3 pb-2">
      {/* Exchange / Wallet Tabs */}
        <div className="flex items-center gap-5 mb-2">
        <button
          onClick={() => setActiveTab("exchange")}
          className={`min-h-[40px] text-[15px] font-semibold transition-colors ${
            activeTab === "exchange"
              ? "text-foreground"
              : "text-muted-foreground"
          }`}
        >
          Exchange
        </button>
        <button
          onClick={() => setActiveTab("wallet")}
          className={`min-h-[40px] text-[15px] font-semibold transition-colors ${
            activeTab === "wallet"
              ? "text-foreground"
              : "text-muted-foreground"
          }`}
        >
          Wallet
        </button>
      </div>

      {/* Search input */}
      <div className="relative flex h-11 items-center bg-secondary/90 rounded-full px-4">
        <input
          type="text"
          placeholder="Binance bStocks Hits $100M"
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
        />
        <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
      </div>
    </div>
  );
};
