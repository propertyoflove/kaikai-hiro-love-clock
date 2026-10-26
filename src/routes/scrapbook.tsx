import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, type ReactNode } from "react";
import { Apple, ChromeStar, PixelHeart, SectionTitle } from "@/components/Deco";

export const Route = createFileRoute("/scrapbook")({
  head: () => ({
    meta: [
      { title: "Our Scrapbook · Kaikai ♡ Hiro" },
      { name: "description", content: "An interactive handmade scrapbook of Kaikai and Hiro's memories." },
      { property: "og:title", content: "Our Scrapbook · Kaikai ♡ Hiro" },
      { property: "og:description", content: "Torn paper, washi tape, hidden notes and draggable stickers." },
    ],
  }),
  component: Scrapbook,
});

function Draggable({ children, x, y, className = "" }: { children: ReactNode; x: number; y: number; className?: string }) {
  const [pos, setPos] = useState({ x, y });
  const start = useRef<{ px: number; py: number; x: number; y: number } | null>(null);
  return (
    <div
      className={`absolute z-30 cursor-grab touch-none select-none active:cursor-grabbing ${className}`}
      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
      onPointerDown={(e) => { (e.target as HTMLElement).setPointerCapture(e.pointerId); start.current = { px: e.clientX, py: e.clientY, ...pos }; }}
      onPointerMove={(e) => {
        if (!start.current) return;
        const parent = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
        setPos({ x: start.current.x + ((e.clientX - start.current.px) / parent.width) * 100, y: start.current.y + ((e.clientY - start.current.py) / parent.height) * 100 });
      }}
      onPointerUp={() => (start.current = null)}
    >
      {children}
    </div>
  );
}

function Tape({ className, color }: { className: string; color: string }) {
  return <div className={`washi ${color} ${className}`} />;
}

function Envelope({ msg, color = "bg-pink" }: { msg: string; color?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button onClick={() => setOpen(!open)} className="relative h-28 w-40 [perspective:600px]" aria-label="open envelope">
      <div className={`absolute inset-x-2 bottom-2 rounded-sm lined-paper p-2 text-left font-hand text-lg leading-7 transition-all duration-500 ${open ? "-translate-y-16" : "translate-y-0"}`}>{msg}</div>
      <div className={`absolute inset-0 top-6 rounded-b-md border-2 border-ink ${color}`} />
      <div className={`absolute inset-x-0 top-6 h-14 origin-top border-2 border-ink ${color} transition-transform duration-500 [clip-path:polygon(0_0,100%_0,50%_100%)] ${open ? "[transform:rotateX(180deg)]" : ""}`} />
      <div className="absolute left-1/2 top-12 -translate-x-1/2 text-lg">{open ? "" : "♡"}</div>
    </button>
  );
}

function FlipNote({ front, back, color }: { front: string; back: string; color: string }) {
  const [f, setF] = useState(false);
  return (
    <button onClick={() => setF(!f)} className="relative h-36 w-36 [perspective:800px]">
      <div className={`relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] ${f ? "[transform:rotateY(180deg)]" : ""}`}>
        <div className={`absolute inset-0 grid place-items-center p-3 font-hand text-xl shadow-[var(--shadow-sticker)] [backface-visibility:hidden] ${color}`}>{front}<span className="absolute bottom-1 right-2 font-pixel text-[10px]">flip ↻</span></div>
        <div className="absolute inset-0 grid place-items-center grid-paper p-3 font-hand text-lg [backface-visibility:hidden] [transform:rotateY(180deg)]">{back}</div>
      </div>
    </button>
  );
}

function Lift({ children, secret }: { children: ReactNode; secret: string }) {
  const [up, setUp] = useState(false);
  return (
    <div className="relative">
      <div className="absolute inset-0 grid place-items-center rounded bg-butter p-3 text-center font-hand text-lg">{secret}</div>
      <button onClick={() => setUp(!up)} className={`relative w-full origin-top transition-transform duration-500 ${up ? "[transform:perspective(600px)_rotateX(-75deg)]" : ""}`}>{children}</button>
    </div>
  );
}

function Page1() {
  return (
    <div className="relative grid gap-8 p-6 sm:grid-cols-2 sm:p-10">
      <div className="relative -rotate-2 paper torn p-6">
        <Tape className="-top-3 left-6 -rotate-6" color="bg-pink" />
        <div className="font-pixel text-xs">memory no. 001</div>
        <h3 className="font-display text-3xl font-bold">our first date</h3>
        <div className="my-3 grid h-40 place-items-center grid-paper border-2 border-dashed border-ink/40 font-hand text-2xl">✎ doodle of us here ✎<br />(bla bla bla)</div>
        <p className="font-hand text-xl">"write what you remember: the weather, the song, the moment you knew."</p>
      </div>
      <div className="flex flex-col items-center gap-6">
        <div className="relative rotate-3 border-2 border-dashed border-ink bg-blue px-6 py-3 font-pixel">
          <div className="text-xs">ADMIT TWO ♡ ROW K SEAT H</div>
          <div className="text-xl">CINEMA OF US</div>
          <div className="text-xs">08 · 26 · 2026</div>
        </div>
        <Envelope msg="psst... you looked so cute that day ♡" />
        <div className="stamp-edge -rotate-6 bg-lavender"><div className="grid h-20 w-16 place-items-center border-2 border-ink bg-pink text-3xl">🍒</div></div>
      </div>
    </div>
  );
}

