/**
 * Determines whether the last index of the array is reachable, starting from index 0,
 * where each element represents the maximum jump length from that position.
 *
 * @param nums - Array of non-negative integers; `nums[i]` is the max jump length from index `i`
 * @returns `true` if the last index is reachable, `false` otherwise
 * @throws {Error} When `nums` is empty
 * @complexity Time: O(n) — single pass, greedily tracking the farthest reachable index
 * @complexity Space: O(1) — only a running maximum is stored
 *
 * @example
 * canJump([2, 3, 1, 1, 4]);
 * // => true
 * canJump([3, 2, 1, 0, 4]);
 * // => false
 */
function canJump(nums: number[]): boolean {
    if (nums.length === 0) {
        throw new Error('canJump requires a non-empty array');
    }

    const lastIndex = nums.length - 1;
    let farthestReachable = 0;

    for (let i = 0; i <= lastIndex; i++) {
        if (i > farthestReachable) {
            return false;
        }

        farthestReachable = Math.max(farthestReachable, i + nums[i]);

        if (farthestReachable >= lastIndex) {
            return true;
        }
    }

    return farthestReachable >= lastIndex;
}

export { canJump };
