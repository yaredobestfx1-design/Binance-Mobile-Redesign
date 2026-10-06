import { BarChart3, PiggyBank, Crown, Gift, LayoutGrid } from "lucide-react";

const quickActions = [
  { icon: BarChart3, label: "Stocks" },
  { icon: PiggyBank, label: "Earn" },
  { icon: Crown, label: "Traders\nLeague" },
  { icon: Gift, label: "Rewards\nHub" },
  { icon: LayoutGrid, label: "More" },
];

export const QuickActions = () => {
  return (
    <div className="flex justify-between gap-1 overflow-x-auto pb-1 -mx-1 px-1">
      {quickActions.map((action) => (
        <button
          key={action.label}
          className="group flex min-h-[60px] min-w-[58px] flex-col items-center gap-1"
        >
          <div className="flex h-[38px] w-[38px] items-center justify-center rounded-xl bg-secondary transition-colors group-hover:bg-muted">
            <action.icon className="h-[19px] w-[19px] text-foreground" strokeWidth={1.8} />
          </div>
          <span className="whitespace-pre-line text-center text-[10px] leading-tight text-muted-foreground">
            {action.label}
          </span>
        </button>
      ))}
    </div>
  );
};
