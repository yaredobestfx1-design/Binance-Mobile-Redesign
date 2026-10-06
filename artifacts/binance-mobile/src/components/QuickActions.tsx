import { BarChart3, PiggyBank, Trophy, UserPlus, LayoutGrid } from "lucide-react";

const quickActions = [
  { icon: BarChart3, label: "Stocks" },
  { icon: PiggyBank, label: "Earn" },
  { icon: Trophy, label: "Football\nCup" },
  { icon: UserPlus, label: "Referral" },
  { icon: LayoutGrid, label: "More" },
];

export const QuickActions = () => {
  return (
    <div className="flex justify-between gap-1 overflow-x-auto pb-1 -mx-1 px-1">
      {quickActions.map((action) => (
        <button
          key={action.label}
          className="flex min-h-[68px] min-w-[58px] flex-col items-center gap-1.5 group"
        >
          <div className="bg-card border border-border rounded-full p-3 group-hover:bg-muted transition-colors">
            <action.icon className="h-[19px] w-[19px] text-foreground" strokeWidth={1.8} />
          </div>
          <span className="text-[10px] text-center text-muted-foreground whitespace-pre-line leading-tight">
            {action.label}
          </span>
        </button>
      ))}
    </div>
  );
};
