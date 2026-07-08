import { describe, it, expect } from "vitest";
import { search } from "./index.js";

describe("search", () => {
  it("finds target in middle", () => {
    expect(search([-1, 0, 3, 5, 9, 12], 9)).toBe(4);
  });

  it("returns -1 when target is absent", () => {
    expect(search([-1, 0, 3, 5, 9, 12], 2)).toBe(-1);
  });

  it("finds target at left boundary", () => {
    expect(search([1, 3, 5, 7], 1)).toBe(0);
  });

  it("finds target at right boundary", () => {
    expect(search([1, 3, 5, 7], 7)).toBe(3);
  });

  it("single element — found", () => {
    expect(search([5], 5)).toBe(0);
  });

  it("single element — not found", () => {
    expect(search([5], 3)).toBe(-1);
  });

  it("two elements — finds first", () => {
    expect(search([2, 8], 2)).toBe(0);
  });

  it("two elements — finds second", () => {
    expect(search([2, 8], 8)).toBe(1);
  });

  it("all negative numbers", () => {
    expect(search([-10, -5, -3, -1], -3)).toBe(2);
  });
});
