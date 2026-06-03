/**
 * Finds all unique combinations of candidates that sum to the target.
 * Each candidate may be used an unlimited number of times.
 *
 * @param candidates - Array of distinct positive integers to choose from
 * @param target - The target sum to reach
 * @returns All unique combinations where the chosen numbers sum exactly to target
 *
 * @complexity Time: O(2^(t/m)) — where t is target and m is the minimum candidate value
 * @complexity Space: O(t/m) — maximum recursion depth; output array excluded
 *
 * @example
 * combinationSum([2, 3, 6, 7], 7);
 * // => [[2, 2, 3], [7]]
 */
function combinationSum(candidates: number[], target: number): number[][] {
  const result: number[][] = [];

  function backtrack(index: number, current: number[], total: number): void {
    if (total === target) {
      result.push([...current]);
      return;
    }

    if (index >= candidates.length || total > target) return;

    // Include candidates[index] and stay at the same index (allow reuse)
    current.push(candidates[index]);
    backtrack(index, current, total + candidates[index]);
    current.pop();

    // Skip candidates[index] and move forward
    backtrack(index + 1, current, total);
  }

  backtrack(0, [], 0);

  return result;
}