function Page2() {
  return (
    <div className="relative grid gap-8 p-6 sm:grid-cols-3 sm:p-10">
      <div className="sm:col-span-3 text-center"><h3 className="inline-block rotate-1 bg-butter px-4 font-display text-3xl font-bold">little things i love ✿</h3></div>
      <FlipNote color="bg-pink" front="the way you laugh" back="like a sneeze and a song had a baby. bla bla." />
      <FlipNote color="bg-blue" front="your sleepy voice" back="replace me with something only you two know ♡" />
      <FlipNote color="bg-mint" front="your weird snacks" back="apples with... ketchup?? we don't talk about it." />
      <div className="sm:col-span-2 relative -rotate-1 lined-paper p-6 font-hand text-2xl leading-7 shadow-[var(--shadow-sticker)]">
        <div className="absolute -top-4 left-8 h-10 w-4 rounded-full border-4 border-muted-foreground" />
        dear diary, today Hiro did the thing again. you know, the thing. and i laughed so hard i snorted. ✎ (write the real story here)
      </div>
      <Lift secret="🎁 surprise! hidden note: 'i saved the receipt from our first coffee.'">
        <div className="rotate-2 bg-lavender p-6 text-center font-hand text-xl shadow-[var(--shadow-sticker)]">lift this flap ↑<br />something's hiding…</div>
      </Lift>
    </div>
  );
}

function Page3() {
  const [peeled, setPeeled] = useState<number[]>([]);
  const stickers = ["🍎", "🍒", "🦋", "⭐", "☁", "🎀", "☺", "💌", "🌷"];
  const notes = ["bla bla 1", "you're my favorite notification", "cherry on top of my life", "flutter flutter", "my star ✦", "head in the clouds w/ you", "a bow for my gift", "always smiling", "love letters only"];
  return (
    <div className="relative grid gap-8 p-6 sm:grid-cols-2 sm:p-10">
      <div className="relative rotate-1 grid-paper p-6 shadow-[var(--shadow-sticker)]">
        <Tape className="-top-3 right-8 rotate-6" color="bg-butter" />
        <div className="mb-2 font-pixel text-sm">sticker sheet ✦ peel to reveal</div>
        <div className="grid grid-cols-3 gap-3">
          {stickers.map((s, i) => (
            <button key={i} onClick={() => setPeeled((p) => (p.includes(i) ? p : [...p, i]))}
              className="relative grid h-20 place-items-center rounded-xl border-2 border-dashed border-ink/50 bg-paper">
              {peeled.includes(i) ? <span className="animate-pageflip px-1 text-center font-hand text-base leading-4">{notes[i]}</span>
                : <span className="text-4xl transition hover:rotate-12 hover:scale-110">{s}</span>}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-full -rotate-2 bg-pink p-6 torn">
          <div className="absolute -top-5 left-1/2 h-12 w-6 -translate-x-1/2 rounded-full border-4 border-ink/60" />
          <div className="font-display text-2xl font-bold">places we've been</div>
          <ul className="mt-2 list-none font-hand text-xl">
            <li>☐ the tiny café (bla bla)</li><li>☑ the beach at sunset</li><li>☐ somewhere far away ✈</li>
          </ul>
        </div>
        <div className="flex gap-4"><Envelope color="bg-blue" msg="open me on a bad day ♡" /><Envelope color="bg-butter" msg="you are my sunshine ☀" /></div>
      </div>
    </div>
  );
}

const PAGES = [Page1, Page2, Page3];
const BG = ["bg-blue", "bg-pink", "bg-mint"];

function Scrapbook() {
  const [p, setP] = useState(0);
  const Page = PAGES[p]!;
  return (
    <div>
      <SectionTitle kicker="✂ handmade with glue sticks" title="Our Scrapbook">drag the stickers around, open envelopes, flip notes & lift flaps ♡</SectionTitle>
      <div className="relative mx-auto max-w-5xl">
        <div className="absolute -left-3 top-8 bottom-8 z-20 hidden w-6 flex-col justify-around sm:flex">
          {Array.from({ length: 8 }).map((_, i) => <div key={i} className="h-4 w-8 rounded-full border-4 border-muted-foreground bg-transparent" />)}
        </div>
        <div className={`relative min-h-[560px] overflow-hidden rounded-2xl border-2 border-ink ${BG[p]} shadow-[var(--shadow-pop)]`}
          style={{ backgroundImage: "radial-gradient(oklch(1 0 0 / .5) 1px, transparent 1.5px)", backgroundSize: "14px 14px" }}>
          <div key={p} className="animate-pageflip"><Page /></div>
          <Draggable x={82} y={4}><Apple size={54} /></Draggable>
          <Draggable x={4} y={82}><ChromeStar size={44} /></Draggable>
          <Draggable x={88} y={78}><span className="text-5xl">🦋</span></Draggable>
          <Draggable x={48} y={2}><PixelHeart size={36} /></Draggable>
          <Draggable x={70} y={88}><span className="rounded-full border-2 border-ink bg-butter px-2 font-pixel text-xs">drag me!</span></Draggable>
          <div className="absolute bottom-3 right-4 font-pixel text-xs">page {p + 1}/{PAGES.length}</div>
        </div>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button disabled={p === 0} onClick={() => setP(p - 1)} className="glitter-btn rounded-full px-5 py-2 font-pixel disabled:opacity-40">◀ prev</button>
          {PAGES.map((_, i) => <button key={i} aria-label={`page ${i + 1}`} onClick={() => setP(i)} className={`h-4 w-4 rounded-full border-2 border-ink ${i === p ? "bg-primary" : "bg-paper"}`} />)}
          <button disabled={p === PAGES.length - 1} onClick={() => setP(p + 1)} className="glitter-btn rounded-full px-5 py-2 font-pixel disabled:opacity-40">next ▶</button>
        </div>
      </div>
    </div>
  );
}
