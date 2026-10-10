import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

const DIAMOND_SIZE = 48;
const EDGE_GAP = 10;
const NAV_CLEARANCE = 82;

const clampPosition = (x: number, y: number) => ({
  x: Math.max(EDGE_GAP, Math.min(x, window.innerWidth - DIAMOND_SIZE - EDGE_GAP)),
  y: Math.max(EDGE_GAP, Math.min(y, window.innerHeight - DIAMOND_SIZE - NAV_CLEARANCE)),
});

export const FloatingDiamond = () => {
  const [position, setPosition] = useState(() => {
    if (typeof window === "undefined") return { x: EDGE_GAP, y: EDGE_GAP };
    return clampPosition(
      window.innerWidth - DIAMOND_SIZE - EDGE_GAP,
      Math.round(window.innerHeight * 0.7),
    );
  });
  const dragOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleResize = () => {
      setPosition((current) => clampPosition(current.x, current.y));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    dragOffset.current = {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    setPosition(
      clampPosition(
        event.clientX - dragOffset.current.x,
        event.clientY - dragOffset.current.y,
      ),
    );
  };

  return (
    <button
      type="button"
      aria-label="Slide floating shortcut"
      title="Drag to move"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      className="fixed z-[45] flex h-12 w-12 touch-none cursor-grab items-center justify-center rounded-none bg-transparent p-0 shadow-none active:cursor-grabbing hover:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      style={{ left: position.x, top: position.y }}
    >
      <svg aria-hidden="true" viewBox="0 0 48 48" className="h-12 w-12 overflow-visible">
        <defs>
          <linearGradient id="floating-diamond-fill" x1="9" x2="39" y1="9" y2="39" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFE86B" />
            <stop offset=".55" stopColor="#FFD21E" />
            <stop offset="1" stopColor="#F3B800" />
          </linearGradient>
          <filter id="floating-diamond-shadow" x="0" y="0" width="48" height="48" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="1.4" />
            <feOffset dy="1.5" />
            <feComposite in2="SourceAlpha" operator="in" />
            <feColorMatrix values="0 0 0 0 0.04 0 0 0 0 0.04 0 0 0 0 0.04 0 0 0 .42 0" />
            <feBlend in2="SourceGraphic" result="effect1_dropShadow" />
            <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
          </filter>
        </defs>
        <rect
          x="8.5"
          y="8.5"
          width="31"
          height="31"
          rx="8"
          transform="rotate(45 24 24)"
          fill="url(#floating-diamond-fill)"
          stroke="#FFE77A"
          strokeWidth="1.1"
          filter="url(#floating-diamond-shadow)"
        />
        <path d="M18.3 21.5v.1M29.7 21.5v.1" stroke="#73530B" strokeLinecap="round" strokeWidth="2.8" />
        <path d="M19.5 27c1.1 2.2 2.6 3.3 4.5 3.3s3.4-1.1 4.5-3.3" stroke="#73530B" strokeLinecap="round" strokeWidth="1.8" />
      </svg>
    </button>
  );
};
