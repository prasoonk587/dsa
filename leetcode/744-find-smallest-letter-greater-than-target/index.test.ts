import { describe, it, expect } from "vitest";
import { nextGreatestLetter } from "./index.js";

describe("nextGreatestLetter", () => {
  it("returns first letter strictly greater than target", () => {
    expect(nextGreatestLetter(["c", "f", "j"], "a")).toBe("c");
  });

  it("skips equal letter — must be strictly greater", () => {
    expect(nextGreatestLetter(["c", "f", "j"], "c")).toBe("f");
  });

  it("wraps around when target exceeds all letters", () => {
    expect(nextGreatestLetter(["c", "f", "j"], "j")).toBe("c");
  });

  it("wraps around when target is beyond all letters", () => {
    expect(nextGreatestLetter(["x", "x", "y"], "z")).toBe("x");
  });

  it("returns smallest qualifying letter among multiple candidates", () => {
    expect(nextGreatestLetter(["c", "f", "j"], "d")).toBe("f");
  });

  it("handles duplicate letters", () => {
    expect(nextGreatestLetter(["c", "c", "f", "f", "j"], "f")).toBe("j");
  });

  it("two letter array — finds second", () => {
    expect(nextGreatestLetter(["a", "z"], "a")).toBe("z");
  });

  it("two letter array — wraps to first", () => {
    expect(nextGreatestLetter(["a", "z"], "z")).toBe("a");
  });
});
