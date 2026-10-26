import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SectionTitle } from "@/components/Deco";

export const Route = createFileRoute("/letters")({
  head: () => ({
    meta: [
      { title: "Open When… Letters · Kaikai ♡ Hiro" },
      { name: "description", content: "A collection of interactive 'Open When' love letters." },
      { property: "og:title", content: "Open When… Letters · Kaikai ♡ Hiro" },
      { property: "og:description", content: "Little envelopes for every mood, sealed with a glossy apple." },
    ],
  }),
  component: Letters,
});

const LETTERS = [
  { when: "you miss me", seal: "🍎", color: "bg-pink", body: "i always a little too excited to love you, always rooting for you, and always grateful that out of all the people in this world, i get to have you. i love you lots and lots, my dearly nyinyo <3" },
  { when: "you can't sleep", seal: "☁", color: "bg-blue", body: "Count tiny clouds with me: one, two, three... each one is a reason I love you." },
  { when: "you're sad", seal: "☺", color: "bg-butter", body: "You're allowed to be sad. I'm still here, still yours, still bringing snacks." },
  { when: "you need a laugh", seal: "🍒", color: "bg-lavender", body: "i was going to play hard to get, but then i remembered i'm actually easy to get. just give me attention, kakak!" },
  { when: "it's our anniversary", seal: "✦", color: "bg-mint", body: "August 26 — the day our little universe started. Happy us-day, my love." },
  { when: "you doubt yourself", seal: "🦋", color: "bg-pink", body: "You are brave, sparkly, and wildly capable. I have receipts. Many receipts." },
];

function Letters() {
  const [opened, setOpened] = useState<number | null>(null);
  const [read, setRead] = useState<number[]>([]);
  const l = opened !== null ? LETTERS[opened] : null;
  return (
    <div>
      <SectionTitle kicker="✉ sealed with a kiss" title="Open When…">pick the envelope that matches your heart today</SectionTitle>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {LETTERS.map((x, i) => (
          <button key={i} onClick={() => { setOpened(i); setRead((r) => [...new Set([...r, i])]); }}
            className={`group relative h-44 rounded-lg border-2 border-ink ${x.color} shadow-[var(--shadow-pop)] transition hover:-translate-y-2 ${i % 2 ? "rotate-2" : "-rotate-2"} hover:rotate-0`}>
            <div className={`absolute inset-x-0 top-0 h-24 border-b-2 border-ink ${x.color} [clip-path:polygon(0_0,100%_0,50%_100%)] brightness-95 transition group-hover:-translate-y-2`} />
            <div className="absolute left-1/2 top-16 grid h-12 w-12 -translate-x-1/2 place-items-center rounded-full border-2 border-ink bg-cherry text-2xl glossy group-hover:animate-wiggle">{x.seal}</div>
            <div className="absolute inset-x-0 bottom-4 font-hand text-2xl">open when <b>{x.when}</b></div>
            {read.includes(i) && <span className="absolute right-2 top-2 rounded-full bg-paper px-2 font-pixel text-[10px]">read ♡</span>}
          </button>
        ))}
      </div>
      {l && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/30 p-4" onClick={() => setOpened(null)}>
          <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-md animate-pageflip lined-paper p-8 pt-10 font-hand text-2xl leading-7 shadow-[var(--shadow-pop)]">
            <div className="washi -top-3 left-1/2 -translate-x-1/2 bg-pink" />
            <div className="mb-4 font-pixel text-sm">open when {l.when}…</div>
            <p>{l.body}</p>
            <p className="mt-6 text-right">— forever yours, kai ♡</p>
            <button onClick={() => setOpened(null)} className="glitter-btn mt-6 rounded-full px-4 py-1 font-pixel text-base">fold it back</button>
          </div>
        </div>
      )}
    </div>
  );
}
