import { useEffect, useState } from "react";
import binanceLogo from "@/assets/binance-coin-logo.svg";

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    // Start animation after a brief delay
    const animateTimer = setTimeout(() => {
      setAnimateIn(true);
    }, 100);

    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 350);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 650);

    return () => {
      clearTimeout(animateTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-opacity duration-300 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div
        className={`flex flex-col items-center transition-all duration-700 ease-out ${
          animateIn ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
      >
        {/* Binance Logo */}
        <img 
          src={binanceLogo} 
          alt="Binance" 
          className="w-20 h-20 mb-4"
        />
        
        {/* BINANCE Text */}
        <h1 className="text-3xl font-bold tracking-wider text-[#F0B90B]">
          BINANCE
        </h1>
      </div>
    </div>
  );
};

export default SplashScreen;
