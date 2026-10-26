import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PixelHeart, SectionTitle } from "@/components/Deco";

export const Route = createFileRoute("/us")({
  head: () => ({
    meta: [
      { title: "Inside Jokes & Nicknames · Kaikai ♡ Hiro" },
      { name: "description", content: "Nicknames, inside jokes and little things Kaikai and Hiro love about each other." },
      { property: "og:title", content: "Inside Jokes & Nicknames · Kaikai ♡ Hiro" },
      { property: "og:description", content: "The tiny, silly, sweet things only they understand." },
    ],
  }),
  component: Us,
});

const NICK = [
  { n: "Dut", by: "Hiro → Kaikai", why: "karena menurut dia, aku gudut." },
  { n: "meng ginuk ginuk", by: "Kaikai → Hiro", why: "lucu banget kayaa, meng yang bau susu ♡" },
  { n: "captain Hirono", by: "Kaikai → Hiro", why: "dia suka hirono banget." },
  { n: "sayang", by: "Hiro → Kaikai", why: "karena itu panggilan termanis ♡" },
];
const JOKES = ["the 'just five more minutes' incident", "the GPS that betrayed us", "'it's not a phase, it's a vibe'", "the cursed karaoke song", "that one duck. iykyk 🦆", "replace with your joke ♡"];
const KAI = ["hums when she's happy", "steals the last bite (cutely)", "remembers every tiny detail"];
const HIRO = ["laughs at his own jokes first", "warm hands, always", "makes the best playlists"];

function Us() {
  const [flip, setFlip] = useState<number | null>(null);
  const [jokeIdx, setJokeIdx] = useState(0);
  return (
    <div className="space-y-16">
      <SectionTitle kicker="☺ certified us things" title="Inside Jokes & Nicknames" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {NICK.map((x, i) => (
          <button key={i} onClick={() => setFlip(flip === i ? null : i)} className={`min-h-40 rounded-3xl border-2 border-ink p-5 text-left shadow-[var(--shadow-pop)] transition hover:-translate-y-1 ${["bg-pink", "bg-blue", "bg-butter", "bg-lavender"][i]}`}>
            <div className="font-pixel text-xs">{x.by}</div>
            <div className="font-display text-3xl font-bold">"{x.n}"</div>
            <div className="mt-2 font-hand text-xl">{flip === i ? x.why : "tap for the lore ▾"}</div>
          </button>
        ))}
      </div>

      <div className="mx-auto max-w-xl pixel-border bg-paper text-center">
        <div className="border-b-2 border-ink bg-blue px-3 py-1 text-left font-pixel text-sm">inside_joke_generator.exe</div>
        <div className="p-8">
          <p key={jokeIdx} className="animate-pageflip font-hand text-3xl">"{JOKES[jokeIdx]}"</p>
          <button onClick={() => setJokeIdx((jokeIdx + 1) % JOKES.length)} className="glitter-btn mt-6 rounded-full px-5 py-2 font-pixel">another one! ↻</button>
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        {[{ who: "Kaikai", list: KAI, c: "bg-pink" }, { who: "Hiro", list: HIRO, c: "bg-blue" }].map((p, k) => (
          <div key={p.who} className={`relative lined-paper p-6 pt-10 shadow-[var(--shadow-sticker)] ${k ? "rotate-1" : "-rotate-1"}`}>
            <div className={`washi -top-3 left-6 ${p.c}`} />
            <h3 className="font-display text-2xl font-bold">little things about {p.who}</h3>
            <ul className="mt-2 font-hand text-2xl leading-7">{p.list.map((t) => <li key={t} className="flex items-center gap-2"><PixelHeart size={16} /> {t}</li>)}</ul>
          </div>
        ))}
      </div>
    </div>
  );
}
