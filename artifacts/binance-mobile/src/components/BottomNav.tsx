import { NavLink } from "@/components/NavLink";
import { BinanceNavIcon, type BinanceNavIconName } from "@/components/BinanceNavIcon";

const navItems = [
  { icon: "home", label: "Home", path: "/" },
  { icon: "markets", label: "Markets", path: "/markets" },
  { icon: "trade", label: "Trade", path: "/trade" },
  { icon: "futures", label: "Futures", path: "/futures" },
  { icon: "assets", label: "Assets", path: "/assets" },
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
            activeClassName="text-foreground"
          >
            <BinanceNavIcon name={item.icon as BinanceNavIconName} className="h-5 w-5" />
            <span className="text-[10px] font-medium leading-none">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
