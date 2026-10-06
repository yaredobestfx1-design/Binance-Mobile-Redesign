import { useState, useRef, useEffect } from "react";
import binanceLogo from "@/assets/binance-coin-logo.svg";

interface PullToRefreshProps {
  children: React.ReactNode;
  onRefresh?: () => void;
}

const PullToRefresh = ({ children, onRefresh }: PullToRefreshProps) => {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const startY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const maxPull = 120;
  const threshold = 80;

  const handleTouchStart = (e: React.TouchEvent) => {
    if (containerRef.current?.scrollTop === 0) {
      startY.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (containerRef.current?.scrollTop !== 0 || isRefreshing) return;
    
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY.current;
    
    if (diff > 0) {
      setPullDistance(Math.min(diff * 0.5, maxPull));
    }
  };

  const handleTouchEnd = () => {
    if (pullDistance >= threshold) {
      setIsRefreshing(true);
      onRefresh?.();
      
      setTimeout(() => {
        setIsRefreshing(false);
        setPullDistance(0);
      }, 1500);
    } else {
      setPullDistance(0);
    }
  };

  const logoScale = Math.min(pullDistance / threshold, 1);
  const logoOpacity = Math.min(pullDistance / (threshold * 0.6), 1);

  return (
    <div 
      ref={containerRef}
      className="h-full overflow-auto"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull indicator */}
      <div 
        className="flex items-center justify-center overflow-hidden transition-all duration-200 bg-background"
        style={{ 
          height: isRefreshing ? 80 : pullDistance,
          minHeight: isRefreshing ? 80 : 0
        }}
      >
        <div 
          className={`flex flex-col items-center ${isRefreshing ? 'animate-pulse' : ''}`}
          style={{
            transform: `scale(${isRefreshing ? 1 : logoScale})`,
            opacity: isRefreshing ? 1 : logoOpacity
          }}
        >
          <img 
            src={binanceLogo} 
            alt="Binance" 
            className={`w-10 h-10 ${isRefreshing ? 'animate-spin' : ''}`}
            style={{ animationDuration: '1s' }}
          />
          <span className="text-xs text-[#F0B90B] mt-1 font-medium">
            {isRefreshing ? 'Refreshing...' : pullDistance >= threshold ? 'Release to refresh' : 'Pull to refresh'}
          </span>
        </div>
      </div>
      
      {children}
    </div>
  );
};

export default PullToRefresh;
