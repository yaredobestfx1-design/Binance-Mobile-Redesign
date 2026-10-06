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
          <path d="m7 3.8 3.1 3.1L7 10 3.9 6.9 7 3.8Z" />
          <path d="m17 3.8 3.1 3.1L17 10l-3.1-3.1L17 3.8Z" />
          <path d="m7 14 3.1 3.1L7 20.2l-3.1-3.1L7 14Z" />
          <path d="m17 14 3.1 3.1-3.1 3.1-3.1-3.1L17 14Z" />
          <path d="m12 8.9 3.1 3.1-3.1 3.1L8.9 12l3.1-3.1Z" />
        </svg>
      );
    case "markets":
      return (
        <svg {...shared}>
          <path d="M4 4.5v15h16" />
          <path d="m7 15 4-4 3 2 5-6" />
          <path d="M15.5 7H19v3.5" />
        </svg>
      );
    case "trade":
      return (
        <svg {...shared}>
          <path d="M20 7h-5l2.1-2.1" />
          <path d="M4 17h5l-2.1 2.1" />
          <path d="M5.4 9A7.2 7.2 0 0 1 17 5l1.6 2" />
          <path d="M18.6 15A7.2 7.2 0 0 1 7 19l-1.6-2" />
        </svg>
      );
    case "futures":
      return (
        <svg {...shared}>
          <path d="M6 3.5h9l4 4V20H6V3.5Z" />
          <path d="M15 3.5V8h4" />
          <path d="M9 12h6M9 15h3" />
          <path d="m18 17.2 2.1 2.1-2.1 2.1-2.1-2.1 2.1-2.1Z" className="nav-icon-accent" fill="currentColor" stroke="none" />
        </svg>
      );
    case "assets":
      return (
        <svg {...shared}>
          <path d="M4 8V6.2A2.2 2.2 0 0 1 6.2 4H18" />
          <rect x="4" y="7" width="16" height="13" rx="2" />
          <path d="M14 12h6v4h-6a2 2 0 0 1 0-4Z" />
          <path d="m17 10.8 3.2 3.2-3.2 3.2-3.2-3.2 3.2-3.2Z" className="nav-icon-accent" fill="currentColor" stroke="none" />
        </svg>
      );
  }
};
