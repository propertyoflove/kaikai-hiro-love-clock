import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Apple, FloatingBits, PixelHeart } from "./Deco";

const NAV = [
  { to: "/", label: "home", icon: "🍎" },
  { to: "/scrapbook", label: "scrapbook", icon: "✂" },
  { to: "/letters", label: "open when", icon: "✉" },
  { to: "/us", label: "us things", icon: "☺" },
  { to: "/games", label: "games", icon: "🎮" },
  { to: "/capsule", label: "capsule", icon: "⏳" },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [secret, setSecret] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1100);
    let buf = "";
    const onKey = (e: KeyboardEvent) => {
      buf = (buf + e.key.toLowerCase()).slice(-8);
      if (buf.endsWith("apple")) setSecret("🍎 you found the golden apple! Hiro says: Kaikai is the apple of my eye (literally).");
      if (buf.endsWith("kaihiro")) setSecret("💾 secret.exe unlocked: 'i'd choose you in every universe, every timeline, every dial-up connection.'");
    };
    window.addEventListener("keydown", onKey);
    return () => { clearTimeout(t); window.removeEventListener("keydown", onKey); };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {loading && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-background">
          <Apple size={80} className="animate-bouncy" />
          <div className="font-pixel text-lg">loading our little universe...</div>
          <div className="h-4 w-56 overflow-hidden pixel-border bg-paper">
            <div className="h-full bg-primary" style={{ animation: "marquee 1.1s linear", width: "200%" }} />
          </div>
        </div>
      )}
      <FloatingBits />

      <div className="relative z-10 overflow-hidden border-b-2 border-ink bg-butter py-1 font-pixel text-sm">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="flex gap-10">
              <span>★ welcome to kaikai ♡ hiro's little universe ★</span><span>you are visitor #000826</span>
              <span>✿ best viewed with love ✿</span><span>psst... try typing "apple" ♡</span><span>☁ est. 08.26.2026 ☁</span>
            </span>
          ))}
        </div>
      </div>

      <header className="relative z-20 mx-auto mt-4 flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold">
          <Apple size={36} className="animate-wiggle" /> K♡H
        </Link>
        <nav className="flex flex-wrap gap-2">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: true }}
              className="rounded-full border-2 border-ink bg-paper px-3 py-1 font-pixel text-sm shadow-[var(--shadow-sticker)] transition hover:-rotate-3 hover:bg-pink"
              activeProps={{ className: "!bg-lavender -rotate-2" }}>
              <span className="mr-1">{n.icon}</span>{n.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-10">{children}</main>

      <footer className="relative z-10 mx-auto max-w-6xl px-4 pb-10 text-center font-pixel text-sm">
        <div className="mb-2 flex justify-center gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <button key={i} aria-label="pixel heart" onClick={() => i === 4 && setSecret("🫧 hidden heart #5: you're both doing amazing. now go kiss.")}>
              <PixelHeart className="animate-bouncy" />
            </button>
          ))}
        </div>
        made with glitter, glue & love · kaikai ♡ hiro · 2026
      </footer>

      {secret && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/30 p-4" onClick={() => setSecret(null)}>
          <div className="max-w-sm animate-pageflip pixel-border bg-paper p-6 text-center">
            <div className="mb-2 font-pixel text-sm">☆ SECRET UNLOCKED ☆</div>
            <p className="font-hand text-2xl">{secret}</p>
            <button className="glitter-btn mt-4 rounded-full px-4 py-1 font-pixel">yay ♡</button>
          </div>
        </div>
      )}
    </div>
  );
}
