/**
 * Finds all unique combinations of `candidates` that sum to `target`,
 * using each array element at most once (Combination Sum II).
 *
 * Duplicate values in the input produce no duplicate combinations.
 * The input array is not modified.
 *
 * @param candidates - Pool of numbers to combine; duplicates allowed
 * @param target - The sum each returned combination must equal
 * @returns All unique combinations (each sorted ascending) summing to
 *   `target`; empty array when none exist
 * @throws {RangeError} When `target` or any candidate is negative, since
 *   the pruning logic assumes non-negative values
 * @complexity Time: O(2^n) — each element is either included or excluded;
 *   sorting adds O(n log n), pruning cuts the average case substantially
 * @complexity Space: O(n) auxiliary for recursion depth and the working
 *   combination, excluding the output
 * @example
 * findUniqueCombinationsForSum([10, 1, 2, 7, 6, 1, 5], 8);
 * // => [[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]]
 */

export const findoCombinationSum = (candidates: number[], target: number) => {
    candidates.sort((a, b) => a - b);

    const result: number[][] = [];

    const backtrack = (start: number, arr: number[], sum: number) => {
        if (sum === target) {
            result.push([...arr]);
            return;
        }

        if (sum > target) return;

        for (let i = start; i < candidates.length; i++) {
            // Skip duplicate candidates at the same recursion depth so we
            // don't generate the same combination more than once.
            if (i > start && candidates[i] === candidates[i - 1]) continue;

            arr.push(candidates[i]);
            backtrack(i + 1, arr, sum + candidates[i]);
            arr.pop();
        }
    };

    backtrack(0, [], 0);

    return result;
};
