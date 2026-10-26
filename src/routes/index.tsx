import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Apple, ChromeStar, PixelHeart, Sparkle, Sticker } from "@/components/Deco";
import { ANNIVERSARY, elapsed } from "@/lib/anniversary";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kaikai ♡ Hiro's Little Universe" },
      { name: "description", content: "Anniversary counter, love-story timeline and a Y2K digital love diary for Kaikai and Hiro." },
      { property: "og:title", content: "Kaikai ♡ Hiro's Little Universe" },
      { property: "og:description", content: "A whimsical Y2K love diary celebrating Kaikai & Hiro since August 26, 2026." },
    ],
  }),
  component: Index,
});

const TIMELINE = [
  { date: "chapter 01", title: "the first hello", text: "baby, have you ever thought about how funny it is that you were the one who texted me first? like, look at you, starting a conversation and accidentally signing yourself up for a lifetime subscription of me. no free trial, no cancellation, no refunds. 😭imagine if you had never sent that first message. we'd just be two random people existing in the same world, completely unaware that one little hello would eventually turn into all these silly conversations, sweet moments, and me being ridiculously in love with you. so honestly, thank you for having the courage to text me first. your biggest achievement might actually be getting yourself a boyfriend who never shuts up about loving you. ♡", icon: "🌸", emoji: "💌", color: "bg-pink" },
  { date: "chapter 02", title: "sweet convo", text: "there’s something so lovely about the way we talk about absolutely everything and nothing at all. from the silliest jokes to the little stories of our day, every conversation with you feels like my favorite part of being in love. ♡", icon: "💬", emoji: "📟", color: "bg-bubblegum" },
  { date: "chapter 03", title: "first date", text: "nervous giggles, shared dessert, someone spilled something, kiss, and cuddle :3", icon: "🍒", emoji: "🍰", color: "bg-cotton" },
  { date: "08.26.2026", title: "officially us!", text: "the day Kaikai & Hiro became Kaikai ♡ Hiro. the universe was born.", icon: "🍎", emoji: "💞", color: "bg-pink" },
  { date: "chapter ∞", title: "everything next", text: "adventures loading... ▓▓▓▓░░░ please do not turn off your heart.", icon: "✨", emoji: "🛸", color: "bg-bubblegum" },
];

function Counter() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => { setNow(new Date()); const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t); }, []);
  const e = now ? elapsed(ANNIVERSARY, now) : null;
  const cells = e ? [["years", e.years], ["months", e.months], ["days", e.days], ["hours", e.hours], ["mins", e.minutes], ["secs", e.seconds]] : [];
  return (
    <section className="relative mx-auto max-w-3xl pixel-border bg-paper">
      <div className="flex items-center justify-between border-b-2 border-ink bg-lavender px-3 py-1 font-pixel text-sm">
        <span>♡ love_counter.exe</span><span className="flex gap-1">{["_", "□", "×"].map((c) => <span key={c} className="grid h-5 w-5 place-items-center border-2 border-ink bg-paper text-xs">{c}</span>)}</span>
      </div>
      <div className="p-6 text-center">
        <p className="font-hand text-2xl">{e?.future ? "counting down to" : "together since"} <b>August 26, 2026</b></p>
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
          {cells.map(([l, v]) => (
            <div key={l as string} className="rounded-xl border-2 border-ink bg-blue p-2 glossy">
              <div className="font-pixel text-3xl tabular-nums">{String(v).padStart(2, "0")}</div>
              <div className="font-pixel text-xs">{l}</div>
            </div>
          ))}
        </div>
        {e && <p className="mt-4 font-pixel text-sm">= {e.totalDays.toLocaleString()} days of loving each other ♡</p>}
      </div>
    </section>
  );
}

