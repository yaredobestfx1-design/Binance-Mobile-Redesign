interface AssetTokenLogoProps {
  className?: string;
}

export const UsdtLogo = ({ className = "h-8 w-8" }: AssetTokenLogoProps) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <circle cx="16" cy="16" r="16" fill="#26A17B" />
    <path
      d="M7.3 8.1h17.4v4.1h-6.4v3c5.4.25 9.3 1.25 9.3 2.65 0 1.55-4.8 2.55-11.6 2.75-6.8-.2-11.6-1.2-11.6-2.75 0-1.4 3.9-2.4 9.3-2.65v-3H7.3V8.1Zm6.4 8.45c-3.8.15-6.2.7-6.2 1.3 0 .6 2.4 1.15 6.2 1.3v-2.6Zm4.6 0v2.6c3.8-.15 6.2-.7 6.2-1.3 0-.6-2.4-1.15-6.2-1.3Z"
      fill="white"
    />
  </svg>
);

export const GramLogo = ({ className = "h-8 w-8" }: AssetTokenLogoProps) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <path d="M16 1.5 30.5 16 16 30.5 1.5 16 16 1.5Z" fill="#278BD8" />
    <path d="m16 8 2.5 5.5L24 16l-5.5 2.5L16 24l-2.5-5.5L8 16l5.5-2.5L16 8Z" fill="white" />
  </svg>
);
