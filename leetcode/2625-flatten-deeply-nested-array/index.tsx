/**
 * A value that is either a number or an arbitrarily nested array of the same type.
 */
export type MultiDimensionalArray = (number | MultiDimensionalArray)[];

/**
 * Flattens a nested array up to a specified depth, similar to `Array.prototype.flat`.
 *
 * @param input - The (possibly nested) array to flatten. Not mutated.
 * @param depth - How many levels of nesting to flatten. Must be a non-negative integer.
 * @returns A new array with nested arrays flattened up to `depth` levels.
 * @throws {TypeError} When `depth` is negative or not a finite integer.
 * @complexity Time: O(N) — every element across all nesting levels is visited exactly once.
 * @complexity Space: O(N + D) — O(N) for the result array, O(D) for the recursion stack, where D is the depth actually reached.
 * @example
 * flat([1, [2, [3, [4]]]], 1);
 * // => [1, 2, [3, [4]]]
 */
export function flat(
  input: Readonly<MultiDimensionalArray>,
  depth: number
): MultiDimensionalArray {
  if (!Number.isInteger(depth) || depth < 0) {
    throw new TypeError(`depth must be a non-negative integer, received: ${depth}`);
  }

  if (depth === 0) return [...input];

  const result: MultiDimensionalArray = [];

  // Recursively walks `source`, pushing scalars directly and recursing into
  // nested arrays while `remainingDepth` allows.
  const flatten = (source: Readonly<MultiDimensionalArray>, remainingDepth: number): void => {
    for (const element of source) {
      if (Array.isArray(element) && remainingDepth > 0) {
        flatten(element, remainingDepth - 1);
      } else {
        result.push(element);
      }
    }
  };

  flatten(input, depth);

  return result;
}