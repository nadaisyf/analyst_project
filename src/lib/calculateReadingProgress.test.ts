import { describe, it, expect } from "vitest";
import { calculateReadingProgress } from "./calculateReadingProgress";

describe("calculateReadingProgress", () => {
  it("returns 0 when there are no reading sessions", () => {
    expect(calculateReadingProgress(300, [])).toBe(0);
  });

  it("returns 0 when totalPages is 0", () => {
    expect(calculateReadingProgress(0, [{ pagesRead: 10 }])).toBe(0);
  });

  it("calculates percentage from a single session", () => {
    expect(calculateReadingProgress(200, [{ pagesRead: 50 }])).toBe(25);
  });

  it("sums multiple reading sessions", () => {
    expect(
      calculateReadingProgress(200, [{ pagesRead: 30 }, { pagesRead: 70 }])
    ).toBe(50);
  });

  it("counts duplicate sessions normally", () => {
    expect(
      calculateReadingProgress(100, [{ pagesRead: 40 }, { pagesRead: 40 }])
    ).toBe(80);
  });

  it("caps progress at 100% when pagesRead exceeds totalPages", () => {
    expect(
      calculateReadingProgress(100, [{ pagesRead: 80 }, { pagesRead: 50 }])
    ).toBe(100);
  });

  it("caps progress at exactly 100% when pagesRead equals totalPages", () => {
    expect(calculateReadingProgress(100, [{ pagesRead: 100 }])).toBe(100);
  });
});