function Index() {
  const [open, setOpen] = useState<number | null>(3);
  const [apples, setApples] = useState(0);
  return (
    <div className="space-y-24">
      <section className="relative py-10 text-center">
        <Sparkle className="left-[8%] top-4 text-4xl" /><Sparkle className="right-[12%] top-20 text-3xl" style={{ animationDelay: ".8s" }} />
        <ChromeStar className="absolute left-[4%] top-40 animate-floaty" size={48} />
        <ChromeStar className="absolute right-[6%] top-2 animate-floaty" size={34} />
        <div className="absolute right-[10%] bottom-0 animate-floaty text-5xl">🦋</div>
        <div className="absolute left-[14%] bottom-4 animate-wiggle text-4xl">🎀</div>
        <button aria-label="glossy apple" onClick={() => setApples((a) => a + 1)} className="mx-auto block transition hover:scale-110 active:scale-90">
          <Apple size={110} className="animate-bouncy" />
        </button>
        <p className="font-pixel text-xs">{apples === 0 ? "(tap the apple)" : apples < 7 ? `${apples} apple${apples > 1 ? "s" : ""} of love collected` : "🍎×7! Hiro owes Kaikai one apple, contractually."}</p>
        <h1 className="mt-4 font-title text-5xl leading-tight sm:text-7xl candy-text">Kaikai ♡ Hiro's<br />Little Universe</h1>
        <p className="mx-auto mt-4 max-w-lg font-hand text-3xl">a tiny corner of the internet made of glitter, cherries & us.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/scrapbook" className="glitter-btn rounded-full px-6 py-3 font-pixel">open scrapbook ✂</Link>
          <Link to="/letters" className="rounded-full border-2 border-ink bg-butter px-6 py-3 font-pixel shadow-[var(--shadow-pop)] transition hover:-translate-y-1">read letters ✉</Link>
        </div>
      </section>

      <Counter />

      <section>
        <div className="mb-8 text-center">
          <span className="font-pixel">🎀 our_story.timeline 🎀</span>
          <h2 className="font-title text-4xl candy-text">How We Happened</h2>
        </div>
        <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
          {TIMELINE.map((t, i) => (
            <div key={i} className={`pixel-border flex flex-col bg-paper transition hover:-translate-y-1 ${i === TIMELINE.length - 1 ? "sm:col-span-2" : ""}`}>
              <button onClick={() => setOpen(open === i ? null : i)} className={`flex w-full items-center gap-2 border-b-2 border-ink px-3 py-1 text-left font-pixel text-sm ${t.color}`}>
                <span className="text-lg leading-none">{t.icon}</span>
                <span className="truncate">{t.date}</span>
                <span className="ml-auto shrink-0">{open === i ? "▾ close" : "▸ open"}</span>
              </button>
              <div className="flex flex-1 items-start gap-3 p-4">
                <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl border-2 border-ink text-2xl glossy ${t.color}`}>{t.emoji}</span>
                <div className="min-w-0">
                  <div className="font-display text-2xl font-bold">{t.title}</div>
                  {open === i
                    ? <p className="mt-1 animate-pageflip font-hand text-xl">{t.text}</p>
                    : <p className="font-pixel text-xs opacity-60">click the bar to unfold ▾</p>}
                </div>
              </div>
              <div className="flex items-center justify-between border-t-2 border-dashed border-ink/30 bg-cotton px-3 py-1 font-pixel text-xs">
                <span>no. {String(i + 1).padStart(2, "0")}</span>
                <span className="text-base leading-none">🍎💗🎀🦋✨</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          { to: "/us", t: "inside jokes & nicknames", e: "☺", c: "bg-pink" },
          { to: "/games", t: "quizzes & mini-games", e: "🎮", c: "bg-blue" },
          { to: "/capsule", t: "digital time capsule", e: "⏳", c: "bg-butter" },
        ].map((x, i) => (
          <Link key={x.to} to={x.to} className={`group relative block rounded-3xl border-2 border-ink p-6 shadow-[var(--shadow-pop)] transition hover:-translate-y-2 ${x.c} ${i === 1 ? "rotate-1" : "-rotate-1"}`}>
            <div className="text-5xl transition group-hover:animate-bouncy">{x.e}</div>
            <div className="mt-2 font-display text-2xl font-bold">{x.t}</div>
            <PixelHeart className="absolute right-4 top-4" />
          </Link>
        ))}
      </section>
      <div className="text-center"><Sticker label="secret" onClick={() => alert("☁ secret cloud says: Hiro thinks Kaikai is the cutest pixel in the whole internet.")}>☁ don't click this cloud</Sticker></div>
    </div>
  );
}
