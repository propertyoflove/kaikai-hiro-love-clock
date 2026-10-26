import { describe, it, expect } from "vitest";
import { ANNIVERSARY, elapsed } from "@/lib/anniversary";

describe("anniversary counter", () => {
  it("counts exactly 2 months on Oct 26 2026", () => {
    const r = elapsed(ANNIVERSARY, new Date(2026, 9, 26, 0, 0, 0));
    expect(r).toMatchObject({ future: false, years: 0, months: 2, days: 0, totalDays: 61 });
  });
  it("counts 1 year on Aug 26 2027", () => {
    expect(elapsed(ANNIVERSARY, new Date(2027, 7, 26)).years).toBe(1);
  });
});
