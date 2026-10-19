import { describe, it, expect } from "vitest";
import { roi } from "@/lib/roi";

describe("roi", () => {
  it("10 missed calls/day, £3,500 fee, 10% win rate = £2,625/month", () => {
    const r = roi(10, 3500, 10);
    expect(r.appointments).toBe(75);
    expect(r.instructions).toBeCloseTo(7.5);
    expect(r.revenue).toBeCloseTo(2625);
  });
});
