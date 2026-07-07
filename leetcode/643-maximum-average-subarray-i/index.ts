/**
 * Finds the maximum average of any contiguous subarray of length `k`.
 *
 * Fixed-size sliding window: seed the sum with the first `k` elements,
 * then slide one position at a time — adding the entering element
 * `nums[i]` and subtracting the leaving element `nums[i - k]` — while
 * tracking the maximum window sum. Division happens exactly once at
 * the end, avoiding per-iteration floating-point work.
 *
 * @param nums - Source array (LeetCode guarantees nums.length >= k >= 1)
 * @param k - Window length
 * @returns Maximum average across all length-k windows
 * @complexity Time: O(n) — each element enters and leaves the window exactly once
 * @complexity Space: O(1) — two numeric accumulators
 *
 * @example
 * findMaxAverage([1, 12, -5, -6, 50, 3], 4); // => 12.75 (window [12, -5, -6, 50])
 * findMaxAverage([-1], 1);                   // => -1    (all-negative safe)
 */
function findMaxAverage(nums: number[], k: number): number {
    let windowSum = 0;

    // Seed: sum of the first window [0, k)
    for (let i = 0; i < k; i++) {
        windowSum += nums[i];
    }

    let maxSum = windowSum;

    // Slide: nums[i] enters, nums[i - k] leaves
    for (let i = k; i < nums.length; i++) {
        windowSum = windowSum + nums[i] - nums[i - k];

        maxSum = Math.max(maxSum, windowSum);
    }

    return maxSum / k;
}

export { findMaxAverage };
