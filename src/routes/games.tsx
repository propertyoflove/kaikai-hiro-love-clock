import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Apple, SectionTitle } from "@/components/Deco";

export const Route = createFileRoute("/games")({
  head: () => ({
    meta: [
      { title: "Quizzes & Mini-Games · Kaikai ♡ Hiro" },
      { name: "description", content: "Cute relationship quizzes and retro mini-games for Kaikai and Hiro." },
      { property: "og:title", content: "Quizzes & Mini-Games · Kaikai ♡ Hiro" },
      { property: "og:description", content: "How well do you know each other? Plus apple-catching & memory match." },
    ],
  }),
  component: Games,
});

const QUIZ = [
  { q: "Where was our first date?", a: ["the tiny café", "the arcade", "the park"], c: 0 },
  { q: "Hiro's comfort snack?", a: ["apples", "cherries", "instant noodles"], c: 2 },
  { q: "Kaikai's favorite color?", a: ["pink", "baby blue", "butter yellow"], c: 0 },
  { q: "Who said 'I love you' first?", a: ["Kaikai", "Hiro", "we said it at the same time"], c: 2 },
];

function Quiz() {
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const done = i >= QUIZ.length;
  if (done)
    return (
      <div className="text-center">
        <div className="font-pixel text-4xl">{score}/{QUIZ.length}</div>
        <p className="font-hand text-2xl">{score === QUIZ.length ? "soulmates confirmed ♡ 100% compatible" : score > 1 ? "pretty cute! study harder, lovebird" : "uh oh… date night homework assigned 📚"}</p>
        <button onClick={() => { setI(0); setScore(0); setPick(null); }} className="glitter-btn mt-4 rounded-full px-4 py-1 font-pixel">play again</button>
      </div>
    );
  const q = QUIZ[i];
  return (
    <div>
      <div className="font-pixel text-xs">question {i + 1}/{QUIZ.length} · (edit answers to your real ones)</div>
      <p className="mt-1 font-display text-2xl font-bold">{q.q}</p>
      <div className="mt-3 grid gap-2">
        {q.a.map((a, k) => (
          <button key={k} disabled={pick !== null}
            onClick={() => { setPick(k); if (k === q.c) setScore(score + 1); setTimeout(() => { setPick(null); setI(i + 1); }, 900); }}
            className={`rounded-xl border-2 border-ink px-4 py-2 text-left font-semibold transition ${pick === null ? "bg-paper hover:bg-butter" : k === q.c ? "bg-mint" : k === pick ? "bg-pink line-through" : "bg-paper opacity-60"}`}>
            {a}
          </button>
        ))}
      </div>
    </div>
  );
}

const EMO = ["🍎", "🍒", "🦋", "🎀", "☁", "⭐"];
function Memory() {
  const [cards, setCards] = useState<string[]>([]);
  const [up, setUp] = useState<number[]>([]);
  const [found, setFound] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const reset = () => { setCards([...EMO, ...EMO].sort(() => Math.random() - 0.5)); setUp([]); setFound([]); setMoves(0); };
  useEffect(reset, []);
  const click = (k: number) => {
    if (up.length === 2 || up.includes(k) || found.includes(cards[k])) return;
    const n = [...up, k]; setUp(n);
    if (n.length === 2) {
      setMoves((m) => m + 1);
      if (cards[n[0]] === cards[n[1]]) { setFound((f) => [...f, cards[k]]); setUp([]); }
      else setTimeout(() => setUp([]), 700);
    }
  };
  const won = found.length === EMO.length && cards.length > 0;
  return (
    <div>
      <div className="mb-2 flex justify-between font-pixel text-xs"><span>moves: {moves}</span><button onClick={reset} className="underline">shuffle ↻</button></div>
      <div className="grid grid-cols-4 gap-2">
        {cards.map((c, k) => {
          const show = up.includes(k) || found.includes(c);
          return (
            <button key={k} onClick={() => click(k)} className={`grid aspect-square place-items-center rounded-xl border-2 border-ink text-3xl transition ${show ? "bg-paper" : "bg-lavender hover:-rotate-3"}`}>
              {show ? c : <span className="font-pixel text-lg">?</span>}
            </button>
          );
        })}
      </div>
      {won && <p className="mt-3 text-center font-hand text-2xl">matched in {moves} moves! you win a kiss 💋</p>}
    </div>
  );
}

function Catch() {
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(15);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setTime((s) => { if (s <= 1) { setRunning(false); return 0; } return s - 1; }), 1000);
    const m = setInterval(() => setPos({ x: 8 + Math.random() * 84, y: 10 + Math.random() * 75 }), 850);
    return () => { clearInterval(t); clearInterval(m); };
  }, [running]);
  return (
    <div>
      <div className="mb-2 flex justify-between font-pixel text-xs"><span>apples: {score}</span><span>time: {time}s</span></div>
      <div className="relative h-56 overflow-hidden rounded-xl border-2 border-ink grid-paper">
        {running ? (
          <button aria-label="catch apple" className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300" style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            onClick={() => { setScore(score + 1); setPos({ x: 8 + Math.random() * 84, y: 10 + Math.random() * 75 }); }}>
            <Apple size={44} />
          </button>
        ) : (
          <div className="grid h-full place-items-center text-center">
            <div>
              {time === 0 && <p className="font-hand text-2xl">you caught {score} apples of love! 🍎</p>}
              <button onClick={() => { setScore(0); setTime(15); setRunning(true); }} className="glitter-btn mt-2 rounded-full px-5 py-2 font-pixel">{time === 0 ? "again!" : "start ▶"}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Love() {
  const [a, setA] = useState("Kaikai");
  const [b, setB] = useState("Hiro");
  const [r, setR] = useState<number | null>(null);
  const calc = () => {
    const s = [a, b].map((x) => x.trim().toLowerCase()).sort().join("♡");
    const pair = ["hiro", "kaikai"].join("♡");
    let h = 0; for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) % 1000;
    setR(s === pair ? 100 : 40 + (h % 55));
  };
  return (
    <div className="space-y-2">
      <input value={a} onChange={(e) => setA(e.target.value)} className="w-full rounded-xl border-2 border-ink bg-paper px-3 py-2" />
      <div className="text-center">♡</div>
      <input value={b} onChange={(e) => setB(e.target.value)} className="w-full rounded-xl border-2 border-ink bg-paper px-3 py-2" />
      <button onClick={calc} className="glitter-btn w-full rounded-full py-2 font-pixel">calculate love %</button>
      {r !== null && (
        <div>
          <div className="h-5 overflow-hidden border-2 border-ink bg-paper"><div className="h-full bg-primary transition-all duration-700" style={{ width: `${r}%` }} /></div>
          <p className="mt-1 text-center font-pixel">{r}% {r === 100 ? "— off the charts!! ★" : "♡"}</p>
        </div>
      )}
    </div>
  );
}

function Win({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
  return (
    <div className="pixel-border bg-paper">
      <div className={`border-b-2 border-ink px-3 py-1 font-pixel text-sm ${color}`}>{title}</div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function Games() {
  return (
    <div>
      <SectionTitle kicker="🎮 insert coin ♡" title="Quizzes & Mini-Games" />
      <div className="grid gap-8 md:grid-cols-2">
        <Win title="how_well_do_u_know_us.quiz" color="bg-pink"><Quiz /></Win>
        <Win title="memory_match.exe" color="bg-blue"><Memory /></Win>
        <Win title="catch_the_apple.exe" color="bg-butter"><Catch /></Win>
        <Win title="love_calculator_2000.exe" color="bg-lavender"><Love /></Win>
      </div>
    </div>
  );
}
