import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { GramLogo, UsdtLogo } from "@/components/AssetTokenLogos";
import {
  ArrowDownToLine,
  ArrowLeftRight,
  ArrowUpFromLine,
  ChevronDown,
  Eye,
  List,
  Minus,
  MoreVertical,
  Moon,
  PiggyBank,
  Plus,
  SlidersHorizontal,
  Sun,
} from "lucide-react";
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
  const [viewTab, setViewTab] = useState<"overview" | "spot" | "funding" | "earn">("overview");
  const spotAllocation = totalBalance > 0 ? Math.min(100, Math.max(0, (spotBalance / totalBalance) * 100)) : 0;

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
      <div
        role="tablist"
        aria-label="Asset account"
        className="assets-tabs flex gap-5 overflow-x-auto border-b border-border/70 px-3"
      >
        {([
          ["overview", "Overview"],
          ["spot", "Spot"],
          ["funding", "Funding"],
          ["earn", "Earn"],
        ] as const).map(([tab, label]) => (
          <button
            type="button"
            role="tab"
            aria-selected={viewTab === tab}
            key={tab}
            onClick={() => setViewTab(tab)}
            className={`relative min-h-[48px] shrink-0 text-[14px] font-medium ${
              viewTab === tab ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {label}
            {viewTab === tab && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />}
          </button>
        ))}
      </div>

      <main className="page-content px-3">
        <section className="assets-summary relative mb-3 pt-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
              <span>Est. Total Value</span>
              <button
                type="button"
                aria-label={showBalance ? "Hide balance" : "Show balance"}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center"
                onClick={() => setShowBalance(!showBalance)}
              >
                <Eye className="h-[15px] w-[15px]" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => setShowAdjustment(!showAdjustment)}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted/50"
              title="Custom balance adjustment"
              aria-label="Balance and theme controls"
            >
              <MoreVertical className="h-[18px] w-[18px]" />
            </button>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-baseline gap-1.5">
                <span className="font-[Space_Grotesk] text-[30px] font-bold leading-none tracking-[-.045em]">
                  {showBalance ? `$${formatBalance(totalBalance)}` : "****"}
                </span>
                <span className="text-[12px] text-muted-foreground">USD</span>
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-[11px]">
                <span className="text-muted-foreground">Today's PNL</span>
                <span className="text-negative">
                  -${Math.abs(todayPnl).toFixed(6)} ({todayPnlPercent.toFixed(2)}%)
                </span>
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              </div>
            </div>
            <svg aria-hidden="true" className="h-12 w-[76px] shrink-0" viewBox="0 0 100 42" fill="none">
              <polyline
                points="1,22 9,24 15,17 21,20 28,18 34,27 40,24 47,23 54,27 60,20 66,22 72,17 78,19 84,15 91,18 99,7"
                stroke="#F0B90B"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </section>

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

        <div className="mb-3 grid grid-cols-4 gap-2">
          {[
            { label: "Add Funds", icon: ArrowDownToLine },
            { label: "Send", icon: ArrowUpFromLine },
            { label: "Transfer", icon: ArrowLeftRight },
            { label: "Earn", icon: PiggyBank },
          ].map(({ label, icon: ActionIcon }) => (
            <button type="button" key={label} className="flex min-h-[76px] flex-col items-center justify-center gap-1.5">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-card text-foreground">
                <ActionIcon className="h-[19px] w-[19px]" strokeWidth={1.8} />
              </span>
              <span className="whitespace-nowrap text-[10px] text-foreground">{label}</span>
            </button>
          ))}
        </div>

        <Card className="mb-3 rounded-xl border-border/60 bg-card px-3 py-3 shadow-none">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[12px] text-muted-foreground">Allocation</span>
            <button type="button" aria-label="Allocation options" className="flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 text-muted-foreground">
              <SlidersHorizontal className="h-[14px] w-[14px]" />
              <ChevronDown className="h-[14px] w-[14px]" />
            </button>
          </div>
          <div
            className="flex h-[7px] overflow-hidden rounded-full bg-secondary"
            role="img"
            aria-label={`USDT allocation ${spotAllocation.toFixed(0)} percent and Gram allocation ${(100 - spotAllocation).toFixed(0)} percent`}
          >
            <span className="h-full bg-[#1877f2]" style={{ width: `${spotAllocation}%` }} />
            <span className="h-full min-w-[6px] flex-1 bg-primary" />
          </div>
        </Card>

        <Card className="overflow-hidden rounded-xl border-border/60 bg-card px-3 pt-0 shadow-none">
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-muted-foreground">Balance</span>
            <button type="button" aria-label="Balance list options" className="flex min-h-[44px] min-w-[44px] items-center justify-center text-muted-foreground">
              <List className="h-[16px] w-[16px]" />
            </button>
          </div>
          {[
            { account: "spot", label: "USDT", detail: "TetherUS", balance: spotBalance, Logo: UsdtLogo },
            { account: "funding", label: "GRAM", detail: "Gram", badge: "Swapped", balance: fundingBalance, Logo: GramLogo },
          ].map(({ account, label, detail, badge, balance, Logo }, index) => (
            <div key={account} className={`flex items-start justify-between gap-2 py-3 ${index === 0 ? "border-b border-border/70" : ""}`}>
              <div className="flex min-w-0 items-center gap-2 pt-1">
                <Logo className="h-7 w-7 shrink-0" />
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-[12px] font-semibold text-foreground">{label}</span>
                    {badge && <span className="text-[9px] text-muted-foreground">{badge}</span>}
                  </div>
                  <div className="truncate text-[10px] text-muted-foreground">{detail}</div>
                </div>
              </div>
              <div className="flex shrink-0 flex-col items-end">
                <span className="text-[12px] font-semibold text-foreground">${formatBalance(balance)}</span>
                <span className="text-[10px] text-muted-foreground">${formatBalance(balance)}</span>
                <div className="flex gap-1">
                  <button type="button" className="relative flex min-h-[44px] min-w-[68px] items-center justify-center px-2 text-[10px] text-foreground">
                    <span aria-hidden="true" className="absolute inset-x-0 top-[9px] h-[26px] rounded bg-secondary" />
                    <span className="relative z-10">Earn</span>
                  </button>
                  <button type="button" className="relative flex min-h-[44px] min-w-[68px] items-center justify-center px-2 text-[10px] text-foreground">
                    <span aria-hidden="true" className="absolute inset-x-0 top-[9px] h-[26px] rounded bg-secondary" />
                    <span className="relative z-10">Trade</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default Assets;
