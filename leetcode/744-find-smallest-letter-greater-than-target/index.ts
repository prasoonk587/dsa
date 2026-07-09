/**
 * Finds the smallest letter strictly greater than `target`,
 * falling back to `letters[0]` when no such letter exists.
 *
 * Linear scan tracking the minimum qualifying letter. `result` is seeded
 * with `letters[0]` as both the wrap-around fallback and a sentinel: the
 * `result <= target` disjunct detects that the sentinel is not yet a valid
 * candidate, allowing the first letter exceeding `target` to replace it.
 * Thereafter `letters[i] < result` keeps the minimum.
 *
 * Note: this does not exploit the sorted-input guarantee — it finds the
 * minimum qualifying element in any order. The sorted constraint admits an
 * O(log n) boundary binary search (leftmost index where letters[i] > target).
 *
 * @param letters - Ascending sorted characters (length >= 2)
 * @param target - Character to exceed
 * @returns Smallest letter strictly greater than target, or letters[0]
 * @complexity Time: O(n) — every element inspected
 * @complexity Space: O(1) — single accumulator
 *
 * @example
 * nextGreatestLetter(['c', 'f', 'j'], 'a'); // => 'c'
 * nextGreatestLetter(['c', 'f', 'j'], 'c'); // => 'f'  (strictly greater)
 * nextGreatestLetter(['x', 'x', 'y'], 'z'); // => 'x'  (wraps)
 */
function nextGreatestLetter(letters: string[], target: string): string {
    let result = letters[0];

    for (let i = 0; i < letters.length; i++) {
        if (letters[i] > target && (letters[i] < result || result <= target)) {
            result = letters[i];
        }
    }

    return result;
}

export { nextGreatestLetter };
