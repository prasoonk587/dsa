/**
 * Finds the majority element (appears more than ⌊n/2⌋ times) using
 * Boyer-Moore Voting.
 *
 * @param nums - Non-empty array where a majority element is guaranteed to exist
 * @returns The majority element
 *
 * @example
 * majorityElement([2, 2, 1, 1, 1, 2, 2]);
 * // => 2
 *
 * @complexity Time: O(n) — single pass
 * @complexity Space: O(1) — two scalars regardless of input size
 */
export function majorityElement(nums: number[]): number {
    let candidate = nums[0];
    let count = 0;

    for (const num of nums) {
        if (count === 0) {
            candidate = num;
        }
        count += num === candidate ? 1 : -1;
    }

    return candidate;
}
