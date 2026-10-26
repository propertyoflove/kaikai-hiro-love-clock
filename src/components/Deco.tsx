import { useEffect, useState, type ReactNode } from "react";

export function Apple({ size = 56, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <radialGradient id="ap" cx="35%" cy="35%" r="70%">
          <stop offset="0" stopColor="oklch(0.88 0.1 10)" />
          <stop offset=".55" stopColor="oklch(0.66 0.21 15)" />
          <stop offset="1" stopColor="oklch(0.45 0.18 15)" />
        </radialGradient>
      </defs>
      <path d="M32 18c-4-6-18-6-21 6s4 30 13 32c4 1 5-1 8-1s4 2 8 1c9-2 16-20 13-32s-17-12-21-6z" fill="url(#ap)" stroke="oklch(0.38 0.08 330)" strokeWidth="2" />
      <path d="M32 18c0-6 2-10 6-12" stroke="oklch(0.4 0.08 60)" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M36 12c6-6 14-4 14-4s-4 9-14 4z" fill="oklch(0.78 0.15 145)" stroke="oklch(0.38 0.08 330)" strokeWidth="1.5" />
      <ellipse cx="22" cy="28" rx="5" ry="8" fill="white" opacity=".7" transform="rotate(20 22 28)" />
      <circle cx="44" cy="40" r="2" fill="white" opacity=".6" />
    </svg>
  );
}

export function PixelHeart({ size = 28, className = "", color = "oklch(0.7 0.18 355)" }: { size?: number; className?: string; color?: string }) {
  const px = ["0110110", "1111111", "1111111", "0111110", "0011100", "0001000"];
  return (
    <svg width={size} height={(size * 6) / 7} viewBox="0 0 7 6" className={className} shapeRendering="crispEdges" aria-hidden>
      {px.flatMap((row, y) => row.split("").map((c, x) => (c === "1" ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={x === 1 && y === 1 ? "white" : color} /> : null)))}
    </svg>
  );
}

export function ChromeStar({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} aria-hidden>
      <defs>
        <linearGradient id="cs" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" /><stop offset=".35" stopColor="oklch(0.78 0.04 280)" />
          <stop offset=".5" stopColor="#fff" /><stop offset=".75" stopColor="oklch(0.72 0.05 300)" /><stop offset="1" stopColor="oklch(0.95 0.03 220)" />
        </linearGradient>
      </defs>
      <path d="M20 1 L24 16 L39 20 L24 24 L20 39 L16 24 L1 20 L16 16Z" fill="url(#cs)" stroke="oklch(0.38 0.08 330)" strokeWidth="1.2" />
    </svg>
  );
}

export function Sparkle({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return <span className={`pointer-events-none absolute text-primary-foreground animate-twinkle ${className}`} style={style}>✦</span>;
}

export function Sticker({ children, className = "", onClick, label }: { children: ReactNode; className?: string; onClick?: () => void; label?: string }) {
  return (
    <button aria-label={label} onClick={onClick} className={`inline-flex select-none items-center justify-center rounded-full border-2 border-ink bg-paper px-3 py-1 font-display shadow-[var(--shadow-sticker)] transition hover:scale-110 hover:-rotate-6 ${className}`}>
      {children}
    </button>
  );
}

const FLOATERS = ["♡", "✦", "☁", "🍒", "🦋", "☺", "🎀", "✿"];
export function FloatingBits() {
  const [items, setItems] = useState<{ l: number; d: number; s: number; c: string; delay: number }[]>([]);
  useEffect(() => {
    setItems(Array.from({ length: 18 }, (_, i) => ({ l: Math.random() * 100, d: 14 + Math.random() * 14, s: 14 + Math.random() * 18, c: FLOATERS[i % FLOATERS.length]!, delay: -Math.random() * 20 })));
  }, []);
  return (
    <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden" aria-hidden>
      {items.map((it, i) => (
        <span key={i} className="absolute bottom-[-40px] animate-rise text-primary opacity-70" style={{ left: `${it.l}%`, fontSize: it.s, animationDuration: `${it.d}s`, animationDelay: `${it.delay}s` }}>{it.c}</span>
      ))}
    </div>
  );
}

export function SectionTitle({ kicker, title, children }: { kicker: string; title: string; children?: ReactNode }) {
  return (
    <div className="mb-10 text-center">
      <span className="inline-block -rotate-2 rounded-md border-2 border-ink bg-butter px-3 py-0.5 font-pixel text-sm">{kicker}</span>
      <h1 className="mt-3 font-title text-4xl sm:text-6xl candy-text">{title}</h1>
      {children && <p className="mx-auto mt-3 max-w-xl font-hand text-2xl">{children}</p>}
    </div>
  );
}
