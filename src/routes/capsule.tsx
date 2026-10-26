import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SectionTitle } from "@/components/Deco";

export const Route = createFileRoute("/capsule")({
  head: () => ({
    meta: [
      { title: "Time Capsule · Kaikai ♡ Hiro" },
      { name: "description", content: "Seal future letters and anniversary wishes in a digital time capsule." },
      { property: "og:title", content: "Time Capsule · Kaikai ♡ Hiro" },
      { property: "og:description", content: "Letters to the future, locked until the date you choose." },
    ],
  }),
  component: Capsule,
});

type Note = { id: number; from: string; text: string; unlock: string; created: string };
const KEY = "kh-capsule";

function Capsule() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [from, setFrom] = useState("Kaikai");
  const [text, setText] = useState("");
  const [unlock, setUnlock] = useState("2027-08-26");
  const [peek, setPeek] = useState<Note | null>(null);
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(new Date().toISOString().slice(0, 10));
    try { setNotes(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch { /* empty */ }
  }, []);
  const save = (n: Note[]) => { setNotes(n); localStorage.setItem(KEY, JSON.stringify(n)); };

  return (
    <div>
      <SectionTitle kicker="⏳ do not open until…" title="Our Time Capsule">write a letter to future us. it stays locked until its date ♡</SectionTitle>
      <div className="grid gap-10 md:grid-cols-2">
        <form onSubmit={(e) => { e.preventDefault(); if (!text.trim()) return; save([...notes, { id: Date.now(), from, text: text.trim(), unlock, created: today }]); setText(""); }}
          className="relative lined-paper p-6 pt-10 shadow-[var(--shadow-pop)]">
          <div className="washi -top-3 left-8 bg-lavender" />
          <label className="font-pixel text-sm">from</label>
          <div className="mb-3 flex gap-2">
            {["Kaikai", "Hiro", "both of us"].map((n) => (
              <button type="button" key={n} onClick={() => setFrom(n)} className={`rounded-full border-2 border-ink px-3 py-1 font-pixel text-sm ${from === n ? "bg-pink" : "bg-paper"}`}>{n}</button>
            ))}
          </div>
          <label className="font-pixel text-sm">dear future us…</label>
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={6} placeholder="i hope we still dance in the kitchen…"
            className="w-full resize-none bg-transparent font-hand text-2xl leading-7 outline-none" />
          <label className="font-pixel text-sm">unlock on</label>
          <input type="date" value={unlock} min={today} onChange={(e) => setUnlock(e.target.value)} className="ml-2 rounded-lg border-2 border-ink bg-paper px-2" />
          <button className="glitter-btn mt-4 block w-full rounded-full py-2 font-pixel">seal it in the capsule ✦</button>
        </form>

        <div>
          <div className="relative mx-auto grid min-h-72 rounded-[3rem] border-4 border-ink bg-blue p-5 glossy" style={{ backgroundImage: "var(--chrome)" }}>
            <div className="mb-3 text-center font-pixel">capsule contents: {notes.length}</div>
            {notes.length === 0 && <p className="text-center font-hand text-2xl">empty for now… write the first letter ✎</p>}
            <div className="grid grid-cols-2 gap-3">
              {notes.map((n) => {
                const locked = n.unlock > today;
                return (
                  <div key={n.id} className={`relative rounded-lg border-2 border-ink p-3 text-center ${locked ? "bg-lavender" : "bg-butter"}`}>
                    <div className="text-3xl">{locked ? "🔒" : "💌"}</div>
                    <div className="font-pixel text-xs">from {n.from}</div>
                    <div className="font-pixel text-[10px]">{locked ? `opens ${n.unlock}` : "ready!"}</div>
                    <button disabled={locked} onClick={() => setPeek(n)} className="mt-1 rounded-full border-2 border-ink bg-paper px-2 font-pixel text-xs disabled:opacity-40">{locked ? "locked" : "open"}</button>
                    <button aria-label="remove" onClick={() => confirm("remove this letter?") && save(notes.filter((x) => x.id !== n.id))} className="absolute right-1 top-0 font-pixel text-xs">×</button>
                  </div>
                );
              })}
            </div>
          </div>
          <p className="mt-3 text-center font-pixel text-xs">letters are saved on this device ♡</p>
        </div>
      </div>
      {peek && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/30 p-4" onClick={() => setPeek(null)}>
          <div className="w-full max-w-md animate-pageflip lined-paper p-8 font-hand text-2xl leading-7 shadow-[var(--shadow-pop)]">
            <div className="font-pixel text-xs">written {n2(peek.created)} · from {peek.from}</div>
            <p className="mt-3 whitespace-pre-wrap">{peek.text}</p>
          </div>
        </div>
      )}
    </div>
  );
}
const n2 = (s: string) => s || "long ago";
