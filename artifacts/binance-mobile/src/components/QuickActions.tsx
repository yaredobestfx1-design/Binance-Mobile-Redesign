type ShortcutName = "stocks" | "earn" | "league" | "rewards" | "more";

const quickActions = [
  { icon: "stocks", label: "Stocks" },
  { icon: "earn", label: "Earn" },
  { icon: "league", label: "Traders\nLeague" },
  { icon: "rewards", label: "Rewards\nHub" },
  { icon: "more", label: "More" },
] as const;

const ShortcutIcon = ({ name }: { name: ShortcutName }) => {
  const iconProps = {
    "aria-hidden": true as const,
    className: "h-[21px] w-[21px]",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 2.7,
    viewBox: "0 0 48 48",
  };

  switch (name) {
    case "stocks":
      return (
        <svg {...iconProps}>
          <path d="M12 8v7m0 17v8M9 15h6v17H9z" />
          <path d="M29 6v8m0 13v5m-3-18h6v13h-6z" />
          <circle className="text-[#F0B90B]" cx="34" cy="34" r="8" stroke="currentColor" />
          <path className="text-[#F0B90B]" d="M34 29v5l3 2" stroke="currentColor" />
        </svg>
      );
    case "earn":
      return (
        <svg {...iconProps}>
          <path d="M17 15c0-3 2.4-5 7-5s7 2 7 5" />
          <path d="m17 15-5 23h24l-5-23H17Z" />
          <path className="text-[#F0B90B]" d="m24 19 5 5-5 5-5-5 5-5Z" fill="currentColor" stroke="currentColor" />
        </svg>
      );
    case "league":
      return (
        <svg {...iconProps}>
          <path d="M9 11 18 21l6-10 6 10 9-10v23H9V11Z" />
          <path className="text-[#F0B90B]" d="M9 39h30" stroke="currentColor" />
        </svg>
      );
    case "rewards":
      return (
        <svg {...iconProps}>
          <path d="M8 14h32v7a5 5 0 0 0 0 10v7H8v-7a5 5 0 0 0 0-10v-7Z" />
          <path className="text-[#F0B90B]" d="m24 20 5 6-5 6-5-6 5-6Z" fill="currentColor" stroke="currentColor" />
        </svg>
      );
    case "more":
      return (
        <svg {...iconProps}>
          <rect x="7" y="8" width="13" height="13" rx="1.5" />
          <path className="text-[#F0B90B]" d="m34 7 8 8-8 8-8-8 8-8Z" fill="currentColor" stroke="currentColor" />
          <circle cx="13.5" cy="34.5" r="6.5" />
          <rect x="27" y="28" width="13" height="13" rx="1.5" />
        </svg>
      );
  }
};

export const QuickActions = () => {
  return (
    <div className="flex justify-between gap-1 overflow-x-auto pb-1 -mx-1 px-1">
      {quickActions.map((action) => (
        <button
          key={action.label}
          className="group flex min-h-[60px] min-w-[58px] flex-col items-center gap-1"
        >
          <div className="flex h-[38px] w-[38px] items-center justify-center rounded-xl bg-secondary transition-colors group-hover:bg-muted">
            <span className="text-foreground">
              <ShortcutIcon name={action.icon} />
            </span>
          </div>
          <span className="whitespace-pre-line text-center text-[10px] leading-tight text-muted-foreground">
            {action.label}
          </span>
        </button>
      ))}
    </div>
  );
};
