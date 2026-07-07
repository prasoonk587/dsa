import { describe, it, expect } from "vitest";
import { findMaxAverage } from "./index.js";

describe("findMaxAverage", () => {
  it("returns correct average for basic case", () => {
    expect(findMaxAverage([1, 12, -5, -6, 50, 3], 4)).toBe(12.75);
  });

  it("single element array with k=1", () => {
    expect(findMaxAverage([1], 1)).toBe(1);
  });

  it("all negative values", () => {
    expect(findMaxAverage([-1], 1)).toBe(-1);
  });

  it("k equals array length", () => {
    expect(findMaxAverage([1, 2, 3], 3)).toBe(2);
  });

  it("maximum window is not the first window", () => {
    expect(findMaxAverage([0, 1, 1, 3, 3], 4)).toBe(2);
  });

  it("all same values", () => {
    expect(findMaxAverage([5, 5, 5, 5], 2)).toBe(5);
  });

  it("maximum window is the last window", () => {
    expect(findMaxAverage([1, 2, 3, 4, 5], 3)).toBe(4);
  });
});
