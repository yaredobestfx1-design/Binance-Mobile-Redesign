export type BinanceNavIconName = "home" | "markets" | "trade" | "futures" | "assets";

interface BinanceNavIconProps {
  name: BinanceNavIconName;
  className?: string;
}

export const BinanceNavIcon = ({ name, className = "h-5 w-5" }: BinanceNavIconProps) => {
  const shared = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  switch (name) {
    case "home":
      return (
        <svg {...shared}>
          <path
            d="M12 1 15 4 12 7 9 4 12 1ZM4 9 7 12 4 15 1 12 4 9ZM12 9 15 12 12 15 9 12 12 9ZM20 9 23 12 20 15 17 12 20 9ZM12 17 15 20 12 23 9 20 12 17Z"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      );
    case "markets":
      return (
        <svg {...shared}>
          <path d="M4 19h16" />
          <path d="m4.5 15.5 5.2-5.3 3.1 3.1 6.7-7.1" />
          <path d="M15.5 6.2H20v4.3" />
        </svg>
      );
    case "trade":
      return (
        <svg {...shared}>
          <path d="M4.5 10a8 8 0 0 1 13.8-3.3L20.5 9" />
          <path d="M20.5 5.3V9h-3.7" />
          <path d="M19.5 14a8 8 0 0 1-13.8 3.3L3.5 15" />
          <path d="M3.5 18.7V15h3.7" />
        </svg>
      );
    case "futures":
      return (
        <svg {...shared}>
          <path d="M5.5 3.5h13v16.7l-2-1.3-2 1.3-2-1.3-2 1.3-2-1.3-2 1.3V3.5Z" />
          <path d="M8.5 7.5h7.8M8.5 11.2h7.8" />
          <path d="m19 16.8 2.2 2.2-2.2 2.2-2.2-2.2 2.2-2.2Z" className="nav-icon-accent" fill="currentColor" stroke="none" />
        </svg>
      );
    case "assets":
      return (
        <svg {...shared}>
          <path d="M4.5 8V6.2A2.2 2.2 0 0 1 6.7 4h11.8" />
          <path d="M4.5 8h14a1.8 1.8 0 0 1 1.8 1.8v9.4a1.8 1.8 0 0 1-1.8 1.8h-14a1.8 1.8 0 0 1-1.8-1.8V9.8A1.8 1.8 0 0 1 4.5 8Z" />
          <path d="M15 12h5.3v4H15a2 2 0 0 1 0-4Z" />
          <path d="m17 10.8 3.2 3.2-3.2 3.2-3.2-3.2 3.2-3.2Z" className="nav-icon-accent" fill="currentColor" stroke="none" />
        </svg>
      );
  }
};
