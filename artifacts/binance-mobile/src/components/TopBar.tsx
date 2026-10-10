import { useState, useEffect } from "react";
import {
  Menu,
  Search,
  Bell,
  Headphones,
  Settings,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import menuScreen from "@/assets/menu-screen.jpg";
import binanceLogo from "@/assets/binance-coin-logo.svg";
import profileTrophy from "@/assets/profile-trophy.svg";

export const TopBar = ({ variant = "standard" }: { variant?: "standard" | "home" }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [homeTab, setHomeTab] = useState<"exchange" | "wallet">("exchange");
  const [username, setUsername] = useState(() => {
    return localStorage.getItem("username") || "mikooo12";
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    localStorage.setItem("username", username);
  }, [username]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    setIsFocused(false);
  };

  if (variant === "home") {
    return (
      <>
        <header className="sticky top-0 z-50 w-full bg-background/95 pt-[env(safe-area-inset-top)] backdrop-blur-xl">
          <div className="flex h-[56px] items-center justify-between gap-1 px-2">
            <div className="flex shrink-0 items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open profile menu"
                className="h-11 w-11"
                onClick={() => setMenuOpen(true)}
              >
                <img src={profileTrophy} alt="" aria-hidden="true" className="h-9 w-9 shrink-0" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Support" className="h-11 w-11">
                <Headphones className="h-[18px] w-[18px]" />
              </Button>
            </div>

            <div
              role="tablist"
              aria-label="Account type"
              className="flex min-w-0 max-w-[148px] flex-1 items-center rounded-lg bg-secondary p-1"
            >
              <button
                role="tab"
                aria-selected={homeTab === "exchange"}
                onClick={() => setHomeTab("exchange")}
                className={`min-h-[44px] flex-1 rounded-md px-2 text-[11px] font-semibold transition-colors ${
                  homeTab === "exchange" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                }`}
              >
                Exchange
              </button>
              <button
                role="tab"
                aria-selected={homeTab === "wallet"}
                onClick={() => setHomeTab("wallet")}
                className={`min-h-[44px] flex-1 rounded-md px-2 text-[11px] font-semibold transition-colors ${
                  homeTab === "wallet" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                }`}
              >
                Wallet
              </button>
            </div>

            <div className="flex shrink-0 items-center gap-0.5">
              <Button variant="ghost" size="icon" aria-label="Market activity" className="h-11 w-11">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 48 48"
                  className="!size-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="34" cy="15.5" r="10" />
                  <path d="M34 10.8v4.8l3.2 2.1" />
                  <path d="M30.9 23.6c-.6 2.2-1.8 3.8-3.4 5.1" />
                  <path d="M6 33.5h16.8c3.4 0 5.4-2 5.4-4.6 0-2.4-1.8-4.1-4.5-4.1h-4.5c-1.7 0-3.2-.5-4.5-1.5l-1.5-1.1c-1.5-1.1-3.5-1.3-5.2-.6L5 22.8" />
                  <path d="M6 38.5h15c4.4 0 8.2-2.1 10.7-5.7l3.1-4.5" />
                </svg>
              </Button>
              <Button variant="ghost" size="icon" aria-label="Messages" className="relative h-11 w-11">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="!size-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7.2 3.3h12.1a1.5 1.5 0 0 1 1.5 1.5v8.6a1.5 1.5 0 0 1-1.5 1.5h-2.6" />
                  <path d="M4.8 6.3h12.1a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5h-4.4l-5.3 3.7v-3.7H4.8a1.5 1.5 0 0 1-1.5-1.5V7.8a1.5 1.5 0 0 1 1.5-1.5Z" />
                  <path d="M7.5 10h6.8M7.5 13h5.2" />
                </svg>
                <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-primary-foreground">
                  99+
                </span>
              </Button>
            </div>
          </div>
        </header>

        {menuOpen && (
          <div className="fixed inset-0 z-[100] bg-background pt-[env(safe-area-inset-top)]">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-3 top-[calc(env(safe-area-inset-top)+12px)] z-[101] h-11 w-11 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={() => setMenuOpen(false)}
              aria-label="Close profile menu"
            >
              <X className="h-6 w-6" />
            </Button>
            <img src={menuScreen} alt="Menu" className="h-full w-full object-cover" />
            <div
              className="absolute left-1/2 top-[140px] z-[101] -translate-x-1/2"
              onMouseEnter={() => setIsFocused(true)}
              onMouseLeave={() => !isEditing && setIsFocused(false)}
              onTouchStart={() => setIsFocused(true)}
            >
              <div className="relative inline-block">
                {isEditing ? (
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onBlur={handleBlur}
                    autoFocus
                    className="min-w-[100px] border-b border-white/50 bg-transparent px-2 py-1 text-center text-lg font-semibold text-white outline-none"
                    maxLength={20}
                  />
                ) : (
                  <span className="px-2 py-1 text-lg font-semibold text-white">{username}</span>
                )}
                {isFocused && !isEditing && (
                  <button
                    onClick={handleEditClick}
                    className="absolute -right-3 -top-1 h-2.5 w-2.5 rounded-full bg-[#F0B90B] transition-transform hover:scale-125"
                    aria-label="Edit username"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/95 pt-[env(safe-area-inset-top)] backdrop-blur-xl">
        <div className="flex h-[54px] items-center justify-between px-3">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-11 w-11"
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-1.5">
              <img src={binanceLogo} alt="" className="h-7 w-7" />
              <span className="font-[Space_Grotesk] text-[15px] font-bold tracking-tight">Binance</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" aria-label="Search" className="h-11 w-9">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Notifications" className="h-11 w-9 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                20
              </span>
            </Button>
            <Button variant="ghost" size="icon" aria-label="Support" className="h-11 w-9">
              <Headphones className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Settings" className="h-11 w-9">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Full Screen Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-background pt-[env(safe-area-inset-top)]">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-[calc(env(safe-area-inset-top)+12px)] right-3 z-[101] h-11 w-11 bg-black/50 hover:bg-black/70 text-white rounded-full"
            onClick={() => setMenuOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>
          <img 
            src={menuScreen} 
            alt="Menu" 
            className="w-full h-full object-cover"
          />
          
          {/* Editable Username */}
          <div 
            className="absolute top-[140px] left-1/2 -translate-x-1/2 z-[101]"
            onMouseEnter={() => setIsFocused(true)}
            onMouseLeave={() => !isEditing && setIsFocused(false)}
            onTouchStart={() => setIsFocused(true)}
          >
            <div className="relative inline-block">
              {isEditing ? (
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onBlur={handleBlur}
                  autoFocus
                  className="bg-transparent text-white text-lg font-semibold text-center border-b border-white/50 outline-none px-2 py-1 min-w-[100px]"
                  maxLength={20}
                />
              ) : (
                <span className="text-white text-lg font-semibold px-2 py-1">
                  {username}
                </span>
              )}
              
              {/* Edit dot - only visible on focus */}
              {isFocused && !isEditing && (
                <button
                  onClick={handleEditClick}
                  className="absolute -top-1 -right-3 w-2.5 h-2.5 bg-[#F0B90B] rounded-full hover:scale-125 transition-transform"
                  aria-label="Edit username"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
