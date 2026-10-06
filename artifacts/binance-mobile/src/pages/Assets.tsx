import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Eye, Plus, Minus, MoreVertical, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/sonner";
import binanceLogo from "@/assets/binance-logo.jpeg";
import { useTheme } from "@/hooks/use-theme";
const Assets = () => {
  const { theme, toggleTheme } = useTheme();
  const [spotBalance, setSpotBalance] = useState(() => {
    const saved = localStorage.getItem('spotBalance');
    const parsed = saved ? parseFloat(saved) : NaN;
    return !isNaN(parsed) ? parsed : 20.75;
  });
  const [fundingBalance, setFundingBalance] = useState(() => {
    const saved = localStorage.getItem('fundingBalance');
    const parsed = saved ? parseFloat(saved) : NaN;
    return !isNaN(parsed) ? parsed : 1.28;
  });
  
  // Total balance is always calculated from spot + funding
  const totalBalance = spotBalance + fundingBalance;
  const [customAmount, setCustomAmount] = useState("");
  const [showBalance, setShowBalance] = useState(true);
  const [showAdjustment, setShowAdjustment] = useState(false);
  const [adjustTarget, setAdjustTarget] = useState<"spot" | "funding">("spot");
  const [activeTab, setActiveTab] = useState<"exchange" | "wallet">("exchange");
  const [activeAccountTab, setActiveAccountTab] = useState<"crypto" | "account">("account");
  const [viewTab, setViewTab] = useState<"overview" | "spot" | "funding">("overview");

  const formatBalance = (value: number) => {
    return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const todayPnl = -0.00008;
  const todayPnlPercent = -0.00;

  // Save balances to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('spotBalance', spotBalance.toString());
  }, [spotBalance]);

  useEffect(() => {
    localStorage.setItem('fundingBalance', fundingBalance.toString());
  }, [fundingBalance]);

  const showNotification = (type: 'deposit' | 'withdrawal', amount: number) => {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    
    toast(
      <div className="flex items-start gap-2 py-1">
        <img src={binanceLogo} alt="Binance" className="w-8 h-8 rounded-md flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-foreground text-xs">Binance</div>
          <div className="font-medium text-foreground text-xs">
            {type === 'deposit' ? 'Deposit' : 'Withdrawal'} Successful — {amount.toFixed(2)} USDT
          </div>
          <div className="text-[10px] text-muted-foreground">
            {type === 'deposit' ? 'From Vortex' : 'To External Wallet'} • TRC20 • {dateStr} • {timeStr}
          </div>
        </div>
      </div>,
      {
        duration: 6000,
        position: "top-center",
      }
    );
  };

  const addBalance = () => {
    const amount = parseFloat(customAmount);
    if (!isNaN(amount) && amount > 0) {
      // Update the appropriate sub-balance (total is calculated automatically)
      if (adjustTarget === "spot") {
        setSpotBalance(prev => prev + amount);
      } else {
        setFundingBalance(prev => prev + amount);
      }
      
      // Show notification after 5 seconds
      setTimeout(() => {
        showNotification('deposit', amount);
      }, 5000);
      
      setCustomAmount("");
    }
  };

  const subtractBalance = () => {
    const amount = parseFloat(customAmount);
    if (!isNaN(amount) && amount > 0) {
      // Update the appropriate sub-balance (total is calculated automatically)
      if (adjustTarget === "spot") {
        setSpotBalance(prev => Math.max(0, prev - amount));
      } else {
        setFundingBalance(prev => Math.max(0, prev - amount));
      }
      
      // Show notification after 5 seconds
      setTimeout(() => {
        showNotification('withdrawal', amount);
      }, 5000);
      
      setCustomAmount("");
    }
  };

  return (
    <div className="mobile-page text-foreground">
      <Toaster />
      {/* Top Tabs - No dots/menu visible */}
      <div className="px-4 pt-3">
        <div className="flex gap-1 rounded-xl bg-secondary/70 p-1 max-w-[250px] mx-auto">
          <button
            onClick={() => setActiveTab("exchange")}
            className={`flex-1 min-h-[42px] rounded-lg text-[13px] font-semibold transition-colors ${
              activeTab === "exchange" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            Exchange
          </button>
          <button
            onClick={() => setActiveTab("wallet")}
            className={`flex-1 min-h-[42px] rounded-lg text-[13px] font-semibold transition-colors ${
              activeTab === "wallet" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            Wallet
          </button>
        </div>
      </div>

      {/* View Tabs */}
      <div className="flex gap-6 px-4 pt-5 pb-3 border-b border-border/70">
        <button
          onClick={() => setViewTab("overview")}
          className={`min-h-[42px] text-[14px] font-semibold pb-1 ${
            viewTab === "overview" ? "text-foreground border-b-2 border-primary" : "text-muted-foreground"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setViewTab("spot")}
          className={`min-h-[42px] text-[14px] font-semibold pb-1 ${
            viewTab === "spot" ? "text-foreground border-b-2 border-primary" : "text-muted-foreground"
          }`}
        >
          Spot
        </button>
        <button
          onClick={() => setViewTab("funding")}
          className={`min-h-[42px] text-[14px] font-semibold pb-1 ${
            viewTab === "funding" ? "text-foreground border-b-2 border-primary" : "text-muted-foreground"
          }`}
        >
          Funding
        </button>
      </div>

      <main className="page-content px-4">
        {/* Balance Section */}
        <div className="space-y-2 mb-5 pt-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
              <span>Est. Total Value</span>
              <button aria-label={showBalance ? "Hide balance" : "Show balance"} className="min-h-[44px] min-w-[44px] flex items-center justify-center" onClick={() => setShowBalance(!showBalance)}>
                <Eye className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={() => setShowAdjustment(!showAdjustment)}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-muted/50 transition-colors"
              title="Custom balance adjustment"
            >
              <MoreVertical className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-[Space_Grotesk] text-[34px] leading-tight font-bold tracking-[-.045em]">
              {showBalance ? `$${formatBalance(totalBalance)}` : "****"}
            </span>
            <span className="text-sm text-muted-foreground">USD</span>
          </div>
          <div className="flex items-center gap-2 text-[12px]">
            <span className="text-muted-foreground">Today's PNL</span>
            <span className="text-negative">
              -${Math.abs(todayPnl).toFixed(6)}({todayPnlPercent.toFixed(2)}%)
            </span>
          </div>
        </div>

        {/* Custom Balance Adjustment - Hidden by default */}
        {showAdjustment && (
          <Card className="p-4 mb-5 bg-card/70 border-border/80 animate-in fade-in slide-in-from-top-2 duration-200">
            <h3 className="text-[13px] font-semibold mb-3">Custom Balance Adjustment</h3>
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => setAdjustTarget("spot")}
                className={`flex-1 min-h-[44px] rounded-md text-sm font-medium transition-colors ${
                  adjustTarget === "spot" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                Spot
              </button>
              <button
                onClick={() => setAdjustTarget("funding")}
                className={`flex-1 min-h-[44px] rounded-md text-sm font-medium transition-colors ${
                  adjustTarget === "funding" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                Funding
              </button>
            </div>
            <div className="flex gap-2 mb-2">
              <Input
                type="number"
                placeholder="Enter amount"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="flex-1 h-11"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={addBalance}
                className="flex-1 h-11 bg-primary hover:bg-primary/90"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
              <Button
                onClick={subtractBalance}
                variant="outline"
                className="flex-1 h-11"
                size="sm"
              >
                <Minus className="h-4 w-4 mr-1" />
                Subtract
              </Button>
            </div>
          </Card>
        )}

        {/* Theme Toggle - Settings under balance adjustment */}
        {showAdjustment && (
          <Card className="p-4 mb-5 bg-card/70 border-border/80">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Theme</span>
              <Button
                onClick={toggleTheme}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="h-4 w-4" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="h-4 w-4" />
                    Dark Mode
                  </>
                )}
              </Button>
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <Button className="h-11 px-2 text-[12px] bg-primary text-primary-foreground hover:bg-primary/90">
            Add Funds
          </Button>
          <Button variant="secondary" className="h-11 px-2 text-[12px]">Send</Button>
          <Button variant="secondary" className="h-11 px-2 text-[12px]">Transfer</Button>
        </div>

        {/* Account Tabs */}
        <div className="flex gap-6 mb-2 border-b border-border">
          <button
            onClick={() => setActiveAccountTab("crypto")}
            className={`min-h-[44px] pb-2 text-[14px] font-semibold ${
              activeAccountTab === "crypto"
                ? "text-foreground border-b-2 border-primary -mb-px"
                : "text-muted-foreground"
            }`}
          >
            Crypto
          </button>
          <button
            onClick={() => setActiveAccountTab("account")}
            className={`min-h-[44px] pb-2 text-[14px] font-semibold ${
              activeAccountTab === "account"
                ? "text-foreground border-b-2 border-primary -mb-px"
                : "text-muted-foreground"
            }`}
          >
            Account
          </button>
        </div>

        {/* Account List */}
        <div className="divide-y divide-border/70">
          <div className="flex items-center justify-between py-4">
            <span className="text-[13px] text-foreground">Spot</span>
            <span className="text-foreground text-[13px] font-semibold">${formatBalance(spotBalance)}</span>
          </div>
          <div className="flex items-center justify-between py-4">
            <span className="text-[13px] text-foreground">Funding</span>
            <span className="text-foreground text-[13px] font-semibold">${formatBalance(fundingBalance)}</span>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Assets;
