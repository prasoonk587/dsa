import { describe, it, expect } from "vitest";
import { findoCombinationSum } from "./index.js";

// LeetCode 40 - Combination Sum II: order of combinations, and order of
// numbers within a combination, does not matter — only the multiset content
// does. Normalize both sides before comparing so the test isn't coupled to
// a particular traversal order.
const normalize = (combinations: number[][]) =>
  combinations
    .map((combo) => [...combo].sort((a, b) => a - b))
    .sort((a, b) => a.join(",").localeCompare(b.join(",")));

describe("findoCombinationSum (Combination Sum II)", () => {
  it("classic example with duplicate candidates", () => {
    const result = findoCombinationSum([10, 1, 2, 7, 6, 1, 5], 8);
    expect(normalize(result)).toEqual(
      normalize([
        [1, 1, 6],
        [1, 2, 5],
        [1, 7],
        [2, 6],
      ])
    );
  });

  it("second classic example with duplicate candidates", () => {
    const result = findoCombinationSum([2, 5, 2, 1, 2], 5);
    expect(normalize(result)).toEqual(
      normalize([
        [1, 2, 2],
        [5],
      ])
    );
  });

  it("no combination reaches the target", () => {
    expect(findoCombinationSum([2, 4, 6], 1)).toEqual([]);
  });

  it("single candidate equal to target", () => {
    expect(normalize(findoCombinationSum([5], 5))).toEqual(normalize([[5]]));
  });

  it("does not reuse the same element instance more than once", () => {
    // Only one 2 is available at each position, so [2, 2] must not appear
    // unless two separate 2s exist in the input.
    const result = findoCombinationSum([2, 3], 4);
    expect(normalize(result)).toEqual([]);
  });

  it("does not produce duplicate combinations from duplicate candidates", () => {
    const result = findoCombinationSum([1, 1, 2, 2, 3], 5);
    const seen = new Set(result.map((combo) => [...combo].sort((a, b) => a - b).join(",")));
    expect(seen.size).toBe(result.length);
  });

  it("empty candidates array", () => {
    expect(findoCombinationSum([], 5)).toEqual([]);
  });
});
