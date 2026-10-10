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
        <svg {...shared} viewBox="0 0 2000 2000" fill="currentColor" stroke="none">
          <path
            d="M611.59 840.42l388.4-388.39 388.6 388.59 226-226L999.99 0 385.6 614.42l225.99 226M.006 999.969l226.007-226.007 225.992 225.993L226 1225.96zM611.59 1159.58l388.4 388.39 388.59-388.58 226.12 225.88-.11.12L999.99 2000l-614.41-614.4-.32-.32 226.33-225.7M1548.013 1000.093l226.007-226.006 225.992 225.992-226.006 226.007zM1229.22 999.88h.1L999.99 770.55 830.51 940.03h-.01l-19.47 19.48-40.16 40.17-.32.31.32.33 229.12 229.13 229.33-229.33.11-.13-.21-.11"
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
          <path d="M5 8.4a8.1 8.1 0 0 1 13.8-2.7" />
          <path d="m5 4.2-.2 4.2L9 8.2" />
          <path d="M19 15.6a8.1 8.1 0 0 1-13.8 2.7" />
          <path d="m19 19.8.2-4.2-4.2.2" />
          <path d="m12 8.7 3.3 3.3-3.3 3.3L8.7 12 12 8.7Z" />
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
