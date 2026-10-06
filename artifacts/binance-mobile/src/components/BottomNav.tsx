import { TrendingUp, ArrowLeftRight, Briefcase, Wallet } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import binanceLogo from "@/assets/binance-coin-logo.svg";

const navItems = [
  { icon: null, label: "Home", path: "/", customIcon: binanceLogo },
  { icon: TrendingUp, label: "Markets", path: "/" + "markets" },
  { icon: ArrowLeftRight, label: "Trade", path: "/trade" },
  { icon: Briefcase, label: "Futures", path: "/futures" },
  { icon: Wallet, label: "Assets", path: "/assets" },
];

export const BottomNav = () => {
  return (
    <nav aria-label="Primary navigation" className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl">
      <div className="flex items-center justify-around px-1 pt-1 max-w-[560px] mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="flex min-w-0 flex-1 flex-col items-center justify-center gap-1 py-1 px-1 min-h-[54px] text-muted-foreground transition-colors"
            activeClassName="text-primary"
          >
            {item.customIcon ? (
              <img src={item.customIcon} alt="" className="h-[19px] w-[19px]" />
            ) : (
              item.icon && <item.icon className="h-[19px] w-[19px]" strokeWidth={1.8} />
            )}
            <span className="text-[10px] font-medium leading-none">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
