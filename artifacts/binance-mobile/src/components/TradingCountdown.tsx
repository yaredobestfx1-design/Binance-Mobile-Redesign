import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const TradingCountdown = () => {
  const [visible, setVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 10 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1 };
        }
        if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59 };
        }
        return { hours: 0, minutes: 10 };
      });
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="px-3 py-0">
      <div className="relative rounded-xl border border-border bg-card p-2">
        <div className="mb-1 flex items-start justify-between pr-10">
          <h3 className="text-[12px] font-medium text-foreground">Trading Countdown</h3>
          <button
            onClick={() => setVisible(false)}
            className="absolute right-0 top-0 flex min-h-[44px] min-w-[44px] items-center justify-center text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
            CAT
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">CATUSDT</span>
              <span className="text-[10px] px-1.5 py-0.5 bg-muted rounded text-muted-foreground">Perp</span>
            </div>
            <div className="mt-0.5 text-[10px] text-muted-foreground">
              Starts in {String(timeLeft.hours).padStart(2, "0")}H : {String(timeLeft.minutes).padStart(2, "0")}M
            </div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            className="min-h-[44px] px-4 text-sm font-medium"
          >
            Trade
          </Button>
        </div>

        <div className="mt-1 flex justify-center gap-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full ${i === 3 ? "bg-foreground" : "bg-muted"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
