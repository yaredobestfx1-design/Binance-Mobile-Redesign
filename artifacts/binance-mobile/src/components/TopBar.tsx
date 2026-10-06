import { useState, useEffect } from "react";
import { Menu, Search, Bell, Headphones, Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import menuScreen from "@/assets/menu-screen.jpg";
import binanceLogo from "@/assets/binance-coin-logo.svg";

export const TopBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
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
